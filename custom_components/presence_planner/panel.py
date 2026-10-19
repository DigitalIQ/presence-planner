"""Sidebar panel and static files of the panel bundle."""

from __future__ import annotations

import hashlib
import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN, PANEL_BUNDLE, PANEL_COMPONENT, PANEL_ICON, PANEL_TITLE, PANEL_URL_PATH, STATIC_URL

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"
_STATIC_REGISTERED = f"{DOMAIN}_static_registered"


async def async_register_static(hass: HomeAssistant) -> None:
    """Serve the bundle folder once per run (static paths cannot be removed again)."""
    if hass.data.get(_STATIC_REGISTERED):
        return
    if not await hass.async_add_executor_job(FRONTEND_DIR.is_dir):
        _LOGGER.warning("Presence Planner panel files are missing (%s); the panel stays empty", FRONTEND_DIR)
        return
    await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)])
    hass.data[_STATIC_REGISTERED] = True


def _bundle_hash() -> str:
    """Short content hash of the bundle, so browsers fetch a new build even with the same version."""
    try:
        return hashlib.sha256((FRONTEND_DIR / PANEL_BUNDLE).read_bytes()).hexdigest()[:10]
    except OSError:
        return "missing"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Add the sidebar entry; works without a built bundle (the panel then just does not load)."""
    await async_register_static(hass)
    if not await hass.async_add_executor_job((FRONTEND_DIR / PANEL_BUNDLE).is_file):
        _LOGGER.debug("Panel bundle %s not built yet", PANEL_BUNDLE)
    integration = await async_get_integration(hass, DOMAIN)
    bundle_hash = await hass.async_add_executor_job(_bundle_hash)
    if frontend.async_panel_exists(hass, PANEL_URL_PATH):
        return
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/{PANEL_BUNDLE}?v={integration.version}-{bundle_hash}",
        embed_iframe=False,
        require_admin=False,
        config={},
    )


def async_remove_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
