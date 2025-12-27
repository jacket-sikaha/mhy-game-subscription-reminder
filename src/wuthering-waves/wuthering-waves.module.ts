import { Module } from '@nestjs/common';
import { WutheringWavesController } from './wuthering-waves.controller';
import { WutheringWavesService } from './wuthering-waves.service';

@Module({
  controllers: [WutheringWavesController],
  providers: [WutheringWavesService],
  //  有了这一行，WutheringWavesService就会变成共享模块
  //  任何导入 WutheringWavesModule 的模块都可以访问 WutheringWavesService，并将与导入它的所有其他模块共享同一个实例
  exports: [WutheringWavesService],
})
export class WutheringWavesModule {}
