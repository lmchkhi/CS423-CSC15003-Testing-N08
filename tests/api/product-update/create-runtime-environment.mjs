import fs from "node:fs";

const baseUrl = "http://localhost:3000";
const studentId = "23127062";
const readme = fs.readFileSync("README.md", "utf8");
const adminCredentials = readme.match(/Admin:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
const userCredentials = readme.match(/User test:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
if (!adminCredentials || !userCredentials) throw new Error("Default runtime credentials are not documented in README.md");
async function login(email, password) {
  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Student-Id": studentId },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(`Login failed for ${email}: HTTP ${response.status}`);
  const json = await response.json();
  if (!json.token) throw new Error(`Login response has no token for ${email}`);
  return json.token;
}

const [userToken, adminToken] = await Promise.all([
  login(userCredentials[1], userCredentials[2]),
  login(adminCredentials[1], adminCredentials[2]),
]);
const environment = {
  id: "product-update-hw06-runtime",
  name: "Product Update HW06 Runtime",
  values: [
    { key: "baseUrl", value: baseUrl, enabled: true },
    { key: "userToken", value: userToken, enabled: true },
    { key: "adminToken", value: adminToken, enabled: true },
  ],
  _postman_variable_scope: "environment",
};
fs.writeFileSync(process.argv[2] || "/tmp/product-update-runtime.postman_environment.json", JSON.stringify(environment, null, 2) + "\n", { mode: 0o600 });
console.log("Runtime environment written with userToken and adminToken (values not printed).");
