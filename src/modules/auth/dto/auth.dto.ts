import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserBody {
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

  @ApiProperty({ default: 'department1' })
  @IsString()
  affiliation: string;
}

export class UserCredentials {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'adminpw' })
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'org1' })
  @IsNotEmpty({ message: 'orgName is required' })
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

export class LoginDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'JohnDoe',
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'Abcd@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

export class LoginResponse {
  userId: string;
}
