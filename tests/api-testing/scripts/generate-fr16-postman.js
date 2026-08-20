const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const outputPath = path.join(
  workspace,
  "tests",
  "api-testing",
  "collections",
  "23127464_FR16_Product_Import.postman_collection.json",
);
const csvPath = path.join(workspace, "tests", "api-testing", "data", "fr-16-exploratory.csv");

const endpoint = "/api/admin/import-products";
const jsonHeaders = [{ key: "Content-Type", value: "application/json", type: "text" }];

function runtimeMarker(suffix) {
  return `pm.environment.get("runId") + "${suffix}"`;
}

function bodyMarker(suffix) {
  return `{{runId}}${suffix}`;
}

function rawJson(value) {
  return JSON.stringify(value, null, 2).replaceAll('"__CATEGORY_ID__"', "{{categoryId}}");
}

function product(suffix, overrides = {}) {
  return {
    name: bodyMarker(suffix),
    price: 10000,
    description: `Description ${suffix}`,
    imageUrl: "https://example.test/fr16.png",
    category_id: "__CATEGORY_ID__",
    ...overrides,
  };
}

function headerAssertion(id) {
  return [
    `pm.test("${id} | X-Student-Id present", function () {`,
    `  pm.expect(pm.request.headers.get("X-Student-Id")).to.eql("23127464");`,
    `});`,
  ];
}

function verifyMarkers(id, markerExpressions, expectedPresent, extraAssertions = []) {
  const expectation = expectedPresent ? "to.include" : "not.to.include";
  return [
    `pm.sendRequest({`,
    `  url: pm.environment.get("baseUrl") + "/api/products",`,
    `  method: "GET",`,
    `  header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }]`,
    `}, function (error, response) {`,
    `  pm.test("${id} | persisted marker state", function () {`,
    `    pm.expect(error).to.eql(null);`,
    `    pm.expect(response.code).to.be.below(500);`,
    `    const products = response.json();`,
    `    pm.expect(products).to.be.an("array");`,
    `    const serialized = JSON.stringify(products);`,
    ...markerExpressions.map((expression) => `    pm.expect(serialized).${expectation}(${expression});`),
    ...extraAssertions.map((line) => `    ${line}`),
    `  });`,
    `});`,
  ];
}

function responseHasNoMarker(id, markerExpression) {
  return [
    `pm.test("${id} | rejection response has no import marker", function () {`,
    `  pm.expect(pm.response.text()).not.to.include(${markerExpression});`,
    `});`,
  ];
}

function makeItem({
  id,
  title,
  method = "POST",
  auth = "__DEFAULT_ADMIN__",
  headers = jsonHeaders,
  body,
  bodyMode = "raw",
  prerequest = [],
  tests = [],
}) {
  const requestHeaders = [...headers];
  const resolvedAuth = auth === "__DEFAULT_ADMIN__" ? "Bearer {{adminToken}}" : auth;
  if (resolvedAuth !== null) requestHeaders.unshift({ key: "Authorization", value: resolvedAuth, type: "text" });
  const request = {
    method,
    header: requestHeaders,
    url: {
      raw: `{{baseUrl}}${endpoint}`,
      host: ["{{baseUrl}}"],
      path: endpoint.split("/").filter(Boolean),
    },
    description: `Traceability: ${id}. Subject: FR-16 POST /api/admin/import-products only.`,
  };
  if (body !== undefined) {
    if (bodyMode === "raw") {
      request.body = { mode: "raw", raw: body, options: { raw: { language: headers.some((h) => h.value === "application/json") ? "json" : "text" } } };
    } else if (bodyMode === "formdata") {
      request.body = { mode: "formdata", formdata: body };
    }
  }
  const events = [];
  if (prerequest.length) events.push({ listen: "prerequest", script: { type: "text/javascript", exec: prerequest } });
  events.push({ listen: "test", script: { type: "text/javascript", exec: [...headerAssertion(id), ...tests] } });
  return { name: `${id} | ${title}`, event: events, request, response: [] };
}

const aiItems = [];

aiItems.push(makeItem({
  id: "FR16-VLD-001",
  title: "Một product JSON hợp lệ",
  body: rawJson({ products: [product("-FR16-VLD-001")] }),
  tests: verifyMarkers("FR16-VLD-001", [runtimeMarker("-FR16-VLD-001")], true),
}));

