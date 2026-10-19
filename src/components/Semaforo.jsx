import Luz from './Luz'
import './Semaforo.css'

function Semaforo({ luzAtiva }) {
  return (
    <div className="semaforo-estrutura">
      <div className="semaforo">
        <Luz cor="vermelho" acesa={luzAtiva === 'vermelho'} />
        <Luz cor="amarelo" acesa={luzAtiva === 'amarelo'} />
        <Luz cor="verde" acesa={luzAtiva === 'verde'} />
      </div>
      <div className="poste" />
      <div className="base" />
    </div>
  )
}

export default Semaforo
