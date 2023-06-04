import Link from "next/link";
import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Image from "next/image";
export const myprinter = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Nav />

      <main className={styles.main}>
        <h1 className={styles.title}>My Printers</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p>
              My printer was originally an Ender 3 (when they were first
              released) and consisted of the default parts. I quickly modified
              it to be able to print faster with and increased range of
              materials. This led to an increasing amount of modifications.
              <br />
              Essentially, the only parts left the same, were the stepper
              moters, the frame and the power supply.
            </p>

            <Image
              src="/images/ender3.jpg"
              width={600}
              height={600}
              alt={"Image of a FDM Printer"}
            />
          </div>
          <div className={styles.card}>
            <p>
              My latest printer is an Elegoo Saturn 2. This is a resin printer
              that uses UV light to cure resin. It has a much higher resolution
              than my FDM printer and is much faster. It is also much more
              expensive to run.
              <br />I have printed a few things on it - the main reason it was
              purcahsed was to print the parts for a new printer and for my
              Ender 3.
            </p>
            <div className="justify-center">
              <Image
                src="/images/resin.jpg"
                width={600}
                height={600}
                alt={"Image of a Resin Printer"}
              />
              <div className=""></div>
            </div>
          </div>{" "}
          <Link href="/infoPages/threedprinting">
            <h2 className="float-right  text-nextgreen">Back&rarr;</h2>
          </Link>
        </div>
      </main>
    </div>
  );
};
export default myprinter;
