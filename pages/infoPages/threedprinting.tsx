import Link from "next/link";
import Nav from "pages/components/Nav";
import styles from "styles/Projects.module.css";
export const threedprinting = () => {
  return (
    <div
      className="bg-backgray bg-gradient-to-r
    from-backgray to-albanypurp bg-local"
    >
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Recent Printing Projects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/infoPages/threedprint/myprinter">
              <h2>My Printer &rarr;</h2>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/infoPages/threedprint/printprojects">
              <h2>Printed Projects &rarr;</h2>
            </Link>
            <p>
              Examples include a variable powersupply. A common variable power
              supply via buying parts as a consumer one was too expensive
              printing others.
            </p>
          </div>
          <div className={styles.card}>
            <Link href="/infoPages/threedprint/favouriteprints">
              <h2>Favourite Prints &rarr;</h2>
            </Link>
            <p>My favourite prints over time</p>
          </div>
          <div className={styles.card}>
            <h2>
              <Link href="/infoPages/threedprint/klipperconfig">
                Klipper config &rarr;
              </Link>
            </h2>
            <p>Full config</p>
          </div>

          <Link className={styles.cardnoborder} href="/">
            <h2 className="float-right text-nextblue">Back&rarr;</h2>
          </Link>
        </div>
      </main>
    </div>
  );
};
export default threedprinting;
