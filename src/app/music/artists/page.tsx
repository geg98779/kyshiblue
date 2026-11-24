import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/data/artists";

export const metadata: Metadata = {
  title: "Artists — 音乐人档案",
  description: "KYSHIBLUE 的音乐人与制作人档案。",
};

export default function ArtistsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      <p className="section-label">Artists</p>
      <h1 className="display-title mt-4 text-5xl md:text-7xl">
        音乐人<span className="text-stroke">神殿</span>
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        塑造这个宇宙的创作者们。点击名字进入个人档案。
      </p>

      <div className="mt-14 grid gap-px bg-[#1f1f1f] md:grid-cols-2">
        {artists.map((a) => (
          <Link
            key={a.slug}
            href={`/music/artists/${a.slug}`}
            className="group bg-void p-8 transition-colors duration-500 hover:bg-white/5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl tracking-wide text-bone md:text-3xl">
                {a.name}
              </h2>
              <span className="font-mono text-[10px] tracking-brutal text-muted">
                {a.origin}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs tracking-brutal text-bone/70">
              {a.role}
            </p>
            <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
              {a.bio}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
