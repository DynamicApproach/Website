import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "pages/components/Nav";

import watermelonportal from "pages/images/watermelonportal.png";
//import Link from "next/link";
const addonList = [
  "NPM, ",
  "GIT, ",
  "NextJs, ",
  "TailwindCSS, ",
  "Typescript, ",
  "Prettier, ",
  "ESlint, ",
  "Husky, ",
  "LintStaged, ",
  "Jest "
];

const Index: NextPage = () => (
  <div className="light:bg-white mx-auto bg-backgray ">
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>

    <main className={styles.main}>
      <h2 className="light:text-nextblue content-center items-center justify-center text-5xl">
        My name is Thomas Lloyd-Jones. This is my personal portfolio and
        website.
      </h2>
      <div className={styles.description}>
        While currently studying as a senior at SUNY at Albany, I am currently
        working on my portfolio. I am a software engineer with a passion for
        learning and building things. Thomas Lloyd-Jones
        <div className="grid grid-cols-2">
          <p className={styles.descriptiondouble}>
            Before persuing my love of code, I have previously worked as a
            cosmetologist. I have a passion for creating and maintaining beauty
            in all of its forms.
          </p>
          <p className={styles.descriptiondouble}>
            <Image src={watermelonportal} width={1000} height={1000} />
          </p>
        </div>
      </div>
    </main>

    <footer className=" relative flex flex-1 content-center justify-center border-t-4 border-nextblue p-8 ">
      <div className="max-w-m flex min-w-min flex-wrap content-center justify-center ">
        <h3
          className=" left-0 m-4 min-w-min max-w-xs border-spacing-4 
        border border-solid border-nextblue p-6 text-left"
        >
          Powered by <p className="color-blue">{addonList}</p>
        </h3>
        <h4
          className="color-white right-0 m-4 max-w-xs border-spacing-4 
        content-center justify-center border border-solid border-nextblue p-6 text-left"
        ></h4>
      </div>
      <p className="relative"></p>
    </footer>
  </div>
);

export default Index;
