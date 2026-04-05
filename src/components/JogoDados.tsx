'use client';

import { useState } from 'react';
import Dado from './Dado';

type Turno = 'j1' | 'j2' | 'resultado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [jogador1Dados, setJogador1Dados] = useState<[number, number] | null>(null);
  const [jogador2Dados, setJogador2Dados] = useState<[number, number] | null>(null);
  const [resultadoRodada, setResultadoRodada] = useState<'Ganhou' | 'Perdeu' | 'Empatou' | null>(null);
  const [vencedorRodada, setVencedorRodada] = useState<string | null>(null);
  const [vitoriasJ1, setVitoriasJ1] = useState(0);
  const [vitoriasJ2, setVitoriasJ2] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [vencedorFinal, setVencedorFinal] = useState<'Jogador 1' | 'Jogador 2' | 'Empate' | null>(null);
  const [turno, setTurno] = useState<Turno>('j1');
  const [nomeJ1, setNomeJ1] = useState('Jogador 1');
  const [nomeJ2, setNomeJ2] = useState('Jogador 2');
  const nomeExibidoJ1 = nomeJ1.trim() || 'Jogador 1';
  const nomeExibidoJ2 = nomeJ2.trim() || 'Jogador 2';

  const gerarDado = () => Math.floor(Math.random() * 6) + 1;

  const jogarDados = (jogador: 1 | 2) => {
    const dado1 = gerarDado();
    const dado2 = gerarDado();
    if (jogador === 1) {
      setJogador1Dados([dado1, dado2]);
      setTurno('j2');
    } else {
      setJogador2Dados([dado1, dado2]);
      setTurno('resultado');
      determinarResultado([dado1, dado2]);
    }
  };

  const determinarResultado = (dadosJ2: [number, number]) => {
    if (!jogador1Dados) return;
    const soma1 = jogador1Dados[0] + jogador1Dados[1];
    const soma2 = dadosJ2[0] + dadosJ2[1];
    if (soma1 > soma2) {
      setResultadoRodada('Ganhou');
      setVencedorRodada(nomeExibidoJ1);
      setVitoriasJ1(prev => prev + 1);
    } else if (soma2 > soma1) {
      setResultadoRodada('Perdeu');
      setVencedorRodada(nomeExibidoJ2);
      setVitoriasJ2(prev => prev + 1);
    } else {
      setResultadoRodada('Empatou');
      setVencedorRodada('Empate');
    }
  };

  const proximaRodada = () => {
    if (rodada === 5) {
      setJogoFinalizado(true);
      if (vitoriasJ1 > vitoriasJ2) {
        setVencedorFinal(nomeJ1);
      } else if (vitoriasJ2 > vitoriasJ1) {
        setVencedorFinal(nomeJ2);
      } else {
        setVencedorFinal('Empate');
      }
    } else {
      setRodada(prev => prev + 1);
      setJogador1Dados(null);
      setJogador2Dados(null);
      setResultadoRodada(null);
      setVencedorRodada(null);
      setTurno('j1');
    }
  };

  const resetarJogo = () => {
    setRodada(1);
    setJogador1Dados(null);
    setJogador2Dados(null);
    setResultadoRodada(null);
    setVencedorRodada(null);
    setVitoriasJ1(0);
    setVitoriasJ2(0);
    setJogoFinalizado(false);
    setVencedorFinal(null);
    setTurno('j1');
  };

  const podeJogarJ1 = turno === 'j1' && !jogoFinalizado;
  const podeJogarJ2 = turno === 'j2' && !jogoFinalizado;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-black">Jogo de Dados</h1>
      
      {/* Inputs para nomes */}
      <div className="flex space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Nome do Jogador 1:</label>
          <input
            type="text"
            value={nomeJ1}
            onChange={(e) => setNomeJ1(e.target.value)}
            placeholder="Digite o nome do jogador 1"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={rodada > 1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">Nome do Jogador 2:</label>
          <input
            type="text"
            value={nomeJ2}
            onChange={(e) => setNomeJ2(e.target.value)}
            placeholder="Digite o nome do jogador 2"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={rodada > 1}
          />
        </div>
      </div>

      <div className="text-xl mb-4 text-black">Rodada {rodada} de 5</div>
      <div className="flex space-x-8 mb-8">
        {/* Jogador 1 */}
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-black">Jogador 1</h2>
          <div className="flex space-x-2 mb-4">
            {jogador1Dados ? (
              <>
                <Dado valor={jogador1Dados[0]} />
                <Dado valor={jogador1Dados[1]} />
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-2 border-gray-400 rounded bg-white"></div>
                <div className="w-20 h-20 border-2 border-gray-400 rounded bg-white"></div>
              </>
            )}
          </div>
          <button
            onClick={() => jogarDados(1)}
            disabled={!podeJogarJ1}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Jogar para Jogador 1
          </button>
        </div>
        {/* Jogador 2 */}
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-black">Jogador 2</h2>
          <div className="flex space-x-2 mb-4">
            {jogador2Dados ? (
              <>
                <Dado valor={jogador2Dados[0]} />
                <Dado valor={jogador2Dados[1]} />
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-2 border-gray-400 rounded bg-white"></div>
                <div className="w-20 h-20 border-2 border-gray-400 rounded bg-white"></div>
              </>
            )}
          </div>
          <button
            onClick={() => jogarDados(2)}
            disabled={!podeJogarJ2}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Jogar para Jogador 2
          </button>
        </div>
      </div>
      {resultadoRodada && (
        <div className="text-xl mb-4 text-black">
          Resultado da Rodada: {resultadoRodada}
        </div>
      )}
      {vencedorRodada && (
        <div className="text-xl mb-4 text-black">
          Vencedor da rodada: {vencedorRodada}
        </div>
      )}
      {turno === 'resultado' && !jogoFinalizado && (
        <button
          onClick={proximaRodada}
          className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 transition duration-300"
        >
          Próxima Rodada
        </button>
      )}
      {jogoFinalizado && (
        <div className="text-center mb-4">
          <div className="text-2xl mb-2 text-black">Jogo Finalizado!</div>
          <div className="text-xl text-black">
            {vencedorFinal === 'Empate' ? 'Empate geral!' : `${vencedorFinal} venceu!`}
          </div>
          <button
            onClick={resetarJogo}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition duration-300"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
