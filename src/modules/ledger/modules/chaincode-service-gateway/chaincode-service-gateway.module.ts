import { Module } from '@nestjs/common';

import { ChaincodeService } from '@chaincode-service-gateway/services/chaincode-service-gateway.service';

@Module({
  providers: [ChaincodeService],
  exports: [ChaincodeService],
})
export class ChaincodeServiceGatewayModule {}
