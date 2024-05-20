import { Test, TestingModule } from '@nestjs/testing';
import { MhyService } from './mhy.service';

describe('MhyService', () => {
  let service: MhyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MhyService],
    }).compile();

    service = module.get<MhyService>(MhyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
