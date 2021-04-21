import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import { useChallenges } from '../hooks/useChallegens';
import style from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completedChallenge } = useChallenges(); //se o activeChallenge estiver null significa que eu não tenho um challenge ativo
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeCompleted(){
        completedChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }


    return (
        <div className={ style.challengeBoxContainer}>
            { activeChallenge ? (    
                <div className={ style.challengeActive }>

                    <header>Ganhe { activeChallenge.amount } xp</header>
                    <main>
                        <img src={`icons/${ activeChallenge.type }.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{ activeChallenge.description }</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={ style.challengeFailedButton }
                            onClick={ handleChallengeFailed }
                        >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={ style.challengeCompletedButton }
                            onClick={ handleChallengeCompleted }
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={ style.challengeNotActive }>
                    <strong> 
                        Inicie um ciclo para receber desafios a serem completados
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" />
                        Avance de level
                    </p>
                </div>
            )}
        </div>
    );
}