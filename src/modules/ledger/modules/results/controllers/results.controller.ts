import {
  Controller,
  Get,
  Param,
  Headers,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function

import { SWAGGER_TAGS } from '@config/swagger/tags';

import {
  GetResultsResponseDto,
  ManageResult,
  Result,
  ResultWorkflowDto,
  UpdateWorkflowDto,
} from '@app/modules/ledger/modules/results/dto/result.dto';

import { objectToString } from '@app/utils';

import { ChaincodeService } from '@chaincode-service-gateway/services/chaincode-service-gateway.service';
import { contractMapper } from '@chaincode-service-gateway/constants/contractMapper';
import { CallContractInputDto } from '@chaincode-service-gateway/dto/contract.dto';

@ApiTags(SWAGGER_TAGS.RESULTS)
@Controller()
export class ResultsController {
  constructor(private readonly chaincodeService: ChaincodeService) {}

  @Get('')
  @ApiOperation({ summary: 'Fetch all the Results' })
  @ApiResponse({
    status: 201,
    description: 'Results fetched successfully',
    type: GetResultsResponseDto,
  })
  async getResults(@Headers('token') token: string) {
    try {
      const functionName = this.getResults.name;
      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'getResults',
        args: [],
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.errors }; // this needs to be updated with a more generic approach
    }
  }

  @Get('workflow')
  @ApiOperation({ summary: 'Fetch the Results Workflow' })
  @ApiResponse({
    status: 201,
    description: 'Results Workflow fetched successfully',
    type: GetResultsResponseDto,
  })
  async getResultsWorkflow(@Headers('token') token: string) {
    try {
      const functionName = this.getResultsWorkflow.name;

      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'getResultsWorkflow',
        args: [],
        // organizationName: params.organization,
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.errors }; // this needs to be updated with a more generic approach
    }
  }

  @Post('workflow')
  @ApiOperation({ summary: 'Set the Results Workflow' })
  @ApiResponse({
    status: 201,
    description: 'Results Workflow updated successfully',
    type: ResultWorkflowDto,
  })
  @ApiBody({
    description: 'Workflow update details',
    type: UpdateWorkflowDto, // A DTO to represent the request body structure
  })
  async setResultsWorkflow(
    @Headers('token') token: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    try {
      const functionName = this.setResultsWorkflow.name;
      const { department, setupWorkflowPositions } = updateWorkflowDto;
      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'setResultsWorkflow',
        args: [department, objectToString(setupWorkflowPositions)],
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('Error updating workflow:', err);
      return { error: err.message }; // Consider using a custom error-handling mechanism
    }
  }

  @Get('/:department')
  @ApiOperation({ summary: 'Fetch Results for a Department' })
  @ApiParam({
    name: 'department',
    description: 'The name of the department whose results are to be fetched',
    example: 'CS',
  })
  @ApiResponse({
    status: 201,
    description: 'Results fetched successfully',
    type: [Result],
  })
  async getResultsForDepartment(
    @Param('department') department: string,
    @Headers('token') token: string,
  ) {
    try {
      const functionName = this.getResultsForDepartment.name;

      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'getResultsForDepartment',
        args: [department],
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.errors }; // this needs to be updated with a more generic approach
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Upload a Result' })
  @ApiResponse({
    status: 201,
    description: 'Results Uploaded successfully',
    type: Result,
  })
  @ApiBody({
    description: 'Upload Result details',
    type: Result, // A DTO to represent the request body structure
  })
  async uploadResult(
    @Headers('token') token: string,
    @Body() uploadResultDto: Result,
  ) {
    try {
      const functionName = this.uploadResult.name;
      const { department, grade, studentName } = uploadResultDto;
      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'setResultsWorkflow',
        args: [department, studentName, grade, uuidv4()],
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('Error updating workflow:', err);
      return { error: err.message }; // Consider using a custom error-handling mechanism
    }
  }

  @Put('')
  @ApiOperation({ summary: 'Manage a Result' })
  @ApiResponse({
    status: 201,
    description: 'Result Updated successfully',
    type: Result,
  })
  @ApiBody({
    description: 'Manage Result details',
    type: ManageResult, // A DTO to represent the request body structure
  })
  async manageResult(
    @Headers('token') token: string,
    @Body() manageResultDto: ManageResult,
  ) {
    try {
      const functionName = this.manageResult.name;
      const { department, adminId, resultId, action } = manageResultDto;
      const callConractInputDto: CallContractInputDto = {
        token,
        channelName: contractMapper.results,
        contractName: contractMapper.results,
        functionName: functionName ?? 'manageResult',
        args: [department, adminId, resultId, action],
      };
      const response: any = await this.chaincodeService.executeContractFunction(
        callConractInputDto,
      );
      return response;
    } catch (err) {
      console.error('Error updating workflow:', err);
      return { error: err.message }; // Consider using a custom error-handling mechanism
    }
  }
}
