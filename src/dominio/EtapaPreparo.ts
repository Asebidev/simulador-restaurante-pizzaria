export class EtapaPreparo {
    constructor(
        public readonly estacaoId: string,
        public readonly duracaoMinutos: number
    ) {
        if (estacaoId == '') {
            throw new Error('A etapa precisa de uma estação.');
        }
        if (duracaoMinutos <= 0) {
            throw new Error('A duração da etapa deve ser maior que zero.');
        }
    }
}