import "styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "../utils/ana";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();

  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
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
    />;
    if (!router.asPath.includes("?")) {
      logPageView();
    }
  }, []);

  useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default MyApp;
