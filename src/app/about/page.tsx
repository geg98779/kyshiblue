import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — 关于我",
  description: "KYSHIBLUE 是谁：音乐审美、兴趣与创作方向。",
};

const identities = [
  { tag: "Developer", desc: "软件开发、AI、后端工程。白天写代码，晚上也写代码。" },
  { tag: "Music lover", desc: "Hip-Hop 是母语。从 Boom Bap 到 Memphis，从 Dilla 到 Carti。" },
  { tag: "Culture enthusiast", desc: "Streetwear、Sneaker、摄影——视觉和声音是同一件事。" },
  { tag: "Creative explorer", desc: "AI 创作、视觉实验、视频。工具在变，表达欲不变。" },
  { tag: "Thinker", desc: "记录成长、旅行和生活方式。思考是最慢的创作。" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      <p className="section-label">About</p>
      <h1 className="display-title mt-4 max-w-4xl text-5xl leading-[0.95] md:text-8xl">
        不是简历。
        <br />
        <span className="text-stroke">是个人世界。</span>
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <section>
          <h2 className="font-mono text-xs tracking-brutal text-bone">
            The manifesto
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-bone/85">
            <p>
              KYSHIBLUE 从一座 Hip-Hop 档案馆开始。因为音乐是最诚实的自我介绍——
              你听什么，你就是什么。
            </p>
            <p>
              这里不追热点、不讨好算法。每张专辑、每首歌、每个音乐人，
              都是亲自听过、想过、才放进档案的。
            </p>
            <p className="font-mono text-sm tracking-brutal text-bone">
              Don&apos;t just browse. Explore the world.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs tracking-brutal text-bone">
            My music taste
          </h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              根源在 90 年代东海岸——Nas 的叙事、DJ Premier 的鼓、J Dilla 的律动。
            </p>
            <p>
              同时沉迷于现代 Trap 与地下美学——Future 的痛苦旋律、Carti 的 Vamp 宇宙、
              Three 6 Mafia 的孟菲斯黑暗遗产。
            </p>
            <p>
              判断标准只有一条：这东西有没有自己的世界。技巧会过时，世界不会。
            </p>
          </div>
        </section>
      </div>

      <section className="mt-24">
        <h2 className="font-mono text-xs tracking-brutal text-bone">
          Five identities
        </h2>
        <div className="mt-8 grid gap-px bg-[#1f1f1f] md:grid-cols-5">
          {identities.map((i) => (
            <div key={i.tag} className="bg-void p-6 transition-colors duration-500 hover:bg-white/5">
              <p className="font-display text-sm tracking-wide text-bone">{i.tag}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 border border-[#222] p-10 md:p-16">
        <p className="section-label">Creative direction</p>
        <h2 className="display-title mt-6 text-3xl md:text-5xl">
          Code. Music. Culture. Life.
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          第一版是档案馆。接下来是录音室（THE STUDIO）、文化档案（THE CULTURE）、
          技术实验室（THE LAB）和个人博客。网站会随着人一起生长——
          这是长期项目，不是一次性作品。
        </p>
      </section>
    </div>
  );
}
