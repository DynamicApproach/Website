import Link from "next/link";
//import Image from "next/image";

import styled from "styled-components";
import tw from "tailwind-styled-components";
const TailWindNav = tw.nav`flex justify-center sticky top-0 float-right m-2 bg-backgray p-6"`;
const TailwindButton = tw.button`border-indigo-500  m-15 cursor-pointer  border-spacing-80 rounded-full
border-2 text-center align-middle text-nextblue hover:border-nextblue hover:text-white`;
const TailWindMenuBlock = tw.div`content-center justify-center align-middle text-sm `;
const TailWindMenu = tw.div`inline-block min-w-full  flex-wrap items-center bg-backgray`;
const TailWindMenuBG = tw.div`sticky border-spacing-80`;
const TailwindExitButton = tw.div`hover:border-transparent hover:text-black m-2 mt-4
inline-block rounded  border  border-white px-4 py-2 text-sm leading-none
 text-white hover:bg-nextblue lg:mt-0`;

export const Nav = () => {
  return (
    <TailWindNav>
      <TailWindMenuBG>
        <TailWindMenu>
          <TailWindMenuBlock>
            <Link href="/Projects">
              <TailwindButton>Projects</TailwindButton>
            </Link>
            <Link href="/printing">
              <TailwindButton>Projects</TailwindButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="/print">
              <TailwindButton>Threejs</TailwindButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="https://github.com/DynamicApproach/" target={"_blank"}>
              <TailwindButton>GitHub</TailwindButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="/">
              <TailwindButton>Home</TailwindButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="mailto: tlloyd-jones@albany.edu">
              <TailwindExitButton>Email Me &rarr;</TailwindExitButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <TailwindExitButton>Resume &rarr;</TailwindExitButton>
          </TailWindMenuBlock>
        </TailWindMenu>
      </TailWindMenuBG>
    </TailWindNav>
  );
};
export default Nav;
