import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompleteChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContexts';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}


//o componente recebe por paramentro todas as propriedades dele
export default function Home(props: HomeProps) {
  return (
    //toda vez que passar algo dentro de um componente será um children

    //se um contexto depender de outro ele precisa ser colocado por dentro do contexto que ele deped
    <ChallengesProvider 
      level={ props.level }
      currentExperience={ props.currentExperience }
      challengesCompleted={ props.challengesCompleted }
    > 
      <div className={ styles.container }>  
        <Head>
          <title>Início | Move.it </title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />         
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>    
      </div>
    </ChallengesProvider>
  )
}

//tudo que é feito aqui roda no next
//precisa ter exatamente o nome getServerSideProps
// GetServerSideProps é o tipo da função
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}


/**
 * quando eu declaro getServerSideProps dentro de uma pagina do next eu consigo manipular
 * quais dados são repasados da camada do next (servidor next back end) pro meu front (react)
 */
