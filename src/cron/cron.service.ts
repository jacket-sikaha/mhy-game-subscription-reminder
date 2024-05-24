import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import dayjs from 'dayjs';
import { MhyService } from 'src/mhy/mhy.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  //   注入 SchedulerRegistry
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private mhyService: MhyService,
  ) {}

  // 生命周期函数
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  onApplicationBootstrap() {
    console.log(`The module has been onApplicationBootstrap.`);
    // 自定义cron需要module初始化完成才开始配置
    this.addCronJob('activity', '*/3 * * * * *');
  }

  // 声明式cron
  //   这种cron在onApplicationBootstrap时注册，动态API配置的cron则不会
  //   @Cron('*/10 * * * * *', {
  //     name: 'notifications',
  //     timeZone: 'Europe/Paris',
  //   })
  async handleCron() {
    const posts =
      await this.mhyService.getTheLatestPostOnTheOfficialAccountOfMiyouClub();
    const target = posts.find(({ subject, created_at, images, content }) => {
      return subject.includes('前瞻特别节目'); // 前瞻特别节目预告
    });
    const postTime = dayjs(target.created_at);
    const liveTime = postTime.add(2, 'day');
    console.log('target', target.subject);
    return target;
  }

  addCronJob(name: string, cronTime: string) {
    const job = new CronJob(cronTime, async () => {
      await this.handleCron();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.warn(`job ${name} added for ${cronTime} !`);
  }

  startCron() {
    const job = this.schedulerRegistry.getCronJob('activity');
    job.start();
    return true;
  }

  stopCron() {
    const job = this.schedulerRegistry.getCronJob('activity');
    job.stop();
    return true;
  }
}
