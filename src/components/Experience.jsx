import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  useTexture,
  Text,
  useFaceControls,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";

import { Avtera1 } from "./Avtera1";
import { easing } from "maath";
import { Avtera2 } from "./Avtera2";
import { Avtera3 } from "./Avtera3";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlRef = useRef();
  const scene = useThree((state) => state.scene);
  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlRef.current.setLookAt(
        0,
        0,
        10,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <MonsterStage
        texture={"texture/Art1.jpg"}
        name="ALPHA"
        color="#3887BE"
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Avtera1
          scale={2}
          position={[0, -2, 0]}
          hovered={hovered === "ALPHA"}
        />
      </MonsterStage>
      <MonsterStage
        texture={"texture/Cyberpunk.jpg"}
        name="BITA"
        color="#200E3A"
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Avtera3 scale={2} position={[0, -2, 0]} hovered={hovered === "BITA"} />
      </MonsterStage>
      <MonsterStage
        texture={"texture/Radiant.jpg"}
        position-x={2.5}
        name="GAMAA"
        color="#607274"
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Avtera2
          scale={2}
          position={[0, -2, 0]}
          hovered={hovered === "GAMAA"}
        />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  setHovered,
  hovered,
  ...props
}) => {
  const map = useTexture(texture);

  return (
    <group {...props}>
      <Text
        font="font/font.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2.4, 7, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial
          side={THREE.DoubleSide}
          blend={active === name ? 1 : 0}
        >
          <ambientLight intensity={0.5} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[8, 128, 128]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
