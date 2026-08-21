const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const collectionPath = path.join(workspace, "tests", "api-testing", "collections", "23127464_FR05_Product_Search.postman_collection.json");
const environmentPath = path.join(workspace, "tests", "api-testing", "environments", "fr-05-local.postman_environment.json");
const dataPath = path.join(workspace, "tests", "api-testing", "data", "fr-05-run-data.json");

const baselineNames = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "MacBook Pro M3",
  "Tai nghe AirPods Pro 2",
  "Bàn phím cơ Keychron Q1",
];

const sidAssertion = (id) => [
  `pm.test("${id} | X-Student-Id present", function () {`,
  `  pm.expect(pm.request.headers.get("X-Student-Id")).to.eql("23127464");`,
  `});`,
];

const parseProducts = [
  `const responseText = pm.response.text();`,
  `let responseJson = null;`,
  `try { responseJson = pm.response.json(); } catch (error) {}`,
  `const products = Array.isArray(responseJson) ? responseJson :`,
  `  (responseJson && Array.isArray(responseJson.products) ? responseJson.products : null);`,
  `const productNames = Array.isArray(products) ? products.map(function (p) { return p && p.name; }) : [];`,
];

const noSensitiveDetails = (id, textExpression = "responseText") => [
  `pm.test("${id} | no database details disclosed", function () {`,
  `  const lower = String(${textExpression} || "").toLowerCase();`,
  `  ["sqlite", "database error", "select *", "products where", "server.js", "unrecognized token", "query contains a null character"].forEach(function (marker) {`,
  `    pm.expect(lower).not.to.include(marker);`,
  `  });`,
  `});`,
];

function makeItem({ id, title, method = "GET", route, tests = [] }) {
  return {
    name: `${id} | ${title}`,
    event: [{ listen: "test", script: { type: "text/javascript", exec: [...sidAssertion(id), ...tests] } }],
    request: {
      method,
      header: [],
      url: `{{baseUrl}}${route}`,
      description: `Traceability: ${id}. Scope: FR-05 product listing/search.`,
    },
    response: [],
  };
}

const main = [];
main.push(makeItem({
  id: "FR05-LST-001", title: "Bỏ search, baseline nhiều sản phẩm", route: "/api/products",
  tests: [
    ...parseProducts,
    `pm.test("FR05-LST-001 | response exposes an inspectable product list", function () { pm.expect(products).to.be.an("array"); });`,
    `pm.test("FR05-LST-001 | all controlled baseline products are listed", function () {`,
    `  pm.expect(productNames.slice().sort()).to.eql(${JSON.stringify(baselineNames.slice().sort())});`,
    `});`,
  ],
}));

for (const [id, title, encodedKeyword, expectedName] of [
  ["FR05-EXI-001", "Full name iPhone 15 Pro Max", "iPhone%2015%20Pro%20Max", "iPhone 15 Pro Max"],
  ["FR05-EXI-002", "Full name MacBook Pro M3", "MacBook%20Pro%20M3", "MacBook Pro M3"],
  ["FR05-UNI-001", "Full name tiếng Việt chính xác", "B%C3%A0n%20ph%C3%ADm%20c%C6%A1%20Keychron%20Q1", "Bàn phím cơ Keychron Q1"],
]) {
  main.push(makeItem({
    id, title, route: `/api/products?search=${encodedKeyword}`,
    tests: [
      ...parseProducts,
      `pm.test("${id} | target product returned semantically", function () {`,
      `  pm.expect(products).to.be.an("array");`,
      `  pm.expect(productNames).to.include(${JSON.stringify(expectedName)});`,
      `});`,
    ],
  }));
}

for (const [id, title, encodedKeyword] of [
  ["FR05-NOM-001", "ASCII keyword không tồn tại", "FR05-NO-MATCH-9F4C2A"],
  ["FR05-NOM-002", "Keyword tiếng Việt không tồn tại", "S%E1%BA%A3n%20ph%E1%BA%A9m%20kh%C3%B4ng%20t%E1%BB%93n%20t%E1%BA%A1i%20FR05"],
  ["FR05-ONE-002", "Một ký tự không tồn tại", "%C2%A7"],
  ["FR05-NUM-002", "Numeric keyword không tồn tại", "987654321098765"],
]) {
  main.push(makeItem({
    id, title, route: `/api/products?search=${encodedKeyword}`,
    tests: [
      ...parseProducts,
      `pm.test("${id} | semantic no-match", function () {`,
      `  pm.expect(products).to.be.an("array");`,
      `  pm.expect(products).to.have.lengthOf(0);`,
      `});`,
    ],
  }));
}

