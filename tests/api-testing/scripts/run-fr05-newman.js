const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const workspace = path.resolve(__dirname, "../../..");
const backend = path.join(workspace, "src", "eshop-sut", "backend");
const collection = path.join(workspace, "tests", "api-testing", "collections", "23127464_FR05_Product_Search.postman_collection.json");
const environment = path.join(workspace, "tests", "api-testing", "environments", "fr-05-local.postman_environment.json");
const data = path.join(workspace, "tests", "api-testing", "data", "fr-05-run-data.json");
const emptyFixture = path.join(workspace, "tests", "api-testing", "scripts", "prepare-fr05-empty-fixture.js");
const globalNodeModules = path.join(process.env.APPDATA || "C:\\Users\\DELL\\AppData\\Roaming", "npm", "node_modules");
const newman = path.join(globalNodeModules, "newman", "bin", "newman.js");
const newmanPackage = path.join(globalNodeModules, "newman", "package.json");
const htmlExtraPackage = path.join(globalNodeModules, "newman-reporter-htmlextra", "package.json");
const databasePath = path.join(backend, "database.sqlite");
const backupDirectory = path.join(workspace, "tests", "api-testing", "backups");

function timestamp() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

const runDirectory = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(workspace, "tests", "api-testing", "evidence", "fr-05", timestamp());
if (fs.existsSync(runDirectory)) throw new Error(`Run directory already exists: ${runDirectory}`);
fs.mkdirSync(runDirectory, { recursive: true });
fs.mkdirSync(backupDirectory, { recursive: true });

const backupPath = path.join(backupDirectory, `database-before-fr05-phase-d-${timestamp()}.sqlite`);
const consoleMain = path.join(runDirectory, "newman-main-console.txt");
const consoleEmpty = path.join(runDirectory, "newman-empty-console.txt");
const jsonMain = path.join(runDirectory, "newman-main-report.json");
const jsonEmpty = path.join(runDirectory, "newman-empty-report.json");
const htmlMain = path.join(runDirectory, "newman-main-report.html");
const htmlEmpty = path.join(runDirectory, "newman-empty-report.html");
const sutLogPath = path.join(runDirectory, "sut-process.log");
const fixtureOutput = path.join(runDirectory, "empty-fixture-output.txt");
const commandPath = path.join(runDirectory, "newman-command.txt");
const metadataPath = path.join(runDirectory, "execution-metadata.json");
const startedAt = new Date();
let serverProcess = null;
let databaseBackedUp = false;
let databaseRestored = false;
let healthStatus = null;
let mainExit = null;
let fixtureExit = null;
let emptyExit = null;
let orchestrationError = null;

function packageVersion(packagePath) {
  return JSON.parse(fs.readFileSync(packagePath, "utf8")).version;
}

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase();
}

function runChild(command, args, outputPath, cwd = workspace) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath, { flags: "w" });
    const child = spawn(command, args, {
      cwd,
      windowsHide: true,
      env: { ...process.env, NODE_PATH: globalNodeModules },
    });
    child.stdout.on("data", (chunk) => { output.write(chunk); process.stdout.write(chunk); });
    child.stderr.on("data", (chunk) => { output.write(chunk); process.stderr.write(chunk); });
    child.on("error", reject);
    child.on("close", (code) => output.end(() => resolve(code)));
  });
}

function probeProducts() {
  return new Promise((resolve) => {
    const request = http.get("http://127.0.0.1:3000/api/products", { headers: { "X-Student-Id": "23127464" } }, (response) => {
      let body = "";
      response.on("data", (chunk) => { body += chunk; });
      response.on("end", () => {
        let count = null;
        try {
          const json = JSON.parse(body);
          count = Array.isArray(json) ? json.length : null;
        } catch (error) {}
        resolve({ status: response.statusCode, count });
      });
    });
    request.setTimeout(1500, () => request.destroy());
    request.on("error", () => resolve(null));
  });
}

async function waitUntilReady() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const result = await probeProducts();
    if (result && result.status < 500 && result.count === 5) return result;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("SUT did not expose the controlled five-product baseline");
}

function startServer() {
  const stream = fs.createWriteStream(sutLogPath, { flags: "w" });
  serverProcess = spawn(process.execPath, [path.join(backend, "server.js")], {
    cwd: backend,
    windowsHide: true,
    env: { ...process.env },
  });
  serverProcess.stdout.on("data", (chunk) => { stream.write(chunk); process.stdout.write(chunk); });
  serverProcess.stderr.on("data", (chunk) => { stream.write(chunk); process.stderr.write(chunk); });
  serverProcess.on("close", () => stream.end());
}

