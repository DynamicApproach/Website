import Nav from "pages/Nav";
import styles from "styles/Projects.module.css";
export const projects = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Recent Projects</h1>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Discord Pager &rarr;</h2>
            <p>
              Program that listens for specific messages with a leading tag via
              Discord API and relayed those messages by serial to a scrolling
              LCD attached to an Arduino Nano.
            </p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>MIPS Calc &rarr;</h2>

            <p>
              Created a calculator using a binary tree in MIPS Assembly to find
              the result, prefix, and the postfix of a parenthesized expression
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Project3 &rarr;</h2>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Project4&rarr;</h2>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
};
export default projects;
