/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const ThreeScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default ThreeScene;
