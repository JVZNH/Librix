import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameCard.css";

function GameCard({ titulo, descricao, icone, rota }) {

    const navigate = useNavigate();

    return(
        <div className="game-card">
            <div className="game-icon">
                {icone}
            </div>

            <h3>{titulo}</h3>

            <p>{descricao}</p>

            <button
                className="game-btn"
                onClick={()=> navigate(rota)}
            >
                Jogar
            </button>

        </div>
    );
}

export default GameCard;