import Link from "next/link";
import Nav from "pages/components/Nav";
import styles from "styles/Projects.module.css";

export const klipperconfig = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Klipper Config</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            {/* Import textfile as text */}
            <h2>Config &rarr;</h2>
            <p className="text-nextlightblueish">To be added - Contact me!</p>
          </div>
        </div>
        <div className={styles.card}>
          <Link href="/infoPages/threedprinting">
            <h2 className="text-nextblue">Back&rarr;</h2>
          </Link>
          <p></p>
        </div>
      </main>
    </div>
  );
};
export default klipperconfig;
