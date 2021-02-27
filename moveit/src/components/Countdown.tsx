//useState => funcionalidade para definir estados dentro do componente
//useEffect => funcionalidade para disparar efeitos colaterais (quando algo acontecer um efeito e gerado)
import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);

    //essas variaveis não foram para o context pq a formatação faz parte do layout da aplicação
    //se a string não tiver dois caracteres o padStart coloca 0 na primeira posição
    const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]  = String(seconds).padStart(2, '0').split('');

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
                            onClick={ startCountdown }
                        >               
                            Iniciar um ciclo
                        </button>
                    )}      
               </> 
            )}              
        </div>
    );
}