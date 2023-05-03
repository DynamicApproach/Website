/* eslint-disable react/no-unknown-property */
import React, { RefObject } from "react";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { Mesh } from "three";

export function Sphere() {
  const [ref] = useSphere(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh ref={ref as RefObject<Mesh>} castShadow receiveShadow>
      <sphereBufferGeometry args={[0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

interface GroundProps {
  receiveShadow?: boolean;
}

export const Ground: React.FC<GroundProps> = ({ receiveShadow = false }) => {
  const [ref] = useBox(() => ({
    mass: 0,
    position: [0, -0.5, 0],
    args: [1000, 1, 1000]
  }));
  return (
    <mesh ref={ref as RefObject<Mesh>} receiveShadow={receiveShadow}>
      <boxBufferGeometry args={[1000, 1, 1000]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

interface WorldPhysicsProps {
  receiveShadow?: boolean;
}

const WorldPhysics: React.FC<WorldPhysicsProps> = ({
  receiveShadow = false
}) => {
  return (
    <Physics>
      <Sphere />
      <Ground receiveShadow={receiveShadow} />
    </Physics>
  );
};

export default WorldPhysics;
