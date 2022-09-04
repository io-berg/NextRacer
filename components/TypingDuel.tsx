import { FC, useEffect, useRef } from "react";
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
  serverCountDownTime: number;
}

const TypingDuel: FC<Props> = ({
  time,
  paragraph,
  startCounter,
  userInput,
  handleChange,
  inputDisabled,
  serverCountDownTime,
}) => {
  const interval = useRef<NodeJS.Timer>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, [interval]);

  useEffect(() => {
    if (serverCountDownTime == 0) {
      startCounter();
    }

    inputRef.current?.focus();
  }, [inputDisabled, serverCountDownTime]);

  return (
    <div className={styles.game}>
      {serverCountDownTime !== 0 ? (
        <Timer time={serverCountDownTime} />
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
        autoFocus={serverCountDownTime === 0}
        value={userInput}
        onChange={(e) => handleChange(e)}
        disabled={inputDisabled}
        placeholder="Type here..."
        onPaste={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default TypingDuel;
