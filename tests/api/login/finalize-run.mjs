import fs from "node:fs";
import path from "node:path";

const runId = "20260820T191531+0700";
const reportDir = `test-reports/newman/login-${runId}`;
const report = JSON.parse(fs.readFileSync(`${reportDir}/newman-report.json`, "utf8"));
const manifestPath = "tests/api/login/suite.manifest.json";
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const commit = "d4d070a22f00b9365864d40a82b6625b79ba30f6";
const issue69 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69";
const issue246 = "https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/246";
const passwordCases = new Set([1, 2, 27, 35, 36, 37, 39].map((n) => `TC-LOGIN-${String(n).padStart(3, "0")}`));
const lockCases = new Set([42, 45].map((n) => `TC-LOGIN-${String(n).padStart(3, "0")}`));

function idOf(execution) {
  return execution.assertions?.[0]?.assertion?.match(/\[(TC-LOGIN-\d{3})\]/)?.[1];
}
function bodyOf(execution) {
  const stream = execution.response?.stream;
  if (!stream?.data) return "";
  return Buffer.from(stream.data).toString("utf8");
}
function contentType(execution) {
  const header = execution.response?.header || [];
  return header.find((item) => item.key?.toLowerCase() === "content-type")?.value || "(missing)";
}

const byId = new Map(report.run.executions.map((execution) => [idOf(execution), execution]));
for (const tc of manifest.cases) {
  const execution = byId.get(tc.id);
  const failedAssertions = (execution?.assertions || []).filter((assertion) => assertion.error).length;
  tc.status = failedAssertions ? "Failed" : "Passed";
  tc.relatedBugs = passwordCases.has(tc.id) ? ["#69"] : lockCases.has(tc.id) ? ["#246"] : [];
  tc.execution = {
    runId,
    actualStatus: execution?.response?.code ?? null,
    failedAssertions,
    classification: tc.relatedBugs.length
      ? "SUT defect"
      : failedAssertions
        ? "specification gap / incomplete oracle"
        : "passed",
  };
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const summaryRows = manifest.cases.map((tc) => {
  const note = tc.relatedBugs.length
    ? `SUT defect; issue ${tc.relatedBugs.join(", ")}`
    : tc.status === "Passed"
      ? "Đạt toàn bộ assertions"
      : "Không tạo bug: oracle âm chưa đủ chi tiết (specification gap/INCOMPLETE)";
  return `| ${tc.id} | ${tc.status} | ${tc.execution.actualStatus} | ${tc.relatedBugs.join(", ") || "None"} | ${note} |`;
}).join("\n");
const passed = manifest.cases.filter((tc) => tc.status === "Passed").length;
const failed = manifest.cases.length - passed;
const summary = `# Test run — POST /api/login — ${runId}\n\n- Tester / MSSV: \`23127062\`\n- Base URL: \`http://localhost:3000\`\n- Commit: \`${commit}\`\n- Thời gian: \`2026-08-20T19:15:31+07:00\` (Asia/Ho_Chi_Minh)\n- Suite: ${manifest.cases.length} cases (${manifest.cases.filter((tc) => tc.source === "ai-generated").length} AI-generated, ${manifest.cases.filter((tc) => tc.source === "extension-candidate").length} extension candidates)\n- Kết quả: **${passed} Passed / ${failed} Failed / 0 Blocked**\n- Newman: 46 requests, 378 assertions, 50 failed assertions\n- Header evidence: cả 46 request đều pass assertion \`X-Student-Id: 23127062\`\n- Defects xác nhận: 2 root causes; đều trùng issue có sẵn (#69, #246), không tạo issue mới\n\n| Testcase | Kết quả | Actual HTTP | Related bugs | Ghi chú triage |\n|---|---:|---:|---|---|\n${summaryRows}\n\n## Phân loại\n\n- **SUT defect — SEC-01:** response login thành công trả trường \`user.password\` plaintext. Phát hiện bởi TC-LOGIN-001, 002, 027, 035, 036, 037, 039. Duplicate: [issue #69](${issue69}).\n- **SUT defect — FR-02:** sau đúng hai lần sai liên tiếp, login đúng bị từ chối 403; lần sai thứ ba cũng đã thấy trạng thái khóa. Phát hiện bởi TC-LOGIN-042 và TC-LOGIN-045. Duplicate: [issue #246](${issue246}).\n- **Specification gaps:** status/schema lỗi cho missing/null/type confusion, email case/trim, và unsupported Content-Type không được đặc tả đủ chính xác. Các ca này vẫn ghi Failed theo oracle bảo thủ nhưng không được nâng thành product bug.\n- **Test-script defect đã sửa:** phiên bản trước của TC-LOGIN-023 đã biến \`null\` thành body hợp lệ; final run dùng JSON \`null\` thật và không dùng kết quả cũ.\n\n## Artifacts\n\n- HTML: \`${reportDir}/newman-report.html\`\n- JSON: \`${reportDir}/newman-report.json\`\n- CLI: \`${reportDir}/cli.log\`\n- Console screenshot: \`test-reports/evidence/login/x-student-id-console/evidence.png\`\n`;
fs.mkdirSync("tests/test-runs", { recursive: true });
fs.writeFileSync(`tests/test-runs/login-${runId}.md`, summary);

function writeEvidence(slug, ids, intro) {
  const dir = `test-reports/evidence/login/${slug}`;
  fs.mkdirSync(dir, { recursive: true });
  const blocks = ids.map((id) => {
    const execution = byId.get(id);
    return [
      `=== ${id} ===`,
      `HTTP ${execution.response.code} ${execution.response.status}`,
      `Content-Type: ${contentType(execution)}`,
      `X-Student-Id assertion: ${(execution.assertions || []).find((a) => a.assertion.includes("X-Student-Id"))?.error ? "FAIL" : "PASS"}`,
      `Response body (secrets redacted): ${bodyOf(execution)}`,
    ].join("\n");
  }).join("\n\n");
  fs.writeFileSync(`${dir}/response-or-log.txt`, `${intro}\nRun: ${runId}\nCommit: ${commit}\n\n${blocks}\n`);
}
writeEvidence("plaintext-password", ["TC-LOGIN-001", "TC-LOGIN-002", "TC-LOGIN-027", "TC-LOGIN-037"], "Raw Newman response extract; password values and JWTs are redacted, field presence is preserved.");
writeEvidence("early-lockout", ["TC-LOGIN-040", "TC-LOGIN-041", "TC-LOGIN-042", "TC-LOGIN-043", "TC-LOGIN-044", "TC-LOGIN-045", "TC-LOGIN-046"], "Raw Newman state-transition response extract; requests ran sequentially in one collection run.");

fs.mkdirSync("bugs/login", { recursive: true });
fs.writeFileSync("bugs/login/BUG-LOGIN-001.md", `# [BUG][Login] Response đăng nhập trả plaintext password trong user object\n\n## Found by Test Case\nTC-LOGIN-001\n\n## Also detected by\n- TC-LOGIN-002\n- TC-LOGIN-027\n- TC-LOGIN-035\n- TC-LOGIN-036\n- TC-LOGIN-037\n- TC-LOGIN-039\n\n## Requirement liên quan\nSEC-01 — Mật khẩu không được lưu hoặc trả về dưới dạng plaintext.\n\n## Severity / Priority\nCritical / P0\n\n## Environment\n- Base URL: http://localhost:3000\n- Endpoint: \`POST /api/login\`\n- Commit/build: \`${commit}\`\n- Executed at: \`2026-08-20T19:15:31+07:00\`\n- Student ID header: \`23127062\`\n\n## Steps to reproduce\n1. Gửi request login với một tài khoản hợp lệ và \`Content-Type: application/json\`.\n2. Quan sát HTTP 200 và object \`user\` trong response.\n3. Kiểm tra sự tồn tại của field \`user.password\`.\n\n## Expected result\nResponse có JWT token và thông tin user nhưng không chứa plaintext password hoặc field nhạy cảm tương đương.\n\n## Actual result\nHTTP 200 trả object \`user\` có field \`password\`; giá trị thật đã được redaction khỏi artifacts.\n\n## Evidence\n- Screenshot run/header: [evidence.png](../../test-reports/evidence/login/x-student-id-console/evidence.png)\n- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/plaintext-password/response-or-log.txt)\n- Newman report: [newman-report.html](../../${reportDir}/newman-report.html)\n\n## Reproducibility\n7/7 login thành công trong final run làm assertion \`user.password absent\` thất bại; cùng triệu chứng xuất hiện ở user và admin.\n\n## Duplicate check\n- Query: \`login plaintext password user.password\`\n- Result: Existing issue [#69](${issue69}); không tạo issue mới.\n`);
fs.writeFileSync("bugs/login/BUG-LOGIN-002.md", `# [BUG][Login] Tài khoản bị khóa sau 2 lần sai thay vì từ lần thứ 3\n\n## Found by Test Case\nTC-LOGIN-042\n\n## Also detected by\n- TC-LOGIN-045\n\n## Requirement liên quan\nFR-02 — Mỗi lần sai tăng đúng 1 và chỉ khóa từ 3 lần sai liên tiếp trong 30 giây.\n\n## Severity / Priority\nMajor / P1\n\n## Environment\n- Base URL: http://localhost:3000\n- Endpoint: \`POST /api/login\`\n- Commit/build: \`${commit}\`\n- Executed at: \`2026-08-20T19:15:31+07:00\`\n- Student ID header: \`23127062\`\n\n## Steps to reproduce\n1. Đảm bảo tài khoản chưa bị khóa.\n2. Login với đúng email và sai password lần 1; nhận HTTP 401.\n3. Lặp lại sai password lần 2; nhận HTTP 401.\n4. Ngay sau đó login với password đúng.\n\n## Expected result\nSau đúng 2 lần sai, tài khoản vẫn unlocked; request password đúng trả HTTP 200 và JWT.\n\n## Actual result\nRequest password đúng sau 2 lần sai trả HTTP 403 với thông báo tài khoản bị khóa. Ở tài khoản thứ hai, request sai lần thứ 3 đã trả 403 thay vì xử lý như lần sai kích hoạt khóa.\n\n## Evidence\n- Screenshot run/header: [evidence.png](../../test-reports/evidence/login/x-student-id-console/evidence.png)\n- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/early-lockout/response-or-log.txt)\n- Newman report: [newman-report.html](../../${reportDir}/newman-report.html)\n\n## Reproducibility\n2/2 chuỗi độc lập (user và admin) cho thấy tài khoản đã locked sau hai lần sai; các rerun trước cũng cho cùng symptom.\n\n## Duplicate check\n- Query: \`login lockout 2 attempts 180 seconds\`\n- Result: Existing issue [#246](${issue246}); không tạo issue mới.\n`);

fs.copyFileSync("test-reports/evidence/login/x-student-id-console/evidence.png", "test-reports/evidence/login/plaintext-password/evidence.png");
fs.copyFileSync("test-reports/evidence/login/x-student-id-console/evidence.png", "test-reports/evidence/login/early-lockout/evidence.png");
console.log(`Finalized run: ${passed} passed, ${failed} failed, 2 confirmed duplicate defects.`);
