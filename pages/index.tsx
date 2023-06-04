import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Nav from "components/Nav";
import mainimg from "pages/images/main.png";
import styles from "styles/index.module.css";
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
  "Artificial Intelligence, Capstone Project and Computer Communications and Networks. "
];
const internship = [
  "an internship at NYS ITS ",
  "doing Drupal development. ",
  ""
];

const Index: NextPage = () => (
  <div
    className=" min-w-screen bg-grad  min-h-screen bg-gradient-to-br
  from-backgray to-albanypurp bg-cover bg-scroll"
  >
    <Nav />
    <Head>
      <meta name="ThomasLJ" content="Thomas LJ Website" />
      <link rel="icon" href="/images/melongray.png" className="border" />
    </Head>

    <br></br>
    <br></br>

    <main className={styles.main}>
      <div className={styles.mainImage}>
        <h2 className="text-3xl text-white">
          Thomas Lloyd-Jones
          <p className="text-sm">Welcome to my personal website.</p>
          <div className="flex min-h-fit min-w-fit justify-end pr-2">
            <Image
              src={mainimg}
              alt="Tiny avatar that looks like a watermellon"
              width={75}
              height={75}
              className="rounded-full"
            />
          </div>
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
            Currently, I&apos;m about to start my final semester! During this,
            I&apos;m working at <br></br>
            <span className="text-albanyyellow">{internship}</span>
            <br></br>
            <br></br>
            <br></br>
            My final classes will be: <br></br>
            <br></br>
            <span className="text-albanyyellow">{schoolprojects}</span>
          </p>
          <p className=" pr-4 text-nextlightblueish">
            I am almost finished with my Bachelors of Science in{" "}
            <span className=" text-albanyyellow">Computer Science</span>, with a
            planned graduation date of{" "}
            <span className="text-albanyyellow">December 2023</span>!<br></br>
            <br></br>
            In my spare time, I tend to create new things, and I am currently
            working on a new project, and this website. <br></br>
          </p>
        </div>
        <p className="pl-4 pr-4 pt-14 text-nextlightblueish">
          Take a look at my Github to get an idea of what my current projects
          are.
        </p>
      </div>
    </main>
    <br></br>
    <div
      className="bg-transparent  relative  grid grid-cols-3 
    content-center justify-center border-t-4 border-albanylightpurp p-8 "
    >
      <div></div>
      <footer className=" ">
        <div className={styles.footer}>
          <div className={styles.footerPowered}>
            <h3 className=" underline">Powered by</h3>{" "}
            <p className="text-nextlightblueish">{addonList}</p>
          </div>
        </div>
        <p className="relative"></p>
      </footer>
    </div>
  </div>
);

export default Index;
