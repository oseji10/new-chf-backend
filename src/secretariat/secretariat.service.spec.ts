import { Test, TestingModule } from '@nestjs/testing';
import { SecretariatsService } from './secretariat.service';

describe('SocialWorkersService', () => {
  let service: SecretariatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretariatsService],
    }).compile();

    service = module.get<SecretariatsService>(SecretariatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
