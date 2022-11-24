import Link from "next/link";
//import Image from "next/image";

import tw from "tailwind-styled-components";
const TailWindNav = tw.nav` justify-center sticky top-0 min-w-max float-right    bg-transparent p-6`;
const TailWindMenuBlock = tw.div`content-center flow-root border-spacing-6   space-y-6 
justify-center align-middle text-sm `;
const TailwindExitButton = tw.div`hover:border-transparent hover:text-black m-2 mt-4
inline-block  rounded-tl-lg rounded-bl-lg  border space-y-7  border-white px-4 py-2 text-sm leading-none
 text-white hover:bg-nextblue lg:mt-0`;

export const Nav = () => {
  return (
    <TailWindNav>
      <TailWindMenuBlock>
        <Link href="/" target={"_blank"}>
          <TailwindExitButton>Home</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>
      <TailWindMenuBlock>
        <Link href="/infoPages/Projects" target={"_blank"}>
          <TailwindExitButton>Projects</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>
      <TailWindMenuBlock>
        <Link href="/infoPages/threedprinting" target={"_blank"}>
          <TailwindExitButton>3D Printing</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>
      <TailWindMenuBlock>
        <Link href="/infoPages/print" target={"_blank"}>
          <TailwindExitButton>Threejs</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>
      <TailWindMenuBlock>
        <Link href="https://github.com/DynamicApproach/" target={"_blank"}>
          <TailwindExitButton>GitHub</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>

      <TailWindMenuBlock>
        <Link href="mailto: tlloyd-jones@albany.edu" target={"_blank"}>
          <TailwindExitButton>Email Me &rarr;</TailwindExitButton>
        </Link>
      </TailWindMenuBlock>
      <TailWindMenuBlock>
        <TailwindExitButton>Resume &rarr;</TailwindExitButton>
      </TailWindMenuBlock>
    </TailWindNav>
  );
};
export default Nav;
