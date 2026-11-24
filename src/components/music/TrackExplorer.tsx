"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Track } from "@/types";
import { genres } from "@/data/genres";

export default function TrackExplorer({ tracks }: { tracks: Track[] }) {
  const [genre, setGenre] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      tracks.filter((t) => {
        const mg = genre === "all" || t.genres.includes(genre);
        const q = query.trim().toLowerCase();
        const mq =
          !q ||
          t.title.toLowerCase().includes(q) ||
          t.artistName.toLowerCase().includes(q);
        return mg && mq;
      }),
    [tracks, genre, query]
  );

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <Chip active={genre === "all"} onClick={() => setGenre("all")}>All</Chip>
          {genres.map((g) => (
            <Chip key={g.slug} active={genre === g.slug} onClick={() => setGenre(g.slug)}>
              {g.name}
            </Chip>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tracks…"
          aria-label="搜索单曲"
          className="border border-[#2a2a2a] bg-transparent px-4 py-2.5 font-mono text-xs tracking-brutal text-bone placeholder:text-muted focus:border-[#3a3a40] focus:outline-none md:w-56"
        />
      </div>

      <ul className="mt-10 space-y-px">
        {filtered.map((t, i) => (
          <motion.li
            key={t.slug}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
            className="group border border-transparent border-b-[#1f1f1f] p-5 transition-colors duration-300 hover:border-[#3a3a40] hover:bg-dark-gray/60"
          >
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-xl tracking-wide text-bone md:text-2xl">
                {t.title}
              </h2>
              <span className="font-mono text-xs text-muted">{t.artistName}</span>
              {t.album && (
                <Link
                  href={`/music/albums/${t.album}`}
                  className="font-mono text-xs text-bone/70 transition-colors hover:text-bone"
                >
                  {t.albumTitle} →
                </Link>
              )}
              <span className="ml-auto font-mono text-xs text-muted">{t.year}</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {t.feeling}
            </p>
            {t.links.youtube && (
              <a
                href={t.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-mono text-[10px] tracking-brutal text-muted transition-colors hover:text-bone"
              >
                Listen ↗
              </a>
            )}
          </motion.li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="mt-16 text-center font-mono text-xs tracking-brutal text-muted">
          Nothing found in the void.
        </p>
      )}
    </div>
  );
}

function Chip({
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
      className={`border px-3 py-1.5 font-mono text-[10px] tracking-brutal transition-all duration-300 ${
        active
          ? "border-[#3a3a40] bg-[#2a2a2e] text-bone"
          : "border-[#2a2a2a] text-muted hover:border-[#3a3a40] hover:text-bone"
      }`}
    >
      {children}
    </button>
  );
}
