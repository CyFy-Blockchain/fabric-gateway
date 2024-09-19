import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { EnrollUserCredentials } from '../dto/auth.dto';
import { DtoClass } from '../../../common/decorators/dto-class.decorator';
import { ErrorHandler } from '../../../utils/error-handler.utils';

@Controller()
export class AuthTempController {
  @GrpcMethod('AuthService', 'Signup')
  @DtoClass(EnrollUserCredentials)
  Signup(
    data: EnrollUserCredentials,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): boolean {
    try {
      console.info('🚀 ~ AuthTempController ~ data:', data);
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
}
