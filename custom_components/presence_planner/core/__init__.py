"""Pure Python presence planner core: geometry, 3D detection, coverage, spill and mount point search.

No Home Assistant imports, standard library only.  The public API is fixed by ARCHITECTURE.md.
"""

from .detection import detect
from .evaluate import evaluate
from .model import build_model, model_to_dict
from .optimize import optimize
from .profiles import load_profiles, resolve_sensor
from .spill import spill_detail

__all__ = [
    "build_model",
    "detect",
    "evaluate",
    "load_profiles",
    "model_to_dict",
    "optimize",
    "resolve_sensor",
    "spill_detail",
]
