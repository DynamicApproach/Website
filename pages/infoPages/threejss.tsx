import Nav from "components/Nav";
import ThreeScene from "components/ThreeScene";
import Head from "next/head";
export const threejss = () => {
  return (
    <div
      className="min-w-screen min-h-screen bg-backgray bg-gradient-to-r from-backgray
      to-albanypurp bg-cover bg-scroll "
    >
      <Head>
        <title>🎆DynamicApproach-ThreeJS</title>
      </Head>
      <Nav />
      <main className="container">
        <ThreeScene />
      </main>
    </div>
  );
};
export default threejss;
