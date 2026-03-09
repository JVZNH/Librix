import { React, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Header from "../components/Header";
import "../styles/Contact.css";

export default function Contato() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <>
      <Header />

      <section className="contact-section">
        {/* Bgzinhos */}
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>

        
          {/* ===========================================================
                COLUNA ESQUERDA
          =========================================================== */}
          <div className="contact-left" data-aos="fade-right">
            <h1>Vamos conversar!</h1>
            <p>
              Entre em contato com nossa equipe. Estamos aqui para te ajudar!
            </p>


          {/* ===========================================================
                COLUNA DIREITA
          =========================================================== */}
          <div className="contact-right" data-aos="fade-left">
            <form className="contact-form">
              <h2>Envie sua Mensagem</h2>

              <label>Nome</label>
              <div className="input-wrap">
                <i className="ri-user-line"></i>
                <input type="text" placeholder="Digite seu nome" />
              </div>

              <label>E-mail</label>
              <div className="input-wrap">
                <i className="ri-mail-line"></i>
                <input type="email" placeholder="Digite seu email" />
              </div>

              <label>Mensagem</label>
              <div className="input-wrap textarea">
                <i className="ri-chat-3-line"></i>
                <textarea rows="5" placeholder="Digite sua mensagem"></textarea>
              </div>

              <button className="contact-btn">Enviar Mensagem</button>
            </form>

            {/* ======================================
                NOSSA EQUIPE (cards)
            ====================================== */}
            <div className="team-box" data-aos="fade-up">
              <h3>Nossa Equipe</h3>

              <div className="team-grid">
                <div className="team-card">
                  <div className="team-avatar"></div>
                  <h4>Aluno 1</h4>
                  <p>Frontend</p>
                </div>

                <div className="team-card">
                  <div className="team-avatar"></div>
                  <h4>Aluno 2</h4>
                  <p>Backend</p>
                </div>

                <div className="team-card">
                  <div className="team-avatar"></div>
                  <h4>Aluno 3</h4>
                  <p>UI/UX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
}
