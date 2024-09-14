import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './ormconfig';
import { ServerHealthCheckModule } from 'src/modules/server-health-check/server-health-check.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(databaseConfig),
    ServerHealthCheckModule,
    AuthModule,
    RouterModule.register([
      {
        path: 'server-health-check',
        module: ServerHealthCheckModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
  ],
})
export class AppConfigModule {}
