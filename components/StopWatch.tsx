import { FC } from "react";
import styles from "../styles/StopWatch.module.css";

interface Props {
  time: number;
}

const StopWatch: FC<Props> = ({ time }) => {
  return (
    <div className={styles.stopWatch}>
      <div>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default StopWatch;
