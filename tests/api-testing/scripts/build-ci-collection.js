const fs = require("fs");
const path = require("path");

const args = Object.fromEntries(process.argv.slice(2).map((value, index, all) => {
  if (!value.startsWith("--")) return null;
  return [value.slice(2), all[index + 1]];
}).filter(Boolean));

const definitions = {
  fr05: {
    source: "23127464_FR05_Product_Search.postman_collection.json",
    stable: ["FR05-LST-001", "FR05-LST-002", "FR05-EXI-001", "FR05-NOM-001", "FR05-H04"],
    failure: [],
    full: 45,
  },
  fr11: {
    source: "23127464_FR11_Order_History.postman_collection.json",
    stable: ["FR11-MYO-001", "FR11-MYO-002", "FR11-MYO-018", "FR11-DET-001", "FR11-DET-015"],
    failure: [],
    full: 80,
  },
  fr16: {
    source: "23127464_FR16_Product_Import.postman_collection.json",
    stable: ["FR16-VLD-001", "FR16-AUTH-003", "FR16-INPUT-001", "FR16-SEC-001", "FR16-H01"],
    failure: ["FR16-AUTH-002"],
    full: 45,
  },
};

const fr = args.fr;
const mode = args.mode;
const output = args.output;
if (!definitions[fr]) throw new Error(`Giá trị --fr không được hỗ trợ: ${fr}`);
if (!["all-pass", "controlled-failure", "full"].includes(mode)) throw new Error(`Giá trị --mode không được hỗ trợ: ${mode}`);
if (!output) throw new Error("Bắt buộc cung cấp --output");

const workspace = path.resolve(__dirname, "../../..");
const definition = definitions[fr];
const sourcePath = path.join(workspace, "tests", "api-testing", "collections", definition.source);
const outputPath = path.resolve(workspace, output);
const collection = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const selected = mode === "full"
  ? null
  : new Set([...definition.stable, ...(mode === "controlled-failure" ? definition.failure : [])]);

function caseId(item) {
  const match = String(item.name || "").match(/^(FR\d+(?:-[A-Z0-9]+)+)/);
  return match ? match[1] : null;
}

function filterItems(items) {
  return (items || []).flatMap((item) => {
    if (Array.isArray(item.item)) {
      const children = filterItems(item.item);
      return children.length ? [{ ...item, item: children }] : [];
    }
    const id = caseId(item);
    return id && (!selected || selected.has(id)) ? [item] : [];
  });
}

collection.item = filterItems(collection.item);
collection.info.name = `${collection.info.name} | CI ${mode}`;
collection.info.description = [
  `Chế độ CI: ${mode}.`,
  mode === "full"
    ? "Chạy toàn bộ collection đã hiệu chỉnh."
    : "Chạy tập ca minh họa ổn định trên cả ba Pool.",
  mode === "controlled-failure" && fr === "fr16"
    ? "Bao gồm FR16-AUTH-002 làm ca lỗi thực tế duy nhất có kiểm soát."
    : "",
].filter(Boolean).join("\n");

const ids = [];
function collect(items) {
  for (const item of items || []) {
    const id = caseId(item);
    if (id) ids.push(id);
    collect(item.item);
  }
}
collect(collection.item);

const expected = mode === "full"
  ? definition.full
  : definition.stable.length + (mode === "controlled-failure" ? definition.failure.length : 0);
if (ids.length !== expected || new Set(ids).size !== expected) {
  throw new Error(`${fr}/${mode}: cần ${expected} ca duy nhất, thực tế ${ids.length}/${new Set(ids).size}`);
}
if (selected) {
  for (const id of selected) if (!ids.includes(id)) throw new Error(`${fr}/${mode}: thiếu ca đã chọn ${id}`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(collection, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ fr, mode, sourcePath, outputPath, cases: ids.length, ids }));
