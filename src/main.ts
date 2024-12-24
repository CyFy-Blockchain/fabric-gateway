import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swagger.config';
import { initializeApp } from './config/bootstrap/app.initializer';

async function bootstrap() {
  initializeApp();
}
bootstrap();
