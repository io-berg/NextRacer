import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import StartButton from "../components/Button";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PracticeGame from "../components/PracticeGame";
import styles from "../styles/Practice.module.css";

const Practice: NextPage = () => {
  const [currenttlyPlaying, setCurrenttlyPlaying] = useState<boolean>(false);

  const handleStart = () => {
    setCurrenttlyPlaying(true);
  };

  return (
    <Layout>
      <Head>
        <title>Practice</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {currenttlyPlaying ? (
          <PracticeGame />
        ) : (
          <div className={styles.howToPlay}>
            <h1>How to play</h1>
            <p>
              The goal of the game is to type the text as fast as possible. The
              text will be displayed in the middle of the screen with a
              countdown timer. When the timer reaches 0 you can start typing.
            </p>
            <StartButton onClick={() => handleStart()} text="Start Practice" />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Practice;
