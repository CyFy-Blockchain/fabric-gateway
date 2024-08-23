import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './ormconfig';
import { ServerHealthCheckModule } from 'src/modules/server-health-check/server-health-check.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    // TypeOrmModule.forRoot(databaseConfig),
    ServerHealthCheckModule,
    RouterModule.register([
      {
        path: 'server-health-check',
        module: ServerHealthCheckModule,
      },
    ]),
  ],
})
export class AppConfigModule {}
