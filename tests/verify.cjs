"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { parse } = require("parse5");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const source = read("assets/source-journey.html");
function originalArray(name) {
  const match = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`));
  assert.ok(match, `Original ${name} data exists`);
  return JSON.parse(JSON.stringify(vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 500 })));
}
const originalDomains = originalArray("DOMAINS");
const originalCourses = originalArray("COURSES");
const icons = ["brain-circuit", "code-xml", "messages-square", "users-round", "chart-no-axes-combined", "terminal"];
const urls = ["https://skillupwithlevelup.com/frontier", "https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-core-all", "https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-learning"];
const expectedDomains = originalDomains.map((domain, index) => ({ title: domain.title, sub: domain.sub, priority: domain.prio, icon: icons[index], destination: domain.dest, functional: { start: domain.func.st, build: domain.func.bu }, technical: { start: domain.tech.st, build: domain.tech.bu }, proof: domain.proof, sources: domain.src }));
const expectedCourses = originalCourses.map((course, index) => ({ title: course.t, tier: course.tier, source: course.src, meta: course.meta, ...(urls[index] ? { url: urls[index] } : {}) }));
if (process.argv.includes("--sync")) {
  const content = { source: "https://fde-avanade.nl-dot.com/journey.html#anchors", captured: "2026-10-08", domains: expectedDomains, courses: expectedCourses };
  const json = JSON.stringify(content, null, 2).replace(/[^\x00-\x7F]/g, character => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`);
  fs.writeFileSync(path.join(root, "assets/data.js"), `"use strict";\n\nconst PATHWAY = ${json};\n`);
  console.log("Synced original source fields without editorial rewrites.");
}
const data = JSON.parse(JSON.stringify(vm.runInNewContext(`${read("assets/data.js")};PATHWAY`, Object.create(null))));
assert.equal(data.domains.length, 6);
assert.equal(data.courses.length, 37);
assert.deepEqual(data.domains, expectedDomains, "All competency fields match the source verbatim");
assert.deepEqual(data.courses, expectedCourses, "All course fields match the source verbatim");
assert.deepEqual(["must", "rec", "info"].map(tier => data.courses.filter(course => course.tier === tier).length), [12, 19, 6]);
const pages = ["index.html", "competencies.html", "hve.html", "catalog.html"];
const normalize = value => value.replace(/\s+/g, " ").trim();
function text(node) { return node.nodeName === "#text" ? node.value : node.tagName === "br" ? " " : (node.childNodes || []).map(text).join(""); }
function walk(node, visit) { visit(node); for (const child of node.childNodes || []) walk(child, visit); }
const allText = normalize(pages.map(file => text(parse(read(file)))).join(" "));
const semanticSource = [];
walk(parse(source), node => {
  if (["h1", "h2", "h3", "h4", "p"].includes(node.tagName)) {
    const value = normalize(text(node));
    if (value) semanticSource.push(value);
  }
});
const missing = semanticSource.filter(value => !allText.includes(value));
assert.deepEqual(missing, [], `Original headings and paragraphs missing: ${missing.join(" | ")}`);
for (const file of pages) {
  const html = read(file);
  assert.ok(!/PDE/.test(html), `No renamed PDE terminology in ${file}`);
  assert.ok(html.includes('src="assets/theme.js"'), `Early theme initialization in ${file}`);
  const ids = new Set();
  walk(parse(html), node => {
    for (const attribute of node.attrs || []) {
      if (attribute.name === "id") { assert.ok(!ids.has(attribute.value), `Duplicate id ${attribute.value} in ${file}`); ids.add(attribute.value); }
      if (["href", "src"].includes(attribute.name) && !/^(https?:|#|data:)/.test(attribute.value)) {
        const target = decodeURIComponent(new URL(attribute.value, "https://site.local/").pathname).slice(1);
        assert.ok(fs.existsSync(path.join(root, target)), `${file}: local asset ${target} exists`);
      }
    }
  });
}
for (const file of ["assets/data.js", "assets/app.js", "assets/theme.js"]) new vm.Script(read(file), { filename: file });
assert.ok(!/PDE/.test(read("assets/app.js")), "No renamed terminology in shared UI");
console.log(`PASS: all 6 domains and 37 courses match verbatim; ${semanticSource.length} original headings and paragraphs retained; 4 pages and local assets verified; JavaScript syntax valid.`);