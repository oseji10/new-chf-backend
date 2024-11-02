import { Test, TestingModule } from '@nestjs/testing';
import { CmdsController } from './cmd.controller';

describe('CmdsController', () => {
  let controller: CmdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmdsController],
    }).compile();

    controller = module.get<CmdsController>(CmdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
