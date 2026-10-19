"""Per-room coverage, misfire risk, zone shares (``evaluate``)."""

from __future__ import annotations

from .detection import SensorCtx, closed_door_ids, glass_score, height_key, make_caster, normalize_opts
from .model import STANDING, Model, cells_by_room, get_cells, room_at, zone_cell_ids, zone_groups
from .profiles import ensure_resolved


def active_sensors(model: Model, sensors: list) -> list:
    """Resolved copies of the active sensors that belong to this floor."""
    out = []
    for s in sensors:
        if s.get("active") is False:
            continue
        if s.get("floor_id") not in (None, model.floor["id"]):
            continue
        out.append(ensure_resolved(s))
    return out


def _r4(v: float) -> float:
    return round(v, 4)


def evaluate(model: Model, sensors: list, opts: dict | None = None) -> dict:
    """Coverage, misfire risk, per-sensor spill and zone shares for all rooms of the floor."""
    o = normalize_opts(opts)
    cell = o["cell"]
    heights = o["heights"]
    cells = get_cells(model, cell)
    by_room = cells_by_room(model, cell)
    sens = active_sensors(model, sensors)
    n = len(sens)
    ctxs = [SensorCtx(s) for s in sens]
    sroom = [room_at(model, s["x"], s["z"]) for s in sens]
    user_closed = closed_door_ids(model, o["doors"])
    all_open = not user_closed
    rc_open = [make_caster(model, s, "open", o["thin_db"]) for s in sens]
    rc_user = rc_open if all_open else [make_caster(model, s, o["doors"], o["thin_db"]) for s in sens]

    own_cache: dict[tuple, list] = {}

    def own_q(j: int, h: float) -> list:
        """Qualities of sensor j at height h for the cells of its own room (doors as in opts)."""
        key = (j, h)
        if key not in own_cache:
            ctx, rc = ctxs[j], rc_user[j]
            q = ctx.quality
            own_cache[key] = [q(cells[i][0], h, cells[i][1], rc) for i in by_room.get(sroom[j], ())]
        return own_cache[key]

    # Foreign visibility at standing height, doors open (worst case).
    foreign_seen: list[dict] = []
    for j in range(n):
        seen_by_room: dict[str, list] = {}
        ctx, rc = ctxs[j], rc_open[j]
        for r in model.rooms:
            rid = r["id"]
            if rid == sroom[j]:
                continue
            seen_by_room[rid] = [ctx.quality(cells[i][0], STANDING, cells[i][1], rc) > 0 for i in by_room[rid]]
        foreign_seen.append(seen_by_room)

    rooms_out: dict[str, dict] = {}
    sensors_out: dict[str, dict] = {}
    for j, s in enumerate(sens):
        sensors_out[s["entity_id"]] = {"room": sroom[j], "glass": _r4(glass_score(model, s)), "spill": {}}

    for r in model.rooms:
        rid = r["id"]
        idxs = by_room[rid]
        total = len(idxs)
        own = [j for j in range(n) if sroom[j] == rid]
        coverage, seen = {}, {}
        for h in heights:
            if not total:
                coverage[height_key(h)] = 0.0
                seen[height_key(h)] = 0.0
                continue
            best = [0.0] * total
            for j in own:
                for k, q in enumerate(own_q(j, h)):
                    best[k] = max(best[k], q)
            coverage[height_key(h)] = _r4(sum(best) / total)
            seen[height_key(h)] = _r4(sum(1 for q in best if q > 0) / total)
        mean = _r4(sum(coverage.values()) / len(coverage)) if coverage else 0.0
        from_out: dict[str, float] = {}
        union = [False] * total
        for j in range(n):
            if sroom[j] == rid:
                continue
            flags = foreign_seen[j][rid]
            share = sum(flags) / total if total else 0.0
            from_out[sens[j]["entity_id"]] = _r4(share)
            sensors_out[sens[j]["entity_id"]]["spill"][rid] = _r4(share)
            for k, f in enumerate(flags):
                if f:
                    union[k] = True
        rooms_out[rid] = {
            "coverage": coverage,
            "coverage_mean": mean,
            "seen": seen,
            "misfire_risk": _r4(sum(union) / total) if total else 0.0,
            "from": from_out,
            "own_sensors": [sens[j]["entity_id"] for j in own],
        }

    zones_out = []
    for g in zone_groups(model):
        ids = zone_cell_ids(model, g, cell)
        if not ids:
            continue
        pos = {i: k for k, i in enumerate(by_room[g["room"]])}
        hit = [False] * len(ids)
        for j in range(n):
            if sroom[j] != g["room"]:
                continue
            q = own_q(j, g["height"])
            for m, i in enumerate(ids):
                if q[pos[i]] > 0:
                    hit[m] = True
        zones_out.append({"name": g["name"], "room": g["room"], "height": g["height"], "share": _r4(sum(hit) / len(ids))})

    result = {"rooms": rooms_out, "sensors": sensors_out, "zones": zones_out, "grid": {}}
    if o.get("grid"):
        result["grid"] = _grid(model, sens, ctxs, sroom, rc_open, own_q, cells, by_room, heights)
    return result


def _grid(model, sens, ctxs, sroom, rc_open, own_q, cells, by_room, heights) -> dict:
    out = {}
    n = len(sens)
    for h in heights:
        rows = []
        for r in model.rooms:
            rid = r["id"]
            idxs = by_room[rid]
            own = [j for j in range(n) if sroom[j] == rid]
            own_qs = {j: own_q(j, h) for j in own}
            for k, i in enumerate(idxs):
                x, z = cells[i][0], cells[i][1]
                best, who = 0.0, None
                for j in own:
                    q = own_qs[j][k]
                    if q > best:
                        best, who = q, sens[j]["entity_id"]
                spill = [
                    sens[j]["entity_id"]
                    for j in range(n)
                    if sroom[j] != rid and ctxs[j].quality(x, h, z, rc_open[j]) > 0
                ]
                rows.append({"x": _r4(x), "z": _r4(z), "room": rid, "own": _r4(best), "own_sensor": who, "spill": spill})
        out[height_key(h)] = rows
    return out
