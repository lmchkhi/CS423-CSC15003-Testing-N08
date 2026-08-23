import fs from "node:fs";
import path from "node:path";

const outDir = path.dirname(new URL(import.meta.url).pathname);
const validBody = {
  name: "Sản phẩm kiểm thử 23127062",
  price: 123456,
  description: "Dữ liệu kiểm thử PUT product",
  imageUrl: "https://example.test/product.png",
  category_id: 1,
};
const originalBody = {
  name: "iPhone 15 Pro Max",
  price: 30000000,
  description: "Điện thoại cao cấp của Apple",
  imageUrl: "https://placehold.co/300x300/png?text=iPhone+15",
  category_id: 1,
};

const cases = [];
function add({ title, requirements = ["FR-12", "FR-15"], testType = "Functional", technique = "Equivalence Partitioning", coverage = ["domain-partition"], audit = "VALID", auditReason = "Oracle được xác định trực tiếp từ FR-12/FR-15.", preconditions, requestPath = "/api/products/1", headers = { "Content-Type": "application/json" }, body = validBody, includeBody = true, auth = "admin", token, expected, workflow, steps, testData }) {
  const id = `TC-PRODUCT-UPDATE-${String(cases.length + 1).padStart(3, "0")}`;
  const request = { path: requestPath, query: {}, headers, auth };
  if (includeBody) request.body = body;
  if (token !== undefined) request.token = token;
  cases.push({
    id,
    title,
    requirementIds: requirements,
    testType,
    technique,
    coverage,
    source: "ai-generated",
    agentAudit: { status: audit, reason: auditReason },
    humanReview: { status: "PENDING", reason: "" },
    preconditions: preconditions || ["Backend khả dụng.", "Sản phẩm ID 1 và danh mục ID 1 tồn tại.", auth === "admin" ? "adminToken hợp lệ đã được cấu hình." : "Dữ liệu xác thực đúng theo test case đã được cấu hình."],
    testData: testData || { id: requestPath.split("/").at(-1), auth, body: includeBody ? body : "<omitted>" },
    steps: steps || ["Gửi PUT /api/products/:id với path, header, quyền và body đã nêu.", "Kiểm tra HTTP status, Content-Type và response body theo oracle."],
    request,
    expected: expected || errorExpected(),
    ...(workflow ? { workflow } : {}),
    status: "Not Run",
    relatedBugs: [],
  });
  return id;
}

function errorExpected(status = [400, 422]) {
  return {
    status,
    contentType: "application/json",
    schema: { type: "object", required: ["error"], properties: { error: { type: "string" } } },
    bodyAssertions: [{ path: "error", operator: "type", value: "string" }],
    maxResponseTimeMs: 2000,
  };
}
function successExpected(assertions = []) {
  return { status: [200, 204], bodyAssertions: assertions, maxResponseTimeMs: 2000, notes: ["Đặc tả không chốt chính xác 200 hay 204 và schema response thành công."] };
}
function bodyWith(overrides, omit = []) {
  const result = { ...validBody, ...overrides };
  for (const key of omit) delete result[key];
  return result;
}
function workflowRequest(method, requestPath, body, expected, headers = { "Content-Type": "application/json" }) {
  const request = { method, path: requestPath, headers };
  if (body !== undefined) request.body = body;
  return { request, expected };
}

// Authentication and authorization partitions.
add({ title: "Admin cập nhật sản phẩm hợp lệ", coverage: ["domain-partition", "security"], audit: "INCOMPLETE", auditReason: "FR-12/FR-15 xác định quyền và hiệu ứng cập nhật nhưng không chốt status/schema response thành công.", expected: successExpected() });
add({ title: "Từ chối request thiếu Authorization", testType: "Security", technique: "Negative Testing", coverage: ["security"], auth: "missing", expected: errorExpected([401]) });
add({ title: "Từ chối JWT không hợp lệ", testType: "Security", technique: "Negative Testing", coverage: ["security"], auth: "invalid", expected: errorExpected([403]) });
add({ title: "Từ chối token của user thường", testType: "Security", technique: "Authorization Testing", coverage: ["security"], auth: "user", expected: errorExpected([403]) });
add({ title: "Từ chối Bearer token rỗng", testType: "Security", technique: "Negative Testing", coverage: ["security"], auth: "custom", token: "", expected: errorExpected([401, 403]) });

