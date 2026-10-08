import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { featuredProjects } from "../src/content/portfolio.js";
import { caseStudies } from "../src/content/case-studies.js";

const html = await readFile("dist/index.html", "utf8");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "Exactly one prerendered main heading required");
assert.ok(html.includes("Backend Engineer"), "Prerendered portfolio content missing");
assert.ok(!html.includes("/src/assets/"), "Development asset URLs leaked into release HTML");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "Duplicate HTML IDs");
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
for (const project of featuredProjects) assert.ok(ids.includes(`${project.id}-case-study`), `Missing study ${project.id}`);
for (const study of caseStudies) for (const source of study.sources) assert.ok(source.url.startsWith("https://github.com/"), "Unexpected evidence URL");
for (const match of html.matchAll(/(?:src|href)="\/Sai-Teja-Venkata-Vinay-Adapa\/([^"#?]+)"/g)) {
  assert.ok(!match[1].includes(".."), "Asset path escapes dist");
  await stat(`dist/${match[1]}`);
}
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
let initialBytes = 0;
const seen = new Set();
async function measure(key) {
  if (seen.has(key)) return;
  seen.add(key);
  const chunk = manifest[key];
  if (!chunk) return;
  if (chunk.file.endsWith(".js")) initialBytes += gzipSync(await readFile(`dist/${chunk.file}`)).length;
  for (const dependency of chunk.imports || []) await measure(dependency);
}
for (const [key, chunk] of Object.entries(manifest)) if (chunk.isEntry) await measure(key);
assert.ok(initialBytes <= 250 * 1024, `Initial JavaScript exceeds 250 KiB gzip: ${initialBytes}`);
for (const chunk of Object.values(manifest)) {
  if (chunk.file.endsWith(".js")) {
    const bytes = gzipSync(await readFile(`dist/${chunk.file}`)).length;
    assert.ok(bytes <= 250 * 1024, `Chunk exceeds 250 KiB gzip: ${chunk.file}`);
  }
}
console.log(`Release content, anchors, assets, and budgets passed. Initial JavaScript: ${(initialBytes / 1024).toFixed(1)} KiB gzip.`);
