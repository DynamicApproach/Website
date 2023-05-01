/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshProps } from "@react-three/fiber";
import { Mesh } from "three";

const Box = (props: MeshProps) => {
  const mesh = useRef<Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={mesh} castShadow receiveShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  );
};

export default Box;
