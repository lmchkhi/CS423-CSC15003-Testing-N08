const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const collectionDir = path.join(workspace, "tests", "api-testing", "collections");

function readCollection(file) {
  const filePath = path.join(collectionDir, file);
  return { filePath, json: JSON.parse(fs.readFileSync(filePath, "utf8")) };
}

function writeCollection(target) {
  fs.writeFileSync(target.filePath, `${JSON.stringify(target.json, null, 2)}\n`, "utf8");
}

function testEvent(lines) {
  return { listen: "test", script: { type: "text/javascript", exec: lines } };
}

function headerTest(id) {
  return [
    `pm.test("${id} | X-Student-Id present", function () {`,
    `  pm.expect(pm.request.headers.get("X-Student-Id")).to.eql("23127464");`,
    `});`,
  ];
}

function requestItem({ id, title, route, method = "GET", auth, headers = [], body, tests = [] }) {
  const requestHeaders = [...headers];
  if (auth !== undefined && auth !== null) requestHeaders.unshift({ key: "Authorization", value: auth, type: "text" });
  const request = { method, header: requestHeaders, url: `{{baseUrl}}${route}`, description: `Corrected human-review executable: ${id}.` };
  if (body !== undefined) request.body = { mode: "raw", raw: body, options: { raw: { language: "json" } } };
  return { name: `${id} | ${title}`, event: [testEvent([...headerTest(id), ...tests])], request, response: [] };
}

function idsIn(collection) {
  const ids = [];
  function walk(items) {
    for (const item of items || []) {
      const match = String(item.name || "").match(/^(FR\d+(?:-[A-Z0-9]+)+)/);
      if (match) ids.push(match[1]);
      walk(item.item);
    }
  }
  walk(collection.item);
  return ids;
}

function assertUniqueCount(collection, expected, label) {
  const ids = idsIn(collection);
  const unique = new Set(ids);
  if (ids.length !== expected || unique.size !== expected) {
    throw new Error(`${label}: expected ${expected} unique cases, got items=${ids.length}, unique=${unique.size}`);
  }
}

