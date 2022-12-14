import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/TypingGame.module.css";
import Timer from "./CountDown";
import StopWatch from "./StopWatch";

interface Props {
  time: number;
  paragraph: string;
  startCounter: () => void;
  inputDisabled: boolean;
  userInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverCountDownTime?: number;
  practice?: boolean;
}

const TypingGame: FC<Props> = ({
  time,
  paragraph,
  startCounter,
  userInput,
  handleChange,
  inputDisabled,
  serverCountDownTime,
  practice,
}) => {
  const [countDownTime, setCountDownTime] = useState(5);
  const interval = useRef<NodeJS.Timer>();
  const inputRef = useRef<HTMLInputElement>(null);

  const startCountdown = () => {
    for (let i = 5; i >= 0; i--) {
      setTimeout(() => {
        setCountDownTime(i);
        if (i === 0) {
          startCounter();
        }
      }, 1000 * (5 - i));
    }
    inputRef.current?.focus();
  };

  if (serverCountDownTime == 0) {
    startCounter();
  }

  useEffect(() => {
    if (practice) startCountdown();

    return () => {
      clearInterval(interval.current);
    };
  }, [interval]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputDisabled]);

  return (
    <div className={styles.game}>
      {countDownTime !== 0 ? (
        <Timer time={countDownTime} />
      ) : (
        <StopWatch time={time} />
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

export default TypingGame;
