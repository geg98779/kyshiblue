"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Album } from "@/types";
import CoverArt from "./CoverArt";

export default function AlbumCard({ album, index = 0 }: { album: Album; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
      <Link href={`/music/albums/${album.slug}`} className="group block">
        <div className="relative border border-[#222] transition-colors duration-500 group-hover:border-[#3a3a40]">
          <div className="relative overflow-hidden">
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.1] group-hover:-rotate-[1.5deg]">
              <CoverArt
                cover={album.cover}
                coverImage={album.coverImage}
                title={album.title}
                artistName={album.artistName}
              />
            </div>
            {/* Hover 底部信息条 */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-void/95 to-transparent px-3 pb-2 pt-8 transition-transform duration-500 group-hover:translate-y-0">
              <span className="font-mono text-[10px] tracking-brutal text-bone">
                {album.year} · {album.rating.toFixed(1)}
              </span>
              <span className="font-mono text-[10px] tracking-brutal text-bone">
                Open →
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-sm tracking-wide text-bone">
              {album.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              {album.artistName} · {album.year}
            </p>
          </div>
          <span className="font-mono text-xs text-chrome">
            {album.rating.toFixed(1)}
          </span>
        </div>
      </Link>
      </motion.div>
    </motion.div>
  );
}
