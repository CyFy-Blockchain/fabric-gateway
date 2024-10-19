import { Wallet, Wallets } from 'fabric-network';
import fs from 'fs';
import {
  SignUpRequestDTO,
  LoginRequestDTO,
  UserRemovalBody,
  EnrollRequestDTO,
} from '../dto/auth.dto';
import { buildCAClient, fetchAdminUserFromId, fetchMspForOrg } from './utils';
import { generateUuid } from 'src/utils';
import { HLF_CERTICATION_FORMAT } from 'src/utils/constants';
import { EnrollResponseDTO, SignupResponseDTO } from '../dto/response.dto';

export class FabricWallet {
  private static wallet: Wallet;

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
    const { username, orgName, adminId } = creds;
    const caClient = await buildCAClient(orgName);

    const adminUser = await fetchAdminUserFromId(adminId, FabricWallet.wallet);

    // Register the user, enroll the user, and import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA
    const secret = await caClient.register(
      {
        affiliation: orgName,
        enrollmentID: username,
        role: 'client',
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
}
