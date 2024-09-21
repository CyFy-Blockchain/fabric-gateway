import FabricCAServices from 'fabric-ca-client';
import { Wallet } from 'fabric-network';
import { CaInfo } from '../dto/caInfo.dto';

const adminUserId = 'admin';

/**
 * Constructs a new instance of the Fabric CA Services client for a specific organization.
 *
 * @param orgName - The name of the organization for which to build the CA client.
 *
 * @returns A Promise that resolves to a new instance of {@link FabricCAServices} for the specified organization.
 *
 * @throws Will throw an error if no CA information is found for the specified organization.
 */
const buildCAClient = async (orgName: string): Promise<FabricCAServices> => {
  const { caName, caTLSRootCerts, caUrl } = await orgToCaInfo(orgName);
  // Create a new CA client for interacting with the CA.
  const caClient = new FabricCAServices(
    caUrl,
    { trustedRoots: caTLSRootCerts, verify: false },
    caName,
  );

  console.log(`Built a CA Client named ${caName}`);
  return caClient;
};

/**
 * Retrieves the Certificate Authority (CA) information for a specific organization.
 *
 * @param orgName - The name of the organization for which to retrieve CA information.
 *
 * @returns A Promise that resolves to a {@link CaInfo} object containing the CA URL, TLS root certificates, and CA name.
 * If no CA information is found for the specified organization, the Promise will reject with an error.
 *
 * @throws Will throw an error if no CA information is found for the specified organization.
 */
async function orgToCaInfo(orgName: string): Promise<CaInfo> {
  if (orgName === 'org1')
    // XXX: Should use DB here instead
    return {
      caUrl: 'https://localhost:7054',
      caTLSRootCerts: [
        '-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUUr6rRVziTov2TJfHHH3YxasPKvgwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQwOTIxMDk0NDAwWhcNMzkwOTE4MDk0NDAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABK9p\ntybnvdb6ebBRLZYYwdIp2BHk7iIUffFT0YfjY6sGg9LrH6BYJAiOIrhgyvAWLYPo\nnf4W/UORbkUn1a0+hO+jRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBS8FPLM72ZpLVddXpjhziDgyF5MhDAKBggqhkjOPQQD\nAgNHADBEAiA70aEbqNM0eK/x9AkFd+9yne8zrA2NahIqW8sMNldCfQIgNqazyZW9\notCvL/QANw7LShd6vs6vZaDU2Z7e12ehuwM=\n-----END CERTIFICATE-----\n',
      ],
      caName: 'ca-org1',
    };
  throw new Error(`No CA info found for org: ${orgName}`);
}

/**
 * Retrieves the Membership Service Provider (MSP) identifier for a specific organization.
 *
 * @param orgName - The name of the organization for which to retrieve the MSP identifier.
 *
 * @returns A Promise that resolves to a string representing the MSP identifier for the specified organization.
 *
 * @throws Will throw an error if no MSP identifier is found for the specified organization.
 */
async function fetchMspForOrg(orgName: string): Promise<string> {
  if (orgName === 'org1')
    // XXX: Should use DB here instead
    return 'Org1MSP';
  throw new Error(`No MSP found for org: ${orgName}`);
}

/**
 * Retrieves the admin user from the wallet for a specific organization.
 *
 * This function is used to authenticate with the Certificate Authority (CA) to perform administrative tasks.
 * It retrieves the admin identity from the wallet and builds a user object for authenticating with the CA.
 *
 * @param id - The identifier of the admin user in the wallet.
 * @param wallet - The wallet object containing the admin user's identity.
 *
 * @returns A Promise that resolves to a user object representing the admin user for the specified organization.
 *
 * @throws Will throw an error if the admin user with the specified ID is not found in the wallet.
 */
async function fetchAdminUserFromId(id: string, wallet: Wallet) {
  // Must use an admin to register a new user
  const adminIdentity = await wallet.get(id);
  if (!adminIdentity) {
    throw new Error(`Invalid admin ID: ${id}`);
  }

  // build a user object for authenticating with the CA
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
  return await provider.getUserContext(adminIdentity, adminUserId);
}

export { buildCAClient, fetchMspForOrg, fetchAdminUserFromId };
