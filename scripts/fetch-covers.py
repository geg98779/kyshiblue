# -*- coding: utf-8 -*-
"""批量通过 iTunes Search API 获取专辑真实封面，保存到 public/images/albums/"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

OUT_DIR = r"F:\CodeBuddy\My Blog\public\images\albums"
os.makedirs(OUT_DIR, exist_ok=True)

ALBUMS = [
    ("illmatic", "nas illmatic"),
    ("my-beautiful-dark-twisted-fantasy", "kanye west my beautiful dark twisted fantasy"),
    ("astroworld", "travis scott astroworld"),
    ("whole-lotta-red", "playboi carti whole lotta red"),
    ("madvillainy", "madvillain madvillainy"),
    ("donuts", "j dilla donuts"),
    ("ds2", "future dirty sprite 2"),
    ("2014-forest-hills-drive", "j cole 2014 forest hills drive"),
    ("rodeo", "travis scott rodeo"),
    ("most-known-unknown", "three 6 mafia most known unknown"),
    ("the-college-dropout", "kanye west the college dropout"),
    ("moment-of-truth", "gang starr moment of truth"),
    ("small-town-legend", "asen small town legend"),
    ("liu-shui-ping-jing-zhi-qian", "cigarhan 流水平静之前"),
    ("shang-ye-yu-wan-fa", "卡力老虎 周 商业与玩法"),
    ("shuang-shou-bao-tou-dun-xia", "aracelavry 双手抱头蹲下"),
]

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def main():
    only = sys.argv[1:] if len(sys.argv) > 1 else None
    for slug, query in ALBUMS:
        if only and slug not in only:
            continue
        dest = os.path.join(OUT_DIR, slug + ".jpg")
        if os.path.exists(dest) and os.path.getsize(dest) > 10000:
            print(f"SKIP {slug} (exists)", flush=True)
            continue
        try:
            url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
                {"term": query, "entity": "album", "limit": 1}
            )
            data = json.loads(get(url).decode("utf-8"))
            if not data.get("results"):
                print(f"MISS {slug} :: no result for '{query}'", flush=True)
                continue
            item = data["results"][0]
            art = item["artworkUrl100"].replace("100x100", "600x600")
            img = get(art)
            with open(dest, "wb") as f:
                f.write(img)
            print(
                f"OK   {slug} :: {item['artistName']} - {item['collectionName']} ({len(img)//1024}KB)",
                flush=True,
            )
        except Exception as e:
            print(f"FAIL {slug} :: {e}", flush=True)
        time.sleep(1.2)


if __name__ == "__main__":
    main()
