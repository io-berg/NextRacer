import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [animatedText, setAnimatedText] = useState<string>("");
  const text = "A Typeracer clone built with Next.js and TypeScript";

  const animateText = async () => {
    let progress = "";
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      progress += text[i];
      setAnimatedText(progress);
    }
  };

  useEffect(() => {
    animateText();
  }, []);

  return (
    <Layout>
      <Head>
        <title>NextRacer</title>
        <meta name="description" content="Typeracer game with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className="blue"> NextRacer!</span>
        </h1>
        <p className={styles.typedText}>{animatedText}</p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Practice</h2>
            <p>Test your skills without having to worry about an opponent.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.titel}>Random duel</h2>
            <p>Play against a random player.</p>
          </div>
          <div className={styles.card}>
            <h2>Duel a friend</h2>
            <p>Generate a URL and play against a friend</p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
