import React, { useMemo, useRef, useState } from "react";
import { itens } from "./arraste";
import "../styles/ArrastaGame.css";

const ITENS_POR_RODADA = 5;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function ArrastaGame({ onFinish }) {
  const [arrastando, setArrastando] = useState(null);
  const [acertosGlobais, setAcertosGlobais] = useState([]);
  const [acertosRodada, setAcertosRodada] = useState([]);
  const [erro, setErro] = useState("");
  const [letraErrada, setLetraErrada] = useState(null);
  const [reinicioKey, setReinicioKey] = useState(0);
  const [rodadaAtual, setRodadaAtual] = useState(0);

  const somAcerto = useRef(new Audio("/sons/certo.mp3"));

  const rodadas = useMemo(() => {
    const embaralhado = shuffleArray(itens);
    return chunkArray(embaralhado, ITENS_POR_RODADA);
  }, [reinicioKey]);

  const rodada = rodadas[rodadaAtual] || [];

  const letrasMisturadas = useMemo(() => shuffleArray(rodada), [rodada]);
  const imagensMisturadas = useMemo(() => shuffleArray(rodada), [rodada]);

  const totalRodadas = rodadas.length;
  const rodadaConcluida =
    acertosRodada.length === rodada.length && rodada.length > 0;

  function handleDragStart(letra) {
    setArrastando(letra);
    setErro("");
  }

  function handleDrop(item) {
    if (!arrastando) return;

    if (arrastando === item.letra && !acertosRodada.includes(item.letra)) {
      somAcerto.current.currentTime = 0;
      somAcerto.current.play().catch(() => {});

      const novosAcertosRodada = [...acertosRodada, item.letra];
      const novosAcertosGlobais = [...acertosGlobais, item.letra];

      setAcertosRodada(novosAcertosRodada);
      setAcertosGlobais(novosAcertosGlobais);
      setErro("");

      const terminouRodada = novosAcertosRodada.length === rodada.length;
      const terminouJogo = novosAcertosGlobais.length === itens.length;

      if (terminouRodada && terminouJogo) {
        onFinish && onFinish();
      }
    } else {
      setErro("❌ Errado! Tente novamente.");
      setLetraErrada(arrastando);

      setTimeout(() => {
        setLetraErrada(null);
      }, 600);
    }

    setArrastando(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function reiniciarJogo() {
    setAcertosGlobais([]);
    setAcertosRodada([]);
    setArrastando(null);
    setErro("");
    setRodadaAtual(0);
    setReinicioKey((prev) => prev + 1);
  }

  function proximaRodada() {
    if (rodadaAtual < totalRodadas - 1) {
      setRodadaAtual((prev) => prev + 1);
      setAcertosRodada([]);
      setArrastando(null);
      setErro("");
    }
  }

  return (
    <div className="arrasta-game">
      <div className="arrasta-game-top">
        <div>
          <h3>Associe cada letra ao sinal correto</h3>
          <p>Complete todas as rodadas para concluir o alfabeto.</p>
        </div>

        <button className="arrasta-restart-btn" onClick={reiniciarJogo}>
          Reiniciar
        </button>
      </div>

      <div className="arrasta-progresso">
        <div className="arrasta-progresso-info">
          <span>
            Rodada {rodadaAtual + 1} de {totalRodadas}
          </span>
          <strong>
            {acertosGlobais.length} / {itens.length}
          </strong>
        </div>

        <div className="arrasta-progresso-barra">
          <div
            className="arrasta-progresso-fill"
            style={{
              width: `${(acertosGlobais.length / itens.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {erro && <div className="arrasta-erro">{erro}</div>}

      <div className="arrasta-area">
        <div className="letras">
          {letrasMisturadas.map((item) =>
            !acertosRodada.includes(item.letra) ? (
              <div
                key={item.id}
                className={`letra ${
                  letraErrada === item.letra ? "errada" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(item.letra)}
              >
                {item.letra}
              </div>
            ) : null
          )}
        </div>

        <div className="imagens">
          {imagensMisturadas.map((item) => (
            <div
              key={item.id}
              className={`drop ${
                acertosRodada.includes(item.letra) ? "correto" : ""
              }`}
              onDrop={() => handleDrop(item)}
              onDragOver={handleDragOver}
            >
              <img src={item.imagem} alt={`Sinal ${item.letra}`} />

              {acertosRodada.includes(item.letra) && (
                <span className="check">✔</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {rodadaConcluida && rodadaAtual < totalRodadas - 1 && (
        <div className="arrasta-rodada-finalizada">
          <p>✅ Rodada concluída!</p>
          <button className="arrasta-next-btn" onClick={proximaRodada}>
            Próxima rodada
          </button>
        </div>
      )}
    </div>
  );
}