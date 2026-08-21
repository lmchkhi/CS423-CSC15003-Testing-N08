import fs from "node:fs";
import http from "node:http";

const output = process.argv[2];
if (!output) throw new Error("Usage: probe-lock-expiry.mjs <output.txt>");
const readme = fs.readFileSync("README.md", "utf8");
const user = readme.match(/User test:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
if (!user) throw new Error("Không tìm thấy user test trong README.md");

function request(password) {
  const body = JSON.stringify({ email: user[1], password });
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: "localhost",
      port: 3000,
      path: "/api/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        "X-Student-Id": "23127062",
      },
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
    req.end(body);
  });
}

const started = new Date();
const attempt1 = await request("DefinitelyWrong-23127062!");
const attempt2 = await request("DefinitelyWrong-23127062!");
await new Promise((resolve) => setTimeout(resolve, 31_000));
const after31s = await request(user[2]);
function safeBody(body) {
  return body.replaceAll(user[2], "<redacted-password>").replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "<redacted-jwt>");
}
const lines = [
  "FR-02 lock-expiry boundary probe",
  `Started: ${started.toISOString()}`,
  "Endpoint: POST /api/login",
  "X-Student-Id: 23127062 (all requests)",
  `Wrong attempt 1: HTTP ${attempt1.status} ${safeBody(attempt1.body)}`,
  `Wrong attempt 2: HTTP ${attempt2.status} ${safeBody(attempt2.body)}`,
  "Wait: 31 seconds (FR-02 lock duration is 30 seconds)",
  `Correct credentials after 31s: HTTP ${after31s.status} ${safeBody(after31s.body)}`,
];
fs.writeFileSync(output, lines.join("\n") + "\n");
console.log(`Probe complete: ${attempt1.status}, ${attempt2.status}, after 31s=${after31s.status}; values not printed.`);
