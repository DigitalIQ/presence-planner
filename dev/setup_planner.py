"""Restart the dev HA and add the Presence Planner entry if it is missing.

Usage: python3 dev/setup_planner.py [--no-restart]
Reads HA_URL and HA_TOKEN from dev/.env.
"""

import json
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ENV = dict(
    line.split("=", 1)
    for line in (Path(__file__).parent / ".env").read_text().splitlines()
    if "=" in line
)
URL = ENV["HA_URL"].rstrip("/")
HEADERS = {"Authorization": f"Bearer {ENV['HA_TOKEN']}", "Content-Type": "application/json"}


def call(method, path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(URL + path, data=data, headers=HEADERS, method=method)
    with urllib.request.urlopen(req, timeout=10) as res:
        return json.loads(res.read() or "null")


def wait_ready(timeout=180):
    end = time.time() + timeout
    while time.time() < end:
        try:
            if call("GET", "/api/").get("message"):
                return
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            pass
        time.sleep(3)
    sys.exit("HA did not come up in time")


def main():
    if "--no-restart" not in sys.argv:
        subprocess.run(["docker", "restart", "pp-dev-ha"], check=True, capture_output=True)
        time.sleep(5)
    wait_ready()
    entries = call("GET", "/api/config/config_entries/entry")
    mine = [e for e in entries if e["domain"] == "presence_planner"]
    if not mine:
        flow = call("POST", "/api/config/config_entries/flow", {"handler": "presence_planner"})
        if flow.get("type") == "form":
            flow = call("POST", f"/api/config/config_entries/flow/{flow['flow_id']}", {})
        print("flow result:", flow.get("type"), flow.get("reason") or flow.get("title"))
        mine = [e for e in call("GET", "/api/config/config_entries/entry") if e["domain"] == "presence_planner"]
    for e in mine:
        print("entry:", e["title"], e["state"])
    states = call("GET", "/api/states")
    ours = [s["entity_id"] for s in states if "presence_planner" in s["entity_id"] or "coverage" in s["entity_id"]]
    print("entities:", len(ours), ours[:12])


if __name__ == "__main__":
    main()
