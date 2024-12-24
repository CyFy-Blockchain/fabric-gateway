import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

import { LedgerRequestParamsDto } from '@ledger/dto/ledger.dto';

export enum FeeChallanStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class FeeChallan {
  @ApiProperty({
    example: 'e57080f0-cdb1-4ac6-bd46-d47e6410b7ff',
    description: 'Fee Challan Id',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  feeChallanId: string;

  @ApiProperty({
    example: 'e57080f0-cdb1-4ac6-bd46-d47e6410b7ff',
    description: 'Student Id',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @ApiProperty({
    example: '10000',
    description: 'Fee Challan amount',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  feeChallanAmount: number;

  @ApiProperty({
    example: 'pending',
    description: 'Fee Challan status',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  feeChallanStatus: FeeChallanStatus = FeeChallanStatus.Pending;

  @ApiProperty({
    example: '2024-08-05 01:32:14.289 +0500',
    description: 'Fee Challan date',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  feeChallanDate: Date;

  @ApiProperty({
    example: '2024-08-05 01:32:14.289 +0500',
    description: 'Fee Challan due date',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  feeChallanDueDate: Date;
}

export class GetFeeChallansRequestParamsDto extends LedgerRequestParamsDto {}

export class GetFeeChallansResponseDto {
  feeChallans: FeeChallan[];
}
