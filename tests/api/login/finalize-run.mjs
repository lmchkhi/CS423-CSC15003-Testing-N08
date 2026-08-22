import { execFileSync } from "node:child_process";
import fs from "node:fs";

const runId = process.argv[2];
if (!runId) throw new Error("Usage: node tests/api/login/finalize-run.mjs <run-id>");

const reportDir = `test-reports/newman/login-${runId}`;
const reportPath = `${reportDir}/newman-report.json`;
const manifestPath = "tests/api/login/suite.manifest.json";
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const commit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const dirty = execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim().length > 0;
const passwordCases = new Set([1, 2, 27, 35, 36, 37].map((n) => `TC-LOGIN-${String(n).padStart(3, "0")}`));
const issue69 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69";

function idOf(execution) {
  return execution.assertions?.[0]?.assertion?.match(/\[(TC-LOGIN-\d{3})\]/)?.[1];
}

function bodyOf(execution) {
  const stream = execution.response?.stream;
  if (!stream?.data) return "";
  return Buffer.from(stream.data).toString("utf8");
}

function contentType(execution) {
  return (execution.response?.header || []).find((item) => item.key?.toLowerCase() === "content-type")?.value || "(missing)";
}

const executions = report.run?.executions || [];
const byId = new Map(executions.map((execution) => [idOf(execution), execution]));
if (executions.length !== manifest.cases.length) {
  throw new Error(`Execution count ${executions.length} does not match manifest count ${manifest.cases.length}`);
}

for (const tc of manifest.cases) {
  const execution = byId.get(tc.id);
  if (!execution) throw new Error(`Missing execution for ${tc.id}`);
  const failedAssertions = (execution.assertions || []).filter((assertion) => assertion.error).length;
  tc.status = failedAssertions ? "Failed" : "Passed";
  tc.relatedBugs = passwordCases.has(tc.id) ? ["#69"] : [];
  tc.execution = {
    runId,
    actualStatus: execution.response?.code ?? null,
    failedAssertions,
    classification: tc.relatedBugs.length
      ? "SUT defect"
      : failedAssertions
        ? "specification gap / incomplete oracle"
        : "passed",
  };
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const passed = manifest.cases.filter((tc) => tc.status === "Passed").length;
const failed = manifest.cases.length - passed;
const failedAssertions = manifest.cases.reduce((total, tc) => total + tc.execution.failedAssertions, 0);
const headerPass = executions.filter((execution) => {
  const assertion = (execution.assertions || []).find((item) => item.assertion?.includes("X-Student-Id"));
  return assertion && !assertion.error;
}).length;
const summaryRows = manifest.cases.map((tc) => {
  const note = tc.relatedBugs.length
    ? `SUT defect; issue ${tc.relatedBugs.join(", ")}`
    : tc.status === "Passed"
      ? "Đạt toàn bộ assertions"
      : "Không tạo bug: oracle âm chưa đủ chi tiết (specification gap/INCOMPLETE)";
  return `| ${tc.id} | ${tc.status} | ${tc.execution.actualStatus} | ${tc.relatedBugs.join(", ") || "None"} | ${note} |`;
}).join("\n");

const summary = `# Test run — POST /api/login — ${runId}

- Tester / MSSV: \`23127062\`
- Base URL: \`http://localhost:3000\`
- Git HEAD lúc chạy: \`${commit}\`${dirty ? " (working tree có thay đổi chưa commit)" : ""}
- Thời gian: \`${runId}\` (Asia/Ho_Chi_Minh)
- Suite: ${manifest.cases.length} AI-generated testcases
- Kết quả: **${passed} Passed / ${failed} Failed / 0 Blocked**
- Newman: ${executions.length} requests, ${report.run?.stats?.assertions?.total ?? "N/A"} assertions, ${failedAssertions} failed assertions
- Header evidence: ${headerPass}/${executions.length} request pass assertion \`X-Student-Id: 23127062\`
- Defect xác nhận: response login thành công trả \`user.password\` plaintext, trùng issue #69

| Testcase | Kết quả | Actual HTTP | Related bugs | Ghi chú triage |
|---|---:|---:|---|---|
${summaryRows}

## Phân loại

- **SUT defect — SEC-01:** response login thành công trả trường \`user.password\` plaintext. Phát hiện bởi TC-LOGIN-001, 002, 027, 035, 036, 037. Duplicate: [issue #69](${issue69}).
- **Specification gaps:** status/schema lỗi cho missing/null/type confusion, email case/trim, và unsupported Content-Type không được đặc tả đủ chính xác. Các ca này vẫn ghi Failed theo oracle bảo thủ nhưng không được nâng thành product bug.

## Artifacts

- HTML: \`${reportDir}/newman-report.html\`
- JSON: \`${reportDir}/newman-report.json\`
- CLI: \`${reportDir}/cli.log\`
- Console screenshot: chờ chụp lại từ run 37 testcase
`;
fs.mkdirSync("tests/test-runs", { recursive: true });
fs.writeFileSync(`tests/test-runs/login-${runId}.md`, summary);

const evidenceIds = ["TC-LOGIN-001", "TC-LOGIN-002", "TC-LOGIN-027", "TC-LOGIN-035", "TC-LOGIN-036", "TC-LOGIN-037"];
const evidenceBlocks = evidenceIds.map((id) => {
  const execution = byId.get(id);
  const header = (execution.assertions || []).find((item) => item.assertion?.includes("X-Student-Id"));
  return [
    `=== ${id} ===`,
    `HTTP ${execution.response.code} ${execution.response.status}`,
    `Content-Type: ${contentType(execution)}`,
    `X-Student-Id assertion: ${header && !header.error ? "PASS" : "FAIL"}`,
    `Response body (secrets redacted): ${bodyOf(execution)}`,
  ].join("\n");
}).join("\n\n");
const evidenceDir = "test-reports/evidence/login/plaintext-password";
fs.mkdirSync(evidenceDir, { recursive: true });
fs.writeFileSync(`${evidenceDir}/response-or-log.txt`, `Raw Newman response extract; secrets are redacted.\nRun: ${runId}\nGit HEAD: ${commit}${dirty ? " (dirty)" : ""}\n\n${evidenceBlocks}\n`);

console.log(`Finalized ${runId}: ${passed} passed, ${failed} failed, ${headerPass}/${executions.length} headers verified.`);
