import { Controller, Post } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('startCron')
  startCron() {
    return this.cronService.startCron();
  }

  @Post('stopCron')
  stopCron() {
    return this.cronService.stopCron();
  }
}
