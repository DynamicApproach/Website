// Player.tsx
import * as React from "react";
import * as THREE from "three";
import { useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

const Player = () => {
  const { camera } = useThree();
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      setMoveState((prevState) => ({
        ...prevState,
        forward:
          event.code === "KeyW" ||
          event.code === "ArrowUp" ||
          prevState.forward,
        backward:
          event.code === "KeyS" ||
          event.code === "ArrowDown" ||
          prevState.backward,
        left:
          event.code === "KeyA" || event.code === "ArrowLeft" || prevState.left,
        right:
          event.code === "KeyD" ||
          event.code === "ArrowRight" ||
          prevState.right
      }));
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
      setMoveState((prevState) => ({
        ...prevState,
        forward:
          event.code === "KeyW" || event.code === "ArrowUp"
            ? false
            : prevState.forward,
        backward:
          event.code === "KeyS" || event.code === "ArrowDown"
            ? false
            : prevState.backward,
        left:
          event.code === "KeyA" || event.code === "ArrowLeft"
            ? false
            : prevState.left,
        right:
          event.code === "KeyD" || event.code === "ArrowRight"
            ? false
            : prevState.right
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const speed = 5;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    if (moveState.forward) {
      camera.position.addScaledVector(direction, speed * delta);
    }
    if (moveState.backward) {
      camera.position.addScaledVector(direction, -speed * delta);
    }
    if (moveState.left) {
      camera.position.addScaledVector(
        direction.cross(camera.up).normalize(),
        -speed * delta
      );
    }
    if (moveState.right) {
      camera.position.addScaledVector(
        direction.cross(camera.up).normalize(),
        speed * delta
      );
    }
  });

  return <PointerLockControls />;
};

export default Player;