main.push(makeItem({
  id: "FR05-UNI-004", title: "Emoji no-match và không lộ lỗi", route: "/api/products?search=%F0%9F%93%A6%F0%9F%94%8E",
  tests: [
    ...parseProducts,
    `pm.test("FR05-UNI-004 | emoji semantic no-match", function () { pm.expect(products).to.be.an("array").and.have.lengthOf(0); });`,
    ...noSensitiveDetails("FR05-UNI-004"),
  ],
}));

main.push(makeItem({
  id: "FR05-ENC-004", title: "Percent-encoding không hợp lệ", route: "/api/products?search=%E0%A4%A",
  tests: [
    `const responseText = pm.response.text();`,
    `pm.test("FR05-ENC-004 | server returned a response", function () { pm.expect(pm.response).to.exist; });`,
    ...noSensitiveDetails("FR05-ENC-004"),
  ],
}));

main.push(makeItem({
  id: "FR05-SEC-001", title: "SQL tautology injection", route: "/api/products?search=%27%20OR%20%271%27%3D%271%27%20--",
  tests: [
    ...parseProducts,
    `pm.test("FR05-SEC-001 | tautology does not broaden to full baseline", function () {`,
    `  if (Array.isArray(products)) pm.expect(productNames.slice().sort()).not.to.eql(${JSON.stringify(baselineNames.slice().sort())});`,
    `});`,
    ...noSensitiveDetails("FR05-SEC-001"),
  ],
}));

main.push(makeItem({
  id: "FR05-SEC-002", title: "UNION-based injection",
  route: "/api/products?search=%25%27%20UNION%20SELECT%209999%2C%27FR05-UNION-MARKER%27%2C1%2C%27x%27%2C%27y%27%2C1%20--",
  tests: [
    ...parseProducts,
    `pm.test("FR05-SEC-002 | UNION marker absent", function () { pm.expect(responseText).not.to.include("FR05-UNION-MARKER"); });`,
    ...noSensitiveDetails("FR05-SEC-002"),
  ],
}));

main.push(makeItem({
  id: "FR05-SEC-003", title: "Stacked destructive injection", route: "/api/products?search=%27%3B%20DROP%20TABLE%20products%3B--",
  tests: [
    `const responseText = pm.response.text();`,
    ...noSensitiveDetails("FR05-SEC-003"),
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/products", method: "GET", header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }] }, function (error, response) {`,
    `  pm.test("FR05-SEC-003 | product table and baseline remain available", function () {`,
    `    pm.expect(error).to.eql(null); const body = response.json();`,
    `    pm.expect(body).to.be.an("array");`,
    `    pm.expect(body.map(function (p) { return p.name; }).slice().sort()).to.eql(${JSON.stringify(baselineNames.slice().sort())});`,
    `  });`,
    `});`,
  ],
}));

main.push(makeItem({
  id: "FR05-SEC-004", title: "Quote không lộ database detail", route: "/api/products?search=%27",
  tests: [`const responseText = pm.response.text();`, ...noSensitiveDetails("FR05-SEC-004")],
}));

main.push(makeItem({
  id: "FR05-H02", title: "Năm GET search đồng thời", route: "/api/products?search=iPhone",
  tests: [
    `const concurrentBodies = [];`,
    `for (let index = 0; index < 5; index += 1) {`,
    `  pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/products?search=iPhone", method: "GET", header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }] }, function (error, response) {`,
    `    pm.test("FR05-H02 | concurrent request " + (index + 1) + " succeeds", function () { pm.expect(error).to.eql(null); pm.expect(response.code).to.be.below(500); });`,
    `    concurrentBodies.push(response.text());`,
    `    if (concurrentBodies.length === 5) {`,
    `      pm.test("FR05-H02 | five concurrent responses are identical", function () { concurrentBodies.forEach(function (body) { pm.expect(body).to.eql(concurrentBodies[0]); }); });`,
    `    }`,
    `  });`,
    `}`,
  ],
}));

