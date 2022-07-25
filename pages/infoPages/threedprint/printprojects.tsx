import Link from "next/link";
import Nav from "pages/components/Nav";
import styles from "styles/Projects.module.css";
export const printprojects = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>printprojects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/infoPages/threedprinting">
              <h2>Back&rarr;</h2>
            </Link>
            <p>
              My printer was originally an Ender 3 (when they were first
              released) and consisted of the default parts. I quickly modified
              it to be able to print faster with and increased range of
              materials. This led to an increasing amount of modifications.
              <br />
              Essentially, the only parts left the same, were the stepper
              moters, the frame and the power supply.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default printprojects;
