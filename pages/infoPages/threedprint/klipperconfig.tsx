import Link from "next/link";
import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Head from "next/head";

export const klipperconfig = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach-Klipper Config</title>{" "}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ouiiyeyuum");
              `
          }}
        />
      </Head>
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Klipper Config</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Config &rarr;</h2>
            <a
              href="/klipper config.txt"
              download="klipperconf.txt"
              className="text-nextlightblueish"
            >
              Download Klipper Config
            </a>
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