async function stopServer() {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 3000);
    serverProcess.once("close", () => { clearTimeout(timer); resolve(); });
    serverProcess.kill();
  });
}

function stats(reportPath) {
  if (!fs.existsSync(reportPath)) return null;
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  return report.run && report.run.stats ? report.run.stats : null;
}

function artifactHashes() {
  const files = {
    collection,
    environment,
    data,
    main_console: consoleMain,
    empty_console: consoleEmpty,
    main_json: jsonMain,
    empty_json: jsonEmpty,
    main_html: htmlMain,
    empty_html: htmlEmpty,
    fixture_output: fixtureOutput,
    command: commandPath,
    sut_log: sutLogPath,
  };
  return Object.fromEntries(Object.entries(files).map(([key, filePath]) => [key, { path: filePath, sha256: sha256(filePath) }]));
}

function writeMetadata() {
  fs.writeFileSync(metadataPath, `${JSON.stringify({
    scope: "FR-05 GET /api/products with optional search",
    host: "http://127.0.0.1:3000",
    student_id: "23127464",
    working_directory: workspace,
    run_directory: runDirectory,
    started_at: startedAt.toISOString(),
    ended_at: new Date().toISOString(),
    node_version: process.version,
    newman_version: packageVersion(newmanPackage),
    htmlextra_version: packageVersion(htmlExtraPackage),
    approved_ai_cases: 40,
    automated_ai_cases: 40,
    approved_human_cases: 5,
    automated_human_cases: 5,
    excluded_valid_case: null,
    excluded_ai_invalid: 0,
    excluded_ai_incomplete: 0,
    health_status: healthStatus,
    main_newman_exit_code: mainExit,
    empty_fixture_exit_code: fixtureExit,
    empty_newman_exit_code: emptyExit,
    overall_exit_code: orchestrationError ? 2 : ((mainExit || emptyExit) ? 1 : 0),
    main_stats: stats(jsonMain),
    empty_stats: stats(jsonEmpty),
    database_backup: databaseBackedUp ? backupPath : null,
    database_restored: databaseRestored,
    header_screenshot: "PENDING HUMAN CAPTURE",
    orchestration_error: orchestrationError,
    artifact_hashes: artifactHashes(),
  }, null, 2)}\n`, "utf8");
}

async function main() {
  for (const required of [collection, environment, data, emptyFixture, newman, newmanPackage, htmlExtraPackage, databasePath]) {
    if (!fs.existsSync(required)) throw new Error(`Required artifact not found: ${required}`);
  }

  const existing = await probeProducts();
  if (existing) throw new Error("Port 3000 is already serving HTTP; refusing to interfere with an external process");

  fs.copyFileSync(databasePath, backupPath);
  databaseBackedUp = true;
  startServer();
  const ready = await waitUntilReady();
  healthStatus = ready.status;

  const mainArgs = [
    newman, "run", collection, "-e", environment, "-d", data,
    "--folder", "Main controlled baseline",
    "--reporters", "cli,json,htmlextra",
    "--reporter-json-export", jsonMain,
    "--reporter-htmlextra-export", htmlMain,
  ];
  const emptyArgs = [
    newman, "run", collection, "-e", environment, "-d", data,
    "--folder", "Empty controlled baseline",
    "--reporters", "cli,json,htmlextra",
    "--reporter-json-export", jsonEmpty,
    "--reporter-htmlextra-export", htmlEmpty,
  ];
  fs.writeFileSync(commandPath, [
    `${process.execPath} ${mainArgs.map((value) => `"${value}"`).join(" ")}`,
    `${process.execPath} "${emptyFixture}"`,
    `${process.execPath} ${emptyArgs.map((value) => `"${value}"`).join(" ")}`,
  ].join("\n") + "\n", "utf8");

  mainExit = await runChild(process.execPath, mainArgs, consoleMain);
  fixtureExit = await runChild(process.execPath, [emptyFixture], fixtureOutput);
  if (fixtureExit !== 0) throw new Error(`Empty fixture failed with exit code ${fixtureExit}`);
  emptyExit = await runChild(process.execPath, emptyArgs, consoleEmpty);
}

(async () => {
  try {
    await main();
  } catch (error) {
    orchestrationError = error.stack || error.message;
    console.error(orchestrationError);
  } finally {
    await stopServer();
    if (databaseBackedUp && fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, databasePath);
      databaseRestored = true;
    }
    writeMetadata();
    console.log(`FR05_RUN_DIRECTORY=${runDirectory}`);
    const exitCode = orchestrationError ? 2 : ((mainExit || emptyExit) ? 1 : 0);
    process.exit(exitCode);
  }
})();
