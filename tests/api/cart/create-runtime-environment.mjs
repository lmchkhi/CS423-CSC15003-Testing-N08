import fs from "node:fs";

const output = process.argv[2];
if (!output) throw new Error("Usage: create-runtime-environment.mjs <output.json>");

const readme = fs.readFileSync("README.md", "utf8");
const admin = readme.match(/Admin:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
const user = readme.match(/User test:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
if (!admin || !user) throw new Error("Default accounts were not found in README.md");

async function login(email, password) {
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Student-Id": "23127062" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(`Login failed with HTTP ${response.status}`);
  const body = await response.json();
  if (!body.token) throw new Error("Login response did not contain a token");
  return body.token;
}

const [userToken, adminToken] = await Promise.all([
  login(user[1], user[2]),
  login(admin[1], admin[2]),
]);

const env = {
  id: "hw06-cart-runtime",
  name: "HW06 Cart runtime",
  values: [
    { key: "userToken", value: userToken, enabled: true },
    { key: "adminToken", value: adminToken, enabled: true },
  ],
  _postman_variable_scope: "environment",
  _postman_exported_using: "Codex api-testing skill",
};
fs.writeFileSync(output, `${JSON.stringify(env, null, 2)}\n`, { mode: 0o600 });
console.log("Runtime environment written with userToken and adminToken (values not printed).");
