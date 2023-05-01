import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export const useWindmillRotation = () => {
  const bladesRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (bladesRef.current) {
      const deltaRotation = delta * 0.01;
      bladesRef.current.rotation.z += deltaRotation;
    }
  });

  return bladesRef;
};
