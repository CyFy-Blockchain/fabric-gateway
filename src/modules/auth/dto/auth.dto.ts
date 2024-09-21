import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserIdentity {
  @ApiProperty()
  credentials: {
    certificate: string;
    privateKey: string;
  };
  @ApiProperty()
  @IsString()
  mspId: string;
  @ApiProperty()
  @IsString()
  type: string;
}

export class SignUpUserBody {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  orgName: string;

  @ApiProperty()
  @IsString()
  affiliation: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UserIdentity)
  adminIdentity: UserIdentity;
}

export class UserCredentials {
  @ApiProperty({ default: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ default: 'adminpw' })
  @IsString()
  password: string;

  @ApiProperty({ default: 'org1' })
  @IsString()
  orgName: string;
}
