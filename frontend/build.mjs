// Builds the panel and the optimizer worker into the integration's frontend folder.
import { build, context } from "esbuild";

const common = {
  bundle: true,
  format: "esm",
  target: "es2022",
  minify: true,
  sourcemap: false,
  legalComments: "eof",
  logLevel: "info",
  loader: { ".json": "json" },
};
const targets = [
  { entryPoints: ["frontend/src/panel/index.js"], outfile: "custom_components/presence_planner/frontend/presence-planner-panel.js" },
  { entryPoints: ["frontend/src/core/worker.js"], outfile: "custom_components/presence_planner/frontend/presence-planner-worker.js" },
];
if (process.argv.includes("--watch")) {
  for (const t of targets) await (await context({ ...common, ...t })).watch();
} else {
  for (const t of targets) await build({ ...common, ...t });
}
