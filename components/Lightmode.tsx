//import Image from "next/image";

export const Lightmode = () => {
  return (
    <div className="dark:bg-slate-800 ring-slate-900/5 rounded-lg px-1 py-2 shadow-xl ring-1">
      <div>
        <span className="bg-indigo-500 inline-flex items-center justify-center rounded-md p-2 shadow-lg"></span>
      </div>

      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Swap </p>
    </div>
  );
};
export default Lightmode;
