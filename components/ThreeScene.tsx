import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import Player from "./ThreeScene/Player";
import { PerspectiveCamera } from "three";
import Cathedral from "./ThreeScene/Cathedral";
import ShibaModel from "./ThreeScene/Shiba";
import ThreeCardComponent from "./ThreeScene/card";
import Ground from "./ThreeScene/Ground";
const data = [
  { img: "public/images/benchy.jpg", content: "This is card 1" },
  { img: "public/images/benchy.jpg", content: "Testing Rotation" }
];

const ThreeScene = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [, setCamera] = useState<PerspectiveCamera | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(false);
    }, 10000);
  }, []);

  const onCreated = useCallback((obj: { camera: PerspectiveCamera }) => {
    setCamera(obj.camera);
  }, []);

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
          <ambientLight castShadow />
          <Sky
            distance={450000}
            sunPosition={[10, 10, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <pointLight castShadow position={[100, 100, 100]} />
          <ThreeCardComponent data={data} />
          <ambientLight />
          <ShibaModel />
          <Cathedral />
          <Ground />
        </Canvas>
      </div>
    </>
  );
};

export default ThreeScene;
