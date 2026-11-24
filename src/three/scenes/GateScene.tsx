"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * THE GATE — 黑暗超现实入口场景
 * 抽象 Chrome 雕塑 + 冷白顶光 + 门环 + 漂浮粒子
 * progressRef: 0 → 1 入场推进，>1 穿越出口
 */
export default function GateScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 16], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#050505" }}
    >
      <fog attach="fog" args={["#050505", 10, 34]} />
      <SceneContent progressRef={progressRef} />
    </Canvas>
  );
}

function SceneContent({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const worldRef = useRef<THREE.Group>(null);
  const sculptureRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const keyLight = useRef<THREE.SpotLight>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame(({ camera, pointer: p, clock }) => {
    const t = clock.getElapsedTime();
    const progress = progressRef.current;

    // 鼠标视差（lerp 平滑）
    pointer.current.x += (p.x - pointer.current.x) * 0.05;
    pointer.current.y += (p.y - pointer.current.y) * 0.05;

    // 入场：镜头从远推近；exit（progress > 1）：穿越大门
    const enter = Math.min(progress, 1);
    const exit = Math.max(progress - 1, 0);
    const z = THREE.MathUtils.lerp(16, 8.2, easeOut(enter)) - exit * 26;
    camera.position.set(
      pointer.current.x * 1.1,
      0.4 + pointer.current.y * 0.6,
      z
    );
    camera.lookAt(0, 0.2, 0);

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.05;
      (ringRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.1 + Math.sin(t * 2) * 0.4 + exit * 6;
    }

    // 雕塑缓慢自转；入场从远处浮现，退出时加速旋入镜头深处
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y = t * 0.16 + pointer.current.x * 0.24 + exit * 1.2;
      sculptureRef.current.rotation.x = 0.22 + Math.sin(t * 0.35) * 0.06 - pointer.current.y * 0.12;
      sculptureRef.current.rotation.z = -0.18 + Math.sin(t * 0.24) * 0.04;
      const scale = 0.72 + easeOut(enter) * 0.28 + exit * 0.5;
      sculptureRef.current.scale.setScalar(scale);
    }

    // 顶光呼吸
    if (keyLight.current) {
      keyLight.current.intensity = 165 + Math.sin(t * 1.6) * 40 + exit * 500;
    }

    // 世界随退出略旋转，营造穿越感
    if (worldRef.current) {
      worldRef.current.rotation.y = pointer.current.x * 0.06 + exit * 0.35;
    }
  });

  return (
    <group ref={worldRef}>
      {/* 灯光：冷白顶光 + 幽蓝轮廓光 + 深紫氛围 */}
      <ambientLight intensity={0.06} />
      <spotLight
        ref={keyLight}
        position={[0, 9, 3]}
        angle={0.72}
        penumbra={0.95}
        color="#E8E8EC"
        intensity={150}
        distance={40}
      />
      <spotLight
        position={[0, 4, -6]}
        angle={0.8}
        penumbra={1}
        color="#D8D8DE"
        intensity={200}
        distance={30}
      />
      <spotLight
        position={[-6, 2, 4]}
        angle={0.65}
        penumbra={1}
        color="#C9C9CF"
        intensity={95}
        distance={34}
      />
      <spotLight
        position={[7, 5, -2]}
        angle={0.6}
        penumbra={1}
        color="#1A3A5C"
        intensity={90}
        distance={40}
      />
      <pointLight position={[0, -4, 6]} color="#00D4FF" intensity={18} distance={22} />
      <pointLight position={[0, -1.5, 7]} color="#1A3A5C" intensity={24} distance={24} />

      {/* 主角：抽象 Chrome 雕塑，恢复最初的品牌符号 */}
      <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.45} floatingRange={[-0.16, 0.16]}>
        <group ref={sculptureRef} position={[0, 0.35, 0.8]}>
          <mesh castShadow>
            <torusKnotGeometry args={[1.65, 0.5, 220, 36, 2, 3]} />
            <meshStandardMaterial
              color="#D8D8DE"
              metalness={1}
              roughness={0.12}
              envMapIntensity={2.4}
            />
          </mesh>
        </group>
      </Float>

      {/* 门环 —— 与雕塑保持前后层次，而非紧贴轮廓 */}
      <mesh ref={ringRef} position={[0, 0.4, -4]}>
        <torusGeometry args={[4.6, 0.06, 16, 128]} />
        <meshStandardMaterial
          color="#2E2438"
          emissive="#B9B9C2"
          emissiveIntensity={1.1}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.4, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.35} envMapIntensity={0.6} />
      </mesh>

      {/* 背景石柱群 */}
      {useMemo(
        () =>
          Array.from({ length: 14 }, (_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const radius = 13 + ((i * 7) % 5);
            const h = 4 + ((i * 13) % 7);
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * radius, h / 2 - 3.4, Math.sin(angle) * radius - 4]}
              >
                <boxGeometry args={[0.9, h, 0.9]} />
                <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.5} />
              </mesh>
            );
          }),
        []
      )}

      <Particles />

      {/* 无外部资源的程序化环境反射 */}
      <Environment resolution={128}>
        <group>
          <Lightformer intensity={5} color="#E8E4DC" position={[0, 6, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[12, 12, 1]} />
          <Lightformer intensity={2.5} color="#C9C9CF" position={[-5, 2, -1]} rotation={[0, Math.PI / 2, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={1.5} color="#1A3A5C" position={[5, 1, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={0.9} color="#00D4FF" position={[0, -2, 5]} scale={[6, 2, 1]} />
        </group>
      </Environment>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 36;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = Math.sin(t * 0.3) * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#C9C9CF"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function easeOut(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
