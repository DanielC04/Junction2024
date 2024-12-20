import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";

export default function Elevator(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/shaft.gltf");
  return (
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shaft.geometry}
        material={materials["M_Model"]}
        rotation={[0, degToRad(0), 0]}
        scale={2}
      >
            <meshBasicMaterial color={'#44484b'} wireframe={true} />
        </mesh>
  );
}

useGLTF.preload("/assets/shaft.gltf");