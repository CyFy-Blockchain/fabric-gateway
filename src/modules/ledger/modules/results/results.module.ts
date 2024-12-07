import { Module } from '@nestjs/common';

import { ResultsController } from '@results/controllers/results.controller';

import { ChaincodeServiceGatewayModule } from '@chaincode-service-gateway/chaincode-service-gateway.module';

@Module({
  imports: [ChaincodeServiceGatewayModule],
  controllers: [ResultsController],
})
export class ResultsModule {}
