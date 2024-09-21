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
  async loginUser(data: UserCredentials) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const userUuid = await wallet.loginUser(data);
    return { userId: userUuid };
  }

  async signupUser(data: SignUpUserBody) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const userPassword = await wallet.signupUser(data);
    return userPassword;
  }

  async revokeAccount(data: UserRemovalBody) {
    const wallet = await FabricWallet.getInstance(walletPath);
    const response = await wallet.removeUser(data);
    return response;
  }
}
