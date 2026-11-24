# -*- coding: utf-8 -*-
"""统一用网易云搜专辑封面：按专辑名+艺人打分挑选，下载 600x600 到 public/images/albums/"""
import gzip
import json
import os
import re
import time
import urllib.parse
import urllib.request

OUT = r"F:\CodeBuddy\My Blog\public\images\albums"
os.makedirs(OUT, exist_ok=True)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
HDR = {"Referer": "https://music.163.com/", "Accept": "application/json, text/plain, */*",
       "User-Agent": UA, "Accept-Encoding": "gzip"}

# slug, 搜索词, 期望专辑名关键词, 期望艺人关键词
TARGETS = [
    ("illmatic", "Illmatic Nas", "illmatic", "nas"),
    ("my-beautiful-dark-twisted-fantasy", "My Beautiful Dark Twisted Fantasy", "my beautiful dark twisted", "kanye"),
    ("astroworld", "ASTROWORLD Travis Scott", "astroworld", "travis"),
    ("whole-lotta-red", "Whole Lotta Red", "whole lotta red", "carti"),
    ("madvillainy", "Madvillainy Madvillain", "madvillainy", "madvillain"),
    ("donuts", "Donuts J Dilla", "donuts", "dilla"),
    ("ds2", "DS2 Future", "ds2", "future"),
    ("2014-forest-hills-drive", "2014 Forest Hills Drive", "2014 forest hills", "cole"),
    ("rodeo", "Rodeo Travis Scott", "rodeo", "travis"),
    ("most-known-unknown", "Most Known Unknown Three 6 Mafia", "most known unknown", "three 6"),
    ("the-college-dropout", "The College Dropout", "college dropout", "kanye"),
    ("moment-of-truth", "Moment of Truth Gang Starr", "moment of truth", "gang starr"),
    ("small-town-legend", "Small Town Legend Asen", "small town legend", "asen"),
    ("liu-shui-ping-jing-zhi-qian", "流水平静之前 CigarHan", "流水平静之前", "cigarhan"),
    ("shang-ye-yu-wan-fa", "商业与玩法 卡力老虎", "商业与玩法", "卡力老虎"),
    ("shuang-shou-bao-tou-dun-xia", "双手抱头蹲下 Aracelavery", "双手抱头蹲下", "aracel"),
]

BAD = ("type beat", "instrumental", "karaoke", "tribute", "remix", "伴奏", "翻唱", "纯音乐", "dj版")


def fetch(url):
    req = urllib.request.Request(url, headers=HDR)
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            raw = gzip.decompress(raw)
        return raw


def norm(s):
    return re.sub(r"[\s\-_'\".:,!?()\[\]]", "", (s or "").lower())


def search(kind, q):
    url = "https://music.163.com/api/search/get?" + urllib.parse.urlencode(
        {"s": q, "type": kind, "offset": 0, "limit": 15}
    )
    d = json.loads(fetch(url).decode("utf-8", "replace"))
    return d.get("result") or {}


def score(name, artist, want_name, want_artist):
    n, w = norm(name), norm(want_name)
    an = norm(artist)
    s = 0
    if n == w:
        s += 100
    elif w and w in n:
        s += 60
    elif n and n in w:
        s += 20
    if want_artist and want_artist in an:
        s += 40
    if any(b in (name or "").lower() for b in BAD):
        s -= 80
    return s


def pic(img, size=600):
    if not img:
        return ""
    img = img.replace("http://", "https://")
    return f"{img}?param={size}y{size}"


def download(url, dest):
    data = fetch(url)
    if len(data) < 5000:
        raise ValueError(f"too small {len(data)}B")
    with open(dest, "wb") as f:
        f.write(data)
    return len(data)


for slug, q, want_name, want_artist in TARGETS:
    dest = os.path.join(OUT, slug + ".jpg")
    try:
        best, best_s, best_info = None, -999, ""
        res = search(10, q)
        for al in res.get("albums") or []:
            artist = (al.get("artists") or [{}])[0].get("name", "")
            s = score(al.get("name", ""), artist, want_name, want_artist)
            if s > best_s:
                best_s, best, best_info = s, al.get("picUrl") or al.get("blurPicUrl"), f"{al.get('name')} | {artist}"

        if not best or best_s < 40:
            # 退化为歌曲搜索，取所属专辑封面
            res = search(1, q)
            for so in res.get("songs") or []:
                album = so.get("album") or {}
                artist = (so.get("artists") or [{}])[0].get("name", "")
                s = score(album.get("name", ""), artist, want_name, want_artist)
                if s > best_s:
                    best_s, best, best_info = s, album.get("picUrl"), f"{album.get('name')} | {artist} (via song)"

        if not best:
            print(f"MISS {slug}", flush=True)
            continue
        kb = download(pic(best), dest) // 1024
        print(f"OK   {slug:34s} score={best_s:3d} {kb:4d}KB  :: {best_info}", flush=True)
    except Exception as e:
        print(f"FAIL {slug:34s} :: {e}", flush=True)
    time.sleep(0.8)
