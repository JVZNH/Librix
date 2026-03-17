import { React, useState} from "react"
import { itens } from "../components/arraste"
import "../styles/Arrasta.css"

function Arrasta() {

    const [arrastando, setArrastando] = useState(null)
    const [acertos, setAcertos] = useState([])
    const [finalizado, setFinalizado] = useState(false)

    const somAcerto = new Audio("/sons/certo.mp3")

    function handleDragStart(letra){
        setArrastando(letra)
    }

    function handleDrop(item){
        if(arrastando === item.letra){
            somAcerto.play().catch(()=>{})

            const novosAcertos = [...acertos, item.letra]
            setAcertos(novosAcertos)

            {/* terminou tudo */}
            if(novosAcertos.length === itens.length){
                setFinalizado(true)
            }
        }else{
            alert("❌ Errado! Tente novamente!")
        }

        setArrastando(null)
    }

    function handleDragOver(e){
        e.preventDefault()
    }

    function reiniciar(){
        setAcertos([])
        setFinalizado(false)
    }

    if(finalizado){
        return(
            <div className="arrasta-container">

                <div className="final-wrapper">
                <div className="final-card">

                    <h1>🎉 parabéns!</h1>
                    <p>você completou o jogo!</p>

                    <button onClick={reiniciar}>
                        Jogar Novamente
                    </button>

                    <div className="confete"></div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="arrasta-container">
            <h1>🧩 Arraste e Solta</h1>

            <div className="arrasta-area">

                {/* Letras */}
                <div className="letras">
                    {itens.map((item)=> (
                        !acertos.includes(item.letra) && (
                            <div key={item.id} className="letra" draggable onDragStart={()=>handleDragStart(item.letra)} >
                                {item.letra}
                            </div>
                        )
                    ))}
                </div>

                {/* Imagens */}
                <div className="imagens">

                    {itens.map((item)=>(
                        <div
                        key={item.id}
                        className={`drop ${acertos.includes(item.letra) ? "correto" : ""}`}
                        onDrop={()=>handleDrop(item)}
                        onDragOver={handleDragOver}
                        >
                            <img src={item.imagem} />

                            {acertos.includes(item.letra) && (
                                <span className="check">✔️</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Arrasta