import { Body, Controller, Post, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { AuthService } from '../services/auth.service';
import {
  SignUpUserBody,
  UserCredentials,
  UserRemovalBody,
} from '../dto/auth.dto';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Log in to get the certificates' })
  @ApiOkResponse({
    status: 201,
    description: 'User is successfully logged in',
  })
  async loginAdmin(@Body() data: UserCredentials) {
    try {
      const response = await this.authService.loginUser(data);
      return response;
    } catch (err) {
      console.log('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Signup new users using Org Admin' })
  async signup(@Body() data: SignUpUserBody) {
    try {
      const response = await this.authService.signupUser(data);
      return response;
    } catch (err) {
      console.log('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }

  @Delete('/revoke')
  @ApiOperation({ summary: 'Delete user accounts from blockchain' })
  async revoke(@Body() data: UserRemovalBody) {
    try {
      const response = await this.authService.revokeAccount(data);
      return response;
    } catch (err) {
      console.log('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }
}
