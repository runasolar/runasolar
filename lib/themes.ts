/**
 * COLOUR PALETTES
 * ─────────────────────────────────────────────────────────────────
 * Every palette is a complete set of CSS-variable values.
 *
 * To swap a palette across the whole site:
 *   1. Pick a key from `THEMES` below
 *   2. Copy its `vars` block into globals.css `:root { ... }`
 * That's it. Tailwind classes (bg-bg, text-ink, bg-leaf-600, ...) auto-update.
 *
 * Each value is space-separated RGB (no commas) so Tailwind's
 * "/<alpha>" opacity modifier keeps working: bg-bg/30, text-ink/60, etc.
 */

export type ThemeVars = {
  "--color-bg": string;
  "--color-bg-warm": string;
  "--color-bg-deep": string;
  "--color-ink": string;
  "--color-ink-muted": string;
  "--color-ink-soft": string;
  "--color-leaf-50": string;
  "--color-leaf-100": string;
  "--color-leaf-200": string;
  "--color-leaf-400": string;
  "--color-leaf-500": string;
  "--color-leaf-600": string;
  "--color-leaf-700": string;
  "--color-leaf-900": string;
  "--color-sun-50": string;
  "--color-sun-200": string;
  "--color-sun-400": string;
  "--color-sun-500": string;
  "--color-sun-600": string;
  "--color-line": string;
  "--color-sky-mist": string;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  /** Five preview swatches (background, surface, primary, accent, text) for chips */
  swatches: { label: string; hex: string }[];
  vars: ThemeVars;
};

/* ── Earth Forest — current default ──────────────────────────── */
export const earthForest: Theme = {
  id: "earth-forest",
  name: "Earth Forest",
  description:
    "Off-white + deep forest green + warm sun gold. Sustainable, earthy, calm.",
  swatches: [
    { label: "Background", hex: "#FAFAF7" },
    { label: "Surface", hex: "#F2EDE4" },
    { label: "Primary", hex: "#2E5D3A" },
    { label: "Accent", hex: "#E8B340" },
    { label: "Ink", hex: "#1A1F1B" },
  ],
  vars: {
    "--color-bg": "250 250 247",
    "--color-bg-warm": "242 237 228",
    "--color-bg-deep": "26 31 27",
    "--color-ink": "26 31 27",
    "--color-ink-muted": "92 102 96",
    "--color-ink-soft": "138 147 141",
    "--color-leaf-50": "239 245 240",
    "--color-leaf-100": "217 230 220",
    "--color-leaf-200": "176 205 182",
    "--color-leaf-400": "90 140 102",
    "--color-leaf-500": "63 115 80",
    "--color-leaf-600": "46 93 58",
    "--color-leaf-700": "35 73 45",
    "--color-leaf-900": "19 38 26",
    "--color-sun-50": "255 247 226",
    "--color-sun-200": "247 221 146",
    "--color-sun-400": "239 194 92",
    "--color-sun-500": "232 179 64",
    "--color-sun-600": "200 147 43",
    "--color-line": "229 224 214",
    "--color-sky-mist": "157 183 196",
  },
};

/* ── Solar Noir — premium tech, dark + bright gold ────────────── */
export const solarNoir: Theme = {
  id: "solar-noir",
  name: "Solar Noir",
  description:
    "Deep charcoal bg + bright sun gold + cream text. Premium tech, dramatic.",
  swatches: [
    { label: "Background", hex: "#0F1115" },
    { label: "Surface", hex: "#1A1D24" },
    { label: "Primary", hex: "#F5C24A" },
    { label: "Accent", hex: "#E89D2A" },
    { label: "Ink", hex: "#F4F1EA" },
  ],
  vars: {
    "--color-bg": "15 17 21",
    "--color-bg-warm": "26 29 36",
    "--color-bg-deep": "8 9 11",
    "--color-ink": "244 241 234",
    "--color-ink-muted": "176 173 165",
    "--color-ink-soft": "120 118 110",
    "--color-leaf-50": "47 50 38",
    "--color-leaf-100": "70 76 53",
    "--color-leaf-200": "100 110 75",
    "--color-leaf-400": "165 180 110",
    "--color-leaf-500": "200 215 135",
    "--color-leaf-600": "220 235 160",
    "--color-leaf-700": "225 238 175",
    "--color-leaf-900": "240 245 215",
    "--color-sun-50": "60 47 19",
    "--color-sun-200": "180 130 50",
    "--color-sun-400": "232 157 42",
    "--color-sun-500": "245 194 74",
    "--color-sun-600": "255 211 110",
    "--color-line": "44 49 60",
    "--color-sky-mist": "120 138 160",
  },
};

/* ── Sky Mint — light, fresh, oceanic ────────────────────────── */
export const skyMint: Theme = {
  id: "sky-mint",
  name: "Sky Mint",
  description:
    "Soft sky blue bg + fresh mint primary + warm sand accent. Airy, friendly.",
  swatches: [
    { label: "Background", hex: "#F4F8FB" },
    { label: "Surface", hex: "#E5EFEF" },
    { label: "Primary", hex: "#2D7A6E" },
    { label: "Accent", hex: "#E8A95A" },
    { label: "Ink", hex: "#1B2630" },
  ],
  vars: {
    "--color-bg": "244 248 251",
    "--color-bg-warm": "229 239 239",
    "--color-bg-deep": "27 38 48",
    "--color-ink": "27 38 48",
    "--color-ink-muted": "82 100 113",
    "--color-ink-soft": "138 156 168",
    "--color-leaf-50": "230 244 240",
    "--color-leaf-100": "200 228 220",
    "--color-leaf-200": "150 200 188",
    "--color-leaf-400": "70 145 130",
    "--color-leaf-500": "55 130 115",
    "--color-leaf-600": "45 122 110",
    "--color-leaf-700": "35 100 88",
    "--color-leaf-900": "20 60 53",
    "--color-sun-50": "255 240 215",
    "--color-sun-200": "245 215 155",
    "--color-sun-400": "238 188 110",
    "--color-sun-500": "232 169 90",
    "--color-sun-600": "200 138 58",
    "--color-line": "215 226 230",
    "--color-sky-mist": "175 200 218",
  },
};

