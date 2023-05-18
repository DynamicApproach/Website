import "styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, logPageView } from "../utils/ana";
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();

  useEffect(() => {
    initGA();
    // `routeChangeComplete` won't run for the first page load unless the query string is
    // hydrated later on, so here we log a page view if this is the first render and
    // there's no query string
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
