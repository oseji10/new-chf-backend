import { Test, TestingModule } from '@nestjs/testing';
import { SocialWorkersService } from './mdt.service';

describe('SocialWorkersService', () => {
  let service: SocialWorkersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialWorkersService],
    }).compile();

    service = module.get<SocialWorkersService>(SocialWorkersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
