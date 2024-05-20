import { Test, TestingModule } from '@nestjs/testing';
import { MhyController } from './mhy.controller';

describe('MhyController', () => {
  let controller: MhyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MhyController],
    }).compile();

    controller = module.get<MhyController>(MhyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
