import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { CronController } from './cron/cron.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MhyModule } from './mhy/mhy.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CronModule } from './cron/cron.module';

@Module({
  // 激活作业调度
  // 所需要加载的module全部都要在根模块进行加载
  imports: [
    MhyModule,
    ScheduleModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 1111,
    }),
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