aiItems.push(makeItem({
  id: "FR16-VLD-002",
  title: "Batch ba product hợp lệ",
  body: rawJson({ products: [product("-FR16-VLD-002-A"), product("-FR16-VLD-002-B"), product("-FR16-VLD-002-C")] }),
  tests: verifyMarkers("FR16-VLD-002", [runtimeMarker("-FR16-VLD-002-A"), runtimeMarker("-FR16-VLD-002-B"), runtimeMarker("-FR16-VLD-002-C")], true),
}));

aiItems.push(makeItem({
  id: "FR16-VLD-003",
  title: "Description JSON chứa dấu phẩy",
  body: rawJson({ products: [product("-FR16-VLD-003", { description: "Mô tả có dấu phẩy, vẫn là một field" })] }),
  tests: verifyMarkers("FR16-VLD-003", [runtimeMarker("-FR16-VLD-003")], true, [
    `const row = products.find(function (item) { return item.name === ${runtimeMarker("-FR16-VLD-003")}; });`,
    `pm.expect(row.description).to.eql("Mô tả có dấu phẩy, vẫn là một field");`,
  ]),
}));

aiItems.push(makeItem({
  id: "FR16-AUTH-001",
  title: "Admin JWT hợp lệ",
  body: rawJson({ products: [product("-FR16-AUTH-001-A"), product("-FR16-AUTH-001-B")] }),
  tests: verifyMarkers("FR16-AUTH-001", [runtimeMarker("-FR16-AUTH-001-A"), runtimeMarker("-FR16-AUTH-001-B")], true),
}));

const rejectedAuthCases = [
  ["FR16-AUTH-002", "User thường có JWT hợp lệ", "Bearer {{nonAdminToken}}"],
  ["FR16-AUTH-003", "Thiếu Authorization", null],
  ["FR16-AUTH-004", "Authorization rỗng", ""],
  ["FR16-AUTH-005", "Bearer không có token", "Bearer"],
  ["FR16-AUTH-006", "Token ngẫu nhiên", "Bearer not-a-valid-jwt"],
  ["FR16-AUTH-007", "JWT hết hạn", "Bearer {{expiredToken}}"],
  ["FR16-AUTH-008", "JWT sửa signature", "Bearer {{tamperedSignatureToken}}"],
];
for (const [id, title, auth] of rejectedAuthCases) {
  const suffix = `-${id}`;
  const marker = runtimeMarker(suffix);
  aiItems.push(makeItem({
    id,
    title,
    auth,
    body: rawJson({ products: [product(suffix)] }),
    tests: [...responseHasNoMarker(id, marker), ...verifyMarkers(id, [marker], false)],
  }));
}

const emptyName = product("-FR16-NAME-001", { name: "", description: bodyMarker("-FR16-NAME-001") });
aiItems.push(makeItem({
  id: "FR16-NAME-001",
  title: "Name chuỗi rỗng",
  body: rawJson({ products: [emptyName] }),
  tests: verifyMarkers("FR16-NAME-001", [runtimeMarker("-FR16-NAME-001")], false),
}));

const missingName = product("-FR16-NAME-002", { description: bodyMarker("-FR16-NAME-002") });
delete missingName.name;
aiItems.push(makeItem({
  id: "FR16-NAME-002",
  title: "Thiếu key name",
  body: rawJson({ products: [missingName] }),
  tests: verifyMarkers("FR16-NAME-002", [runtimeMarker("-FR16-NAME-002")], false),
}));

const priceCases = [
  ["FR16-PRICE-001", "Price bằng 1", 1, true],
  ["FR16-PRICE-002", "Price bằng 0", 0, false],
  ["FR16-PRICE-003", "Price âm", -1, false],
  ["FR16-PRICE-006", "Price thập phân dương", 1.5, true],
];
for (const [id, title, price, shouldExist] of priceCases) {
  const suffix = `-${id}`;
  aiItems.push(makeItem({
    id,
    title,
    body: rawJson({ products: [product(suffix, { price })] }),
    tests: verifyMarkers(id, [runtimeMarker(suffix)], shouldExist),
  }));
}

aiItems.push(makeItem({
  id: "FR16-CAT-001",
  title: "Category ID tồn tại",
  body: rawJson({ products: [product("-FR16-CAT-001")] }),
  tests: verifyMarkers("FR16-CAT-001", [runtimeMarker("-FR16-CAT-001")], true, [
    `const row = products.find(function (item) { return item.name === ${runtimeMarker("-FR16-CAT-001")}; });`,
    `pm.expect(String(row.category_id)).to.eql(String(pm.environment.get("categoryId")));`,
  ]),
}));

