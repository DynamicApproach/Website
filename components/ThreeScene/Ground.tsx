import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";

const Ground = () => {
  const { scene } = useThree();
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const ground = ref.current;
    if (!ground) return;
    else if (!scene) return;
    else {
      ground.receiveShadow = true;
      ground.position.y = -1;
      scene.add(ground);
    }
  }, [scene]);

  return <Box ref={ref} args={[500, 1, 500]} />;
};

export default Ground;
