import { Module } from '@nestjs/common';

import { ChaincodeServiceGatewayModule } from '@chaincode-service-gateway/chaincode-service-gateway.module';
import { FeeChallanModule } from '@fee-challan/fee-challan.module';

@Module({
  imports: [ChaincodeServiceGatewayModule, FeeChallanModule],
})
export class LedgerModule {}
