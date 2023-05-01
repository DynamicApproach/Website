import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Link from "next/link";
export const projects = () => {
  return (
    <div
      className="bg-gradient-to-r
    from-backgray to-albanypurp bg-cover  bg-bottom bg-no-repeat"
    >
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
            href="https://github.com/DynamicApproach/AllCode"
            className={styles.card}
          >
            <h2>Random Code &rarr;</h2>
            <p>
              A large list of random code snippets I&apos;ve written for various
              projects. Not organized, but it&apos;s here.
            </p>
          </a>
          <Link className={styles.cardnoborder} href="/">
            <h2 className="float-right text-nextblue">Back&rarr;</h2>
          </Link>
        </div>
      </main>
    </div>
  );
};
export default projects;
