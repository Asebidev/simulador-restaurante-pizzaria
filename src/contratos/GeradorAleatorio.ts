// Contrato do gerador de números aleatórios.
// Os eventos dependem só desta interface, nunca de uma implementação concreta.
// REGRA DO GRUPO: nunca usar Math.random(). Todo sorteio passa por um GeradorAleatorio.
export interface GeradorAleatorio {
    // Inteiro em [0, limite). O limite deve ser inteiro e maior que zero.
    proximoInteiro(limite: number): number;

    // Número real em [0, 1).
    proximo(): number;

    // Real uniforme em [min, max). Ex.: tempo de decisão entre 2 e 5 minutos.
    uniforme(min: number, max: number): number;

    // Real com distribuição exponencial e a média dada.
    // Útil para o tempo entre chegadas de clientes (taxa λ).
    exponencial(media: number): number;

    // Sorteio ponderado: recebe os pesos (ex.: probabilidades do cardápio)
    // e devolve o índice sorteado.
    escolherIndicePonderado(pesos: readonly number[]): number;
}