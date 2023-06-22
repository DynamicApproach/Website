import Nav from "components/Nav";
import styles from "styles/Projects.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
export const projects = () => {
  return (
    <div
      className="min-w-screen bg-grad  min-h-screen bg-gradient-to-br
    from-backgray to-albanypurp bg-cover bg-scroll"
    >
      <Head>
        <title>🎆DynamicApproach-Projects</title>
      </Head>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>Recent Projects</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/Website">
              <h2>Upcoming Project...&rarr;</h2>
            </Link>
            <p>A suprise secret! Just links to this sites repo for now. </p>
          </div>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/Shank-Project-311">
              <h2>Shank Programming Language &rarr;</h2>
            </Link>
            <p>A programming language made in Java.</p>
            <Image
              src="/images/graphfordayz.png"
              width={200}
              height={200}
              alt={"UML Diagram of Shank"}
            />
          </div>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/SchoolThings/blob/main/calcmain.asm">
              <h2>MIPS Calc &rarr;</h2>
            </Link>
            <p>
              Created a calculator using a binary tree in MIPS Assembly to find
              the result, prefix, and the postfix of a parenthesized expression
            </p>
          </div>
          <div
            className={styles.card} // eslint-disable-next-line max-len
          >
            <Link href="https://marketplace.visualstudio.com/items?itemName=DynamicApproach.purple-night-tlj&ssr=true">
              <h2>Custom VS Code Theme &rarr;</h2>
            </Link>
            <p>
              A customized version of the Dark+ and Monokai Pro themes. It
              features a beautiful dark purple color palette that is easy on the
              eyes, with bright yellow effects for noticeable changes.
            </p>
            <Image
              src="/images/code.png"
              width={250}
              height={250}
              alt={"VS code themes"}
            />
          </div>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/dotfiles">
              <h2>Dotfiles &rarr;</h2>
            </Link>
            <p>
              My custom dotfiles for my Linux, Mac and Windows/WSL. Includes my
              custom zsh theme, aliases, Starship prompt and more.
            </p>
            <Image
              src="/images/powershell.png"
              width={250}
              height={250}
              alt={"Powershell theme"}
            />
          </div>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/Google-Takeout-Parser">
              <h2>Explore Your Google Location History &rarr;</h2>
            </Link>
            <p>
              A Python script that parses your Google Location History and plots
              it for you!
            </p>
          </div>
          <a
            href="https://github.com/DynamicApproach/AllCode"
            className={styles.card}
          >
            <h2>Random Code &rarr;</h2>
            <p>
              A large list of random code snippets I&apos;ve written for various
              projects. Not organized, but it&apos;s here.
            </p>
          </a>
          <div className={styles.card}>
            <Link href="https://github.com/DynamicApproach/DiscordPager">
              <h2>Discord Pager &rarr;</h2>
            </Link>
            <p>
              Program that listens for specific messages with a leading tag via
              Discord API and relayed those messages by serial to a scrolling
              LCD attached to an Arduino Nano.
            </p>
            <Image
              src="/images/first.jpg"
              width={150}
              height={150}
              alt={"Image of a 3D Printed Rook"}
            />
          </div>
          <div className={styles.card}>
            <p>
              {" "}
              My tower of PI! 36GB of ram in total. Typically running in a K3S
              cluster
            </p>
            <Image
              src="/images/pitower.jpg"
              width={150}
              height={150}
              alt={"Image of a 3D Printed Rook"}
            />
          </div>{" "}
          <Link className={styles.cardnoborder} href="/">
            <h2 className="float-right text-nextgreen">Back&rarr;</h2>
          </Link>
        </div>
      </main>
    </div>
  );
};
export default projects;
