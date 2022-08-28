import { FC } from "react";
import styles from "../styles/Header.module.css";

interface HeaderProps {
  isHome?: boolean;
}

const Header: FC<HeaderProps> = ({ isHome }) => {
  return (
    <header className={styles.header}>
      <a className={styles.link} href="/">
        Next<span>Racer</span>
      </a>
    </header>
  );
};

export default Header;
