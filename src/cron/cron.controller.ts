import { Controller, Get, Post } from '@nestjs/common';
import { CronService } from './cron.service';
import { MhyService } from 'src/mhy/mhy.service';

@Controller('cron')
export class CronController {
  constructor(
    private readonly cronService: CronService,
    private mhyService: MhyService,
  ) {}

  @Get('a')
  test() {
    return this.mhyService.setIsChanged();
  }

  @Get('b')
  test1() {
    return this.mhyService.getIsChanged();
  }

  @Post('startCron')
  startCron() {
    this.cronService.startCron();
  }

  @Post('stopCron')
  stopCron() {
    this.cronService.stopCron();
  }
}
