export type CaInfo = {
  caUrl: string;
  caTLSRootCerts: string[];
  caName: string;
  msp: string; // this needs to be rethought
};
