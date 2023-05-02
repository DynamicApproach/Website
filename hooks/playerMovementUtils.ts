// playerMovementUtils.ts
import * as THREE from "three";

export const handleBoost = (
  jumpState: boolean,
  setBoostState: (value: boolean) => void
) => {
  if (!jumpState) {
    setBoostState(true);
  }
};

export const handleJump = (
  jumpState: boolean,
  setJumpState: (value: boolean) => void,
  setJumpStart: (value: number) => void,
  camera: THREE.Camera
) => {
  if (!jumpState) {
    setJumpState(true);
    setJumpStart(camera.position.y);
  }
};
