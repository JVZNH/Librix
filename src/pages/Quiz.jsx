import { React, useState } from "react";
import { quizPerguntas } from "../components/perguntasQuiz";
import "../styles/Quiz.css";

function Quiz(){

    const [indice, setIndice] = useState(0)
    const [pontos, setPontos] = useState(0)
    const [mensagem, setMensagem] = useState("")
    const [finalizado, setFinalizado] = useState(false)

    const pergunta = quizPerguntas[indice]
    
    const somAcerto = new Audio("/sons/certo.mp3")
    const somErro = new Audio("/sons/erro.mp3")

    function responder(opcao){
        if(opcao === pergunta.letra){
            somAcerto.play()
            setMensagem("✔️ Parabéns, você acertou!")
            setPontos(pontos + 1)
        }else{
            somErro.play()
            setMensagem(`❌ Errado! A resposta correta era ${pergunta.letra}`)
        }

        setTimeout(()=>{
            setMensagem("")

            if(indice < quizPerguntas.length - 1){
                setIndice(indice+1)
            }else{
                setFinalizado(true)
            }

        },1500)
    }

    function reiniciar(){
        setIndice(0)
        setPontos(0)
        setFinalizado(false)
    }

    if(finalizado){
        return(
            <div className="quiz-container">

                <div className="quiz-card final">

                    <h1>🏆 quiz finalizado</h1>

                    <h2>sua pontuação</h2>

                    <p className="pontuacao-final">
                        {pontos} / {quizPerguntas.length}
                    </p>

                    <button onClick={reiniciar}>
                        Jogar Novamente
                    </button>
                </div>

            </div>
        )
    }

    return(
        <div className="quiz-container">
            <h1>Quiz do Alfabeto em Libras</h1>

            <div className="quiz-card">

                {/*barra de progresso */}

                <div className="progress-bar">
                    <div
                    className="progress"
                    style={{
                        width: `${(indice+1)/quizPerguntas.length*100}%`
                    }}
                    ></div>

                </div>

                <img src={pergunta.imagem} alt="sinal" className="quiz-img" />

                <h3>Qual letra este sinal representa?</h3>

                <div className="quiz-opcoes">
                    {pergunta.opcoes.map((opcao)=> (
                        <button
                        key={opcao}
                        onClick={()=> responder(opcao)}
                        >
                            {opcao}
                        </button>
                    ))}
                </div>

                <p className="quiz-feedback">
                    {mensagem}
                </p>

                <p className="quiz-pontos">
                    ⭐ Pontos: {pontos}
                </p>

            </div>

        </div>
    )

}

export default Quiz;