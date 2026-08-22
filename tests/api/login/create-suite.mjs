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
const rejectAssertions = [
  { path: "token", operator: "absent" },
  { path: "user", operator: "absent" },
];
const rejectedInputStatuses = [400, 401, 403, 422, 429];
const rejectedMediaStatuses = [400, 415, 422];
const rejectedOversizedStatuses = [400, 401, 413, 422, 429];

function tc(n, title, options = {}) {
  const body = options.body === "__OMIT__" ? undefined : (Object.hasOwn(options, "body") ? options.body : { email: "{{validUserEmail}}", password: "{{validUserPassword}}" });
  const status = options.status ?? 400;
  const statuses = Array.isArray(status) ? status : [status];
  const success = statuses.length === 1 && statuses[0] === 200;
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
      status: statuses,
      contentType: Object.hasOwn(options, "contentType") ? options.contentType : "application/json",
      schema: Object.hasOwn(options, "schema") ? options.schema : (success ? successSchema : errorSchema),
      bodyAssertions: options.bodyAssertions ?? (success ? okAssertions : errAssertions),
      maxResponseTimeMs: 2000,
      notes: options.notes ?? [],
    },
    status: "Not Run",
    relatedBugs: [],
  };
}

function extensionTc(n, title, options) {
  return {
    id: `TC-LOGIN-EXT-${String(n).padStart(3, "0")}`,
    title,
    requirementIds: options.requirementIds ?? ["FR-02"],
    testType: options.testType ?? "State",
    technique: options.technique ?? "State Transition",
    coverage: options.coverage ?? ["state-transition", "security"],
    source: "student-authored",
    agentAudit: {
      status: "VALID",
      reason: "Case bổ sung có oracle trực tiếp từ FR-02 và bao phủ chuỗi trạng thái chưa có trong baseline.",
    },
    humanReview: {
      status: "APPROVED",
      reason: "Nội dung extension case đã được sinh viên cung cấp và yêu cầu materialize vào suite.",
    },
    preconditions: options.preconditions,
    testData: options.testData,
    steps: options.steps,
    workflow: options.workflow,
    differential: options.differential,
    request: {
      path: "/api/login",
      query: {},
      headers: jsonHeaders,
      auth: "none",
      body: options.body,
    },
    expected: {
      status: options.status,
      contentType: "application/json",
      schema: options.schema ?? null,
      bodyAssertions: options.bodyAssertions ?? rejectAssertions,
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
  tc(3, "Email sai định dạng do thiếu ký tự @", { status: rejectedInputStatuses, body: { email: "invalid-email", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE", auditReason: "Oracle email case-insensitive không có trong đặc tả; đã đổi sang partition sai định dạng có tiêu chí từ chối rõ ràng." }),
  tc(4, "Email sai định dạng do thiếu domain", { status: rejectedInputStatuses, body: { email: "user@", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE", auditReason: "Oracle trim khoảng trắng không có trong đặc tả; đã đổi sang partition thiếu domain." }),
  tc(5, "Mật khẩu đúng kèm khoảng trắng cuối", { status: rejectedInputStatuses, body: { email: "{{validUserEmail}}", password: "{{validUserPasswordWithTrailingSpace}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE", auditReason: "Email không tồn tại che khuất partition mật khẩu; đã sửa dùng tài khoản hợp lệ." }),
  tc(6, "Email chưa đăng ký", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", notes: ["Thông báo không được tiết lộ email có tồn tại hay không."] }),
  tc(7, "Mật khẩu sai không được cấp token", { status: rejectedInputStatuses, body: { email: "{{validAdminEmail}}", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", notes: ["Không được trả token hoặc thông tin user khi password sai."] }),
  tc(8, "Thiếu trường email", { status: rejectedInputStatuses, body: { password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(9, "Thiếu trường password", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(10, "Thiếu cả email và password", { status: rejectedInputStatuses, body: {}, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(11, "Email bằng null", { status: rejectedInputStatuses, body: { email: null, password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(12, "Password bằng null", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: null }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(13, "Email là chuỗi rỗng", { status: rejectedInputStatuses, body: { email: "", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(14, "Password là chuỗi rỗng", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: "" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(15, "Email chỉ chứa whitespace", { status: rejectedInputStatuses, body: { email: "   ", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(16, "Password chỉ chứa whitespace", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: "   " }, contentType: null, schema: null, bodyAssertions: rejectAssertions, auditStatus: "INCOMPLETE" }),
  tc(17, "Email có kiểu number", { status: rejectedInputStatuses, body: { email: 12345, password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(18, "Password có kiểu number", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: 12345 }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(19, "Email có kiểu boolean", { status: rejectedInputStatuses, body: { email: true, password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(20, "Password có kiểu boolean", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: false }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(21, "Email có kiểu object", { status: rejectedInputStatuses, body: { email: { value: "{{validUserEmail}}" }, password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE", coverage: ["domain-partition", "security"] }),
  tc(22, "Password có kiểu object", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: { value: "{{invalidPassword}}" } }, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE", coverage: ["domain-partition", "security"] }),
  tc(23, "Top-level JSON bằng null", { status: rejectedInputStatuses, body: null, contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(24, "Top-level JSON là array", { status: rejectedInputStatuses, body: [], contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(25, "Top-level JSON là string", { status: rejectedInputStatuses, body: "login", contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(26, "Request không có body", { status: rejectedInputStatuses, body: "__OMIT__", contentType: null, schema: null, bodyAssertions: rejectAssertions, technique: "Negative Testing", auditStatus: "INCOMPLETE" }),
  tc(27, "Credentials hợp lệ kèm unknown field role", { status: 200, body: { email: "{{validUserEmail}}", password: "{{validUserPassword}}", role: "admin" }, coverage: ["domain-partition", "security", "schema-validation"], requirementIds: ["FR-02", "SEC-01"], notes: ["Unknown field role không được thay đổi role trả về hoặc cấp quyền ngoài tài khoản thực."] }),
  tc(28, "SQL injection trong email", { status: 401, body: { email: "' OR 1=1 --", password: "{{invalidPassword}}" }, coverage: ["security"], requirementIds: ["FR-02", "SEC-05"], technique: "SQL Injection", notes: ["Không được trả token hoặc thông tin user."] }),
  tc(29, "SQL injection trong password", { status: 401, body: { email: "nobody@example.invalid", password: "' OR '1'='1" }, coverage: ["security"], requirementIds: ["FR-02", "SEC-05"], technique: "SQL Injection", notes: ["Không được bypass authentication; dùng email không tồn tại để không đổi lockout state."] }),
  tc(30, "NoSQL-style injection object", { status: rejectedInputStatuses, body: { email: { "$ne": null }, password: { "$ne": null } }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["security", "domain-partition"], technique: "Injection", auditStatus: "INCOMPLETE" }),
  tc(31, "XSS payload trong email không được bypass đăng nhập", { status: rejectedInputStatuses, body: { email: "<script>alert(1)</script>", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["security"], requirementIds: ["FR-02"], technique: "Injection", auditStatus: "INCOMPLETE", notes: ["Không được trả token hoặc thông tin user."] }),
  tc(32, "CRLF payload trong email", { status: rejectedInputStatuses, body: { email: "a@example.com\r\nX-Test: injected", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["security"], technique: "Injection", auditStatus: "INCOMPLETE" }),
  tc(33, "Email vượt kích thước hợp lý", { status: rejectedOversizedStatuses, body: { email: "{{oversizedEmail}}", password: "{{invalidPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["security", "domain-partition"], technique: "Boundary Value Analysis", auditStatus: "INCOMPLETE" }),
  tc(34, "Content-Type không phải JSON", { status: rejectedMediaStatuses, headers: { "Content-Type": "text/plain" }, body: { email: "{{validUserEmail}}", password: "{{validUserPassword}}" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["security", "domain-partition"], technique: "Content-Type Confusion", auditStatus: "INCOMPLETE" }),
  tc(35, "Đăng nhập không gửi Authorization header", { status: 200, auth: "missing", coverage: ["security", "schema-validation"], auditStatus: "INCOMPLETE", auditReason: "Case cũ suy diễn cách xử lý bearer token thừa; đã sửa để kiểm tra login public không yêu cầu Authorization." }),
  tc(36, "Query parameter thừa không bypass credentials sai", { status: rejectedInputStatuses, body: { email: "nobody@example.invalid", password: "{{invalidPassword}}" }, query: { debug: "true" }, contentType: null, schema: null, bodyAssertions: rejectAssertions, coverage: ["domain-partition", "security"], auditStatus: "INCOMPLETE", auditReason: "Case cũ suy diễn query thừa phải bị bỏ qua khi login thành công; đã sửa để kiểm tra query không bypass credentials sai." }),
  tc(37, "Schema thành công không lộ trường nhạy cảm", { status: 200, coverage: ["schema-validation", "security"], requirementIds: ["FR-02", "SEC-01"], testType: "Contract", technique: "Schema Validation" }),
];

const humanReviews = {
  "TC-LOGIN-001": ["VALID", "Đúng FR-02 và SEC-01: credentials hợp lệ phải trả JWT, user object và không lộ password."],
  "TC-LOGIN-002": ["VALID", "Đúng FR-02 cho tài khoản admin; oracle thành công và schema JWT/user phù hợp."],
  "TC-LOGIN-003": ["INCOMPLETE", "Oracle email viết hoa phải đăng nhập thành công không có trong đặc tả; đã đổi thành email thiếu @ và chấp nhận các status từ chối 4xx phù hợp."],
  "TC-LOGIN-004": ["INCOMPLETE", "Đặc tả không quy định trim email; đã đổi thành email thiếu domain và kiểm tra request bị từ chối, không cấp token."],
  "TC-LOGIN-005": ["INVALID", "Case cũ dùng email không tồn tại nên không kiểm được ảnh hưởng của khoảng trắng trong password; đã sửa dùng email hợp lệ."],
  "TC-LOGIN-006": ["INCOMPLETE", "Đặc tả không quy định status/schema lỗi cho email chưa đăng ký; đã bỏ schema error tự suy diễn và dùng oracle 4xx không cấp token."],
  "TC-LOGIN-007": ["INCOMPLETE", "Case cũ trùng partition email chưa đăng ký; đã đổi sang email tồn tại với password sai và kiểm tra không cấp token."],
  "TC-LOGIN-008": ["INCOMPLETE", "Thiếu email phải bị từ chối nhưng đặc tả không chốt status/schema; đã dùng nhóm 4xx và bỏ schema lỗi tự suy diễn."],
  "TC-LOGIN-009": ["INCOMPLETE", "Thiếu password phải bị từ chối nhưng đặc tả không chốt status/schema; đã dùng nhóm 4xx và bỏ schema lỗi tự suy diễn."],
  "TC-LOGIN-010": ["INCOMPLETE", "Thiếu cả hai trường chưa có error contract; đã giữ negative partition và chỉ yêu cầu 4xx, không token/user."],
  "TC-LOGIN-011": ["INCOMPLETE", "Email null chưa có error contract; đã bỏ kỳ vọng chính xác 400 và trường error."],
  "TC-LOGIN-012": ["INCOMPLETE", "Password null chưa có error contract; đã bỏ kỳ vọng chính xác 400 và trường error."],
  "TC-LOGIN-013": ["INCOMPLETE", "Email rỗng chưa có error contract; đã dùng oracle từ chối 4xx và không cấp token."],
  "TC-LOGIN-014": ["INCOMPLETE", "Password rỗng chưa có error contract; đã dùng oracle từ chối 4xx và không cấp token."],
  "TC-LOGIN-015": ["INCOMPLETE", "Email whitespace chưa có quy tắc normalize; đã yêu cầu từ chối thay vì suy diễn schema lỗi."],
  "TC-LOGIN-016": ["INCOMPLETE", "Password whitespace là credentials sai nhưng status chưa được quy định; đã chấp nhận nhóm 4xx và kiểm tra không cấp token."],
  "TC-LOGIN-017": ["INCOMPLETE", "Email number phải bị từ chối nhưng status/schema chưa được mô tả; đã bỏ oracle error object tự suy diễn."],
  "TC-LOGIN-018": ["INCOMPLETE", "Password number phải bị từ chối nhưng status/schema chưa được mô tả; đã bỏ oracle error object tự suy diễn."],
  "TC-LOGIN-019": ["INCOMPLETE", "Email boolean phải bị từ chối nhưng status/schema chưa được mô tả; đã dùng oracle 4xx không token/user."],
  "TC-LOGIN-020": ["INCOMPLETE", "Password boolean phải bị từ chối nhưng status/schema chưa được mô tả; đã dùng oracle 4xx không token/user."],
  "TC-LOGIN-021": ["INCOMPLETE", "Email object là type-confusion hợp lệ nhưng error contract bị tự suy diễn; đã giữ payload và nới oracle về 4xx."],
  "TC-LOGIN-022": ["INCOMPLETE", "Password object là type-confusion hợp lệ nhưng error contract bị tự suy diễn; đã giữ payload và nới oracle về 4xx."],
  "TC-LOGIN-023": ["INCOMPLETE", "Top-level null phải bị từ chối an toàn nhưng đặc tả không chốt response; đã bỏ schema lỗi bắt buộc."],
  "TC-LOGIN-024": ["INCOMPLETE", "Top-level array phải bị từ chối an toàn nhưng đặc tả không chốt response; đã bỏ schema lỗi bắt buộc."],
  "TC-LOGIN-025": ["INCOMPLETE", "Top-level string phải bị từ chối an toàn nhưng đặc tả không chốt response; đã bỏ schema lỗi bắt buộc."],
  "TC-LOGIN-026": ["INCOMPLETE", "Request không body phải bị từ chối nhưng error contract chưa có; đã dùng oracle 4xx không token/user."],
  "TC-LOGIN-027": ["VALID", "Body contract chỉ có email/password; field role thừa không được nâng quyền và role trả về phải theo tài khoản thực."],
  "TC-LOGIN-028": ["VALID", "Payload SQL injection ở email kiểm trực tiếp SEC-05 và yêu cầu không bypass authentication."],
  "TC-LOGIN-029": ["VALID", "Payload SQL injection ở password kiểm trực tiếp SEC-05 và yêu cầu không bypass authentication."],
  "TC-LOGIN-030": ["INCOMPLETE", "Ý tưởng injection hợp lệ nhưng status/schema lỗi chưa được đặc tả; đã dùng nhóm 4xx và không token/user."],
  "TC-LOGIN-031": ["INVALID", "SEC-04 áp dụng tại UI boundary, không phải oracle trực tiếp cho login API; đã bỏ mapping SEC-04 và đổi mục tiêu thành không bypass authentication."],
  "TC-LOGIN-032": ["INCOMPLETE", "CRLF payload cần bị từ chối nhưng exact status/schema chưa có; đã dùng nhóm 4xx và không token/user."],
  "TC-LOGIN-033": ["INCOMPLETE", "Không có giới hạn độ dài email cụ thể; đã giữ robustness case và chấp nhận 400/401/413/422/429 thay vì ép 400."],
  "TC-LOGIN-034": ["INCOMPLETE", "Đặc tả chỉ yêu cầu body JSON, không định nghĩa response cho text/plain; đã chấp nhận 400/415/422 và bỏ schema lỗi tự suy diễn."],
  "TC-LOGIN-035": ["INCOMPLETE", "Đặc tả không nói cách xử lý bearer token thừa; đã sửa thành kiểm tra login public hoạt động khi không gửi Authorization."],
  "TC-LOGIN-036": ["INCOMPLETE", "Đặc tả không nói query thừa phải bị bỏ qua ở success path; đã sửa để kiểm tra query không bypass credentials sai."],
  "TC-LOGIN-037": ["VALID", "Schema success phải có JWT/user và không được làm lộ password; oracle phù hợp FR-02 và yêu cầu bảo mật."],
};

for (const testCase of cases) {
  const review = humanReviews[testCase.id];
  if (!review) throw new Error(`Missing human review for ${testCase.id}`);
  testCase.humanReview = { status: review[0], reason: review[1] };
}

const workflowRegistration = (emailVariable) => ({
  name: "Tạo tài khoản riêng cho testcase",
  request: {
    method: "POST",
    path: "/api/register",
    headers: jsonHeaders,
    body: { name: "Extension Login Test", email: emailVariable, password: "{{extensionPassword}}" },
  },
  expected: { status: [200], bodyAssertions: [{ path: "id", operator: "exists" }] },
});
const workflowWrongLogin = (name, emailVariable) => ({
  name,
  request: {
    method: "POST",
    path: "/api/login",
    headers: jsonHeaders,
    body: { email: emailVariable, password: "{{invalidPassword}}" },
  },
  expected: { status: rejectedInputStatuses, bodyAssertions: rejectAssertions },
});
const workflowValidLogin = (name, emailVariable, expectedStatus = [200]) => ({
  name,
  request: {
    method: "POST",
    path: "/api/login",
    headers: jsonHeaders,
    body: { email: emailVariable, password: "{{extensionPassword}}" },
  },
  expected: {
    status: expectedStatus,
    bodyAssertions: expectedStatus.includes(200)
      ? [{ path: "token", operator: "exists" }, { path: "user", operator: "exists" }]
      : rejectAssertions,
  },
});

cases.push(
  extensionTc(1, "Đăng nhập thành công reset bộ đếm sai liên tiếp", {
    testData: { email: "{{extensionEmail1}}", password: "{{extensionPassword}}", invalidPassword: "{{invalidPassword}}", sequence: "wrong ×2 → success → wrong ×2 → success" },
    preconditions: ["SUT khả dụng; workflow tạo một tài khoản riêng ở trạng thái chưa bị khóa."],
    steps: [
      "Tạo tài khoản riêng qua POST /api/register.",
      "Đăng nhập sai hai lần, sau đó đăng nhập đúng để reset bộ đếm.",
      "Đăng nhập sai thêm hai lần rồi gửi request chính với credentials đúng.",
      "Kiểm tra cả hai lần đăng nhập đúng đều thành công và trả JWT.",
    ],
    workflow: [
      workflowRegistration("{{extensionEmail1}}"),
      workflowWrongLogin("Sai lần 1 trước reset", "{{extensionEmail1}}"),
      workflowWrongLogin("Sai lần 2 trước reset", "{{extensionEmail1}}"),
      workflowValidLogin("Đăng nhập đúng để reset", "{{extensionEmail1}}"),
      workflowWrongLogin("Sai lần 1 sau reset", "{{extensionEmail1}}"),
      workflowWrongLogin("Sai lần 2 sau reset", "{{extensionEmail1}}"),
    ],
    body: { email: "{{extensionEmail1}}", password: "{{extensionPassword}}" },
    status: [200],
    bodyAssertions: [{ path: "token", operator: "exists" }, { path: "user", operator: "exists" }],
    notes: ["Login thành công phải đặt login_attempts về 0; hai lần sai sau reset chưa được khóa tài khoản."],
  }),
  extensionTc(2, "Khóa tài khoản đúng tại lần đăng nhập sai thứ ba", {
    testData: { preThresholdAccount: "{{extensionEmail2Pre}}", thresholdAccount: "{{extensionEmail2Threshold}}", password: "{{extensionPassword}}", invalidPassword: "{{invalidPassword}}" },
    preconditions: ["SUT khả dụng; workflow tạo hai tài khoản riêng để kiểm tra trước ngưỡng và tại ngưỡng độc lập."],
    steps: [
      "Với tài khoản thứ nhất, đăng nhập sai hai lần rồi đăng nhập đúng; lần đúng phải thành công để chứng minh chưa bị khóa sớm.",
      "Với tài khoản thứ hai, đăng nhập sai đúng ba lần liên tiếp.",
      "Gửi request chính bằng credentials đúng của tài khoản thứ hai.",
      "Kiểm tra tài khoản thứ hai đang bị khóa và response không có token/user.",
    ],
    workflow: [
      workflowRegistration("{{extensionEmail2Pre}}"),
      workflowWrongLogin("Tài khoản trước ngưỡng - sai lần 1", "{{extensionEmail2Pre}}"),
      workflowWrongLogin("Tài khoản trước ngưỡng - sai lần 2", "{{extensionEmail2Pre}}"),
      workflowValidLogin("Tài khoản trước ngưỡng vẫn đăng nhập được", "{{extensionEmail2Pre}}"),
      workflowRegistration("{{extensionEmail2Threshold}}"),
      workflowWrongLogin("Tài khoản tại ngưỡng - sai lần 1", "{{extensionEmail2Threshold}}"),
      workflowWrongLogin("Tài khoản tại ngưỡng - sai lần 2", "{{extensionEmail2Threshold}}"),
      workflowWrongLogin("Tài khoản tại ngưỡng - sai lần 3", "{{extensionEmail2Threshold}}"),
    ],
    body: { email: "{{extensionEmail2Threshold}}", password: "{{extensionPassword}}" },
    status: [403, 429],
    bodyAssertions: rejectAssertions,
    notes: ["Hai lần sai chưa được khóa; từ lần sai thứ ba trở đi credentials đúng phải bị từ chối trong thời gian lockout."],
  }),
  extensionTc(3, "Tự mở khóa tại biên thời gian 30 giây", {
    technique: "State Transition / Temporal BVA",
    testData: { email: "{{extensionEmail3}}", password: "{{extensionPassword}}", invalidPassword: "{{invalidPassword}}", lockDuration: "30 giây" },
    preconditions: ["SUT khả dụng; workflow tạo một tài khoản riêng và có thể chờ khoảng 30 giây."],
    steps: [
      "Tạo tài khoản riêng và đăng nhập sai ba lần để kích hoạt lockout.",
      "Chờ 29 giây rồi thử credentials đúng; request phải còn bị từ chối.",
      "Chờ thêm 1,5 giây và gửi request chính bằng credentials đúng.",
      "Kiểm tra request sau mốc 30 giây thành công và trả JWT.",
    ],
    workflow: [
      workflowRegistration("{{extensionEmail3}}"),
      workflowWrongLogin("Sai lần 1", "{{extensionEmail3}}"),
      workflowWrongLogin("Sai lần 2", "{{extensionEmail3}}"),
      workflowWrongLogin("Sai lần 3", "{{extensionEmail3}}"),
      { name: "Chờ trước biên lockout", waitMs: 29000 },
      workflowValidLogin("Credentials đúng trước mốc 30 giây vẫn bị từ chối", "{{extensionEmail3}}", [403, 429]),
      { name: "Vượt qua biên 30 giây", waitMs: 1500 },
    ],
    body: { email: "{{extensionEmail3}}", password: "{{extensionPassword}}" },
    status: [200],
    bodyAssertions: [{ path: "token", operator: "exists" }, { path: "user", operator: "exists" }],
    notes: ["Lockout phải hết hiệu lực từ mốc 30 giây theo FR-02."],
  }),
  extensionTc(4, "Bộ đếm đăng nhập sai được cô lập theo tài khoản", {
    testData: { accountA: "{{extensionEmail4A}}", accountB: "{{extensionEmail4B}}", password: "{{extensionPassword}}", invalidPassword: "{{invalidPassword}}" },
    preconditions: ["SUT khả dụng; workflow tạo hai tài khoản riêng ở trạng thái chưa bị khóa."],
    steps: [
      "Tạo hai tài khoản A và B.",
      "Xen kẽ hai lần đăng nhập sai cho A và hai lần cho B.",
      "Đăng nhập đúng A trong workflow và đăng nhập đúng B bằng request chính.",
      "Kiểm tra lỗi của tài khoản này không làm tăng counter hoặc khóa tài khoản kia.",
    ],
    workflow: [
      workflowRegistration("{{extensionEmail4A}}"),
      workflowRegistration("{{extensionEmail4B}}"),
      workflowWrongLogin("A sai lần 1", "{{extensionEmail4A}}"),
      workflowWrongLogin("B sai lần 1", "{{extensionEmail4B}}"),
      workflowWrongLogin("A sai lần 2", "{{extensionEmail4A}}"),
      workflowWrongLogin("B sai lần 2", "{{extensionEmail4B}}"),
      workflowValidLogin("A đăng nhập đúng", "{{extensionEmail4A}}"),
    ],
    body: { email: "{{extensionEmail4B}}", password: "{{extensionPassword}}" },
    status: [200],
    bodyAssertions: [{ path: "token", operator: "exists" }, { path: "user", operator: "exists" }],
    notes: ["Mỗi tài khoản phải có state machine và login_attempts độc lập."],
  }),
  extensionTc(5, "Response không để lộ tài khoản tồn tại qua thông báo hoặc timing", {
    testType: "Security",
    technique: "Differential Testing",
    coverage: ["security", "state-transition"],
    testData: { registeredEmail: "{{extensionEmail5}}", unknownEmail: "{{extensionUnknownEmail}}", invalidPassword: "{{invalidPassword}}" },
    preconditions: ["SUT khả dụng; workflow tạo một tài khoản riêng và có một email chắc chắn chưa đăng ký."],
    steps: [
      "Tạo tài khoản riêng.",
      "Gửi login với email đã đăng ký và password sai.",
      "Gửi request chính với email chưa đăng ký và cùng password sai.",
      "So sánh status, Content-Type, trường error và thời gian phản hồi của hai response.",
    ],
    workflow: [
      workflowRegistration("{{extensionEmail5}}"),
      workflowWrongLogin("Email tồn tại + password sai", "{{extensionEmail5}}"),
    ],
    differential: { workflowStepIndex: 1, sameStatus: true, sameContentType: true, sameError: true, maxTimingDeltaMs: 1000 },
    body: { email: "{{extensionUnknownEmail}}", password: "{{invalidPassword}}" },
    status: rejectedInputStatuses,
    bodyAssertions: rejectAssertions,
    notes: ["Hai response không được cung cấp tín hiệu ổn định cho user enumeration; timing threshold 1000 ms dùng như heuristic trong môi trường local."],
  }),
);

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
    { key: "extensionPassword", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail1", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail2Pre", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail2Threshold", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail3", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail4A", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail4B", value: "<set-at-runtime>", enabled: true },
    { key: "extensionEmail5", value: "<set-at-runtime>", enabled: true },
    { key: "extensionUnknownEmail", value: "<set-at-runtime>", enabled: true },
  ],
  _postman_variable_scope: "environment",
  _postman_exported_using: "Codex api-testing skill",
}, null, 2) + "\n");

console.log(`Wrote ${cases.length} cases to ${path.join(outDir, "suite.manifest.json")}`);
