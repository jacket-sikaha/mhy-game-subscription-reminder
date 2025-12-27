import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MhyModule } from './mhy/mhy.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CronModule } from './cron/cron.module';
import { DingdingModule } from './dingding/dingding.module';
import { OcrModule } from './ocr/ocr.module';
import { ConfigModule } from '@nestjs/config';
import { WutheringWavesModule } from './wuthering-waves/wuthering-waves.module';

@Module({
  // 激活作业调度
  // 所需要加载的module全部都要在根模块进行加载
  imports: [
    ConfigModule.forRoot(),
    MhyModule,
    ScheduleModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 1111,
    }),
    CronModule,
    DingdingModule,
    OcrModule,
    WutheringWavesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
