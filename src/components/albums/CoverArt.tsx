import type { CoverSpec } from "@/types";

/**
 * 专辑封面：有真实封面图时优先使用；没有则回退到程序化封面。
 * 视觉方向：Dark Psychedelic × Gothic Futurism
 */
export default function CoverArt({
  cover,
  coverImage,
  title,
  artistName,
  className = "",
}: {
  cover: CoverSpec;
  coverImage?: string;
  title: string;
  artistName: string;
  className?: string;
}) {
  if (coverImage) {
    return (
      <div
        className={`relative aspect-square w-full overflow-hidden ${className}`}
        style={{ background: `linear-gradient(135deg, ${cover.from}, ${cover.to})` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage}
          alt={`${title} — ${artistName}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 暗角，融入整体暗黑科技氛围 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(5,5,5,0.35)_100%)]" />
      </div>
    );
  }

  const id = `g-${title.replace(/\W+/g, "-")}`;

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${cover.from} 0%, ${cover.to} 100%)`,
      }}
      role="img"
      aria-label={`${title} — ${artistName}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id={id} cx="50%" cy="40%" r="75%">
            <stop offset="0%" stopColor={cover.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={cover.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill={`url(#${id})`} />
        {cover.pattern === "rings" && (
          <g fill="none" stroke={cover.accent} strokeOpacity="0.5">
            {[40, 80, 120, 160].map((r) => (
              <circle key={r} cx="200" cy="180" r={r} strokeWidth="1.5" />
            ))}
          </g>
        )}
        {cover.pattern === "bars" && (
          <g fill={cover.accent} fillOpacity="0.4">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={30 + i * 50}
                y={0}
                width="14"
                height={400}
                transform={`skewX(-12)`}
              />
            ))}
          </g>
        )}
        {cover.pattern === "grid" && (
          <g stroke={cover.accent} strokeOpacity="0.35" strokeWidth="1">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`v${i}`} x1={40 * (i + 1)} y1="0" x2={40 * (i + 1)} y2="400" />
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={40 * (i + 1)} x2="400" y2={40 * (i + 1)} />
            ))}
          </g>
        )}
        {cover.pattern === "slash" && (
          <g stroke={cover.accent} strokeOpacity="0.6">
            <line x1="-40" y1="440" x2="440" y2="-40" strokeWidth="10" />
            <line x1="-40" y1="380" x2="380" y2="-40" strokeWidth="3" />
            <line x1="20" y1="440" x2="440" y2="20" strokeWidth="3" />
          </g>
        )}
        {cover.pattern === "halo" && (
          <g>
            <ellipse cx="200" cy="180" rx="150" ry="46" fill="none" stroke={cover.accent} strokeOpacity="0.7" strokeWidth="2" />
            <ellipse cx="200" cy="180" rx="110" ry="30" fill="none" stroke={cover.accent} strokeOpacity="0.4" strokeWidth="1.5" />
            <circle cx="200" cy="180" r="34" fill={cover.accent} fillOpacity="0.25" />
          </g>
        )}
        {cover.pattern === "noise" && (
          <g fill={cover.accent}>
            {Array.from({ length: 60 }, (_, i) => {
              const x = (i * 97) % 400;
              const y = (i * 61) % 400;
              const s = 1 + ((i * 13) % 4);
              return <rect key={i} x={x} y={y} width={s} height={s} fillOpacity="0.5" />;
            })}
          </g>
        )}
      </svg>

      {/* 文字排版层 */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-mono text-[10px] tracking-[0.3em] text-bone/60">
          {artistName}
        </p>
        <p className="mt-1 font-display text-sm leading-tight tracking-wide text-bone drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {title}
        </p>
      </div>

      {/* 暗角 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,5,5,0.55)_100%)]" />
    </div>
  );
}
