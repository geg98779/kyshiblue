"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 提线傀儡 —— 空灵版（V2）
 * 造型仍是侧身蜷缩、双手抱头蹲下的悬吊人偶（参考《Controll1001》封面），
 * 但材质改为半透明玻璃幽灵：空心躯体能透出背后的门环与光柱，
 * 胸口一枚「灵魂核心」发光体透过玻璃散出来，提线发光。
 *
 * progressRef: 0 → 1 入场（被提线缓缓拉起），> 1 穿越大门（抬头、线绷紧）
 */

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

const P = {
  pelvis: V(0, -0.55, 0),
  chest: V(0, 0.45, 0.45),
  neck: V(0, 0.85, 0.68),
  head: V(0, 1.05, 0.82),
  shoulderL: V(-0.55, 0.62, 0.5),
  shoulderR: V(0.55, 0.62, 0.5),
  elbowL: V(-1.05, 1.05, 0.75),
  elbowR: V(1.0, 1.1, 0.72),
  wristL: V(-0.4, 1.55, 0.95),
  wristR: V(0.38, 1.52, 0.92),
  hipL: V(-0.3, -0.55, 0),
  hipR: V(0.3, -0.55, 0),
  kneeL: V(-0.72, -1.05, 1.1),
  kneeR: V(0.7, -1.08, 1.05),
  ankleL: V(-0.48, -1.62, -0.05),
  ankleR: V(0.46, -1.64, -0.1),
};

type JointName = "head" | "chest" | "wristL" | "wristR" | "kneeL" | "kneeR";

const BONES: [THREE.Vector3, THREE.Vector3, number][] = [
  [P.pelvis, P.chest, 0.27],
  [P.chest, P.neck, 0.18],
  [P.chest, P.shoulderL, 0.13],
  [P.chest, P.shoulderR, 0.13],
  [P.shoulderL, P.elbowL, 0.14],
  [P.elbowL, P.wristL, 0.11],
  [P.shoulderR, P.elbowR, 0.14],
  [P.elbowR, P.wristR, 0.11],
  [P.pelvis, P.hipL, 0.13],
  [P.pelvis, P.hipR, 0.13],
  [P.hipL, P.kneeL, 0.2],
  [P.kneeL, P.ankleL, 0.15],
  [P.hipR, P.kneeR, 0.2],
  [P.kneeR, P.ankleR, 0.15],
];

const JOINTS: { key: JointName; pos: THREE.Vector3; r: number }[] = [
  { key: "head", pos: P.head, r: 0.09 },
  { key: "chest", pos: P.chest, r: 0.14 },
  { key: "wristL", pos: P.wristL, r: 0.13 },
  { key: "wristR", pos: P.wristR, r: 0.13 },
  { key: "kneeL", pos: P.kneeL, r: 0.15 },
  { key: "kneeR", pos: P.kneeR, r: 0.15 },
];

const ANCHORS: { key: JointName; top: THREE.Vector3 }[] = [
  { key: "head", top: V(-0.5, 9, 0.1) },
  { key: "chest", top: V(1.1, 9, -1.1) },
  { key: "wristL", top: V(-3.6, 9, 0.3) },
  { key: "wristR", top: V(3.6, 9, 0.3) },
  { key: "kneeL", top: V(-2.7, 9, 1.9) },
  { key: "kneeR", top: V(2.7, 9, 1.9) },
];

// 躯壳玻璃：更透，呈"空灵"空心感
const GLASS_SHELL = {
  color: "#E6E3DC",
  metalness: 0,
  roughness: 0.06,
  transparent: true,
  opacity: 0.28,
  clearcoat: 1,
  clearcoatRoughness: 0.14,
  envMapIntensity: 2.6,
  emissive: "#33294E",
  emissiveIntensity: 0.4,
  side: THREE.DoubleSide,
  depthWrite: false,
} as const;

// 骨架玻璃：稍实一点，让透明躯体里的轮廓可读
const GLASS_BODY = {
  ...GLASS_SHELL,
  opacity: 0.52,
  emissiveIntensity: 0.55,
} as const;

// 关节「灵魂珠」：超亮自发光，是画面里的点睛光点
const BALL = {
  color: "#EDEAE2",
  emissive: "#8A5AC8",
  emissiveIntensity: 2.2,
  toneMapped: false,
} as const;

