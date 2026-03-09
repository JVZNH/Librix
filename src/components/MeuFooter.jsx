import {FaPhone, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import { Link } from "react-router-dom";
import '../styles/Footer.css'

export default function MeuFooter() {
  return (
    <footer className='footer'>
        <div className='footer-container'>

            {/* contato */}
            <div className='footer-section'>
                <h4>contato</h4>
                <p>
                    <FaMapMarkerAlt /> Chimarrão - MA,Brasil
                </p>
                <p>
                    <FaPhone /> <a href="tel:86999999999">(86) 9 9999-9999</a>
                </p>
                <p>
                    <FaEnvelope /> <a href="mailto:contatolibrix@gmail.com">contatolibrix@gmail.com</a>
                </p>
            </div>

            {/* Faq */}
            <div className='footer-section faq'>
                <h4>Perguntas Frequentes</h4>

                <details>
                    <summary>Quem desenvolve esse projeto?</summary>
                    <p>Alunos do curso técnico em Informática do IFMA – Campus Timon.</p>
                </details>

                <details>
                    <summary>Como posso entrar em contato?</summary>
                    <p>Use o formulário ao lado ou nossas redes sociais.</p>
                </details>
                <details>
                    <summary>Posso Sugerir melhorias?</summary>
                    <p>Com certeza! Toda sugestão é bem-vinda.</p>
                </details>
            </div>

            {/* Equipe */}
            <div className='footer-section'>
                <h4>Equipe</h4>
                <p>Frontend</p>
                <p>Backend</p>
                <p>UI/UX</p>
                <p><Link to="/contato">Fale Conosco</Link></p>
            </div>

        </div>

        <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Librix - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}