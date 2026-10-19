"""Suggest a sensor profile per entity from the device registry."""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er

from .const import SENSOR_DEVICE_CLASSES


def device_text(hass: HomeAssistant, entity_id: str) -> str:
    """'manufacturer model name' of the entity's device, lowercase ('' without a device)."""
    entry = er.async_get(hass).async_get(entity_id)
    if entry is None or entry.device_id is None:
        return ""
    device = dr.async_get(hass).async_get(entry.device_id)
    if device is None:
        return ""
    parts = [device.manufacturer, device.model, device.model_id, device.name_by_user or device.name]
    return " ".join(str(p) for p in parts if p).lower()


def match_profile(text: str, profiles: dict[str, Any]) -> str | None:
    """The profile whose longest `match` substring occurs in the text (None: no match)."""
    if not text:
        return None
    best: tuple[int, str] | None = None
    for profile in profiles.get("profiles", []):
        if profile.get("id") == "custom":
            continue
        for needle in profile.get("match") or []:
            needle = str(needle).lower()
            if needle and needle in text and (best is None or len(needle) > best[0]):
                best = (len(needle), profile["id"])
    return best[1] if best else None


def suggest_profile(hass: HomeAssistant, entity_id: str, profiles: dict[str, Any]) -> str | None:
    """Suggested profile id for one entity."""
    return match_profile(device_text(hass, entity_id), profiles)


def entity_device_class(hass: HomeAssistant, entity_id: str) -> str | None:
    """Device class from the state, else from the entity registry."""
    if (state := hass.states.get(entity_id)) is not None and state.attributes.get("device_class"):
        return state.attributes["device_class"]
    entry = er.async_get(hass).async_get(entity_id)
    if entry is not None:
        return entry.device_class or entry.original_device_class
    return None


def is_presence_entity(hass: HomeAssistant, entity_id: str) -> bool:
    """A binary_sensor with device class occupancy, presence or motion."""
    return entity_id.startswith("binary_sensor.") and entity_device_class(hass, entity_id) in SENSOR_DEVICE_CLASSES


def presence_entities(hass: HomeAssistant) -> list[str]:
    """All presence, occupancy and motion binary sensors (states and registry)."""
    ids = set(hass.states.async_entity_ids("binary_sensor"))
    ids.update(e.entity_id for e in er.async_get(hass).entities.values() if e.domain == "binary_sensor")
    return sorted(e for e in ids if is_presence_entity(hass, e))


def device_profiles(hass: HomeAssistant, profiles: dict[str, Any]) -> dict[str, dict[str, Any]]:
    """Suggested profile per presence entity: {entity_id: {profile, device}}."""
    result = {}
    for entity_id in presence_entities(hass):
        text = device_text(hass, entity_id)
        result[entity_id] = {"profile": match_profile(text, profiles), "device": text or None}
    return result
