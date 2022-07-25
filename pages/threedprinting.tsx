import Link from "next/link";
import Nav from "pages/Nav";
import styles from "styles/Projects.module.css";
export const threedprinting = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Recent Projects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/threedprint/myprinter">
              <h2>My Printer &rarr;</h2>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/threedprint/printprojects">
              <h2>Printed Projects &rarr;</h2>
            </Link>
            <p>
              I was only able to create a power supply via buying parts and
              printing others.
            </p>
          </div>

          <div className={styles.card}>
            <Link href="/threedprint/favouriteprints">
              <h2>Favourite Prints &rarr;</h2>
            </Link>

            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </p>
          </div>

          <div className={styles.card}>
            <h2>
              <Link href="/threedprint/klipperconfig">
                Klipper config &rarr;
              </Link>
            </h2>
            <p>Full config</p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default threedprinting;
