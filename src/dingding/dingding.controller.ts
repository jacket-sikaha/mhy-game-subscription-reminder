import { Controller, Post } from '@nestjs/common';
import { DingdingService } from './dingding.service';

@Controller('dingding')
export class DingdingController {
  constructor(private readonly dingdingService: DingdingService) {}

  @Post('sendDiyGroupMsg')
  async sendDiyGroupMsg() {
    try {
      const result = await this.dingdingService.sendDiyGroupMsg(2);
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
