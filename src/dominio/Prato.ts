import { EtapaPreparo } from './EtapaPreparo';

export class Prato {
    private etapas: EtapaPreparo[];

    constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly probabilidade: number,
        etapas: EtapaPreparo[]
    ) {
        if (probabilidade < 0 || probabilidade > 1) {
            throw new Error(`A probabilidade do prato ${id} deve estar entre 0 e 1.`);
        }
        if (etapas.length == 0) {
            throw new Error(`O prato ${id} precisa de pelo menos uma etapa de preparo.`);
        }
        this.etapas = etapas.slice();
    }

    public getQuantidadeEtapas(): number {
        return this.etapas.length;
    }

    public getEtapa(indice: number): EtapaPreparo {
        if (indice < 0 || indice >= this.etapas.length) {
            throw new Error(`O prato ${this.id} não tem etapa no índice ${indice}.`);
        }
        return this.etapas[indice];
    }
}