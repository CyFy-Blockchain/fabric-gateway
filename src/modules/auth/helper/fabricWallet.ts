import { Wallet, Wallets } from 'fabric-network';
import fs from 'fs';
import {
  SignUpUserBody,
  UserCredentials,
  UserRemovalBody,
} from '../dto/auth.dto';
import { buildCAClient, fetchAdminUserFromId, fetchMspForOrg } from './utils';
import { generateUuid } from 'src/utils/uuidGenerator';

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
      console.log(`Built a file system wallet at ${walletPath}`);
    } else {
      this.wallet = await Wallets.newInMemoryWallet();
      console.log('Built an in memory wallet');
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
  async loginUser(creds: UserCredentials) {
    const { username, password, orgName } = creds;
    const msp = await fetchMspForOrg(orgName);
    const caClient = await buildCAClient(orgName);

    const enrollment = await caClient.enroll({
      enrollmentID: username,
      enrollmentSecret: password,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: msp,
      type: 'X.509',
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
  async signupUser(creds: SignUpUserBody) {
    const { username, orgName, affiliation, adminId } = creds;
    const caClient = await buildCAClient(orgName);

    const adminUser = await fetchAdminUserFromId(adminId, FabricWallet.wallet);

    // Register the user, enroll the user, and import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA
    const secret = await caClient.register(
      {
        affiliation: orgName + '.' + affiliation,
        enrollmentID: username,
        role: 'client',
      },
      adminUser,
    );
    return { password: secret };
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
}
