// Side panel templates: sensor cards, results, optimizer, assumptions.
// Each function takes the panel element `h` and reads its state; actions go back through `h`.
import { html, nothing } from "lit";
import { live } from "lit/directives/live.js";
import * as S from "./state.js";

const zoneLabel = (h, name) => (h.t.has(`zone.${name}`) ? h.t(`zone.${name}`) : name);

function numberField(h, s, key, { step = 1, label, unit = "" }) {
  const lim = S.LIMITS[key];
  return html`<label for="f-${key}">${label}${unit ? html` <span class="muted">${unit}</span>` : nothing}</label>
    <span></span>
    <input id="f-${key}" type="number" min=${lim[0]} max=${lim[1]} step=${step} .value=${live(String(s[key] ?? ""))}
      @change=${(e) => h.patchSensor(s.entity_id, { [key]: e.target.value })} />`;
}

function sensorFields(h, s) {
  const t = h.t;
  const profiles = S.profileList(h.profiles);
  const p = S.findProfile(h.profiles, s.profile);
  const mounts = (p && p.mounts) || S.MOUNTS;
  const stats = h._stats && h._stats.sensors && h._stats.sensors[s.entity_id];
  const glass = s.active !== false && stats && stats.glass > S.GLASS_WARN;
  return html`<div class="fields" @click=${(e) => e.stopPropagation()}>
    <label for="f-profile">${t("sensor.profile")}</label>
    <div class="wide">
      <select id="f-profile" style="width:100%" .value=${live(s.profile || "custom")} @change=${(e) => h.setProfile(s.entity_id, e.target.value)}>
        ${profiles.map((x) => html`<option value=${x.id} ?selected=${x.id === s.profile}>${x.id === "custom" ? t("profile.custom") : x.name}</option>`)}
      </select>
      ${p && !p.verified ? html`<span class="unverified" title=${t("profile.unverified_hint")}>${t("profile.unverified")}</span>` : nothing}
      ${p && p.fov_v == null && s.mount !== "ceiling" ? html`<div class="muted">${t("profile.fov_v_assumed", { fov: h.profiles.default_fov_v || S.DEFAULT_FOV_V })}</div>` : nothing}
    </div>

    <label for="f-mount">${t("sensor.mount")}</label>
    <select id="f-mount" class="wide" .value=${live(s.mount || "wall")} @change=${(e) => h.setMount(s.entity_id, e.target.value)}>
      ${S.MOUNTS.map((m) => html`<option value=${m} ?selected=${m === s.mount} ?disabled=${!mounts.includes(m)}>${t(`mount.${m}`)}</option>`)}
    </select>

    <label for="f-phi">${t("sensor.phi")} <span class="muted">°</span></label>
    <input type="range" min="0" max="359" step="1" aria-label=${t("sensor.phi")} .value=${live(String(Math.round(s.phi || 0)))} ?disabled=${s.mount === "ceiling"}
      @input=${(e) => h.patchSensor(s.entity_id, { phi: e.target.value }, true)} @change=${(e) => h.patchSensor(s.entity_id, { phi: e.target.value })} />
    <input id="f-phi" type="number" min="0" max="359" step="1" .value=${live(String(Math.round(s.phi || 0)))} ?disabled=${s.mount === "ceiling"}
      @change=${(e) => h.patchSensor(s.entity_id, { phi: e.target.value })} />

    ${numberField(h, s, "height", { step: 0.05, label: t("sensor.height"), unit: "m" })}
    ${numberField(h, s, "tilt", { step: 1, label: t("sensor.tilt"), unit: "°" })}
    ${numberField(h, s, "fov_h", { step: 5, label: t("sensor.fov_h"), unit: "°" })}
    ${numberField(h, s, "fov_v", { step: 5, label: t("sensor.fov_v"), unit: "°" })}
    ${numberField(h, s, "reach", { step: 0.1, label: t("sensor.reach"), unit: "m" })}
    ${numberField(h, s, "x", { step: 0.01, label: t("sensor.x"), unit: "m" })}
    ${numberField(h, s, "z", { step: 0.01, label: t("sensor.z"), unit: "m" })}

    ${glass ? html`<div class="full warn">${t("sensor.glass_warning")}</div>` : nothing}
    ${h.isAdmin
      ? html`<div class="full"><button @click=${() => h.removeSensor(s.entity_id)}>${t("sensor.remove")}</button></div>`
      : nothing}
  </div>`;
}

