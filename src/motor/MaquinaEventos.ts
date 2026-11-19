import { Evento } from '../eventos/Evento';

export class MaquinaEventos {
    private filaEventos: Evento[] = [];
    private instanteAtual: number = 0;

    public adicionarEvento(evento: Evento): void {
        if (evento.getTimestamp() < this.instanteAtual) {
            throw new Error(
                `Não é possível agendar no passado: evento em ${evento.getTimestamp()}, relógio em ${this.instanteAtual}.`
            );
        }

        // Procura a primeira posição cujo evento seja DEPOIS do novo (timestamp maior).
        // Assim, eventos com o mesmo timestamp ficam na ordem em que foram adicionados.
        let posicao = this.filaEventos.length;
        for (let i = 0; i < this.filaEventos.length; i++) {
            if (this.filaEventos[i].getTimestamp() > evento.getTimestamp()) {
                posicao = i;
                break;
            }
        }
        this.filaEventos.splice(posicao, 0, evento);
    }

    // Executa até a fila esvaziar. O callback (opcional) é chamado após cada evento
    // e é por onde o Simulador vai avisar os observadores.
    public processarEventos(aoProcessar?: (evento: Evento, instante: number) => void): void {
        while (this.filaEventos.length > 0) {
            const evento = this.filaEventos.shift()!;
            this.instanteAtual = evento.getTimestamp(); // o relógio "salta" até o evento
            evento.processarEvento();
            aoProcessar?.(evento, this.instanteAtual);
        }
    }

    public getInstanteAtual(): number {
        return this.instanteAtual;
    }

    public getQuantidadePendentes(): number {
        return this.filaEventos.length;
    }
}