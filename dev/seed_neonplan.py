"""Seed the local test Home Assistant: set up NeonPlan 3D and load the demo flat with the demo sensors.

Uses dev/.env (written by dev/onboard.py). Run:  .venv/bin/python dev/seed_neonplan.py
"""
import asyncio
import json
from pathlib import Path

import aiohttp

ROOT = Path(__file__).resolve().parents[1]
ENV = dict(line.split("=", 1) for line in (ROOT / "dev/.env").read_text().split())
BASE, TOKEN = ENV["HA_URL"], ENV["HA_TOKEN"]
HDR = {"Authorization": f"Bearer {TOKEN}"}


def demo_building() -> dict:
    demo = json.loads((ROOT / "shared/demo-plan.json").read_text())
    plan, sensors = demo["plan"], demo["sensors"]
    floors = []
    for f in plan["floors"]:
        rooms = [{"id": r["id"], "name": r["name"], "area_id": r.get("area_id"), "points": r["points"],
                  "floor_material": "wood", "wall_thickness": r.get("wall_thickness")} for r in f["rooms"]]
        openings = []
        for o in f["openings"]:
            item = {k: o[k] for k in ("id", "room_id", "edge", "offset", "width", "type", "sill", "height", "hinge", "swing")}
            openings.append(item)
        furniture = [{"id": m["id"], "type": m["type"], "x": m["x"], "z": m["z"], "rotation": m["rotation"],
                      "w": m["w"], "d": m["d"], "h": m["h"], "variant": None} for m in f["furniture"]]
        placements = [{"entity_id": s["entity_id"], "x": s["x"], "z": s["z"], "y": s["height"],
                       "rotation": (s["phi"] - 90) % 360, "tilt": s["tilt"], "fov": s["fov_h"], "reach": s["reach"]}
                      for s in sensors if s["floor_id"] == f["id"]]
        floors.append({"id": f["id"], "name": f["name"], "elevation": f["elevation"], "height": f["height"],
                       "cut_height": 1.15, "rooms": rooms, "openings": openings, "furniture": furniture,
                       "placements": placements, "background": None, "outdoor": f.get("outdoor", []),
                       "walls": f.get("walls", []), "ha_floor": None})
    return {"version": 1, "floors": floors,
            "settings": {"wall_exterior": plan["settings"]["wall_exterior"], "wall_interior": plan["settings"]["wall_interior"], "grid": 0.05}}


async def ws_call(s: aiohttp.ClientSession, msg: dict) -> dict:
    async with s.ws_connect(f"{BASE}/api/websocket") as ws:
        await ws.receive_json()
        await ws.send_json({"type": "auth", "access_token": TOKEN})
        await ws.receive_json()
        await ws.send_json({"id": 1, **msg})
        while True:
            r = await ws.receive_json()
            if r.get("id") == 1:
                return r


async def main() -> None:
    async with aiohttp.ClientSession(headers=HDR) as s:
        async with s.get(f"{BASE}/api/config/config_entries/entry") as r:
            entries = await r.json()
        if not any(e["domain"] == "neonplan3d" for e in entries):
            async with s.post(f"{BASE}/api/config/config_entries/flow", json={"handler": "neonplan3d"}) as r:
                flow = await r.json()
            print("neonplan flow:", flow.get("type"), flow.get("step_id"))
            if flow.get("type") == "form":
                async with s.post(f"{BASE}/api/config/config_entries/flow/{flow['flow_id']}", json={}) as r:
                    print("neonplan flow step:", (await r.json()).get("type"))
            await asyncio.sleep(3)
        res = await ws_call(s, {"type": "neonplan3d/building/save", "building": demo_building()})
        print("save:", res.get("success"), json.dumps(res.get("result") or res.get("error"))[:400])


asyncio.run(main())
