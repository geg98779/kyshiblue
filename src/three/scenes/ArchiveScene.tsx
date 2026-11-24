"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { Album } from "@/types";
import { createCoverTexture } from "@/three/createCoverTexture";

/**
 * THE ARCHIVE — 超现实地下音乐档案馆
 * 真实专辑封面漂浮在黑暗空间中。Hover 只做几何反馈（浮起、放大、倾斜、轻微提亮），
 * 不叠加任何红色光效；点击放大冲向镜头后打开详情。滚轮推移镜头，鼠标产生视差。
 */
export default function ArchiveScene({
  albums,
  onHover,
  onSelect,
  selectedSlug,
}: {
  albums: Album[];
  onHover: (album: Album | null) => void;
  onSelect: (album: Album) => void;
  selectedSlug: string | null;
}) {
  const dollyRef = useRef(0);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 9], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "#050505" }}
      onWheel={(e) => {
        dollyRef.current = THREE.MathUtils.clamp(
          dollyRef.current + e.deltaY * 0.008,
          -6,
          10
        );
      }}
    >
      <fog attach="fog" args={["#050505", 8, 34]} />
      <ArchiveContent
        albums={albums}
        onHover={onHover}
        onSelect={onSelect}
        selectedSlug={selectedSlug}
        dollyRef={dollyRef}
      />
    </Canvas>
  );
}

