import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/io-berg/NextRacer"
        className={styles.footerContent}
      >
        <img className={styles.logo} src="/github.svg" alt="Github" />
      </a>
    </footer>
  );
};

export default Footer;
