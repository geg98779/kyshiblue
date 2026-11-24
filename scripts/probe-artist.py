# -*- coding: utf-8 -*-
"""艺人维度全量拉取，按专辑名精确筛选"""
import gzip
import json
import urllib.parse
import urllib.request

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"


def fetch(url, headers=None):
    h = {"User-Agent": UA, "Accept-Encoding": "gzip, deflate"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            raw = gzip.decompress(raw)
        return raw


def itunes_artist(artist, want):
    url = "https://itunes.apple.com/search?" + urllib.parse.urlencode(
        {"term": artist, "entity": "album", "limit": 50}
    )
    data = json.loads(fetch(url).decode("utf-8", "replace"))
    print(f"-- {artist} (want: {want}) --", flush=True)
    for it in data.get("results", []):
        cn = it.get("collectionName", "")
        an = it.get("artistName", "")
        flag = "  <== MATCH" if want.lower() in cn.lower() and artist.lower() in an.lower() else ""
        print(
            f"   {an} | {cn} | {it.get('artworkUrl100','').replace('100x100','600x600')}{flag}",
            flush=True,
        )


itunes_artist("Playboi Carti", "Whole Lotta Red")
itunes_artist("Madvillain", "Madvillainy")
itunes_artist("Gang Starr", "Moment of Truth")

print("\n===== NETEASE: 双手抱头蹲下 =====", flush=True)
headers = {"Referer": "https://music.163.com/", "Accept": "application/json, text/plain, */*"}
for q in ["双手抱头蹲下", "Aracelavry", "Aracelavery"]:
    try:
        url = "https://music.163.com/api/search/get?" + urllib.parse.urlencode(
            {"s": q, "type": 10, "offset": 0, "limit": 10}
        )
        data = json.loads(fetch(url, headers).decode("utf-8", "replace"))
        albums = (data.get("result") or {}).get("albums") or []
        print(f"-- q={q} ({len(albums)} albums) --", flush=True)
        for al in albums:
            artist = (al.get("artists") or [{}])[0].get("name", "")
            print(f"   {al.get('name','')} | {artist} | {al.get('picUrl','')}", flush=True)
    except Exception as e:
        print(f"   ERR {q}: {e}", flush=True)
