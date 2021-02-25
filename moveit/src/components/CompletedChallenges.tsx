import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompleteChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext);
    return (
        <div className={ styles.completedChallengeContainer }>
            <span>Desafios completos</span>
            <span>{ challengesCompleted }</span>
        </div>
    );
}