import fs from "node:fs";

const runId = process.argv[2];
if (!runId) throw new Error("Usage: finalize-run.mjs <run-id>");
const manifestPath = "tests/api/product-update/suite.manifest.json";
const reportDir = `test-reports/newman/product-update-${runId}`;
const report = JSON.parse(fs.readFileSync(`${reportDir}/newman-report.json`, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const bugMap = new Map();
for (let n = 2; n <= 5; n++) bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#234"]);
for (let n = 6; n <= 11; n++) bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#290"]);
for (const n of [...Array.from({ length: 7 }, (_, i) => i + 15), ...Array.from({ length: 14 }, (_, i) => i + 23), 43, 45]) {
  bugMap.set(`TC-PRODUCT-UPDATE-${String(n).padStart(3, "0")}`, ["#289"]);
}
bugMap.set("TC-PRODUCT-UPDATE-037", ["#288"]);
bugMap.set("TC-PRODUCT-UPDATE-044", ["#287"]);

function idOf(execution) {
  return (execution.assertions || []).flatMap((item) => item.assertion?.match(/TC-PRODUCT-UPDATE-\d{3}/) || [])[0];
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
    classification: failedAssertions ? "SUT defect" : "passed",
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
  return `| ${tc.id} | ${tc.status} | ${tc.execution.actualStatus} | ${tc.relatedBugs.join(", ") || "None"} | ${note} |`;
}).join("\n");

const auditCounts = manifest.cases.reduce((acc, tc) => {
  acc[tc.agentAudit.status] = (acc[tc.agentAudit.status] || 0) + 1;
  return acc;
}, {});
const summary = `# Test run — PUT /api/products/:id — ${runId}

- Tester / MSSV: \`23127062\`
- Base URL: \`http://localhost:3000\`
- Git HEAD lúc chạy: \`192090fbdf78207f3873cfd5008d655cb16e4dff\` (working tree có artifacts chưa commit)
- Thời gian: \`2026-08-23T14:51:00+07:00\` (Asia/Ho_Chi_Minh)
- Suite: 46 AI-generated + 0 student-authored testcases; quyết định review của sinh viên vẫn \`PENDING\`
- Kết quả: **${passed} Passed / ${failed} Failed / 0 Blocked**
- Newman: 46 iterations, ${report.run?.stats?.requests?.total ?? "N/A"} HTTP requests, ${report.run?.stats?.assertions?.total ?? "N/A"} assertions, ${report.run?.stats?.assertions?.failed ?? "N/A"} failed assertions
- Header evidence: ${mainHeaderPass}/46 main requests và ${workflowHeaderPass}/${workflowHeaders.length} workflow subrequests pass assertion \`X-Student-Id: 23127062\`
- Defect xác nhận: 5 root causes; 4 issue mới (#287–#290), 1 duplicate (#234)

| Testcase | Kết quả | Actual HTTP | Related bugs | Ghi chú triage |
|---|---:|---:|---|---|
${rows}

## Phân loại failure

- **SUT defect — FR-12/SEC-02/SEC-03:** TC-002–005 chứng minh endpoint chấp nhận missing/invalid/user/empty token; trùng [issue #234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234).
- **SUT defect — resource path:** TC-006–011 trả HTTP 200 và thông báo thành công cho ID invalid/không tồn tại; [issue #290](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/290).
- **SUT defect — FR-15 input constraints:** TC-015–021, TC-023–036, TC-043 và TC-045 chấp nhận required field thiếu/null/rỗng/sai kiểu/sai biên; [issue #289](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/289).
- **SUT defect — Content-Type/error handling:** TC-037 trả HTTP 500 HTML và lộ stack trace với \`text/plain\`; [issue #288](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/288).
- **SUT defect — schema/error handling:** TC-044 trả HTTP 400 nhưng HTML stack trace cho JSON primitive; [issue #287](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/287).

## Agent audit (AI recommendation)

- VALID: ${auditCounts.VALID || 0}
- INCOMPLETE: ${auditCounts.INCOMPLETE || 0} — chủ yếu do specification chưa chốt status/schema response thành công; các case này cần sinh viên review oracle.
- INVALID: ${auditCounts.INVALID || 0}

## Artifacts

- HTML: \`${reportDir}/newman-report.html\`
- JSON: \`${reportDir}/newman-report.json\`
- CLI: \`${reportDir}/cli.log\`
- Newman summary/header screenshot: \`test-reports/evidence/product-update/newman-summary-and-header.png\`
- Defect screenshots: \`test-reports/evidence/product-update/access-control.png\`, \`nonexistent-id.png\`, \`input-validation.png\`, \`content-type-500.png\`, \`primitive-json-html.png\`
- Reproduction evidence: \`test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt\`
`;
fs.mkdirSync("tests/test-runs", { recursive: true });
fs.writeFileSync(`tests/test-runs/product-update-${runId}.md`, summary);
console.log(`Finalized product-update run: ${passed} passed, ${failed} failed, ${mainHeaderPass}/46 main headers.`);
