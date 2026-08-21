import fs from "node:fs";
import path from "node:path";

const reportDir = process.argv[2];
if (!reportDir) throw new Error("Usage: redact-newman-artifacts.mjs <report-dir>");
const readme = fs.readFileSync("README.md", "utf8");
const passwordMatches = [...readme.matchAll(/(?:Admin|User test):\s*`[^`]+`\s*\/\s*`([^`]+)`/g)];
const secrets = passwordMatches.map((match) => match[1]).concat(["DefinitelyWrong-23127062!"]);
const files = ["cli.log", "newman-report.json", "newman-report.html"];

function redact(text) {
  for (const secret of secrets) text = text.split(secret).join("<redacted-password>");
  return text.replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "<redacted-jwt>");
}

for (const name of files) {
  const file = path.join(reportDir, name);
  let text = fs.readFileSync(file, "utf8");
  text = redact(text);
  if (name === "newman-report.json") {
    const report = JSON.parse(text);
    for (const execution of report.run?.executions || []) {
      const stream = execution.response?.stream;
      if (stream?.type === "Buffer" && Array.isArray(stream.data)) {
        const decoded = Buffer.from(stream.data).toString("utf8");
        stream.data = [...Buffer.from(redact(decoded), "utf8")];
      }
    }
    text = JSON.stringify(report, null, 2) + "\n";
  }
  fs.writeFileSync(file, text);
}
console.log(`Redacted passwords and JWTs from ${files.length} retained Newman artifacts.`);
