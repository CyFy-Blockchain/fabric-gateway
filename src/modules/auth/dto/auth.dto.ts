import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class SignUpUserBody {
  @ApiProperty()
  @IsString()
  adminId: string;

  @ApiProperty({ example: 'hassan' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'org1' })
  @IsString()
  orgName: string;

  @ApiProperty({ example: 'department1' })
  @IsString()
  affiliation: string;
}

export class UserCredentials {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'adminpw' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'org1' })
  @IsString()
  orgName: string;
}

export class UserRemovalBody {
  @ApiProperty()
  @IsString()
  adminId: string;

  @ApiProperty({ example: 'hassan' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'org1' })
  @IsString()
  orgName: string;
}
