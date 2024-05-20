import { Injectable } from '@nestjs/common';
import asd from './util';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify(asd);
  }
}
