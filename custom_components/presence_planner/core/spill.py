"""Where does a sensor see into foreign rooms, and through which door (``spill_detail``)."""

from __future__ import annotations

from .detection import SensorCtx, make_caster, normalize_opts
from .model import STANDING, Model, cells_by_room, get_cells, room_at
from .profiles import ensure_resolved


def spill_detail(model: Model, sensor: dict, opts: dict | None = None) -> dict:
    """``{foreign_room: {"total", "walls", "doors": {door_id: share}}}`` at 1.3 m, doors open.

    Single-door cells use ``doors``; multi-door cells use ``door_paths`` and require all path doors open.
    """
    o = normalize_opts(opts)
    s = ensure_resolved(sensor)
    cells = get_cells(model, o["cell"])
    by_room = cells_by_room(model, o["cell"])
    ctx = SensorCtx(s)
    rc = make_caster(model, s, "open", o["thin_db"])
    home = room_at(model, s["x"], s["z"])
    out = {}
    for r in model.rooms:
        rid = r["id"]
        if rid == home:
            continue
        idxs = by_room[rid]
        total = len(idxs)
        walls = 0
        doors: dict[str, int] = {}
        paths: dict[tuple[str, ...], int] = {}
        for i in idxs:
            x, z = cells[i][0], cells[i][1]
            if ctx.quality(x, STANDING, z, rc) <= 0:
                continue
            crossed = rc.doors_crossed(x, z)
            if not crossed:
                walls += 1
            elif len(crossed) > 1:
                paths[crossed] = paths.get(crossed, 0) + 1
            else:
                did = crossed[0]
                doors[did] = doors.get(did, 0) + 1
        seen = walls + sum(doors.values()) + sum(paths.values())
        out[rid] = {
            "total": round(seen / total, 4) if total else 0.0,
            "walls": round(walls / total, 4) if total else 0.0,
            "doors": {k: round(v / total, 4) for k, v in doors.items()},
        }
        if paths:
            out[rid]["door_paths"] = [
                {"doors": list(path), "share": round(count / total, 4)} for path, count in sorted(paths.items())
            ]
    return out
