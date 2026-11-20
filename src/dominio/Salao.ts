import { Mesa } from './Mesa';

export class Salao {
    private mesas: Mesa[] = [];

    constructor(quantidadeMesas: number) {
        if (quantidadeMesas <= 0) {
            throw new Error('O salão precisa ter pelo menos 1 mesa.');
        }

        for (let i = 1; i <= quantidadeMesas; i++) {
            this.mesas.push(new Mesa(i));
        }
    }

    public buscarMesaLivre(): Mesa | null {
        for (let i = 0; i < this.mesas.length; i++) {
            if (this.mesas[i].estaLivre()) {
                return this.mesas[i];
            }
        }
        return null;
    }

    public getQuantidadeMesas(): number {
        return this.mesas.length;
    }
}