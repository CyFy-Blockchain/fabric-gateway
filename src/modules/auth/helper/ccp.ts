export const ccp = {
  name: 'test-network-org1',
  version: '1.0.0',
  client: {
    organization: 'Org1',
    connection: {
      timeout: {
        peer: {
          endorser: '300',
        },
      },
    },
  },
  organizations: {
    Org1: {
      mspid: 'Org1MSP',
      peers: ['peer0.org1.example.com'],
      certificateAuthorities: ['ca.org1.example.com'],
    },
  },
  peers: {
    'peer0.org1.example.com': {
      url: 'grpcs://localhost:7051',
      tlsCACerts: {
        pem: '-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUORyZVZHG2QOcSxA69tzwD0rhtdAwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQwOTIxMTA0ODAwWhcNMzkwOTE4MTA0ODAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMDn\noo2dxaMRTfilknV7bS7i6ng8EgfaKaIYKcxl49P+PcOD0lnRuLpXIXJuiBEc/Lu9\n6rXN8oipwotZ1tYW1wKjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBSgup314YKRPocPmzb/hOaOtlXQ0DAKBggqhkjOPQQD\nAgNIADBFAiEA1/triyXLOlXN0oOxZsKGd7jq08FG6z6GSRnTd8vMnSkCIDTPYiwi\nRQqifEpY31dLm+/9v02s7T+QDj3rUmy/ko4A\n-----END CERTIFICATE-----\n',
      },
      grpcOptions: {
        'ssl-target-name-override': 'peer0.org1.example.com',
        hostnameOverride: 'peer0.org1.example.com',
      },
    },
  },
  certificateAuthorities: {
    'ca.org1.example.com': {
      url: 'https://localhost:7054',
      caName: 'ca-org1',
      tlsCACerts: {
        pem: [
          '-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUORyZVZHG2QOcSxA69tzwD0rhtdAwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQwOTIxMTA0ODAwWhcNMzkwOTE4MTA0ODAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMDn\noo2dxaMRTfilknV7bS7i6ng8EgfaKaIYKcxl49P+PcOD0lnRuLpXIXJuiBEc/Lu9\n6rXN8oipwotZ1tYW1wKjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBSgup314YKRPocPmzb/hOaOtlXQ0DAKBggqhkjOPQQD\nAgNIADBFAiEA1/triyXLOlXN0oOxZsKGd7jq08FG6z6GSRnTd8vMnSkCIDTPYiwi\nRQqifEpY31dLm+/9v02s7T+QDj3rUmy/ko4A\n-----END CERTIFICATE-----\n',
        ],
      },
      httpOptions: {
        verify: false,
      },
    },
  },
};
