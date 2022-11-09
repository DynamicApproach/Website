import Link from "next/link";
//import Image from "next/image";

import tw from "tailwind-styled-components";
const TailWindNav = tw.nav` justify-center sticky top-0 min-w-max float-right    bg-backgray p-6"`;
const TailwindButton = tw.button`border-indigo-500  cursor-pointer  rounded-full px-0.5 text-2xl
border-2 text-center border-spacing-96 align-middle text-nextblue hover:border-nextblue hover:text-white`;
const TailWindMenuBlock = tw.div`content-center flow-root border-spacing-6   space-y-6 
justify-center align-middle text-sm `;
const TailWindMenu = tw.div` bg-backgray flex-row justify-center align-middle`;
const TailWindMenuBG = tw.div`relative min-w-full`;
const TailwindExitButton = tw.div`hover:border-transparent hover:text-black m-2 mt-4
inline-block  rounded-tl-lg rounded-bl-lg  border space-y-7  border-white px-4 py-2 text-sm leading-none
 text-white hover:bg-nextblue lg:mt-0`;

export const Nav = () => {
  return (
    <TailWindNav>
      <TailWindMenuBG>
        <TailWindMenu>
          <TailWindMenuBlock>
            <Link href="/">
              <TailwindExitButton>Home</TailwindExitButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="/infoPages/Projects">
              <TailwindExitButton>Projects</TailwindExitButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="/infoPages/threedprinting">
              <TailwindExitButton>3D Printing</TailwindExitButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="/infoPages/print">
              <TailwindExitButton>Threejs</TailwindExitButton>
            </Link>
          </TailWindMenuBlock>
          <TailWindMenuBlock>
            <Link href="https://github.com/DynamicApproach/" target={"_blank"}>
              <TailwindExitButton>GitHub</TailwindExitButton>
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
