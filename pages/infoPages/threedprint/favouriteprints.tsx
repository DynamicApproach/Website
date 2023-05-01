import Link from "next/link";
import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
export const favouriteprints = () => {
  return (
    <div className="bg-backgray">
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>My favourite prints</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p></p>
            <Link href="/infoPages/threedprinting">
              <h2 className="float-right">Back&rarr;</h2>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
export default favouriteprints;
