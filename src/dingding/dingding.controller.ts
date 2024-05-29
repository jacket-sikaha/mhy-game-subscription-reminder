import { Controller, Post } from '@nestjs/common';
import { DingdingService } from './dingding.service';

@Controller('dingding')
export class DingdingController {
  constructor(private readonly dingdingService: DingdingService) {}

  @Post('sendDiyGroupMsg')
  async sendDiyGroupMsg() {
    try {
      await this.dingdingService.sendDiyGroupMsg(2);
    } catch (error) {
      console.error(error);
    }
  }
}