/* ── Copper Olive — mediterranean warm earth ─────────────────── */
export const copperOlive: Theme = {
  id: "copper-olive",
  name: "Copper Olive",
  description:
    "Warm beige bg + olive green primary + copper accent. Mediterranean, grounded.",
  swatches: [
    { label: "Background", hex: "#F6F1E6" },
    { label: "Surface", hex: "#EAE0CC" },
    { label: "Primary", hex: "#5C6B3A" },
    { label: "Accent", hex: "#C0703A" },
    { label: "Ink", hex: "#2C2418" },
  ],
  vars: {
    "--color-bg": "246 241 230",
    "--color-bg-warm": "234 224 204",
    "--color-bg-deep": "44 36 24",
    "--color-ink": "44 36 24",
    "--color-ink-muted": "108 96 76",
    "--color-ink-soft": "152 138 116",
    "--color-leaf-50": "236 240 220",
    "--color-leaf-100": "215 224 188",
    "--color-leaf-200": "175 192 138",
    "--color-leaf-400": "112 130 78",
    "--color-leaf-500": "92 107 58",
    "--color-leaf-600": "78 92 48",
    "--color-leaf-700": "62 74 36",
    "--color-leaf-900": "32 40 18",
    "--color-sun-50": "248 232 210",
    "--color-sun-200": "232 195 142",
    "--color-sun-400": "210 152 90",
    "--color-sun-500": "192 112 58",
    "--color-sun-600": "162 90 42",
    "--color-line": "222 212 192",
    "--color-sky-mist": "178 188 175",
  },
};

/* ── Midnight Solar — dramatic navy + electric yellow ────────── */
export const midnightSolar: Theme = {
  id: "midnight-solar",
  name: "Midnight Solar",
  description:
    "Deep navy bg + electric yellow primary + cool ice white. Sci-fi, dramatic.",
  swatches: [
    { label: "Background", hex: "#0E1626" },
    { label: "Surface", hex: "#172339" },
    { label: "Primary", hex: "#FFD53D" },
    { label: "Accent", hex: "#62B5FF" },
    { label: "Ink", hex: "#EDF1F8" },
  ],
  vars: {
    "--color-bg": "14 22 38",
    "--color-bg-warm": "23 35 57",
    "--color-bg-deep": "6 10 18",
    "--color-ink": "237 241 248",
    "--color-ink-muted": "165 178 200",
    "--color-ink-soft": "115 130 158",
    "--color-leaf-50": "30 38 60",
    "--color-leaf-100": "44 60 100",
    "--color-leaf-200": "70 100 160",
    "--color-leaf-400": "98 181 255",
    "--color-leaf-500": "120 198 255",
    "--color-leaf-600": "140 212 255",
    "--color-leaf-700": "160 225 255",
    "--color-leaf-900": "210 240 255",
    "--color-sun-50": "60 50 18",
    "--color-sun-200": "200 168 60",
    "--color-sun-400": "240 200 60",
    "--color-sun-500": "255 213 61",
    "--color-sun-600": "255 230 80",
    "--color-line": "38 52 80",
    "--color-sky-mist": "120 150 195",
  },
};

/* ── Sage & Honey — soft boutique luxury ─────────────────────── */
export const sageHoney: Theme = {
  id: "sage-honey",
  name: "Sage & Honey",
  description:
    "Cream bg + soft sage green + honey gold. Soft, premium, boutique-feel.",
  swatches: [
    { label: "Background", hex: "#FBF8F1" },
    { label: "Surface", hex: "#F0EBDD" },
    { label: "Primary", hex: "#7E9B7E" },
    { label: "Accent", hex: "#D4A148" },
    { label: "Ink", hex: "#2A2C26" },
  ],
  vars: {
    "--color-bg": "251 248 241",
    "--color-bg-warm": "240 235 221",
    "--color-bg-deep": "42 44 38",
    "--color-ink": "42 44 38",
    "--color-ink-muted": "106 112 96",
    "--color-ink-soft": "150 156 138",
    "--color-leaf-50": "238 242 232",
    "--color-leaf-100": "220 230 210",
    "--color-leaf-200": "184 200 170",
    "--color-leaf-400": "138 165 138",
    "--color-leaf-500": "112 142 112",
    "--color-leaf-600": "126 155 126",
    "--color-leaf-700": "92 120 92",
    "--color-leaf-900": "55 75 55",
    "--color-sun-50": "252 240 210",
    "--color-sun-200": "238 210 138",
    "--color-sun-400": "224 178 88",
    "--color-sun-500": "212 161 72",
    "--color-sun-600": "180 132 50",
    "--color-line": "224 217 200",
    "--color-sky-mist": "186 195 188",
  },
};

export const THEMES = {
  earthForest,
  solarNoir,
  skyMint,
  copperOlive,
  midnightSolar,
  sageHoney,
} as const;

/**
 * Active theme (compile-time choice).
 * To use: copy the `vars` of the chosen theme into globals.css :root.
 */
export const ACTIVE_THEME: Theme = earthForest;
