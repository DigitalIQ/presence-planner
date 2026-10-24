"""Config and options flow."""

from __future__ import annotations

from unittest.mock import patch

from homeassistant.config_entries import SOURCE_USER
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

DOMAIN = "presence_planner"


async def test_user_flow_creates_single_entry(hass: HomeAssistant) -> None:
    """The user step creates one entry with default options; a second attempt aborts."""
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"
    with patch("custom_components.presence_planner.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Presence Planner"
    assert result["options"] == {
        "thin_db": 10,
        "hold_time": 30,
        "echo_window": 5,
        "spill_threshold": 0.05,
    }
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] in ("single_instance_allowed", "already_configured")


async def test_options_flow(hass: HomeAssistant, config_entry: MockConfigEntry, stored_demo: dict) -> None:
    """The options are stored and the entry reloads."""
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    result = await hass.config_entries.options.async_init(config_entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "init"
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"thin_db": 6, "hold_time": 60, "echo_window": 3, "spill_threshold": 0.1},
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert config_entry.options == {
        "thin_db": 6.0,
        "hold_time": 60.0,
        "echo_window": 3.0,
        "spill_threshold": 0.1,
    }
    coordinator = config_entry.runtime_data
    assert coordinator.hold_time == 60
