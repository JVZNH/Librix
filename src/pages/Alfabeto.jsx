import React, { useMemo, useState } from "react";
import videos from "../components/videos";
import "../styles/Alfabeto.css";

export default function Alfabeto() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("A-F");

  const filtros = {
    "A-F": /^[A-F]/,
    "G-L": /^[G-L]/,
    "M-R": /^[M-R]/,
    "S-Z": /^[S-Z]/,
  };

  const videosFiltrados = useMemo(() => {
    return videos.filter((video) => {
      const titulo = video.titulo?.toLowerCase() || "";
      const letra = video.letra?.toUpperCase() || "";
      const textoBusca = busca.toLowerCase().trim();

      const passaBusca =
        titulo.includes(textoBusca) ||
        letra.includes(textoBusca.toUpperCase());

      const regex = filtros[filtro];
      const passaFiltro = !regex || regex.test(letra);

      return passaBusca && passaFiltro;
    });
  }, [busca, filtro]);

  return (
    <section className="alfa-section">
      <div className="alfa-bg" aria-hidden="true">
        <span className="alfa-bg-main"></span>
        <span className="alfa-bg-secondary"></span>
        <span className="alfa-bg-orb alfa-bg-orb-1"></span>
        <span className="alfa-bg-orb alfa-bg-orb-2"></span>
        <span className="alfa-bg-line alfa-bg-line-1"></span>
        <span className="alfa-bg-line alfa-bg-line-2"></span>
        <span className="alfa-bg-card"></span>
      </div>

      <div className="alfa-inner">
        <div className="alfa-hero">
          <span className="alfa-badge">Aprendizado visual</span>

          <h1>Alfabeto em Libras</h1>

          <p className="alfa-description">
            Nesta página, você encontrará vídeos com sinais em Libras feitos
            pelos próprios alunos, mostrando como representar cada letra do
            alfabeto de forma acessível, prática e envolvente.
          </p>
        </div>

        <div className="barra-filtro">
          <div className="campo-busca">
            <span className="icone">
              <ion-icon name="search-outline"></ion-icon>
            </span>
            <input
              type="text"
              placeholder="Buscar por letra ou título..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="botoes">
            {Object.keys(filtros).map((key) => (
              <button
                key={key}
                className={filtro === key ? "ativo" : ""}
                onClick={() => setFiltro(key)}
                type="button"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="resultado-topo">
          <p>
            {videosFiltrados.length} vídeo
            {videosFiltrados.length !== 1 ? "s" : ""} encontrado
            {videosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="videos-container">
          {videosFiltrados.map((video) => (
            <article className="video-card" key={video.id}>
              <div className="iframe-shell">
                <div className="iframe-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="info">
                <strong>{video.titulo}</strong>

                <p>
                  <ion-icon name="hand-left-outline" className="icone"></ion-icon>
                  Aprenda como fazer a letra {video.letra} em Libras de forma prática.
                </p>
              </div>
            </article>
          ))}

          {videosFiltrados.length === 0 && (
            <div className="vazio">
              <h3>Nenhum vídeo encontrado</h3>
              <p>
                Tente buscar por outra letra ou escolha um intervalo diferente.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}