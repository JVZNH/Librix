import React from "react";
import "../styles/Header.css";
import logo from "../assets/header-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-inner">
        <Link to="/" className="header-logo-area" aria-label="Ir para a página inicial">
          <img src={logo} alt="Librix" className="header-logo-full" />
        </Link>

        <nav className="navbar-box">
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/alfabeto">Alfabeto em Libras</Link>
            </li>
            <li>
              <a href="/Jogos">Jogos</a>
            </li>
            <li>
              <a href="#sobre">Sobre Libras</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}