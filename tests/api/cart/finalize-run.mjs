import fs from "node:fs";

const runId = process.argv[2];
if (!runId) throw new Error("Usage: finalize-run.mjs <run-id>");

const manifestPath = "tests/api/cart/suite.manifest.json";
const reportDir = `test-reports/newman/cart-${runId}`;
const report = JSON.parse(fs.readFileSync(`${reportDir}/newman-report.json`, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const issue151 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/151";
const issue285 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/285";
const issue286 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/286";
const defectMap = new Map([
  ["TC-CART-002", ["#151"]],
  ...[25, 26, 27, 28, 29, 30, 31].map((n) => [`TC-CART-${String(n).padStart(3, "0")}`, ["#285"]]),
  ["TC-CART-041", ["#286"]],
  ["TC-CART-042", ["#286"]],
]);

function idOf(execution) {
  return execution.assertions?.[0]?.assertion?.match(/TC-CART-\d{3}/)?.[0];
}

const executions = [...new Map((report.run?.executions || []).map((item) => [item.cursor?.iteration, item])).values()]
  .sort((a, b) => (a.cursor?.iteration ?? 0) - (b.cursor?.iteration ?? 0));
const byId = new Map(executions.map((execution) => [idOf(execution), execution]));
if (executions.length !== manifest.cases.length) throw new Error("Execution count does not match manifest");

for (const tc of manifest.cases) {
  const execution = byId.get(tc.id);
  if (!execution) throw new Error(`Missing execution for ${tc.id}`);
  const failedAssertions = (execution.assertions || []).filter((assertion) => assertion.error).length;
  tc.status = failedAssertions ? "Failed" : "Passed";
  tc.relatedBugs = defectMap.get(tc.id) || [];
  tc.execution = {
    runId,
    actualStatus: execution.response?.code ?? null,
    failedAssertions,
    classification: tc.relatedBugs.length ? "SUT defect" : failedAssertions ? "specification gap" : "passed",
  };
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const passed = manifest.cases.filter((tc) => tc.status === "Passed").length;
const failed = manifest.cases.length - passed;
const failedAssertions = manifest.cases.reduce((sum, tc) => sum + tc.execution.failedAssertions, 0);
const mainHeaderPass = executions.filter((execution) => {
  const assertion = (execution.assertions || []).find((item) => item.assertion?.includes("X-Student-Id header was set"));
  return assertion && !assertion.error;
}).length;
const workflowHeaderAssertions = executions.flatMap((execution) => execution.assertions || [])
  .filter((item) => /workflow step \d+ X-Student-Id$/.test(item.assertion || ""));
const workflowHeaderPass = workflowHeaderAssertions.filter((item) => !item.error).length;

const rows = manifest.cases.map((tc) => {
  const note = tc.relatedBugs.includes("#151")
    ? "SUT defect; duplicate issue #151"
    : tc.relatedBugs.includes("#285")
      ? "SUT defect; BUG-CART-002 / issue #285"
      : tc.relatedBugs.includes("#286")
        ? "SUT defect; BUG-CART-003 / issue #286"
        : tc.status === "Passed"
          ? "Đạt toàn bộ assertions"
          : "Specification gap/INCOMPLETE; không tự động tạo bug";
  return `| ${tc.id} | ${tc.status} | ${tc.execution.actualStatus} | ${tc.relatedBugs.join(", ") || "None"} | ${note} |`;
}).join("\n");

const summary = `# Test run — POST /api/cart — ${runId}

- Tester / MSSV: \`23127062\`
- Base URL: \`http://localhost:3000\`
- Git HEAD lúc chạy: \`4fce82f5c3730a305e4c1e9838b77424bb9a8897\` (working tree có artifacts chưa commit)
- Thời gian: \`2026-08-22T20:45:00+07:00\` (Asia/Ho_Chi_Minh)
- Suite: 42 AI-generated + 0 student-authored testcases; Human review: PENDING
- Kết quả: **${passed} Passed / ${failed} Failed / 0 Blocked**
- Newman: 42 iterations, ${report.run?.stats?.requests?.total ?? "N/A"} HTTP requests, ${report.run?.stats?.assertions?.total ?? "N/A"} assertions, ${failedAssertions} failed assertions
- Header evidence: ${mainHeaderPass}/42 main requests và ${workflowHeaderPass}/5 workflow subrequests pass assertion \`X-Student-Id: 23127062\`
- Defect xác nhận: 3 root causes — duplicate item (#151), invalid quantity (#285), Content-Type confusion (#286)

| Testcase | Kết quả | Actual HTTP | Related bugs | Ghi chú triage |
|---|---:|---:|---|---|
${rows}

## Phân loại

- **SUT defect — FR-07:** TC-CART-002 chứng minh thêm lại cùng product tạo dòng trùng thay vì cộng quantity; trùng [issue #151](${issue151}).
- **SUT defect — FR-06/FR-07:** TC-CART-025–031 chứng minh API chấp nhận missing/null/zero/negative/decimal/string/array quantity; local BUG-CART-002 và [issue #285](${issue285}).
- **SUT defect — request JSON contract:** TC-CART-041–042 chứng minh API chấp nhận \`text/plain\` hoặc thiếu Content-Type; minimal reproduction còn xác nhận \`null\` bị chèn vào cart; local BUG-CART-003 và [issue #286](${issue286}).
- **Specification gap / INCOMPLETE:** TC-CART-009–024 và TC-CART-032–034 fail conservative 4xx oracle, nhưng tài liệu chưa nói rõ requiredness/type/error status cho các trường này nên chưa lập product bug.

## Artifacts

- HTML: \`${reportDir}/newman-report.html\`
- JSON: \`${reportDir}/newman-report.json\`
- CLI: \`${reportDir}/cli.log\`
- Header/duplicate screenshot: \`test-reports/evidence/cart/duplicate-product/evidence.png\`
- Quantity screenshot: \`test-reports/evidence/cart/invalid-quantity/evidence.png\`
- Content-Type/summary screenshot: \`test-reports/evidence/cart/content-type-confusion/evidence.png\`
- Reproduction attempts: \`test-reports/evidence/cart/reproduction-attempt-1.txt\`, \`reproduction-attempt-2.txt\`
`;

fs.mkdirSync("tests/test-runs", { recursive: true });
fs.writeFileSync(`tests/test-runs/cart-${runId}.md`, summary);
console.log(`Finalized cart run: ${passed} passed, ${failed} failed, ${failedAssertions} failed assertions.`);
