import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsObject,
  IsUUID,
  IsOptional,
} from 'class-validator';

import { LedgerRequestParamsDto } from '@ledger/dto/ledger.dto';

export enum FeeChallanStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class Result {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    example: 'CS',
    description: 'Department',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({
    example: 'A',
    description: 'Grade of the Student',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  grade: string;

  @ApiProperty({
    example: 'John Smith',
    description: 'Name of the Student',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  studentName: string;
}

export class GetResultsRequestParamsDto extends LedgerRequestParamsDto {}

export class GetResultsResponseDto {
  results: Result[];
}

class SetupWorkflowPosition {
  @ApiProperty({ description: 'The position title', example: 'DEAN' })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'The rights associated with the position',
    example: ['uploadResult', 'allocate_resources'],
  })
  @IsArray()
  @IsString({ each: true })
  rights: string[];
}

export class SetupWorkflow {
  @ApiProperty({
    description:
      'A dictionary where the key is the department name and the value is its workflow',
    example: {
      CS: {
        setupWorkflowPositions: [
          {
            position: 'DEAN',
            rights: ['uploadResult', 'allocate_resources'],
          },
          {
            position: 'HOD',
            rights: ['approve', 'UploadResult', 'acknowledge'],
          },
        ],
      },
      Biology: {
        setupWorkflowPositions: [
          {
            position: 'DEAN',
            rights: ['approve_research', 'allocate_lab_resources'],
          },
          {
            position: 'HOD',
            rights: ['manage_lab_staff', 'approve_experiments'],
          },
        ],
      },
    },
  })
  @IsObject()
  @ValidateNested({ each: true })
  departments: Record<string, DepartmentWorkflow>;
}

// Nested object representing the workflow for a single department
class DepartmentWorkflow {
  @ApiProperty({
    description: 'The positions and their rights within the workflow',
    type: [SetupWorkflowPosition],
  })
  @IsArray()
  @ValidateNested({ each: true })
  setupWorkflowPositions: SetupWorkflowPosition[];
}

// Main class for the result workflow
export class ResultWorkflowDto {
  @ApiProperty({
    description: 'Array of workflow setups',
    type: [SetupWorkflow],
  })
  @IsArray()
  @ValidateNested({ each: true })
  setupWorkflows: SetupWorkflow[];
}

class WorkflowPositionDto {
  @ApiProperty({ description: 'The position title', example: 'DEAN' })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Rights associated with the position',
    example: ['uploadResult'],
  })
  @IsArray()
  @IsString({ each: true })
  rights: string[];
}

export class UpdateWorkflowDto {
  @ApiProperty({ description: 'The department to update', example: 'CS' })
  @IsString()
  department: string;

  @ApiProperty({
    description: 'The positions and their rights to set for the department',
    type: [WorkflowPositionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  setupWorkflowPositions: WorkflowPositionDto[];
}
