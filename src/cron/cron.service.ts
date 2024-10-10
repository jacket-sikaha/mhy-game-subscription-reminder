import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import dayjs from 'dayjs';
import { DingdingService } from 'src/dingding/dingding.service';
import { GameType } from 'src/mhy/interfaces/game-type';
import { MhyService } from 'src/mhy/mhy.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  //   注入 SchedulerRegistry
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private mhyService: MhyService,
    private dingdingService: DingdingService,
  ) {}

  // 生命周期函数
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  onApplicationBootstrap() {
    console.log(
      `The module has been onApplicationBootstrap.`,
      dayjs().format(),
    );
    // 自定义cron需要module初始化完成才开始配置
    this.addCronJob('activity', '30 1,4,10 * * *');
    // this.addCronJob('activity', '0/5 * * * * *');
  }

  // 声明式cron
  //   这种cron在onApplicationBootstrap时注册，动态API配置的cron则不会
  //   @Cron('*/10 * * * * *', {
  //     name: 'notifications',
  //     timeZone: 'Europe/Paris',
  //   })
  async handleCron() {
    console.log('result', Date.now());
  }

  addCronJob(name: string, cronTime: string) {
    const job = new CronJob(cronTime, async () => {
      try {
        const result = await Promise.all(
          [GameType.Genshin, GameType.StarRail].map((item) =>
            this.dingdingService.sendDiyGroupMsg(item),
          ),
        );
        console.log('result', result);
      } catch (error) {
        console.error(error);
      }
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
