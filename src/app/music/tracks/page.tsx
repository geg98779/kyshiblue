import type { Metadata } from "next";
import TrackExplorer from "@/components/music/TrackExplorer";
import { tracks } from "@/data/tracks";

export const metadata: Metadata = {
  title: "Tracks — 单曲档案",
  description: "KYSHIBLUE 的单曲收藏与私人笔记。",
};

export default function TracksPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-32">
      <p className="section-label">Tracks</p>
      <h1 className="display-title mt-4 text-5xl md:text-7xl">
        单曲<span className="text-stroke">档案</span>
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        每首歌都有一句私人注脚。按风格、艺术家筛选，或直接搜索。
      </p>
      <TrackExplorer tracks={tracks} />
    </div>
  );
}
