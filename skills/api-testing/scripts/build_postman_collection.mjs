#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const manifestPath = arg("--manifest");
const collectionPath = arg("--collection");
const dataPath = arg("--data");
if (!manifestPath || !collectionPath || !dataPath) throw new Error("Usage: build_postman_collection.mjs --manifest <manifest> --collection <collection.json> --data <test-data.json>");
const doc = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const suite = doc.suite;

const prerequest = `const row = pm.iterationData.toObject();
const studentId = pm.collectionVariables.get("studentId");
if (!studentId || !/^[A-Za-z0-9_-]+$/.test(studentId)) throw new Error("Missing or invalid studentId collection variable");
pm.request.headers.upsert({ key: "X-Student-Id", value: studentId });
console.log("[HW06] " + row.id + " X-Student-Id: " + studentId);
pm.variables.set("requestPath", pm.variables.replaceIn(row.request.path));
const query = Object.entries(row.request.query || {}).map(([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(pm.variables.replaceIn(String(value)))).join("&");
pm.variables.set("querySuffix", query ? "?" + query : "");
pm.variables.set("requestBody", row.request.body === undefined ? "" : pm.variables.replaceIn(JSON.stringify(row.request.body)));
for (const [key, value] of Object.entries(row.request.headers || {})) pm.request.headers.upsert({ key, value: pm.variables.replaceIn(String(value)) });
pm.request.headers.remove("Authorization");
const mode = row.request.auth || "none";
if (mode === "user" || mode === "admin") {
  const token = pm.environment.get(mode + "Token") || pm.collectionVariables.get(mode + "Token");
  if (!token) throw new Error("Missing " + mode + "Token variable for " + row.id);
  pm.request.headers.upsert({ key: "Authorization", value: "Bearer " + token });
} else if (mode === "invalid") {
  pm.request.headers.upsert({ key: "Authorization", value: "Bearer invalid.jwt.token" });
} else if (mode === "custom") {
  pm.request.headers.upsert({ key: "Authorization", value: "Bearer " + pm.variables.replaceIn(row.request.token || "") });
}
`;

const tests = `const row = pm.iterationData.toObject();
const expected = row.expected || {};
const prefix = "[" + row.id + "] ";
pm.test(prefix + "X-Student-Id header was set", () => pm.expect(pm.request.headers.get("X-Student-Id")).to.eql(pm.collectionVariables.get("studentId")));
pm.test(prefix + "status is expected", () => pm.expect(expected.status).to.include(pm.response.code));
if (expected.contentType) pm.test(prefix + "Content-Type", () => pm.expect(pm.response.headers.get("Content-Type") || "").to.include(expected.contentType));
if (expected.maxResponseTimeMs) pm.test(prefix + "response time", () => pm.expect(pm.response.responseTime).to.be.below(expected.maxResponseTimeMs + 1));
let json;
try { json = pm.response.json(); } catch (_) { json = undefined; }
if (expected.schema) pm.test(prefix + "JSON schema", () => pm.response.to.have.jsonSchema(expected.schema));
const get = (obj, dotted) => dotted ? dotted.split(".").reduce((v, key) => v == null ? undefined : v[key], obj) : obj;
for (const assertion of expected.bodyAssertions || []) {
  pm.test(prefix + assertion.path + " " + assertion.operator, () => {
    const actual = get(json, assertion.path);
    switch (assertion.operator) {
      case "equals": pm.expect(actual).to.eql(assertion.value); break;
      case "notEquals": pm.expect(actual).to.not.eql(assertion.value); break;
      case "exists": pm.expect(actual).to.not.equal(undefined); break;
      case "absent": pm.expect(actual).to.equal(undefined); break;
      case "type": pm.expect(Array.isArray(actual) ? "array" : typeof actual).to.eql(assertion.value); break;
      case "matches": pm.expect(String(actual)).to.match(new RegExp(assertion.value)); break;
      case "includes": pm.expect(actual).to.include(assertion.value); break;
      case "gt": pm.expect(actual).to.be.above(assertion.value); break;
      case "gte": pm.expect(actual).to.be.at.least(assertion.value); break;
      case "lt": pm.expect(actual).to.be.below(assertion.value); break;
      case "lte": pm.expect(actual).to.be.at.most(assertion.value); break;
      case "arrayLength": pm.expect(actual).to.be.an("array").with.lengthOf(assertion.value); break;
      default: throw new Error("Unsupported assertion operator: " + assertion.operator);
    }
  });
}
`;

const collection = {
  info: {
    name: suite.name,
    description: `Data-driven HW06 suite for ${suite.endpoint}. Generated from suite.manifest.json.`,
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: suite.baseUrl, type: "string" },
    { key: "studentId", value: suite.studentId, type: "string" },
    { key: "userToken", value: "", type: "string" },
    { key: "adminToken", value: "", type: "string" }
  ],
  item: [{
    name: suite.endpoint,
    event: [
      { listen: "prerequest", script: { type: "text/javascript", exec: prerequest.split("\n") } },
      { listen: "test", script: { type: "text/javascript", exec: tests.split("\n") } }
    ],
    request: {
      method: suite.method,
      header: [],
      body: { mode: "raw", raw: "{{requestBody}}", options: { raw: { language: "json" } } },
      url: "{{baseUrl}}{{requestPath}}{{querySuffix}}"
    }
  }]
};

for (const target of [collectionPath, dataPath]) fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2) + "\n");
fs.writeFileSync(dataPath, JSON.stringify(doc.cases, null, 2) + "\n");
console.log(`Wrote collection to ${collectionPath} and ${doc.cases.length} data rows to ${dataPath}.`);
