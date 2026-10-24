"""Config flow for Presence Planner: one entry, settings in the options."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlowWithReload
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    CONF_ECHO_WINDOW,
    CONF_HOLD_TIME,
    CONF_SPILL_THRESHOLD,
    CONF_THIN_DB,
    DEFAULT_OPTIONS,
    DOMAIN,
    TITLE,
)


def _number(minimum: float, maximum: float, step: float, unit: str | None = None) -> selector.NumberSelector:
    config = selector.NumberSelectorConfig(min=minimum, max=maximum, step=step, mode=selector.NumberSelectorMode.BOX)
    if unit:
        config["unit_of_measurement"] = unit
    return selector.NumberSelector(config)


def options_schema(options: dict[str, Any]) -> vol.Schema:
    """Schema of the options form, prefilled with the current values."""
    current = {**DEFAULT_OPTIONS, **options}
    return vol.Schema(
        {
            vol.Required(CONF_THIN_DB, default=current[CONF_THIN_DB]): _number(0, 40, 1, "dB"),
            vol.Required(CONF_HOLD_TIME, default=current[CONF_HOLD_TIME]): _number(0, 3600, 1, "s"),
            vol.Required(CONF_ECHO_WINDOW, default=current[CONF_ECHO_WINDOW]): _number(0, 600, 1, "s"),
            vol.Required(CONF_SPILL_THRESHOLD, default=current[CONF_SPILL_THRESHOLD]): _number(0, 1, 0.01),
        }
    )


class PresencePlannerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Create the single entry."""

    VERSION = 1
    MINOR_VERSION = 2

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Confirm and create the entry with default options."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title=TITLE, data={}, options=dict(DEFAULT_OPTIONS))

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> PresencePlannerOptionsFlow:
        """Return the options flow."""
        return PresencePlannerOptionsFlow()


class PresencePlannerOptionsFlow(OptionsFlowWithReload):
    """Thin wall attenuation and the cleaned occupancy timings."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show and store the options (the entry reloads afterwards)."""
        if user_input is not None:
            data = {
                CONF_THIN_DB: float(user_input[CONF_THIN_DB]),
                CONF_HOLD_TIME: float(user_input[CONF_HOLD_TIME]),
                CONF_ECHO_WINDOW: float(user_input[CONF_ECHO_WINDOW]),
                CONF_SPILL_THRESHOLD: float(user_input[CONF_SPILL_THRESHOLD]),
            }
            return self.async_create_entry(data=data)
        return self.async_show_form(step_id="init", data_schema=options_schema(dict(self.config_entry.options)))
