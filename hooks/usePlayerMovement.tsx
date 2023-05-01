import { useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const usePlayerMovement = (camera: THREE.Camera) => {
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });

  const [boostState, setBoostState] = useState(false);
  const [jumpState, setJumpState] = useState(false);
  const [jumpStart, setJumpStart] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const handleBoost = () => {
    if (!jumpState) {
      setBoostState(true);
    }
  };

  const handleJump = () => {
    if (!jumpState) {
      setJumpState(true);
      setJumpStart(camera.position.y);
      setBoostState(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          prevState.right,
        jump: event.code === "Space" || prevState.jump
      }));

      if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        handleBoost();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
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
            : prevState.right,
        jump: event.code === "Space" ? false : prevState.jump
      }));

      if (
        event.code === "ShiftLeft" ||
        event.code === "ShiftRight" ||
        event.code === "Space"
      ) {
        setBoostState(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown as EventListener);
    window.addEventListener("keyup", handleKeyUp as EventListener);
    return () => {
      window.removeEventListener("keydown", handleKeyDown as EventListener);
      window.removeEventListener("keyup", handleKeyUp as EventListener);
    };
  }, []);

  useFrame((state, delta) => {
    const speed = boostState ? 20 : 5;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    if (moveState.jump && !jumpState) {
      handleJump();
    }

    if (jumpState) {
      const jumpTime = Date.now() - jumpStart;
      const jumpHeight = 4;
      const jumpDuration = 1000;
      const jumpProgress = (jumpTime / jumpDuration) * Math.PI;
      const jumpDelta = Math.sin(jumpProgress) * jumpHeight;

      const isFalling = velocity < 0 && camera.position.y <= jumpHeight;
      camera.position.y = jumpHeight + jumpDelta;
      if (isFalling) {
        setJumpState(false);
        setVelocity(0);
      } else {
        setVelocity((prevVelocity) => prevVelocity - 9.8 * delta);
        camera.position.y += velocity * delta;
      }
    } else {
      const isOnGround = camera.position.y <= 2;
      if (isOnGround) {
        camera.position.y = 2;
        setVelocity(0);
      } else {
        setVelocity((prevVelocity) => prevVelocity - 9.8 * delta);
        camera.position.y += velocity * delta;
      }
    }
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

  return moveState;
};
