import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const createGLTFLoader = () => {
  const gltfLoader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  gltfLoader.setDRACOLoader(dracoLoader);

  return gltfLoader;
};

export function useGLTFWithDraco(path: string): GLTF {
  const gltfLoader = createGLTFLoader();
  const gltf = useLoader(GLTFLoader, path, () => gltfLoader);
  return gltf;
}
