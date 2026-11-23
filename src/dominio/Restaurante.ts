import { Salao } from './Salao';
import { Cozinha } from './Cozinha';
import { Garcom } from './Garcom';
import { Mesa } from './Mesa';

export class Restaurante {
    private garcons: Garcom[];
    private clientesPerdidosPorFaltaDeMesa: number = 0;
    private clientesDesistentesPorFaltaDeGarcom: number = 0;

    constructor(
        private salao: Salao,
        private cozinha: Cozinha,
        garcons: Garcom[]
    ) {
        if (garcons.length == 0) {
            throw new Error('O restaurante precisa ter pelo menos 1 garçom.');
        }
        this.garcons = garcons.slice();
    }

    public buscarMesaLivre(): Mesa | null {
        return this.salao.buscarMesaLivre();
    }

    // Ocupa e devolve o primeiro garçom livre, ou null se não tiver nenhum livre ae né xD.
    public alocarGarcom(instanteAtual: number): Garcom | null {
        for (let i = 0; i < this.garcons.length; i++) {
            if (this.garcons[i].estaLivre()) {
                this.garcons[i].ocupar(instanteAtual);
                return this.garcons[i];
            }
        }
        return null;
    }

    public liberarGarcom(garcom: Garcom, instanteAtual: number): void {
        garcom.liberar(instanteAtual);
    }

    public registrarClientePerdidoPorFaltaDeMesa(): void {
        this.clientesPerdidosPorFaltaDeMesa++;
    }

    public registrarDesistenciaPorFaltaDeGarcom(): void {
        this.clientesDesistentesPorFaltaDeGarcom++;
    }

    public getClientesPerdidosPorFaltaDeMesa(): number {
        return this.clientesPerdidosPorFaltaDeMesa;
    }

    public getClientesDesistentesPorFaltaDeGarcom(): number {
        return this.clientesDesistentesPorFaltaDeGarcom;
    }

    public getCozinha(): Cozinha {
        return this.cozinha;
    }

    public getGarcons(): Garcom[] {
        return this.garcons.slice();
    }
}