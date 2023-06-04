import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Image from "next/image";
export const printprojects = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
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
              alt={"Image of a 3D Printed Rook"}
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
              alt={"Image of a Resin Printer"}
            />
          </div>
          <div className={styles.card}>
            <p> TPU Benchy </p>
            <Image
              src="/images/Benchy.jpg"
              width={300}
              height={300}
              alt={"Image of a TPU Benchy"}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default printprojects;
