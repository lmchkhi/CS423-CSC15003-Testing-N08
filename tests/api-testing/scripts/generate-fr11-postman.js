const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const outputPath = path.join(
  workspace,
  "tests",
  "api-testing",
  "collections",
  "23127464_FR11_Order_History.postman_collection.json",
);

const sidAssertion = (id) => [
  `pm.test("${id} | X-Student-Id present", function () {`,
  `  pm.expect(pm.request.headers.get("X-Student-Id")).to.eql("23127464");`,
  `});`,
];

const parseJson = [
  `const responseText = pm.response.text();`,
  `let responseJson = null;`,
  `try { responseJson = pm.response.json(); } catch (error) {}`,
];

const listOnlyOwner = (id, ownerIds, foreignId, foreignMarker) => [
  ...parseJson,
  `pm.test("${id} | response is inspectable as order list", function () {`,
  `  pm.expect(responseJson).to.be.an("array");`,
  `});`,
  `pm.test("${id} | no foreign-owned order disclosed", function () {`,
  `  const ids = Array.isArray(responseJson) ? responseJson.map(function (o) { return String(o.id); }) : [];`,
  `  const allowed = [${ownerIds.map((x) => `String(pm.environment.get("${x}"))`).join(", ")}];`,
  `  ids.forEach(function (value) { pm.expect(allowed).to.include(value); });`,
  `  pm.expect(ids).not.to.include(String(pm.environment.get("${foreignId}")));`,
  `  pm.expect(responseText).not.to.include(pm.environment.get("${foreignMarker}"));`,
  `});`,
];

const noOrderDisclosure = (id, markers) => [
  ...parseJson,
  `pm.test("${id} | protected order data not disclosed", function () {`,
  ...markers.map(
    (marker) => `  pm.expect(responseText).not.to.include(pm.environment.get("${marker}"));`,
  ),
  `});`,
];

function makeItem({ id, title, method = "GET", route, auth, headers = [], body, pre = [], tests = [] }) {
  const requestHeaders = [...headers];
  if (auth !== undefined) requestHeaders.unshift({ key: "Authorization", value: auth, type: "text" });
  const request = {
    method,
    header: requestHeaders,
    url: { raw: `{{baseUrl}}${route}`, host: ["{{baseUrl}}"], path: route.split("/").filter(Boolean) },
    description: `Traceability: ${id}. Subject under test remains FR-11.`,
  };
  if (body !== undefined) {
    request.header.push({ key: "Content-Type", value: "application/json", type: "text" });
    request.body = { mode: "raw", raw: body, options: { raw: { language: "json" } } };
  }
  const events = [];
  if (pre.length) events.push({ listen: "prerequest", script: { type: "text/javascript", exec: pre } });
  events.push({ listen: "test", script: { type: "text/javascript", exec: [...sidAssertion(id), ...tests] } });
  return { name: `${id} | ${title}`, event: events, request, response: [] };
}

const listItems = [];

listItems.push(makeItem({
  id: "FR11-MYO-004", title: "Nhiều owner trong CSDL", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  tests: listOnlyOwner("FR11-MYO-004", ["ownedA1Id", "ownedA2Id", "cancelOrderId"], "foreignB1Id", "markerB1"),
}));

