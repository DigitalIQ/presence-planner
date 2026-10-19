"""Drive the demo sensors through fixed scenarios and check the cleaned occupancy.

Usage: python3 dev/fusion_check.py
Needs the demo plan (NeonPlan or own) with door contacts on d_bath and d_living.
Sets hold_time to 5 s for the run and restores the previous options at the end.
"""

import json
import time
import urllib.request
from pathlib import Path

ENV = dict(
    line.split("=", 1)
    for line in (Path(__file__).parent / ".env").read_text().splitlines()
    if "=" in line
)
URL = ENV["HA_URL"].rstrip("/")
HEADERS = {"Authorization": f"Bearer {ENV['HA_TOKEN']}", "Content-Type": "application/json"}
HOLD = 5
SENSORS = ["living", "bedroom", "kitchen", "bath", "hall"]
ROOMS = ["living_room", "bedroom", "kitchen", "hall", "bathroom"]


def call(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, headers=HEADERS, method=method)
    with urllib.request.urlopen(req, timeout=10) as res:
        return json.loads(res.read() or "null")


def switch(name, on):
    call("POST", f"/api/services/input_boolean/turn_{'on' if on else 'off'}", {"entity_id": f"input_boolean.demo_{name}"})


def occ(room):
    s = call("GET", f"/api/states/binary_sensor.demo_flat_{room}_occupancy")
    return s["state"], s["attributes"]


def set_options(**changes):
    entry = next(e for e in call("GET", "/api/config/config_entries/entry") if e["domain"] == "presence_planner")
    flow = call("POST", "/api/config/config_entries/options/flow", {"handler": entry["entry_id"]})
    current = {}
    for field in flow["data_schema"]:
        default = field.get("default")
        if default is None and isinstance(field.get("description"), dict):
            default = field["description"].get("suggested_value")
        current[field["name"]] = default
    data = {**current, **changes}
    call("POST", f"/api/config/config_entries/options/flow/{flow['flow_id']}", data)
    time.sleep(4)  # entry reloads
    return current


results = []


def check(label, room, expect, note=""):
    state, attrs = occ(room)
    ok = state == expect
    results.append((ok, label, room, expect, state, note or ", ".join(attrs.get("suppressed_echoes") or [])))
    print(f"{'OK ' if ok else 'BAD'} {label}: {room} expected {expect}, got {state}"
          f"{' (echo: ' + ', '.join(attrs.get('suppressed_echoes') or []) + ')' if attrs.get('suppressed_echoes') else ''}")


def reset(doors_open=True):
    for n in SENSORS:
        switch(n, False)
    switch("bath_door", doors_open)
    switch("living_door", doors_open)
    time.sleep(HOLD + 2)


def main():
    before = set_options(hold_time=HOLD)
    try:
        reset()
        print("S1 alone in the bathroom")
        switch("bath", True); time.sleep(1.5)
        check("S1 bath on, hall off", "bathroom", "on")
        switch("bath", False); time.sleep(1.5)
        check("S1 bath off, inside hold", "bathroom", "on")
        time.sleep(HOLD + 1)
        check("S1 after hold", "bathroom", "off")

        reset()
        print("S2 echo from the hall, door open")
        switch("hall", True); time.sleep(2)
        switch("bath", True); time.sleep(1.5)
        check("S2 hall on, then bath on 2 s later", "bathroom", "off")
        check("S2 hall itself", "hall", "on")
        switch("hall", False); time.sleep(1.5)
        check("S2 hall off, bath still on", "bathroom", "on")

        reset(doors_open=False)
        print("S3 same, bath door closed")
        switch("hall", True); time.sleep(2)
        switch("bath", True); time.sleep(1.5)
        check("S3 door closed: bath counts", "bathroom", "on")

        reset()
        print("S4 hall on for 10 s, then bath on (outside the 5 s echo window)")
        switch("hall", True); time.sleep(10)
        switch("bath", True); time.sleep(1.5)
        check("S4 bath on 10 s after hall: second person", "bathroom", "on")

        reset()
        print("S5 walking from the hall into the bathroom")
        switch("hall", True); time.sleep(2)
        switch("bath", True); t_bath = time.time(); time.sleep(3)
        check("S5 bath on, hall still on", "bathroom", "off")
        switch("hall", False)
        for _ in range(20):
            if occ("bathroom")[0] == "on":
                break
            time.sleep(0.25)
        delay = time.time() - t_bath
        results.append((None, "S5 delay until bathroom on", "bathroom", "-", f"{delay:.1f} s", "= time the hall sensor stays on"))
        print(f"INFO S5: bathroom on {delay:.1f} s after the bath sensor")

        reset()
        print("S6 echo into the hall from the living room sensor? living on, then hall on")
        switch("living", True); time.sleep(2)
        switch("hall", True); time.sleep(1.5)
        check("S6 hall motion as echo of the living room", "hall", "off")
        check("S6 living room", "living_room", "on")

        reset()
        print("S7 someone sits in the living room, another person walks through the hall")
        switch("living", True); time.sleep(10)
        switch("hall", True); time.sleep(1.5)
        check("S7 hall motion 10 s after living on", "hall", "on")
    finally:
        for n in SENSORS:
            switch(n, False)
        set_options(hold_time=before.get("hold_time", 30))
    bad = [r for r in results if r[0] is False]
    print(f"\n{len([r for r in results if r[0]])} OK, {len(bad)} BAD, {len([r for r in results if r[0] is None])} INFO")


if __name__ == "__main__":
    main()
