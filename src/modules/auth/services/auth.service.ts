import { Injectable } from '@nestjs/common';
import * as FabricCAServices from 'fabric-ca-client';

@Injectable()
export class AuthService {
  async enrollUser(data: { username: string; password: string }) {
    const caURL = 'https://localhost:7054';
    const ca = new FabricCAServices(caURL);
    const response = await ca.enroll({
      enrollmentID: data.username,
      enrollmentSecret: data.password,
    });
    return response;
  }
}
