import './Luz.css'

function Luz({ cor, acesa }) {
  const classe = `luz luz-${cor} ${acesa ? 'acesa' : 'apagada'}`

  return <div className={classe} aria-label={`Luz ${cor} ${acesa ? 'acesa' : 'apagada'}`} />
}

export default Luz
