import React from "react";
import Header from "../components/Header";
import "../styles/Home.css";
import Alfabeto from "./Alfabeto"
import LibrasHeroImage from "../assets/libras-hero.png";

const Home = () => {
  return (
    <div className="home-container">
  
      <main className="main-content">
        {/* O Hero começa no topo e fornece o BG para o Header */}
        <section className="hero-section">
          <div className="hero-content-wrapper">
            <div className="text-content">
              <p>Seja bem-vindo ao Librix</p>
              <h1 className="hero-title">
                Aproximação de Ouvintes à{" "}
                <span className="highlight">Libras</span>
              </h1>
              <p className="hero-description">
                Nosso objetivo é tornar o aprendizado da Língua Brasileira de
                Sinais acessível, dinâmico e interativo. Você vai encontrar
                vídeos feitos pelos próprios alunos, demonstrando cada letra em
                Libras, além de jogos educativos que tornam o processo divertido
                e envolvente.
              </p>
              <p className="hero-quote">
                Seja bem-vindo(a) à Librix — um espaço onde ouvir e sinalizar se unem 
                em uma só linguagem; a da empatia e do respeito.
              </p>
              <button className="cta-button">
                <a href="/Alfabeto">Começe a Aprender</a>
              </button>
            </div>

            <div className="hero-image-overlay">
              <img src={LibrasHeroImage} alt="Alfabeto em Libras e ilustrador" className="hero-image"/>
            </div>

          </div>
        </section>

        {/* Conteúdo Abaixo (temporário) */}
        <div
          style={{ height: "200px", padding: "50px", backgroundColor: "white" }}
        >
          Conteúdo abaixo do Hero para testar o corte.
        </div>
      </main>
    </div>
  );
};

export default Home;
