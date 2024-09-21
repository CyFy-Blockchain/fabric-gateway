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

  /**
   * Logs in a user to obtain certificates.
   * This function is responsible for handling the login process and obtaining certificates for authenticated users.
   *
   * @param data - The user credentials for login.
   * @param data.username - The username of the user.
   * @param data.password - The password of the user.
   *
   * @returns - A UUID that represents the certificates of the user.
   *
   * @throws Will throw an error if the login fails.
   */
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
      console.error('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }

  /**
   * Handles the signup process for new users using the Org Admin.
   *
   * @param data - The signup data for the new user.
   * @param data.username - The username of the new user.
   * @param data.password - The password of the new user.
   * @param data.adminId - The ID of the admin to create the user
   * @param data.orgId - The organization ID of the new user.
   *
   * @returns - The secret key for the newly created user.
   *
   * @throws Will throw an error if the signup fails.
   */
  @Post('/signup')
  @ApiOperation({ summary: 'Signup new users using Org Admin' })
  async signup(@Body() data: SignUpUserBody) {
    try {
      const response = await this.authService.signupUser(data);
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }

  /**
   * Deletes user accounts from the blockchain.
   * This function is responsible for revoking user accounts from the blockchain.
   *
   * @param data - The user data for account revocation.
   * @param data.userId - The ID of the user to be revoked.
   * @param data.adminId - The ID of the admin performing the revocation.
   * @param data.orgId - The organization ID of the user.
   *
   * @returns - A promise that resolves to a boolean indicating the success of the revocation operation.
   *
   * @throws Will throw an error if the revocation fails.
   */
  @Delete('/revoke')
  @ApiOperation({ summary: 'Delete user accounts from blockchain' })
  async revoke(@Body() data: UserRemovalBody) {
    try {
      const response = await this.authService.revokeAccount(data);
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.message }; // this needs to be updated with a more generic approach
    }
  }
}