const sequentialCases = [
  ["FR11-MYO-005", "Đổi identity A→B", "tokenA", "tokenB", "markerB1", "markerA1"],
  ["FR11-MYO-006", "Đổi identity B→A", "tokenB", "tokenA", "markerA1", "markerB1"],
];
for (const [id, title, mainToken, secondToken, mainForbidden, secondForbidden] of sequentialCases) {
  listItems.push(makeItem({
    id, title, route: "/api/orders/my-orders", auth: `Bearer {{${mainToken}}}`,
    tests: [
      ...parseJson,
      `pm.test("${id} | first identity isolated", function () { pm.expect(responseText).not.to.include(pm.environment.get("${mainForbidden}")); });`,
      `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/my-orders", method: "GET", header: [`,
      `  { key: "Authorization", value: "Bearer " + pm.environment.get("${secondToken}") },`,
      `  { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
      `]}, function (error, response) {`,
      `  pm.test("${id} | second identity isolated", function () {`,
      `    pm.expect(error).to.eql(null);`,
      `    pm.expect(response.text()).not.to.include(pm.environment.get("${secondForbidden}"));`,
      `  });`,
      `});`,
    ],
  }));
}

listItems.push(makeItem({
  id: "FR11-MYO-007", title: "Hai identity đồng thời", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  tests: [
    ...parseJson,
    `pm.test("FR11-MYO-007 | User A isolated", function () { pm.expect(responseText).not.to.include(pm.environment.get("markerB1")); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/my-orders", method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenB") },`,
    `  { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) {`,
    `  pm.test("FR11-MYO-007 | User B isolated", function () { pm.expect(error).to.eql(null); pm.expect(response.text()).not.to.include(pm.environment.get("markerA1")); });`,
    `});`,
  ],
}));

listItems.push(makeItem({
  id: "FR11-MYO-008", title: "Đối chiếu tập owned ID", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  tests: listOnlyOwner("FR11-MYO-008", ["ownedA1Id", "ownedA2Id", "cancelOrderId"], "foreignB1Id", "markerB1"),
}));

const queryCases = [
  ["FR11-MYO-014", "Query user_id cố ghi đè", "/api/orders/my-orders?user_id={{foreignB1Id}}"],
  ["FR11-MYO-015", "Query user_id lặp", "/api/orders/my-orders?user_id=2&user_id={{foreignB1Id}}"],
  ["FR11-MYO-016", "Query id foreign", "/api/orders/my-orders?id={{foreignB1Id}}"],
  ["FR11-MYO-017", "SQL injection qua query", "/api/orders/my-orders?user_id=%27%20OR%201%3D1--"],
];
for (const [id, title, route] of queryCases) {
  listItems.push(makeItem({ id, title, route, auth: "Bearer {{tokenA}}", tests: listOnlyOwner(id, ["ownedA1Id", "ownedA2Id", "cancelOrderId"], "foreignB1Id", "markerB1") }));
}

const invalidListAuth = [
  ["FR11-MYO-018", "Thiếu Authorization", undefined],
  ["FR11-MYO-019", "Authorization rỗng", ""],
  ["FR11-MYO-020", "Bearer thiếu token", "Bearer"],
  ["FR11-MYO-021", "Token ngẫu nhiên", "Bearer not-a-jwt"],
  ["FR11-MYO-022", "JWT một segment", "Bearer abc"],
  ["FR11-MYO-023", "JWT hai segment", "Bearer abc.def"],
  ["FR11-MYO-024", "JWT Base64URL sai", "Bearer !!!.@@@.$$$"],
  ["FR11-MYO-025", "Sửa identity claim", "Bearer {{tamperedPayloadToken}}"],
  ["FR11-MYO-026", "Sửa signature", "Bearer {{tamperedSignatureToken}}"],
  ["FR11-MYO-027", "JWT hết hạn", "Bearer {{expiredToken}}"],
  ["FR11-MYO-028", "Basic scheme", "Basic dGVzdDp0ZXN0"],
];
for (const [id, title, auth] of invalidListAuth) {
  listItems.push(makeItem({ id, title, route: "/api/orders/my-orders", auth, tests: noOrderDisclosure(id, ["markerA1", "markerB1"]) }));
}

listItems.push(makeItem({
  id: "FR11-MYO-030", title: "Token owner khác sau client state", route: "/api/orders/my-orders", auth: "Bearer {{tokenB}}",
  tests: listOnlyOwner("FR11-MYO-030", ["foreignB1Id"], "ownedA1Id", "markerA1"),
}));

listItems.push(makeItem({
  id: "FR11-MYO-H01", title: "POST method mismatch", method: "POST", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  tests: [
    ...noOrderDisclosure("FR11-MYO-H01", ["markerA1", "markerB1"]),
    `pm.test("FR11-MYO-H01 | unsupported method rejected", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
  ],
}));

