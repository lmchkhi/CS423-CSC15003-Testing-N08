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
function add({ id: explicitId, title, requirements = ["FR-12", "FR-15"], testType = "Functional", technique = "Equivalence Partitioning", coverage = ["domain-partition"], source = "ai-generated", audit = "VALID", auditReason = "Oracle được xác định trực tiếp từ FR-12/FR-15.", preconditions, requestPath = "/api/products/1", headers = { "Content-Type": "application/json" }, body = validBody, includeBody = true, auth = "admin", token, expected, workflow, steps, testData }) {
  const id = explicitId || `TC-PRODUCT-UPDATE-${String(cases.length + 1).padStart(3, "0")}`;
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
    source,
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
function workflowRequest(method, requestPath, body, expected, headers) {
  const effectiveHeaders = headers || (method === "PUT"
    ? { "Content-Type": "application/json", Authorization: "Bearer {{adminToken}}" }
    : {});
  const request = { method, path: requestPath, headers: effectiveHeaders };
  if (body !== undefined) request.body = body;
  return { request, expected };
}

// Authentication and authorization partitions.
add({ title: "Admin cập nhật sản phẩm hợp lệ", coverage: ["domain-partition", "security"], audit: "INCOMPLETE", auditReason: "FR-12/FR-15 xác định quyền và hiệu ứng cập nhật nhưng không chốt status/schema response thành công.", expected: successExpected() });
add({ title: "Từ chối request thiếu Authorization", testType: "Security", technique: "Negative Testing", coverage: ["security"], auth: "missing", expected: errorExpected([401, 403]) });
add({ title: "Từ chối JWT không hợp lệ", testType: "Security", technique: "Negative Testing", coverage: ["security"], auth: "invalid", expected: errorExpected([401, 403]) });
add({ title: "Từ chối token của user thường", testType: "Security", technique: "Authorization Testing", coverage: ["security"], auth: "user", expected: errorExpected([401, 403]) });
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
add({ title: "Từ chối name chỉ có khoảng trắng", technique: "Equivalence Partitioning", body: bodyWith({ name: "   " }), audit: "INCOMPLETE", auditReason: "FR-15 yêu cầu name bắt buộc nhưng chưa quy định trimming hoặc whitespace-only; cần làm rõ oracle." });
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
add({ title: "Bỏ qua unknown field role, không làm thay đổi resource schema", requirements: ["FR-15"], testType: "Contract", technique: "Robustness Testing", coverage: ["schema-validation", "state-transition"], body: bodyWith({ role: "admin" }), audit: "INCOMPLETE", auditReason: "SEC-03 kiểm role trong JWT, không áp dụng cho field role trong product body; giữ case như robustness/schema check.", expected: successExpected(), workflow: [
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
add({ title: "Cập nhật description và imageUrl rồi đọc lại đúng", testType: "State", technique: "State Transition", coverage: ["state-transition", "schema-validation"], audit: "INCOMPLETE", auditReason: "Bỏ oracle tự suy diễn field message; đặc tả cho phép description/imageUrl nhưng chưa chốt status/schema response PUT.", body: originalBody, expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", validBody, { status: [200, 204] }),
  workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "description", operator: "equals", value: validBody.description }, { path: "imageUrl", operator: "equals", value: validBody.imageUrl }] }),
] });
add({ title: "Từ chối body top-level array", testType: "Contract", technique: "Schema Validation", coverage: ["schema-validation", "domain-partition"], body: [validBody] });
add({ title: "Từ chối body top-level string", testType: "Contract", technique: "Schema Validation", coverage: ["schema-validation", "domain-partition"], body: "invalid-body" });
add({ title: "Từ chối kết hợp nhiều trường bắt buộc không hợp lệ", technique: "Pairwise Testing", body: { name: "", price: 0, description: null, imageUrl: null, category_id: 999999 } });
add({ title: "Chống payload SQLi trong name mà không tác động sản phẩm khác", requirements: ["FR-15", "SEC-05"], testType: "Security", technique: "Injection Testing", coverage: ["security", "state-transition"], body: originalBody, audit: "INCOMPLETE", auditReason: "Parameterized query theo SEC-05 phải cô lập payload; response thành công chưa được chốt.", expected: successExpected(), workflow: [
  workflowRequest("PUT", "/api/products/1", bodyWith({ name: "x', price=1 WHERE 1=1 --" }), { status: [200, 204] }),
  workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: "x', price=1 WHERE 1=1 --" }] }),
  workflowRequest("GET", "/api/products/2", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: "Samsung Galaxy S24 Ultra" }] }, {}),
] });

