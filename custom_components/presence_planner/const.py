"""Constants for Presence Planner."""

from __future__ import annotations

from typing import Final

DOMAIN: Final = "presence_planner"
TITLE: Final = "Presence Planner"

# options (config entry options)
CONF_THIN_DB: Final = "thin_db"
CONF_HOLD_TIME: Final = "hold_time"
CONF_ECHO_WINDOW: Final = "echo_window"
CONF_SPILL_THRESHOLD: Final = "spill_threshold"

DEFAULT_OPTIONS: Final[dict] = {
    CONF_THIN_DB: 10,
    CONF_HOLD_TIME: 30,
    CONF_ECHO_WINDOW: 5,
    CONF_SPILL_THRESHOLD: 0.05,
}

# model defaults (contract: default opts of the core)
HEIGHTS: Final = [0.5, 0.9, 1.3]
HEIGHT_NAMES: Final = {"0.5": "lying", "0.9": "sitting", "1.3": "standing"}
CELL: Final = 0.1
DEFAULT_WALL_HEIGHT: Final = 1.9
DEFAULT_WALL_TILT: Final = 10.0
DEFAULT_CEILING_TILT: Final = 90.0

# binary sensors that count as presence or motion sensors
SENSOR_DEVICE_CLASSES: Final = frozenset({"occupancy", "presence", "motion"})

# repair issue for entries that used NeonPlan as live source before 0.2
ISSUE_IMPORT_NEONPLAN: Final = "import_neonplan"

# entities per room (unique id: <entry>_<floor>_<room>_<key>)
ENTITY_KEYS: Final = ("coverage", "misfire_risk", "occupancy")

# storage
STORAGE_KEY: Final = DOMAIN
STORAGE_VERSION: Final = 1

# recompute debounce in seconds
DEBOUNCE_SECONDS: Final = 2.0

# dispatcher signal for WebSocket subscribers: payload is the revision
SIGNAL_UPDATED: Final = f"{DOMAIN}_updated"

# panel
PANEL_URL_PATH: Final = "presence-planner"
PANEL_TITLE: Final = TITLE
PANEL_ICON: Final = "mdi:radar"
PANEL_COMPONENT: Final = "presence-planner-panel"
STATIC_URL: Final = "/presence_planner/frontend"
PANEL_BUNDLE: Final = "presence-planner-panel.js"
