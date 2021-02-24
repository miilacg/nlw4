//useState => funcionalidade para definir estados dentro do componente
//useEffect => funcionalidade para disparar efeitos colaterais (quando algo acontecer um efeito e gerado)
import { useState, useEffect } from 'react'; 
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    //o useState retorna um array com a variavel e com a função de atualização
    //quando o estado é definido dentro do componente, cada novo componente tera um estado diferente
    //em useState passar o valor que eu quero inicializar o estado
    const [time, setTime] = useState(27 * 60); //tempo em segundos
    const [active, setActive] = useState(false); //o usuario precisa clicar no botão para ativar

    const minutes = Math.floor(time / 60); //arredonda para baixo
    const seconds = time % 60;

    //se a string não tiver dois caracteres o padStart coloca 0 na primeira posição
    const [minuteLeft, minuteRight]  = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight]  = String(seconds).padStart(2, '0').split('');

    function starCountdown(){
        setActive(true);
    }

    //precisa passar dois parametros e o primeiro parametro e sempre o que eu quero executar (uma função)
    //o segundo parametro e quando eu quero executar
    useEffect(() => {
        if (active && time > 0){ 
            setTimeout(() => { //muda o tempo quando esta active ou quando o time muda
                setTime(time - 1);
            }, 1000) //a cada segundo diminui um segundo
        }
    }, [active, time]) 

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
            <button 
                type="button" 
                className={ styles.countdownButton }
                onClick={ starCountdown }
            >
                Iniciar um ciclo
            </button>
        </div>
    );
}