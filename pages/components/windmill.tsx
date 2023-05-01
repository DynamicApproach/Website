// Windmill.tsx
import * as React from "react";
import { Box, Cylinder } from "@react-three/drei";
import { Vector3 } from "three";
import { useWindmillRotation } from "./files/useWindmillRotation"; // Import the custom hook

type WindmillProps = JSX.IntrinsicElements["group"];

const Windmill = (props: WindmillProps) => {
  const bladesRef = useWindmillRotation(); // Use the custom hook

  return (
    <group {...props}>
      <group position={[0, 3, 0]}>
        <Cylinder
          args={[1, 1, 6, 12]}
          getObjectsByProperty={undefined}
          getVertexPosition={undefined}
        />
        <group ref={bladesRef}>
          <Box
            args={[0.2, 4, 0.2]}
            position={new Vector3(-2, 0, 0)}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Box
            args={[0.2, 4, 0.2]}
            position={new Vector3(2, 0, 0)}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Box
            args={[0.2, 4, 0.2]}
            position={new Vector3(0, -2, 0)}
            rotation={[0, 0, Math.PI / 2]}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
          <Box
            args={[0.2, 4, 0.2]}
            position={new Vector3(0, 2, 0)}
            rotation={[0, 0, Math.PI / 2]}
            getObjectsByProperty={undefined}
            getVertexPosition={undefined}
          />
        </group>
      </group>
    </group>
  );
};

export default Windmill;
