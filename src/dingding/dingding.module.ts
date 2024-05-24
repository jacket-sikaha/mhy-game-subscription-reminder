import { Module } from '@nestjs/common';
import { DingdingController } from './dingding.controller';
import { DingdingService } from './dingding.service';

@Module({
  controllers: [DingdingController],
  providers: [DingdingService],
  exports: [DingdingService],
})
export class DingdingModule {}
