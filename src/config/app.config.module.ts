import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './ormconfig';

@Module({
  //   imports: [TypeOrmModule.forRoot(databaseConfig)],
})
export class AppConfigModule {}
