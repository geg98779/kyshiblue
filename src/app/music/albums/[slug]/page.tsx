import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { albums, getAlbum } from "@/data/albums";
import { getArtist } from "@/data/artists";
import { getGenre } from "@/data/genres";
import { tracks } from "@/data/tracks";
import CoverArt from "@/components/albums/CoverArt";
import AlbumCard from "@/components/albums/AlbumCard";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const album = getAlbum(params.slug);
  if (!album) return { title: "Not found" };
  return {
    title: `${album.title} — ${album.artistName}`,
    description: album.review,
  };
}

export default function AlbumDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const album = getAlbum(params.slug);
  if (!album) notFound();

  const artist = getArtist(album.artist);
  const albumTracks = tracks.filter((t) => t.album === album.slug);
  const related = albums
    .filter((a) => a.slug !== album.slug && a.genres.some((g) => album.genres.includes(g)))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      {/* 返回 */}
      <Link
        href="/music"
        className="font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone"
      >
        ← Back to the archive
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* 封面 */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-[#222] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
            <CoverArt cover={album.cover} coverImage={album.coverImage} title={album.title} artistName={album.artistName} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {album.links.spotify && (
              <ExtLink href={album.links.spotify}>Spotify ↗</ExtLink>
            )}
            {album.links.youtube && (
              <ExtLink href={album.links.youtube}>YouTube ↗</ExtLink>
            )}
            {album.links.apple && (
              <ExtLink href={album.links.apple}>Apple Music ↗</ExtLink>
            )}
          </div>
        </div>

        {/* 信息 */}
        <div>
          <p className="section-label">
            {album.year} · Rating {album.rating.toFixed(1)}
          </p>
          <h1 className="display-title mt-4 text-4xl leading-tight md:text-6xl">
            {album.title}
          </h1>
          {artist ? (
            <Link
              href={`/music/artists/${artist.slug}`}
              className="mt-3 inline-block font-mono text-sm tracking-brutal text-bone"
            >
              {album.artistName} →
            </Link>
          ) : (
            <p className="mt-3 font-mono text-sm tracking-brutal text-muted">
              {album.artistName}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {album.genres.map((g) => {
              const genre = getGenre(g);
              return (
                <span
                  key={g}
                  className="border border-[#2a2a2a] px-3 py-1 font-mono text-[10px] tracking-brutal text-muted"
                >
                  {(genre?.name ?? g)}
                </span>
              );
            })}
          </div>

          <Section title="个人评价">
            <p className="text-lg leading-relaxed text-bone/85">{album.review}</p>
          </Section>

          <Section title="收藏理由">
            <p className="leading-relaxed text-muted">{album.reason}</p>
          </Section>

          <Section title="喜欢的歌">
            <ul className="space-y-2">
              {album.favoriteTracks.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 border-b border-[#1f1f1f] pb-2 text-bone/80"
                >
                  <span className="h-1 w-1 bg-bone" />
                  {t}
                </li>
              ))}
            </ul>
          </Section>

          {albumTracks.length > 0 && (
            <Section title="档案中的单曲笔记">
              <ul className="space-y-4">
                {albumTracks.map((t) => (
                  <li key={t.slug} className="border-l-2 border-[#3a3a40] pl-4">
                    <p className="font-display text-sm tracking-wide text-bone">
                      {t.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{t.feeling}</p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>

      {/* 相关专辑 */}
      {related.length > 0 && (
        <section className="mt-28">
          <p className="section-label">More from the void</p>
          <h2 className="display-title mt-4 text-2xl md:text-4xl">相邻频率</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map((a, i) => (
              <AlbumCard key={a.slug} album={a} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-xs tracking-brutal text-bone">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#2a2a2a] px-4 py-2 font-mono text-xs tracking-brutal text-muted transition-colors hover:border-[#3a3a40] hover:text-bone"
    >
      {children}
    </a>
  );
}
