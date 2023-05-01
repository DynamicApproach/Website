/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  /* nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  }; */
};

interface GLTFModelProps {
  url: string;
  scale?: number | [number, number, number];
  // position?: [number, number, number];
}

const GLTFModel: React.FC<GLTFModelProps> = ({
  url,
  scale = 1
  // position = [0, 0, 0]
}) => {
  // const { nodes, materials } = useGLTF(url) as GLTFResult;

  return (
    <group scale={scale} position={(0, 0, 0)}>
      {/* Add your model's structure here, referring to nodes and materials */}
    </group>
  );
};

export default GLTFModel;
