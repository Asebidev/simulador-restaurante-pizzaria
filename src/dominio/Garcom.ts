// Classe puramente passiva. Não possui timers nem agenda eventos.
export class Garcom {
    private livre : boolean = true;
    private inicioTarefa : number = 0;
    private tempoTotalOcupado : number = 0;

    constructor(public readonly id: number) {}

    public estaLivre(): boolean {
        return this.livre;
    }
    public ocupar(instanteAtual: number): void {
        if (!this.livre) {
            throw new Error(`Garçom ${this.id} já está ocupado.`);
        }
        this.livre = false;
        this.inicioTarefa = instanteAtual;
    }

    public liberar(instanteAtual: number): void {
        if (this.livre) {
            throw new Error(`Garçom ${this.id} já está livre.`);
        }
        this.tempoTotalOcupado += instanteAtual - this.inicioTarefa;
        this.livre = true;
    }

    public getTempoTotalOcupado(): number {
        return this.tempoTotalOcupado;
    }
}
