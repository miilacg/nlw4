//useState => funcionalidade para definir estados dentro do componente
//useEffect => funcionalidade para disparar efeitos colaterais (quando algo acontecer um efeito e gerado)
import { useState, useEffect } from 'react'; 
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    //o useState retorna um array com a variavel e com a função de atualização
    //quando o estado é definido dentro do componente, cada novo componente tera um estado diferente
    //em useState passar o valor que eu quero inicializar o estado
    const [time, setTime] = useState(0.05 * 60); //tempo em segundos
    const [isActive, setIsActive] = useState(false); //o usuario precisa clicar no botão para ativar
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); //arredonda para baixo
    const seconds = time % 60;

    //se a string não tiver dois caracteres o padStart coloca 0 na primeira posição
    const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]  = String(seconds).padStart(2, '0').split('');

    function starCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout); //cancela a execução do setTimeout
        setIsActive(false);
        setTime(0.05 * 60);
    }

    //precisa passar dois parametros e o primeiro parametro e sempre o que eu quero executar (uma função)
    //o segundo parametro e quando eu quero executar
    useEffect(() => {
        if (isActive && time > 0){ //muda o tempo quando o contador esta ativo
            countdownTimeout = setTimeout(() => { 
                setTime(time - 1);
            }, 1000) //a cada segundo diminui um segundo
        }else {
            if (isActive && time == 0){ //se ainda estiver ativo mas o contador já tiver chegado em 0
                setHasFinished(true);
                setIsActive(false);
            }
        }
    }, [isActive, time]) 

    return (
        <div>
            <div className={ styles.countdownContainer }>
                <div>
                    <span>{ minuteLeft }</span> {/*tem um separação entre os numeros e não fica tão facil tratar se tiver tudo junto*/}
                    <span>{ minuteRight }</span>
                </div>      
                <span>:</span>
                <div>
                    <span>{ secondLeft }</span>
                    <span>{ secondRight }</span>
                </div>
            </div>

            {/*quando está dento de chave indica um codigo em*/}
            { hasFinished ? (
                <button 
                    disabled
                    className={ styles.countdownButton}
                >               
                    Ciclo encerrado
                </button>
            ) : (
               <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={ `${styles.countdownButton} ${styles.countdownButtonActive}` }
                            onClick={ resetCountdown }
                        >               
                            Abondanar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={ styles.countdownButton }
                            onClick={ starCountdown }
                        >               
                            Iniciar um ciclo
                        </button>
                    )}      
               </> 
            )}              
        </div>
    );
}