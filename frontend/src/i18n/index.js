// Panel translations. Language follows `hass.language`, fallback English.
import en from "./en.json" with { type: "json" };
import de from "./de.json" with { type: "json" };

export const LANGUAGES = { en, de };

/** Picks the dictionary for a Home Assistant language tag such as "de", "de-CH" or "en-GB". */
export function pickLanguage(language) {
  const base = String(language || "en").toLowerCase().split(/[-_]/)[0];
  return LANGUAGES[base] ? base : "en";
}

/**
 * Returns a translate function `t(key, vars)`. Placeholders are written `{name}`.
 * Missing keys fall back to English, then to the key itself.
 */
export function createTranslator(language) {
  const lang = pickLanguage(language);
  const dict = LANGUAGES[lang];
  const t = (key, vars) => {
    let s = dict[key];
    if (s === undefined) s = en[key];
    if (s === undefined) return key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] === undefined || vars[k] === null ? m : String(vars[k])));
    return s;
  };
  t.lang = lang;
  t.has = (key) => dict[key] !== undefined || en[key] !== undefined;
  return t;
}

/** Number formatting in the UI language. */
export function createFormatter(language) {
  const lang = pickLanguage(language);
  const cache = new Map();
  const nf = (digits) => {
    if (!cache.has(digits)) cache.set(digits, new Intl.NumberFormat(lang, { minimumFractionDigits: digits, maximumFractionDigits: digits }));
    return cache.get(digits);
  };
  // Values that round to zero are shown without a minus sign ("-0,00" reads like an error).
  const show = (v, digits) => {
    const f = 10 ** digits;
    const r = Math.round(v * f) / f;
    return nf(digits).format(r === 0 ? 0 : r);
  };
  const missing = (v) => v === null || v === undefined || Number.isNaN(+v);
  return {
    num: (v, digits = 0) => (missing(v) ? "–" : show(+v, digits)),
    pct: (share, digits = 0) => (missing(share) ? "–" : `${show(+share * 100, digits)} %`),
  };
}
