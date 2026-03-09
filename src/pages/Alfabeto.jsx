import React, { useState } from "react";
import videos from "../components/videos";
import "../styles/Alfabeto.css"

export default function Alfabeto() {
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("A-F");

    const filtros = {
        "A-F": /^[A-F]/,
        "G-L": /^[G-L]/,
        "M-R": /^[M-R]/,
        "S-Z": /^[S-Z]/
        };

        const videosFiltrados = videos.filter(video => {
            const titulo = video.titulo?.toLowerCase() || "";
            const textoBusca = busca.toLowerCase();
            const passaBusca = titulo.includes(textoBusca);

            const regex = filtros[filtro];
            const passaFiltro = !regex || regex.test(video.letra);

            return passaBusca && passaFiltro;
        });

    return (
        <>
        <section className="Alfa-section">
        <h1>Alfabeto em Libras</h1>
        <p>Nesta pagina, você encontrará videos com sinais <br /> em Libras feitos pelos próprios alunos, mostrando como representar <br /> cada letra do alfabeto</p>
        
        <div className="barra-filtro">
        {/* campo de busca */}
        <div className="campo-busca">
        <span className="icone">🔍</span>
        <input type="text" placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>

        {/* botoes A-Z */}
        <div className="botoes">
            {Object.keys(filtros).map(key => (
                <button
                    key={key}
                    className={filtro === key ? "ativo" : ""}
                    onClick={() => setFiltro(key)}
                >
                    {key}
                </button>
            ))}

        </div>
        </div>

        {/* cards */}
        <div className="videos-container">
            {videosFiltrados.map(video => (
                <div className="video-card" key={video.id}>
                    
                    <div className="iframe-wrapper">
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                            title={video.titulo}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <div className="info">
                        <strong>{video.titulo}</strong>
                    </div>

                </div>
            ))}

            {videosFiltrados.length === 0 && (
                <p className="vazio"> Nenhum vídeo encontrado</p>
            )}
        </div>
        </section>
        </>
    );
}