function upgradeFr05() {
  const target = readCollection("23127464_FR05_Product_Search.postman_collection.json");
  const main = target.json.item.find((folder) => folder.name === "Main controlled baseline").item;
  const parse = [
    `let json = null; try { json = pm.response.json(); } catch (error) {}`,
    `const products = Array.isArray(json) ? json : (json && Array.isArray(json.products) ? json.products : null);`,
    `const names = Array.isArray(products) ? products.map(function (p) { return p && p.name; }) : [];`,
  ];
  const listShape = (id) => [
    ...parse,
    `pm.test("${id} | product list is JSON array", function () { pm.expect(products).to.be.an("array"); });`,
  ];
  const noDbLeak = (id) => [
    `pm.test("${id} | no database detail disclosure", function () {`,
    `  const text = pm.response.text().toLowerCase();`,
    `  ["sqlite", "unrecognized token", "server.js", "select *", "database error"].forEach(function (m) { pm.expect(text).not.to.include(m); });`,
    `});`,
  ];
  const exactNames = ["iPhone 15 Pro Max", "Samsung Galaxy S24 Ultra", "MacBook Pro M3", "Tai nghe AirPods Pro 2", "Bàn phím cơ Keychron Q1"];
  const cases = [];
  cases.push(requestItem({ id: "FR05-LST-003", title: "Corrected API product field schema", route: "/api/products", tests: [
    ...listShape("FR05-LST-003"),
    `pm.test("FR05-LST-003 | fields support image name and price", function () { products.forEach(function (p) { pm.expect(p).to.have.all.keys("id", "name", "price", "description", "imageUrl", "category_id"); pm.expect(p.name).to.be.a("string").and.not.empty; pm.expect(Number(p.price)).to.be.above(0); pm.expect(p.imageUrl).to.be.a("string").and.not.empty; }); });`,
  ] }));
  for (const [id, title, query, expected] of [
    ["FR05-EXI-003", "Prefix search", "iPhone", "iPhone 15 Pro Max"],
    ["FR05-EXI-004", "Substring search", "Pro", "MacBook Pro M3"],
    ["FR05-EXI-005", "ASCII case-insensitive search", "iphone%2015%20pro%20max", "iPhone 15 Pro Max"],
    ["FR05-ONE-001", "One-character partial search", "M", "MacBook Pro M3"],
    ["FR05-NUM-001", "Numeric partial search", "15", "iPhone 15 Pro Max"],
    ["FR05-ENC-001", "Percent-encoded exact-name transport", "iPhone%2015%20Pro%20Max", "iPhone 15 Pro Max"],
    ["FR05-ENC-002", "Plus decoded as space", "iPhone+15+Pro+Max", "iPhone 15 Pro Max"],
  ]) cases.push(requestItem({ id, title, route: `/api/products?search=${query}`, tests: [
    ...parse,
    `pm.test("${id} | expected product matched", function () { pm.expect(products).to.be.an("array"); pm.expect(names).to.include(${JSON.stringify(expected)}); });`,
  ] }));
  for (const [id, title, route] of [
    ["FR05-EMP-001", "Empty search equals omitted search", "/api/products?search="],
    ["FR05-EMP-002", "Bare search equals omitted search", "/api/products?search"],
  ]) cases.push(requestItem({ id, title, route, tests: [
    ...parse,
    `pm.test("${id} | controlled full baseline returned", function () { pm.expect(names.slice().sort()).to.eql(${JSON.stringify(exactNames.slice().sort())}); });`,
  ] }));
  for (const [id, title, route] of [
    ["FR05-EMP-003", "Duplicate search empty then value is handled safely", "/api/products?search=&search=iPhone"],
    ["FR05-EMP-004", "Duplicate search value then empty is handled safely", "/api/products?search=iPhone&search="],
    ["FR05-SPC-004", "Encoded reserved characters handled safely", "/api/products?search=%2B%26%3D%23%3F"],
    ["FR05-ENC-003", "Double-encoded keyword is decoded once only", "/api/products?search=iPhone%252015%2520Pro%2520Max"],
  ]) cases.push(requestItem({ id, title, route, tests: [...listShape(id), ...noDbLeak(id)] }));
  for (const [id, title, route, expected] of [
    ["FR05-WS-001", "Whitespace-only search is trimmed", "/api/products?search=%20", exactNames],
    ["FR05-WS-002", "Leading and trailing whitespace is trimmed", "/api/products?search=%20iPhone%2015%20Pro%20Max%20", ["iPhone 15 Pro Max"]],
    ["FR05-WS-003", "Internal whitespace is normalized", "/api/products?search=iPhone%20%2015%20Pro%20Max", ["iPhone 15 Pro Max"]],
  ]) cases.push(requestItem({ id, title, route, tests: [
    ...parse,
    `pm.test("${id} | normalized search result", function () { pm.expect(names.slice().sort()).to.eql(${JSON.stringify(expected.slice().sort())}); });`,
  ] }));
  for (const [id, length] of [["FR05-LEN-001", 256], ["FR05-LEN-002", 4096]]) {
    cases.push(requestItem({ id, title: `${length}-character search is bounded safely`, route: `/api/products?search=${"A".repeat(length)}`, tests: [...listShape(id), ...noDbLeak(id), `pm.test("${id} | no server error", function () { pm.expect(pm.response.code).to.be.below(500); });`] }));
  }
  for (const [id, title, route] of [
    ["FR05-SPC-001", "Backslash and double quote remain data", "/api/products?search=%5C%22"],
    ["FR05-SPC-002", "Percent is escaped as literal", "/api/products?search=%25"],
    ["FR05-SPC-003", "Underscore is escaped as literal", "/api/products?search=_"],
  ]) cases.push(requestItem({ id, title, route, tests: [...parse, ...noDbLeak(id), `pm.test("${id} | metacharacter does not broaden results", function () { pm.expect(products).to.be.an("array").and.have.lengthOf(0); });`] }));
  cases.push(requestItem({ id: "FR05-UNI-002", title: "NFD and NFC Vietnamese names are equivalent", route: "/api/products?search=Ba%CC%80n%20phi%CC%81m%20co%CC%9B%20Keychron%20Q1", tests: [...parse, `pm.test("FR05-UNI-002 | normalized Unicode match", function () { pm.expect(names).to.include("Bàn phím cơ Keychron Q1"); });`] }));
  cases.push(requestItem({ id: "FR05-UNI-003", title: "Accent-insensitive Vietnamese search", route: "/api/products?search=Ban%20phim%20co%20Keychron%20Q1", tests: [...parse, `pm.test("FR05-UNI-003 | accent-insensitive match", function () { pm.expect(names).to.include("Bàn phím cơ Keychron Q1"); });`] }));
  cases.push(requestItem({ id: "FR05-SEC-005", title: "API boundary does not reflect executable HTML", route: "/api/products?search=%3Cscript%3Ealert(1)%3C%2Fscript%3E", tests: [...listShape("FR05-SEC-005"), ...noDbLeak("FR05-SEC-005"), `pm.test("FR05-SEC-005 | response is JSON and does not reflect script", function () { pm.expect((pm.response.headers.get("Content-Type") || "").toLowerCase()).to.include("application/json"); pm.expect(pm.response.text()).not.to.include("<script>"); });`] }));
  main.push(...cases);
  target.json.info.description = "Corrected full suite: all 40 AI-generated and 5 human-origin FR-05 cases are executable. Former gaps use sourced or explicitly human-approved oracles.";
  assertUniqueCount(target.json, 45, "FR-05");
  writeCollection(target);
}