// Path parameter partitions.
add({ title: "Từ chối ID bằng 0", requestPath: "/api/products/0", technique: "Boundary Value Analysis", expected: errorExpected([400, 404, 422]) });
add({ title: "Từ chối ID âm", requestPath: "/api/products/-1", technique: "Boundary Value Analysis", expected: errorExpected([400, 404, 422]) });
add({ title: "Báo không tìm thấy ID số dương không tồn tại", requestPath: "/api/products/999999", technique: "Negative Testing", expected: errorExpected([404]) });
add({ title: "Từ chối ID thập phân", requestPath: "/api/products/1.5", technique: "Type Confusion", expected: errorExpected([400, 404, 422]) });
add({ title: "Từ chối ID chữ", requestPath: "/api/products/abc", technique: "Type Confusion", expected: errorExpected([400, 404, 422]) });
add({ title: "Chống SQL injection qua ID", requirements: ["FR-15", "SEC-05"], testType: "Security", technique: "Injection Testing", coverage: ["security", "domain-partition"], requestPath: "/api/products/1%20OR%201%3D1", expected: errorExpected([400, 404, 422]) });

// Name partitions.
add({ title: "Chấp nhận tên một ký tự", technique: "Boundary Value Analysis", body: bodyWith({ name: "A" }), audit: "INCOMPLETE", auditReason: "FR-15 cho phép tên không rỗng tối đa 255 ký tự nhưng không chốt response thành công.", expected: successExpected() });
add({ title: "Chấp nhận tên Unicode tiếng Việt", body: bodyWith({ name: "Điện thoại kiểm thử 🧪" }), audit: "INCOMPLETE", auditReason: "Tên hợp lệ theo FR-15; response thành công chưa được đặc tả chi tiết.", expected: successExpected() });
add({ title: "Chấp nhận tên đúng 255 ký tự", technique: "Boundary Value Analysis", body: bodyWith({ name: "A".repeat(255) }), audit: "INCOMPLETE", auditReason: "Biên 255 hợp lệ theo FR-15; response thành công chưa được đặc tả chi tiết.", expected: successExpected() });
add({ title: "Từ chối tên dài 256 ký tự", technique: "Boundary Value Analysis", body: bodyWith({ name: "A".repeat(256) }) });
add({ title: "Từ chối body thiếu name", technique: "Negative Testing", body: bodyWith({}, ["name"]) });
add({ title: "Từ chối name null", technique: "Null Testing", body: bodyWith({ name: null }) });
add({ title: "Từ chối name rỗng", technique: "Equivalence Partitioning", body: bodyWith({ name: "" }) });
add({ title: "Từ chối name chỉ có khoảng trắng", technique: "Equivalence Partitioning", body: bodyWith({ name: "   " }) });
add({ title: "Từ chối name kiểu array", technique: "Type Confusion", body: bodyWith({ name: ["Sai kiểu"] }) });
add({ title: "Từ chối name kiểu object", technique: "Type Confusion", body: bodyWith({ name: { value: "Sai kiểu" } }) });

// Price partitions.
add({ title: "Chấp nhận price dương nhỏ", technique: "Boundary Value Analysis", body: bodyWith({ price: 0.01 }), audit: "INCOMPLETE", auditReason: "FR-15 chỉ quy định price là số dương; response thành công chưa được chốt.", expected: successExpected() });
add({ title: "Từ chối body thiếu price", technique: "Negative Testing", body: bodyWith({}, ["price"]) });
add({ title: "Từ chối price null", technique: "Null Testing", body: bodyWith({ price: null }) });
add({ title: "Từ chối price bằng 0", technique: "Boundary Value Analysis", body: bodyWith({ price: 0 }) });
add({ title: "Từ chối price âm", technique: "Boundary Value Analysis", body: bodyWith({ price: -1 }) });
add({ title: "Từ chối price là numeric string", technique: "Type Confusion", body: bodyWith({ price: "100000" }) });
add({ title: "Từ chối price kiểu array", technique: "Type Confusion", body: bodyWith({ price: [100000] }) });
add({ title: "Từ chối price kiểu boolean", technique: "Type Confusion", body: bodyWith({ price: true }) });

// Category partitions.
add({ title: "Từ chối body thiếu category_id", technique: "Negative Testing", body: bodyWith({}, ["category_id"]) });
add({ title: "Từ chối category_id null", technique: "Null Testing", body: bodyWith({ category_id: null }) });
add({ title: "Từ chối category_id không tồn tại", technique: "Referential Integrity", body: bodyWith({ category_id: 999999 }) });
add({ title: "Từ chối category_id bằng 0", technique: "Boundary Value Analysis", body: bodyWith({ category_id: 0 }) });
add({ title: "Từ chối category_id kiểu string", technique: "Type Confusion", body: bodyWith({ category_id: "1" }) });
add({ title: "Từ chối category_id kiểu array", technique: "Type Confusion", body: bodyWith({ category_id: [1] }) });

