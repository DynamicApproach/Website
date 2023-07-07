import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const Ground = () => {
  const { scene } = useThree();
  const ref = useRef();

  useEffect(() => {
    const ground = ref.current;
    ground.receiveShadow = true;
    ground.material.color.set(0x00ff00);
    ground.position.y = -1;
    scene.add(ground);
  }, [scene]);

  return <Box ref={ref} args={[500, 1, 500]} />;
};

export default Ground;
