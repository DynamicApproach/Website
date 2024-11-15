import Link from "next/link";
import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
export const threedprinting = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach-Printing</title>{" "}
      </Head>
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>Recent Printing Projects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/infoPages/threedprint/myprinter">
              <h2>My Printer &rarr;</h2>
              <p>
                I currently own two printers, a heavily modified Ender 3 and an
                Elegoo Saturn 2. Take a look!
              </p>
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
            <h2>
              <Link href="/infoPages/threedprint/klipperconfig">
                Klipper config &rarr;
              </Link>
            </h2>
            <p>Full config for Klipper</p>
          </div>
        </div>{" "}
        <div className={styles.supercard}>
          <h2> My soldering station</h2>
          <p>
            {" "}
            Currently with two temperature sensors, one for outside and one for
            inside.{" "}
          </p>
          <Image
            src="/images/soldering.jpg"
            width={600}
            height={600}
            alt={"Image of a 3D Printed Rook"}
          />
        </div>
        <Link className={styles.cardnoborder} href="/">
          <h2 className="float-right text-nextgreen">Back&rarr;</h2>
        </Link>
      </main>
      <Script
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
    </div>
  );
};
export default threedprinting;
