import React, { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshProps } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Mesh } from "three";

interface CardProps extends MeshProps {
  position: [number, number, number];
  img: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ position, content }) => {
  const mesh = useRef<Mesh | null>(null);

  useFrame(() => {
    if (mesh && mesh.current?.rotation) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <Html position={[0, 0, 0.5]}>
        <div>{content}</div>
      </Html>
    </mesh>
  );
};

interface DataItem {
  img: string;
  content: string;
}

interface ThreeCardComponentProps {
  data: DataItem[];
}

const ThreeCardComponent: React.FC<ThreeCardComponentProps> = ({ data }) => {
  const positions = useMemo(() => {
    const tempPositions: [number, number, number][] = [];

    for (let i = 0; i < data.length; i++) {
      const xPos = (i % 5) * 2;
      const yPos = Math.floor(i / 5) * 2;
      tempPositions.push([xPos, yPos, 0]);
    }

    return tempPositions;
  }, [data.length]);
  return (
    <>
      <Suspense fallback={null}>
        {data.map((card, i) => (
          <Card
            key={i}
            position={positions[i]}
            img={card.img}
            content={card.content}
          />
        ))}
      </Suspense>
    </>
  );
};

export default ThreeCardComponent;
