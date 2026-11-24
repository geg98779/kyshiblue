export interface Genre {
  slug: string;
  name: string;
  description: string;
}

export interface Album {
  slug: string;
  title: string;
  artist: string; // artist slug
  artistName: string;
  year: number;
  genres: string[]; // genre slugs
  cover: CoverSpec;
  /** 真实封面路径（/images/albums/xxx.jpg），存在时优先于程序化封面 */
  coverImage?: string;
  rating: number; // personal rating 0-10
  review: string; // 个人评价
  reason: string; // 收藏理由
  favoriteTracks: string[];
  links: {
    spotify?: string;
    youtube?: string;
    apple?: string;
  };
  featured?: boolean;
  /** 显式控制首页 New bloods 区块是否显示，不按 addedAt 自动筛选 */
  newBlood?: boolean;
  addedAt: string; // ISO date
}

export interface Track {
  slug: string;
  title: string;
  artist: string; // artist slug
  artistName: string;
  album?: string; // album slug
  albumTitle?: string;
  year: number;
  genres: string[];
  feeling: string; // 个人感受
  links: {
    spotify?: string;
    youtube?: string;
  };
  addedAt: string;
}

export interface Artist {
  slug: string;
  name: string;
  role: string; // Rapper / Producer / Duo ...
  origin: string;
  genres: string[];
  bio: string;
  verdict: string; // 个人评价
  recommendedAlbums: string[]; // album slugs or free text
  essentialTracks: string[];
}

/** 程序化封面：不依赖外部图片，由参数生成渐变 + 排版 */
export interface CoverSpec {
  /** 主色调（hex），用于渐变起点 */
  from: string;
  /** 渐变终点 */
  to: string;
  /** 点缀色 */
  accent: string;
  /** 排版模式 */
  pattern: "rings" | "bars" | "grid" | "slash" | "halo" | "noise";
}
