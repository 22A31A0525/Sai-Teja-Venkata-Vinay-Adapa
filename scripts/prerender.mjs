import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const base = "/Sai-Teja-Venkata-Vinay-Adapa/";
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
  let markup = render();
  for (const [source, asset] of Object.entries(manifest)) {
    if (source.startsWith("src/assets/")) markup = markup.replaceAll(`${base}${source}`, `${base}${asset.file}`);
  }
  const template = await readFile("dist/index.html", "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("Prerender root placeholder missing");
  await writeFile("dist/index.html", template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
  console.log("Prerendered shared portfolio and all case-study content.");
} finally {
  await server.close();
}
