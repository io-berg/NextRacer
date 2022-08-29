import { FC, useEffect, useState } from "react";
import styles from "../styles/TypingAnimatedText.module.css";

interface Props {
  text: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const TypingAnimatedText: FC<Props> = ({ text, type }) => {
  const [animatedText, setAnimatedText] = useState<string>("");

  const animateText = async () => {
    let progress = "";
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      progress += text[i];
      setAnimatedText(progress);
    }
  };
  let textElem;

  if (type === "h1") {
    textElem = <h1 className={styles.animatedText}>{animatedText}</h1>;
  } else if (type === "h2") {
    textElem = <h2 className={styles.animatedText}>{animatedText}</h2>;
  } else if (type === "h3") {
    textElem = <h3 className={styles.animatedText}>{animatedText}</h3>;
  } else if (type === "h4") {
    textElem = <h4 className={styles.animatedText}>{animatedText}</h4>;
  } else if (type === "h5") {
    textElem = <h5 className={styles.animatedText}>{animatedText}</h5>;
  } else if (type === "h6") {
    textElem = <h6 className={styles.animatedText}>{animatedText}</h6>;
  } else if (type === "p") {
    textElem = <p className={styles.animatedText}>{animatedText}</p>;
  } else if (type === "span") {
    textElem = <span className={styles.animatedText}>{animatedText}</span>;
  } else {
    textElem = <div className={styles.animatedText}>{animatedText}</div>;
  }

  useEffect(() => {
    animateText();
  }, []);

  return textElem;
};

export default TypingAnimatedText;
