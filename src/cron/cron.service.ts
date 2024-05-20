import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  //   注入 SchedulerRegistry
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // 生命周期函数
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  onApplicationBootstrap() {
    console.log(`The module has been onApplicationBootstrap.`);
    this.addCronJob('activity', '*/10 * * * * *');
  }

  // 声明式cron
  //   这种cron在onApplicationBootstrap时注册，动态API配置的cron则不会
  //   @Cron('*/10 * * * * *', {
  //     name: 'notifications',
  //     timeZone: 'Europe/Paris',
  //   })
  handleCron() {
    const job = this.schedulerRegistry.doesExist('cron', 'activity');
    this.logger.verbose(job);
    return 'asd';
  }

  addCronJob(name: string, cronTime: string) {
    const job = new CronJob(cronTime, () => {
      this.logger.warn(`job ${name} is running!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for ${cronTime} !`);
  }

  startCron() {
    const job = this.schedulerRegistry.getCronJob('activity');
    job.start();
  }

  stopCron() {
    const job = this.schedulerRegistry.getCronJob('activity');
    job.stop();
    console.log(job.lastDate());
  }
}
