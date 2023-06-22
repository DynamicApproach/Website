import Link from "next/link";
import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Head from "next/head";
export const favouriteprints = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach-DynamicApproach</title>
      </Head>
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
