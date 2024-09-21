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
