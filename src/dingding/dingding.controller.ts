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
}
