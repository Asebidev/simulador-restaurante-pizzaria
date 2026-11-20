import { MaquinaEventos } from '../motor/MaquinaEventos';
import { Restaurante } from '../dominio/Restaurante';

export abstract class Evento {

    // Guarda o momento em que o evento deve acontecer.
    protected tempoEvento: number;

    // Controla a execução e organização dos eventos.
    protected maquina: MaquinaEventos;

    // Representa o restaurante onde o evento acontece.
    protected restaurante: Restaurante;

    constructor(
        tempoEvento: number,
        maquina: MaquinaEventos,
        restaurante: Restaurante
    ) {
        this.tempoEvento = tempoEvento;
        this.maquina = maquina;
        this.restaurante = restaurante;
    }

    // Retorna o momento programado para o evento.
    public getTempoEvento(): number {
        return this.tempoEvento;
    }

    // Cada evento filho implementa sua própria ação.
    public abstract processarEvento(): void;
}