// Post-audit extension cases. These remain machine-readable suite metadata and do not alter Human review.
add({
  id: "TC-PRODUCT-UPDATE-EXT-001",
  title: "Update price không hợp lệ phải atomic và giữ nguyên sản phẩm",
  testType: "State",
  technique: "State Transition",
  coverage: ["state-transition", "domain-partition"],
  expected: successExpected(),
  body: originalBody,
  preconditions: ["Backend khả dụng.", "Sản phẩm ID 1 và danh mục ID 1 tồn tại.", "adminToken hợp lệ đã được cấu hình."],
  steps: ["Khôi phục sản phẩm ID 1 về baseline.", "Gửi update với price = 0.", "Đọc lại và xác nhận toàn bộ trường vẫn giữ baseline.", "Gửi request chính để cleanup trạng thái."],
  workflow: [
    workflowRequest("PUT", "/api/products/1", originalBody, { status: [200, 204] }),
    workflowRequest("PUT", "/api/products/1", bodyWith({ price: 0 }), { status: [400, 422] }),
    workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: originalBody.name }, { path: "price", operator: "equals", value: originalBody.price }, { path: "category_id", operator: "equals", value: originalBody.category_id }] }),
  ],
});
add({
  id: "TC-PRODUCT-UPDATE-EXT-002",
  title: "User thường bị từ chối và không làm thay đổi sản phẩm",
  requirements: ["FR-12", "FR-15", "SEC-02", "SEC-03"],
  testType: "Security",
  technique: "Authorization State Transition",
  coverage: ["security", "state-transition"],
  expected: successExpected(),
  body: originalBody,
  steps: ["Khôi phục sản phẩm ID 1 về baseline bằng admin.", "Dùng userToken gửi payload thay đổi toàn bộ trường.", "Đọc lại và xác nhận sản phẩm không đổi.", "Gửi request chính để cleanup trạng thái."],
  workflow: [
    workflowRequest("PUT", "/api/products/1", originalBody, { status: [200, 204] }),
    workflowRequest("PUT", "/api/products/1", bodyWith({ name: "Unauthorized mutation", price: 1 }), { status: [401, 403] }, { "Content-Type": "application/json", Authorization: "Bearer {{userToken}}" }),
    workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: originalBody.name }, { path: "price", operator: "equals", value: originalBody.price }] }),
  ],
});
add({
  id: "TC-PRODUCT-UPDATE-EXT-003",
  title: "Thiếu category_id không được cập nhật một phần",
  testType: "State",
  technique: "Atomicity Testing",
  coverage: ["state-transition", "domain-partition"],
  expected: successExpected(),
  body: originalBody,
  steps: ["Khôi phục sản phẩm ID 1 về baseline.", "Gửi update đổi name/price nhưng thiếu category_id.", "Đọc lại và xác nhận không có partial update.", "Gửi request chính để cleanup trạng thái."],
  workflow: [
    workflowRequest("PUT", "/api/products/1", originalBody, { status: [200, 204] }),
    workflowRequest("PUT", "/api/products/1", bodyWith({ name: "Partial mutation", price: 1 }, ["category_id"]), { status: [400, 422] }),
    workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: originalBody.name }, { path: "price", operator: "equals", value: originalBody.price }, { path: "category_id", operator: "equals", value: originalBody.category_id }] }),
  ],
});
add({
  id: "TC-PRODUCT-UPDATE-EXT-004",
  title: "Tên Unicode đúng biên 255 ký tự được lưu nguyên vẹn",
  testType: "State",
  technique: "Boundary Value Analysis",
  coverage: ["domain-partition", "state-transition", "schema-validation"],
  audit: "INCOMPLETE",
  auditReason: "FR-15 quy định tối đa 255 ký tự nhưng không nói rõ character hay byte length; case kiểm Unicode boundary và cần đối chiếu contract.",
  expected: successExpected(),
  body: originalBody,
  steps: ["Gửi update có name gồm 255 ký tự Unicode.", "Đọc lại và xác nhận tên được lưu nguyên vẹn.", "Gửi request chính để cleanup trạng thái."],
  workflow: [
    workflowRequest("PUT", "/api/products/1", bodyWith({ name: "ộ".repeat(255) }), { status: [200, 204] }),
    workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: "ộ".repeat(255) }] }),
  ],
});
add({
  id: "TC-PRODUCT-UPDATE-EXT-005",
  title: "Content-Type sai bị từ chối mà không làm thay đổi state",
  testType: "Contract",
  technique: "Content-Type Atomicity Testing",
  coverage: ["security", "state-transition", "schema-validation"],
  expected: successExpected(),
  body: originalBody,
  steps: ["Khôi phục sản phẩm ID 1 về baseline.", "Gửi JSON-looking payload với Content-Type text/plain.", "Đọc lại và xác nhận sản phẩm không đổi.", "Gửi request chính để cleanup trạng thái."],
  workflow: [
    workflowRequest("PUT", "/api/products/1", originalBody, { status: [200, 204] }),
    workflowRequest("PUT", "/api/products/1", bodyWith({ name: "Content-Type mutation", price: 1 }), { status: [400, 415, 422] }, { "Content-Type": "text/plain", Authorization: "Bearer {{adminToken}}" }),
    workflowRequest("GET", "/api/products/1", undefined, { status: [200], bodyAssertions: [{ path: "name", operator: "equals", value: originalBody.name }, { path: "price", operator: "equals", value: originalBody.price }] }),
  ],
});

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
console.log(`Wrote ${cases.length} cases.`);
