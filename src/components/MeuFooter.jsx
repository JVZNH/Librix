import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo-full-white.png"; // ajusta pro nome real da sua logo
import "../styles/Footer.css";

export default function MeuFooter() {
  return (
    <footer className="footer">
      <div className="footer-top-line"></div>

      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="Librix" className="footer-logo" />

          <p className="footer-description">
            A Librix é uma plataforma educativa voltada ao ensino de Libras de
            forma acessível, moderna e interativa, aproximando mais pessoas da
            comunicação inclusiva.
          </p>
        </div>

        <div className="footer-section">
          <h4>Navegação</h4>

          <nav className="footer-links">
            <Link to="/">Início</Link>
            <Link to="/alfabeto">Alfabeto em Libras</Link>
            <Link to="/jogos">Jogos</Link>
            <Link to="/contato">Contato</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Contato</h4>

          <div className="footer-contact">
            <p>
              <FaMapMarkerAlt /> IFMA - Campus Timon - MA, Brasil
            </p>
            <p>
              <FaPhone /> <a href="tel:86999203698">(86) 9 9920-3698</a>
            </p>
            <p>
              <FaEnvelope />{" "}
              <a href="mailto:contatolibrix@gmail.com">
                librix43@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-section faq">
          <h4>Perguntas Frequentes</h4>

          <details>
            <summary>
              <span>Quem desenvolve esse projeto?</span>
              <FaChevronDown />
            </summary>
            <p>
              O projeto é desenvolvido por estudantes da área de tecnologia com
              foco em acessibilidade e inclusão por meio da Libras.
            </p>
          </details>

          <details>
            <summary>
              <span>Como posso entrar em contato?</span>
              <FaChevronDown />
            </summary>
            <p>
              Você pode entrar em contato pelo e-mail, telefone ou pela página
              de contato da plataforma.
            </p>
          </details>

          <details>
            <summary>
              <span>Posso sugerir melhorias?</span>
              <FaChevronDown />
            </summary>
            <p>
              Sim. Toda sugestão é bem-vinda e pode ajudar a melhorar ainda mais
              a experiência da Librix.
            </p>
          </details>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Librix — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}