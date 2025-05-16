import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ConsumoEnergiaService } from './consumo_energia.service';
import { ConsumoEnergia } from './consumo_energia.model';

@Controller('consumo-energia')
export class ConsumoEnergiaController {
    constructor(private consumoService: ConsumoEnergiaService) { }

    @Post()
    criar(@Body() dados: ConsumoEnergia) {
        return this.consumoService.salvarConsumo(dados);
    }

    @Get(':id/historico')
    buscarHistorico(
        @Param('id') id: string,
        @Query('inicio') inicio: string,
        @Query('fim') fim: string,
    ) {

        const userId = Number(id);
        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);

        return this.consumoService.buscarHistorico(userId, dataInicio, dataFim);
    }

    @Get(':id/alerta')
    verificarAlerta(@Param('id') id: string) {
        const userId = Number(id);
        const resultado = this.consumoService.checarAlertaConsumo(userId);

        if (
            resultado.temAlerta &&
            resultado.mensagem.includes('2 meses de registros')
        ) {
            throw new BadRequestException(resultado.mensagem);
        }

        return resultado;
    }
}
