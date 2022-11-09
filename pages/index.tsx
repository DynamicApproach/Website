import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "pages/components/Nav";
import arrowr from "pages/images/arrowr.png";
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
  <div className="light:bg-white mix-h-full h-screen max-h-full bg-backgray ">
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>

    <main className="bg-backgray">
      <div className="gap-4 pl-20 pb-3 align-middle">
        <p></p>
        <h2
          className="col-span-2 items-center justify-center gap-4 border border-t-albanyyellow 
        bg-albanypurp pr-4 text-center align-middle text-2xl text-albanyyellow"
        >
          Thomas Lloyd-Jones
          <p className="pr-10 text-sm">Personal portfolio and website.</p>
        </h2>
      </div>
      <div className="grid grid-cols-3 ">
        <p></p>
        <div className=" align-between pl-20 pb-3 align-middle">
          <p className=" text-nextlightblueish">
            My favourite things are coding, networking and playing video games.
            While currently studying as a senior at SUNY at Albany, I am also
            working on my portfolio. I am a software engineer with a passion for
            learning and building things.
          </p>
        </div>
      </div>
      <div className="grid h-auto grid-cols-5 border-solid border-albanylightpurp pl-5">
        <div className="col-span-2">
          <p className={styles.descriptiondoubleb}>
            Before persuing my love of code, I have previously worked as a
            cosmetologist. I have a passion for creating and maintaining beauty
            in all of its forms.
          </p>
        </div>
        <p className="align-between pl-23 self-center pb-3 align-middle ">
          <Image src={arrowr} width={70} height={75}></Image>
          <p className="text-white text-opacity-20">
            Always learning more and doing cool projects!
          </p>
        </p>
        <div className="col-span-2">
          <p className={styles.descriptiondoubleb}>
            Now, I am almost finished with my Bachelors of Science in Computer
            Science, I&apos;m planning to graduate in December 2023.{" "}
          </p>
        </div>
      </div>
    </main>

    <div
      className="relative  grid grid-cols-3 
    content-center justify-center border-t-4 border-albanylightpurp bg-backgray p-8 "
    >
      <div></div>
      <footer className=" ">
        <div className=" max-w-m flex min-w-min flex-wrap content-center justify-center bg-backgray ">
          <div
            className="color-gray left-0 m-4 min-w-min max-w-xs border-spacing-4 
        border border-solid border-albanylightpurp
         p-6 text-left text-albanylightpurp"
          >
            <h3 className="underline">Powered by</h3>{" "}
            <p className="text-nextlightblueish">{addonList}</p>
          </div>
        </div>
        <p className="relative"></p>
      </footer>
    </div>
  </div>
);

export default Index;
