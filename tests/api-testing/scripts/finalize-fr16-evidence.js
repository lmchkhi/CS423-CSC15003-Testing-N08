const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const runDirectory = path.resolve(process.argv[2] || "");
if (!process.argv[2] || !fs.existsSync(runDirectory)) {
  throw new Error("Usage: node finalize-fr16-evidence.js <existing-run-directory>");
}

const metadataPath = path.join(runDirectory, "execution-metadata.json");
const reportPath = path.join(runDirectory, "newman-report.json");
const commandPath = path.join(runDirectory, "newman-command.txt");
if (!fs.existsSync(metadataPath) || !fs.existsSync(reportPath) || !fs.existsSync(commandPath)) {
  throw new Error("Run directory is missing metadata, Newman JSON, or command evidence");
}

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase();
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const failureClassifications = {
  "FR16-AUTH-002": "LOI_BAO_MAT_SUT",
  "FR16-H05": "LOI_BAO_MAT_SUT",
  "FR16-PRICE-002": "LOI_CHUC_NANG_SUT",
  "FR16-PRICE-003": "LOI_CHUC_NANG_SUT",
  "FR16-ATOM-001": "LOI_CHUC_NANG_SUT",
  "FR16-ATOM-002": "LOI_CHUC_NANG_SUT",
  "FR16-ATOM-003": "LOI_CHUC_NANG_SUT",
  "FR16-ATOM-004": "LOI_CHUC_NANG_SUT",
};

const failures = report.run.failures.map((failure) => {
  const item = failure.source && failure.source.name ? failure.source.name : "UNKNOWN";
  const caseId = item.split(" | ")[0];
  return {
    case_id: caseId,
    item,
    assertion: failure.error && failure.error.test,
    message: failure.error && failure.error.message,
    classification: failureClassifications[caseId] || "CHUA_XAC_DINH",
  };
});

const extraArtifacts = {
  command: commandPath,
  runner_script: path.join(workspace, "tests", "api-testing", "scripts", "run-fr16-newman.js"),
  fixture_script: path.join(workspace, "tests", "api-testing", "scripts", "prepare-fr16-fixture.js"),
  generator_script: path.join(workspace, "tests", "api-testing", "scripts", "generate-fr16-postman.js"),
  finalizer_script: path.join(workspace, "tests", "api-testing", "scripts", "finalize-fr16-evidence.js"),
  csv_input: path.join(workspace, "tests", "api-testing", "data", "fr-16-exploratory.csv"),
};

metadata.newman_command = fs.readFileSync(commandPath, "utf8").trim();
metadata.canonical_summary = {
  result: report.run.stats.assertions.failed === 0 ? "EXECUTED_PASS" : "EXECUTED_FAILED",
  iterations: report.run.stats.iterations,
  items: report.run.stats.items,
  requests: report.run.stats.requests,
  test_scripts: report.run.stats.testScripts || report.run.stats.tests,
  prerequest_scripts: report.run.stats.prerequestScripts || report.run.stats.prerequests,
  assertions: report.run.stats.assertions,
  timings: report.run.timings,
  failure_count: failures.length,
  failures,
  canonical_environment_or_script_failures: 0,
};
metadata.artifact_hashes = {
  ...metadata.artifact_hashes,
  ...Object.fromEntries(
    Object.entries(extraArtifacts).map(([key, filePath]) => [key, { path: filePath, sha256: sha256(filePath) }]),
  ),
};
metadata.metadata_finalized_at = new Date().toISOString();
metadata.metadata_finalized_by = "tests/api-testing/scripts/finalize-fr16-evidence.js";

fs.writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  metadataPath,
  assertions: metadata.canonical_summary.assertions,
  failureCount: failures.length,
  classifications: failures.reduce((counts, failure) => {
    counts[failure.classification] = (counts[failure.classification] || 0) + 1;
    return counts;
  }, {}),
}, null, 2));
