import React, { useEffect, useState } from "react";
import ArrastaGame from "./ArrastaGame";
import { itens } from "./arraste";
import "../styles/ArrastaModal.css";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ArrastaModal({ open, onClose }) {
  const [fase, setFase] = useState("intro");
  const [gameKey, setGameKey] = useState(0);
  const [previewItems, setPreviewItems] = useState([]);

  // reset + gerar preview aleatório
  useEffect(() => {
    if (open) {
      setFase("intro");
      setGameKey((prev) => prev + 1);

      const embaralhado = shuffleArray(itens);
      setPreviewItems(embaralhado.slice(0, 3)); 
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

        {/* INTRO */}
        {fase === "intro" && (
          <div className="arrasta-modal-screen">
            <span className="arrasta-modal-badge">Jogo em Libras</span>

            <h2>Arraste e solte</h2>

            <p className="arrasta-modal-text">
              Arraste cada letra para a imagem correspondente ao sinal em Libras.
              Acerte todas para concluir o desafio.
            </p>

            {/* PREVIEW ALEATÓRIO */}
            <div className="arrasta-modal-preview">
              {previewItems.map((item) => (
                <div key={item.id} className="arrasta-preview-card">
                  <img
                    src={item.imagem}
                    alt={`Sinal da letra ${item.letra}`}
                  />
                </div>
              ))}
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

        {/* JOGO */}
        {fase === "jogo" && (
          <div className="arrasta-modal-screen">
            <ArrastaGame key={gameKey} onFinish={() => setFase("final")} />
          </div>
        )}

        {/* FINAL */}
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

              <button
                className="arrasta-modal-primary"
                onClick={jogarNovamente}
              >
                Jogar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}