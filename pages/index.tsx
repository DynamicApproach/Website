import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "pages/components/Nav";
import arrowr from "pages/images/arrowr.png";
import { Lightmode } from "pages/components/Lightmode";

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
const schoolprojects = [
  "Computer Security, Databases, Algorithms, and Programming Languages"
];
const internship = [
  "Data anylasis, ",
  "and data visualization ",
  " for a local company to gather sales data and visualize it in a way that is easy to understand. "
];

const Index: NextPage = () => (
  <div
    className="light:bg-white h-screen max-h-full bg-backgray bg-gradient-to-r
   from-backgray to-albanypurp bg-local "
  >
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>
    <main className="bg-transparent light:text-black">
      <div className="gap-4 pl-20 pb-3 align-middle">
        <h2
          className="col-span-3 items-center justify-center gap-4 
         pr-4 text-center align-middle text-2xl text-albanyyellow"
        >
          Thomas Lloyd-Jones
        </h2>
      </div>

      <div className="grid h-auto w-auto grid-cols-2 border-solid border-albanylightpurp pl-5">
        <div className="">
          <p className={styles.descriptiondoubleb}>
            Currently, I&apos;m working on: <br></br> <br></br>
            {internship}
            <br></br>
            <br></br>
            Mean while, at school I&apos;m working on: <br></br>
            {schoolprojects}
          </p>
        </div>
        <div className="">
          <p className={styles.descriptiondoubleb}>
            I am almost finished with my Bachelors of Science in Computer
            Science, with a planned graduation date of December 2023.
            <br></br>
            <br></br>
            In my spare time, I tend to create new things, and I am currently
            working on a new project, and this website. <br></br>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 ">
        <p></p>
        <div className=" align-between pb-3 ">
          <p className=" text-nextlightblueish">
            My favourite things are coding, networking and playing video games.
            While currently studying as a senior at SUNY at Albany, I am also
            working on my portfolio. I am a software engineer with a passion for
            learning and building things.
          </p>
        </div>
      </div>
    </main>
    <div
      className="bg-transparent  relative grid 
    grid-cols-3 content-center justify-center border-t-4 border-albanylightpurp p-8 "
    >
      <div></div>
      <footer className=" ">
        <div className=" max-w-m bg-transparent flex min-w-min flex-wrap content-center justify-center ">
          <div
            className="color-gray left-0 m-4 min-w-min max-w-xs border-spacing-4 
        border border-solid border-albanylightpurp
         p-6 text-left text-albanyyellow"
          >
            <h3 className="underline">Powered by</h3>{" "}
            <p className="text-xs text-nextlightblueish">{addonList}</p>
          </div>
        </div>
        <p className="relative"></p>
      </footer>
    </div>
  </div>
);

export default Index;
