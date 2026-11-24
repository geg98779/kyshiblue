import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — 联系我",
  description: "与 KYSHIBLUE 建立联系：GitHub、Email、Instagram。",
};

const channels = [
  {
    label: "GitHub",
    value: "github.com/kyshiblue",
    href: "https://github.com",
    note: "代码、项目、实验",
  },
  {
    label: "Email",
    value: "hello@kyshiblue.world",
    href: "mailto:hello@kyshiblue.world",
    note: "合作、聊天、一切正事",
  },
  {
    label: "Instagram",
    value: "@kyshiblue",
    href: "https://instagram.com",
    note: "视觉、日常、审美碎片",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      <p className="section-label">Contact</p>
      <h1 className="display-title mt-4 text-5xl md:text-8xl">
        建立<span className="text-stroke">联系</span>
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        聊音乐、聊代码、聊合作——选一个频率。
      </p>

      <div className="mt-16 space-y-px">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 border border-transparent border-b-[#1f1f1f] py-8 transition-all duration-300 hover:border-[#2a2a2a] hover:bg-dark-gray/50 hover:px-6 md:flex-row md:items-baseline md:gap-10"
          >
            <span className="w-40 shrink-0 font-mono text-xs tracking-brutal text-bone">
              {c.label}
            </span>
            <span className="font-display text-2xl tracking-wide text-bone md:text-4xl">
              {c.value}
            </span>
            <span className="font-mono text-xs text-muted md:ml-auto">{c.note}</span>
          </a>
        ))}
      </div>

      <p className="mt-20 font-mono text-[10px] tracking-brutal text-muted">
        No rules. Just Kyshiblue.
      </p>
    </div>
  );
}
