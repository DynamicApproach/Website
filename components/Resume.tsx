/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Mesh, PerspectiveCamera } from "three";
import PropTypes, { Validator } from "prop-types";

interface ResumeProps {
  camera: PerspectiveCamera;
  cursorRef?: React.RefObject<HTMLDivElement>;
}

const Resume: React.FC<ResumeProps> = ({ camera, cursorRef }) => {
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

  const handleResumeClick = () => {
    if (cursorRef && cursorRef.current) {
      cursorRef.current.requestPointerLock();
    }
  };

  return (
    <>
      <mesh ref={mesh}>
        <boxBufferGeometry args={[2, 1, 0.02]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <Html onClick={handleResumeClick} className="resume text-center">
        <h1 className="text-4xl font-bold">Click to Resume</h1>
        <p className="text-xl">Escape to Exit</p>
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
    </>
  );
};

Resume.propTypes = {
  camera: PropTypes.instanceOf(PerspectiveCamera).isRequired,
  cursorRef: PropTypes.object as Validator<React.RefObject<HTMLDivElement>>
};

export default Resume;
