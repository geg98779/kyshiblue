import type { Metadata } from "next";
import ArchiveExplorer from "@/components/music/ArchiveExplorer";
import { albums } from "@/data/albums";

export const metadata: Metadata = {
  title: "The archive — 音乐档案馆",
  description:
    "KYSHIBLUE 的个人 Hip-Hop 音乐档案馆：专辑、单曲、音乐人与风格探索。",
};

export default function MusicPage() {
  return (
    <div className="pt-16">
      <header className="mx-auto max-w-7xl px-6 pb-10 pt-14">
        <p className="section-label">The archive</p>
        <h1 className="display-title mt-4 text-5xl md:text-7xl">
          音乐<span className="text-stroke">档案馆</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          一座漂浮在黑暗中的地下档案馆。滚动深入空间，Hover 查看信息，点击封面打开档案。
          也可以用下方的筛选与搜索直接定位。
        </p>
      </header>
      <ArchiveExplorer albums={albums} />
    </div>
  );
}
