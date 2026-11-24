"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * SIGNAL LAB — 五个互动模块
 * 1. Current Signal  当前状态
 * 2. Taste Signal    审美频率测试
 * 3. Signal Generator 可调视觉信号
 * 4. Under the Hood   技术面板
 * 5. Open Channel     低门槛联系
 */

const EMAIL = "hello@kyshiblue.world";

type Archetype = "architect" | "ghost" | "believer" | "drifter";

const SOUND_OPTIONS: { label: string; archetype: Archetype }[] = [
  { label: "Boom Bap", archetype: "architect" },
  { label: "Trap", archetype: "believer" },
  { label: "Underground", archetype: "ghost" },
  { label: "Experimental", archetype: "drifter" },
];

const MOOD_OPTIONS: { label: string; archetype: Archetype }[] = [
  { label: "Cold", archetype: "ghost" },
  { label: "Loud", archetype: "believer" },
  { label: "Quiet", archetype: "drifter" },
  { label: "Broken", archetype: "architect" },
];

const VISUAL_OPTIONS: { label: string; archetype: Archetype }[] = [
  { label: "Chrome", archetype: "ghost" },
  { label: "Grain", archetype: "drifter" },
  { label: "Glitch", archetype: "believer" },
  { label: "Negative space", archetype: "architect" },
];

const ARCHETYPES: Record<
  Archetype,
  { title: string; description: string; album: string; visual: string }
> = {
  architect: {
    title: "The Architect",
    description: "You trust structure more than decoration. You like when a beat feels engineered.",
    album: "Illmatic",
    visual: "Cold grid / precise type",
  },
  ghost: {
    title: "The Ghost",
    description: "You are drawn to restraint, cold surfaces, and things that almost disappear.",
    album: "Controll1001",
    visual: "Chrome / negative space",
  },
  believer: {
    title: "The Believer",
    description: "You like noise, pressure, and sound that feels like it believes in something.",
    album: "佛哦佛",
    visual: "Glitch / heavy grain",
  },
  drifter: {
    title: "The Drifter",
    description: "You follow texture and mood more than genre. You like records that breathe.",
    album: "流水平静之前",
    visual: "Grain / soft blue",
  },
};

export default function SignalLab() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-4" aria-label="Signal lab">
      <header className="mb-10">
        <p className="section-label">Signal lab</p>
        <h2 className="display-title mt-4 text-4xl md:text-6xl">
          Don&apos;t just <span className="text-stroke">look</span>. Interact.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          这个网站不是一张静态海报。你可以测自己的审美频率、调一个视觉信号、看它怎么跑起来，然后直接给我发一封不用想开场白的邮件。
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <CurrentSignal />
        <TasteSignal />
        <SignalGenerator />
        <UnderTheHood />
        <OpenChannel />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   1. CURRENT SIGNAL
   ──────────────────────────────────────────────── */

