import { Injectable } from '@nestjs/common';
import {
  SignUpUserBody,
  UserRemovalBody,
  UserCredentials,
} from '../dto/auth.dto';
import path from 'path';
import { FabricWallet } from '../helper/fabricWallet';
const walletPath = path.join(__dirname, 'wallet');
@Injectable()
export class AuthService {
  /**
   * Authenticates a user by retrieving their UUID from the wallet.
   *
   * @param data - The user credentials to authenticate.
   * @param data.username - The username of the user.
   * @param data.password - The password of the user.
   * @param data.orgName - The organisation name user is a part of.
   *
   * @returns @param userId - The UUID of the authenticated user.
   *
   * @throws Will throw an error if the user credentials are invalid.
   */
  async loginUser(data: UserCredentials) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const userUuid = await wallet.loginUser(data);
    return { userId: userUuid };
  }

  /**
   * Registers a new user in the blockchain wallet.
   *
   * @param data - The user details to register.
   * @param data.adminId - The ID of the admin performing the registration.
   * @param data.username - The username of the new user.
   * @param data.affiliation - The department MSP for the new user.
   * @param data.orgName - The name of the organisation user is a part off.
   *
   * @returns @param password - The OTP password of the newly created user.
   */
  async signupUser(data: SignUpUserBody) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const userPassword = await wallet.signupUser(data);
    return userPassword;
  }

  /**
   * Revokes an existing user's access from the blockchain wallet.
   *
   * @param data - The details of the user to be removed.
   * @param data.adminId - The ID of the admin performing the removal.
   * @param data.username - The username of the user to be removed.
   * @param data.orgName - The name of the organisation the user is a part of.
   *
   * @returns @param response - The response from the wallet indicating success or failure.
   *
   * @throws Will throw an error if the admin credentials are invalid or if the user does not exist.
   */
  async revokeAccount(data: UserRemovalBody) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const response = await wallet.removeUser(data);
    return response;
  }
}
