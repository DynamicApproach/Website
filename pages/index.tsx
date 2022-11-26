import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Nav from "pages/components/Nav";
import { Lightmode } from "pages/components/Lightmode";

import compsetup from "pages/images/compsetup.png";
import mainimg from "pages/images/main.png";

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
  "Data analysis, ",
  "and data visualization ",
  " for a local company to gather sales data and visualize it in a way that is easy to understand. "
];

const Index: NextPage = () => (
  <div
    className="light:bg-white 
    min-h-screen bg-backgray bg-gradient-to-r from-backgray
   to-albanypurp bg-cover bg-scroll "
  >
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>

    <br></br>
    <br></br>
    <main className="bg-transparent light:text-black grid  min-w-fit content-center justify-center">
      <div className="grid min-w-fit grid-cols-4 ">
        <div className="flex min-h-fit min-w-fit justify-end pr-2">
          <Image
            src={mainimg}
            alt="Tiny avatar that looks like a watermellon"
            width={75}
            height={75}
            className="rounded-full"
          />
        </div>
        <h2 className=" col-span-3 min-w-fit content-center text-2xl text-albanyyellow">
          Thomas Lloyd-Jones
          {/* Add circulr image  */}
          <p className="text-sm">Welcome to my personal website.</p>
        </h2>
      </div>
      <br></br>
      <div className="h-screen place-items-center content-center justify-center ">
        <div
          className=" min-h-fit w-auto  content-center justify-center
       border-solid border-albanylightpurp pl-5 pt-8 align-middle"
        >
          <div className="">
            <p className=" pr-4 text-nextlightblueish">
              My favourite things are coding, networking and playing video
              games. While currently studying Computer Science at SUNY at
              Albany, I am also working on my skills, website and side projects.
              <p className=" pr-4 text-nextlightblueish">
                This is one of a few side projects currently under construction.
              </p>
            </p>
            <Image
              src={compsetup}
              alt="Picture of computer setup"
              width={600}
              height={800}
            />
          </div>

          <p className=" pr-4 text-nextlightblueish">
            Currently, I&apos;m working on: <br></br>
            {internship}
            <br></br>
            <br></br>
            Mean while, at school I&apos;m working on: <br></br>
            {schoolprojects}
          </p>
          <p className=" pr-4 text-nextlightblueish">
            I am almost finished with my Bachelors of Science in Computer
            Science, with a planned graduation date of December 2023.
            <br></br>
            <br></br>
            In my spare time, I tend to create new things, and I am currently
            working on a new project, and this website. <br></br>
          </p>
        </div>
      </div>
    </main>
    <br></br>
    <div
      className="bg-transparent  relative  grid grid-cols-3 
    content-center justify-center border-t-4 border-albanylightpurp p-8 "
    >
      <div></div>
      <footer className=" ">
        <div className=" max-w-m bg-transparent flex min-w-min  flex-wrap content-center justify-center  ">
          <div
            className="color-gray left-0 m-4 min-w-min max-w-xs  border-spacing-4 border 
        border-solid border-albanylightpurp 
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