function CurrentSignal() {
  const rows = [
    { label: "Now listening", value: "Controll1001" },
    { label: "Building", value: "Taste Signal v0.1" },
    { label: "Thinking about", value: "Interfaces with mood" },
    { label: "Open to", value: "Collabs / frontend / visual systems" },
  ];

  return (
    <article className="signal-card group relative overflow-hidden border border-[#2a2a2a] bg-dark-gray/40 p-6 transition-colors duration-500 hover:border-[#3a3a40]">
      <p className="section-label">Current signal</p>
      <h3 className="mt-4 font-display text-2xl tracking-wide text-bone">
        Alive, not archived
      </h3>
      <div className="mt-6 space-y-4">
        {rows.map((r) => (
          <div
            key={r.label}
            className="group/row flex items-baseline justify-between gap-4 border-b border-[#222] pb-3 transition-all duration-300 hover:border-[#4b6c82] hover:pl-1"
          >
            <span className="font-mono text-[10px] tracking-brutal text-muted">
              {r.label}
            </span>
            <span className="text-right text-sm text-bone/80">{r.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-brutal text-muted">
        Updated whenever something changes the way I hear.
      </p>
    </article>
  );
}

/* ────────────────────────────────────────────────
   2. TASTE SIGNAL
   ──────────────────────────────────────────────── */

function TasteSignal() {
  const [sound, setSound] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [visual, setVisual] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!sound || !mood || !visual) return null;

    const choices: Archetype[] = [
      SOUND_OPTIONS.find((o) => o.label === sound)?.archetype ?? "ghost",
      MOOD_OPTIONS.find((o) => o.label === mood)?.archetype ?? "ghost",
      VISUAL_OPTIONS.find((o) => o.label === visual)?.archetype ?? "ghost",
    ];

    const counts = choices.reduce<Record<string, number>>((acc, a) => {
      acc[a] = (acc[a] ?? 0) + 1;
      return acc;
    }, {});

    const [archetype, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const match = Math.min(94, 70 + (count - 1) * 11);
    const info = ARCHETYPES[archetype as Archetype];

    return { archetype: archetype as Archetype, match, info };
  }, [sound, mood, visual]);

  const signalText = result
    ? `You are ${result.match}% KYSHIBLUE.\n${result.info.title}\n${result.info.description}\nEntry point: ${result.info.album}\nVisual: ${result.info.visual}`
    : "";

  const mailto = result
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(
        `KYSHIBLUE signal from a ${result.match}% match`
      )}&body=${encodeURIComponent(`${signalText}\n\nI want to talk because: `)}`
    : "#";

  return (
    <article className="signal-card relative border border-[#2a2a2a] bg-dark-gray/40 p-6 transition-colors duration-500 hover:border-[#3a3a40]">
      <p className="section-label">Taste signal</p>
      <h3 className="mt-4 font-display text-2xl tracking-wide text-bone">
        Find your frequency
      </h3>

      <div className="mt-6 space-y-6">
        <Question
          title="Sound"
          options={SOUND_OPTIONS}
          selected={sound}
          onSelect={setSound}
        />
        <Question
          title="Mood"
          options={MOOD_OPTIONS}
          selected={mood}
          onSelect={setMood}
        />
        <Question
          title="Visual"
          options={VISUAL_OPTIONS}
          selected={visual}
          onSelect={setVisual}
        />
      </div>

      {result ? (
        <div className="mt-8 border-t border-[#222] pt-6">
          <p className="font-mono text-[10px] tracking-brutal text-muted">
            You are
          </p>
          <p className="display-title mt-1 text-4xl text-bone">
            {result.match}% KYSHIBLUE
          </p>
          <h4 className="mt-5 font-display text-xl tracking-wide text-bone">
            {result.info.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {result.info.description}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-mono text-[10px] tracking-brutal text-muted">
                Entry point
              </p>
              <p className="mt-1 text-bone/80">{result.info.album}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-brutal text-muted">
                Visual
              </p>
              <p className="mt-1 text-bone/80">{result.info.visual}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={mailto}
              className="border border-[#3a3a40] bg-void/60 px-5 py-3 font-mono text-xs tracking-brutal text-bone transition-all duration-300 hover:border-[#4b6c82] hover:text-[#BFEFFF]"
            >
              Send me your result →
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(signalText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  setCopied(false);
                }
              }}
              className="border border-[#2a2a2a] px-5 py-3 font-mono text-xs tracking-brutal text-muted transition-all duration-300 hover:border-[#3a3a40] hover:text-bone"
            >
              {copied ? "Copied ✓" : "Copy my signal"}
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-8 font-mono text-[10px] tracking-brutal text-muted">
          Pick one answer in each row.
        </p>
      )}
    </article>
  );
}

function Question({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: { label: string; archetype: Archetype }[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-brutal text-muted">{title}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((o) => {
          const active = selected === o.label;
          return (
            <button
              key={o.label}
              type="button"
              onClick={() => onSelect(o.label)}
              className={`border px-3 py-2.5 text-left font-mono text-xs tracking-brutal transition-all duration-300 ${
                active
                  ? "border-[#4b6c82] bg-[#0f1620] text-[#BFEFFF]"
                  : "border-[#2a2a2a] text-muted hover:border-[#3a3a40] hover:text-bone"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   3. SIGNAL GENERATOR
   ──────────────────────────────────────────────── */

function SignalGenerator() {
  const [warmth, setWarmth] = useState(20);
  const [grain, setGrain] = useState(65);
  const [tension, setTension] = useState(45);

  const cold = 1 - warmth / 100;
  const blue = 0.18 + (1 - cold) * 0.28;
  const violet = 0.35 + (tension / 100) * 0.35;
  const contrast = 0.85 + (grain / 100) * 0.45;
  const saturation = 0.65 + (warmth / 100) * 0.55;

  const style =
    warmth < 35 ? "COLD" : warmth > 70 ? "WARM" : "COOL";
  const texture = grain < 35 ? "CLEAN" : grain > 70 ? "BROKEN" : "GRAINED";
  const mood = tension < 35 ? "CALM" : tension > 70 ? "TENSE" : "STABLE";
  const match = Math.round(60 + (100 - Math.abs(50 - warmth) / 2) * 0.2);

  return (
    <article className="signal-card relative border border-[#2a2a2a] bg-dark-gray/40 p-6 transition-colors duration-500 hover:border-[#3a3a40]">
      <p className="section-label">Signal generator</p>
      <h3 className="mt-4 font-display text-2xl tracking-wide text-bone">
        Tune a visual signal
      </h3>

      <div
        className="relative mt-6 aspect-[4/3] overflow-hidden border border-[#222]"
        style={{
          background: `radial-gradient(circle at 28% 22%, rgba(0, 212, 255, ${blue}), transparent 58%), linear-gradient(135deg, rgba(5, 5, 5, 1), rgba(48, 20, 63, ${violet}))`,
          filter: `contrast(${contrast}) saturate(${saturation})`,
        }}
      >
        <div className="absolute inset-0 scanlines" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p className="font-mono text-[10px] tracking-brutal text-bone/70">
            {style} / {texture} / {mood}
          </p>
          <p className="mt-2 font-display text-3xl tracking-wide text-bone">
            {match}% signal
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <Slider
          label="Warmth"
          value={warmth}
          onChange={setWarmth}
          left="Cold"
          right="Warm"
        />
        <Slider
          label="Grain"
          value={grain}
          onChange={setGrain}
          left="Clean"
          right="Broken"
        />
        <Slider
          label="Tension"
          value={tension}
          onChange={setTension}
          left="Calm"
          right="Tense"
        />
      </div>

      <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-brutal text-muted">
        The card changes live. No page reload.
      </p>
    </article>
  );
}

function Slider({
  label,
  value,
  onChange,
  left,
  right,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  left: string;
  right: string;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between font-mono text-[10px] tracking-brutal text-muted">
        <span>{label}</span>
        <span>
          {left} / {right}
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#4b6c82]"
        aria-label={label}
      />
    </label>
  );
}

/* ────────────────────────────────────────────────
   4. UNDER THE HOOD
   ──────────────────────────────────────────────── */

function UnderTheHood() {
  const [stats, setStats] = useState({ fps: 0, dpr: 1, canvases: 0 });
  const frame = useRef(0);
  const last = useRef(performance.now());
  const count = useRef(0);

  useEffect(() => {
    const update = () => {
      count.current += 1;
      const now = performance.now();
      if (now - last.current >= 500) {
        const fps = Math.round((count.current * 1000) / (now - last.current));
        setStats({
          fps,
          dpr: window.devicePixelRatio,
          canvases: document.querySelectorAll("canvas").length,
        });
        count.current = 0;
        last.current = now;
      }
      frame.current = requestAnimationFrame(update);
    };

    frame.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const rows = [
    { label: "FPS", value: `${stats.fps}` },
    { label: "DPR", value: `${stats.dpr}` },
    { label: "Canvas", value: `${stats.canvases}` },
    { label: "Framework", value: "Next.js 14" },
    { label: "3D", value: "R3F / Three.js" },
    { label: "Motion", value: "GSAP / Framer" },
  ];

  return (
    <article className="signal-card relative border border-[#2a2a2a] bg-dark-gray/40 p-6 transition-colors duration-500 hover:border-[#3a3a40]">
      <p className="section-label">Under the hood</p>
      <h3 className="mt-4 font-display text-2xl tracking-wide text-bone">
        It runs, not just renders
      </h3>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {rows.map((r) => (
          <div key={r.label} className="border border-[#222] p-3">
            <p className="font-mono text-[10px] tracking-brutal text-muted">
              {r.label}
            </p>
            <p className="mt-1 text-sm text-bone/80">{r.value}</p>
          </div>
        ))}
      </div>

      <pre className="mt-6 overflow-x-auto border border-[#222] bg-[#080808] p-4 font-mono text-[10px] leading-relaxed text-bone/70">
        <code>{`useFrame(({ camera, clock }) => {
  const t = clock.getElapsedTime();
  const targetZ = 9 - dollyRef.current;
  camera.position.z += (targetZ - camera.position.z) * 0.06;
});`}</code>
      </pre>

      <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-brutal text-muted">
        Live numbers come from the page you are on.
      </p>
    </article>
  );
}

/* ────────────────────────────────────────────────
   5. OPEN CHANNEL
   ──────────────────────────────────────────────── */

function OpenChannel() {
  const intents = [
    "I want to collaborate",
    "I like your taste",
    "I want to build something",
    "I just want to say something",
  ];
  const vibes = ["Cold", "Loud", "Quiet", "Broken", "Precise"];
  const [intent, setIntent] = useState(intents[0]);
  const [vibe, setVibe] = useState(vibes[4]);
  const [message, setMessage] = useState("");

  const body = `Intent: ${intent}\nVibe: ${vibe}\n\n${message}`;
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Open a channel — KYSHIBLUE"
  )}&body=${encodeURIComponent(body)}`;

  return (
    <article className="signal-card relative border border-[#2a2a2a] bg-dark-gray/40 p-6 transition-colors duration-500 hover:border-[#3a3a40] lg:col-span-2">
      <p className="section-label">Open channel</p>
      <h3 className="mt-4 font-display text-2xl tracking-wide text-bone">
        Skip the awkward opener
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        选一个来意、带一种氛围，写一句话。我这边收到的是一封已经整理好的邮件，不是空白表单。
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] tracking-brutal text-muted">Intent</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {intents.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIntent(i)}
                className={`border px-3 py-2 font-mono text-[10px] tracking-brutal transition-all duration-300 ${
                  intent === i
                    ? "border-[#4b6c82] bg-[#0f1620] text-[#BFEFFF]"
                    : "border-[#2a2a2a] text-muted hover:border-[#3a3a40] hover:text-bone"
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-brutal text-muted">Vibe</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {vibes.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVibe(v)}
                className={`border px-3 py-2 font-mono text-[10px] tracking-brutal transition-all duration-300 ${
                  vibe === v
                    ? "border-[#4b6c82] bg-[#0f1620] text-[#BFEFFF]"
                    : "border-[#2a2a2a] text-muted hover:border-[#3a3a40] hover:text-bone"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-mono text-[10px] tracking-brutal text-muted" htmlFor="open-channel-message">
            One line
          </label>
          <textarea
            id="open-channel-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Write one honest sentence."
            className="mt-3 w-full resize-none border border-[#2a2a2a] bg-transparent p-4 font-mono text-xs tracking-brutal text-bone placeholder:text-muted focus:border-[#3a3a40] focus:outline-none"
          />
          <a
            href={href}
            className="mt-4 inline-block w-max border border-[#3a3a40] bg-void/60 px-6 py-3 font-mono text-xs tracking-brutal text-bone transition-all duration-300 hover:border-[#4b6c82] hover:text-[#BFEFFF]"
          >
            Open mail client →
          </a>
        </div>
      </div>
    </article>
  );
}
