import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/PracticeGame.module.css";
import Timer from "./Timer";

interface Props {
  time: number;
  paragraph: string;
  startCounter: () => void;
  inputDisabled: boolean;
  userInput: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TypingGame: FC<Props> = ({
  time,
  paragraph,
  startCounter,
  userInput,
  handleChange,
  inputRef,
  inputDisabled,
}) => {
  const [countDownTime, setCountDownTime] = useState(5);
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

  useEffect(() => {
    startCountdown();

    return () => {
      clearInterval(interval.current);
    };
  }, [interval]);

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
        // onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default TypingGame;
