// ThreeScene.tsx
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Plane } from "@react-three/drei";
import GLTFModel from "./GLTFModel";
import Box from "pages/components/box.tsx";
import Player from "./Player"; // Import the Player component
import Windmill from "./Windmill"; // Import the Windmill component
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ShibaModel = () => {
  const gltf = useLoader(GLTFLoader, "/shiba/scene.gltf");
  console.log(gltf);
  return (
    <primitive object={gltf.scene} scale={[5, 5, 5]} position={[0, 0, -10]} />
  );
};

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
      <Canvas camera={{ position: [0, 1.5, 15] }}>
        <Player />
        <ambientLight />
        <Sky sunPosition={[100, 20, 100]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} />
        <Box position={[-6.2, 0, 0]} />
        <Box position={[6.2, 0, 0]} />
        <Windmill position={[-10, 0, -10]} />
        <ShibaModel />
      </Canvas>
      {/* ... (previous code) */}
    </div>
  );
};

export default ThreeScene;
