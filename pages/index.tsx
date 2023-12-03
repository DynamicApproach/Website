import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Nav from "components/Nav";
import mainimg from "pages/images/smallprofilepic.jpg";
import styles from "styles/index.module.css";

// The data
const addonList = [
  "NPM",
  "GIT",
  "NextJs",
  "TailwindCSS",
  "Typescript",
  "Prettier",
  "ESlint",
  "Husky",
  "LintStaged",
  "Jest"
];
const schoolprojects = [
  "Capstone Project",
  "Computer Communications and Networks"
];

const Index: NextPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Listen to scroll events and update the scroll position state
  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener("scroll", updateScroll);

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Animation variants for Framer Motion
  const variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  return (
    <div
      className=" min-w-screen bg-grad  min-h-screen bg-gradient-to-br
     from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <Nav />
      <motion.div
        initial={{ opacity: 1, scale: 1.5, zIndex: 1 }}
        animate={{ opacity: 0, scale: 1, zIndex: 1 }}
        transition={{ duration: 1 }}
        className="fixed h-full w-full bg-gradient-to-br from-backgray to-albanypurp"
      />
      <Head>
        <meta name="ThomasLJ" content="Thomas LJ Website" />
        <link rel="icon" href="/images/melongray.png" className="border" />
      </Head>

      {/* Use Framer Motion for page transitions */}
      <motion.main
        className={styles.main}
        initial="hidden"
        animate="show"
        exit="exit"
        variants={variants}
      >
        <div className={styles.mainImage}>
          <h2 className="text-3xl text-white">
            <div className="flex min-h-fit min-w-fit content-center justify-center pr-2">
              <Image
                src={mainimg}
                alt="Tiny avatar that looks like a watermelon"
                width={75}
                height={75}
                className="flex rounded-full pb-7 pt-7 "
              />
              Thomas Lloyd-Jones
            </div>
          </h2>
        </div>

        {/* Animate content based on scroll position */}
        <motion.div
          className="h-screen w-screen place-content-center place-items-center justify-center text-center"
          animate={{
            opacity: scrollPosition < 50 ? 1 : 0,
            y: scrollPosition < 50 ? 0 : (scrollPosition - 50) * 0.5, // Adjust the scale of the fading out effect
            zIndex: 1,
            transition: { duration: 0.5 },
            scale: scrollPosition < 50 ? 1 : 0.5
          }}
          transition={{
            duration: scrollPosition < 70 ? 0.5 : 0.2 // Adjust the duration of the fading out effect
          }}
        >
          <div className="">
            <p className=" pr-4 text-nextlightblueish">
              My favourite things are
              <span className=" text-albanyyellow">
                {" "}
                coding, networking
              </span>{" "}
              and{" "}
              <span className=" text-albanyyellow">
                playing video games.
              </span>{" "}
              While currently studying Computer Science at SUNY at Albany, I am
              also working on my skills, website and side projects.
            </p>
            <br></br>
            <p className=" pr-4 text-nextlightblueish">
              This is one of a few side projects currently under construction.
            </p>
          </div>
          <br></br>
          <br></br>
          <p className=" pr-4 text-nextlightblueish">
            Currently, I&apos;m at the end of my final semester! During this,
            I&apos;m currently working at
            <span className="text-albanyyellow">
              {[
                "NYS ITS in DevOps supporting" +
                  ".NET/Angular with AKS (Azure Kubernetes Service)"
              ].join(", ")}
            </span>
            <br></br>
            My final classes will be: <br></br>
            <br></br>
            <span className="text-albanyyellow">
              {schoolprojects.join(", ")}
            </span>
          </p>
          <p className=" pr-4 text-nextlightblueish">
            I am almost finished with my Bachelors of Science in{" "}
            <span className=" text-albanyyellow">Computer Science</span>, with a
            planned graduation date of{" "}
            <span className="text-albanyyellow">December 2023</span>!<br></br>
            <br></br>
            In my spare time, I tend to create new things, and I am currently
            working on a new project, my Capstone iOS app, and this website.{" "}
            <br></br>
          </p>
        </motion.div>

        <br></br>
        <motion.div
          className="h-screen w-screen justify-center text-center"
          animate={{
            opacity: scrollPosition > 80 ? 1 : 0,
            y: scrollPosition > 80 ? 0 : 100,
            zIndex: 2,
            transition: { duration: 0.5 },
            scale: scrollPosition > 80 ? 1 : 0.5
          }}
          transition={{ duration: 0.5 }}
        >
          <p className="relative pl-4 pr-4 pt-14 text-nextlightblueish">
            Take a look at my Github to get an idea of what my current projects
            are.
          </p>
          <div
            className="bg-transparent  
      content-center justify-center border-t-4 border-albanylightpurp p-8 "
          >
            <footer
              className=" bg-transparent grid grid-cols-3 
      content-center justify-center p-8  "
            >
              <div></div>
              <div className={styles.footer}>
                <div className={styles.footerPowered}>
                  <h3 className=" relative content-center justify-center object-center underline">
                    Powered by
                  </h3>{" "}
                  <p className=" relative text-nextlightblueish">
                    {addonList.join(", ")}
                  </p>
                </div>
              </div>
              <p className="relative"></p>
            </footer>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Index;
