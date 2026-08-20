const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const workspace = path.resolve(__dirname, "../../..");
const runDirectory = path.resolve(process.argv[2] || "");
if (!process.argv[2] || !fs.existsSync(runDirectory)) {
  throw new Error("An existing run directory is required");
}

const backend = path.join(workspace, "src", "eshop-sut", "backend");
const collection = path.join(workspace, "tests", "api-testing", "collections", "23127464_FR11_Order_History.postman_collection.json");
const environment = path.join(workspace, "tests", "api-testing", "environments", "fr-11-local.postman_environment.json");
const data = path.join(workspace, "tests", "api-testing", "data", "fr-11-run-data.json");
const fixture = path.join(workspace, "tests", "api-testing", "scripts", "prepare-fr11-fixture.js");
const newman = "C:\\Users\\DELL\\AppData\\Roaming\\npm\\node_modules\\newman\\bin\\newman.js";
const consolePath = path.join(runDirectory, "newman-console.txt");
const jsonPath = path.join(runDirectory, "newman-report.json");
const htmlPath = path.join(runDirectory, "newman-report.html");
const metadataPath = path.join(runDirectory, "execution-metadata.json");
const fixturePath = path.join(runDirectory, "fixture-output.txt");
const sutPath = path.join(runDirectory, "sut-in-process.log");
const commandPath = path.join(runDirectory, "newman-command.txt");
const startedAt = new Date();
const sutLog = fs.createWriteStream(sutPath, { flags: "a" });
const originalLog = console.log.bind(console);
const originalError = console.error.bind(console);
console.log = (...args) => {
  const line = `${args.join(" ")}\n`;
  sutLog.write(line);
  originalLog(...args);
};
console.error = (...args) => {
  const line = `${args.join(" ")}\n`;
  sutLog.write(line);
  originalError(...args);
};

function runChild(command, args, outputPath, options = {}) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath, { flags: "w" });
    const child = spawn(command, args, { cwd: options.cwd || workspace, windowsHide: true });
    child.stdout.on("data", (chunk) => {
      output.write(chunk);
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      output.write(chunk);
      process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      output.end(() => resolve(code));
    });
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
  throw new Error("SUT did not become reachable in the in-process runner");
}

function writeMetadata(values) {
  fs.writeFileSync(metadataPath, `${JSON.stringify({
    scope: "FR-11",
    host: "http://127.0.0.1:3000",
    working_directory: workspace,
    started_at: startedAt.toISOString(),
    ended_at: new Date().toISOString(),
    node_version: process.version,
    newman_version: "6.2.2",
    collection,
    environment,
    data,
    console: consolePath,
    json_report: jsonPath,
    html_report: htmlPath,
    header_screenshot: "PENDING HUMAN CAPTURE",
    ...values,
  }, null, 2)}\n`, "utf8");
}

async function main() {
  process.chdir(backend);
  require(path.join(backend, "server.js"));
  const healthStatus = await waitUntilReady();

  const fixtureExit = await runChild(process.execPath, [fixture], fixturePath);
  if (fixtureExit !== 0) throw new Error(`Fixture preparation failed with exit code ${fixtureExit}`);

  const args = [
    newman, "run", collection, "-e", environment, "-d", data,
    "--reporters", "cli,json,htmlextra",
    "--reporter-json-export", jsonPath,
    "--reporter-htmlextra-export", htmlPath,
  ];
  fs.writeFileSync(commandPath, `${process.execPath} ${args.map((value) => `"${value}"`).join(" ")}\n`, "utf8");
  const newmanExit = await runChild(process.execPath, args, consolePath);
  writeMetadata({ sut_ready: true, health_status: healthStatus, fixture_exit_code: fixtureExit, newman_exit_code: newmanExit });
  return newmanExit;
}

main()
  .then((code) => {
    sutLog.end(() => process.exit(code));
  })
  .catch((error) => {
    console.error(error.stack || error.message);
    writeMetadata({ sut_ready: false, newman_exit_code: null, orchestration_error: error.message });
    sutLog.end(() => process.exit(2));
  });