main.push(makeItem({
  id: "FR05-H03", title: "Comment-style SQL bypass", route: "/api/products?search=test%2F**%2FOR%2F**%2F1%3D1",
  tests: [
    ...parseProducts,
    `pm.test("FR05-H03 | comment-style input does not broaden to full baseline", function () {`,
    `  if (Array.isArray(products)) pm.expect(productNames.slice().sort()).not.to.eql(${JSON.stringify(baselineNames.slice().sort())});`,
    `});`,
    ...noSensitiveDetails("FR05-H03"),
  ],
}));

main.push(makeItem({
  id: "FR05-H04", title: "Content-Type application/json", route: "/api/products",
  tests: [
    `pm.test("FR05-H04 | Content-Type is application/json", function () {`,
    `  const contentType = (pm.response.headers.get("Content-Type") || "").toLowerCase();`,
    `  pm.expect(contentType).to.include("application/json");`,
    `});`,
  ],
}));

main.push(makeItem({
  id: "FR05-H05", title: "Null-byte injection", route: "/api/products?search=test%00admin",
  tests: [
    `const responseText = pm.response.text();`,
    `pm.test("FR05-H05 | server responds without 5xx", function () { pm.expect(pm.response.code).to.be.below(500); });`,
    ...noSensitiveDetails("FR05-H05"),
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/products", method: "GET", header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }] }, function (error, response) {`,
    `  pm.test("FR05-H05 | server remains available", function () { pm.expect(error).to.eql(null); pm.expect(response.code).to.be.below(500); });`,
    `});`,
  ],
}));

main.push(makeItem({
  id: "FR05-H01", title: "POST không body phải reject và không tạo product", method: "POST", route: "/api/products",
  tests: [
    `pm.test("FR05-H01 | unsupported method for FR-05 contract rejected", function () { pm.expect(pm.response.code).to.be.at.least(400); });`,
    `pm.sendRequest({ url: pm.environment.get("baseUrl") + "/api/products", method: "GET", header: [{ key: "X-Student-Id", value: pm.environment.get("studentId") }] }, function (error, response) {`,
    `  pm.test("FR05-H01 | no product created", function () {`,
    `    pm.expect(error).to.eql(null); const body = response.json();`,
    `    pm.expect(body).to.be.an("array").and.have.lengthOf(${baselineNames.length});`,
    `    pm.expect(body.every(function (p) { return typeof p.name === "string" && p.name.length > 0; })).to.eql(true);`,
    `  });`,
    `});`,
  ],
}));

const empty = [makeItem({
  id: "FR05-LST-002", title: "Bỏ search, baseline rỗng", route: "/api/products",
  tests: [
    ...parseProducts,
    `pm.test("FR05-LST-002 | semantic empty product set", function () { pm.expect(products).to.be.an("array").and.have.lengthOf(0); });`,
  ],
})];

const collection = {
  info: {
    _postman_id: "23127464-fr05-product-search",
    name: "23127464 | FR-05 Product Listing and Search",
    description: [
      "Executable Phase-D subset for FR-05.",
      "AI cases automated: 15 VALID.",
      "Human-origin cases automated: 5.",
      "FR05-SEC-005 remains NOT AUTOMATED because its approved oracle requires observing a UI rendering sink.",
      "INVALID and INCOMPLETE AI cases are excluded.",
    ].join("\n"),
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  event: [{
    listen: "prerequest",
    script: {
      type: "text/javascript",
      exec: [
        `const studentId = pm.environment.get("studentId");`,
        `pm.request.headers.upsert({ key: "X-Student-Id", value: studentId });`,
        `console.log("[FR05 HEADER] " + pm.info.requestName + " X-Student-Id=" + studentId);`,
      ],
    },
  }],
  item: [
    { name: "Main controlled baseline", item: main },
    { name: "Empty controlled baseline", item: empty },
  ],
};

const environment = {
  id: "23127464-fr05-local",
  name: "23127464 FR-05 Local Runtime",
  values: [
    { key: "baseUrl", value: "http://127.0.0.1:3000", enabled: true },
    { key: "studentId", value: "23127464", enabled: true },
  ],
  _postman_variable_scope: "environment",
  _postman_exported_at: new Date().toISOString(),
  _postman_exported_using: "Codex Phase-D generator",
};

const data = [{ scenario: "fr05-controlled-baseline", studentId: "23127464" }];

fs.writeFileSync(collectionPath, `${JSON.stringify(collection, null, 2)}\n`, "utf8");
fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`, "utf8");
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

console.log(JSON.stringify({
  collectionPath, environmentPath, dataPath,
  mainItems: main.length, emptyItems: empty.length, totalItems: main.length + empty.length,
}, null, 2));
