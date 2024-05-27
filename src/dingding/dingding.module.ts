import { Module } from '@nestjs/common';
import { DingdingController } from './dingding.controller';
import { DingdingService } from './dingding.service';
import { MhyModule } from 'src/mhy/mhy.module';

@Module({
  imports: [MhyModule],
  controllers: [DingdingController],
  providers: [DingdingService],
  exports: [DingdingService],
})
export class DingdingModule {}
