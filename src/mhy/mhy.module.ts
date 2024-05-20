import { Module } from '@nestjs/common';
import { MhyController } from './mhy.controller';
import { MhyService } from './mhy.service';

@Module({
  controllers: [MhyController],
  providers: [MhyService],
  exports: [MhyService],
})
export class MhyModule {}
