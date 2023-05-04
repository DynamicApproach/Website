import * as React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ShibaModel = () => {
  const gltf = useLoader(GLTFLoader, "/shiba/scene.gltf", () => GLTFLoader);

  return React.createElement("primitive", {
    object: gltf.scene,
    scale: [1, 1, 1],
    _position: [1, 1.4, -20],
    get position() {
      return this._position;
    },
    set position(value) {
      this._position = value;
    }
  });
};

export default ShibaModel;
