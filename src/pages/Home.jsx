import React from "react";
import Header from "../components/Header";
import "../styles/Home.css";
import LibrasHeroImage from "../assets/libras-hero.png";

const Home = () => {
  return (
    <div className="home-container">
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-bg" aria-hidden="true">
            <span className="hero-bg-main"></span>
            <span className="hero-bg-orb hero-bg-orb-1"></span>
            <span className="hero-bg-orb hero-bg-orb-2"></span>
            <span className="hero-bg-line hero-bg-line-1"></span>
            <span className="hero-bg-line hero-bg-line-2"></span>
            <span className="hero-bg-glow"></span>
            <span className="hero-bg-card"></span>
          </div>

          <Header />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="hero-kicker">
                Seja bem-vindo ao <strong>Librix</strong>
              </p>

              <h1 className="hero-title">
                Aproximação de
                <br />
                Ouvintes à Libras
              </h1>

              <p className="hero-description">
                Nosso objetivo é tornar o aprendizado da Língua Brasileira de
                Sinais acessível, dinâmico e interativo. Você vai encontrar
                vídeos feitos pelos próprios alunos, demonstrando cada letra em
                Libras, além de jogos educativos que tornam o processo divertido
                e envolvente.
              </p>

              <p className="hero-quote">
                Seja bem-vindo(a) à Librix — um espaço onde ouvir e sinalizar se
                unem em uma só linguagem: a da empatia e do respeito.
              </p>

              <div className="hero-actions">
                <a href="/alfabeto" className="cta-button">
                  Comece a Aprender
                </a>
              </div>

           
            </div>

            <div className="hero-visual">
              <img
                src={LibrasHeroImage}
                alt="Ilustração sobre aprendizado de Libras"
                className="hero-image"
              />
            </div>
          </div>
        </section>

        <section className="info-section" id="sobre">
          <div className="info-section-bg" aria-hidden="true">
            <span className="info-bg-main"></span>
            <span className="info-bg-panel"></span>
            <span className="info-bg-line info-bg-line-1"></span>
            <span className="info-bg-line info-bg-line-2"></span>
            <span className="info-bg-glow"></span>
            <span className="info-bg-orb"></span>
          </div>

          <div className="info-container">
            <div className="info-intro">
              <span className="section-badge">Educação e Inclusão</span>

              <h2 className="info-title">
                Ensino de Libras: o que é, qual o objetivo e por que isso é tão
                importante?
              </h2>

              <p className="info-lead">
                A Libras é uma língua essencial para a comunicação, a inclusão e
                o acesso à informação da comunidade surda. Quando seu ensino é
                valorizado, damos um passo importante para construir uma
                sociedade mais acessível, empática e preparada para respeitar a
                diversidade.
              </p>

              <p className="info-text">
                No Brasil, milhões de pessoas surdas convivem diariamente com
                barreiras de comunicação. Por isso, ensinar Libras não é apenas
                aprender sinais: é ampliar oportunidades, fortalecer a cultura
                surda e permitir que mais pessoas possam interagir, aprender e
                participar ativamente da vida em sociedade.
              </p>

              <div className="info-actions">
                <a href="/alfabeto" className="info-button primary">
                  Explorar o Alfabeto
                </a>
              </div>
            </div>

            <div className="info-cards">
              <article className="info-card">
                <div className="info-card-icon">01</div>
                <h3>O que é o ensino de Libras?</h3>
                <p>
                  O ensino de Libras pode ser voltado tanto para pessoas surdas
                  quanto para ouvintes, sempre com foco na comunicação, na
                  aprendizagem visual e no acesso ao conhecimento.
                </p>
              </article>

              <article className="info-card">
                <div className="info-card-icon">02</div>
                <h3>Qual é o objetivo?</h3>
                <p>
                  Seu principal objetivo é promover inclusão, autonomia, acesso
                  à informação e respeito à identidade e à cultura da comunidade
                  surda brasileira.
                </p>
              </article>

              <article className="info-card">
                <div className="info-card-icon">03</div>
                <h3>Por que é importante?</h3>
                <p>
                  A Libras fortalece a igualdade de oportunidades, melhora a
                  convivência entre surdos e ouvintes e contribui para uma
                  educação mais justa e acessível.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;