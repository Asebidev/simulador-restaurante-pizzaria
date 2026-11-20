import { Evento } from '../eventos/Evento';

// Padrão Observer: métricas, tela e logs implementam esta interface.
// O Core só conhece a interface, nunca a tela.
export interface IObservadorSimulacao {
    // Chamado depois que cada evento é processado
    aoOcorrerEvento(evento: Evento, instante: number): void;

    // Chamado uma vez, quando a simulação termina
    aoFinalizarSimulacao(instante: number): void;
}