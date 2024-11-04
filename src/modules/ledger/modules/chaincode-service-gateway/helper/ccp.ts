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
        pem: '-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUcsauY1Apeyog/daXIQ6iJyT+WlowCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQxMTAxMTA1MTAwWhcNMzkxMDI5MTA1MTAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJhl\n0Jp31Ae3SFabBvvONjjwF1aZM4yZhI6Rru9dGP2MUenSABDjQkaM0wyEeOt7wSQg\nTvgBbkk7nVYo+aQzwhejRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBRnQaidNcIA0duU6qxEwiH8jAZEKDAKBggqhkjOPQQD\nAgNIADBFAiEAzdDLMQobxPmc/qBcj58RM7SxrBCr5AZNDHV1AQGZlAICIFMvuz2q\nFeiq9vgiV/qRkyk6DsBjxTodnHPlHczt7YTG\n-----END CERTIFICATE-----\n',
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
          '-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUcsauY1Apeyog/daXIQ6iJyT+WlowCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQxMTAxMTA1MTAwWhcNMzkxMDI5MTA1MTAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABJhl\n0Jp31Ae3SFabBvvONjjwF1aZM4yZhI6Rru9dGP2MUenSABDjQkaM0wyEeOt7wSQg\nTvgBbkk7nVYo+aQzwhejRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBRnQaidNcIA0duU6qxEwiH8jAZEKDAKBggqhkjOPQQD\nAgNIADBFAiEAzdDLMQobxPmc/qBcj58RM7SxrBCr5AZNDHV1AQGZlAICIFMvuz2q\nFeiq9vgiV/qRkyk6DsBjxTodnHPlHczt7YTG\n-----END CERTIFICATE-----\n',
        ],
      },
      httpOptions: {
        verify: false,
      },
    },
  },
};
