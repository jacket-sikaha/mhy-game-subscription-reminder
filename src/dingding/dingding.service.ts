import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class DingdingService {
  prepareMsgBody() {}

  getSign() {
    const timestamp = Date.now();
    const secret =
      'SECa8bdd79c83aeb0931aa9340ef4993d61a1f08d6afdc6059aa53a8d80aade03a0';
    const stringToSign = timestamp + '\n' + secret;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(stringToSign, 'utf-8');
    const sign = hmac.digest('base64');
    return sign;
  }
}
