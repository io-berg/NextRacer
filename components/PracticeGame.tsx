import { FC, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styles from "../styles/PracticeGame.module.css";
import getRandomParagraph from "../utils/paragraphs";
import Timer from "./Timer";

const PracticeGame: FC = () => {
  const [countDownTime, setCountDownTime] = useState(5);
  const [paragraph, setParagraph] = useState("");
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState(0);
  const interval = useRef<NodeJS.Timer>();
  const [inputDisabled, setInputDisabled] = useState(true);

  const startCountdown = () => {
    for (let i = 5; i >= 0; i--) {
      setTimeout(() => {
        setCountDownTime(i);
        if (i === 0) {
          startCounter();
        }
      }, 1000 * (5 - i));
    }
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
    }
  };

  useEffect(() => {
    setParagraph(getRandomParagraph);
    startCountdown();

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className={countDownTime === 0 ? styles.game : styles.waitTime}>
      {countDownTime !== 0 ? (
        <Timer time={countDownTime} />
      ) : (
        <div className={styles.stopWatch}>
          <div>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
          </div>
        </div>
      )}
      <span className={styles.paragraph}>
        {paragraph.split("").map((letter, idx) => {
          if (userInput[idx] === letter) {
            return (
              <span key={idx} className={styles.correctLetter}>
                {letter}
              </span>
            );
          } else if (idx > userInput.length - 1) {
            return <span key={idx}>{letter}</span>;
          }
          return (
            <span key={idx} className={styles.incorrectLetter}>
              {letter}
            </span>
          );
        })}
      </span>
      <input
        className={styles.input}
        ref={inputRef}
        autoFocus={countDownTime === 0}
        value={userInput}
        onChange={(e) => handleChange(e)}
        disabled={inputDisabled}
        placeholder="Type here..."
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default PracticeGame;
