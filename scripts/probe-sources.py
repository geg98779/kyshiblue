# -*- coding: utf-8 -*-
"""探测 a) iTunes 英文专辑候选  b) 网易云中文专辑封面 picUrl"""
import gzip
import json
import sys
import urllib.parse
import urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"


def fetch(url, headers=None, decompress=True):
    h = {"User-Agent": UA, "Accept-Encoding": "gzip, deflate"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=25) as r:
        raw = r.read()
        if r.headers.get("Content-Encoding") == "gzip" and decompress:
            raw = gzip.decompress(raw)
        return raw


EN_QUERIES = {
    "whole-lotta-red": ["Whole Lotta Red Playboi Carti", "Playboi Carti Whole Lotta Red"],
    "madvillainy": ["Madvillainy", "Madvillain Madvillainy"],
    "ds2": ["DS2 Future", "Dirty Sprite 2 Future"],
    "moment-of-truth": ["Moment of Truth Gang Starr", "Gang Starr Moment of Truth"],
}

CN_QUERIES = [
    ("small-town-legend", "Small Town Legend 艾志恒Asen"),
    ("liu-shui-ping-jing-zhi-qian", "流水平静之前 CigarHan"),
    ("shang-ye-yu-wan-fa", "商业与玩法 卡力老虎"),
    ("shuang-shou-bao-tou-dun-xia", "双手抱头蹲下 Aracelavry"),
]

mode = sys.argv[1] if len(sys.argv) > 1 else "both"

if mode in ("itunes", "both"):
    print("===== ITUNES CANDIDATES =====", flush=True)
    for slug, queries in EN_QUERIES.items():
        seen = {}
        for q in queries:
            try:
                url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
                    {"term": q, "entity": "album", "limit": 15}
                )
                data = json.loads(fetch(url).decode("utf-8", "replace"))
                for it in data.get("results", []):
                    seen[it["collectionId"]] = it
            except Exception as e:
                print(f"  err {slug}/{q}: {e}", flush=True)
        print(f"-- {slug} --", flush=True)
        for it in list(seen.values())[:12]:
            print(
                f"   {it.get('artistName','')} | {it.get('collectionName','')} | "
                f"{it.get('artworkUrl100','').replace('100x100','600x600')}",
                flush=True,
            )

if mode in ("netease", "both"):
    print("===== NETEASE ALBUMS =====", flush=True)
    headers = {
        "Referer": "https://music.163.com/",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
    }
    for slug, q in CN_QUERIES:
        for api in [
            "https://music.163.com/api/search/get?" + urllib.parse.urlencode(
                {"s": q, "type": 10, "offset": 0, "limit": 8}
            ),
            "https://music.163.com/api/search/get/web?" + urllib.parse.urlencode(
                {"s": q, "type": 10, "offset": 0, "limit": 8}
            ),
        ]:
            try:
                raw = fetch(api, headers)
                data = json.loads(raw.decode("utf-8", "replace"))
                albums = (data.get("result") or {}).get("albums") or []
                if albums:
                    print(f"-- {slug} --", flush=True)
                    for al in albums[:6]:
                        artist = (al.get("artists") or [{}])[0].get("name", "")
                        pic = al.get("picUrl") or al.get("blurPicUrl") or ""
                        print(f"   {al.get('name','')} | {artist} | id={al.get('id')} | {pic}", flush=True)
                    break
                else:
                    print(f"   {slug}: empty from {api.split('/')[-1].split('?')[0]} (code={data.get('code')})", flush=True)
            except Exception as e:
                print(f"   {slug} err: {e}", flush=True)
