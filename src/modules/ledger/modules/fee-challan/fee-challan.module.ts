import { Module } from '@nestjs/common';

import { FeeChallanController } from '@fee-challan/controllers/fee-challan.controller';

import { ChaincodeServiceGatewayModule } from '@chaincode-service-gateway/chaincode-service-gateway.module';

@Module({
  imports: [ChaincodeServiceGatewayModule],
  controllers: [FeeChallanController],
})
export class FeeChallanModule {}
