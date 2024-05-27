import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MhyModule } from './mhy/mhy.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CronModule } from './cron/cron.module';
import { DingdingModule } from './dingding/dingding.module';

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
    DingdingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
