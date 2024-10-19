import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SignUpRequestDTO {
  @IsNotEmpty({ message: 'adminId is required' })
  @IsUUID()
  @IsString()
  adminId: string;

  @ApiProperty({ example: 'hassan', required: true })
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty({ message: 'orgName is required' })
  @IsString()
  orgName: string;

  @ApiProperty({ default: 'department1' })
  @IsOptional()
  @IsString()
  affiliation: string;
}

export class LoginRequestDTO {
  @ApiProperty({
    example: 'public-key-string',
    description: 'A public key associated with the user.',
    required: true,
  })
  @IsNotEmpty({ message: 'Public key is required' })
  @IsString()
  publicKey: string;

  @ApiProperty({
    example: 'private-key-string',
    description: 'A private key used for signing or encryption.',
    required: true,
  })
  @IsNotEmpty({ message: 'Private key is required' })
  @IsString()
  privateKey: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty({ message: 'Organization Name is required' })
  @IsString()
  orgName: string;
}

export class UserRemovalBody {
  @ApiProperty()
  @IsNotEmpty({ message: 'adminId is required' })
  @IsString()
  adminId: string;

  @ApiProperty({ example: 'hassan' })
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'org1' })
  @IsNotEmpty({ message: 'orgName is required' })
  @IsString()
  orgName: string;
}
