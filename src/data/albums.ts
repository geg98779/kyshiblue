import type { Album } from "@/types";

const rawAlbums: Album[] = [
  {
    slug: "illmatic",
    title: "Illmatic",
    artist: "nas",
    artistName: "Nas",
    year: 1994,
    genres: ["hip-hop", "boom-bap"],
    cover: {
      from: "#1a1a2e",
      to: "#2E2438",
      accent: "#A8A8AD",
      pattern: "bars",
    },
    rating: 10,
    review:
      "说唱专辑的完美形态。十首歌，零废曲。Nas 用 20 岁的眼睛把 Queensbridge 写成了史诗。",
    reason: "如果要给外星人解释什么是 Hip-Hop，就放这张。",
    favoriteTracks: [
      "N.Y. State of Mind",
      "The World Is Yours",
      "One Love",
      "Represent",
    ],
    links: {
      spotify: "https://open.spotify.com/album/3kEtdS2pH6hKcMU9Wioob1",
      youtube: "https://www.youtube.com/results?search_query=nas+illmatic",
    },
    featured: true,
    addedAt: "2024-01-15",
  },
  {
    slug: "my-beautiful-dark-twisted-fantasy",
    title: "My Beautiful Dark Twisted Fantasy",
    artist: "kanye-west",
    artistName: "Kanye West",
    year: 2010,
    genres: ["hip-hop", "alternative"],
    cover: {
      from: "#2E2438",
      to: "#30143F",
      accent: "#E8E4DC",
      pattern: "halo",
    },
    rating: 10,
    review:
      "一场华丽的自我放逐与回归。管弦乐、灵魂采样和工业噪音在同一个宇宙里爆炸。",
    reason: "专辑制作的珠穆朗玛峰，每次听都能发现新的层次。",
    favoriteTracks: [
      "Runaway",
      "Dark Fantasy",
      "POWER",
      "All of the Lights",
      "Monster",
    ],
    links: {
      spotify: "https://open.spotify.com/album/20r762YmB5HeofjMCiPMLv",
      youtube: "https://www.youtube.com/results?search_query=mbdtf",
    },
    featured: true,
    addedAt: "2024-01-20",
  },
  {
    slug: "astroworld",
    title: "ASTROWORLD",
    artist: "travis-scott",
    artistName: "Travis Scott",
    year: 2018,
    genres: ["trap", "alternative"],
    cover: {
      from: "#30143F",
      to: "#050505",
      accent: "#8A8A95",
      pattern: "rings",
    },
    rating: 9,
    review:
      "一座用声音搭建的夜间游乐园。迷幻、轰鸣、失重——Travis 把 Trap 做成了沉浸式空间体验。",
    reason: "这个网站的视觉灵感来源之一。专辑即世界。",
    favoriteTracks: [
      "SICKO MODE",
      "STARGAZING",
      "STOP TRYING TO BE GOD",
      "90210",
    ],
    links: {
      spotify: "https://open.spotify.com/album/41GuZcammIkupMPKH2OJ6I",
      youtube:
        "https://www.youtube.com/results?search_query=travis+scott+astroworld",
    },
    featured: true,
    addedAt: "2024-02-02",
  },
  {
    slug: "whole-lotta-red",
    title: "Whole Lotta Red",
    artist: "playboi-carti",
    artistName: "Playboi Carti",
    year: 2020,
    genres: ["trap", "alternative"],
    cover: {
      from: "#050505",
      to: "#2E2438",
      accent: "#E8E4DC",
      pattern: "slash",
    },
    rating: 8.5,
    review:
      "黑与血的朋克宣言。Carti 把语言削到骨头，剩下的全是气场。第一遍刺耳，第十遍上头。",
    reason: "Vamp 美学的教科书，也是这个网站黑红配色的精神源头。",
    favoriteTracks: ["Sky", "Stop Breathing", "Rockstar Made", "Vamp Anthem"],
    links: {
      spotify: "https://open.spotify.com/album/2QRedhP5RmKJiJ1i8VgDGR",
      youtube:
        "https://www.youtube.com/results?search_query=playboi+carti+whole+lotta+red",
    },
    featured: true,
    addedAt: "2024-02-14",
  },
  {
    slug: "madvillainy",
    title: "Madvillainy",
    artist: "madlib",
    artistName: "Madvillain (MF DOOM × Madlib)",
    year: 2004,
    genres: ["underground", "alternative"],
    cover: {
      from: "#171717",
      to: "#2a2a2a",
      accent: "#A8A8AD",
      pattern: "grid",
    },
    rating: 10,
    review:
      "地下说唱的圣经。DOOM 的谜语人 flow 配上 Madlib 的炼金采样，20 年过去依然无人能复制。",
    reason: "实验性与听感的完美平衡，地下嘻哈的天花板。",
    favoriteTracks: [
      "Accordion",
      "Meat Grinder",
      "All Caps",
      "Rhinestone Cowboy",
    ],
    links: {
      spotify: "https://open.spotify.com/album/19bQiwEKhXUBJWY6oV3KZk",
      youtube: "https://www.youtube.com/results?search_query=madvillainy",
    },
    addedAt: "2024-03-01",
  },
  {
    slug: "donuts",
    title: "Donuts",
    artist: "j-dilla",
    artistName: "J Dilla",
    year: 2006,
    genres: ["boom-bap", "instrumental"],
    cover: {
      from: "#3d2b1f",
      to: "#171717",
      accent: "#8A8A95",
      pattern: "rings",
    },
    rating: 10,
    review:
      "病床上的告别信。31 个循环，每个 loop 都是一次心跳。器乐嘻哈最动人的作品。",
    reason: "采样艺术的终极形态——Dilla 用 MPC 写完了自己的一生。",
    favoriteTracks: [
      "Workinonit",
      "Two Can Win",
      "Don't Cry",
      "Time: The Donut of the Heart",
    ],
    links: {
      spotify: "https://open.spotify.com/album/5fM3sqFhz32T3S6NwMxACG",
      youtube: "https://www.youtube.com/results?search_query=j+dilla+donuts",
    },
    featured: true,
    addedAt: "2024-03-10",
  },
  {
    slug: "ds2",
    title: "DS2 (Dirty Sprite 2)",
    artist: "future",
    artistName: "Future",
    year: 2015,
    genres: ["trap"],
    cover: {
      from: "#1c0f24",
      to: "#30143F",
      accent: "#A8A8AD",
      pattern: "noise",
    },
    rating: 9,
    review:
      "Trap 的黑暗圣经。Future 在旋律里浸泡痛苦，Metro Boomin 的伴奏冷得像亚特兰大的夜。",
    reason: "理解现代 Trap 必须从这张开始。",
    favoriteTracks: [
      "March Madness",
      "Codeine Crazy",
      "Where Ya At",
      "Stick Talk",
    ],
    links: {
      spotify: "https://open.spotify.com/album/4P5UO2QbDHzFxBUnXuBQs8",
      youtube: "https://www.youtube.com/results?search_query=future+ds2",
    },
    addedAt: "2024-03-22",
  },
  {
    slug: "2014-forest-hills-drive",
    title: "2014 Forest Hills Drive",
    artist: "j-cole",
    artistName: "J. Cole",
    year: 2014,
    genres: ["hip-hop"],
    cover: {
      from: "#22301c",
      to: "#171717",
      accent: "#E8E4DC",
      pattern: "bars",
    },
    rating: 8.5,
    review: "Cole 回家之路。从童年地址出发，把成长、欲望和知足讲得干干净净。",
    reason: "叙事说唱的标杆——没有花招，全是真话。",
    favoriteTracks: [
      "January 28th",
      "No Role Modelz",
      "Love Yourz",
      "Apparently",
    ],
    links: {
      spotify: "https://open.spotify.com/album/7viNUmZZ8ztn2UB4XB3jIL",
      youtube:
        "https://www.youtube.com/results?search_query=2014+forest+hills+drive",
    },
    addedAt: "2024-04-05",
  },
  {
    slug: "rodeo",
    title: "Rodeo",
    artist: "travis-scott",
    artistName: "Travis Scott",
    year: 2015,
    genres: ["trap", "alternative"],
    cover: {
      from: "#241408",
      to: "#050505",
      accent: "#8A8A95",
      pattern: "slash",
    },
    rating: 9.5,
    review:
      "牛仔、汽油和肾上腺素。Travis 的第一座声音主题公园，比 ASTROWORLD 更野。",
    reason: "Nightcrawler 的 intro 每次响起，世界就暗下来。",
    favoriteTracks: ["Nightcrawler", "90210", "Antidote", "3500"],
    links: {
      spotify: "https://open.spotify.com/album/4PWBTB6NYSKsjfoGpI5OAh",
      youtube:
        "https://www.youtube.com/results?search_query=travis+scott+rodeo",
    },
    addedAt: "2024-04-18",
  },
  {
    slug: "most-known-unknown",
    title: "Most Known Unknown",
    artist: "three-6-mafia",
    artistName: "Three 6 Mafia",
    year: 2005,
    genres: ["memphis-rap"],
    cover: {
      from: "#12121a",
      to: "#050505",
      accent: "#2E2438",
      pattern: "halo",
    },
    rating: 8.5,
    review:
      "孟菲斯黑暗帝国的巅峰。恐怖配乐式的 loop 和催眠的 chant，是 Phonk 的直系祖先。",
    reason: "溯源 Memphis Rap 的必修课，也是黑暗美学制作的起点。",
    favoriteTracks: ["Stay Fly", "Sippin' on Some Syrup", "Half on a Sack"],
    links: {
      spotify: "https://open.spotify.com/album/0wwFjRGsKgYQe0Up0kPr9D",
      youtube:
        "https://www.youtube.com/results?search_query=three+6+mafia+most+known+unknown",
    },
    addedAt: "2024-05-01",
  },
  {
    slug: "the-college-dropout",
    title: "The College Dropout",
    artist: "kanye-west",
    artistName: "Kanye West",
    year: 2004,
    genres: ["hip-hop", "alternative"],
    cover: {
      from: "#2b1a10",
      to: "#171717",
      accent: "#E8E4DC",
      pattern: "grid",
    },
    rating: 9.5,
    review:
      "穿 Polo 衫的熊闯进了说唱圈。灵魂采样、教堂唱诗班和中产焦虑——Kanye 的起点即高峰。",
    reason: "Through the Wire 的倔强，是每个创作者都需要的能量。",
    favoriteTracks: [
      "Jesus Walks",
      "Through the Wire",
      "Slow Jamz",
      "Family Business",
    ],
    links: {
      spotify: "https://open.spotify.com/album/4Uv86qWpGTxf7fU7lG5X6F",
      youtube:
        "https://www.youtube.com/results?search_query=the+college+dropout",
    },
    addedAt: "2024-05-12",
  },
  {
    slug: "moment-of-truth",
    title: "Moment of Truth",
    artist: "dj-premier",
    artistName: "Gang Starr",
    year: 1998,
    genres: ["boom-bap", "hip-hop"],
    cover: {
      from: "#101010",
      to: "#171717",
      accent: "#A8A8AD",
      pattern: "noise",
    },
    rating: 9,
    review:
      "Premier 的制作教科书，Guru 的冷静叙述。Boom Bap 黄金年代的最后一座高峰。",
    reason: "Above the Clouds——听一次就明白什么叫超越时代的 beat。",
    favoriteTracks: ["Above the Clouds", "Moment of Truth", "The Militia"],
    links: {
      spotify: "https://open.spotify.com/album/2cWBwpqMsBQC6tBwSB1CXq",
      youtube:
        "https://www.youtube.com/results?search_query=gang+starr+moment+of+truth",
    },
    addedAt: "2024-05-25",
  },

  // ─── 中文说唱 ───────────────────────────────────────────────
  {
    slug: "controll1001",
    title: "Controll1001",
    artist: "aracelavery",
    artistName: "Aracelavery",
    year: 2026,
    genres: ["chinese-hip-hop", "underground", "alternative"],
    cover: {
      from: "#e8e8ec",
      to: "#a8a8ad",
      accent: "#2E2438",
      pattern: "halo",
    },
    rating: 9,
    review:
      "控制欲、监控感与荒诞的青春残片缠在一起。Aracelavery 把冷硬的制作和近乎失控的情绪压进同一个容器里。",
    reason: "「双手抱头蹲下」所属的整张专辑，比单曲更完整地暴露出那种被观看、被规训的不安。",
    favoriteTracks: ["控制你", "旗幟", "艾青", "雙手抱頭蹲下", "妄想曼陀羅"],
    links: {
      apple: "https://music.apple.com/cn/album/controll1001/6775773927",
      youtube:
        "https://www.youtube.com/results?search_query=Aracelavery+Controll1001",
    },
    newBlood: true,
    addedAt: "2026-05-27",
  },
  {
    slug: "blind-harp-player",
    title: "Blind Harp Player",
    artist: "aracelavery",
    artistName: "Aracelavery",
    year: 2025,
    genres: ["chinese-hip-hop", "underground", "alternative"],
    cover: {
      from: "#1a1a22",
      to: "#050505",
      accent: "#A8A8AD",
      pattern: "noise",
    },
    rating: 8.8,
    review:
      "首张个人作品已经有完整的声音架构。采样、鼓组和人声都被压得很低，却始终有一股不肯安分的锐气在底下走。",
    reason: "比《Controll1001》更粗粝，也更能听出 Aracelavery 最早的野心。",
    favoriteTracks: [
      "Chongqing Geeks",
      "Goosebumps",
      "Fuji Film",
      "Hyperborean",
      "Passover",
    ],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=Aracelavery+Blind+Harp+Player",
    },
    newBlood: true,
    addedAt: "2025-06-09",
  },
  {
    slug: "small-town-legend",
    title: "Small Town Legend",
    artist: "asen",
    artistName: "艾志恒 Asen",
    year: 2021,
    genres: ["chinese-hip-hop", "trap"],
    cover: {
      from: "#0a0a0a",
      to: "#1a1a1a",
      accent: "#E8E4DC",
      pattern: "slash",
    },
    rating: 9.5,
    review:
      "从湖北咸丰的小镇走到 DIGI GHETTO。Asen 把野心、焦虑和乡愁全塞进这张专辑，中文说唱里少有的完整叙事。",
    reason: "小镇青年的自证宣言。DAY1 一响，就知道这不是模仿谁。",
    favoriteTracks: ["DAY1", "Still Ace", "Legendary", "Bando", "Trust Issue"],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=Asen+Small+Town+Legend",
    },
    featured: false,
    addedAt: "2026-11-23",
  },
  {
    slug: "liu-shui-ping-jing-zhi-qian",
    title: "流水平静之前",
    artist: "cigarhan",
    artistName: "CigarHan",
    year: 2024,
    genres: ["chinese-hip-hop", "jazz-rap", "underground"],
    cover: {
      from: "#1a2620",
      to: "#050505",
      accent: "#A8A8AD",
      pattern: "rings",
    },
    rating: 9,
    review:
      "像水面之下的暗流。CigarHan 的采样审美和松弛 flow，是中文地下说唱里最不急着证明自己的一类。",
    reason: "安静，但每一句都压得住。适合深夜一个人听。",
    favoriteTracks: ["流水平静之前", "夏夜游", "枯山水"],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=CigarHan+流水平静之前",
    },
    featured: true,
    newBlood: true,
    addedAt: "2026-11-23",
  },
  {
    slug: "fo-o-fo",
    title: "佛哦佛",
    artist: "lsgcsikoriot",
    artistName: "LSGCsikoriot",
    year: 2026,
    genres: ["chinese-hip-hop", "trap", "alternative"],
    cover: {
      from: "#1a1a1f",
      to: "#050505",
      accent: "#A8A8AD",
      pattern: "grid",
    },
    rating: 8.8,
    review:
      "把「404」解构成「佛哦佛」。木鱼、颂钵和地下 Trap 鼓组在同一张专辑里互相拆解，荒诞、疲惫，又有一种近乎虔诚的清醒。",
    reason: "不是简单的宗教符号挪用，而是把信仰、欲望和失败全部摊开来写。",
    favoriteTracks: ["不回头", "不安分", "JaJa", "知更鸟的落点", "嗯，阿"],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=LSGCsikoriot+佛哦佛",
    },
    newBlood: true,
    addedAt: "2026-08-29",
  },
  {
    slug: "shang-ye-yu-wan-fa",
    title: "商业与玩法",
    artist: "kali-tiger",
    artistName: "卡力老虎 & 周",
    year: 2024,
    genres: ["chinese-hip-hop", "trap", "underground"],
    cover: {
      from: "#2a1408",
      to: "#050505",
      accent: "#8A8A95",
      pattern: "grid",
    },
    rating: 8.5,
    review:
      "把「做生意」和「做音乐」摆在同一张桌上讲。粗粝、市井、带点自嘲，态度比技巧更锋利。",
    reason: "标题就是整张专辑的立场——不装，直接谈规则。",
    favoriteTracks: ["商业与玩法", "没得选", "幽默与笑话"],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=卡力老虎+商业与玩法",
    },
    addedAt: "2026-11-23",
  },
  {
    slug: "shuang-shou-bao-tou-dun-xia",
    title: "双手抱头蹲下",
    artist: "aracelavery",
    artistName: "Aracelavery",
    year: 2024,
    genres: ["chinese-hip-hop", "underground", "alternative"],
    cover: {
      from: "#e8e8ec",
      to: "#a8a8ad",
      accent: "#2E2438",
      pattern: "halo",
    },
    rating: 8.5,
    review:
      "收在《Controll1001》里的那首。冷、克制、带点荒诞的压迫感，封面那具被红线吊起的白色人偶就是整首歌的气质。",
    reason: "中文地下场景里最不该被漏掉的一批声音，实验性拉满。",
    favoriteTracks: ["雙手抱頭蹲下", "外滩下面藏了个人", "BORDERLINE"],
    links: {
      youtube:
        "https://www.youtube.com/results?search_query=Aracelavery+双手抱头蹲下",
    },
    addedAt: "2026-11-23",
  },
];

/** 所有真实封面统一按 slug 挂载到 /images/albums/，缺失时组件自动回退到程序化封面 */
export const albums: Album[] = rawAlbums.map((a) => ({
  ...a,
  coverImage: a.coverImage ?? `/images/albums/${a.slug}.jpg`,
}));

export function getAlbum(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug);
}

export function getAlbumsByGenre(genreSlug: string): Album[] {
  return albums.filter((a) => a.genres.includes(genreSlug));
}

export function getFeaturedAlbums(): Album[] {
  return albums.filter((a) => a.featured);
}

export function getRecentAlbums(count = 4): Album[] {
  return [...albums]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, count);
}

/** 显式控制首页 New bloods 区块：只有 newBlood: true 的专辑显示 */
export function getNewBloodAlbums(): Album[] {
  return albums.filter((a) => a.newBlood);
}
