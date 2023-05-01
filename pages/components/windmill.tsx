// Windmill.tsx
import * as React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder } from "@react-three/drei";

const Windmill = (props) => {
  const bladesRef = useRef();

  useFrame((state, delta) => {
    bladesRef.current.rotation.z += 0.01;
  });

  return (
    <group {...props}>
      <Cylinder args={[1, 1, 6, 12]} position={[0, 3, 0]} />
      <group ref={bladesRef} position={[0, 6, 0]}>
        <Box args={[0.2, 4, 0.2]} position={[-2, 0, 0]} />
        <Box args={[0.2, 4, 0.2]} position={[2, 0, 0]} />
        <Box
          args={[0.2, 4, 0.2]}
          position={[0, -2, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <Box
          args={[0.2, 4, 0.2]}
          position={[0, 2, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </group>
    </group>
  );
};

export default Windmill;
