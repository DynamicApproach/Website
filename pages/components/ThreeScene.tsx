/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { events } from "@react-three/fiber";
import { extend } from "@react-three/fiber";

import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // cull only when clicked
  const [cull, setCull] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 5 : 1.5}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      // cull only when clicked
      onClick={(event) => {
        click(!clicked);
      }}
      onContextMenu={(e) => console.log("context menu")}
      onDoubleClick={(e) => console.log("double click")}
      onWheel={(e) => console.log("wheel spins")}
      onPointerUp={(e) => console.log("up")}
      onPointerDown={(e) => console.log("down")}
      onPointerEnter={(e) => setCull(cull)}
      onPointerLeave={(e) => console.log("leave")} // see note 1
      onPointerMove={(e) => console.log("move")}
      onPointerMissed={() => console.log("missed")}
      onUpdate={(self) => console.log("props have been updated")}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const ThreeScene = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 0] }}>
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] }
          ]} // https://codesandbox.io/s/vkgi6?file=/src/Player.js
          // TODO:  add a listener to the movement actions
        >
          <PointerLockControls />
          <ambientLight />
          <Sky sunPosition={[100, 20, 100]} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Box position={[-6.2, 0, 0]} />
          <Box position={[6.2, 0, 0]} />
        </KeyboardControls>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