function upgradeFr11() {
  const target = readCollection("23127464_FR11_Order_History.postman_collection.json");
  const list = target.json.item.find((folder) => folder.name.includes("my-orders")).item;
  const detail = target.json.item.find((folder) => folder.name.includes(":id")).item;
  const parse = [`let json = null; try { json = pm.response.json(); } catch (error) {}`];
  const listSchema = (id) => [...parse, `pm.test("${id} | exact implementation-backed list schema", function () { pm.expect(json).to.be.an("array"); json.forEach(function (o) { pm.expect(o).to.have.all.keys("id", "user_id", "total_amount", "status", "shipping_address", "created_at"); }); });`];
  const noMarkers = (id, markers) => [...parse, `pm.test("${id} | protected markers absent", function () { const text = JSON.stringify(json); ${markers.map((m) => `pm.expect(text).not.to.include(pm.environment.get("${m}"));`).join(" ")} });`];
  const authA = "Bearer {{tokenA}}";
  const authB = "Bearer {{tokenB}}";
  list.push(requestItem({ id: "FR11-MYO-001", title: "User with no orders", route: "/api/orders/my-orders", auth: "Bearer {{tokenC}}", tests: [...listSchema("FR11-MYO-001"), `pm.test("FR11-MYO-001 | empty list", function () { pm.expect(json).to.have.lengthOf(0); });`] }));
  list.push(requestItem({ id: "FR11-MYO-002", title: "User with exactly one order", route: "/api/orders/my-orders", auth: authB, tests: [...listSchema("FR11-MYO-002"), `pm.test("FR11-MYO-002 | one owned order", function () { pm.expect(json).to.have.lengthOf(1); pm.expect(json[0].shipping_address).to.eql(pm.environment.get("markerB1")); });`] }));
  list.push(requestItem({ id: "FR11-MYO-003", title: "User with multiple orders", route: "/api/orders/my-orders", auth: authA, tests: [...listSchema("FR11-MYO-003"), `pm.test("FR11-MYO-003 | at least the three owned fixtures", function () { const text=JSON.stringify(json); ["markerA1","markerA2","markerCancel"].forEach(function(k){pm.expect(text).to.include(pm.environment.get(k));}); });`] }));
  list.push(requestItem({ id: "FR11-MYO-009", title: "Owned-order completeness", route: "/api/orders/my-orders", auth: authA, tests: [...parse, `pm.test("FR11-MYO-009 | controlled owned IDs are not omitted", function () { const ids=json.map(function(o){return String(o.id);}); [pm.environment.get("ownedA1Id"),pm.environment.get("ownedA2Id"),pm.environment.get("cancelOrderId")].forEach(function(id){pm.expect(ids).to.include(id);}); });`] }));
  for (const [id, field, predicate] of [
    ["FR11-MYO-010", "id", `pm.expect(o.id).to.be.a("number")`],
    ["FR11-MYO-011", "created_at", `pm.expect(o.created_at).to.match(/^\\d{4}-\\d{2}-\\d{2}/)`],
    ["FR11-MYO-012", "total_amount", `pm.expect(Number(o.total_amount)).to.be.at.least(0)`],
    ["FR11-MYO-013", "status", `pm.expect(["pending","confirmed","shipping","delivered","canceled"]).to.include(o.status)`],
  ]) list.push(requestItem({ id, title: `Approved ${field} mapping`, route: "/api/orders/my-orders", auth: authA, tests: [...parse, `pm.test("${id} | ${field} contract", function () { pm.expect(json).to.be.an("array"); json.forEach(function(o){ ${predicate}; }); });`] }));
  list.push(requestItem({ id: "FR11-MYO-029", title: "JWT missing identity is rejected", route: "/api/orders/my-orders", auth: "Bearer {{missingIdentityToken}}", tests: [...noMarkers("FR11-MYO-029", ["markerA1","markerB1"]), `pm.test("FR11-MYO-029 | invalid identity rejected", function () { pm.expect(pm.response.code).to.be.oneOf([401,403]); });`] }));
  list.push(requestItem({ id: "FR11-MYO-031", title: "Admin token remains user scoped", route: "/api/orders/my-orders", auth: "Bearer {{adminToken}}", tests: noMarkers("FR11-MYO-031", ["markerA1","markerB1"]) }));
  list.push(requestItem({ id: "FR11-MYO-032", title: "Orphan identity returns no orders", route: "/api/orders/my-orders", auth: "Bearer {{orphanToken}}", tests: [...listSchema("FR11-MYO-032"), `pm.test("FR11-MYO-032 | no orphan orders", function () { pm.expect(json).to.have.lengthOf(0); });`] }));
  const duplicateAuth = requestItem({ id: "FR11-MYO-033", title: "Duplicate Authorization headers rejected", route: "/api/orders/my-orders", tests: [`pm.test("FR11-MYO-033 | ambiguous credentials rejected", function () { pm.expect(pm.response.code).to.be.oneOf([400,401,403]); });`] });
  duplicateAuth.request.header.unshift({ key: "Authorization", value: authA }, { key: "Authorization", value: authB });
  list.push(duplicateAuth);
  list.push(requestItem({ id: "FR11-MYO-034", title: "Mandatory student header", route: "/api/orders/my-orders", auth: authA, tests: listSchema("FR11-MYO-034") }));
  list.push(requestItem({ id: "FR11-MYO-035", title: "List media type and exact schema", route: "/api/orders/my-orders", auth: authA, tests: [...listSchema("FR11-MYO-035"), `pm.test("FR11-MYO-035 | JSON media type", function () { pm.expect((pm.response.headers.get("Content-Type")||"").toLowerCase()).to.include("application/json"); });`] }));
  list.push(requestItem({ id: "FR11-MYO-H03", title: "Repeated history read is consistent", route: "/api/orders/my-orders", auth: authA, tests: [...parse, `pm.sendRequest({url:pm.environment.get("baseUrl")+"/api/orders/my-orders",method:"GET",header:[{key:"Authorization",value:"Bearer "+pm.environment.get("tokenA")},{key:"X-Student-Id",value:pm.environment.get("studentId")}]},function(e,r){pm.test("FR11-MYO-H03 | repeatable read",function(){pm.expect(e).to.eql(null);pm.expect(r.json()).to.eql(json);});});`] }));

  const detailSchema = (id) => [...parse, `pm.test("${id} | exact implementation-backed detail schema", function () { pm.expect(json).to.be.an("object"); pm.expect(json).to.have.all.keys("id", "user_id", "total_amount", "status", "shipping_address", "created_at"); });`];
  for (const [id, route, auth, marker] of [
    ["FR11-DET-001", "/api/orders/{{ownedA1Id}}", authA, "markerA1"],
    ["FR11-DET-002", "/api/orders/{{ownedA2Id}}", authA, "markerA2"],
    ["FR11-DET-003", "/api/orders/{{foreignB1Id}}", authB, "markerB1"],
  ]) detail.push(requestItem({ id, title: "Owned order detail", route, auth, tests: [...detailSchema(id), `pm.test("${id} | correct owned marker", function () { pm.expect(json.shipping_address).to.eql(pm.environment.get("${marker}")); });`] }));
  for (const [id, field, predicate] of [
    ["FR11-DET-004", "id", `pm.expect(String(json.id)).to.eql(pm.environment.get("ownedA1Id"))`],
    ["FR11-DET-005", "created_at", `pm.expect(json.created_at).to.match(/^\\d{4}-\\d{2}-\\d{2}/)`],
    ["FR11-DET-006", "total_amount", `pm.expect(Number(json.total_amount)).to.eql(111111)`],
    ["FR11-DET-007", "status", `pm.expect(json.status).to.eql("pending")`],
  ]) detail.push(requestItem({ id, title: `Approved detail ${field} mapping`, route: "/api/orders/{{ownedA1Id}}", auth: authA, tests: [...parse, `pm.test("${id} | ${field} contract", function () { ${predicate}; });`] }));
  for (const [id, route, auth, marker] of [
    ["FR11-DET-009", "/api/orders/{{foreignB1Id}}", authA, "markerB1"],
    ["FR11-DET-010", "/api/orders/{{ownedA1Id}}", authB, "markerA1"],
  ]) detail.push(requestItem({ id, title: "Foreign order rejected", route, auth, tests: [...noMarkers(id, [marker]), `pm.test("${id} | non-disclosing rejection", function () { pm.expect(pm.response.code).to.be.oneOf([403,404]); });`] }));
  detail.push(requestItem({ id: "FR11-DET-013", title: "Random foreign ID cannot bypass ownership", route: "/api/orders/{{foreignB1Id}}", auth: authA, tests: noMarkers("FR11-DET-013", ["markerB1"]) }));
  detail.push(requestItem({ id: "FR11-DET-014", title: "Foreign and nonexistent IDs use non-disclosing status", route: "/api/orders/{{foreignB1Id}}", auth: authA, tests: [`pm.test("FR11-DET-014 | foreign resource is hidden", function () { pm.expect(pm.response.code).to.eql(404); });`] }));
  detail.push(requestItem({ id: "FR11-DET-015", title: "Nonexistent ID", route: "/api/orders/999999999", auth: authA, tests: [`pm.test("FR11-DET-015 | not found", function () { pm.expect(pm.response.code).to.eql(404); });`] }));
  for (const [id, value] of [["FR11-DET-016","0"],["FR11-DET-017","-1"],["FR11-DET-018","abc"],["FR11-DET-019","1.5"],["FR11-DET-020","0{{ownedA1Id}}"],["FR11-DET-021","%2B{{ownedA1Id}}"],["FR11-DET-022","%20{{ownedA1Id}}%20"],["FR11-DET-023","999999999999999999999999999"],["FR11-DET-024","1e0"]]) {
    detail.push(requestItem({ id, title: "Non-canonical order ID rejected", route: `/api/orders/${value}`, auth: authA, tests: [`pm.test("${id} | invalid ID rejected", function () { pm.expect(pm.response.code).to.be.oneOf([400,404]); });`] }));
  }
  detail.push(requestItem({ id: "FR11-DET-034", title: "Admin cannot bypass ownership", route: "/api/orders/{{ownedA1Id}}", auth: "Bearer {{adminToken}}", tests: noMarkers("FR11-DET-034", ["markerA1"]) }));
  detail.push(requestItem({ id: "FR11-DET-035", title: "Detail media type and exact schema", route: "/api/orders/{{ownedA1Id}}", auth: authA, tests: [...detailSchema("FR11-DET-035"), `pm.test("FR11-DET-035 | JSON media type", function () { pm.expect((pm.response.headers.get("Content-Type")||"").toLowerCase()).to.include("application/json"); });`] }));
  target.json.info.description = "Corrected full suite: all 70 AI-generated and 10 human-origin FR-11 cases are executable. Former gaps use sourced or explicitly human-approved oracles.";
  assertUniqueCount(target.json, 80, "FR-11");
  writeCollection(target);
}

