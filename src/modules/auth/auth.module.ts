import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthTempController } from './controllers/auth.temp.controller';

@Module({
  imports: [],
  controllers: [AuthTempController],
  providers: [AuthService],
})
export class AuthModule {}
