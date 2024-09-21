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

  async removeUser(data: UserRemovalBody) {
    const { username, orgName, adminId } = data;
    const caClient = await buildCAClient(orgName);

    const adminUser = await fetchAdminUserFromId(adminId, FabricWallet.wallet);

    await caClient.revoke({ enrollmentID: username }, adminUser);
    return { deleted: true };
  }
}