function upgradeFr16() {
  const target = readCollection("23127464_FR16_Product_Import.postman_collection.json");
  const folder = { name: "13 corrected former exclusions", item: [] };
  target.json.item.push(folder);
  const endpoint = "/api/admin/import-products";
  const admin = "Bearer {{adminToken}}";
  const product = (suffix, overrides = {}) => ({ name: `{{runId}}${suffix}`, price: 10000, description: `Description ${suffix}`, imageUrl: "https://example.test/corrected.png", category_id: "{{categoryId}}", ...overrides });
  const body = (products) => JSON.stringify({ products }, null, 2);
  const verify = (id, expressions, present) => [
    `pm.sendRequest({url:pm.environment.get("baseUrl")+"/api/products",method:"GET",header:[{key:"X-Student-Id",value:pm.environment.get("studentId")}]},function(e,r){`,
    `pm.test("${id} | persisted state",function(){pm.expect(e).to.eql(null);const text=JSON.stringify(r.json());${expressions.map((x) => `pm.expect(text).${present ? "to.include" : "not.to.include"}(${x});`).join("")}});});`,
  ];
  const add = (id, title, products, tests, auth = admin) => folder.item.push(requestItem({ id, title, route: endpoint, method: "POST", auth, headers: [{ key: "Content-Type", value: "application/json" }], body: body(products), tests }));
  add("FR16-VLD-004", "Full-field fidelity", [product("-FR16-VLD-004", { price: 12345, description: "Full fidelity", imageUrl: "https://example.test/full.png" })], verify("FR16-VLD-004", [`pm.environment.get("runId")+"-FR16-VLD-004"`, `"Full fidelity"`, `"https://example.test/full.png"`], true));
  add("FR16-NAME-003", "Null name rejected", [product("-FR16-NAME-003", { name: null, description: "{{runId}}-FR16-NAME-003" })], verify("FR16-NAME-003", [`pm.environment.get("runId")+"-FR16-NAME-003"`], false));
  add("FR16-NAME-004", "Whitespace-only name rejected", [product("-FR16-NAME-004", { name: "   ", description: "{{runId}}-FR16-NAME-004" })], verify("FR16-NAME-004", [`pm.environment.get("runId")+"-FR16-NAME-004"`], false));
  add("FR16-NAME-005", "Name over 255 characters rejected", [product("-FR16-NAME-005", { name: `{{runId}}-${"N".repeat(256)}` })], verify("FR16-NAME-005", [`pm.environment.get("runId")+"-${"N".repeat(256)}"`], false));
  add("FR16-PRICE-004", "Non-number price rejected", [product("-FR16-PRICE-004", { price: "abc" })], verify("FR16-PRICE-004", [`pm.environment.get("runId")+"-FR16-PRICE-004"`], false));
  add("FR16-PRICE-005", "Missing price rejected", [(() => { const p=product("-FR16-PRICE-005"); delete p.price; return p; })()], verify("FR16-PRICE-005", [`pm.environment.get("runId")+"-FR16-PRICE-005"`], false));
  add("FR16-CAT-002", "Nonexistent category rejected", [product("-FR16-CAT-002", { category_id: 999999 })], verify("FR16-CAT-002", [`pm.environment.get("runId")+"-FR16-CAT-002"`], false));
  add("FR16-CAT-003", "Missing category rejected", [(() => { const p=product("-FR16-CAT-003"); delete p.category_id; return p; })()], verify("FR16-CAT-003", [`pm.environment.get("runId")+"-FR16-CAT-003"`], false));
  add("FR16-CAT-004", "Wrong-type category rejected", [product("-FR16-CAT-004", { category_id: "abc" })], verify("FR16-CAT-004", [`pm.environment.get("runId")+"-FR16-CAT-004"`], false));
  const scriptText = "<script>alert('FR16-SEC-002')</script>";
  add("FR16-SEC-002", "Script value stored as inert text", [product("-FR16-SEC-002", { description: scriptText })], verify("FR16-SEC-002", [`pm.environment.get("runId")+"-FR16-SEC-002"`, JSON.stringify(scriptText)], true));
  add("FR16-SEC-003", "JWT missing identity rejected", [product("-FR16-SEC-003")], verify("FR16-SEC-003", [`pm.environment.get("runId")+"-FR16-SEC-003"`], false), "Bearer {{missingIdentityToken}}");
  const large = Array.from({ length: 501 }, (_, index) => product(`-FR16-H02-${String(index).padStart(3,"0")}`));
  add("FR16-H02", "Large batch is complete or atomically rejected", large, [
    `pm.test("FR16-H02 | documented safe outcome",function(){pm.expect(pm.response.code).to.be.oneOf([200,413]);if(pm.response.code===200){const j=pm.response.json();pm.expect(j.inserted).to.eql(501);pm.expect(j.errors).to.be.an("array").and.have.lengthOf(0);}});`,
    `pm.sendRequest({url:pm.environment.get("baseUrl")+"/api/products",method:"GET",header:[{key:"X-Student-Id",value:pm.environment.get("studentId")}]},function(e,r){pm.test("FR16-H02 | no partial large-batch commit",function(){pm.expect(e).to.eql(null);const prefix=pm.environment.get("runId")+"-FR16-H02-";const count=r.json().filter(function(p){return String(p.name).startsWith(prefix);}).length;pm.expect([0,501]).to.include(count);});});`,
  ]);
  const duplicateName = "{{runId}}-FR16-H03-DUPLICATE";
  add("FR16-H03", "Duplicate rows handled independently", [product("-FR16-H03-A", { name: duplicateName }), product("-FR16-H03-B", { name: duplicateName })], [
    `pm.test("FR16-H03 | two duplicate rows reported",function(){pm.expect(pm.response.json().inserted).to.eql(2);});`,
    `pm.sendRequest({url:pm.environment.get("baseUrl")+"/api/products",method:"GET",header:[{key:"X-Student-Id",value:pm.environment.get("studentId")}]},function(e,r){pm.test("FR16-H03 | two duplicate rows persisted",function(){pm.expect(e).to.eql(null);const name=pm.environment.get("runId")+"-FR16-H03-DUPLICATE";pm.expect(r.json().filter(function(p){return p.name===name;})).to.have.lengthOf(2);});});`,
  ]);
  target.json.info.description = "Corrected full suite: all 40 AI-generated and 5 human-origin FR-16 cases are executable. Product validation inherits FR-15 domain constraints where FR-16 imports the same product entity.";
  assertUniqueCount(target.json, 45, "FR-16");
  writeCollection(target);
}

upgradeFr05();
upgradeFr11();
upgradeFr16();
console.log(JSON.stringify({ upgraded: ["FR-05", "FR-11", "FR-16"], counts: [45, 80, 45] }));
