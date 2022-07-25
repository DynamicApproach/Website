import Link from "next/link";
import Nav from "pages/Nav";
import styles from "styles/Projects.module.css";
export const klipperconfig = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Klipper Config</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/threedprinting">
              <h2>Back&rarr;</h2>
            </Link>
            <p></p>
          </div>
        </div>
      </main>
    </div>
  );
};
export default klipperconfig;