// Body, media type, mass assignment, state and schema.
add({ title: "Từ chối request không có body", technique: "Negative Testing", includeBody: false });
add({ title: "Từ chối Content-Type text/plain", testType: "Contract", technique: "Content-Type Confusion", coverage: ["security", "schema-validation"], headers: { "Content-Type": "text/plain" }, expected: errorExpected([400, 415, 422]) });
add({ title: "Bỏ qua unknown field role, không mass assignment", requirements: ["FR-12", "FR-15", "SEC-03"], testType: "Security", technique: "Mass Assignment", coverage: ["security", "state-transition"], body: bodyWith({ role: "admin" }), audit: "INCOMPLETE", auditReason: "Unknown field phải không ảnh hưởng resource; response thành công chưa được chốt.", expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", bodyWith({ role: "admin" }), { status: [200, 204] }),
  workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "role", operator: "absent" }, { path: "name", operator: "equals", value: validBody.name }] }, {}),
] });
add({ title: "Cập nhật được lưu và đọc lại đúng", testType: "State", technique: "State Transition", coverage: ["state-transition", "schema-validation"], audit: "INCOMPLETE", auditReason: "Hiệu ứng cập nhật được FR-15 quy định; status/schema response thành công chưa được chốt.", body: originalBody, expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", validBody, { status: [200, 204] }),
  workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: validBody.name }, { path: "price", operator: "equals", value: validBody.price }, { path: "category_id", operator: "equals", value: 1 }] }, {}),
] });
add({ title: "Cập nhật một sản phẩm không làm đổi sản phẩm khác", testType: "State", technique: "State Transition", coverage: ["state-transition"], audit: "INCOMPLETE", auditReason: "FR-15 xác định invariant nhưng response thành công chưa được chốt.", body: originalBody, expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", validBody, { status: [200, 204] }),
  workflowRequest("GET", "/api/products/2", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: "Samsung Galaxy S24 Ultra" }, { path: "category_id", operator: "equals", value: 1 }] }, {}),
] });
add({ title: "Lặp lại cùng một update giữ trạng thái ổn định", testType: "State", technique: "Idempotency Testing", coverage: ["state-transition"], audit: "INCOMPLETE", auditReason: "PUT kỳ vọng idempotent và FR-15 yêu cầu trạng thái mục tiêu; response chi tiết chưa được chốt.", body: originalBody, expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", validBody, { status: [200, 204] }),
  workflowRequest("PUT", "/api/products/1", validBody, { status: [200, 204] }),
  workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: validBody.name }, { path: "price", operator: "equals", value: validBody.price }] }, {}),
] });
add({ title: "Response thành công có JSON schema ổn định", testType: "Contract", technique: "Schema Validation", coverage: ["schema-validation"], audit: "INCOMPLETE", auditReason: "API specification không mô tả schema response của PUT product; oracle này là đề xuất cần human review.", expected: { status: [200], contentType: "application/json", schema: { type: "object", required: ["message"], properties: { message: { type: "string" } }, additionalProperties: true }, bodyAssertions: [{ path: "message", operator: "type", value: "string" }], maxResponseTimeMs: 2000 } });
add({ title: "Từ chối body top-level array", testType: "Contract", technique: "Schema Validation", coverage: ["schema-validation", "domain-partition"], body: [validBody] });
add({ title: "Từ chối body top-level string", testType: "Contract", technique: "Schema Validation", coverage: ["schema-validation", "domain-partition"], body: "invalid-body" });
add({ title: "Từ chối kết hợp nhiều trường bắt buộc không hợp lệ", technique: "Pairwise Testing", body: { name: "", price: 0, description: null, imageUrl: null, category_id: 999999 } });
add({ title: "Chống payload SQLi trong name mà không tác động sản phẩm khác", requirements: ["FR-15", "SEC-05"], testType: "Security", technique: "Injection Testing", coverage: ["security", "state-transition"], body: originalBody, audit: "INCOMPLETE", auditReason: "Parameterized query theo SEC-05 phải cô lập payload; response thành công chưa được chốt.", expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", bodyWith({ name: "x', price=1 WHERE 1=1 --" }), { status: [200, 204] }),
  workflowRequest("GET", "/api/products/2", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: "Samsung Galaxy S24 Ultra" }] }, {}),
] });

const suite = {
  suite: {
    name: "Product Update API - HW06",
    module: "PRODUCT-UPDATE",
    endpoint: "PUT /api/products/:id",
    method: "PUT",
    path: "/api/products/:id",
    baseUrl: "http://localhost:3000",
    studentId: "23127062",
    stateTransitionApplicable: true,
  },
  cases,
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "suite.manifest.json"), JSON.stringify(suite, null, 2) + "\n");
console.log(`Wrote ${cases.length} AI-generated cases.`);