export default function Marionette({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const rig = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const ballRefs = useRef<Partial<Record<JointName, THREE.Object3D | null>>>({});

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const enter = Math.min(progressRef.current, 1);
    const exit = Math.max(progressRef.current - 1, 0);
    const rise = 1 - enter;

    if (rig.current) {
      rig.current.rotation.y =
        -0.72 + Math.sin(t * 0.31) * 0.11 + pointer.x * 0.1 + exit * 0.4;
      rig.current.rotation.x = 0.12 + rise * 0.4 - exit * 0.3;
      rig.current.rotation.z = Math.sin(t * 0.43) * 0.04;
      rig.current.position.y =
        Math.sin(t * 0.55) * 0.09 - rise * 0.55 - exit * 0.2;
      // 极缓的呼吸，让玻璃躯体像活的
      rig.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.015);
    }
    // 灵魂核心呼吸
    const pulse = 1 + Math.sin(t * 1.7) * 0.18 + exit * 1.6;
    if (coreRef.current) coreRef.current.scale.setScalar(pulse);
    if (coreLight.current) coreLight.current.intensity = 5 + Math.sin(t * 1.7) * 1.6 + exit * 10;
  });

  return (
    <group>
      <group ref={rig}>
        {/* 玻璃躯干 */}
        <mesh position={[0, 0.02, 0.26]} scale={[0.76, 0.94, 0.58]} renderOrder={3}>
          <sphereGeometry args={[1, 28, 20]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>
        {/* 兜帽 / 垂下的裹布（收小，别盖住头） */}
        <mesh position={[0.1, 1.2, 0.5]} rotation={[0.3, 0, 0.38]} scale={[0.48, 0.42, 0.36]} renderOrder={3}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>
        {/* 低垂的头 */}
        <mesh position={[0, 1.12, 0.88]} scale={[0.4, 0.44, 0.4]} renderOrder={3}>
          <sphereGeometry args={[1, 28, 20]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>
        {/* 膝盖体积 */}
        <mesh position={[-0.7, -1.0, 0.94]} scale={[0.24, 0.26, 0.28]} renderOrder={3}>
          <sphereGeometry args={[1, 18, 14]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>
        <mesh position={[0.68, -1.03, 0.9]} scale={[0.24, 0.26, 0.28]} renderOrder={3}>
          <sphereGeometry args={[1, 18, 14]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>

        {BONES.map(([from, to, radius], i) => (
          <Bone key={i} from={from} to={to} radius={radius} />
        ))}

        {JOINTS.map((j) => (
          <mesh
            key={j.key}
            position={j.pos}
            renderOrder={4}
            ref={(o) => {
              ballRefs.current[j.key] = o;
            }}
          >
            <sphereGeometry args={[j.r, 18, 14]} />
            <meshStandardMaterial {...BALL} />
          </mesh>
        ))}

        {/* 抱头的双手 */}
        <mesh position={[-0.31, 1.58, 0.98]} scale={[0.18, 0.22, 0.12]} renderOrder={3}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>
        <mesh position={[0.3, 1.55, 0.95]} scale={[0.18, 0.22, 0.12]} renderOrder={3}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshPhysicalMaterial {...GLASS_SHELL} />
        </mesh>

        {/* 灵魂核心 —— 透过玻璃躯干散出的光 */}
        <mesh ref={coreRef} position={[0, 0.42, 0.44]} renderOrder={5}>
          <sphereGeometry args={[0.2, 20, 16]} />
          <meshBasicMaterial color="#B99FE8" toneMapped={false} transparent opacity={0.95} />
        </mesh>
        <pointLight ref={coreLight} position={[0, 0.42, 0.5]} color="#8A5AC8" intensity={5} distance={4.5} />
      </group>

      {/* 提线：上端固定，下端每帧跟随摆动中的关节 */}
      {ANCHORS.map((a) => (
        <Wire
          key={a.key}
          top={a.top}
          getTarget={() => ballRefs.current[a.key] ?? null}
          progressRef={progressRef}
        />
      ))}
    </group>
  );
}

function Bone({
  from,
  to,
  radius,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  radius: number;
}) {
  const { mid, quat, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(to, from);
    const length = dir.length();
    return {
      mid: new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      ),
      length,
    };
  }, [from, to]);

  return (
    <mesh position={mid} quaternion={quat} renderOrder={3}>
      <cylinderGeometry args={[radius * 0.8, radius, length, 12]} />
      <meshPhysicalMaterial {...GLASS_BODY} />
    </mesh>
  );
}

function Wire({
  top,
  getTarget,
  progressRef,
}: {
  top: THREE.Vector3;
  getTarget: () => THREE.Object3D | null;
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const mid = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const target = getTarget();
    if (!ref.current || !target) return;
    target.getWorldPosition(b);
    if (ref.current.parent) ref.current.parent.worldToLocal(b);
    dir.subVectors(b, top);
    const len = dir.length();
    mid.addVectors(top, b).multiplyScalar(0.5);
    ref.current.position.copy(mid);
    ref.current.quaternion.setFromUnitVectors(up, dir.normalize());
    ref.current.scale.set(1, len, 1);
    if (mat.current) {
      const exit = Math.max(progressRef.current - 1, 0);
      mat.current.opacity = 0.4 + exit * 0.55;
    }
  });

  return (
    <mesh ref={ref} renderOrder={1}>
      <cylinderGeometry args={[0.006, 0.006, 1, 5]} />
      <meshBasicMaterial
        ref={mat}
        color="#D9D5F0"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
