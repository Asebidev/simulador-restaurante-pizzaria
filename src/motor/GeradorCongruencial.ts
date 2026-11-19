import type { GeradorAleatorio } from '../contratos/GeradorAleatorio';

// Gerador congruencial linear multiplicativo (Lehmer / "minstd"):
//     estado(n+1) = (estado(n) * 16807) mod 2147483647
// Mesma semente => mesma sequência => os cenários A e B são reproduzíveis.
export class GeradorCongruencial implements GeradorAleatorio {
    private static readonly MULTIPLICADOR = 16807;
    private static readonly MODULO = 2147483647; // 2^31 - 1 (primo)

    private estado: number;

    constructor(semente: number) {
        if (!Number.isInteger(semente) || semente < 1 || semente > GeradorCongruencial.MODULO - 1) {
            throw new Error('Semente inválida: use um inteiro de 1 a 2147483646.');
        }
        this.estado = semente;
    }

    // Avança o gerador um passo e devolve o novo estado (sempre em [1, MODULO - 1]).
    // O produto cabe com folga nos 53 bits de precisão inteira do number.
    private avancar(): number {
        this.estado = (this.estado * GeradorCongruencial.MULTIPLICADOR) % GeradorCongruencial.MODULO;
        return this.estado;
    }

    public proximoInteiro(limite: number): number {
        if (!Number.isInteger(limite) || limite <= 0) {
            throw new Error('Limite inválido: use um inteiro maior que zero.');
        }
        return this.avancar() % limite;
    }

    public proximo(): number {
        // estado está em [1, MODULO - 1], logo o resultado está em [0, 1).
        return (this.avancar() - 1) / (GeradorCongruencial.MODULO - 1);
    }

    public uniforme(min: number, max: number): number {
        if (max < min) {
            throw new Error(`Intervalo inválido: min (${min}) maior que max (${max}).`);
        }
        return min + (max - min) * this.proximo();
    }

    public exponencial(media: number): number {
        if (media <= 0) {
            throw new Error('A média da distribuição exponencial deve ser positiva.');
        }
        return -media * Math.log(1 - this.proximo()); // 1 - proximo() está em (0, 1]
    }

    public escolherIndicePonderado(pesos: readonly number[]): number {
        if (pesos.length === 0) {
            throw new Error('A lista de pesos não pode ser vazia.');
        }
        if (pesos.some((p) => p < 0)) {
            throw new Error('Os pesos não podem ser negativos.');
        }
        const total = pesos.reduce((soma, p) => soma + p, 0);
        if (total <= 0) {
            throw new Error('A soma dos pesos deve ser maior que zero.');
        }
        let sorteado = this.proximo() * total;
        for (let i = 0; i < pesos.length; i++) {
            sorteado -= pesos[i];
            if (sorteado < 0) return i;
        }
        return pesos.length - 1; // proteção contra erro de arredondamento
    }
}