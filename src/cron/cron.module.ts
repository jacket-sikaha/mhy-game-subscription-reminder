import { Module } from '@nestjs/common';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';
import { MhyModule } from 'src/mhy/mhy.module';
import { DingdingModule } from 'src/dingding/dingding.module';

@Module({
  imports: [MhyModule, DingdingModule], // 使用MhyModule共享模块
  controllers: [CronController],
  // 这种不export的module直接这么导入使用，就会创建一个新的实例，不是原来的MhyService
  //   providers: [CronService, MhyService],
  providers: [CronService],
})
export class CronModule {}
