import { Injectable } from '@nestjs/common';
import { Gateway, GatewayOptions } from 'fabric-network';
import path from 'path';

import { CallContractInputDto } from '@chaincode-service-gateway/dto/contract.dto';
import { ccp } from '@chaincode-service-gateway/helper/ccp';

import { FabricWallet } from '@auth/helper/fabricWallet';

const walletPath = path.join(__dirname, 'wallet');

@Injectable()
export class ChaincodeService {
  /**
   * Executes a contract function on the Fabric network.
   * This function connects to the Fabric network using the provided credentials,
   * retrieves the specified contract, and then invokes the specified function on the contract.
   * The function can either retrieve data from the contract (evaluateTransaction) or post data to the contract (submitTransaction).
   *
   * @param {CallContractInputDto} callConractInputDto - An object containing the necessary credentials and contract details.
   * @param {string} callConractInputDto.token - The identity token used to authenticate the user.
   * @param {string} callConractInputDto.channelName - The name of the channel on the Fabric network.
   * @param {string} callContractInputDto.contractName - The name of the contract to interact with.
   * @param {string} callContractInputDto.functionName - The name of the function to be invoked on the contract.
   * @param {string[]} callContractInputDto.args - The arguments to be passed to the contract function.
   * @returns {Promise<string>} - A Promise that resolves to the result of the contract function invocation, or an error message if an error occurs.
   */
  async executeContractFunction(
    callConractInputDto: CallContractInputDto,
  ): Promise<string> {
    const { token, channelName, contractName, functionName, args } =
      callConractInputDto;
    const wallet = await FabricWallet.getInstance(walletPath);
    const identity = await wallet.getIdentity(token);

    const gateway = new Gateway();
    const gatewayOpts: GatewayOptions = {
      identity,
      wallet: FabricWallet.getWallet(),
      discovery: { enabled: true, asLocalhost: true },
    };

    try {
      await gateway.connect(ccp, gatewayOpts);
      const network = await gateway.getNetwork(channelName);
      const contract = network.getContract(contractName);

      // Invoke the contract function
      const evaluateTx = await contract.evaluateTransaction(
        functionName,
        ...args,
      ); // to GET something from the contract
      console.info(
        'Transaction has been evaluated, result: ',
        evaluateTx.toString(),
      );
      const result = await contract.submitTransaction(functionName, ...args); // to POST something to the contract
      console.info(
        'Transaction has been submitted, result: ',
        result.toString(),
      );
      return result.toString();
    } catch (err) {
      console.error('error: ', err);
      return err;
    }
  }
}
