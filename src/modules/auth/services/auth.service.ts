import { Injectable } from '@nestjs/common';
import {
  buildCAClient,
  buildWallet,
  enrollAdmin,
  registerAndEnrollUser,
} from '../helper/utils';
import { CaInfo } from '../dto/caInfo.dto';
import { UserIdentity } from '../dto/auth.dto';
import path from 'path';
const walletPath = path.join(__dirname, 'wallet');
@Injectable()
export class AuthService {
  private async orgToCaInfo(orgName: string): Promise<CaInfo> {
    if (orgName === 'org1')
      // XXX: Should use DB here instead
      return {
        caUrl: 'https://localhost:7054',
        caTLSRootCerts: [
          '-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUUr6rRVziTov2TJfHHH3YxasPKvgwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQwOTIxMDk0NDAwWhcNMzkwOTE4MDk0NDAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABK9p\ntybnvdb6ebBRLZYYwdIp2BHk7iIUffFT0YfjY6sGg9LrH6BYJAiOIrhgyvAWLYPo\nnf4W/UORbkUn1a0+hO+jRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBS8FPLM72ZpLVddXpjhziDgyF5MhDAKBggqhkjOPQQD\nAgNHADBEAiA70aEbqNM0eK/x9AkFd+9yne8zrA2NahIqW8sMNldCfQIgNqazyZW9\notCvL/QANw7LShd6vs6vZaDU2Z7e12ehuwM=\n-----END CERTIFICATE-----\n',
        ],
        caName: 'ca-org1',
        msp: 'Org1MSP', // this needs to be rethought
      };
    throw new Error(`No CA info found for org: ${orgName}`);
  }
  async loginUser(data: {
    username: string;
    password: string;
    orgName: string;
  }) {
    const { caUrl, caName, caTLSRootCerts, msp } = await this.orgToCaInfo(
      data.orgName,
    );
    const caClient = buildCAClient(caUrl, caName, caTLSRootCerts);
    const wallet = await buildWallet(walletPath);
    await enrollAdmin(caClient, wallet, msp);
    await registerAndEnrollUser(
      caClient,
      wallet,
      msp,
      'hamza',
      'org1.department1',
    );
  }

  async signupUser(data: {
    orgName: string;
    username: string;
    adminIdentity: UserIdentity;
    affiliation: string;
  }) {
    const { orgName, username, affiliation } = data;
    const { caUrl, caName, caTLSRootCerts, msp } = await this.orgToCaInfo(
      orgName,
    );

    const caClient = buildCAClient(caUrl, caName, caTLSRootCerts);
    const wallet = await buildWallet(walletPath);
    return await registerAndEnrollUser(
      caClient,
      wallet,
      msp,
      username,
      affiliation,
    );
  }
}
