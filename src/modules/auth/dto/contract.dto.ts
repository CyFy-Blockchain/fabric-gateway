import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CallContractInputDto {
  @IsNotEmpty()
  @IsUUID()
  token: string;

  @ApiProperty({
    example: 'myChannel',
    description: 'Name of the channel that has the contract',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  channelName: string;

  @ApiProperty({
    example: 'paymentContract',
    description: 'Name of the contract containing the function',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contractName: string;

  @ApiProperty({
    example: 'executeTransaction',
    description: 'Name of the function to be executed',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  functionName: string;

  @ApiProperty({
    example: ['value1', 'value2'],
    description: 'Array of public keys associated with the user',
    required: true,
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  attrs: string[];
}