const atomicCases = [
  ["FR16-ATOM-001", [product("-FR16-ATOM-001-A"), product("-FR16-ATOM-001-X", { name: "", description: bodyMarker("-FR16-ATOM-001-X") }), product("-FR16-ATOM-001-C")], ["-FR16-ATOM-001-A", "-FR16-ATOM-001-X", "-FR16-ATOM-001-C"]],
  ["FR16-ATOM-002", [product("-FR16-ATOM-002-X", { price: 0 }), product("-FR16-ATOM-002-B"), product("-FR16-ATOM-002-C")], ["-FR16-ATOM-002-X", "-FR16-ATOM-002-B", "-FR16-ATOM-002-C"]],
  ["FR16-ATOM-003", [product("-FR16-ATOM-003-A"), product("-FR16-ATOM-003-B"), product("-FR16-ATOM-003-X", { name: "", description: bodyMarker("-FR16-ATOM-003-X") })], ["-FR16-ATOM-003-A", "-FR16-ATOM-003-B", "-FR16-ATOM-003-X"]],
  ["FR16-ATOM-004", [product("-FR16-ATOM-004-A"), product("-FR16-ATOM-004-X", { price: -1 }), product("-FR16-ATOM-004-C")], ["-FR16-ATOM-004-A", "-FR16-ATOM-004-X", "-FR16-ATOM-004-C"]],
];
for (const [id, products, suffixes] of atomicCases) {
  aiItems.push(makeItem({
    id,
    title: "Mixed batch phải rollback toàn bộ",
    body: rawJson({ products }),
    tests: verifyMarkers(id, suffixes.map(runtimeMarker), false),
  }));
}

