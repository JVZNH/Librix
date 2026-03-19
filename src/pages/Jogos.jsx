import React from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import "../styles/Jogos.css";

export default function Jogos() {
  return (
    <div className="jogos-page">
      <main className="jogos-main">
        <section className="jogos-hero">
          <div className="jogos-hero-bg" aria-hidden="true">
            <span className="jogos-bg-main"></span>
            <span className="jogos-bg-orb jogos-bg-orb-1"></span>
            <span className="jogos-bg-orb jogos-bg-orb-2"></span>
            <span className="jogos-bg-line jogos-bg-line-1"></span>
            <span className="jogos-bg-line jogos-bg-line-2"></span>
            <span className="jogos-bg-glow"></span>
            <span className="jogos-bg-card"></span>
          </div>

          <Header />

          <div className="jogos-hero-inner">
            <div className="jogos-left">
              <span className="jogos-badge">Jogos Educativos</span>

              <h1>Aprendendo de forma divertida</h1>

              <p className="jogos-lead">
                Aprenda Libras jogando com atividades interativas feitas para
                tornar o estudo mais leve, visual e envolvente.
              </p>

              <p className="jogos-text">
                Aqui você pode praticar o alfabeto em Libras com desafios,
                associação de sinais e vídeos. A ideia é transformar o processo
                de aprendizagem em uma experiência dinâmica, acessível e mais
                interessante para qualquer pessoa.
              </p>

              <div className="jogos-actions">
                <a href="#jogos-lista" className="jogos-button primary">
                  Explorar Jogos
                </a>
              </div>
            </div>

            <div className="jogos-right">
              <div className="jogos-preview">
                <div className="jogos-preview-card card-a">
                  <span className="emoji">🎮</span>
                  <strong>Quiz do Alfabeto</strong>
                  <p>Teste seus conhecimentos sobre os sinais em Libras.</p>
                </div>

                <div className="jogos-preview-card card-b">
                  <span className="emoji">🧩</span>
                  <strong>Arraste e solte</strong>
                  <p>Associe letras e sinais de forma prática e visual.</p>
                </div>

                <div className="jogos-preview-card card-c">
                  <span className="emoji">🎥</span>
                  <strong>Vídeo desafio</strong>
                  <p>Veja o sinal e descubra qual letra ele representa.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="jogos-cards-section" id="jogos-lista">
          <div className="jogos-cards-bg" aria-hidden="true">
            <span className="jogos-cards-bg-main"></span>
            <span className="jogos-cards-bg-glow"></span>
          </div>

          <div className="jogos-cards-container">
            <div className="jogos-section-head">
              <span className="section-badge">Escolha seu desafio</span>
              <h2>Pratique Libras com atividades interativas</h2>
              <p>
                Cada jogo foi pensado para reforçar o aprendizado de maneira
                simples, divertida e acessível.
              </p>
            </div>

            <div className="cards-jogos">
              <GameCard
                titulo="Quiz do Alfabeto"
                descricao="Responda perguntas sobre os sinais em Libras."
                icone="🎮"
                rota="/Quiz"
              />

              <GameCard
                titulo="Arraste e solte"
                descricao="Associe as letras com os sinais corretos."
                icone="🧩"
                rota="/Arrasta"
              />

              <GameCard
                titulo="Descubra pelo vídeo"
                descricao="Veja o sinal e descubra qual letra ele representa."
                icone="🎥"
                rota="/VideoQuiz"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}