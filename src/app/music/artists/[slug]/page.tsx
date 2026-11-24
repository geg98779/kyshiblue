import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists, getArtist } from "@/data/artists";
import { albums, getAlbum } from "@/data/albums";
import { tracks } from "@/data/tracks";
import { getGenre } from "@/data/genres";
import AlbumCard from "@/components/albums/AlbumCard";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const artist = getArtist(params.slug);
  if (!artist) return { title: "Not found" };
  return { title: artist.name, description: artist.bio };
}

export default function ArtistDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();

  const archiveAlbums = albums.filter((a) => a.artist === artist.slug);
  const archiveTracks = tracks.filter((t) => t.artist === artist.slug);
  const recommended = artist.recommendedAlbums
    .map((s) => getAlbum(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      <Link
        href="/music/artists"
        className="font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone"
      >
        ← All artists
      </Link>

      <header className="mt-10 border-b border-[#1f1f1f] pb-12">
        <p className="section-label">
          {artist.role} · {artist.origin}
        </p>
        <h1 className="display-title mt-4 text-5xl md:text-8xl">{artist.name}</h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {artist.genres.map((g) => (
            <span
              key={g}
              className="border border-[#2a2a2a] px-3 py-1 font-mono text-[10px] tracking-brutal text-muted"
            >
              {(getGenre(g)?.name ?? g)}
            </span>
          ))}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-mono text-xs tracking-brutal text-bone">档案</h2>
          <p className="mt-4 text-lg leading-relaxed text-bone/85">{artist.bio}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs tracking-brutal text-bone">
            我的评价
          </h2>
          <blockquote className="mt-4 border-l-2 border-[#3a3a40] pl-5 text-lg italic leading-relaxed text-muted">
            “{artist.verdict}”
          </blockquote>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-brutal text-bone">
          必听曲目
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {artist.essentialTracks.map((t) => (
            <li
              key={t}
              className="border border-[#2a2a2a] px-4 py-2 font-mono text-xs tracking-brutal text-bone/80"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {recommended.length > 0 && (
        <section className="mt-20">
          <h2 className="font-mono text-xs tracking-brutal text-bone">
            推荐专辑 · 已在档案馆
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {recommended.map((a, i) => (
              <AlbumCard key={a.slug} album={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {archiveTracks.length > 0 && (
        <section className="mt-20">
          <h2 className="font-mono text-xs tracking-brutal text-bone">
            档案中的单曲笔记
          </h2>
          <ul className="mt-6 space-y-4">
            {archiveTracks.map((t) => (
              <li key={t.slug} className="border-l-2 border-[#3a3a40] pl-4">
                <p className="font-display text-sm tracking-wide text-bone">
                  {t.title}
                  <span className="ml-3 font-mono text-[10px] text-muted">{t.year}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{t.feeling}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {archiveAlbums.length === 0 && recommended.length === 0 && (
        <p className="mt-16 font-mono text-xs tracking-brutal text-muted">
          更多档案整理中…
        </p>
      )}
    </div>
  );
}
