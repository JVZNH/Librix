import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "aos/dist/aos.css";
import AOS from "aos";
import Header from "../components/Header";
import "../styles/Contact.css";

import Aluno1 from "../assets/team/aluno1.png";
import Aluno2 from "../assets/team/aluno2.png";
import Aluno3 from "../assets/team/aluno3.png";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [status, setStatus] = useState({
    sending: false,
    success: "",
    error: "",
  });

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus({
      sending: true,
      success: "",
      error: "",
    });

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("As variáveis do EmailJS não foram configuradas.");
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          nome: form.nome,
          email: form.email,
          assunto: form.assunto,
          mensagem: form.mensagem,
        },
        PUBLIC_KEY
      );

      setStatus({
        sending: false,
        success: "Mensagem enviada com sucesso! 🚀",
        error: "",
      });

      setForm({
        nome: "",
        email: "",
        assunto: "",
        mensagem: "",
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      setStatus({
        sending: false,
        success: "",
        error: "Não foi possível enviar a mensagem agora. Tente novamente.",
      });
    }
  }

  return (
    <>
      <Header />

      <section className="contact-section">
        <div className="contact-bg" aria-hidden="true">
          <span className="contact-bg-main"></span>
          <span className="contact-bg-orb contact-bg-orb-1"></span>
          <span className="contact-bg-orb contact-bg-orb-2"></span>
          <span className="contact-bg-line contact-bg-line-1"></span>
          <span className="contact-bg-line contact-bg-line-2"></span>
          <span className="contact-bg-glow"></span>
          <span className="contact-bg-card"></span>
        </div>

        <div className="contact-wrapper">
          <div className="contact-left" data-aos="fade-right">
            <span className="contact-badge">Fale com a Librix</span>

            <h1>Vamos conversar!</h1>

            <p className="contact-lead">
              Entre em contato com nossa equipe. Estamos aqui para tirar
              dúvidas, ouvir sugestões e melhorar cada vez mais a experiência
              de aprendizado em Libras.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-card">
                <div className="contact-info-icon">✉</div>
                <div>
                  <h3>E-mail</h3>
                  <p>contato@librix.com</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">💡</div>
                <div>
                  <h3>Sugestões</h3>
                  <p>Ideias para novos conteúdos e melhorias da plataforma.</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">🤝</div>
                <div>
                  <h3>Colaboração</h3>
                  <p>Quer contribuir com o projeto? Vamos conversar.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-right" data-aos="fade-left">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Envie sua mensagem</h2>

              <div className="contact-form-grid">
                <label>
                  <span>Nome</span>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </label>

                <label>
                  <span>E-mail</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>Assunto</span>
                <select
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o assunto</option>
                  <option value="Dúvida sobre o conteúdo">
                    Dúvida sobre o conteúdo
                  </option>
                  <option value="Problema técnico">Problema técnico</option>
                  <option value="Sugestão de conteúdo">
                    Sugestão de conteúdo
                  </option>
                  <option value="Colaboração">Colaboração</option>
                  <option value="Outros">Outros</option>
                </select>
              </label>

              <label>
                <span>Mensagem</span>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows="6"
                  required
                ></textarea>
              </label>

              {status.success && (
                <div className="contact-feedback success">{status.success}</div>
              )}

              {status.error && (
                <div className="contact-feedback error">{status.error}</div>
              )}

              <button
                type="submit"
                className="contact-btn"
                disabled={status.sending}
              >
                {status.sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-extra-section">
        <div className="contact-extra-bg" aria-hidden="true">
          <span className="contact-extra-main"></span>
          <span className="contact-extra-glow"></span>
        </div>

        <div className="contact-extra-container">
          <div className="contact-extra-grid">
            <article className="extra-card" data-aos="fade-up">
              <h3>Perguntas frequentes</h3>

              <div className="faq-item">
                <strong>Os vídeos têm apoio visual?</strong>
                <p>Sim, o conteúdo é pensado para ser visual, acessível e claro.</p>
              </div>

              <div className="faq-item">
                <strong>O conteúdo é gratuito?</strong>
                <p>Sim, a proposta da Librix é ampliar o acesso ao aprendizado.</p>
              </div>

              <div className="faq-item">
                <strong>Posso sugerir melhorias?</strong>
                <p>Sim, suas sugestões ajudam muito na evolução do projeto.</p>
              </div>
            </article>

            <article
              className="extra-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3>Nossa equipe</h3>

              <p className="extra-text">
                Este projeto é desenvolvido por estudantes comprometidos com
                inclusão, acessibilidade e educação por meio da Libras.
              </p>

              <div className="team-grid">
                <div className="team-card">
                  <img src={Aluno1} alt="Foto do integrante 1" className="team-photo" />
                  <h4>Aluno 1</h4>
                  <p>Desenvolvimento</p>
                </div>

                <div className="team-card">
                  <img src={Aluno2} alt="Foto do integrante 2" className="team-photo" />
                  <h4>Aluno 2</h4>
                  <p>Conteúdo</p>
                </div>

                <div className="team-card">
                  <img src={Aluno3} alt="Foto do integrante 3" className="team-photo" />
                  <h4>Aluno 3</h4>
                  <p>Design</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}