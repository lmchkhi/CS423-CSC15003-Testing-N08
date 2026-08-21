const fs = require("fs");
const path = require("path");

const args = Object.fromEntries(process.argv.slice(2).map((value, index, all) => {
  if (!value.startsWith("--")) return null;
  return [value.slice(2), all[index + 1]];
}).filter(Boolean));

function requiredFile(argumentName) {
  const value = args[argumentName];
  if (!value) throw new Error(`Bắt buộc cung cấp --${argumentName}`);
  const resolved = path.resolve(value);
  if (!fs.existsSync(resolved)) throw new Error(`Không tìm thấy file: ${resolved}`);
  return resolved;
}

function scriptText(events, listen) {
  return (events || [])
    .filter((event) => event.listen === listen)
    .flatMap((event) => event.script?.exec || [])
    .join("\n");
}

function leafRequests(items, output = []) {
  for (const item of items || []) {
    if (Array.isArray(item.item)) leafRequests(item.item, output);
    else if (item.request) output.push(item);
  }
  return output;
}

const collectionPath = requiredFile("collection");
const environmentPath = requiredFile("environment");
const expectedStudentId = args["student-id"];
if (!expectedStudentId) throw new Error("Bắt buộc cung cấp --student-id");

const collection = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
const environment = JSON.parse(fs.readFileSync(environmentPath, "utf8"));
const preRequest = scriptText(collection.event, "prerequest");

const readsStudentId = /(?:const|let|var)\s+studentId\s*=\s*pm\.environment\.get\(\s*["']studentId["']\s*\)/.test(preRequest);
const upsertsHeader = /pm\.request\.headers\.upsert\(\s*\{\s*key\s*:\s*["']X-Student-Id["']\s*,\s*value\s*:\s*studentId\s*\}\s*\)/.test(preRequest);
if (!readsStudentId || !upsertsHeader) {
  throw new Error("Collection chưa đọc studentId hoặc chưa upsert X-Student-Id ở pre-request script.");
}

const studentVariable = (environment.values || []).find((entry) => entry.key === "studentId" && entry.enabled !== false);
if (!studentVariable || String(studentVariable.value) !== expectedStudentId) {
  throw new Error(`Environment phải có studentId=${expectedStudentId} và được bật.`);
}

const requests = leafRequests(collection.item);
if (!requests.length) throw new Error("Collection CI không chứa request nào.");

const missingAssertions = requests.filter((item) => {
  const tests = scriptText(item.event, "test");
  const readsHeader = /pm\.request\.headers\.get\(\s*["']X-Student-Id["']\s*\)/.test(tests);
  const checksStudentId = new RegExp(`(?:eql|equal)\\(\\s*["']${expectedStudentId}["']\\s*\\)`).test(tests);
  return !readsHeader || !checksStudentId;
}).map((item) => item.name);

if (missingAssertions.length) {
  throw new Error(`Các request thiếu assertion X-Student-Id: ${missingAssertions.join(", ")}`);
}

console.log(JSON.stringify({
  collection: collection.info?.name,
  requests: requests.length,
  studentId: expectedStudentId,
  preRequestHeader: "HỢP LỆ",
  requestAssertions: "HỢP LỆ",
}));
