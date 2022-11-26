import { FC, useEffect, useRef } from "react";

const Cursor: FC = () => {
  const isFirstMove = useRef(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  const originalMouse = useRef({
    x: 0,
    y: 0
  });
  const mouseShown = useRef({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", (e) => {
      if (cursorRef.current) {
        if (isFirstMove.current) {
          cursorRef.current.style.display = "block";
          mouseShown.current.x = e.clientX;
          mouseShown.current.y = e.clientY;
          isFirstMove.current = false;
        }

        originalMouse.current.x = e.clientX;
        originalMouse.current.y = e.clientY;
      }
    });

    const updateMouse = () => {
      requestAnimationFrame(updateMouse);
      mouseShown.current.x +=
        (originalMouse.current.x - mouseShown.current.x) * 0.1;
      mouseShown.current.y +=
        (originalMouse.current.y - mouseShown.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseShown.current.x}px`;
        cursorRef.current.style.top = `${mouseShown.current.y}px`;
      }
    };
    updateMouse();
  }, []);

  return (
    <div
      ref={cursorRef}
      className=" duration-25 z-60 pointer-events-none fixed hidden h-4 w-4
      -translate-x-1/2 -translate-y-1/2 cursor-none  rounded-full border border-y-pink border-x-blue transition"
    ></div>
  );
};

export default Cursor;
