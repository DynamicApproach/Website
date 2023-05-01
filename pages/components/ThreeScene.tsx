// ThreeScene.tsx
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Plane, GLTFLoader } from "@react-three/drei";
import Box from "pages/components/box.tsx";
import Player from "./Player"; // Import the Player component
import Windmill from "./Windmill"; // Import the Windmill component

const ThreeScene = () => {
  const [cursorRef, setCursorRef] = useState(null);
  const [cursorPos, setCursorPos] = useState({
    x: 0,
    y: 0
  });

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
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <Player />
        <ambientLight />
        <Sky sunPosition={[100, 20, 100]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Box position={[-6.2, 0, 0]} />
        <Box position={[6.2, 0, 0]} />

        <Plane
          args={[100, 100]}
          position={[0, -0.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Windmill position={[0, 1, -10]} scale={[0.5, 0.5, 0.5]} />
      </Canvas>
      <div
        ref={(ref) => setCursorRef(ref)}
        style={{
          width: "10px",
          height: "10px",
          border: "1px solid red",
          position: "absolute",
          top: cursorPos.y,
          left: cursorPos.x,
          pointerEvents: "none"
        }}
      />
    </div>
  );
};

export default ThreeScene;
