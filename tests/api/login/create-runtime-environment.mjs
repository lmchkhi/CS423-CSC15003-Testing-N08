import fs from "node:fs";

const output = process.argv[2];
if (!output) throw new Error("Usage: create-runtime-environment.mjs <output.json>");
const readme = fs.readFileSync("README.md", "utf8");
const admin = readme.match(/Admin:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
const user = readme.match(/User test:\s*`([^`]+)`\s*\/\s*`([^`]+)`/);
if (!admin || !user) throw new Error("Không tìm thấy tài khoản mặc định trong README.md");

const values = {
  validUserEmail: user[1],
  validUserPassword: user[2],
  validAdminEmail: admin[1],
  validAdminPassword: admin[2],
  uppercaseUserEmail: user[1].toUpperCase(),
  spacedUserEmail: `  ${user[1]}  `,
  validUserPasswordWithTrailingSpace: `${user[2]} `,
  invalidPassword: "DefinitelyWrong-23127062!",
  oversizedEmail: `${"a".repeat(10000)}@example.invalid`,
};
const env = {
  id: "hw06-login-runtime",
  name: "HW06 Login runtime",
  values: Object.entries(values).map(([key, value]) => ({ key, value, enabled: true })),
  _postman_variable_scope: "environment",
  _postman_exported_using: "Codex api-testing skill",
};
fs.writeFileSync(output, JSON.stringify(env, null, 2) + "\n", { mode: 0o600 });
console.log(`Runtime environment written with ${env.values.length} variables (values not printed).`);
