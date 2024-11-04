import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LedgerRequestParamsDto {
  @ApiProperty({
    example: ['arg1', 'arg2'],
    description: 'Arguments to Ledger request',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  args: string[];

  @ApiProperty({
    example: 'e57080f0-cdb1-4ac6-bd46-d47e6410b7ff',
    description: 'User Id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    example: '1',
    description: 'Organization id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  organization: string;
}
