import { Module } from '@nestjs/common';
import { ConsumoEnergiaController } from './consumo_energia.controller';
import { ConsumoEnergiaService } from './consumo_energia.service';

@Module({
  controllers: [ConsumoEnergiaController],
  providers: [ConsumoEnergiaService]
})
export class ConsumoEnergiaModule { }
