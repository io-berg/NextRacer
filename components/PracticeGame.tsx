import { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/PracticeGame.module.css";
import getRandomParagraph from "../utils/paragraphs";
import Timer from "./Timer";

const PracticeGame: FC = () => {
  const [time, setTime] = useState(5);
  const [paragraph, setParagraph] = useState("");
  const [userInput, setUserInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [finishTime, setFinishTime] = useState(0);

  const startCountdown = async () => {
    for (let i = 5; i >= 0; i--) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setTime(i);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    setParagraph(getRandomParagraph);
    startCountdown();

    inputRef.current?.focus();
  }, []);

  return (
    <div className={time === 0 ? styles.game : styles.waitTime}>
      <Timer time={time} />
      <span>
        {paragraph.split("").map((letter, idx) => {
          if (userInput[idx] === letter) {
            return <span className={styles.correctLetter}>{letter}</span>;
          } else if (idx > userInput.length - 1) {
            return <span>{letter}</span>;
          }
          return <span className={styles.incorrectLetter}>{letter}</span>;
        })}
      </span>
      <input
        ref={inputRef}
        value={userInput}
        onChange={(e) => handleChange(e)}
        disabled={time === 0 ? false : true}
        placeholder="Type here..."
      />
    </div>
  );
};

export default PracticeGame;
