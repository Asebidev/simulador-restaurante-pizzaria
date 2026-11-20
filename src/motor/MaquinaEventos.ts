import { Evento } from '../eventos/Evento';

export class MaquinaEventos {

    // Lista de eventos que ainda precisam ser executados.
    private filaEventos: Evento[] = [];

    // Guarda o tempo atual da simulação.
    private tempoAtual: number = 0;

    // Indica que a simulação foi encerrada e não aceita novos eventos.
    private encerrada: boolean = false;

    // Adiciona um evento na fila, respeitando a ordem dos horários.
    public adicionarEvento(evento: Evento): void {

        // Impede agendamento após o encerramento da simulação.
        if (this.encerrada) {
            throw new Error(
                `Máquina encerrada: não é possível agendar evento em ${evento.getTempoEvento()}.`
            );
        }

        // Impede que um evento seja agendado no passado.
        if (evento.getTempoEvento() < this.tempoAtual) {
            throw new Error(
                `Não é possível agendar no passado: evento em ${evento.getTempoEvento()}, relógio em ${this.tempoAtual}.`
            );
        }

        // Procura a posição correta para inserir o novo evento.
        // Eventos com o mesmo horário mantêm a ordem em que foram adicionados.
        let posicao = this.filaEventos.length;

        for (let i = 0; i < this.filaEventos.length; i++) {
            if (this.filaEventos[i].getTempoEvento() > evento.getTempoEvento()) {
                posicao = i;
                break;
            }
        }

        // Insere o evento na posição encontrada.
        this.filaEventos.splice(posicao, 0, evento);
    }

    public processarProximoEvento(): Evento | null {

        const evento = this.filaEventos.shift();

        if (!evento) {
            return null;
        }

        // Atualiza o tempo da simulação para o momento do evento.
        this.tempoAtual = evento.getTempoEvento();

        // Executa a ação correspondente ao evento.
        evento.processarEvento();

        return evento;
    }

    public processarEventos(
        aoProcessar?: (evento: Evento, tempo: number) => void
    ): void {

        let evento: Evento | null;

        while ((evento = this.processarProximoEvento()) !== null) {
            aoProcessar?.(evento, this.tempoAtual);
        }
    }

    public encerrar(): void {
        this.encerrada = true;
    }

    public isEncerrada(): boolean {
        return this.encerrada;
    }

    // Retorna o tempo atual da simulação.
    public getTempoAtual(): number {
        return this.tempoAtual;
    }

    // Informa quantos eventos ainda aguardam execução.
    public getQuantidadePendentes(): number {
        return this.filaEventos.length;
    }
}