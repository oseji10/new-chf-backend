import { Test, TestingModule } from '@nestjs/testing';
import { SocialWorkersController } from './social_worker.controller';

describe('SocialWorkersController', () => {
  let controller: SocialWorkersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialWorkersController],
    }).compile();

    controller = module.get<SocialWorkersController>(SocialWorkersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
