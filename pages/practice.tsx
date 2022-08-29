import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  default as Button,
  default as StartButton,
} from "../components/Button";
import Header from "../components/Header";
import Layout from "../components/Layout";
import TypingAnimatedText from "../components/TypingAnimatedText";
import TypingGame from "../components/TypingGame";
import styles from "../styles/Practice.module.css";
import getRandomParagraph from "../utils/paragraphs";

const Practice: NextPage = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<boolean>(false);
  const interval = useRef<NodeJS.Timer>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [userInput, setUserInput] = useState<string>("");
  const [gameFinished, setGameFinished] = useState(false);
  const [paragraph, setParagraph] = useState("");

  const handleReset = () => {
    setCurrentlyPlaying(false);
    setGameFinished(false);
    setTime(0);
    setUserInput("");
    setParagraph(getRandomParagraph);
  };

  const handleStart = () => {
    setCurrentlyPlaying(true);
  };

  const startCounter = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
    flushSync(() => {
      setInputDisabled(false);
    });
    inputRef.current?.focus();
  };

  const stopCounter = () => {
    clearInterval(interval.current);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);

    if (e.target.value === paragraph) {
      stopCounter();
      setGameFinished(true);
    }
  };

  useEffect(() => {
    setParagraph(getRandomParagraph);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Practice</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {currentlyPlaying ? (
          <>
            <TypingGame
              paragraph={paragraph}
              time={time}
              startCounter={startCounter}
              inputDisabled={inputDisabled}
              inputRef={inputRef}
              userInput={userInput}
              handleChange={handleChange}
            />
            {gameFinished ? (
              <div className={styles.finishMessage}>
                <h1>Game Finished</h1>
                <span>
                  You typed:{" "}
                  {(paragraph.split(" ").length / (time / 60000)).toFixed(3)}{" "}
                  words per minutes
                </span>
                <Button onClick={() => handleReset()} text="Reset" />
              </div>
            ) : null}
          </>
        ) : (
          <div className={styles.howToPlay}>
            <TypingAnimatedText text="How to play" type="h1" />
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
