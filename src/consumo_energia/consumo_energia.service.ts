import { Injectable } from '@nestjs/common';
import { ConsumoEnergia } from './consumo_energia.model';

@Injectable()
export class ConsumoEnergiaService {

    private listaConsumos: ConsumoEnergia[] = [];
    private proximoId = 1;

    salvarConsumo(consumo: ConsumoEnergia): ConsumoEnergia {
        consumo.id = this.proximoId;
        this.proximoId++;

        if (typeof consumo.dataLeitura === 'string') {
            consumo.dataLeitura = new Date(consumo.dataLeitura);
        }

        this.listaConsumos.push(consumo);

        return consumo;
    }

    buscarHistorico(
        usuarioId: number,
        dataInicial: Date,
        dataFinal: Date,
    ): ConsumoEnergia[] {
        const historico = this.listaConsumos.filter(consumo => {
            return (
                consumo.usuarioId === usuarioId &&
                consumo.dataLeitura >= dataInicial &&
                consumo.dataLeitura <= dataFinal
            );
        });

        return historico;
    }

    checarAlertaConsumo(usuarioId: number): { temAlerta: boolean; mensagem: string } {
        const registrosUsuario = this.listaConsumos.filter(
            consumo => consumo.usuarioId === usuarioId
        );

        if (registrosUsuario.length < 2) {
            return {
                temAlerta: true,
                mensagem: 'Precisa ter pelo menos 2 meses de registros para verificar alertas',
            };
        }

        registrosUsuario.sort((a, b) => {
            return b.dataLeitura.getTime() - a.dataLeitura.getTime();
        });

        const mesAtual = registrosUsuario[0];
        const mesAnterior = registrosUsuario[1];

        if (mesAtual.consumoKwh > mesAnterior.consumoKwh) {
            return {
                temAlerta: true,
                mensagem: `ATENÇÃO!!! Seu consumo atual de ${mesAtual.consumoKwh} kWh é maior que o anterior (${mesAnterior.consumoKwh} kWh)`,
            };
        } else {
            return {
                temAlerta: false,
                mensagem: 'Seu consumo está normal ou menor que o mês anterior',
            };
        }
    }
}
