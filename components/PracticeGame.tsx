import { FC, useEffect, useRef, useState } from "react";
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
      setTime((prev) => prev + 1);
    }, 100);
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
      <Timer time={countDownTime} />
      <span onCopy={(e) => e.preventDefault()}>
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
      <div className={styles.stopWatch}>
        <span>{time}</span>
      </div>
      <input
        ref={inputRef}
        value={userInput}
        onChange={(e) => handleChange(e)}
        disabled={countDownTime === 0 ? false : true}
        placeholder="Type here..."
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default PracticeGame;
