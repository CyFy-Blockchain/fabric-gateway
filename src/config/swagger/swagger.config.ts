import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CyFy Blockchain API Documentation')
  .setDescription('This documentation is for cyfy blockchain API documentation')
  .setVersion('1.0.0')
  .addServer('http://localhost:3000', 'Local environment')
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' },
    'api-gateway-key',
  )
  .addTag('Health Check')
  .build();
