import fs from "node:fs";

const jsonHeaders = { "Content-Type": "application/json" };
const accepted = [200, 201];
const rejected = [400, 422];

function audit(status, reason) {
  return { status, reason };
}

function makeCase(number, title, options = {}) {
  const id = `TC-CART-${String(number).padStart(3, "0")}`;
  const request = {
    path: "/api/cart",
    query: options.query || {},
    headers: options.headers === undefined ? jsonHeaders : options.headers,
    auth: options.auth || "user",
  };
  if (Object.prototype.hasOwnProperty.call(options, "body")) request.body = options.body;
  if (options.token !== undefined) request.token = options.token;

  return {
    id,
    title,
    requirementIds: options.requirementIds || ["FR-07"],
    testType: options.testType || "Functional",
    technique: options.technique || "Equivalence Partitioning",
    coverage: options.coverage || ["domain-partition"],
    source: "ai-generated",
    agentAudit: options.agentAudit || audit("VALID", "Case bám trực tiếp body contract và quy tắc giỏ hàng được tài liệu mô tả."),
    humanReview: { status: "PENDING", reason: "" },
    preconditions: options.preconditions || ["Backend khả dụng và userToken hợp lệ đã được cấu hình."],
    testData: options.testData || (Object.prototype.hasOwnProperty.call(options, "body") ? options.body : { body: "(không gửi)" }),
    steps: options.steps || ["Gửi POST /api/cart với header và body đã nêu.", "Đối chiếu HTTP response với oracle."],
    request,
    expected: {
      status: options.status || accepted,
      contentType: options.contentType === undefined ? "application/json" : options.contentType,
      ...(options.schema ? { schema: options.schema } : {}),
      bodyAssertions: options.bodyAssertions || [],
      maxResponseTimeMs: options.maxResponseTimeMs || 2000,
    },
    ...(options.workflow ? { workflow: options.workflow } : {}),
    status: "Not Run",
    relatedBugs: [],
  };
}

function invalidCase(number, title, body, reason, extra = {}) {
  return makeCase(number, title, {
    body,
    status: rejected,
    coverage: ["domain-partition", "schema-validation", ...(extra.coverage || [])],
    testType: extra.testType || "Contract",
    technique: extra.technique || "Negative Testing / Equivalence Partitioning",
    agentAudit: audit("INCOMPLETE", `${reason} Đặc tả chưa chốt exact error status/schema; dùng oracle bảo thủ HTTP 400/422 và JSON an toàn.`),
    bodyAssertions: [
      { path: "message", operator: "absent" },
      ...(extra.bodyAssertions || []),
    ],
    ...extra,
  });
}

