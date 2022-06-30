import type { NextPage } from "next";
import Head from "next/head";
//import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "pages/Nav";
//import Link from "next/link";
import tw from "tailwind-styled-components";
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
const date = new Date();
const seconds: number = date.getSeconds();
const minutes: number = date.getMinutes();
const hours: number = date.getHours();
const time = `${hours}:${minutes}:${seconds}`;
let timeWelcome = `${hours}:${minutes}`;

if (hours < 12 && hours > 5) {
  timeWelcome = "Good morning!";
} else if (hours > 5 && hours >= 12 && hours < 14) {
  timeWelcome = "Good afternoon!";
} else if (hours >= 14 && hours < 20) {
  timeWelcome = "Good evening!";
} else if (hours >= 20 && hours < 23) {
  timeWelcome = "Welcome, I hope your evening is well.";
} else {
  timeWelcome = "Ah, it's late! Night is always the most peaceful. Welcome.";
}
const Index: NextPage = () => (
  <div className="light:bg-white mx-auto bg-backgray ">
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>{timeWelcome}</h1>
      <h2 className={styles.central}> This is my personal portfolio</h2>
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
            Before persuing my love of code, I have previously worked as a
            cosmetologist. I have a passion for creating and maintaining beauty
            in all of its forms.
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
        >
          Thomas Lloyd-Jones
        </h4>
      </div>
      <p className="relative">
        <small className=" absolute inset-x-0 bottom-0">{time}</small>
      </p>
    </footer>
  </div>
);

export default Index;
