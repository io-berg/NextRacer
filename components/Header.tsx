import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Header.module.css";

interface HeaderProps {
  isHome?: boolean;
}

const Header: FC<HeaderProps> = ({ isHome }) => {
  return (
    <header className={styles.header}>
      <Link className={styles.link} href="/">
        <div>
          Next<span>Racer</span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
