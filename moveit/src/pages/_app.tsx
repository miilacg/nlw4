//toda vez que um usuario troca de página o que tem aqui é reaproveitado, mas é recalculado
//coloca aqui o que não muda em nenhuma pagina
import '../styles/global.css'


//esse app é fixo e fica em volta de todas as páginas
function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp