import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { CronController } from './cron/cron.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MhyModule } from './mhy/mhy.module';

@Module({
  // 激活作业调度
  imports: [ScheduleModule.forRoot(), MhyModule],
  controllers: [AppController, CronController],
  providers: [AppService, CronService],
})
export class AppModule {}
