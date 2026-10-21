"""Check the locally verifiable HACS package contract without credentials or network."""

import json
import struct
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
component = ROOT / "custom_components" / "presence_planner"
manifest = json.loads((component / "manifest.json").read_text())
hacs = json.loads((ROOT / "hacs.json").read_text())
for key in ("domain", "documentation", "issue_tracker", "codeowners", "name", "version"):
    assert manifest.get(key), f"Missing manifest key: {key}"
assert manifest["domain"] == component.name
assert manifest["config_flow"] is True
assert hacs["render_readme"] is True
assert hacs["homeassistant"] == "2026.10.2"
assert json.loads((ROOT / "package.json").read_text())["version"] == manifest["version"]
assert sorted(p.name for p in component.parent.iterdir() if p.is_dir() and p.name != "__pycache__") == [component.name]
readme = (ROOT / "README.md").read_text()
for heading in ("Installation", "Einrichtung", "Modellgrenzen", "Datenschutz", "Backup", "Entfernen"):
    assert heading in readme, f"Missing documentation: {heading}"
for name in ("presence-planner-panel.js", "presence-planner-worker.js"):
    assert (component / "frontend" / name).stat().st_size > 1000, f"Missing bundle: {name}"
for lang in ("en", "de"):
    json.loads((component / "translations" / f"{lang}.json").read_text())
assert (component / "strings.json").read_text() == (component / "translations" / "en.json").read_text()
icon = (component / "brand" / "icon.png").read_bytes()
assert icon[:8] == b"\x89PNG\r\n\x1a\n"
assert struct.unpack(">II", icon[16:24]) == (256, 256)
assert (ROOT / "LICENSE").is_file()
print("Local HACS package checks passed (remote HACS/catalog checks remain separate).")
