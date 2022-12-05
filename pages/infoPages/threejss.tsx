import Nav from "pages/components/Nav";
import ThreeScene from "pages/components/ThreeScene";
import styles from "styles/Projects.module.css";
export const threejss = () => {
  return (
    <div
      className="bg-backgray bg-gradient-to-r
    from-backgray to-albanypurp bg-local"
    >
      <Nav />
      <main className={styles.main}>
        <ThreeScene />
      </main>
    </div>
  );
};
export default threejss;
