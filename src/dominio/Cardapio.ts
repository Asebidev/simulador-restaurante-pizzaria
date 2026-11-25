import { Prato } from './Prato';
import { GeradorAleatorio } from '../contratos/GeradorAleatorio';

export class Cardapio {
    private static readonly RESOLUCAO_SORTEIO = 10000;
    private pratos: Prato[];

    constructor(pratos: Prato[]) {
        if (pratos.length == 0) {
            throw new Error('O cardápio precisa ter pelo menos um prato.');
        }
        this.pratos = pratos.slice();
    }

    public sortearPrato(gerador: GeradorAleatorio): Prato {
        const valor = gerador.proximoInteiro(Cardapio.RESOLUCAO_SORTEIO) / Cardapio.RESOLUCAO_SORTEIO;
        let acumulado = 0;
        for (const prato of this.pratos) {
            acumulado += prato.probabilidade;
            if (valor < acumulado) {
                return prato;
            }
        }
        return this.pratos[this.pratos.length - 1];
    }

    public getPratos(): Prato[] {
        return this.pratos.slice();
    }
}