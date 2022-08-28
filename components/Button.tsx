import { FC } from "react";
import styles from "../styles/Button.module.css";

interface Props {
  onClick: () => void;
  text: string;
}

const Button: FC<Props> = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
