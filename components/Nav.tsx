/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
//import Image from "next/image";
import { useState } from "react";
import Cursor from "./customCursor";
import tw from "tailwind-styled-components";

const TailwindExitButton = tw.div`hover:border-transparent hover:text-black m-2 mt-4
inline-block  rounded-tl-lg rounded-bl-lg  border space-y-7  border-white px-4 py-2 text-sm leading-none
 text-white hover:bg-nextblue lg:mt-0`;

export const Nav = () => {
  const [active, setActive] = useState(false);

  const clickOnNav = () => {
    setActive(!active);
  };
  return (
    <nav className="bg-green-400 flex min-w-fit max-w-none flex-wrap items-center p-3">
      <a href="https://github.com/DynamicApproach">
        <img
          src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=DynamicApproach"
          alt="Typing SVG"
        />
      </a>
      <button
        className="hover:bg-green-600 ml-auto 
        inline-flex rounded p-3 text-white outline-none hover:text-white lg:hidden"
        onClick={clickOnNav}
        title="Toggle navigation menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`${
          active ? "" : "hidden"
        }   w-full lg:inline-flex lg:w-auto lg:flex-grow  `}
      >
        <div
          className="bg-indigo-600 sticky top-0 z-10 col-[1/-1] row-[1] flex min-h-[4rem] items-center justify-center 
        lg:ml-auto lg:inline-flex  lg:h-auto lg:w-auto lg:flex-row lg:items-center"
        >
          <Cursor />
          <div>
            <Link href="/" scroll={false}>
              <TailwindExitButton>Home</TailwindExitButton>
            </Link>
            <Link href="/infoPages/threejss">
              <TailwindExitButton>Threejs</TailwindExitButton>
            </Link>
            <Link href="/infoPages/Projects" scroll={false}>
              <TailwindExitButton>Projects</TailwindExitButton>
            </Link>
            <Link href="/infoPages/threedprinting" scroll={false}>
              <TailwindExitButton>3D Printing</TailwindExitButton>
            </Link>
            {/*<Link href="/infoPages/testpage">
                <TailwindExitButton>testpg</TailwindExitButton>
              </Link>*/}
            <Link href="https://github.com/DynamicApproach/" scroll={false}>
              <TailwindExitButton>GitHub</TailwindExitButton>
            </Link>
            <Link href="mailto: tlloyd-jones@albany.edu" scroll={false}>
              <TailwindExitButton>Email Me &rarr;</TailwindExitButton>
            </Link>
            {/*<TailwindExitButton>Resume &rarr;</TailwindExitButton>*/}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
