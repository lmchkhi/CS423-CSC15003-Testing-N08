import fs from "node:fs";
import path from "node:path";

const outDir = path.dirname(new URL(import.meta.url).pathname);
const jsonHeaders = { "Content-Type": "application/json" };
const successSchema = {
  type: "object",
  required: ["token", "user"],
  properties: {
    token: { type: "string", pattern: "^[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$" },
    user: { type: "object", required: ["id", "email", "role"] },
  },
};
const errorSchema = {
  type: "object",
  required: ["error"],
  properties: { error: { type: "string", minLength: 1 } },
};
const okAssertions = [
  { path: "token", operator: "exists" },
  { path: "user", operator: "type", value: "object" },
  { path: "password", operator: "absent" },
  { path: "user.password", operator: "absent" },
];
const errAssertions = [
  { path: "error", operator: "exists" },
  { path: "token", operator: "absent" },
  { path: "user", operator: "absent" },
];

function tc(n, title, options = {}) {
  const body = options.body === "__OMIT__" ? undefined : (Object.hasOwn(options, "body") ? options.body : { email: "{{validUserEmail}}", password: "{{validUserPassword}}" });
  const status = options.status ?? 400;
  const success = status === 200;
  const auditStatus = options.auditStatus ?? "VALID";
  const request = {
    path: "/api/login",
    query: options.query ?? {},
    headers: options.headers ?? jsonHeaders,
    auth: options.auth ?? "none",
  };
  if (body !== undefined) request.body = body;
  const testData = body && !Array.isArray(body) && typeof body === "object"
    ? { ...body, ...(Object.keys(request.query).length ? { query: request.query } : {}) }
    : { requestBody: body === undefined ? "(omitted)" : body };
  return {
    id: `TC-LOGIN-${String(n).padStart(3, "0")}`,
    title,
    requirementIds: options.requirementIds ?? ["FR-02"],
    testType: options.testType ?? (options.coverage?.includes("security") ? "Security" : "Functional"),
    technique: options.technique ?? "Equivalence Partitioning",
    coverage: options.coverage ?? ["domain-partition"],
    source: "ai-generated",
    agentAudit: {
      status: auditStatus,
      reason: options.auditReason ?? (auditStatus === "INCOMPLETE"
        ? "Đặc tả yêu cầu từ chối nhưng không quy định HTTP status chính xác; dùng oracle bảo thủ và cần human review."
        : "Oracle được nêu trực tiếp trong FR-02, SEC hoặc API specification."),
    },
    humanReview: { status: "PENDING", reason: "" },
    preconditions: options.preconditions ?? ["SUT khả dụng tại base URL và tài khoản test mặc định tồn tại ở trạng thái không bị khóa."],
    testData,
    steps: options.steps ?? ["Gửi POST /api/login với headers và JSON body đã nêu.", "Ghi nhận status, Content-Type và response body."],
    request,
    expected: {
      status: [status],
      contentType: "application/json",
      schema: success ? successSchema : errorSchema,
      bodyAssertions: success ? okAssertions : errAssertions,
      maxResponseTimeMs: 2000,
      notes: options.notes ?? [],
    },
    status: "Not Run",
    relatedBugs: [],
  };
}

