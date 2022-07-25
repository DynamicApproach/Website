import Nav from "pages/components/Nav";
import styles from "styles/Projects.module.css";
import Link from "next/link";
export const projects = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Recent Projects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/DiscordPager">
              <h2>Discord Pager &rarr;</h2>
            </Link>
            <p>
              Program that listens for specific messages with a leading tag via
              Discord API and relayed those messages by serial to a scrolling
              LCD attached to an Arduino Nano.
            </p>
          </div>

          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/SchoolThings/blob/main/calcmain.asm">
              <h2>MIPS Calc &rarr;</h2>
            </Link>
            <p>
              Created a calculator using a binary tree in MIPS Assembly to find
              the result, prefix, and the postfix of a parenthesized expression
            </p>
          </div>

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
        </div>
      </main>
    </div>
  );
};
export default projects;
