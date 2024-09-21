import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  EnrollUserCredentials,
  LoginDto,
  LoginResponse,
} from '../dto/auth.dto';
import { DtoClass } from '../../../common/decorators/dto-class.decorator';
import { ErrorHandler } from '../../../utils/error-handler.utils';

@Controller()
export class AuthTempController {
  /**
   * Signs up a new user in the system using the provided credentials.
   * @param data - The user credentials to be used for signup.
   * @param metadata - Additional metadata to be passed along with the request.
   * @param call - The gRPC call object used for communication.
   * @returns A boolean value indicating the success of the signup process.
   * @throws RpcException - If the signup process encounters an error that is already handled.
   */
  @GrpcMethod('AuthService', 'Signup')
  @DtoClass(EnrollUserCredentials)
  Signup(
    data: EnrollUserCredentials,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): boolean {
    try {
      return true;
    } catch (error) {
      console.error('🚀 ~ AuthTempController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to Signup');
    }
  }

  /**
   * Logs the user into the system using the provided credentials.
   * @param data - The user credentials to be used for login.
   * @param metadata - Additional metadata to be passed along with the request.
   * @param call - The gRPC call object used for communication.
   * @returns A LoginResponse object containing the user's unique identifier.
   * @throws RpcException - If the login process encounters an error that is already handled.
   */
  @GrpcMethod('AuthService', 'Login')
  @DtoClass(LoginDto)
  Login(
    data: EnrollUserCredentials,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): LoginResponse {
    try {
      return {
        userId: '123-456-789',
      };
    } catch (error) {
      console.error('🚀 ~ AuthTempController ~ error:', error);
      if (error instanceof RpcException) {
        // Re-throw RpcExceptions if they are already handled
        throw error;
      }
      ErrorHandler.handleInternalError('Failed to Login');
    }
  }
}
