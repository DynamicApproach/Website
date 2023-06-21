import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import Player from "./Player";
import Resume from "./Resume";
import { PerspectiveCamera, OrthographicCamera } from "three";
import WorldPhysics from "./worldphysics";
import Cathedral from "./Cathedral";
import ShibaModel from "./Shiba";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ThreeCardComponent from "pages/infoPages/threedprint/card";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = [
  { img: "public/images/benchy.jpg", content: "This is card 1" },
  { img: "public/images/benchy.jpg", content: "Testing Rotation" }
];

const ThreeScene = () => {
  const [cursorRef] = useState(null);
  const [, setCursorPos] = useState({
    x: 0,
    y: 0
  });
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(false);
    }, 10000);
  }, []);

  useEffect(() => {
    const handlePointerLockChange = () => {
      if (cursorRef) {
        const { x, y } = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        };
        setCursorPos({
          x,
          y
        });
      }
    };

    window.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      window.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, []);

  const [camera, setCamera] = useState<PerspectiveCamera | null>(null);
  const onCreated = useCallback(
    (obj: { camera: PerspectiveCamera | OrthographicCamera | null }) => {
      if (obj.camera instanceof PerspectiveCamera) {
        setCamera(obj.camera);
      }
    },
    []
  );
  return (
    <>
      {showBanner && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "5%",
            backgroundColor: "#991ea446",
            color: "#fff",
            textAlign: "center",
            fontSize: "20px",
            zIndex: 9999
          }}
        >
          Use arrow keys to move around, and mouse to look around. You can jump
          by pressing spacebar. Go down with C. Esc to exit. You can drag things
          around from where the colored circle is pointed.
        </div>
      )}
      <div className="h-screen w-screen">
        <Canvas camera={{ position: [0, 1.5, 15] }} onCreated={onCreated}>
          <Player />
          <ambientLight />
          <Sky sunPosition={[100, 20, 100]} />
          <pointLight castShadow position={[100, 100, 100]} />
          {/*          <ThreeCardComponent data={data} />
           */}{" "}
          <ambientLight />
          <WorldPhysics receiveShadow />
          <ShibaModel />
          <Cathedral />
          {camera && <Resume camera={camera} />}
        </Canvas>
      </div>
    </>
  );
};

export default ThreeScene;
