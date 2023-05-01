import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import React from "react";
import { usePlayerMovement } from "../hooks/usePlayerMovement"; // Import the custom hook

const Player = () => {
  const { camera } = useThree();

  usePlayerMovement(camera); // Pass the camera as an argument

  return <PointerLockControls />;
};

export default Player;
