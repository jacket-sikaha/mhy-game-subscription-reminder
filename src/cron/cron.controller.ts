import { Controller, Post } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('startCron')
  startCron() {
    this.cronService.startCron();
  }

  @Post('stopCron')
  stopCron() {
    this.cronService.stopCron();
  }
}
