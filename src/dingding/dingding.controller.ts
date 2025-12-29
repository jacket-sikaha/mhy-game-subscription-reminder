import { Body, Controller, Post } from '@nestjs/common';
import { DingdingService } from './dingding.service';
import { GameTypeDto } from './interfaces/game-type.dto';

@Controller('dingding')
export class DingdingController {
  constructor(private readonly dingdingService: DingdingService) {}

  @Post('sendDiyGroupMsg')
  async sendDiyGroupMsg(@Body() gameTypeDto: GameTypeDto) {
    try {
      const result = await this.dingdingService.sendDiyGroupMsg(
        gameTypeDto.type,
      );
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  @Post('mc-msg')
  async sendMarkdownMsgByType() {
    try {
      await this.dingdingService.sendWutheringWavesMsg();
      return { result: 'success' };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  @Post('zzz-msg')
  async sendZZZMarkdownMsgByType() {
    try {
      await this.dingdingService.sendZZZMsg();
      return { result: 'success' };
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
