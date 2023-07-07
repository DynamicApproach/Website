import * as React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Cathedral = () => {
  const gltf = useLoader(GLTFLoader, "/house/scene.gltf", () => GLTFLoader);
  console.log(gltf);
  return React.createElement("primitive", {
    object: gltf.scene,
    scale: [25, 25, 25],
    _position: [0, 5, -20],
    get position() {
      return this._position;
    },
    set position(value) {
      this._position = value;
    }
  });
};

export default Cathedral;
