import { CompleteChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
     //toda vez que passar algo dentro de um componente será um children
    <div className={ styles.container }>  
      <Head>
        <title>Início | Move.it </title>
      </Head>

      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompleteChallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}