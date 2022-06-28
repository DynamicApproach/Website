import Link from "next/link";
//import Image from "next/image";
export const Nav = () => {
  return (
    <div
      className=" sticky top-0 float-right m-2 flex
     justify-end bg-backgray p-6"
    >
      <nav className="sticky border-spacing-80 ">
        <div className=" inline-block min-w-full  flex-wrap items-center bg-backgray ">
          <div className=" content-center justify-center align-middle text-sm ">
            <Link href="/Projects">
              <p
                className="border-indigo-500  m-2 cursor-pointer  rounded-full
               border-2 text-center align-middle text-nextblue hover:border-nextblue hover:text-white"
              >
                Projects
              </p>
            </Link>
            <Link href="/printing">
              <p
                className="border-indigo-500   m-2 cursor-pointer rounded-full  border-2
               text-center align-middle text-nextblue hover:border-nextblue hover:text-white"
              >
                3D Printing
              </p>
            </Link>
            <Link href="/print">
              <p
                className="border-indigo-500   m-2  cursor-pointer rounded-full  border-2
               text-center align-middle text-nextblue hover:border-nextblue hover:text-white"
              >
                ThreeJS
              </p>
            </Link>
            <Link href="https://github.com/DynamicApproach/" target={"_blank"}>
              <p
                className="border-indigo-500   m-2  cursor-pointer rounded-full  border-2
               text-center align-middle text-nextblue hover:border-nextblue hover:text-white"
              >
                GitHub
              </p>
            </Link>
          </div>
          <Link href="/">
            <p
              className="border-indigo-500  m-2  cursor-pointer rounded-full  border-2
               text-center align-middle text-nextblue hover:border-nextblue hover:text-white"
            >
              Home
            </p>
          </Link>
          <div className="cursor-pointer space-x-1 pl-4">
            <Link href="mailto: tlloyd-jones@albany.edu">
              <p
                className=" hover:border-transparent hover:text-black m-2 mt-4
               inline-block rounded  border  border-white px-4 py-2 text-sm leading-none
                text-white hover:bg-nextblue lg:mt-0"
              >
                Email Me &rarr;
              </p>
            </Link>
            <a>
              <p
                className="  hover:border-transparent  hover:text-black m-2 mt-4 inline-block 
              rounded border border-white px-4 py-2 pl-4 text-sm leading-none text-white hover:bg-nextblue lg:mt-0"
              >
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
