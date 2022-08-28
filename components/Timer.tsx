import { FC } from "react";
import styles from "../styles/Timer.module.css";

interface Props {
  time: number;
}

const Timer: FC<Props> = ({ time }) => {
  return (
    <div className={styles.timer}>
      <div className={styles.timerText}>{time}</div>
    </div>
  );
};

export default Timer;
