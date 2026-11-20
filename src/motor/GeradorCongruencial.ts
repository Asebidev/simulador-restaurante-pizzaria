import type { GeradorAleatorio } from '../contratos/GeradorAleatorio';

// Gera números pseudoaleatórios para a simulação.
export class GeradorCongruencial implements GeradorAleatorio {
    private estado: number;

    // Define a semente inicial do gerador.
    constructor(semente: number) {
        if (!Number.isInteger(semente) || semente < 1 || semente > 2147483646) {
            throw new Error("Semente inválida: use um inteiro de 1 a 2147483646.");
        }

        this.estado = semente;
    }

    // Gera um número inteiro dentro do limite informado.
    proximoInteiro(limite: number): number {
        if (!Number.isInteger(limite) || limite <= 0) {
            throw new Error("Limite inválido: use um inteiro maior que zero.");
        }

        this.estado = (this.estado * 16807) % 2147483647;

        return this.estado % limite;
    }

    proximoInteiroEntre(min: number, max: number): number {
        if (!Number.isInteger(min) || !Number.isInteger(max) || max < min) {
            throw new Error(`Faixa inválida: [${min}, ${max}]`);
        }

        return min + this.proximoInteiro(max - min + 1);
    }
}
