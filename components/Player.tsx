import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import React from "react";
import { usePlayerMovement } from "../hooks/usePlayerMovement"; // Import the custom hook

const Player = () => {
  const { camera, scene } = useThree();

  usePlayerMovement(camera, scene);
  return <PointerLockControls />;
};

export default Player;
