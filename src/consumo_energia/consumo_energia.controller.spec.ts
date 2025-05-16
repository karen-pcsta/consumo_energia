import { Test, TestingModule } from '@nestjs/testing';
import { ConsumoEnergiaController } from './consumo_energia.controller';

describe('ConsumoEnergiaController', () => {
  let controller: ConsumoEnergiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumoEnergiaController],
    }).compile();

    controller = module.get<ConsumoEnergiaController>(ConsumoEnergiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
