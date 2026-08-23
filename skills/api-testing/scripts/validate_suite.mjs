#!/usr/bin/env node
import fs from "node:fs";

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const manifestPath = arg("--manifest");
if (!manifestPath) throw new Error("Usage: validate_suite.mjs --manifest <suite.manifest.json>");
const allowHumanReview = process.argv.includes("--allow-human-review");
const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const errors = [];
const cases = Array.isArray(doc.cases) ? doc.cases : [];
const suite = doc.suite || {};
const allowedCoverage = new Set(["domain-partition", "state-transition", "security", "schema-validation"]);
const allowedSources = new Set(["ai-generated", "student-authored"]);
const allowedAudits = new Set(["VALID", "INVALID", "INCOMPLETE"]);
const ids = new Set();

for (const key of ["name", "module", "endpoint", "method", "path", "baseUrl", "studentId"]) {
  if (!suite[key]) errors.push(`suite.${key} is required`);
}
if (suite.studentId && !/^[A-Za-z0-9_-]+$/.test(suite.studentId)) errors.push("suite.studentId contains unsupported characters");
if (cases.length < 35) errors.push(`expected at least 35 total cases, found ${cases.length}`);

for (const [index, tc] of cases.entries()) {
  const at = `cases[${index}]`;
  if (!/^TC-[A-Z0-9-]+-\d{3}$/.test(tc.id || "")) errors.push(`${at}.id must match TC-[MODULE]-[NNN]`);
  if (ids.has(tc.id)) errors.push(`${at}.id is duplicated: ${tc.id}`);
  ids.add(tc.id);
  for (const key of ["title", "testType", "technique"]) if (!tc[key]) errors.push(`${at}.${key} is required`);
  for (const key of ["requirementIds", "coverage", "preconditions", "steps"]) if (!Array.isArray(tc[key]) || tc[key].length === 0) errors.push(`${at}.${key} must be a non-empty array`);
  if (!allowedSources.has(tc.source)) errors.push(`${at}.source is invalid`);
  if (!tc.agentAudit || !allowedAudits.has(tc.agentAudit.status) || !tc.agentAudit.reason) errors.push(`${at}.agentAudit requires status and reason`);
  if (!tc.humanReview || !tc.humanReview.status) {
    errors.push(`${at}.humanReview.status is required`);
  } else if (!allowHumanReview && (tc.humanReview.status !== "PENDING" || String(tc.humanReview.reason || "").trim() !== "")) {
    errors.push(`${at}.humanReview must remain PENDING with an empty reason unless --allow-human-review is explicitly used for student-supplied decisions`);
  }
  if (!tc.request || !tc.request.path || !tc.request.auth) errors.push(`${at}.request requires path and auth`);
  if (!tc.expected || !Array.isArray(tc.expected.status) || tc.expected.status.length === 0) errors.push(`${at}.expected.status must be a non-empty array`);
  for (const c of tc.coverage || []) if (!allowedCoverage.has(c)) errors.push(`${at}.coverage contains invalid value: ${c}`);
}

const aiCount = cases.filter((tc) => tc.source === "ai-generated").length;
const studentAuthoredCount = cases.filter((tc) => tc.source === "student-authored").length;
if (aiCount < 35) errors.push(`expected at least 35 ai-generated cases, found ${aiCount}`);
for (const category of allowedCoverage) {
  const count = cases.filter((tc) => tc.source === "ai-generated" && (tc.coverage || []).includes(category)).length;
  if (count === 0) errors.push(`AI-generated coverage has no testcase: ${category}`);
}

if (errors.length) {
  console.error(errors.map((e) => `ERROR: ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Valid suite: ${cases.length} cases (${aiCount} AI-generated, ${studentAuthoredCount} student-authored).`);
