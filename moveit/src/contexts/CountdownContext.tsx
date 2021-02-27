import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContexts";

interface CountdownProviderProps{
    children: ReactNode;
}

interface CountdownContextData { //dados que eu vou retornar de dentro desse contexto
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}


let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData) //o formato desse contexto é CountdownContextData

//o componente recebe por paramentro todas as propriedades dele
export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    //o useState retorna um array com a variavel e com a função de atualização
    //quando o estado é definido dentro do componente, cada novo componente tera um estado diferente
    //em useState passar o valor que eu quero inicializar o estado
    const [time, setTime] = useState(0.05 * 60); //tempo em segundos
    const [isActive, setIsActive] = useState(false); //o usuario precisa clicar no botão para ativar
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60); //arredonda para baixo
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout); //cancela a execução do setTimeout
        setIsActive(false);
        setHasFinished(false);
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
                startNewChallenge();
            }
        }
    }, [isActive, time]) 
    
    return(
        <CountdownContext.Provider 
            value={{
                isActive,
                resetCountdown,
                hasFinished,
                startCountdown,
                minutes,
                seconds,
            }}
        >
            { children }
        </CountdownContext.Provider>
    );
}