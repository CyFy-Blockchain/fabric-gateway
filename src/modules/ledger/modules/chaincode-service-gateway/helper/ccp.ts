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
        pem: '-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUQ2SNlWjZdiWF3zumxbc1lphHpYowCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQxMjA3MDcxNjAwWhcNMzkxMjA0MDcxNjAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABOqC\nPIZjsnYBL92Qv/XG/N7DGq2Xxg8DTdRnvAYMIxr+VKBGGETbULqYjPIrUSqFBX/C\nRTDeSikZwQV1YbMsoMyjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBRjtQu5VBrnvoee1zPCb0EB7J0EVTAKBggqhkjOPQQD\nAgNHADBEAiB4Ja8wSRFaNz3BbfyH0rKMMUXXfYum0X6vuue/Hd3FAwIgObIkd+to\njQw0YYbw/nSjss4GLTuc0QKRBsmXOvdG0/U=\n-----END CERTIFICATE-----\n',
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
          '-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUQ2SNlWjZdiWF3zumxbc1lphHpYowCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjQxMjA3MDcxNjAwWhcNMzkxMjA0MDcxNjAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABOqC\nPIZjsnYBL92Qv/XG/N7DGq2Xxg8DTdRnvAYMIxr+VKBGGETbULqYjPIrUSqFBX/C\nRTDeSikZwQV1YbMsoMyjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBRjtQu5VBrnvoee1zPCb0EB7J0EVTAKBggqhkjOPQQD\nAgNHADBEAiB4Ja8wSRFaNz3BbfyH0rKMMUXXfYum0X6vuue/Hd3FAwIgObIkd+to\njQw0YYbw/nSjss4GLTuc0QKRBsmXOvdG0/U=\n-----END CERTIFICATE-----\n',
        ],
      },
      httpOptions: {
        verify: false,
      },
    },
  },
};
