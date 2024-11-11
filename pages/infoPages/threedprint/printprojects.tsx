import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
export const printprojects = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach-Print Projects</title>{" "}
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
        <h1 className={styles.title}>Printed Projects</h1>
        <h2 className={styles.subtitle}>
          Some examples of previous projects include a variable powersupply.
        </h2>{" "}
        <div className={styles.grid}>
          <div className={styles.card}>
            <p>
              {" "}
              One of my first prints for the Saturn was a vent to use to pump
              out fumes. Small in-line hvac booster fan used.{" "}
            </p>
            <Image
              src="/images/vent.jpg"
              width={300}
              height={300}
              alt={"Image of a 3D Printed Rook"}
            />
          </div>

          <div className={styles.card}>
            <p> A Variable Powersupply </p>
            <Image
              src="/images/variablepower.jpg"
              width={300}
              height={300}
              alt={"Image of a variable powersupply"}
            />
          </div>
          <div className={styles.card}>
            <p> Initial Print for Saturn</p>
            <Image
              src="/images/rook.jpg"
              width={300}
              height={300}
              alt={"Image of a Resin Printer"}
            />
          </div>
          <div className={styles.card}>
            <p> My first hardware/software mix project </p>
            <Image
              src="/images/first.jpg"
              width={300}
              height={300}
              alt={"Image of a LCD screen + circuit board"}
            />
          </div>
          <div className={styles.card}>
            <p> TPU Benchy </p>
            <Image
              src="/images/benchy.jpg"
              width={250}
              height={250}
              alt={"Image of a TPU Benchy"}
            />
          </div>
        </div>
        <Link className={styles.cardnoborder} href="/infoPages/threedprinting">
          <h2 className="float-right text-nextgreen">Back&rarr;</h2>
        </Link>
      </main>
    </div>
  );
};
export default printprojects;