const cases = [
  tc(1, "Đăng nhập user với credentials hợp lệ", { status: 200, coverage: ["domain-partition", "state-transition", "schema-validation", "security"], requirementIds: ["FR-02", "SEC-01"], notes: ["Từ trạng thái chưa xác thực và tài khoản không bị khóa, login thành công tạo trạng thái đã xác thực thông qua JWT."] }),
  tc(2, "Đăng nhập admin với credentials hợp lệ", { status: 200, body: { email: "{{validAdminEmail}}", password: "{{validAdminPassword}}" }, coverage: ["domain-partition", "schema-validation", "security"], requirementIds: ["FR-02", "SEC-01"] }),
  tc(3, "Email hợp lệ với chữ hoa", { status: 200, body: { email: "{{uppercaseUserEmail}}", password: "{{validUserPassword}}" }, auditStatus: "INCOMPLETE", auditReason: "Đặc tả không nói email login có phân biệt hoa thường; oracle dùng thông lệ email case-insensitive." }),
  tc(4, "Email hợp lệ có khoảng trắng đầu cuối", { status: 200, body: { email: "{{spacedUserEmail}}", password: "{{validUserPassword}}" }, auditStatus: "INCOMPLETE", auditReason: "Đặc tả không nói server có trim email; cần human review trước khi coi sai khác là defect." }),
  tc(5, "Mật khẩu đúng kèm khoảng trắng cuối", { status: 401, body: { email: "nobody@example.invalid", password: "{{validUserPasswordWithTrailingSpace}}" }, auditStatus: "INCOMPLETE", auditReason: "Dùng email không tồn tại để không làm biến đổi lockout state; server vẫn phải từ chối an toàn." }),
  tc(6, "Email chưa đăng ký", { status: 401, body: { email: "nobody@example.invalid", password: "{{invalidPassword}}" }, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", notes: ["Thông báo không được tiết lộ email có tồn tại hay không."] }),
  tc(7, "Credentials không hợp lệ không lộ nguyên nhân", { status: 401, body: { email: "another@example.invalid", password: "{{invalidPassword}}" }, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", notes: ["Thông báo phải cùng mức khái quát với trường hợp email chưa đăng ký."] }),
  tc(8, "Thiếu trường email", { body: { password: "{{invalidPassword}}" }, auditStatus: "INCOMPLETE" }),
  tc(9, "Thiếu trường password", { body: { email: "nobody@example.invalid" }, auditStatus: "INCOMPLETE" }),
  tc(10, "Thiếu cả email và password", { body: {}, auditStatus: "INCOMPLETE" }),
  tc(11, "Email bằng null", { body: { email: null, password: "{{invalidPassword}}" }, auditStatus: "INCOMPLETE" }),
  tc(12, "Password bằng null", { body: { email: "nobody@example.invalid", password: null }, auditStatus: "INCOMPLETE" }),
  tc(13, "Email là chuỗi rỗng", { body: { email: "", password: "{{invalidPassword}}" }, auditStatus: "INCOMPLETE" }),
  tc(14, "Password là chuỗi rỗng", { body: { email: "nobody@example.invalid", password: "" }, auditStatus: "INCOMPLETE" }),
  tc(15, "Email chỉ chứa whitespace", { body: { email: "   ", password: "{{invalidPassword}}" }, auditStatus: "INCOMPLETE" }),
  tc(16, "Password chỉ chứa whitespace", { status: 401, body: { email: "nobody@example.invalid", password: "   " }, auditStatus: "INCOMPLETE" }),
  tc(17, "Email có kiểu number", { body: { email: 12345, password: "{{invalidPassword}}" }, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(18, "Password có kiểu number", { body: { email: "nobody@example.invalid", password: 12345 }, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(19, "Email có kiểu boolean", { body: { email: true, password: "{{invalidPassword}}" }, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(20, "Password có kiểu boolean", { body: { email: "nobody@example.invalid", password: false }, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(21, "Email có kiểu object", { body: { email: { value: "{{validUserEmail}}" }, password: "{{invalidPassword}}" }, technique: "Type Confusion", auditStatus: "INCOMPLETE", coverage: ["domain-partition", "security"] }),
  tc(22, "Password có kiểu object", { body: { email: "nobody@example.invalid", password: { value: "{{invalidPassword}}" } }, technique: "Type Confusion", auditStatus: "INCOMPLETE", coverage: ["domain-partition", "security"] }),
  tc(23, "Top-level JSON bằng null", { body: null, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(24, "Top-level JSON là array", { body: [], technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(25, "Top-level JSON là string", { body: "login", technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(26, "Request không có body", { body: "__OMIT__", technique: "Negative Testing", auditStatus: "INCOMPLETE" }),
  tc(27, "Credentials hợp lệ kèm unknown field role", { status: 200, body: { email: "{{validUserEmail}}", password: "{{validUserPassword}}", role: "admin" }, coverage: ["domain-partition", "security", "schema-validation"], requirementIds: ["FR-02", "SEC-01"], notes: ["Unknown field role không được thay đổi role trả về hoặc cấp quyền ngoài tài khoản thực."] }),
  tc(28, "SQL injection trong email", { status: 401, body: { email: "' OR 1=1 --", password: "{{invalidPassword}}" }, coverage: ["security"], requirementIds: ["FR-02", "SEC-05"], technique: "SQL Injection", notes: ["Không được trả token hoặc thông tin user."] }),
  tc(29, "SQL injection trong password", { status: 401, body: { email: "nobody@example.invalid", password: "' OR '1'='1" }, coverage: ["security"], requirementIds: ["FR-02", "SEC-05"], technique: "SQL Injection", notes: ["Không được bypass authentication; dùng email không tồn tại để không đổi lockout state."] }),
  tc(30, "NoSQL-style injection object", { body: { email: { "$ne": null }, password: { "$ne": null } }, coverage: ["security", "domain-partition"], technique: "Injection", auditStatus: "INCOMPLETE" }),
  tc(31, "XSS payload trong email", { body: { email: "<script>alert(1)</script>", password: "{{invalidPassword}}" }, coverage: ["security"], requirementIds: ["FR-02", "SEC-04"], technique: "Injection", auditStatus: "INCOMPLETE", notes: ["Response không được phản chiếu payload dưới dạng executable content."] }),
  tc(32, "CRLF payload trong email", { body: { email: "a@example.com\r\nX-Test: injected", password: "{{invalidPassword}}" }, coverage: ["security"], technique: "Injection", auditStatus: "INCOMPLETE" }),
  tc(33, "Email vượt kích thước hợp lý", { body: { email: "{{oversizedEmail}}", password: "{{invalidPassword}}" }, coverage: ["security", "domain-partition"], technique: "Boundary Value Analysis", auditStatus: "INCOMPLETE" }),
  tc(34, "Content-Type không phải JSON", { headers: { "Content-Type": "text/plain" }, body: { email: "{{validUserEmail}}", password: "{{validUserPassword}}" }, coverage: ["security", "domain-partition"], technique: "Content-Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(35, "Login public bỏ qua Authorization header không hợp lệ", { status: 200, auth: "invalid", coverage: ["security", "schema-validation"], auditStatus: "INCOMPLETE", auditReason: "Đặc tả không yêu cầu token cho login; bearer thừa không nên thay đổi authentication bằng credentials." }),
  tc(36, "Query parameter thừa không thay đổi login", { status: 200, query: { debug: "true" }, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", auditReason: "Đặc tả không mô tả query parameter; kỳ vọng endpoint bỏ qua tham số không được hỗ trợ một cách an toàn." }),
  tc(37, "Schema thành công không lộ trường nhạy cảm", { status: 200, coverage: ["schema-validation", "security"], requirementIds: ["FR-02", "SEC-01"], testType: "Contract", technique: "Schema Validation" }),
];

const manifest = {
  suite: {
    name: "Login API - HW06 - MSSV 23127062",
    module: "LOGIN",
    endpoint: "POST /api/login",
    method: "POST",
    path: "/api/login",
    baseUrl: "http://localhost:3000",
    studentId: "23127062",
    stateTransitionApplicable: true,
  },
  cases,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "suite.manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.writeFileSync(path.join(outDir, "login.postman_environment.example.json"), JSON.stringify({
  id: "hw06-login-example",
  name: "HW06 Login example (không chứa secrets)",
  values: [
    { key: "validUserEmail", value: "<set-at-runtime>", enabled: true },
    { key: "validUserPassword", value: "<set-at-runtime>", enabled: true },
    { key: "validAdminEmail", value: "<set-at-runtime>", enabled: true },
    { key: "validAdminPassword", value: "<set-at-runtime>", enabled: true },
    { key: "uppercaseUserEmail", value: "<set-at-runtime>", enabled: true },
    { key: "spacedUserEmail", value: "<set-at-runtime>", enabled: true },
    { key: "validUserPasswordWithTrailingSpace", value: "<set-at-runtime>", enabled: true },
    { key: "invalidPassword", value: "<set-at-runtime>", enabled: true },
    { key: "oversizedEmail", value: "<set-at-runtime>", enabled: true },
  ],
  _postman_variable_scope: "environment",
  _postman_exported_using: "Codex api-testing skill",
}, null, 2) + "\n");

console.log(`Wrote ${cases.length} cases to ${path.join(outDir, "suite.manifest.json")}`);
