const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const workspace = path.resolve(__dirname, "../../..");
const backend = path.join(workspace, "src", "eshop-sut", "backend");
const collection = path.join(workspace, "tests", "api-testing", "collections", "23127464_FR16_Product_Import.postman_collection.json");
const environment = path.join(workspace, "tests", "api-testing", "environments", "fr-16-local.postman_environment.json");
const data = path.join(workspace, "tests", "api-testing", "data", "fr-16-run-data.json");
const fixture = path.join(workspace, "tests", "api-testing", "scripts", "prepare-fr16-fixture.js");
const globalNodeModules = path.join(process.env.APPDATA || "C:\\Users\\DELL\\AppData\\Roaming", "npm", "node_modules");
const newman = path.join(globalNodeModules, "newman", "bin", "newman.js");
const newmanPackage = path.join(globalNodeModules, "newman", "package.json");
const htmlExtraPackage = path.join(globalNodeModules, "newman-reporter-htmlextra", "package.json");

function timestamp() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

const runDirectory = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(workspace, "tests", "api-testing", "evidence", "fr-16", timestamp());
fs.mkdirSync(path.dirname(runDirectory), { recursive: true });
if (fs.existsSync(runDirectory)) throw new Error(`Run directory already exists: ${runDirectory}`);
fs.mkdirSync(runDirectory);

const consolePath = path.join(runDirectory, "newman-console.txt");
const jsonPath = path.join(runDirectory, "newman-report.json");
const htmlPath = path.join(runDirectory, "newman-report.html");
const metadataPath = path.join(runDirectory, "execution-metadata.json");
const fixturePath = path.join(runDirectory, "fixture-output.txt");
const sutPath = path.join(runDirectory, "sut-in-process.log");
const commandPath = path.join(runDirectory, "newman-command.txt");
const startedAt = new Date();
const sutLog = fs.createWriteStream(sutPath, { flags: "a" });
const backupDirectory = path.join(workspace, "tests", "api-testing", "backups");
const databasePath = path.join(backend, "database.sqlite");
const backupPath = path.join(backupDirectory, `database-before-fr16-phase-d-${timestamp()}.sqlite`);

const originalLog = console.log.bind(console);
const originalError = console.error.bind(console);
console.log = (...args) => {
  sutLog.write(`${args.join(" ")}\n`);
  originalLog(...args);
};
console.error = (...args) => {
  sutLog.write(`${args.join(" ")}\n`);
  originalError(...args);
};

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase();
}

function packageVersion(packagePath) {
  if (!fs.existsSync(packagePath)) return "NOT FOUND";
  return JSON.parse(fs.readFileSync(packagePath, "utf8")).version;
}

function runChild(command, args, outputPath, options = {}) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath, { flags: "w" });
    const child = spawn(command, args, {
      cwd: options.cwd || workspace,
      windowsHide: true,
      env: { ...process.env, NODE_PATH: globalNodeModules },
    });
    child.stdout.on("data", (chunk) => {
      output.write(chunk);
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      output.write(chunk);
      process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => output.end(() => resolve(code)));
  });
}

function probe() {
  return new Promise((resolve) => {
    const request = http.get("http://127.0.0.1:3000/api/products", (response) => {
      response.resume();
      response.on("end", () => resolve(response.statusCode));
    });
    request.setTimeout(2000, () => request.destroy());
    request.on("error", () => resolve(null));
  });
}

async function waitUntilReady() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const status = await probe();
    if (status && status < 500) return status;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("SUT did not become reachable at http://127.0.0.1:3000");
}

function hashes() {
  const artifacts = { collection, environment, data, console: consolePath, json_report: jsonPath, html_report: htmlPath, fixture_output: fixturePath };
  return Object.fromEntries(Object.entries(artifacts).map(([key, value]) => [key, { path: value, sha256: sha256(value) }]));
}

function writeMetadata(values) {
  fs.writeFileSync(metadataPath, `${JSON.stringify({
    scope: "FR-16 POST /api/admin/import-products",
    host: "http://127.0.0.1:3000",
    working_directory: workspace,
    run_directory: runDirectory,
    started_at: startedAt.toISOString(),
    ended_at: new Date().toISOString(),
    node_version: process.version,
    newman_version: packageVersion(newmanPackage),
    htmlextra_version: packageVersion(htmlExtraPackage),
    automated_cases: 32,
    excluded_ai_incomplete: 9,
    excluded_ai_invalid: 2,
    excluded_human_incomplete: 2,
    database_backup: fs.existsSync(backupPath) ? backupPath : null,
    header_screenshot: "PENDING HUMAN CAPTURE",
    artifact_hashes: hashes(),
    ...values,
  }, null, 2)}\n`, "utf8");
}

async function main() {
  for (const required of [collection, data, fixture, newman]) {
    if (!fs.existsSync(required)) throw new Error(`Required runtime artifact not found: ${required}`);
  }

  fs.mkdirSync(backupDirectory, { recursive: true });
  if (fs.existsSync(databasePath)) fs.copyFileSync(databasePath, backupPath);

  process.chdir(backend);
  require(path.join(backend, "server.js"));
  const healthStatus = await waitUntilReady();

  const fixtureExit = await runChild(process.execPath, [fixture], fixturePath);
  if (fixtureExit !== 0) throw new Error(`Fixture preparation failed with exit code ${fixtureExit}`);

  const args = [
    newman,
    "run",
    collection,
    "-e",
    environment,
    "-d",
    data,
    "--reporters",
    "cli,json,htmlextra",
    "--reporter-json-export",
    jsonPath,
    "--reporter-htmlextra-export",
    htmlPath,
  ];
  fs.writeFileSync(commandPath, `${process.execPath} ${args.map((value) => `"${value}"`).join(" ")}\n`, "utf8");
  const newmanExit = await runChild(process.execPath, args, consolePath);
  writeMetadata({ sut_ready: true, health_status: healthStatus, fixture_exit_code: fixtureExit, newman_exit_code: newmanExit });
  originalLog(`FR16_RUN_DIRECTORY=${runDirectory}`);
  return newmanExit;
}

main()
  .then((code) => sutLog.end(() => process.exit(code)))
  .catch((error) => {
    console.error(error.stack || error.message);
    writeMetadata({ sut_ready: false, newman_exit_code: null, orchestration_error: error.message });
    originalLog(`FR16_RUN_DIRECTORY=${runDirectory}`);
    sutLog.end(() => process.exit(2));
  });
