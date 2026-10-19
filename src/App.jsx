import { useRef, useState } from 'react'
import Semaforo from './components/Semaforo'
import './App.css'

const SEQUENCIA = ['vermelho', 'verde', 'amarelo']

const DURACOES = {
  vermelho: 5000,
  amarelo: 2000,
  verde: 5000,
}

const MENSAGENS = {
  vermelho: 'PARE',
  amarelo: 'ATENÇÃO',
  verde: 'SIGA',
}

function App() {
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [automaticoAtivo, setAutomaticoAtivo] = useState(false)
  const temporizador = useRef(null)
  const luzAtiva = SEQUENCIA[indiceAtual]

  const pararAutomatico = () => {
    clearTimeout(temporizador.current)
    temporizador.current = null
    setAutomaticoAtivo(false)
  }

  const mudarLuz = () => {
    setIndiceAtual((indice) => (indice + 1) % SEQUENCIA.length)
  }

  const programarProximaLuz = (indice) => {
    const corAtual = SEQUENCIA[indice]

    temporizador.current = setTimeout(() => {
      const proximoIndice = (indice + 1) % SEQUENCIA.length
      setIndiceAtual(proximoIndice)
      programarProximaLuz(proximoIndice)
    }, DURACOES[corAtual])
  }

  const iniciarAutomatico = () => {
    if (automaticoAtivo) return

    setAutomaticoAtivo(true)
    programarProximaLuz(indiceAtual)
  }

  const selecionarLuz = (cor) => {
    pararAutomatico()
    setIndiceAtual(SEQUENCIA.indexOf(cor))
  }

  return (
    <main className="app">
      <h1>Semáforo Interativo</h1>
      <p className="subtitulo">Clique para avançar, escolha uma cor ou inicie o modo automático.</p>

      <Semaforo luzAtiva={luzAtiva} />

      <p className={`mensagem mensagem-${luzAtiva}`}>{MENSAGENS[luzAtiva]}</p>

      <div className="controles-principais">
        <button className="botao-principal" onClick={mudarLuz} disabled={automaticoAtivo}>
          Mudar luz
        </button>
        <button
          className={`botao-principal botao-automatico ${automaticoAtivo ? 'executando' : ''}`}
          onClick={automaticoAtivo ? pararAutomatico : iniciarAutomatico}
        >
          {automaticoAtivo ? 'Parar automático' : 'Iniciar automático'}
        </button>
      </div>

      <p className="status-automatico" aria-live="polite">
        Modo automático: {automaticoAtivo ? 'ligado' : 'desligado'}
      </p>

      <div className="botoes-cores">
        <button
          className={`botao-cor botao-vermelho ${luzAtiva === 'vermelho' ? 'ativo' : ''}`}
          onClick={() => selecionarLuz('vermelho')}
        >
          Vermelho
        </button>
        <button
          className={`botao-cor botao-amarelo ${luzAtiva === 'amarelo' ? 'ativo' : ''}`}
          onClick={() => selecionarLuz('amarelo')}
        >
          Amarelo
        </button>
        <button
          className={`botao-cor botao-verde ${luzAtiva === 'verde' ? 'ativo' : ''}`}
          onClick={() => selecionarLuz('verde')}
        >
          Verde
        </button>
      </div>
    </main>
  )
}

export default App
