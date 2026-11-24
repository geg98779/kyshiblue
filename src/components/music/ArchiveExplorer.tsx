"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { Album } from "@/types";
import { genres } from "@/data/genres";
import AlbumCard from "@/components/albums/AlbumCard";

const ArchiveScene = dynamic(() => import("@/three/scenes/ArchiveScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-mono text-xs tracking-brutal text-muted">
        Opening the archive…
      </p>
    </div>
  ),
});

export default function ArchiveExplorer({ albums }: { albums: Album[] }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<Album | null>(null);
  const [genre, setGenre] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [view3d, setView3d] = useState(true);
  const [selected, setSelected] = useState<Album | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    return albums.filter((a) => {
      const matchGenre = genre === "all" || a.genres.includes(genre);
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.artistName.toLowerCase().includes(q);
      return matchGenre && matchQuery;
    });
  }, [albums, genre, query]);

  // 3D 场景里的优先级：Controll1001 和《佛哦佛》永远排在最前
  const sceneAlbums = useMemo(() => {
    const priority = ["controll1001", "fo-o-fo"];
    const source = filtered.length ? filtered : albums;
    return [...source].sort((a, b) => {
      const ai = priority.indexOf(a.slug);
      const bi = priority.indexOf(b.slug);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [filtered, albums]);

  const handleHover = useCallback(
    (a: Album | null) => {
      if (!selected) setHovered(a);
    },
    [selected]
  );

  // 点击：先播放 3D 转场动效，再跳转详情
  const handleSelect = useCallback(
    (a: Album) => {
      if (selected) return;
      setHovered(null);
      setSelected(a);
      timerRef.current = setTimeout(() => {
        router.push(`/music/albums/${a.slug}`);
      }, 950);
    },
    [selected, router]
  );

  return (
    <>
      {/* 3D 档案空间 */}
      {view3d && (
        <section className="relative h-[78svh] w-full overflow-hidden border-b border-[#1a1a1a]">
          <ArchiveScene
            albums={sceneAlbums}
            onHover={handleHover}
            onSelect={handleSelect}
            selectedSlug={selected?.slug ?? null}
          />

          {/* 点击转场：黑色淡入 + 专辑名 */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-void"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.72 }}
                  transition={{ duration: 0.85, delay: 0.25 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.p
                    className="font-mono text-[10px] tracking-brutal text-muted"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Opening file
                  </motion.p>
                  <motion.h2
                    className="display-title mt-4 max-w-4xl px-6 text-center text-3xl text-bone md:text-6xl"
                    initial={{ opacity: 0, scale: 0.92, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, scale: 1, letterSpacing: "0.02em" }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                  >
                    {selected.title}
                  </motion.h2>
                  <motion.p
                    className="mt-4 font-mono text-xs tracking-brutal text-muted"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selected.artistName} · {selected.year}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover 信息面板 */}
          <AnimatePresence>
            {hovered && !selected && (
              <motion.div
                key={hovered.slug}
                className="pointer-events-none absolute bottom-8 left-8 z-10 max-w-sm border border-[#2a2a2a] bg-void/85 p-5 backdrop-blur-md"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-[10px] tracking-brutal text-bone">
                  {hovered.year} · {hovered.rating.toFixed(1)} / 10
                </p>
                <h3 className="mt-2 font-display text-xl text-bone">
                  {hovered.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">{hovered.artistName}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">
                  {hovered.review.slice(0, 80)}…
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-brutal text-muted">
                  Click to open →
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute right-8 top-8 z-10 text-right">
            <p className="font-mono text-[10px] leading-relaxed tracking-brutal text-muted">
              Scroll to go deeper
              <br />
              Click a cover to open
            </p>
          </div>
        </section>
      )}

      {/* 筛选 + 搜索 */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={genre === "all"} onClick={() => setGenre("all")}>
              All
            </FilterChip>
            {genres.map((g) => (
              <FilterChip
                key={g.slug}
                active={genre === g.slug}
                onClick={() => setGenre(g.slug)}
              >
                {g.name}
              </FilterChip>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive…"
              aria-label="搜索专辑或艺术家"
              className="w-full border border-[#2a2a2a] bg-transparent px-4 py-2.5 font-mono text-xs tracking-brutal text-bone placeholder:text-muted focus:border-[#3a3a40] focus:outline-none md:w-64"
            />
            <button
              onClick={() => setView3d((v) => !v)}
              className="shrink-0 border border-[#2a2a2a] px-4 py-2.5 font-mono text-xs tracking-brutal text-muted transition-colors hover:border-[#3a3a40] hover:text-bone"
              aria-pressed={view3d}
            >
              {view3d ? "3D on" : "3D off"}
            </button>
          </div>
        </div>

        {/* 专辑网格 */}
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((a, i) => (
            <AlbumCard key={a.slug} album={a} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-16 text-center font-mono text-xs tracking-brutal text-muted">
            Nothing found in the void.
          </p>
        )}
      </section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`border px-3.5 py-1.5 font-mono text-[10px] tracking-brutal transition-all duration-300 ${
        active
          ? "border-[#3a3a40] bg-[#2a2a2e] text-bone"
          : "border-[#2a2a2a] text-muted hover:border-[#3a3a40] hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}
