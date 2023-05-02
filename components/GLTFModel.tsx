/* eslint-disable react/no-unknown-property */
import React from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTFWithDraco } from "hooks/useGLTFWithDraco";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

interface GLTFModelProps {
  url: string;
  scale?: number | [number, number, number];
}

const GLTFModel: React.FC<GLTFModelProps> = ({ url, scale = 1 }) => {
  const scene = useGLTFWithDraco(url) as GLTFResult;

  return <primitive object={scene} scale={scale} />;
};

export default GLTFModel;
