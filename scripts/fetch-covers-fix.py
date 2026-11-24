# -*- coding: utf-8 -*-
"""修正匹配错误的封面：limit=10 后按艺术家名过滤"""
import json
import os
import time
import urllib.parse
import urllib.request

OUT_DIR = r"F:\CodeBuddy\My Blog\public\images\albums"

TARGETS = [
    ("whole-lotta-red", "playboi carti whole lotta red", "playboi carti", "whole lotta red"),
    ("madvillainy", "madvillain madvillainy", "madvillain", "madvillainy"),
    ("ds2", "future dirty sprite 2 ds2", "future", "ds2"),
    ("moment-of-truth", "gang starr moment of truth", "gang starr", "moment of truth"),
]

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


for slug, query, artist_key, album_key in TARGETS:
    try:
        url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
            {"term": query, "entity": "album", "limit": 10}
        )
        data = json.loads(get(url).decode("utf-8"))
        results = data.get("results", [])
        # 优先：艺术家名 + 专辑名都匹配
        pick = None
        for item in results:
            an = item.get("artistName", "").lower()
            cn = item.get("collectionName", "").lower()
            if artist_key in an and album_key in cn and "remix" not in cn:
                pick = item
                break
        if not pick:
            for item in results:
                if artist_key in item.get("artistName", "").lower():
                    pick = item
                    break
        if not pick:
            print(f"MISS {slug}: {[ (r.get('artistName'), r.get('collectionName')) for r in results ]}", flush=True)
            continue
        art = pick["artworkUrl100"].replace("100x100", "600x600")
        img = get(art)
        with open(os.path.join(OUT_DIR, slug + ".jpg"), "wb") as f:
            f.write(img)
        print(f"OK   {slug} :: {pick['artistName']} - {pick['collectionName']} ({len(img)//1024}KB)", flush=True)
    except Exception as e:
        print(f"FAIL {slug} :: {e}", flush=True)
    time.sleep(1.2)
