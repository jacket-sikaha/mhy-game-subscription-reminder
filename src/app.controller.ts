import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import asd from './util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('asd', asd);
    asd.aa();
    return this.appService.getHello();
  }
}