function ArchiveContent({
  albums,
  onHover,
  onSelect,
  selectedSlug,
  dollyRef,
}: {
  albums: Album[];
  onHover: (a: Album | null) => void;
  onSelect: (a: Album) => void;
  selectedSlug: string | null;
  dollyRef: React.MutableRefObject<number>;
}) {
  const pointer = useRef({ x: 0, y: 0 });

  const slots = useMemo(
    () => {
      // 前两张（默认已排序为 Controll1001 / 佛哦佛）放在镜头正前方居中，
      // 其余封面绕开中心区域，避免主角被挤到边缘。
      const featuredPositions: [number, number, number][] =
        albums.length === 1
          ? [[0, 0.75, 1.6]]
          : [
              [-1.55, 0.75, 1.6],
              [1.55, 0.75, 1.6],
            ];

      const restCount = Math.max(albums.length - featuredPositions.length, 0);
      const cols = restCount > 16 ? 6 : restCount > 10 ? 5 : 3;
      const xGap = cols === 6 ? 2.9 : cols === 5 ? 3.4 : 4.4;
      const zGap = cols === 6 ? 2.9 : cols === 5 ? 3.1 : 4.2;
      const outerCols = cols === 6 ? [0, 1, 4, 5] : cols === 5 ? [0, 1, 3, 4] : [0, 2];

      const restSlots = Array.from({ length: restCount }, (_, i) => {
        const seed = (i + 2) * 1.37;

        // 第一排只占两侧，把中间让给前两张主角
        if (i < outerCols.length) {
          const col = outerCols[i];
          const x = (col - (cols - 1) / 2) * xGap + Math.sin(seed * 2.3) * 0.35;
          const y = Math.cos(seed * 1.7) * 1.7 + (i % 2 === 0 ? 0.65 : -0.65);
          const z = 0.2 + Math.sin(seed * 3.1) * 0.8;
          return { position: [x, y, z] as [number, number, number], seed };
        }

        const j = i - outerCols.length;
        const col = j % cols;
        const row = Math.floor(j / cols) + 1;
        const s = (j + 2) * 1.37;
        const x = (col - (cols - 1) / 2) * xGap + Math.sin(s * 2.3) * 0.7;
        const y = Math.cos(s * 1.7) * 1.7 + (row % 2 === 0 ? 0.65 : -0.65);
        const z = -row * zGap + Math.sin(s * 3.1) * 1.1;
        return { position: [x, y, z] as [number, number, number], seed: s };
      });

      return albums.map((_, i) => {
        if (i < featuredPositions.length) {
          return { position: featuredPositions[i], seed: i * 1.37 + 2 };
        }
        return restSlots[i - featuredPositions.length] ?? { position: [0, 0, -3] as [number, number, number], seed: i * 1.37 };
      });
    },
    [albums]
  );

  useFrame(({ camera, pointer: p, clock }) => {
    const t = clock.getElapsedTime();
    pointer.current.x += (p.x - pointer.current.x) * 0.04;
    pointer.current.y += (p.y - pointer.current.y) * 0.04;

    camera.position.x = pointer.current.x * 1.6;
    camera.position.y = 0.4 + pointer.current.y * 0.9;
    const targetZ = 9 - dollyRef.current - (selectedSlug ? 1.6 : 0);
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, camera.position.z - 10);
    camera.rotation.z = Math.sin(t * 0.1) * 0.01;
  });

  return (
    <group>
      <ambientLight intensity={0.1} />
      {/* 中性冷白主光 + 深紫氛围，不叠红色 */}
      <spotLight position={[-8, 9, 2]} angle={0.55} penumbra={0.9} color="#d8d8dd" intensity={90} distance={45} />
      <spotLight position={[8, 6, -8]} angle={0.6} penumbra={1} color="#30143F" intensity={55} distance={45} />

      {albums.map((album, i) => (
        <AlbumSlab
          key={album.slug}
          album={album}
          position={slots[i].position}
          seed={slots[i].seed}
          selected={selectedSlug === album.slug}
          dimmed={Boolean(selectedSlug) && selectedSlug !== album.slug}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.2, -8]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#090909" metalness={0.9} roughness={0.3} envMapIntensity={0.5} />
      </mesh>

      <ArchiveDust />

      <Environment resolution={128}>
        <group>
          <Lightformer intensity={3} color="#A8A8AD" position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.2} color="#A8A8AD" position={[-6, 1, -2]} rotation={[0, Math.PI / 2, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={0.8} color="#30143F" position={[6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 3, 1]} />
        </group>
      </Environment>
    </group>
  );
}

function AlbumSlab({
  album,
  position,
  seed,
  selected,
  dimmed,
  onHover,
  onSelect,
}: {
  album: Album;
  position: [number, number, number];
  seed: number;
  selected: boolean;
  dimmed: boolean;
  onHover: (a: Album | null) => void;
  onSelect: (a: Album) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // 程序化封面作为即时可用的兜底
  const fallbackTexture = useMemo(
    () => createCoverTexture(album.cover, album.title, album.artistName),
    [album]
  );
  const [texture, setTexture] = useState<THREE.Texture>(fallbackTexture);

  // 异步加载真实封面；失败则保留程序化封面
  useEffect(() => {
    if (!album.coverImage) {
      setTexture(fallbackTexture);
      return;
    }
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      album.coverImage,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        setTexture(tex);
      },
      undefined,
      () => {
        /* 加载失败：保留程序化封面 */
      }
    );
    return () => {
      cancelled = true;
    };
  }, [album.coverImage, fallbackTexture]);

  // 纹理切换时同步 map / emissiveMap，让封面在暗场中清晰显示自身
  useEffect(() => {
    const mat = meshRef.current?.material as THREE.MeshStandardMaterial | undefined;
    if (!mat) return;
    mat.map = texture;
    mat.emissiveMap = texture;
    mat.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    if (hovered && !selected && !dimmed) {
      document.body.style.cursor = "pointer";
    }
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered, selected, dimmed]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const m = meshRef.current;
    if (!m) return;
    const mat = m.material as THREE.MeshStandardMaterial;

    // ── 点击：封面放大、旋转、冲向镜头 ──
    if (selected) {
      m.position.x += (0 - m.position.x) * 0.09;
      m.position.y += (0 - m.position.y) * 0.09;
      m.position.z += (9 - m.position.z) * 0.09;
      m.rotation.y += 0.14;
      m.scale.x += (3.2 - m.scale.x) * 0.1;
      m.scale.y = m.scale.z = m.scale.x;
      mat.emissiveIntensity += (1.1 - mat.emissiveIntensity) * 0.1;
      mat.opacity += (1 - mat.opacity) * 0.1;
      return;
    }

    // ── 有其它封面被选中：本封面淡出 ──
    if (dimmed) {
      m.scale.x += (0.7 - m.scale.x) * 0.1;
      m.scale.y = m.scale.z = m.scale.x;
      mat.opacity += (0.12 - mat.opacity) * 0.1;
      mat.emissiveIntensity += (0.18 - mat.emissiveIntensity) * 0.1;
      m.position.y = position[1] + Math.sin(t * 0.7 + seed) * 0.28;
      return;
    }

    // ── 常规漂浮 + Hover：只有几何反馈 ──
    const floatY = Math.sin(t * 0.7 + seed) * 0.28;
    m.position.x += (position[0] - m.position.x) * 0.1;
    m.position.y += (position[1] + floatY + (hovered ? 0.42 : 0) - m.position.y) * 0.1;
    m.position.z += (position[2] + (hovered ? 0.7 : 0) - m.position.z) * 0.1;

    const targetRotY = hovered
      ? -0.24 + pointer.x * 0.18
      : Math.sin(t * 0.25 + seed) * 0.18;
    const targetRotX = hovered
      ? -pointer.y * 0.12
      : Math.cos(t * 0.3 + seed) * 0.06;
    m.rotation.y += (targetRotY - m.rotation.y) * 0.1;
    m.rotation.x += (targetRotX - m.rotation.x) * 0.1;

    const targetScale = hovered ? 1.22 : 1;
    m.scale.x += (targetScale - m.scale.x) * 0.12;
    m.scale.y = m.scale.z = m.scale.x;

    mat.opacity += (1 - mat.opacity) * 0.15;
    // 轻微提亮，不叠任何色光
    mat.emissiveIntensity += ((hovered ? 0.88 : 0.6) - mat.emissiveIntensity) * 0.12;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          if (dimmed || selected) return;
          setHovered(true);
          onHover(album);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (selected || dimmed) return;
          setHovered(false);
          onHover(null);
          onSelect(album);
        }}
      >
        <boxGeometry args={[2.2, 2.2, 0.08]} />
        <meshStandardMaterial
          transparent
          metalness={0.15}
          roughness={0.6}
          emissive="#ffffff"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

function ArchiveDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 700;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 34;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = -Math.random() * 30 + 6;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A8A8AD"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
