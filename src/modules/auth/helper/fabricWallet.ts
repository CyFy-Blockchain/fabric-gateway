import { Gateway, GatewayOptions, Wallet, Wallets } from 'fabric-network';
import fs from 'fs';

import {
  SignUpRequestDTO,
  LoginRequestDTO,
  UserRemovalBody,
  EnrollRequestDTO,
} from '@auth/dto/auth.dto';
import {
  buildCAClient,
  fetchAdminUserFromId,
  fetchMspForOrg,
} from '@auth/helper/utils';
import { EnrollResponseDTO, SignupResponseDTO } from '@auth/dto/response.dto';
import { ccp } from '@auth/helper/ccp';
import { CallContractInputDto } from '@auth/dto/contract.dto';

import { generateUuid } from '@app/utils';
import { HLF_CERTICATION_FORMAT } from '@app/utils/constants';

export class FabricWallet {
  private static wallet: Wallet;

  constructor() {
    /**
     * Initializes the FabricWallet class.
     * This function is used to initialize the wallet instance used for managing identities.
     * @returns The initialized wallet instance.
     */
    FabricWallet.wallet; // initialize wallet or inject it here if needed
  }

  /**
   * Retrieves the wallet instance used for managing identities.
   * @returns The wallet instance used for managing identities.
   */
  static getWallet() {
    return FabricWallet.wallet;
  }

  /**
   * Enables the singleton pattern to create a single Wallet instance to be used
   */
  static async getInstance(walletPath: string) {
    // Create a new  wallet : Note that wallet is for managing identities.
    if (this.wallet) return new FabricWallet();

    if (walletPath) {
      // remove any pre-existing wallet from prior runs
      fs.rmSync(walletPath, { recursive: true, force: true });

      this.wallet = await Wallets.newFileSystemWallet(walletPath);
      console.error(`Built a file system wallet at ${walletPath}`);
    } else {
      this.wallet = await Wallets.newInMemoryWallet();
      console.error('Built an in memory wallet');
    }

    return new FabricWallet();
  }

  /**
   * Enables a user to create their certificates using their credentials
   * @param creds - Body required for the user to generate their certificates
   * @param creds.username - Username of the user logging in
   * @param creds.password - Password of the user logging in
   * @param creds.orgName - Organisation name the user is a part of
   * @returns @param userUuid - as string containing the unique identifier for the user
   */
  async loginUser(creds: LoginRequestDTO) {
    const { publicKey, privateKey, orgName } = creds;
    const msp = await fetchMspForOrg(orgName);
    const x509Identity = {
      credentials: {
        certificate: publicKey,
        privateKey: privateKey,
      },
      mspId: msp,
      type: HLF_CERTICATION_FORMAT,
    };
    const key = generateUuid();
    await FabricWallet.wallet.put(key, x509Identity);
    return key;
  }

  /**
   * Enables the admin to signup user in the blockchain
   * @param creds - Body required to sign up the user
   * @param creds.adminId - ID of the admin
   * @param creds.username - Username of the user to be registered
   * @param creds.orgName - Organisation name of the user to be a part of
   * @returns @param password - as string containing OTP for the user to login
   */
  async signupUser(creds: SignUpRequestDTO): Promise<SignupResponseDTO> {
    const { username, orgName, adminId, role } = creds;
    const caClient = await buildCAClient(orgName);

    const adminUser = await fetchAdminUserFromId(adminId, FabricWallet.wallet);

    // Register the user, enroll the user, and import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA
    const secret = await caClient.register(
      {
        affiliation: orgName,
        enrollmentID: username,
        role,
        attrs:
          role === 'admin'
            ? [
                {
                  name: 'hf.Registrar.Roles',
                  value: 'client,peer,admin',
                  ecert: true,
                },
                {
                  name: 'hf.Registrar.Attributes',
                  value: '*',
                  ecert: true,
                },
                {
                  name: 'hf.Revoker',
                  value: 'true',
                  ecert: true,
                },
                {
                  name: 'academicOfficer',
                  value: 'true',
                  ecert: true,
                },
              ]
            : [],
      },
      adminUser,
    );

    const enrollment = await caClient.enroll({
      enrollmentID: username,
      enrollmentSecret: secret,
    });

    return {
      secret,
      publicKey: enrollment.certificate,
      privateKey: enrollment.key.toBytes().replace(/\r/g, ''),
    };
  }

  /**
   * Enables the admin to invoke user from the blockchain
   * @param data - Body required to invoke the user's access
   * @param data.adminId - ID of the admin
   * @param data.username - Username of the user to be registered
   * @param data.orgName - Organisation name of the user to be a part of
   * @returns @param deleted - as true if the process is successfully completed
   */
  async removeUser(data: UserRemovalBody) {
    const { username, orgName, adminId } = data;
    const caClient = await buildCAClient(orgName);

    const adminUser = await fetchAdminUserFromId(adminId, FabricWallet.wallet);

    await caClient.revoke({ enrollmentID: username }, adminUser);
    return { deleted: true };
  }

  async enrollUser(data: EnrollRequestDTO): Promise<EnrollResponseDTO> {
    const { username, orgName, password } = data;
    const caClient = await buildCAClient(orgName);
    const enrollment = await caClient.enroll({
      enrollmentID: username,
      enrollmentSecret: password,
    });
    return {
      publicKey: enrollment.certificate,
      privateKey: enrollment.key.toBytes().replace(/\r/g, ''),
    };
  }

  /**
   * Retrieves the identity of a user from the wallet.
   * @param token - The unique identifier for the user's identity.
   * @returns The user's identity object, containing their credentials and MSP ID.
   * @throws Error - If the provided token does not correspond to a valid user ID.
   */
  async getIdentity(token: string) {
    const identity = await FabricWallet.wallet.get(token);
    if (!identity) {
      throw new Error(`Invalid User ID: ${token}`);
    }
    return identity;
  }

  // will be removed after testing the contract flow!!!
  async callContract(callConractInputDto: CallContractInputDto) {
    const { token, channelName, contractName, functionName, attrs } =
      callConractInputDto;
    const identity = await FabricWallet.wallet.get(token);
    if (!identity) {
      throw new Error(`Invalid admin ID: ${token}`);
    }
    const gateway = new Gateway();
    const gatewayOpts: GatewayOptions = {
      identity,
      wallet: FabricWallet.wallet,
      discovery: { enabled: true, asLocalhost: true },
    };

    try {
      await gateway.connect(ccp, gatewayOpts);
      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(contractName);

      // Invoke the contract function
      const evaluateTx = await contract.evaluateTransaction(
        functionName,
        ...attrs,
      ); // to GET something from the contract
      console.log(
        'Transaction has been evaluated, result: ',
        evaluateTx.toString(),
      );
      const result = await contract.submitTransaction(functionName, ...attrs); // to POST something to the contract
      console.log(
        'Transaction has been submitted, result: ',
        result.toString(),
      );
      return result.toString();
    } catch (err) {
      console.error('error: ', err);
      return err;
    }
  }
}
