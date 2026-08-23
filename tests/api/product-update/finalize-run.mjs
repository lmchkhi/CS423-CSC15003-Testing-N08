import fs from "node:fs";
import { execFileSync } from "node:child_process";

const runId = process.argv[2];
if (!runId) throw new Error("Usage: finalize-run.mjs <run-id>");
const manifestPath = "tests/api/product-update/suite.manifest.json";
const reportDir = `test-reports/newman/product-update-${runId}`;
const report = JSON.parse(fs.readFileSync(`${reportDir}/newman-report.json`, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const bugMap = new Map();
for (let n = 2; n <= 5; n++) bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#234"]);
for (let n = 6; n <= 11; n++) bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#290"]);
for (const n of [15, 16, 17, 18, 20, 21, ...Array.from({ length: 14 }, (_, i) => i + 23), 43, 45]) {
  bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#289"]);
}
bugMap.set("TC-PRODUCT-UPDATE-037", ["#288"]);
bugMap.set("TC-PRODUCT-UPDATE-044", ["#287"]);
bugMap.set("TC-PRODUCT-UPDATE-EXT-001", ["#289"]);
bugMap.set("TC-PRODUCT-UPDATE-EXT-002", ["#234"]);
bugMap.set("TC-PRODUCT-UPDATE-EXT-003", ["#289"]);
bugMap.set("TC-PRODUCT-UPDATE-EXT-005", ["#288"]);

function idOf(execution) {
  return (execution.assertions || []).flatMap((item) => item.assertion?.match(/TC-PRODUCT-UPDATE-(?:EXT-\d{3}|\d{3})/) || [])[0];
}
const executions = [...new Map((report.run?.executions || []).map((item) => [item.cursor?.iteration, item])).values()]
  .sort((a, b) => (a.cursor?.iteration ?? 0) - (b.cursor?.iteration ?? 0));
if (executions.length !== manifest.cases.length) throw new Error(`Expected ${manifest.cases.length} main executions, found ${executions.length}`);
const byId = new Map(executions.map((execution) => [idOf(execution), execution]));

for (const tc of manifest.cases) {
  const execution = byId.get(tc.id);
  if (!execution) throw new Error(`Missing main execution for ${tc.id}`);
  const failedAssertions = (execution.assertions || []).filter((item) => item.error).length;
  tc.status = failedAssertions ? "Failed" : "Passed";
  tc.relatedBugs = bugMap.get(tc.id) || [];
  tc.execution = {
    runId,
    actualStatus: execution.response?.code ?? null,
    failedAssertions,
    classification: failedAssertions ? (tc.relatedBugs.length ? "SUT defect" : "specification gap") : "passed",
  };
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const passed = manifest.cases.filter((tc) => tc.status === "Passed").length;
const failed = manifest.cases.filter((tc) => tc.status === "Failed").length;
const mainHeaderPass = executions.filter((execution) => {
  const assertion = (execution.assertions || []).find((item) => item.assertion?.includes("X-Student-Id header was set"));
  return assertion && !assertion.error;
}).length;
const workflowHeaders = executions.flatMap((execution) => execution.assertions || [])
  .filter((item) => /workflow step \d+ X-Student-Id$/.test(item.assertion || ""));
const workflowHeaderPass = workflowHeaders.filter((item) => !item.error).length;

const rows = manifest.cases.map((tc) => {
  let note = "Đạt toàn bộ assertions";
  if (tc.relatedBugs.includes("#234")) note = "SUT defect; duplicate issue #234";
  if (tc.relatedBugs.includes("#290")) note = "SUT defect; BUG-PRODUCT-UPDATE-002 / issue #290";
  if (tc.relatedBugs.includes("#289")) note = "SUT defect; BUG-PRODUCT-UPDATE-003 / issue #289";
  if (tc.relatedBugs.includes("#288")) note = "SUT defect; BUG-PRODUCT-UPDATE-004 / issue #288";
  if (tc.relatedBugs.includes("#287")) note = "SUT defect; BUG-PRODUCT-UPDATE-005 / issue #287";
  if (tc.id === "TC-PRODUCT-UPDATE-019") note = "Specification gap; FR-15 chưa quy định whitespace-only/trimming";
  if (tc.id === "TC-PRODUCT-UPDATE-EXT-001") note = "SUT defect; invalid update vẫn đổi state; issue #289";
  if (tc.id === "TC-PRODUCT-UPDATE-EXT-002") note = "SUT defect; user update trái quyền vẫn đổi state; issue #234";
  if (tc.id === "TC-PRODUCT-UPDATE-EXT-003") note = "SUT defect; thiếu category_id vẫn partial update; issue #289";
  if (tc.id === "TC-PRODUCT-UPDATE-EXT-004") note = "Đạt biên Unicode 255 ký tự và persistence assertions";
  if (tc.id === "TC-PRODUCT-UPDATE-EXT-005") note = "SUT defect; text/plain trả HTTP 500 nhưng state không đổi; issue #288";
  return `| ${tc.id} | ${tc.status} | ${tc.execution.actualStatus} | ${tc.relatedBugs.join(", ") || "None"} | ${note} |`;
}).join("\n");

const baselineCases = manifest.cases.filter((tc) => !tc.id.includes("-EXT-"));
const auditCounts = baselineCases.reduce((acc, tc) => {
  acc[tc.agentAudit.status] = (acc[tc.agentAudit.status] || 0) + 1;
  return acc;
}, {});
const gitHead = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const runTimestamp = `${runId.slice(0, 4)}-${runId.slice(4, 6)}-${runId.slice(6, 8)}T${runId.slice(9, 11)}:${runId.slice(11, 13)}:${runId.slice(13, 15)}+07:00`;
const summary = `# Test run — PUT /api/products/:id — ${runId}

- Tester / MSSV: \`23127062\`
- Base URL: \`http://localhost:3000\`
- Git HEAD lúc chạy: \`${gitHead}\` (working tree có artifacts chưa commit)
- Thời gian: \`${runTimestamp}\` (Asia/Ho_Chi_Minh)
- Suite: ${manifest.cases.length} testcases (46 baseline + 5 extension)
- Kết quả: **${passed} Passed / ${failed} Failed / 0 Blocked**
- Newman: ${manifest.cases.length} iterations, ${report.run?.stats?.requests?.total ?? "N/A"} HTTP requests, ${report.run?.stats?.assertions?.total ?? "N/A"} assertions, ${report.run?.stats?.assertions?.failed ?? "N/A"} failed assertions
- Header evidence: ${mainHeaderPass}/${manifest.cases.length} main requests và ${workflowHeaderPass}/${workflowHeaders.length} workflow subrequests pass assertion \`X-Student-Id: 23127062\`
- Defect xác nhận: 5 root causes; 4 issue mới (#287–#290), 1 duplicate (#234)

| Testcase | Kết quả | Actual HTTP | Related bugs | Ghi chú triage |
|---|---:|---:|---|---|
${rows}

## Phân loại failure

- **SUT defect — FR-12/SEC-02/SEC-03:** TC-002–005 và EXT-002 chứng minh endpoint chấp nhận missing/invalid/user/empty token; EXT-002 còn xác nhận state bị thay đổi; trùng [issue #234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234).
- **SUT defect — resource path:** TC-006–011 trả HTTP 200 và thông báo thành công cho ID invalid/không tồn tại; [issue #290](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/290).
- **SUT defect — FR-15 input constraints:** TC-015–018, TC-020–021, TC-023–036, TC-043, TC-045, EXT-001 và EXT-003 chấp nhận required field thiếu/null/rỗng/sai kiểu/sai biên; hai extension còn xác nhận state bị đổi không nguyên tử; [issue #289](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/289).
- **Specification gap:** TC-019 fail oracle whitespace-only nhưng FR-15 chưa quy định trimming, nên không quy kết product bug.
- **SUT defect — Content-Type/error handling:** TC-037 và EXT-005 trả HTTP 500 HTML với \`text/plain\`; EXT-005 xác nhận resource không bị đổi; [issue #288](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/288).
- **SUT defect — schema/error handling:** TC-044 trả HTTP 400 nhưng HTML stack trace cho JSON primitive; [issue #287](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/287).

## Audit

- VALID: ${auditCounts.VALID || 0}
- INCOMPLETE: ${auditCounts.INCOMPLETE || 0} — chủ yếu do specification chưa chốt status/schema response thành công, trimming hoặc unknown-field behavior.
- INVALID: ${auditCounts.INVALID || 0}

## Artifacts

- HTML: \`${reportDir}/newman-report.html\`
- JSON: \`${reportDir}/newman-report.json\`
- CLI: \`${reportDir}/cli.log\`
- Defect screenshots: \`test-reports/evidence/product-update/access-control.png\`, \`nonexistent-id.png\`, \`input-validation.png\`, \`content-type-500.png\`, \`primitive-json-html.png\`
- Reproduction evidence: \`test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt\`
`;
fs.mkdirSync("tests/test-runs", { recursive: true });
fs.writeFileSync(`tests/test-runs/product-update-${runId}.md`, summary);
console.log(`Finalized product-update run: ${passed} passed, ${failed} failed, ${mainHeaderPass}/${manifest.cases.length} main headers.`);
