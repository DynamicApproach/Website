import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const usePlayerMovement = (camera: THREE.Camera, scene: THREE.Scene) => {
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });

  const raycaster = new THREE.Raycaster();

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
    }
  };

  const intersectedObject = useRef<THREE.Object3D | null>(null);
  const objectOffset = useRef(new THREE.Vector3());
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let object = intersects[0].object;

        // Find the root object (model)
        while (object.parent && object.parent.type !== "Scene") {
          object = object.parent;
        }

        intersectedObject.current = object;
        objectOffset.current = new THREE.Vector3().subVectors(
          object.position,
          camera.position
        );
      }
    };

    const handleMouseUp = () => {
      intersectedObject.current = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (intersectedObject.current) {
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const newPosition = new THREE.Vector3();
        raycaster.ray.at(
          objectOffset.current.length() / raycaster.ray.direction.length(),
          newPosition
        );

        intersectedObject.current.position.copy(newPosition);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
      }
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

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      const xDiff = touch.clientX - touch.clientX;
      const yDiff = touch.clientY - touch.clientY;
      const threshold = 10;
      setMoveState((prevState) => ({
        ...prevState,
        forward: yDiff > threshold || prevState.forward,
        backward: yDiff < -threshold || prevState.backward,
        left: xDiff < -threshold || prevState.left,
        right: xDiff > threshold || prevState.right
      }));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTouchEnd = (event: TouchEvent) => {
      setMoveState((prevState) => ({
        ...prevState,
        forward: false,
        backward: false,
        left: false,
        right: false
      }));
    };

    window.addEventListener(
      "touchmove",
      handleTouchMove as EventListenerOrEventListenerObject
    );
    window.addEventListener(
      "touchend",
      handleTouchEnd as EventListenerOrEventListenerObject
    );

    return () => {
      window.removeEventListener(
        "touchmove",
        handleTouchMove as EventListenerOrEventListenerObject
      );
      window.removeEventListener(
        "touchend",
        handleTouchEnd as EventListenerOrEventListenerObject
      );

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    const speed = boostState ? 20 : 5;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction); // Ground check
    raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.intersectObjects(scene.children, true);
    const isOnGround =
      intersects.length > 0 && camera.position.y <= intersects[0].point.y + 2;

    // Update position based on moveState
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

    // Jump logic
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
      if (isOnGround) {
        camera.position.y = intersects[0].point.y + 2;
        setVelocity(0);
      } else {
        setVelocity((prevVelocity) => prevVelocity - 9.8 * delta);
        camera.position.y += velocity * delta;
      }
    }
  });
  return moveState;
};
