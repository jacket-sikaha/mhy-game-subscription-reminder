import { Test, TestingModule } from '@nestjs/testing';
import { WutheringWavesController } from './wuthering-waves.controller';

describe('WutheringWavesController', () => {
  let controller: WutheringWavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WutheringWavesController],
    }).compile();

    controller = module.get<WutheringWavesController>(WutheringWavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
