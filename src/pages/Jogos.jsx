import React from "react";
import "../styles/Jogos.css";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";


export default function Jogos(){
    return(
        <div className="Jogos-container">

            <h1>Aprendendo de Forma Divertida</h1>

            <h3>Aprenda Libras Jogando</h3>

            <div className="cards-jogos">

                <GameCard
                    titulo="Quiz do Alfabeto"
                    descricao="Responda Perguntas sobre os sinais em libras."
                    icone="🎮"
                    rota="/Quiz"
                />

                <GameCard
                    titulo="Arraste e solte"
                    descricao="Associe as letras com os sinais corretos."
                    icone="🧩"
                    rota="/Arrasta"
                />

                <GameCard
                    titulo="Descubra pelo video"
                    descricao="veja o sinal e descubra qual letra ele representa."
                    icone="🎥"
                    rota="/VideoQuiz"
                />
            </div>

        </div>
    )
}