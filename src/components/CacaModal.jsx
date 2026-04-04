import React, { useEffect, useMemo, useRef, useState } from "react";
import { sinaisLibras } from "./dadosCaca";
import "../styles/CacaModal.css";

function embaralharArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function gerarRodadas(total = 6) {
  const embaralhado = embaralharArray(sinaisLibras);
  return embaralhado.slice(0, total);
}

function gerarOpcoes(letraCorreta, quantidade = 9) {
  const correta = sinaisLibras.find((item) => item.letra === letraCorreta);

  const erradas = embaralharArray(
    sinaisLibras.filter((item) => item.letra !== letraCorreta)
  ).slice(0, quantidade - 1);

  return embaralharArray([correta, ...erradas]);
}

export default function CacaModal({ open, onClose }) {
  const [rodadas, setRodadas] = useState(() => gerarRodadas(6));
  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [letraSelecionada, setLetraSelecionada] = useState(null);
  const [tipoResposta, setTipoResposta] = useState("");

  const somAcertoRef = useRef(null);
  const somErroRef = useRef(null);

  const rodadaAtual = rodadas[indice];

  const opcoes = useMemo(() => {
    if (!rodadaAtual) return [];
    return gerarOpcoes(rodadaAtual.letra, 9);
  }, [rodadaAtual]);

  useEffect(() => {
    if (!open) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        fecharModal();
      }
    }

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  function tocarSom(tipo) {
    const audio = tipo === "acerto" ? somAcertoRef.current : somErroRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }

  function reiniciarJogo() {
    setRodadas(gerarRodadas(6));
    setIndice(0);
    setPontuacao(0);
    setMensagem("");
    setFinalizado(false);
    setBloqueado(false);
    setLetraSelecionada(null);
    setTipoResposta("");
  }

  function fecharModal() {
    reiniciarJogo();
    onClose();
  }

  function responder(letraEscolhida) {
    if (bloqueado || !rodadaAtual) return;

    setBloqueado(true);
    setLetraSelecionada(letraEscolhida);

    if (letraEscolhida === rodadaAtual.letra) {
      tocarSom("acerto");
      setPontuacao((prev) => prev + 1);
      setTipoResposta("acerto");
      setMensagem("✔️ Muito bem! Você encontrou o sinal correto.");
    } else {
      tocarSom("erro");
      setTipoResposta("erro");
      setMensagem(`❌ Ops! O correto era a letra ${rodadaAtual.letra}.`);
    }

    setTimeout(() => {
      if (indice < rodadas.length - 1) {
        setIndice((prev) => prev + 1);
        setMensagem("");
        setBloqueado(false);
        setLetraSelecionada(null);
        setTipoResposta("");
      } else {
        setFinalizado(true);
        setMensagem("");
        setBloqueado(false);
        setLetraSelecionada(null);
        setTipoResposta("");
      }
    }, 1600);
  }

  function getClasseOpcao(opcao) {
    if (!bloqueado || !rodadaAtual) return "";

    if (opcao.letra === rodadaAtual.letra) {
      return "correta";
    }

    if (
      letraSelecionada === opcao.letra &&
      letraSelecionada !== rodadaAtual.letra
    ) {
      return "errada";
    }

    return "";
  }

  if (!open) return null;

  return (
    <div className="caca-overlay" onClick={fecharModal}>
      <div
        className="caca-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="caca-close" onClick={fecharModal} aria-label="Fechar modal">
          ✕
        </button>

        <div className="caca-modal-bg" aria-hidden="true">
          <span className="caca-shape caca-shape-1"></span>
          <span className="caca-shape caca-shape-2"></span>
          <span className="caca-shape caca-shape-3"></span>
          <span className="caca-line caca-line-1"></span>
          <span className="caca-line caca-line-2"></span>
        </div>

        {!finalizado ? (
          <div className="caca-content">
            <div className="caca-head">
              <span className="caca-badge">Jogo Interativo</span>
              <h2>Caça ao Sinal</h2>
              <p>
                Encontre o sinal correto da letra em Libras entre várias opções.
              </p>
            </div>

            <div className="caca-info-row">
              <div className="caca-info-pill">
                Rodada <strong>{indice + 1}</strong> de{" "}
                <strong>{rodadas.length}</strong>
              </div>

              <div className="caca-info-pill">
                Pontuação: <strong>{pontuacao}</strong>
              </div>
            </div>

            <div className="caca-progress">
              <div
                className="caca-progress-fill"
                style={{
                  width: `${((indice + 1) / rodadas.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="caca-target-box">
              <span className="caca-target-label">Encontre o sinal da letra</span>
              <div className="caca-target-letter">{rodadaAtual?.letra}</div>
            </div>

            <div className="caca-grid">
              {opcoes.map((opcao) => (
                <button
                  key={`${rodadaAtual.letra}-${opcao.letra}`}
                  className={`caca-card-option ${getClasseOpcao(opcao)}`}
                  onClick={() => responder(opcao.letra)}
                  disabled={bloqueado}
                >
                  <div className="caca-img-wrap">
                    <img
                      src={opcao.imagem}
                      alt={`Sinal da letra ${opcao.letra}`}
                    />
                  </div>
                  <span className="caca-option-text">Sinal em Libras</span>
                </button>
              ))}
            </div>

            <p className={`caca-feedback ${tipoResposta}`}>
              {mensagem || "Escolha uma imagem para responder."}
            </p>
          </div>
        ) : (
          <div className="caca-finish">
            <span className="caca-badge">Desafio concluído</span>
            <h2>🏆 Parabéns!</h2>
            <p>
              Você acertou <strong>{pontuacao}</strong> de{" "}
              <strong>{rodadas.length}</strong> rodadas.
            </p>

            <div className="caca-result-box">
              {pontuacao <= 2 && <span>🙂 Continue praticando, você está evoluindo!</span>}
              {pontuacao >= 3 && pontuacao <= 4 && (
                <span>👏 Muito bem! Você já conhece vários sinais.</span>
              )}
              {pontuacao >= 5 && (
                <span>🔥 Excelente! Você mandou muito bem no Caça ao Sinal.</span>
              )}
            </div>

            <div className="caca-finish-actions">
              <button className="caca-btn primary" onClick={reiniciarJogo}>
                Jogar novamente
              </button>
              <button className="caca-btn secondary" onClick={fecharModal}>
                Fechar
              </button>
            </div>
          </div>
        )}

        <audio ref={somAcertoRef} src="/sons/certo.mp3" preload="auto" />
        <audio ref={somErroRef} src="/sons/erro.mp3" preload="auto" />
      </div>
    </div>
  );
}