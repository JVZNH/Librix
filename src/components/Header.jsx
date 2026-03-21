import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import logoWhite from "../assets/logo-full-white.png";
import logoBlue from "../assets/logo-full-blue.png";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        <Link
          to="/"
          className="header-logo-area"
          aria-label="Ir para a página inicial"
        >
          <img
            src={scrolled ? logoBlue : logoWhite}
            alt="Librix"
            className="header-logo-full"
          />
        </Link>

        <nav className="navbar-box">
          <ul className="navbar-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/alfabeto">Alfabeto em Libras</NavLink>
            </li>
            <li>
              <NavLink to="/jogos">Jogos</NavLink>
            </li>
            <li>
              <NavLink to="/contato">Contato</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}