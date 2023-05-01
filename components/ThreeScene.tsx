import * as React from "react";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Plane, Box } from "@react-three/drei";
import Player from "./Player";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Windmill from "./windmill";

const ShibaModel = () => {
  const gltf = useLoader(GLTFLoader, "/shiba/scene.gltf");
  console.log(gltf);
  return React.createElement("primitive", {
    object: gltf.scene,
    scale: [5, 5, 5],
    position: [0, 0, -10]
  });
};

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
          Use arrow keys to move around, and mouse to look around. You can fly
          by pressing spacebar. Go down with C. Esc to exit.
        </div>
      )}
      <div className="h-screen w-screen">
        <Canvas camera={{ position: [0, 1.5, 15] }}>
          <Player />
          <ambientLight />
          <Sky sunPosition={[100, 20, 100]} />
          <spotLight position={[10, 10, 10]} />
          <pointLight castShadow position={[100, 100, 100]} />
          <ambientLight />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Plane
            args={[100, 100]}
            rotation={[-Math.PI / 2, 0, 0]}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Box
            position={[-6.2, 0, 0]}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Box
            position={[6.2, 0, 0]}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Windmill position={[-10, 0, -10]} />
          <ShibaModel />
        </Canvas>
      </div>
    </>
  );
};

export default ThreeScene;
