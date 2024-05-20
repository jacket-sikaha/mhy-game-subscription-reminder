import { Controller, Get } from '@nestjs/common';
import { MhyService } from './mhy.service';

@Controller('mhy')
export class MhyController {
  constructor(private readonly mhyService: MhyService) {}

  @Get('a')
  test() {
    return this.mhyService.setIsChanged();
  }

  @Get('b')
  test1() {
    return this.mhyService.getIsChanged();
  }

  @Get('getLatestPost')
  async getLatestPost() {
    const res =
      await this.mhyService.getTheLatestPostOnTheOfficialAccountOfMiyouClub();
    return res;
  }
}
