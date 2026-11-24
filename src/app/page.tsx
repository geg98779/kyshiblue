import Link from "next/link";
import Gate from "@/components/gate/Gate";
import SignalLab from "@/components/signal/SignalLab";
import AlbumCard from "@/components/albums/AlbumCard";
import {
  getFeaturedAlbums,
  getNewBloodAlbums,
  albums,
} from "@/data/albums";
import { getRecentTracks } from "@/data/tracks";
import { artists, chineseArtists } from "@/data/artists";

export default function Home() {
  const featured = getFeaturedAlbums();
  const newBlood = getNewBloodAlbums();
  const tracks = getRecentTracks(6);
  const chineseAlbums = albums.filter((a) =>
    a.genres.includes("chinese-hip-hop"),
  );
  const pantheon = [
    ...artists.filter((a) => !a.genres.includes("chinese-hip-hop")).slice(0, 6),
    ...chineseArtists,
  ];

  return (
    <>
      <Gate />
      <SignalLab />
      {/* 简介 */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <p className="intro-eyebrow section-label">KYSHIBLUE</p>
        <h2 className="intro-heading display-title mt-6 max-w-4xl text-4xl md:text-6xl">
          <span className="intro-line">
            <span className="intro-outline">Sipping </span>
            <span className="intro-solid">on the blue</span>
          </span>
          <span className="intro-line">
            <span className="intro-solid">Young Kysh </span>
            <span className="intro-outline">making a move</span>
          </span>
          <span className="intro-line">
            <span className="intro-outline">Make me </span>
            <span className="intro-solid">outta the hood</span>
          </span>
        </h2>
        <p className="intro-description mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          KYSHIBLUE is an ever-evolving digital universe. Rooted in Hip-Hop,
          street culture, and music production. A continuous experiment at the
          intersection of code, sound, and chaos.
        </p>
        <Link
          href="/about"
          className="intro-link mt-8 inline-block font-mono text-xs tracking-brutal text-bone"
        >
          Read the manifesto →
        </Link>
      </section>

      {/* Featured Albums */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="section-label">Featured</p>
            <h2 className="display-title mt-4 text-3xl md:text-5xl">Relics</h2>
          </div>
          <Link
            href="/music"
            className="hidden font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone md:block"
          >
            Enter the archive →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {featured.map((a, i) => (
            <AlbumCard key={a.slug} album={a} index={i} />
          ))}
        </div>
      </section>

      {/* 中文说唱专区 */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between border-l-2 border-[#3a3a40] pl-5">
          <div>
            <p className="section-label">Mandarin rap / 中文说唱</p>
            <h2 className="display-title mt-4 text-3xl md:text-5xl">
              从<span className="text-bone">小镇</span>到地下
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone md:block"
          >
            All records →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {chineseAlbums.map((a, i) => (
            <AlbumCard key={a.slug} album={a} index={i} />
          ))}
        </div>
      </section>

      {/* Favorite Tracks */}
      <section className="border-y border-[#1a1a1a] bg-dark-gray/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="section-label">On repeat</p>
          <h2 className="display-title mt-4 text-3xl md:text-5xl">循环单曲</h2>
          <ul className="mt-10 divide-y divide-[#222]">
            {tracks.map((t, i) => (
              <li key={t.slug}>
                <Link
                  href={t.album ? `/music/albums/${t.album}` : "/music/tracks"}
                  className="group flex items-baseline gap-6 py-4 transition-colors"
                >
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg tracking-wide text-bone md:text-2xl">
                    {t.title}
                  </span>
                  <span className="hidden font-mono text-xs text-muted md:inline">
                    {t.artistName}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {t.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Favorite Artists */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="section-label">The pantheon</p>
        <h2 className="display-title mt-4 text-3xl md:text-5xl">音乐人神殿</h2>
        <div className="mt-10 grid grid-cols-2 gap-px bg-[#1f1f1f] md:grid-cols-5">
          {pantheon.map((a) => (
            <Link
              key={a.slug}
              href={`/music/artists/${a.slug}`}
              className="group bg-void p-6 transition-colors duration-500 hover:bg-white/5"
            >
              <p className="font-display text-sm tracking-wide text-bone">
                {a.name}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-brutal text-muted">
                {a.role}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="section-label">AOTY</p>
            <h2 className="display-title mt-4 text-3xl md:text-5xl">
              New bloods
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {newBlood.map((a, i) => (
            <AlbumCard key={a.slug} album={a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