export function renderSensors(h, sensors) {
  const t = h.t;
  const st = h._s;
  const colors = h.colors;
  const candidates = h.hass ? S.sensorCandidates(h.hass.states, st.sensors) : [];
  const addId = h._addEntity || (candidates[0] && candidates[0].entity_id) || "";
  const suggested = addId && st.deviceProfiles[addId] ? S.findProfile(h.profiles, st.deviceProfiles[addId]) : null;
  return html`<section class="box" aria-labelledby="h-sensors">
    <h2 id="h-sensors">${t("sensors.title")}</h2>
    ${sensors.length ? nothing : html`<p class="muted">${t("sensors.empty")}</p>`}
    <div class="cards">
      ${sensors.map((s, i) => {
        const sel = s.entity_id === st.selected;
        const room = h.roomOf(s);
        return html`<div class="card ${sel ? "sel" : ""} ${s.active === false ? "off" : ""}" @click=${() => h.select(s.entity_id)}>
          <span class="dot" style="background:${colors[s.entity_id]}"></span>
          <button class="namebtn" aria-pressed=${sel ? "true" : "false"} aria-label=${t("sensors.select", { name: h.name(s.entity_id) })}
            @click=${(e) => { e.stopPropagation(); h.select(s.entity_id); }}>${i + 1}. ${h.name(s.entity_id)}</button>
          <label class="chk" @click=${(e) => e.stopPropagation()}>
            <input type="checkbox" .checked=${live(s.active !== false)} @change=${(e) => h.patchSensor(s.entity_id, { active: e.target.checked })} />
            ${t("sensor.active")}
          </label>
          <span class="meta">${h.roomName(room)} · ${t(`mount.${s.mount || "wall"}`)} · ${h.fmt.num(s.height, 2)} m · ${Math.round(s.phi || 0)}°</span>
          ${sel ? sensorFields(h, s) : nothing}
        </div>`;
      })}
    </div>
    ${candidates.length
      ? html`<div class="row">
          <select aria-label=${t("sensors.add_select")} .value=${live(addId)} @change=${(e) => (h._addEntity = e.target.value)}>
            ${candidates.map((c) => html`<option value=${c.entity_id} ?selected=${c.entity_id === addId}>${c.name}</option>`)}
          </select>
          <button ?disabled=${!h._model || !h.isAdmin} @click=${() => h.addSensor()}>${t("sensors.add")}</button>
        </div>
        ${suggested ? html`<div class="muted">${t("sensors.suggested_profile", { profile: suggested.name })}</div>` : nothing}`
      : html`<p class="muted">${t("sensors.no_candidates")}</p>`}
  </section>`;
}

export function renderResults(h) {
  const t = h.t;
  const f = h.fmt;
  const ev = h._stats;
  const rooms = (h._model && h._model.rooms) || [];
  if (!ev || !ev.rooms) return html`<section class="box"><h2>${t("results.title")}</h2><p class="muted">${t("results.none")}</p></section>`;
  const spills = [];
  const glass = [];
  for (const s of S.sensorsOnFloor(h._s)) {
    const v = ev.sensors && ev.sensors[s.entity_id];
    if (!v || s.active === false) continue;
    for (const [rid, share] of Object.entries(v.spill || {})) if (share >= 0.01) spills.push({ s, rid, share });
    if (v.glass > S.GLASS_WARN) glass.push(s);
  }
  spills.sort((a, b) => b.share - a.share);
  const zones = [...(ev.zones || [])].sort((a, b) => h.roomName(a.room).localeCompare(h.roomName(b.room)) || a.name.localeCompare(b.name));
  return html`<section class="box" aria-labelledby="h-results">
    <h2 id="h-results">${t("results.title")}</h2>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th scope="col">${t("results.room")}</th>
          ${S.HEIGHTS.map((x) => html`<th scope="col" class="num" title=${t(`height.h${String(x).replace(".", "")}`)}>${f.num(x, 1)} m</th>`)}
          <th scope="col" class="num" title=${t("results.misfire_hint")}>${t("results.misfire")}</th>
        </tr></thead>
        <tbody>
          ${rooms.map((r) => {
            const v = ev.rooms[r.id];
            if (!v) return nothing;
            const own = (v.own_sensors || []).length > 0;
            const from = Object.entries(v.from || {}).filter(([, x]) => x >= 0.01).sort((a, b) => b[1] - a[1]);
            return html`<tr class=${from.length ? "has-from" : ""}>
              <th scope="row" style="font-weight:500;color:inherit">${r.name || r.id}
                <div class="bar" aria-hidden="true"><i style="width:${Math.round((own ? v.coverage_mean : 0) * 100)}%"></i></div></th>
              ${own
                ? S.HEIGHTS.map((x) => html`<td class="num">${f.pct(v.coverage[String(x)])}</td>`)
                : html`<td class="num muted" colspan="3">${t("results.no_sensor")}</td>`}
              <td class="num ${v.misfire_risk >= 0.05 ? "spill" : ""}">${f.pct(v.misfire_risk)}</td>
            </tr>
            ${from.length
              ? html`<tr class="from"><td colspan="5" class="spill">${t("results.seen_from")}: ${from.map(([eid, x], i) => html`${i ? ", " : ""}${h.name(eid)} <span style="white-space:nowrap">${f.pct(x)}</span>`)}</td></tr>`
              : nothing}`;
          })}
        </tbody>
      </table>
    </div>
    ${spills.length
      ? html`<ul class="spill" aria-label=${t("results.spill_list")}>${spills.map((x) => html`<li>${t("results.spill_line", { sensor: h.name(x.s.entity_id), share: f.pct(x.share), room: h.roomName(x.rid) })}</li>`)}</ul>`
      : html`<p class="muted">${t("results.no_spill")}</p>`}
    ${glass.length
      ? html`<div class="warn" role="note"><strong>${t("results.glass_title")}</strong><ul>${glass.map((s) => html`<li>${t("results.glass_line", { sensor: h.name(s.entity_id) })}</li>`)}</ul></div>`
      : nothing}
    ${zones.length
      ? html`<h2>${t("results.zones")}</h2>
          <div class="kv">${zones.map((z) => {
            const own = ev.rooms[z.room] && (ev.rooms[z.room].own_sensors || []).length;
            return html`<span>${zoneLabel(h, z.name)} <span class="muted">(${h.roomName(z.room)}, ${f.num(z.height, 1)} m)</span></span><span class="v">${own ? f.pct(z.share) : "–"}</span>`;
          })}</div>`
      : nothing}
  </section>`;
}

