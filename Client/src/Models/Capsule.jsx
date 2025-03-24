import React from "react";
import { useGLTF } from "@react-three/drei";

const Capsule = (props) => {
  const { nodes, materials } = useGLTF("/Models/capsule.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.CobCap}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.MagCap}
        />
      </group>
    </group>
  );
};
useGLTF.preload("/Models/capsule.glb");

export default Capsule;
