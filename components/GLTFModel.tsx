import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTFWithDraco } from "hooks/useGLTFWithDraco";
import { useThree } from "@react-three/fiber";

type GLTFModelProps = {
  url: string;
  textureUrl?: string;
  excludeFromRaycast?: boolean;
  scale?: number | [number, number, number];
};

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

const GLTFModel: React.FC<GLTFModelProps> = ({
  url,
  scale = 1,
  excludeFromRaycast
}) => {
  const gltf = useGLTFWithDraco(url) as GLTFResult;
  const { scene } = useThree();
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (modelRef.current) {
      const model = modelRef.current;

      // Clone the GLTF scene and add it as a child
      const clonedScene = gltf.scene.clone();
      model.add(clonedScene);

      if (excludeFromRaycast) {
        const excludedLayer = new THREE.Layers();
        excludedLayer.set(1); // Use layer 1 for objects that should be excluded from raycasts

        model.traverse((object) => {
          object.layers.enable(excludedLayer.mask);
        });
      }

      // Set the scale of the model
      if (Array.isArray(scale)) {
        model.scale.set(...scale);
      } else {
        model.scale.set(scale, scale, scale);
      }

      // Add the model to the scene
      scene.add(model);
    }
  }, [excludeFromRaycast, modelRef, scene, scale, gltf.scene]);

  if (excludeFromRaycast) {
    return null;
  }

  return <group ref={modelRef} />;
};

export default GLTFModel;
