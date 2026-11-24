export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="font-display text-2xl tracking-[0.2em] text-bone">
            KYSHI<span className="text-chrome">BLUE</span>
          </p>
          <p className="mt-2 font-mono text-xs tracking-brutal text-muted">
            Code. Music. Culture. Life.
          </p>
        </div>
        <p className="font-mono text-xs text-muted">
          Don&apos;t just browse. Explore the world. — © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
