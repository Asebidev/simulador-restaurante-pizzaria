// contratos/GeradorAleatorio.ts
export interface GeradorAleatorio {
    // Retorna inteiro em [0, limite)
    proximoInteiro(limite: number): number;

    // Retorna inteiro em [min, max] (inclusivo)
    proximoInteiroEntre(min: number, max: number): number;
}