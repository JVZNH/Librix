import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameCard.css";

function GameCard({ titulo, descricao, icone, rota }) {
  const navigate = useNavigate();

  const getTema = () => {
    const tituloLower = titulo.toLowerCase();

    if (tituloLower.includes("quiz")) {
      return {
        badge: "Libras Quiz",
        destaque: "A B C",
        subtitulo: "Reconheça sinais",
      };
    }

    if (tituloLower.includes("arraste")) {
      return {
        badge: "Libras Match",
        destaque: "MÃO + LETRA",
        subtitulo: "Associe corretamente",
      };
    }

    if (tituloLower.includes("vídeo") || tituloLower.includes("video")) {
      return {
        badge: "Libras Vídeo",
        destaque: "SINAL EM AÇÃO",
        subtitulo: "Observe e descubra",
      };
    }

    return {
      badge: "Libras",
      destaque: "SINAIS",
      subtitulo: "Aprenda visualmente",
    };
  };

  const tema = getTema();

  return (
    <article className="game-card">
      <div className="game-card-top">
        <span className="game-mini-badge">{tema.badge}</span>
      </div>

      <div className="game-icon">
        <span className="game-icon-mark">🤟</span>
        <div className="game-icon-texts">
          <strong>{tema.destaque}</strong>
          <span>{tema.subtitulo}</span>
        </div>
      </div>

      <h3>{titulo}</h3>

      <p>{descricao}</p>

      <button className="game-btn" onClick={() => navigate(rota)}>
        Jogar
      </button>
    </article>
  );
}

export default GameCard;