import { Module } from '@nestjs/common';
import { DingdingController } from './dingding.controller';
import { DingdingService } from './dingding.service';
import { MhyModule } from 'src/mhy/mhy.module';
import { WutheringWavesModule } from 'src/wuthering-waves/wuthering-waves.module';

@Module({
  imports: [MhyModule, WutheringWavesModule],
  controllers: [DingdingController],
  providers: [DingdingService],
  exports: [DingdingService],
})
export class DingdingModule {}
