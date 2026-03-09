import React from "react";
import "../styles/Header.css";
import logo from "../assets/header-logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-logo-area">
        <div className="logo-img">
          <img src={logo} alt="Librix logo" />
        </div>
        <h1 className="logo-text">IBRIX</h1>
      </div>

      <nav className="navbar-box">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/alfabeto">Alfabeto em Libras</Link>
          </li>
          <li>
            <a href="#jogos">Jogos</a>
          </li>
          <li>
            <a href="#sobre">Sobre Libras</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
