# KYSHIBLUE

> CODE. MUSIC. CULTURE. LIFE.  
> DON'T JUST BROWSE. EXPLORE THE WORLD.

互动式 3D 音乐档案馆 & 个人数字宇宙。第一版聚焦 **THE GATE**（3D 品牌入口）与 **THE ARCHIVE**（Hip-Hop 音乐档案）。

---

## 运行

环境要求：Node.js 18.17+（本项目在 22.x 下构建验证通过）。

```bash
npm install
npm run dev
```

打开 [http://localhoost:3000](http://localhost:3000)

其他命令：

```bash
npm run build   # 生产构建
npm run start   # 运行生产构建（需先 build）
```

---

## 技术栈

| 层  | 技术                                            |
| -- | --------------------------------------------- |
| 框架 | Next.js 14（App Router）+ React 18 + TypeScript |
| 样式 | Tailwind CSS 3 + 自定义 CSS 设计系统                 |
| 3D | Three.js + React Three Fiber 8 + Drei         |
| 动画 | GSAP（镜头/转场）+ Framer Motion（UI 动效）             |

不需要数据库、登录或后台。所有内容来自本地 TypeScript 数据文件。

---

## 页面

| 路由                                         | 内容                                     |
| ------------------------------------------ | -------------------------------------- |
| `/`                                        | THE GATE 3D 入口、Signal Lab、品牌宣言、精选专辑、循环单曲、音乐人、新入档案 |
| `/music`                                   | THE ARCHIVE：3D 专辑空间 + 风格筛选 + 搜索 + 图片网格 |
| `/music/albums/[slug]`                     | 专辑详情：评价、收藏理由、喜欢曲目、外链、相关推荐              |
| `/music/tracks`                            | 单曲档案：私人注脚、风格/搜索筛选                      |
| `/music/artists` · `/music/artists/[slug]` | 音乐人列表与详情                               |
| `/about`                                   | 个人宣言、音乐审美、五重身份、创作方向                    |
| `/contact`                                 | GitHub / Email / Instagram             |
| `sitemap.xml` · `robots.txt`               | 自动生成                                   |

---

## 交互说明

- **THE GATE**：抽象 Chrome Torus Knot 雕塑保留在背景中，叠加幽蓝反射与底部冷光。前景改为 `HalfMusic / HalfArt` 错落双行大字：上行更大、下行右移且更小，实心字使用冷米白，空心字加粗描边并填入深蓝灰；悬浮标题时实心 / 空心互逆、第二行轻微右移。三行歌词 `Sipping on the blue / Young Kysh making a move / Make me outta the hood` 悬浮时右移、变亮并出现幽蓝辉光。顶部 `KYSHIBLUE` 只保留一个导航栏 Logo，使用等宽字体与宽字距。`Enter the world` 穿越入口进入 `/music`；可点 `Skip` 或按 `ESC` 跳过入场动画，`Enter` 键也可进入。
- **THE ARCHIVE**：3D 空间内专辑封面漂浮，Hover 浮起发光并显示信息，点击打开详情，滚轮推进镜头纵深。`Controll1001` 与《佛哦佛》固定排在 3D 场景最前。右上角 `3D ON/OFF` 可关闭 3D 画布，只用普通列表浏览（移动端/低性能设备推荐）。
- **SIGNAL LAB**：首页 Gate 后的互动层，包含五个模块：
  1. `Current Signal` — 当前在听 / 在做 / 在想 / 开放合作。
  2. `Taste Signal` — 三组选择生成 KYSHIBLUE 匹配度、人格化结果、入口专辑与视觉语言，可复制或通过 mailto 发送。
  3. `Signal Generator` — Warmth / Grain / Tension 滑杆实时改变视觉卡片。
  4. `Under the Hood` — 展示实时 FPS、DPR、canvas 数量与技术栈。
  5. `Open Channel` — 用 Intent + Vibe + 一句话生成预填邮件，降低联系门槛。
- **首页简介**：`KYSHIBLUE` 小标悬浮变幽蓝并拉大字距；三行歌词逐行悬浮右移，标题整体悬浮时实心 / 空心字互逆；说明文字悬浮时出现幽蓝左边框、淡蓝底色与位移；`Read the manifesto →` 悬浮变亮并右移，点击进入 `/about`。
- 尊重系统「减少动态效果」偏好：开启后跳过入场动画并缩短转场。

---

## 目录结构

```
src/
├── app/                    # 路由与页面（含 sitemap.ts / robots.ts / not-found.tsx）
├── components/
│   ├── albums/             # 程序化封面 CoverArt、专辑卡片
│   ├── gate/               # THE GATE 交互流程与 HTML 覆盖层
│   ├── music/              # 档案馆筛选/搜索、单曲列表
│   ├── layout/             # Footer
│   └── navigation/         # Navbar
├── three/
│   ├── scenes/             # GateScene、Marionette、ArchiveScene
│   └── createCoverTexture.ts  # Canvas 程序化专辑封面纹理
├── data/                   # albums / tracks / artists / genres
├── types/                  # 统一数据类型
└── styles/globals.css      # 色彩系统、字体、胶片颗粒、扫描线
```

3D Canvas 与 HTML/CSS 内容层分离，页面逻辑没有塞进单个大型组件。

---

## 添加内容

直接编辑 `src/data/` 下的文件，类型定义在 `src/types/index.ts`：

- **加专辑**：向 `albums.ts` 的 `rawAlbums` 追加一条 `Album`，填 `slug / title / artist / year / genres / cover / rating / review / reason / favoriteTracks / links`。详情路由会自动静态生成。真实封面按 slug 自动挂载 `/images/albums/<slug>.jpg`，把图放进该目录即可；没有图时自动回退到程序化封面。
- **控制展示区域**：`featured: true` 让专辑进入首页 Relics；`newBlood: true` 让专辑进入首页 New bloods；`genres` 含 `chinese-hip-hop` 会进入中文说唱专区。三个字段可以单独或叠加使用，顺序按 `rawAlbums` 里的排列。
- **加单曲**：向 `tracks.ts` 追加 `Track`，用 `album` 字段关联专辑 slug。
- **加音乐人**：向 `artists.ts` 追加 `Artist`，详情路由自动生成。
- **风格**：`genres.ts`，筛选按钮自动读取。

`cover` 是程序化封面配置（`from / to / accent / pattern`），不依赖任何外部图片资源。`pattern` 可选 `rings | bars | grid | slash | halo | noise`。2D 卡片与 3D 场景共用同一套配色与图案语言。

---

## 设计系统

| 名称            | 色值        | 用途            |
| ------------- | --------- | ------------- |
| Void Black    | `#050505` | 主背景           |
| Dark Gray     | `#171717` | 次级背景          |
| Accent Slate  | `#2A2A2E` | 选中态 / 描边（中性灰） |
| Deep Violet   | `#30143F` | 氛围色           |
| Chrome Silver | `#A8A8AD` | 金属元素 / 次级强调   |
| Bone White    | `#E8E4DC` | 主文字           |
| Muted Gray    | `#888888` | 辅助文字          |

Tailwind 中已注册 `bg-void / text-bone / text-chrome / text-muted` 等工具类。界面只使用黑、冷白与深紫，不设高饱和强调色；标题与小字统一为无衬线字体、`tracking-brutal` 字距，英文文案采用首字母大写。全局叠加胶片颗粒与扫描线，可在 `globals.css` 中调整或移除。

---

## 备注

- 外链（Spotify / YouTube / GitHub / Email / Instagram）为示例地址，上线前替换为真实链接。
- 专辑封面默认使用真实图片：`public/images/albums/<slug>.jpg`（来源 iTunes / 网易云，共 19 张，含 7 张中文说唱）。`Album.cover`（程序化配置）保留作为图片缺失时的兜底，也用于 3D 场景加载真实纹理前的即时占位。抓取脚本见 `scripts/fetch-covers-final.py`（新增封面也可直接用网易云 API 按「专辑名 + 艺人」搜索下载）。
- `sitemap.ts` / `robots.ts` 中的域名 `https://kyshiblue.world` 为占位，部署时改为实际域名。
- 后续路线（THE STUDIO / THE CULTURE / THE LAB / MDX 博客）见项目蓝图，第一版刻意不做。
