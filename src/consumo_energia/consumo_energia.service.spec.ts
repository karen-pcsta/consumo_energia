import { Test, TestingModule } from '@nestjs/testing';
import { ConsumoEnergiaService } from './consumo_energia.service';

describe('ConsumoEnergiaService', () => {
  let service: ConsumoEnergiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumoEnergiaService],
    }).compile();

    service = module.get<ConsumoEnergiaService>(ConsumoEnergiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
