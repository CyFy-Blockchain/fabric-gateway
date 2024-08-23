import { Test, TestingModule } from '@nestjs/testing';
import { ServerHealthCheckController } from '../../src/modules/server-health-check/controllers/server-health-check.controller';
import { ServerHealthCheckService } from '../../src/modules/server-health-check/services/server-health-check.services';

describe('ServerHealthCheckController', () => {
  let serverHealthCheckController: ServerHealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerHealthCheckController],
      providers: [ServerHealthCheckService],
    }).compile();

    serverHealthCheckController = app.get<ServerHealthCheckController>(
      ServerHealthCheckController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverHealthCheckController.getHello()).toBe('Hello World!');
    });
  });
});