aiItems.push(makeItem({
  id: "FR16-INPUT-001",
  title: "Body rỗng",
  body: "{}",
  tests: [`pm.test("FR16-INPUT-001 | request rejected semantically", function () { pm.expect(pm.response.code).to.be.at.least(400); });`],
}));
aiItems.push(makeItem({
  id: "FR16-INPUT-002",
  title: "Thiếu products dùng items",
  body: rawJson({ items: [product("-FR16-INPUT-002")] }),
  tests: [
    `pm.test("FR16-INPUT-002 | request rejected semantically", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    ...verifyMarkers("FR16-INPUT-002", [runtimeMarker("-FR16-INPUT-002")], false),
  ],
}));
aiItems.push(makeItem({
  id: "FR16-INPUT-003",
  title: "Products array rỗng",
  body: rawJson({ products: [] }),
  tests: [`pm.test("FR16-INPUT-003 | request rejected semantically", function () { pm.expect(pm.response.code).to.be.at.least(400); });`],
}));
aiItems.push(makeItem({
  id: "FR16-INPUT-004",
  title: "Products không phải array",
  body: rawJson({ products: product("-FR16-INPUT-004") }),
  tests: [
    `pm.test("FR16-INPUT-004 | request rejected semantically", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    ...verifyMarkers("FR16-INPUT-004", [runtimeMarker("-FR16-INPUT-004")], false),
  ],
}));

const sqlPayloadName = `${bodyMarker("-FR16-SEC-001")}-x'); DROP TABLE products;--`;
aiItems.push(makeItem({
  id: "FR16-SEC-001",
  title: "SQL injection payload trong name",
  body: rawJson({ products: [product("-FR16-SEC-001", { name: sqlPayloadName })] }),
  tests: verifyMarkers("FR16-SEC-001", [`pm.environment.get("sentinelName")`], true, [
    `pm.expect(products.length).to.be.at.least(Number(pm.environment.get("baselineProductCount")));`,
  ]),
}));

aiItems.push(makeItem({
  id: "FR16-CSV-001",
  title: "Multipart CSV exploratory negative",
  headers: [],
  bodyMode: "formdata",
  body: [{ key: "file", type: "file", src: csvPath }],
  tests: [
    ...responseHasNoMarker("FR16-CSV-001", `"FR16-CSV-001-FIXED"`),
    ...verifyMarkers("FR16-CSV-001", [`"FR16-CSV-001-FIXED"`], false),
  ],
}));

aiItems.push(makeItem({
  id: "FR16-CSV-002",
  title: "Raw text/csv exploratory negative",
  headers: [{ key: "Content-Type", value: "text/csv", type: "text" }],
  body: `name,price,description,imageUrl,category_id\n${bodyMarker("-FR16-CSV-002")},10000,"raw CSV, exploratory",https://example.test/csv2.png,{{categoryId}}`,
  tests: [
    ...responseHasNoMarker("FR16-CSV-002", runtimeMarker("-FR16-CSV-002")),
    ...verifyMarkers("FR16-CSV-002", [runtimeMarker("-FR16-CSV-002")], false),
  ],
}));

const humanItems = [];
humanItems.push(makeItem({
  id: "FR16-H01",
  title: "GET method mismatch",
  method: "GET",
  headers: [],
  prerequest: [
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/products", method: "GET", header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }] }, function (error, response) {`,
    `  if (!error) pm.collectionVariables.set("h01BeforeCount", String(response.json().length));`,
    `});`,
  ],
  tests: [
    `pm.test("FR16-H01 | unsupported method rejected", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    ...verifyMarkers("FR16-H01", [], false, [
      `pm.expect(products.length).to.eql(Number(pm.collectionVariables.get("h01BeforeCount")));`,
    ]),
  ],
}));

humanItems.push(makeItem({
  id: "FR16-H04",
  title: "Extra field ignored",
  body: rawJson({ products: [product("-FR16-H04", { malicious_field: "MUST_NOT_PERSIST" })] }),
  tests: verifyMarkers("FR16-H04", [runtimeMarker("-FR16-H04")], true, [
    `const row = products.find(function (item) { return item.name === ${runtimeMarker("-FR16-H04")}; });`,
    `pm.expect(row).not.to.have.property("malicious_field");`,
    `pm.expect(row.name).to.eql(${runtimeMarker("-FR16-H04")});`,
    `pm.expect(Number(row.price)).to.eql(10000);`,
    `pm.expect(row.description).to.eql("Description -FR16-H04");`,
    `pm.expect(row.imageUrl).to.eql("https://example.test/fr16.png");`,
    `pm.expect(String(row.category_id)).to.eql(String(pm.environment.get("categoryId")));`,
  ]),
}));

humanItems.push(makeItem({
  id: "FR16-H05",
  title: "Non-admin DB persistence check",
  auth: "Bearer {{nonAdminToken}}",
  body: rawJson({ products: [product("-FR16-H05-A"), product("-FR16-H05-B"), product("-FR16-H05-C")] }),
  tests: [
    ...responseHasNoMarker("FR16-H05", runtimeMarker("-FR16-H05-A")),
    ...verifyMarkers("FR16-H05", [runtimeMarker("-FR16-H05-A"), runtimeMarker("-FR16-H05-B"), runtimeMarker("-FR16-H05-C")], false),
  ],
}));

if (aiItems.length !== 29 || humanItems.length !== 3) {
  throw new Error(`Unexpected case count: AI=${aiItems.length}, human=${humanItems.length}`);
}

const collection = {
  info: {
    _postman_id: "23127464-fr16-product-import",
    name: "23127464 | FR-16 Product Import",
    description: [
      "Phase D executable suite for FR-16 POST /api/admin/import-products only.",
      "Human contract: JSON products array is primary; CSV is exploratory/negative.",
      "Automated: 29 human-approved AI cases + 3 human-origin cases = 32.",
      "Excluded: 9 AI INCOMPLETE + 2 AI INVALID + human H02/H03 INCOMPLETE = 13.",
      "GET /api/products calls are read-only verification dependencies, not additional test subjects.",
    ].join("\n"),
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  event: [
    {
      listen: "prerequest",
      script: {
        type: "text/javascript",
        exec: [
          `const studentId = pm.environment.get("studentId");`,
          `pm.request.headers.upsert({ key: "X-Student-Id", value: studentId });`,
          `console.log("[FR16 HEADER] " + pm.info.requestName + " X-Student-Id=" + studentId);`,
        ],
      },
    },
  ],
  variable: [{ key: "h01BeforeCount", value: "" }],
  item: [
    { name: "29 AI VALID", item: aiItems },
    { name: "3 CON-NGUOI-BO-SUNG", item: humanItems },
  ],
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(collection, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, aiCases: aiItems.length, humanCases: humanItems.length, totalCases: aiItems.length + humanItems.length }));
