import fs from "node:fs";
import { createRequire } from "node:module";

const output = process.argv[2];
if (!output) throw new Error("Usage: create-runtime-environment.mjs <output.json>");
const runTag = (process.argv[3] || new Date().toISOString()).replace(/[^A-Za-z0-9]/g, "").slice(-20);
const require = createRequire(import.meta.url);
const jwt = require("../../../backend/node_modules/jsonwebtoken");
const baseUrl = "http://localhost:3000";
const studentId = "23127062";
const jwtSecret = "super_secret_key_that_should_not_be_here";

const readme = fs.readFileSync("README.md", "utf8");
const admin = readme.match(/Admin:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
const user = readme.match(/User test:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
if (!admin || !user) throw new Error("Default accounts were not found in README.md");

async function login(email, password) {
  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Student-Id": studentId },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error(`Login failed with HTTP ${response.status}`);
  const body = await response.json();
  if (!body.token) throw new Error("Login response did not contain a token");
  return body;
}

const altUserEmail = `hw06-cart-alt-${runTag}@example.test`;
const altUserPassword = "Cart-Alt-23127062!";
const registerResponse = await fetch(`${baseUrl}/api/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Student-Id": studentId },
  body: JSON.stringify({
    name: "HW06 Cart Alternate User",
    email: altUserEmail,
    password: altUserPassword,
  }),
});
if (!registerResponse.ok) {
  throw new Error(`Alternate-user registration failed with HTTP ${registerResponse.status}`);
}

const [userLogin, adminLogin, altUserLogin] = await Promise.all([
  login(user[1], user[2]),
  login(admin[1], admin[2]),
  login(altUserEmail, altUserPassword),
]);
const expiredUserToken = jwt.sign(
  {
    id: userLogin.user.id,
    role: userLogin.user.role,
    exp: Math.floor(Date.now() / 1000) - 60,
  },
  jwtSecret,
);

const env = {
  id: "hw06-cart-runtime",
  name: "HW06 Cart runtime",
  values: [
    { key: "userToken", value: userLogin.token, enabled: true },
    { key: "adminToken", value: adminLogin.token, enabled: true },
    { key: "altUserToken", value: altUserLogin.token, enabled: true },
    { key: "expiredUserToken", value: expiredUserToken, enabled: true },
  ],
  _postman_variable_scope: "environment",
  _postman_exported_using: "Codex api-testing skill",
};
fs.writeFileSync(output, `${JSON.stringify(env, null, 2)}\n`, { mode: 0o600 });
console.log("Runtime environment written with user/admin/alternate/expired tokens (values not printed).");
