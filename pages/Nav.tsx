import Link from "next/link";
import Image from "next/image";
export const Nav = () => {
  return (
    <div className="m-5 bg-backgray">
      <nav className="flex flex-wrap items-center justify-between overflow-x-auto bg-backgray p-2 text-blue ">
        <div className="inline-block w-auto flex-wrap lg:flex lg:w-auto lg:items-center">
          <div className="text-sm lg:flex-grow">
            <Link href="/Projects" target="_blank">
              <p className="mt-4 mr-4 block cursor-pointer font-sans text-nextblue hover:text-white lg:mt-0">
                Projects
              </p>
            </Link>{" "}
            <Link href="/printing">
              <p className="mt-4 mr-4 block cursor-pointer font-sans text-nextblue hover:text-white lg:mt-0">
                3D Printing
              </p>
            </Link>
            <Link href="/print">
              <p className="mt-4 mr-4 block cursor-pointer font-sans text-nextblue hover:text-white lg:mt-0">
                ThreeJS
              </p>
            </Link>
            <Link href="https://github.com/DynamicApproach/" target={"_blank"}>
              <p className="mt-4 mr-4 block cursor-pointer font-sans text-nextblue hover:text-white lg:mt-0">
                GitHub
              </p>
            </Link>
          </div>
          <Link href="/">
            <p className="mt-4 mr-4 block cursor-pointer font-sans text-nextblue hover:text-white lg:mt-0">
              Home
            </p>
          </Link>
          <div className="cursor-pointer space-x-1 pl-4">
            <Link href="mailto: tlloyd-jones@albany.edu">
              <p className=" hover:border-transparent hover:text-black mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:bg-nextblue lg:mt-0">
                Email Me &rarr;
              </p>
            </Link>
            <a>
              <p className=" hover:border-transparent hover:text-black mt-4 inline-block rounded border border-white px-4 py-2 pl-4 text-sm leading-none text-white hover:bg-nextblue lg:mt-0">
                Resume &rarr;
              </p>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
