import { Pedido } from './Pedido';

export class Estacao {
    private vagasOcupadas: number = 0;
    private fila: Pedido[] = [];
    private tamanhoMaximoFila: number = 0;
    private tempoTotalEmFila: number = 0;
    private quantidadeDePratosAtendidos: number = 0;
    private tempoTotalDeVagasOcupadas: number = 0;
    private instanteUltimaMudanca: number = 0;

    constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly capacidade: number
    ) {
        if (capacidade <= 0) {
            throw new Error(`A estação ${id} precisa ter pelo menos 1 vaga.`);
        }
    }

    public temVagaLivre(): boolean {
        return this.vagasOcupadas < this.capacidade;
    }

    public ocuparVaga(instanteAtual: number): void {
        if (!this.temVagaLivre()) {
            throw new Error(`A estação ${this.id} está lotada.`);
        }
        this.acumularOcupacao(instanteAtual);
        this.vagasOcupadas++;
        this.quantidadeDePratosAtendidos++;
    }

    public liberarVaga(instanteAtual: number): void {
        if (this.vagasOcupadas == 0) {
            throw new Error(`A estação ${this.id} não tem vaga ocupada para liberar.`);
        }
        this.acumularOcupacao(instanteAtual);
        this.vagasOcupadas--;
    }

    public entrarNaFila(pedido: Pedido, instanteAtual: number): void {
        pedido.registrarEntradaNaFila(instanteAtual);
        this.fila.push(pedido);
        if (this.fila.length > this.tamanhoMaximoFila) {
            this.tamanhoMaximoFila = this.fila.length;
        }
    }

    public temPedidoNaFila(): boolean {
        return this.fila.length > 0;
    }

    public retirarProximoDaFila(instanteAtual: number): Pedido {
        const pedido = this.fila.shift();
        if (pedido == undefined) {
            throw new Error(`A fila da estação ${this.id} está vazia.`);
        }
        this.tempoTotalEmFila += instanteAtual - pedido.getInstanteEntradaFila();
        return pedido;
    }

    public getTamanhoFila(): number {
        return this.fila.length;
    }

    public getVagasOcupadas(): number {
        return this.vagasOcupadas;
    }

    public getTamanhoMaximoFila(): number {
        return this.tamanhoMaximoFila;
    }

    public getTempoMedioEmFila(): number {
        if (this.quantidadeDePratosAtendidos == 0) {
            return 0;
        }
        return this.tempoTotalEmFila / this.quantidadeDePratosAtendidos;
    }

    public getTaxaOcupacao(instanteFinal: number): number {
        if (instanteFinal <= 0) {
            return 0;
        }
        const tempoOcupado = this.tempoTotalDeVagasOcupadas
            + this.vagasOcupadas * (instanteFinal - this.instanteUltimaMudanca);
        return tempoOcupado / (this.capacidade * instanteFinal);
    }

    private acumularOcupacao(instanteAtual: number): void {
        this.tempoTotalDeVagasOcupadas += this.vagasOcupadas * (instanteAtual - this.instanteUltimaMudanca);
        this.instanteUltimaMudanca = instanteAtual;
    }
}