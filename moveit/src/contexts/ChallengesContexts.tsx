//o contexto é uma forma da gente ter acesso a uma informação de diversos lugares
import { createContext, useState, ReactNode, VideoHTMLAttributes  } from 'react'; //usa o ReactNode quando o tipo do componente é um componente react
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    activeChallenge: Challenge;
}

//em TS pode ser tanto type quanto interface
interface ChallengesProviderProps {
    children: ReactNode; // coloca ? quando a propriedade não é obrigatoria
}

//significa que o contexto segue o padrão do ChallengesContextData
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({ children }: ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randamChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randamChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge(){ //função chamada quando o usuario falhar
        setActiveChallenge(null);
    }


    return (
        /* todos os elementos dentro de provider terão acesso aos dados dentro daquele contexto*/
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                levelUp, 
                startNewChallenge, 
                activeChallenge, 
                resetChallenge,
                experienceToNextLevel
            }}
        > 
            { children }
        </ChallengesContext.Provider>
    );
}