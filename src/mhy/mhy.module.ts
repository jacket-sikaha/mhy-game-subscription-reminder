import { Module } from '@nestjs/common';
import { MhyController } from './mhy.controller';
import { MhyService } from './mhy.service';

@Module({
  controllers: [MhyController],
  providers: [MhyService], // 这行导入进来的服务提供给该module的controllers使用
  //  有了这一行，MhyService就会变成共享模块
  //  任何导入 MhyModule 的模块都可以访问 MhyService，并将与导入它的所有其他模块共享同一个实例
  exports: [MhyService],
})
export class MhyModule {}
