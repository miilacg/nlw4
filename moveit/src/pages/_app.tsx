//toda vez que um usuario troca de página o que tem aqui é reaproveitado, mas é recalculado
//coloca aqui o que não muda em nenhuma pagina
import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContexts'

//esse app é fixo e fica envolta dos outros componentes
function MyApp({ Component, pageProps }) {
  return (
    //se um contexto depender de outro ele precisa ser colocado por dentro do contexto que ele depede
    <ChallengesProvider> 
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp