import { Controller, Get } from '@nestjs/common';
import { ServerHealthCheckService } from '../services/server-health-check.services';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';

@ApiTags(SWAGGER_TAGS.HEALTH_CHECK)
@Controller()
export class ServerHealthCheckController {
  constructor(
    private readonly serverHealthCheckService: ServerHealthCheckService,
  ) {}

  /**
   * Checks the server's health status by invoking the server health check service.
   *
   * @returns A string representing the server's health status.
   */
  @Get()
  getHello(): string {
    return this.serverHealthCheckService.getHello();
  }
}
