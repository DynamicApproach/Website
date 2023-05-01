import Nav from "components/Nav";
import ThreeScene from "components/ThreeScene";
export const threejss = () => {
  return (
    <div
      className="min-w-screen min-h-screen bg-backgray bg-gradient-to-r from-backgray
      to-albanypurp bg-cover bg-scroll "
    >
      <Nav />
      <main className="container">
        <ThreeScene />
      </main>
    </div>
  );
};
export default threejss;
