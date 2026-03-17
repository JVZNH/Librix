import { useState } from "react";
import { perguntas } from "../components/quizVideos";
import "../styles/VideoQuiz.css"

function VideoQuiz() {

    const [indice, setIndice] = useState(0)
    const [selecionado, setSelecionado] = useState(null)
    const [acertou, setAcertou] = useState(null)

    if(indice >= perguntas.length){
    return(
        <div className="video-container">
            <div className="quiz-card">
                <h1>🎉 Parabéns!</h1>
                <p>Você completou o quiz!</p>

                <button onClick={()=>{
                    setIndice(0)
                    setSelecionado(null)
                    setAcertou(null)
                }}>
                    Jogar novamente
                </button>
            </div>
        </div>
    )
}

    const perguntaAtual = perguntas[indice]

    const somAcerto = new Audio("/sons/certo.mp3")
    const somErro = new Audio("/sons/erro.mp3")

    function responder(opcao){
        
        if(selecionado) return
        setSelecionado(opcao)

        if(opcao === perguntaAtual.correta){
            setAcertou(true)
            somAcerto.play().catch(()=>{})
        }else{
            setAcertou(false)
            somErro.play().catch(()=>{})
        }
    }

    function proxima(){
        setIndice(indice + 1)
        setSelecionado(null)
        setAcertou(null)
    }

    return(
        <div className="video-container">

            <h1>🎥 Descubra pelo video</h1>

            <div className="Vquiz-card">

                {/* video */}
                <video src={perguntaAtual.video} controls className="video" />

                <p className="pergunta">{perguntaAtual.pergunta}</p>

                {/* opções */}
                <div className="opcoes">
                    {perguntaAtual.opcoes.map((opcao)=>{

                        let classe = "botao"

                        if(selecionado){
                            if(opcao === perguntaAtual.correta){
                                classe += " correto"
                            }else if(opcao === selecionado){
                                classe += " errado"
                            }
                        }

                        return(
                            <button key={opcao} className={classe} onClick={()=> responder(opcao)} >
                                {opcao}
                            </button>
                        )
                    })}

                </div>

                {/*  feedback */}
                {selecionado && (
                    <div className="feedback">

                        {acertou ? (
                            <p className="certo">✔️ Parabéns, você acertou!</p>
                        ) : (
                            <p className="errado-texto">
                            ❌ Ops! A resposta correta é: <strong>{perguntaAtual.correta}</strong>
                            </p>
                        )}

                        <button onClick={proxima}>
                            próxima
                        </button>
                    
                    </div>
                )}

            </div>

        </div>
    )
    

}

export default VideoQuiz