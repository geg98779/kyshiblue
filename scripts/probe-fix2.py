# -*- coding: utf-8 -*-
import gzip, json, urllib.parse, urllib.request

HDR = {"Referer": "https://music.163.com/", "Accept": "application/json",
       "User-Agent": "Mozilla/5.0", "Accept-Encoding": "gzip"}


def f(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=HDR), timeout=30)
    raw = r.read()
    return gzip.decompress(raw) if r.headers.get("Content-Encoding") == "gzip" else raw


def s(kind, q):
    u = "https://music.163.com/api/search/get?" + urllib.parse.urlencode(
        {"s": q, "type": kind, "offset": 0, "limit": 12})
    return json.loads(f(u).decode("utf-8", "replace")).get("result") or {}


print("=== albums: Three 6 Mafia ===")
for a in (s(10, "Three 6 Mafia Most Known Unknown").get("albums") or []):
    print(" ", a.get("name"), "|", (a.get("artists") or [{}])[0].get("name"), "|", a.get("picUrl"))

print("=== songs: 双手抱头蹲下 ===")
for so in (s(1, "双手抱头蹲下").get("songs") or [])[:8]:
    al = so.get("album") or {}
    print(" ", so.get("name"), "|", (so.get("artists") or [{}])[0].get("name"),
          "| album:", al.get("name"), "|", al.get("picUrl"))
