import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { AuthService } from '../services/auth.service';
import { EnrollUserCredentials } from '../dto/auth.dto';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Checks the server's health status by invoking the server health check service.
   *
   * @returns A string representing the server's health status.
   */
  @Post()
  async enrollUser(@Body() data: EnrollUserCredentials) {
    try {
      const response = await this.authService.enrollUser(data);
      return response;
    } catch (err) {
      console.log('this is the error: ', err);
      throw err;
    }
  }
}