function candidateRow(h, roomId, c, i, target) {
  const t = h.t;
  const f = h.fmt;
  const spill = Object.values(c.spill || {}).reduce((a, b) => a + b, 0);
  return html`<div class="result">
    <span><strong>${i + 1}.</strong> ${t("optimizer.coverage")} ${f.pct(c.coverage)} · ${t("optimizer.spill")} ${f.pct(spill)}${c.glass > 0.05 ? html` · <span class="warn">${t("optimizer.glass")}</span>` : nothing}</span>
    <button ?disabled=${!target} title=${target ? t("optimizer.apply_to", { name: h.name(target) }) : t("optimizer.no_target")}
      aria-label=${target ? t("optimizer.apply_to", { name: h.name(target) }) : t("optimizer.no_target")}
      @click=${() => h.applyCandidate(target, c)}>${t("optimizer.apply")}</button>
    <span class="meta">${t(`mount.${c.mount || "wall"}`)} · x ${f.num(c.x, 2)} · z ${f.num(c.z, 2)} · ${f.num(c.height, 2)} m${c.mount === "ceiling" ? nothing : html` · ${Math.round(c.phi)}° · ${t("sensor.tilt")} ${Math.round(c.tilt)}°`} · ${t("optimizer.score")} ${f.num(c.score, 3)}</span>
  </div>`;
}

