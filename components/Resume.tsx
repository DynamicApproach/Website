/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Mesh, PerspectiveCamera } from "three";

interface ResumeProps {
  camera: PerspectiveCamera;
}

const Resume: React.FC<ResumeProps> = ({ camera }) => {
  const mesh = useRef<Mesh | null>(null);

  useFrame(() => {
    if (camera && mesh.current) {
      const distance = camera.position.distanceTo(mesh.current.position);
      const minDistance = 5; // minimum distance before the mesh stops scaling down
      const maxDistance = 30; // maximum distance before the mesh stops scaling up
      const scale = 1 / distance; // calculate the scale based on distance
      const clampedScale = clamp(scale, 1 / maxDistance, 1 / minDistance); // clamp the scale between min and max values
      mesh.current.scale.set(clampedScale, clampedScale, clampedScale);
      mesh.current.rotation.y += 0.01;
    }
  });

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  return (
    <mesh ref={mesh}>
      <boxBufferGeometry args={[2, 1, 0.02]} />
      <meshStandardMaterial color="lightblue" />
      <Html>
        <div
          style={{
            transform: "scale(1.05)",
            transformOrigin: "center"
          }}
        >
          <iframe
            src="/resume.html"
            title="Resume"
            width="384"
            height="240"
            style={{
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "5px"
            }}
          />
        </div>
      </Html>
    </mesh>
  );
};

Resume.propTypes = {
  camera: PropTypes.instanceOf(PerspectiveCamera).isRequired
};

export default Resume;