listItems.push(makeItem({
  id: "FR11-MYO-H02", title: "Checkout dependency then history", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  pre: [
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/checkout", method: "POST", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") },`,
    `  { key: "X-Student-Id", value: pm.environment.get("studentId") },`,
    `  { key: "Content-Type", value: "application/json" }`,
    `], body: { mode: "raw", raw: JSON.stringify({ total_amount: 555555, shipping_address: "FR11-H02-CHECKOUT" }) } }, function (error, response) {`,
    `  if (!error) { const json = response.json(); pm.collectionVariables.set("newOrderId", String(json.orderId)); }`,
    `});`,
  ],
  tests: [
    ...parseJson,
    `pm.test("FR11-MYO-H02 | newly created order appears pending", function () {`,
    `  pm.expect(responseJson).to.be.an("array");`,
    `  const found = responseJson.find(function (o) { return String(o.id) === pm.collectionVariables.get("newOrderId"); });`,
    `  pm.expect(found).to.be.an("object"); pm.expect(found.status).to.eql("pending");`,
    `});`,
  ],
}));

listItems.push(makeItem({
  id: "FR11-MYO-H04", title: "HEAD semantics", method: "HEAD", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  tests: [`pm.test("FR11-MYO-H04 | HEAD has no message body", function () { pm.expect(pm.response.text()).to.eql(""); });`],
}));

listItems.push(makeItem({
  id: "FR11-MYO-H05", title: "Content negotiation", route: "/api/orders/my-orders", auth: "Bearer {{tokenA}}",
  headers: [{ key: "Accept", value: "application/xml", type: "text" }],
  tests: [
    `pm.test("FR11-MYO-H05 | JSON or 406, never XML order payload", function () {`,
    `  const contentType = pm.response.headers.get("Content-Type") || "";`,
    `  pm.expect(pm.response.code === 406 || contentType.toLowerCase().includes("json")).to.eql(true);`,
    `  pm.expect(pm.response.text().trim().startsWith("<")).to.eql(false);`,
    `});`,
  ],
}));

const detailItems = [];

detailItems.push(makeItem({
  id: "FR11-DET-008", title: "Phân biệt A1/A2", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}",
  tests: [
    ...parseJson,
    `pm.test("FR11-DET-008 | A1 selected", function () { pm.expect(String(responseJson && responseJson.id)).to.eql(String(pm.environment.get("ownedA1Id"))); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("ownedA2Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { pm.test("FR11-DET-008 | A2 selected", function () { pm.expect(error).to.eql(null); pm.expect(String(response.json().id)).to.eql(String(pm.environment.get("ownedA2Id"))); }); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-011", title: "Đổi token trên cùng ID", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}",
  tests: [
    ...parseJson,
    `pm.test("FR11-DET-011 | owner can inspect selected order", function () { pm.expect(responseText).to.include(pm.environment.get("markerA1")); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("ownedA1Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenB") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { pm.test("FR11-DET-011 | foreign token cannot inspect A1", function () { pm.expect(error).to.eql(null); pm.expect(response.text()).not.to.include(pm.environment.get("markerA1")); }); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-012", title: "Hai owner đồng thời", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}",
  tests: [
    ...parseJson,
    `pm.test("FR11-DET-012 | A receives A1", function () { pm.expect(responseText).to.include(pm.environment.get("markerA1")); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("foreignB1Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenB") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { pm.test("FR11-DET-012 | B receives B1", function () { pm.expect(error).to.eql(null); pm.expect(response.text()).to.include(pm.environment.get("markerB1")); }); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-025", title: "SQL injection trong ID", route: "/api/orders/%27%20OR%201%3D1--", auth: "Bearer {{tokenA}}",
  tests: noOrderDisclosure("FR11-DET-025", ["markerA1", "markerB1"]),
}));

const detailAuthCases = [
  ["FR11-DET-026", "Thiếu auth với owned ID", undefined, "ownedA1Id"],
  ["FR11-DET-027", "Thiếu auth với foreign ID", undefined, "foreignB1Id"],
  ["FR11-DET-028", "Authorization rỗng", "", "ownedA1Id"],
  ["FR11-DET-029", "Bearer thiếu token", "Bearer", "ownedA1Id"],
  ["FR11-DET-030", "Token ngẫu nhiên", "Bearer not-a-jwt", "ownedA1Id"],
  ["FR11-DET-031", "Token sửa identity", "Bearer {{tamperedPayloadToken}}", "foreignB1Id"],
  ["FR11-DET-032", "JWT hết hạn", "Bearer {{expiredToken}}", "ownedA1Id"],
  ["FR11-DET-033", "Basic scheme", "Basic dGVzdDp0ZXN0", "ownedA1Id"],
];
for (const [id, title, auth, idVariable] of detailAuthCases) {
  detailItems.push(makeItem({ id, title, route: `/api/orders/{{${idVariable}}}`, auth, tests: noOrderDisclosure(id, ["markerA1", "markerB1"]) }));
}

detailItems.push(makeItem({
  id: "FR11-DET-H01", title: "DELETE method mismatch", method: "DELETE", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}",
  tests: [
    `pm.test("FR11-DET-H01 | DELETE rejected", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("ownedA1Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { pm.test("FR11-DET-H01 | order remains", function () { pm.expect(error).to.eql(null); pm.expect(response.text()).to.include(pm.environment.get("markerA1")); }); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-H02", title: "PUT method mismatch", method: "PUT", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}", body: `{"status":"delivered"}`,
  tests: [
    `pm.test("FR11-DET-H02 | PUT rejected", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("ownedA1Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { pm.test("FR11-DET-H02 | order status unchanged", function () { pm.expect(error).to.eql(null); pm.expect(response.json().status).to.eql("pending"); }); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-H03", title: "Canceled order remains visible", route: "/api/orders/{{cancelOrderId}}", auth: "Bearer {{tokenA}}",
  pre: [
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("cancelOrderId") + "/cancel", method: "PUT", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) { if (error) { console.error(error); } });`,
  ],
  tests: [
    ...parseJson,
    `pm.test("FR11-DET-H03 | canceled order still visible", function () { pm.expect(String(responseJson.id)).to.eql(String(pm.environment.get("cancelOrderId"))); pm.expect(responseJson.status).to.eql("canceled"); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-H04", title: "Encoded path traversal", route: "/api/orders/..%2Fadmin%2Forders", auth: "Bearer {{tokenA}}",
  tests: [
    ...noOrderDisclosure("FR11-DET-H04", ["markerB1"]),
    `pm.test("FR11-DET-H04 | no admin order list", function () { pm.expect(Array.isArray(responseJson)).to.eql(false); });`,
  ],
}));

detailItems.push(makeItem({
  id: "FR11-DET-H05", title: "GET idempotency", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{tokenA}}",
  tests: [
    ...parseJson,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/orders/" + pm.environment.get("ownedA1Id"), method: "GET", header: [`,
    `  { key: "Authorization", value: "Bearer " + pm.environment.get("tokenA") }, { key: "X-Student-Id", value: pm.environment.get("studentId") }`,
    `]}, function (error, response) {`,
    `  pm.test("FR11-DET-H05 | repeated GET has equivalent order state", function () {`,
    `    pm.expect(error).to.eql(null); const second = response.json();`,
    `    pm.expect(String(second.id)).to.eql(String(responseJson.id));`,
    `    pm.expect(second.status).to.eql(responseJson.status);`,
    `    pm.expect(second.total_amount).to.eql(responseJson.total_amount);`,
    `  });`,
    `});`,
  ],
}));

const collection = {
  info: {
    _postman_id: "23127464-fr11-order-history",
    name: "23127464 | FR-11 Order History",
    description: [
      "Executable Phase-D subset for FR-11 only.",
      "AI cases automated: 33 VALID; INVALID and INCOMPLETE AI cases excluded.",
      "Human cases automated: 9/10; FR11-MYO-H03 requires controlled DB fault injection and remains not automated.",
      "Setup calls used by human cross-feature cases are dependencies, not additional feature subjects.",
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
          `console.log("[FR11 HEADER] " + pm.info.requestName + " X-Student-Id=" + studentId);`,
        ],
      },
    },
  ],
  variable: [{ key: "newOrderId", value: "" }],
  item: [
    { name: "GET /api/orders/my-orders", item: listItems },
    { name: "GET /api/orders/:id", item: detailItems },
  ],
};

fs.writeFileSync(outputPath, `${JSON.stringify(collection, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, listItems: listItems.length, detailItems: detailItems.length, totalItems: listItems.length + detailItems.length }));
