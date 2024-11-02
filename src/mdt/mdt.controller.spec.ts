import { Test, TestingModule } from '@nestjs/testing';
import { MdtsController } from './mdt.controller';

describe('MdtsController', () => {
  let controller: MdtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdtsController],
    }).compile();

    controller = module.get<MdtsController>(MdtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
