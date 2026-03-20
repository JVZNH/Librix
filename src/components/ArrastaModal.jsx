import React, { useEffect, useState } from "react";
import ArrastaGame from "./ArrastaGame";
import "../styles/ArrastaModal.css";

export default function ArrastaModal({ open, onClose }) {
  const [fase, setFase] = useState("intro");
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    if (open) {
      setFase("intro");
      setGameKey((prev) => prev + 1);
    }
  }, [open]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  function jogarNovamente() {
    setFase("jogo");
    setGameKey((prev) => prev + 1);
  }

  return (
    <div className="arrasta-modal-overlay" onClick={onClose}>
      <div className="arrasta-modal" onClick={(e) => e.stopPropagation()}>
        <button className="arrasta-modal-close" onClick={onClose}>
          ×
        </button>

        {fase === "intro" && (
          <div className="arrasta-modal-screen">
            <span className="arrasta-modal-badge">Jogo em Libras</span>

            <h2>Arraste e solte</h2>

            <p className="arrasta-modal-text">
              Arraste cada letra para a imagem correspondente ao sinal em Libras.
              Acerte todas para concluir o desafio.
            </p>

            <div className="arrasta-modal-preview">
              <div className="arrasta-preview-card">
                <img src="/alfabeto/a.png" alt="Sinal da letra A" />
              </div>
              <div className="arrasta-preview-card">
                <img src="/alfabeto/b.png" alt="Sinal da letra B" />
              </div>
              <div className="arrasta-preview-card">
                <img src="/alfabeto/c.png" alt="Sinal da letra C" />
              </div>
            </div>

            <div className="arrasta-modal-actions">
              <button className="arrasta-modal-secondary" onClick={onClose}>
                Fechar
              </button>

              <button
                className="arrasta-modal-primary"
                onClick={() => setFase("jogo")}
              >
                Começar
              </button>
            </div>
          </div>
        )}

        {fase === "jogo" && (
          <div className="arrasta-modal-screen">
            <ArrastaGame key={gameKey} onFinish={() => setFase("final")} />
          </div>
        )}

        {fase === "final" && (
          <div className="arrasta-modal-screen final">
            <span className="arrasta-modal-badge">Desafio concluído</span>

            <h2>🎉 Parabéns!</h2>

            <p className="arrasta-modal-text">
              Você completou o jogo de associação em Libras com sucesso.
            </p>

            <div className="arrasta-modal-actions">
              <button className="arrasta-modal-secondary" onClick={onClose}>
                Fechar
              </button>

              <button className="arrasta-modal-primary" onClick={jogarNovamente}>
                Jogar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}