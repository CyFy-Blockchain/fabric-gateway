import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 'e57080f0-cdb1-4ac6-bd46-d47e6410b7ff' })
  userId: string;
}

export class SignupResponse {
  @ApiProperty({ example: 'qIUWXho' })
  password: string;
}

export class RevokeUserResponse {
  @ApiProperty({ example: true })
  deleted: boolean;
}
