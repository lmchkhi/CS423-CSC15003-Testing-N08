import fs from "node:fs";
import path from "node:path";

const targets = process.argv.slice(2);
if (!targets.length) throw new Error("Usage: redact-newman-artifacts.mjs <file-or-directory>...");

const readme = fs.readFileSync("README.md", "utf8");
const passwords = [...readme.matchAll(/(?:Admin|User test):\s*`[^`]+`\s*\/\s*`([^`]+)`/g)].map((match) => match[1]);

function filesUnder(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => filesUnder(path.join(target, entry.name)));
}

let changed = 0;
for (const target of targets) {
  for (const file of filesUnder(target)) {
    if (!/\.(json|html|log|txt)$/i.test(file)) continue;
    const original = fs.readFileSync(file, "utf8");
    let redacted = original
      .replace(/Bearer\s+[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "Bearer <redacted>")
      .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "<redacted-jwt>");
    for (const password of passwords) redacted = redacted.split(password).join("<redacted-password>");
    if (redacted !== original) {
      fs.writeFileSync(file, redacted);
      changed++;
    }
  }
}

console.log(`Redacted ${changed} retained artifact files.`);
