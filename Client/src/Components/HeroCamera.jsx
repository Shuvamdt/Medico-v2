import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import React from "react";

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = React.useRef();
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);
    if (!isMobile) {
      easing.dampE(
        groupRef.current.rotation,
        [state.pointer.y / 2, state.pointer.x / 2, 0],
        0.25,
        delta
      );
    }
  });
  return (
    <group ref={groupRef} scale={isMobile ? 1 : 1.3}>
      {children}
    </group>
  );
};

export default HeroCamera;
