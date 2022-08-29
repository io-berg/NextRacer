import { FC } from "react";
import styles from "../styles/CountDown.module.css";

interface Props {
  time: number;
}

const CountDown: FC<Props> = ({ time }) => {
  return (
    <div className={styles.countDownConatiner}>
      <div>{time}</div>
    </div>
  );
};

export default CountDown;
