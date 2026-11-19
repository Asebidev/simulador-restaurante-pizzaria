import { EstadoCliente } from './estados/EstadoCliente';

export class Cliente {
    private estado: EstadoCliente = EstadoCliente.decidindo;
    private tentativas: number = 0;
    public ficouIrritado: boolean = false;
    public desistiu: boolean = false;

    constructor(
        public readonly id: number,
        public readonly instanteChegada: number
    ) {}

    public getEstado(): EstadoCliente {
        return this.estado;
    }

    public getTentativas(): number {
        return this.tentativas;
    }

    public incrementarTentativa(): number {
        this.tentativas++;
        return this.tentativas;
    }

    public zerarTentativas(): void {
        this.tentativas = 0;
    }

    // verificar se o cliente pode mudar de estado
    public mudarEstado(novoEstado: EstadoCliente): void {
        if (!this.podeMudarPara(novoEstado)) {
            throw new Error(`Transição de estado inválida: de ${this.estado} para ${novoEstado}`);
        }
        this.estado = novoEstado;
    }

    private podeMudarPara(novoEstado: EstadoCliente): boolean {
        if (this.estado == EstadoCliente.decidindo) {
            return novoEstado == EstadoCliente.tentandoChamarGarcom;
        }
        if (this.estado == EstadoCliente.tentandoChamarGarcom) {
            return novoEstado == EstadoCliente.pedindo || novoEstado == EstadoCliente.finalizado;
        }
        if (this.estado == EstadoCliente.pedindo) {
            return novoEstado == EstadoCliente.aguardandoComida;
        }
        if (this.estado == EstadoCliente.aguardandoComida) {
            return novoEstado == EstadoCliente.comendo;
        }
        if (this.estado == EstadoCliente.comendo) {
            return novoEstado == EstadoCliente.tentandoPedirConta;
        }
        if (this.estado == EstadoCliente.tentandoPedirConta) {
            return novoEstado == EstadoCliente.pagando;
        }
        if (this.estado == EstadoCliente.pagando) {
            return novoEstado == EstadoCliente.finalizado;
        }
        return false;
    }
}
