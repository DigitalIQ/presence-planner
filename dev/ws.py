"""Send WebSocket commands to the dev HA and print the results as JSON.

Usage: .venv/bin/python dev/ws.py '{"type": "presence_planner/get"}' ['{"type": ...}' ...]
Reads HA_URL and HA_TOKEN from dev/.env. Also importable: `await call(session_ws, msg)`.
"""

import asyncio
import json
import sys
from pathlib import Path

import aiohttp

ENV = dict(
    line.split("=", 1)
    for line in (Path(__file__).parent / ".env").read_text().splitlines()
    if "=" in line
)
WS_URL = ENV["HA_URL"].rstrip("/").replace("http", "ws", 1) + "/api/websocket"


class Client:
    def __init__(self, ws):
        self.ws = ws
        self.next_id = 1

    async def call(self, msg: dict):
        msg = {**msg, "id": self.next_id}
        self.next_id += 1
        await self.ws.send_json(msg)
        while True:
            res = await self.ws.receive_json()
            if res.get("id") == msg["id"] and res.get("type") == "result":
                if not res.get("success"):
                    raise RuntimeError(json.dumps(res.get("error")))
                return res.get("result")


async def connect(session):
    ws = await session.ws_connect(WS_URL)
    await ws.receive_json()
    await ws.send_json({"type": "auth", "access_token": ENV["HA_TOKEN"]})
    if (await ws.receive_json()).get("type") != "auth_ok":
        raise RuntimeError("auth failed")
    return Client(ws)


async def main(messages):
    async with aiohttp.ClientSession() as session:
        client = await connect(session)
        for m in messages:
            print(json.dumps(await client.call(json.loads(m)), ensure_ascii=False))


if __name__ == "__main__":
    asyncio.run(main(sys.argv[1:]))
