import { EstadoMesa } from './estados/EstadoMesa';
import { Cliente } from './Cliente';

export class Mesa {
    private estado: EstadoMesa = EstadoMesa.livre;
    private cliente: Cliente | null = null;

    constructor(public readonly numero: number) {}

    public estaLivre(): boolean {
        return this.estado == EstadoMesa.livre;
    }

    public getCliente(): Cliente | null {
        return this.cliente;
    }

    public ocupar(cliente: Cliente): void {
        if (!this.estaLivre()) {
            throw new Error(`A mesa ${this.numero} já está ocupada.`);
        }
        this.estado = EstadoMesa.ocupada;
        this.cliente = cliente;
    }

    public liberar(): void {
        if (this.estaLivre()) {
            throw new Error(`A mesa ${this.numero} já está livre.`);
        }
        this.estado = EstadoMesa.livre;
        this.cliente = null;
    }
}
