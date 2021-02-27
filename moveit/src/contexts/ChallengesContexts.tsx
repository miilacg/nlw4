//o contexto é uma forma da gente ter acesso a uma informação de diversos lugares
import { createContext, ReactNode, useEffect, useState } from 'react'; //usa o ReactNode quando o tipo do componente é um componente react
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
    activeChallenge: Challenge;
}

//em TS pode ser tanto type quanto interface
interface ChallengesProviderProps {
    children: ReactNode; // coloca ? quando a propriedade não é obrigatoria
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

//significa que o contexto segue o padrão do ChallengesContextData
export const ChallengesContext = createContext({} as ChallengesContextData);

//...rest é um objeto que tem dentro dele todas as propriedades diferentes de children
export function ChallengesProvider ({ children, ...rest }: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1); //se o rest.level não existir eu uso 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []) //quando passa um array vazio como segundo parametro significa que a função só será executada uma unica vez quando esse componente for chamado

    useEffect(() => {
        Cookies.set('level', String(level)); //cookies só aceitam salvar textos
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
        setLevel(level + 1); //eu preciso criar um novo valor para level ao inves de mudar o valor dele
        setIsLevelModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false);
    }

    function startNewChallenge() {
        const randamChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randamChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){ //função chamada quando o usuario falhar
        setActiveChallenge(null);
    }

    function completedChallenge(){ // não precisa receber paramentro pq da pra saber o desafio ativo pela activeChallenge
        if (!activeChallenge){ // essa função não pode ser chamada se o usuario não tiver com um desafio ativo
            return;
        }

        const { amount } = activeChallenge; //amout e a quantidade de xp do desafio
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel){ //se for maior eu preciso subir de nível
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1); //numero de desafios completos
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
                experienceToNextLevel,
                completedChallenge,
                closeLevelUpModal
            }}
        > 
            { children }

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}