import "styles/globals.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();
  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{ type: "linear", duration: 0.65 }}
        variants={{
          initialState: {
            opacity: 0,
            x: -200,
            y: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
          },
          animateState: {
            opacity: 1,
            x: 0,
            y: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
          },
          exitState: {
            opacity: 0.0,
            x: 200,
            y: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
          }
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
