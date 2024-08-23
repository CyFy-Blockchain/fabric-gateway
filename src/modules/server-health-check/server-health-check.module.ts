import { Module } from '@nestjs/common';
import { ServerHealthCheckController } from './controllers/server-health-check.controller';
import { ServerHealthCheckService } from './services/server-health-check.services';

@Module({
  imports: [],
  controllers: [ServerHealthCheckController],
  providers: [ServerHealthCheckService],
})
export class ServerHealthCheckModule {}
