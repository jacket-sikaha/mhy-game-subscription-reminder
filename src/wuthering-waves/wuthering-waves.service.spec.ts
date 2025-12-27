import { Test, TestingModule } from '@nestjs/testing';
import { WutheringWavesService } from './wuthering-waves.service';

describe('WutheringWavesService', () => {
  let service: WutheringWavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WutheringWavesService],
    }).compile();

    service = module.get<WutheringWavesService>(WutheringWavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