const workflowAuth = (tokenName) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer {{${tokenName}}}`,
});

const cases = [
  makeCase(1, "Cô lập giỏ hàng giữa hai tài khoản", {
    requirementIds: ["FR-07", "SEC-02"],
    testType: "Security",
    technique: "State Transition / Authorization Isolation",
    coverage: ["state-transition", "security", "schema-validation"],
    body: { id: 990001, name: "Sản phẩm user", price: 100000, quantity: 1 },
    preconditions: ["Backend vừa khởi động nên giỏ của user và admin đều rỗng.", "userToken và adminToken hợp lệ đã được cấu hình."],
    steps: ["Thêm sản phẩm vào giỏ admin qua workflow.", "Đọc giỏ user và xác nhận vẫn rỗng.", "Gửi request chính để thêm một sản phẩm vào giỏ user."],
    workflow: [
      {
        name: "Thêm sản phẩm vào giỏ admin",
        request: { method: "POST", path: "/api/cart", headers: workflowAuth("adminToken"), body: { id: 990002, name: "Sản phẩm admin", price: 200000, quantity: 1 } },
        expected: { status: accepted, bodyAssertions: [] },
      },
      {
        name: "Đọc giỏ user chưa có dữ liệu",
        request: { method: "GET", path: "/api/cart", headers: { Authorization: "Bearer {{userToken}}" } },
        expected: { status: [200], bodyAssertions: [{ path: "", operator: "arrayLength", value: 0 }] },
      },
    ],
  }),
  makeCase(2, "Thêm lại cùng sản phẩm phải cộng số lượng", {
    requirementIds: ["FR-07"],
    testType: "State",
    technique: "State Transition",
    coverage: ["state-transition", "schema-validation"],
    body: { id: 990004, name: "Sản phẩm sau kiểm tra", price: 120000, quantity: 1 },
    preconditions: ["Giỏ user có đúng một dòng id 990001 từ TC-CART-001.", "userToken hợp lệ đã được cấu hình."],
    steps: ["Thêm id 990003 với quantity 1.", "Thêm lại id 990003 với quantity 2.", "GET /api/cart và xác nhận chỉ có một dòng id 990003 với quantity 3.", "Gửi request chính để hoàn tất iteration."],
    workflow: [
      {
        name: "Thêm sản phẩm lần đầu",
        request: { method: "POST", path: "/api/cart", headers: workflowAuth("userToken"), body: { id: 990003, name: "Sản phẩm lặp", price: 50000, quantity: 1 } },
        expected: { status: accepted, bodyAssertions: [] },
      },
      {
        name: "Thêm lại cùng sản phẩm",
        request: { method: "POST", path: "/api/cart", headers: workflowAuth("userToken"), body: { id: 990003, name: "Sản phẩm lặp", price: 50000, quantity: 2 } },
        expected: { status: accepted, bodyAssertions: [] },
      },
      {
        name: "Đọc trạng thái giỏ sau hai lần thêm",
        request: { method: "GET", path: "/api/cart", headers: { Authorization: "Bearer {{userToken}}" } },
        expected: { status: [200], bodyAssertions: [
          { path: "", operator: "arrayLength", value: 2 },
          { path: "1.id", operator: "equals", value: 990003 },
          { path: "1.quantity", operator: "equals", value: 3 },
        ] },
      },
    ],
  }),
  makeCase(3, "Thêm sản phẩm hợp lệ với quantity bằng 1", { body: { id: 1, name: "Sản phẩm A", price: 100000, quantity: 1 }, coverage: ["domain-partition", "schema-validation"], agentAudit: audit("INCOMPLETE", "Payload đúng ví dụ và biên quantity tối thiểu; đặc tả không chốt exact success status/body nên chấp nhận 200/201 JSON.") }),
  makeCase(4, "Thêm sản phẩm hợp lệ với quantity lớn hơn 1", { body: { id: 2, name: "Sản phẩm B", price: 250000, quantity: 2 }, agentAudit: audit("INCOMPLETE", "Valid partition rõ ràng nhưng exact success contract không được tài liệu quy định.") }),
  makeCase(5, "Tên sản phẩm Unicode hợp lệ", { body: { id: 3, name: "Cà phê sữa đá ☕", price: 45000, quantity: 1 }, agentAudit: audit("INCOMPLETE", "Unicode là domain partition hữu ích; tài liệu không chốt normalization và exact success response.") }),
  makeCase(6, "Giá sản phẩm có phần thập phân dương", { body: { id: 4, name: "Sản phẩm giá lẻ", price: 99999.5, quantity: 1 }, agentAudit: audit("INCOMPLETE", "Đặc tả chỉ minh họa price dạng number, chưa quy định có cho phép phần thập phân hay không.") }),
  makeCase(7, "Giá trị số lớn nhưng an toàn", { body: { id: 2147483647, name: "Sản phẩm giá trị lớn", price: 9007199254740, quantity: 1000 }, agentAudit: audit("INCOMPLETE", "Không có upper bound cho id, price hoặc quantity; case chỉ kiểm robustness với số JSON an toàn.") }),
  makeCase(8, "Field thừa không được làm thay đổi quyền sở hữu giỏ", {
    requirementIds: ["FR-07", "SEC-02"],
    testType: "Security",
    technique: "Mass Assignment",
    coverage: ["domain-partition", "security"],
    body: { id: 5, name: "Sản phẩm có field thừa", price: 100000, quantity: 1, user_id: 1, role: "admin" },
    agentAudit: audit("VALID", "Kiểm tra mass assignment: identity phải lấy từ JWT, không từ user_id/role trong body."),
  }),
  invalidCase(9, "Thiếu id", { name: "Thiếu id", price: 100000, quantity: 1 }, "Body example xác định id là thành phần của cart item."),
  invalidCase(10, "id bằng null", { id: null, name: "Null id", price: 100000, quantity: 1 }, "null không đại diện được product identity hợp lệ."),
  invalidCase(11, "id là chuỗi rỗng", { id: "", name: "Empty id", price: 100000, quantity: 1 }, "Chuỗi rỗng không đại diện được product identity hợp lệ."),
  invalidCase(12, "id sai kiểu string", { id: "1", name: "String id", price: 100000, quantity: 1 }, "API example dùng id kiểu number nhưng không có schema chính thức."),
  invalidCase(13, "id sai kiểu object", { id: { value: 1 }, name: "Object id", price: 100000, quantity: 1 }, "Object là type-confusion partition không phù hợp product identity."),
  invalidCase(14, "Thiếu name", { id: 10, price: 100000, quantity: 1 }, "Body example xác định name là thành phần của cart item."),
  invalidCase(15, "name bằng null", { id: 11, name: null, price: 100000, quantity: 1 }, "null không phải tên hiển thị hợp lệ."),
  invalidCase(16, "name là chuỗi rỗng", { id: 12, name: "", price: 100000, quantity: 1 }, "Tên rỗng không thể đáp ứng thông tin sản phẩm trong giỏ."),
  invalidCase(17, "name chỉ chứa whitespace", { id: 13, name: "   ", price: 100000, quantity: 1 }, "Đặc tả không chốt trimming nhưng whitespace-only tương đương tên rỗng về mặt hiển thị."),
  invalidCase(18, "name sai kiểu number", { id: 14, name: 12345, price: 100000, quantity: 1 }, "Name trong body example là string."),
  invalidCase(19, "Thiếu price", { id: 15, name: "Thiếu giá", quantity: 1 }, "Body example xác định price là thành phần cart item."),
  invalidCase(20, "price bằng null", { id: 16, name: "Null price", price: null, quantity: 1 }, "null không thể dùng tính thành tiền."),
  invalidCase(21, "price bằng 0", { id: 17, name: "Zero price", price: 0, quantity: 1 }, "Giá sản phẩm phải dương theo ràng buộc sản phẩm FR-15.", { requirementIds: ["FR-07", "FR-15"] }),
  invalidCase(22, "price âm", { id: 18, name: "Negative price", price: -1, quantity: 1 }, "Giá sản phẩm phải dương theo FR-15 và giá âm phá vỡ invariant tổng tiền.", { requirementIds: ["FR-07", "FR-15"], coverage: ["security"] }),
  invalidCase(23, "price sai kiểu string", { id: 19, name: "String price", price: "100000", quantity: 1 }, "Body example và FR-15 yêu cầu price là number.", { requirementIds: ["FR-07", "FR-15"] }),
  invalidCase(24, "price sai kiểu object", { id: 20, name: "Object price", price: { value: 100000 }, quantity: 1 }, "Object là type confusion và không thể tính toán an toàn.", { coverage: ["security"] }),
  invalidCase(25, "Thiếu quantity", { id: 21, name: "Thiếu số lượng", price: 100000 }, "FR-06 yêu cầu quantity là số nguyên dương tối thiểu 1.", { requirementIds: ["FR-06", "FR-07"] }),
  invalidCase(26, "quantity bằng null", { id: 22, name: "Null quantity", price: 100000, quantity: null }, "FR-06 yêu cầu quantity là số nguyên dương tối thiểu 1.", { requirementIds: ["FR-06", "FR-07"] }),
  invalidCase(27, "quantity bằng 0", { id: 23, name: "Zero quantity", price: 100000, quantity: 0 }, "Vi phạm biên tối thiểu quantity = 1 của FR-06.", { requirementIds: ["FR-06", "FR-07"], technique: "Boundary Value Analysis" }),
  invalidCase(28, "quantity âm", { id: 24, name: "Negative quantity", price: 100000, quantity: -1 }, "Vi phạm điều kiện số nguyên dương của FR-06.", { requirementIds: ["FR-06", "FR-07"], coverage: ["security"], technique: "Boundary Value Analysis" }),
  invalidCase(29, "quantity là số thập phân", { id: 25, name: "Decimal quantity", price: 100000, quantity: 1.5 }, "FR-06 yêu cầu quantity là số nguyên.", { requirementIds: ["FR-06", "FR-07"], technique: "Boundary Value Analysis" }),
  invalidCase(30, "quantity sai kiểu string", { id: 26, name: "String quantity", price: 100000, quantity: "2" }, "FR-06 yêu cầu quantity là số nguyên dương.", { requirementIds: ["FR-06", "FR-07"] }),
  invalidCase(31, "quantity sai kiểu array", { id: 27, name: "Array quantity", price: 100000, quantity: [1] }, "Array là type confusion và không phải số nguyên.", { requirementIds: ["FR-06", "FR-07"], coverage: ["security"] }),
  invalidCase(32, "Body là object rỗng", {}, "Thiếu toàn bộ cart item contract."),
  invalidCase(33, "Body là array", [{ id: 28, name: "Array body", price: 100000, quantity: 1 }], "Top-level body được tài liệu mô tả là object, không phải array.", { coverage: ["security"] }),
  invalidCase(34, "Không gửi request body", undefined, "POST add-to-cart không có cart item để xử lý.", { body: undefined, testData: { body: "(không gửi)" } }),
  makeCase(35, "Từ chối request thiếu Authorization", {
    requirementIds: ["SEC-02"],
    testType: "Security",
    technique: "Negative Authentication",
    coverage: ["security", "schema-validation"],
    auth: "missing",
    body: { id: 29, name: "No auth", price: 100000, quantity: 1 },
    status: [401],
    schema: { type: "object", required: ["error"], properties: { error: { type: "string" } } },
    agentAudit: audit("INCOMPLETE", "SEC-02 bắt buộc JWT hợp lệ nhưng không chốt exact status/error schema; dùng conventional oracle 401 JSON."),
  }),
  makeCase(36, "Từ chối JWT không hợp lệ", {
    requirementIds: ["SEC-02"],
    testType: "Security",
    technique: "Negative Authentication",
    coverage: ["security", "schema-validation"],
    auth: "invalid",
    body: { id: 30, name: "Invalid token", price: 100000, quantity: 1 },
    status: [401, 403],
    schema: { type: "object", required: ["error"], properties: { error: { type: "string" } } },
    agentAudit: audit("VALID", "SEC-02 chỉ yêu cầu token hợp lệ; chấp nhận 401 hoặc 403 miễn request bị từ chối an toàn."),
  }),
  makeCase(37, "Từ chối Bearer token rỗng", {
    requirementIds: ["SEC-02"],
    testType: "Security",
    technique: "Malformed Authentication",
    coverage: ["security"],
    auth: "custom",
    token: "",
    body: { id: 31, name: "Empty token", price: 100000, quantity: 1 },
    status: [401, 403],
    agentAudit: audit("VALID", "Bearer token rỗng không phải JWT hợp lệ và phải bị từ chối theo SEC-02."),
  }),
  makeCase(38, "Admin đã xác thực có giỏ hàng riêng", {
    requirementIds: ["FR-07", "SEC-02"],
    auth: "admin",
    body: { id: 32, name: "Admin cart item", price: 100000, quantity: 1 },
    coverage: ["domain-partition", "security"],
    agentAudit: audit("INCOMPLETE", "Đặc tả yêu cầu user đã xác thực nhưng không nói rõ admin có được sử dụng cart API hay không."),
  }),
  makeCase(39, "Payload SQL injection trong name không gây lỗi server", {
    requirementIds: ["FR-07", "SEC-05"],
    testType: "Security",
    technique: "Injection",
    coverage: ["security", "domain-partition"],
    body: { id: 33, name: "x'); DROP TABLE products; --", price: 100000, quantity: 1 },
    agentAudit: audit("INCOMPLETE", "Payload non-destructive kiểm robustness/parameterization; endpoint cart dùng in-memory state nên SEC-05 chỉ áp dụng gián tiếp."),
  }),
  makeCase(40, "Payload HTML trong name không được thực thi tại API", {
    requirementIds: ["FR-07", "SEC-04"],
    testType: "Security",
    technique: "Stored XSS Probe",
    coverage: ["security", "domain-partition"],
    body: { id: 34, name: "<img src=x onerror=alert(1)>", price: 100000, quantity: 1 },
    agentAudit: audit("INCOMPLETE", "SEC-04 áp dụng tại UI boundary; API case chỉ tạo dữ liệu probe, không thể tự kết luận XSS nếu chưa render UI."),
  }),
  makeCase(41, "Từ chối Content-Type text/plain", {
    requirementIds: ["FR-07"],
    testType: "Contract",
    technique: "Content-Type Confusion",
    coverage: ["schema-validation", "security"],
    headers: { "Content-Type": "text/plain" },
    body: { id: 35, name: "Plain text", price: 100000, quantity: 1 },
    status: [400, 415, 422],
    agentAudit: audit("INCOMPLETE", "API specification yêu cầu Body JSON nhưng chưa chốt status; dùng 400/415/422 và yêu cầu JSON error an toàn."),
  }),
  makeCase(42, "Từ chối body JSON khi thiếu Content-Type", {
    requirementIds: ["FR-07"],
    testType: "Contract",
    technique: "Content-Type Confusion",
    coverage: ["schema-validation", "security"],
    headers: {},
    body: { id: 36, name: "No content type", price: 100000, quantity: 1 },
    status: [400, 415, 422],
    agentAudit: audit("INCOMPLETE", "Body JSON cần media type phù hợp nhưng exact status chưa được mô tả."),
  }),
];

const manifest = {
  suite: {
    name: "Cart API - HW06",
    module: "CART",
    endpoint: "POST /api/cart",
    method: "POST",
    path: "/api/cart",
    baseUrl: "http://localhost:3000",
    studentId: "23127062",
    stateTransitionApplicable: true,
  },
  cases,
};

fs.mkdirSync("tests/api/cart", { recursive: true });
fs.writeFileSync("tests/api/cart/suite.manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${cases.length} AI-generated cart cases.`);
