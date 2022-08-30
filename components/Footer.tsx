import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link
        href="https://github.com/io-berg/NextRacer"
        className={styles.footerContent}
      >
        <Image layout="intrinsic" width="2rem" height="1rem" src="/github.svg" alt="Github" />
      </Link>
    </footer>
  );
};

export default Footer;
