import { Injectable } from '@nestjs/common';
import { IServerHealthCheckService } from './server-health-check.service.interface';

@Injectable()
export class ServerHealthCheckService implements IServerHealthCheckService {
  /**
   * Retrieves a greeting message.
   *
   * @returns A string containing the greeting message "Hello World!".
   */
  getHello(): string {
    return 'Hello World!';
  }
}