export function renderOptimizer(h) {
  const t = h.t;
  const o = h._opt;
  const rooms = (h._model && h._model.rooms) || [];
  const roomId = h.optimizerRoom();
  const profileId = h.optimizerProfile();
  const sensors = S.sensorsOnFloor(h._s);
  const target = h.optimizerTarget(roomId);
  const results = o.results;
  return html`<section class="box" aria-labelledby="h-opt">
    <h2 id="h-opt">${t("optimizer.title")}</h2>
    <div class="row">
      <label for="o-room" class="muted">${t("optimizer.room")}</label>
      <select id="o-room" .value=${live(roomId || "")} @change=${(e) => h.setOpt({ roomId: e.target.value, target: null })}>
        ${rooms.map((r) => html`<option value=${r.id} ?selected=${r.id === roomId}>${r.name || r.id}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-profile" class="muted">${t("optimizer.profile")}</label>
      <select id="o-profile" .value=${live(profileId)} @change=${(e) => h.setOpt({ profileId: e.target.value })}>
        ${S.profileList(h.profiles).map((p) => html`<option value=${p.id} ?selected=${p.id === profileId}>${p.id === "custom" ? t("profile.custom") : p.name}</option>`)}
      </select>
    </div>
    <div class="row">
      <label for="o-target" class="muted">${t("optimizer.target")}</label>
      <select id="o-target" .value=${live(target || "-")} @change=${(e) => h.setOpt({ target: e.target.value })}>
        <option value="-">${t("optimizer.target_none")}</option>
        ${sensors.map((s) => html`<option value=${s.entity_id} ?selected=${s.entity_id === target}>${h.name(s.entity_id)}</option>`)}
      </select>
    </div>
    <div>
      <label for="o-weight" class="muted">${t("optimizer.weight", { value: h.fmt.num(h._s.weight, 1) })}</label>
      <div class="slider">
        <span>${t("optimizer.weight_coverage")}</span>
        <input id="o-weight" type="range" min="0" max="2" step="0.1" .value=${live(String(h._s.weight))} @input=${(e) => h.setOption("weight", +e.target.value)} />
        <span>${t("optimizer.weight_misfire")}</span>
      </div>
    </div>
    <div class="row">
      <button class="primary" ?disabled=${o.running || !roomId} @click=${() => h.runOptimizer(false)}>${t("optimizer.run_room")}</button>
      <button ?disabled=${o.running || !rooms.length} @click=${() => h.runOptimizer(true)}>${t("optimizer.run_all")}</button>
      ${o.running ? html`<button @click=${() => h.cancelOptimizer()}>${t("action.cancel")}</button>` : nothing}
    </div>
    ${o.running
      ? html`<div role="status" aria-live="polite">
          <progress max="1" .value=${o.progress} aria-label=${t("optimizer.progress")}></progress>
          <span class="muted">${t("optimizer.running", { room: h.roomName(o.currentRoom), pct: h.fmt.pct(o.progress) })}</span>
        </div>`
      : nothing}
    ${o.error ? html`<p class="spill" role="alert">${t("optimizer.error", { detail: o.error })}</p>` : nothing}
    ${results
      ? html`<div class="results">
          ${Object.entries(results).map(([rid, list], idx) => {
            const tgt = o.scope === "all" ? S.optimizerTarget(h._s, rid, (s) => h.roomOf(s)) : target;
            if (!Array.isArray(list)) return html`<p class="spill">${h.roomName(rid)}: ${t("optimizer.error", { detail: list.error })}</p>`;
            return html`<details ?open=${o.scope !== "all" || idx === 0}>
              <summary>${h.roomName(rid)}${list[0] ? html` · ${t("optimizer.coverage")} ${h.fmt.pct(list[0].coverage)}` : nothing}</summary>
              <div class="results">
                ${list.length ? list.map((c, i) => candidateRow(h, rid, c, i, tgt)) : html`<p class="muted">${t("optimizer.no_result")}</p>`}
              </div>
            </details>`;
          })}
        </div>`
      : html`<p class="muted">${t("optimizer.intro")}</p>`}
  </section>`;
}

export function renderAssumptions(h) {
  const t = h.t;
  const st = h._s;
  const floor = S.floorOf(st);
  const contacts = ((floor && floor.openings) || []).some((o) => o.type !== "window" && o.contact);
  return html`<section class="box" aria-labelledby="h-assume">
    <h2 id="h-assume">${t("assume.title")}</h2>
    <div class="row">
      <span class="muted">${t("assume.doors")}</span>
      <div class="seg" role="group" aria-label=${t("assume.doors")}>
        ${S.DOOR_MODES.map((m) => html`<button aria-pressed=${st.doorsMode === m ? "true" : "false"} ?disabled=${m === "live" && !contacts}
          title=${m === "live" && !contacts ? t("assume.doors_live_none") : ""} @click=${() => h.setOption("doorsMode", m)}>${t(`assume.doors_${m}`)}</button>`)}
      </div>
    </div>
    <div class="kv"><label for="a-thin">${t("assume.thin")}</label><span class="v">${st.thinDb} dB</span></div>
    <input id="a-thin" type="range" min="4" max="18" step="1" .value=${live(String(st.thinDb))}
      @input=${(e) => h.setOption("thinDb", +e.target.value, true)} @change=${(e) => h.setOption("thinDb", +e.target.value)} />
    <label class="chk"><input type="checkbox" .checked=${live(st.snap)} @change=${(e) => h.setOption("snap", e.target.checked)} /> ${t("assume.snap")}</label>
    <label class="chk"><input type="checkbox" .checked=${live(st.cones)} @change=${(e) => h.setOption("cones", e.target.checked)} /> ${t("assume.cones")}</label>
    <details><summary>${t("assume.how_title")}</summary><p>${t("assume.how_text")}</p></details>
  </section>`;
}
