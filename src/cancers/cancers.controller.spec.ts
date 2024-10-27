import { Test, TestingModule } from '@nestjs/testing';
import { CancersController } from './cancers.controller';

describe('CancersController', () => {
  let controller: CancersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancersController],
    }).compile();

    controller = module.get<CancersController>(CancersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
