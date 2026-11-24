import type { Genre } from "@/types";

export const genres: Genre[] = [
  {
    slug: "hip-hop",
    name: "Hip-Hop",
    description: "一切的起点。从 Bronx 到全世界。",
  },
  {
    slug: "boom-bap",
    name: "Boom Bap",
    description: "90 年代东海岸的鼓点美学， dusty drums 与采样灵魂。",
  },
  {
    slug: "memphis-rap",
    name: "Memphis Rap",
    description: "黑暗、低保真、邪典气质，现代 Trap 的地下源头。",
  },
  {
    slug: "trap",
    name: "Trap",
    description: "亚特兰大之声，808 与 hi-hat 滚奏统治的时代。",
  },
  {
    slug: "r-and-b",
    name: "R&B",
    description: "旋律与灵魂，说唱之外的情绪出口。",
  },
  {
    slug: "jazz-rap",
    name: "Jazz Rap",
    description: "爵士采样与说唱的黄金交叉点。",
  },
  {
    slug: "underground",
    name: "Underground Hip-Hop",
    description: "不讨好主流的声音，最纯粹的表达。",
  },
  {
    slug: "alternative",
    name: "Alternative Hip-Hop",
    description: "打破类型边界的实验说唱。",
  },
  {
    slug: "chinese-hip-hop",
    name: "中文说唱",
    description: "从 DIGI GHETTO 到地下场景，中文语境里的野心、市井与实验。",
  },
];

export function getGenre(slug: string): Genre | undefined {
  return genres.find((g) => g.slug === slug);
}
