import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoEnergiaModule } from './consumo_energia/consumo_energia.module';

@Module({
  imports: [ConsumoEnergiaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
