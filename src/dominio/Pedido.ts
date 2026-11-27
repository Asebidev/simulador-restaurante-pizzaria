import { Cliente } from './Cliente';
import { Mesa } from './Mesa';
import { Prato } from './Prato';
import { EtapaPreparo } from './EtapaPreparo';

export class Pedido {
    private etapaAtualIndex: number = 0;
    private instanteEntradaFila: number = 0;

    constructor(
        public readonly id: number,
        public readonly cliente: Cliente,
        public readonly mesa: Mesa,
        public readonly prato: Prato,
        public readonly instantePedido: number
    ) {}

    public getEtapaAtual(): EtapaPreparo {
        return this.prato.getEtapa(this.etapaAtualIndex);
    }

    public temProximaEtapa(): boolean {
        return this.etapaAtualIndex + 1 < this.prato.getQuantidadeEtapas();
    }

    public avancarEtapa(): void {
        if (!this.temProximaEtapa()) {
            throw new Error(`O pedido ${this.id} já está na última etapa.`);
        }
        this.etapaAtualIndex++;
    }

    public registrarEntradaNaFila(instanteAtual: number): void {
        this.instanteEntradaFila = instanteAtual;
    }

    public getInstanteEntradaFila(): number {
        return this.instanteEntradaFila;
    }
}