import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  const [percentToNextLevel, setPercentToNextLevel] = useState(0);

  useEffect(() => {
    setPercentToNextLevel(Math.round(currentExperience * 100) / experienceToNextLevel);
  }, [experienceToNextLevel, currentExperience]);

  return (
    //o estilo poderia ser passado igual em HTML
    <header className={ styles.experienceBar }>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${ percentToNextLevel }%` }} />

        <span className={ styles.currentExperience } style={{ left: `${ percentToNextLevel }%` }}>
          { currentExperience } xp
        </span>
      </div>
      <span>{ experienceToNextLevel } xp</span>
    </header>
  );
}