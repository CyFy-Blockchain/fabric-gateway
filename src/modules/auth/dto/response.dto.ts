import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({ example: 'e57080f0-cdb1-4ac6-bd46-d47e6410b7ff' })
  userId: string;
}

export class SignupResponseDTO {
  @ApiProperty({
    example: 'public-key-string',
    description: 'A public key associated with the user.',
  })
  publicKey: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'A private key used for signing or encryption.',
  })
  @ApiProperty({ example: 'qIUWXho' })
  privateKey: string;

  @ApiProperty({ example: 'qIUWXho' })
  secret: string;
}

export class RevokeUserResponse {
  @ApiProperty({ example: true })
  deleted: boolean;
}

export class EnrollResponseDTO {
  @ApiProperty({ example: 'qIUWXho' })
  publicKey: string;

  @ApiProperty({ example: 'qIUWXho' })
  privateKey: string;
}
