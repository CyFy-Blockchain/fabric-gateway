import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// Enum for roles
export enum Role {
  Client = 'client',
  Admin = 'admin',
}

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

  @ApiProperty({ enum: Role, default: Role.Client })
  @IsOptional()
  @IsEnum(Role, { message: 'role must be either Client or Admin' })
  role: Role = Role.Client;

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

export class EnrollRequestDTO {
  @ApiProperty({ example: 'hassan', required: true })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty({ message: 'Organization Name is required' })
  @IsString()
  orgName: string;

  @ApiProperty({ default: 'Abcd@1234' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
