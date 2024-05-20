import { Controller, Get } from '@nestjs/common';
import { MhyService } from './mhy.service';

@Controller('mhy')
export class MhyController {
  constructor(private readonly mhyService: MhyService) {}

  @Get('getLatestPost')
  async getLatestPost() {
    const res =
      await this.mhyService.getTheLatestPostOnTheOfficialAccountOfMiyouClub();
    return res;
  }
}
