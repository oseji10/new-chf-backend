import { Test, TestingModule } from '@nestjs/testing';
import { CmdsService } from './cmd.service';

describe('SocialWorkersService', () => {
  let service: CmdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmdsService],
    }).compile();

    service = module.get<CmdsService>(CmdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
