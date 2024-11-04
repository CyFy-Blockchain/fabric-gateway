import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';

import databaseConfig from '@config/ormconfig';
import { NestConfigModule } from '@config/nest.config.module';

import { ServerHealthCheckModule } from '@server-health-check/server-health-check.module';
import { AuthModule } from '@auth/auth.module';
import { FeeChallanModule } from '@fee-challan/fee-challan.module';

@Module({
  imports: [
    NestConfigModule,
    TypeOrmModule.forRoot(databaseConfig),
    ServerHealthCheckModule,
    AuthModule,
    FeeChallanModule,
    RouterModule.register([
      {
        path: 'server-health-check',
        module: ServerHealthCheckModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'fee-challan',
        module: FeeChallanModule,
      },
    ]),
  ],
})
export class AppConfigModule {}
