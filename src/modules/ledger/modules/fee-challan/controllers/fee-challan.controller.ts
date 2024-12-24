import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';

import {
  GetFeeChallansResponseDto,
  GetFeeChallansRequestParamsDto,
} from '@fee-challan/dto/fee-challan.dto';

import { ChaincodeService } from '@chaincode-service-gateway/services/chaincode-service-gateway.service';
import { contractMapper } from '@chaincode-service-gateway/constants/contractMapper';

@ApiTags(SWAGGER_TAGS.RESULTS)
@Controller()
export class FeeChallanController {
  constructor(private readonly chaincodeService: ChaincodeService) {}

  @Get('')
  @ApiOperation({ summary: 'Fetch all Fee challans' })
  @ApiResponse({
    status: 201,
    description: 'Fee challans fetched successfully',
    type: GetFeeChallansResponseDto,
  })

  /**
   * Fetches all Fee Challans from the specified channel and contract.
   *
   * @param {GetFeeChallansRequestParamsDto} params - The parameters required to fetch the Fee Challans.
   * @param {string} params.token - The token used for authentication.
   * @param {string} params.channelName - The name of the channel where the contract is deployed.
   * @param {string} params.contractName - The name of the contract where the Fee Challans are stored.
   * @param {string} params.functionName - The name of the function to be executed on the contract. Defaults to 'getFeeChallans'.
   * @param {string[]} params.args - The arguments to be passed to the function on the contract.
   * @param {string} params.organizationName - The name of the organization that owns the channel and contract.
   *
   * @returns {any} - The response from the contract function execution.
   *
   * @throws {Error} - If an error occurs during the contract function execution.
   */
  async getFeeChallans(@Param() params: GetFeeChallansRequestParamsDto) {
    try {
      const functionName = this.getFeeChallans.name;
      const response: any = await this.chaincodeService.executeContractFunction(
        // need to define a general return type
        {
          token: "",
          channelName: contractMapper.results,
          contractName: contractMapper.results,
          functionName: functionName ?? 'getFeeChallans',
          args: ["params.args"],
          // organizationName: params.organization,
        },
      );
      return response;
    } catch (err) {
      console.error('this is the error: ', err);
      return { error: err.errors }; // this needs to be updated with a more generic approach
    }
  }
}
