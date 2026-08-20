#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function show(key, value) {
  if (value === null) return "null";
  if (typeof value === "object") return `\`${JSON.stringify(value)}\``;
  const text = String(value);
  return /token|password|otp|secret|cookie/i.test(key) && !text.startsWith("{{") ? "`<redacted-or-variable>`" : `\`${text.replaceAll("`", "\\`")}\``;
}

const manifestPath = arg("--manifest");
const output = arg("--output");
if (!manifestPath || !output) throw new Error("Usage: render_testcases.mjs --manifest <manifest> --output <directory>");
const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
fs.mkdirSync(output, { recursive: true });

for (const tc of doc.cases || []) {
  const dataRows = Object.entries(tc.testData || {}).map(([k, v]) => `| ${k} | ${show(k, v)} |`).join("\n") || "| (không có) | N/A |";
  const preconditions = (tc.preconditions || []).map((v) => `- ${v}`).join("\n");
  const steps = (tc.steps || []).map((v, i) => `${i + 1}. ${v}`).join("\n");
  const expected = tc.expected || {};
  const expectedLines = [
    `- HTTP status: \`${(expected.status || []).join(" hoặc ")}\``,
    expected.contentType ? `- Content-Type: \`${expected.contentType}\`` : null,
    expected.schema ? `- Response schema: \`${JSON.stringify(expected.schema)}\`` : null,
    ...(expected.notes || []).map((v) => `- ${v}`),
  ].filter(Boolean).join("\n");
  const source = tc.source === "ai-generated" ? "AI_GENERATED" : "EXTENSION_CANDIDATE";
  const related = (tc.relatedBugs || []).length ? tc.relatedBugs.join(", ") : "None";
  const body = `# ${tc.id}: ${tc.title}\n\n## Requirement ID\n${(tc.requirementIds || []).join(", ")}\n\n## Module / Test type / Technique\n${doc.suite.module} / ${tc.testType} / ${tc.technique}\n\n## Preconditions\n${preconditions}\n\n## Test data\n| Trường | Giá trị |\n|---|---|\n${dataRows}\n\n## Test steps\n${steps}\n\n## Expected result\n${expectedLines}\n\n## Status / Related bugs\n${tc.status || "Not Run"} / ${related}\n\n## AI audit\n- Source: \`${source}\`\n- Recommendation: \`${tc.agentAudit.status}\`\n- Reason: ${tc.agentAudit.reason}\n- Human review: \`${tc.humanReview.status}\`${tc.humanReview.reason ? ` - ${tc.humanReview.reason}` : ""}\n\n## Automation mapping\n- Data row: \`${tc.id}\`\n- Coverage: ${(tc.coverage || []).map((v) => `\`${v}\``).join(", ")}\n`;
  fs.writeFileSync(path.join(output, `${tc.id}.md`), body);
}
console.log(`Rendered ${(doc.cases || []).length} testcase Markdown files in ${output}.`);
