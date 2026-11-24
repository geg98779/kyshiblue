import type { MetadataRoute } from "next";
import { albums } from "@/data/albums";
import { artists } from "@/data/artists";

const BASE = "https://kyshiblue.world";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/music`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/music/tracks`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/music/artists`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.3 },
    ...albums.map((a) => ({
      url: `${BASE}/music/albums/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...artists.map((a) => ({
      url: `${BASE}/music/artists/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
