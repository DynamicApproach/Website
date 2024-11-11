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
        <title>🎆DynamicApproach-ThreeJS</title>{" "}
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
      <main className="container">
        <ThreeScene />
      </main>
    </div>
  );
};
export default threejss;
