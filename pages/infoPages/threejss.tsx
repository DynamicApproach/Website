import Nav from "pages/components/Nav";
import ThreeScene from "pages/components/ThreeScene";
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
