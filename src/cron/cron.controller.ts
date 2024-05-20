import { Controller, Post } from '@nestjs/common';
import { CronService } from './cron.service';
import { MhyService } from 'src/mhy/mhy.service';

@Controller('cron')
export class CronController {
  constructor(
    private readonly cronService: CronService,
    private mhyService: MhyService,
  ) {}

  @Post('startCron')
  startCron() {
    this.cronService.startCron();
  }

  @Post('stopCron')
  stopCron() {
    this.cronService.stopCron();
  }
}
