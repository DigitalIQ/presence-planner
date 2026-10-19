"""Make the repository root importable so tests run with a plain ``pytest`` as well as ``python -m pytest``."""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
