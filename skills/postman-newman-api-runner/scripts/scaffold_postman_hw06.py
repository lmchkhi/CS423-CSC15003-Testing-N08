#!/usr/bin/env python3
"""Tạo starter Postman/Newman artifacts cho HW06 EShop API tests."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def slugify(value: str) -> str:
    keep = []
    for ch in value.lower():
        if ch.isalnum():
            keep.append(ch)
        elif ch in {"-", "_", " ", "/"}:
            keep.append("-")
    slug = "".join(keep).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug or "api"


def build_collection(api_name: str, method: str, path: str) -> dict:
    raw_url = "{{baseUrl}}" + path
    if "{{pathId}}" not in raw_url and ":id" in raw_url:
        raw_url = raw_url.replace(":id", "{{pathId}}")

    pre_request = """
pm.request.headers.upsert({
  key: "X-Student-Id",
  value: pm.environment.get("studentId"),
});

const body = pm.iterationData.get("requestBody");
if (body !== undefined && body !== null && pm.request.body) {
  pm.variables.set("requestBody", body);
}

const pathId = pm.iterationData.get("pathId");
if (pathId !== undefined && pathId !== null) {
  pm.variables.set("pathId", String(pathId));
}

const authMode = pm.iterationData.get("authMode");
const tokenByMode = {
  user: pm.environment.get("userToken"),
  admin: pm.environment.get("adminToken"),
  expired: pm.environment.get("expiredToken"),
  malformed: "not-a-jwt",
};

if (tokenByMode[authMode]) {
  pm.request.headers.upsert({
    key: "Authorization",
    value: `Bearer ${tokenByMode[authMode]}`,
  });
} else if (authMode === "none" || authMode === "missing") {
  pm.request.headers.remove("Authorization");
}
""".strip()

    tests = """
const expectedStatus = Number(pm.iterationData.get("expectedStatus"));
const expectedFieldsRaw = pm.iterationData.get("expectedFields");
const expectedFields = Array.isArray(expectedFieldsRaw)
  ? expectedFieldsRaw
  : String(expectedFieldsRaw || "")
      .split(",")
      .map((field) => field.trim())
      .filter(Boolean);

pm.test(`${pm.iterationData.get("tc_id")} status is ${expectedStatus}`, () => {
  pm.response.to.have.status(expectedStatus);
});

pm.test("Contract: response is JSON when body is present", () => {
  if (pm.response.text()) {
    pm.expect(pm.response.headers.get("Content-Type") || "").to.include("application/json");
  }
});

pm.test("Functional: response time is below 1000ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(1000);
});

if (expectedFields.length && pm.response.text()) {
  const jsonData = pm.response.json();
  expectedFields.forEach((field) => {
    pm.test(`Contract: response has ${field}`, () => {
      pm.expect(jsonData).to.have.property(field);
    });
  });
}

pm.test("Security: negative cases do not crash server", () => {
  if (expectedStatus < 500) {
    pm.expect(pm.response.code).to.be.below(500);
  }
});

if (pm.response.code === 200 && pm.iterationData.get("saveTokenAs")) {
  const jsonData = pm.response.json();
  if (jsonData.token) {
    pm.environment.set(pm.iterationData.get("saveTokenAs"), jsonData.token);
  }
}
""".strip()

    request = {
        "method": method.upper(),
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "url": {"raw": raw_url, "host": ["{{baseUrl}}"], "path": path.strip("/").split("/")},
    }

    if method.upper() in {"POST", "PUT", "PATCH"}:
        request["body"] = {"mode": "raw", "raw": "{{requestBody}}"}

    return {
        "info": {
            "name": f"HW06 {api_name} API tests",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        },
        "item": [
            {
                "name": f"Data-driven {method.upper()} {path}",
                "event": [
                    {"listen": "prerequest", "script": {"type": "text/javascript", "exec": pre_request.splitlines()}},
                    {"listen": "test", "script": {"type": "text/javascript", "exec": tests.splitlines()}},
                ],
                "request": request,
            }
        ],
    }


def build_environment(student_id: str) -> dict:
    values = {
        "baseUrl": "http://localhost:3000",
        "studentId": student_id,
        "userToken": "",
        "adminToken": "",
        "expiredToken": "",
        "pathId": "",
        "requestBody": "{}",
    }
    return {
        "name": "HW06 Local",
        "values": [{"key": key, "value": value, "type": "default", "enabled": True} for key, value in values.items()],
    }


def build_data(api_name: str, method: str) -> list[dict]:
    body = "{}" if method.upper() == "GET" else "{\"thay_bang\":\"audited request body\"}"
    return [
        {
            "tc_id": f"{slugify(api_name).upper()}_SAMPLE_01",
            "description": "Thay row này bằng audited HW06 test case",
            "authMode": "none",
            "expectedStatus": 200,
            "requestBody": body,
            "expectedFields": [],
        }
    ]


def build_workflow(api_slug: str) -> str:
    return f"""name: Newman API tests

on:
  push:
    branches:
      - main
      - "feature/**"
  workflow_dispatch:

jobs:
  newman:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install backend dependencies
        working-directory: backend
        run: npm ci

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra wait-on

      - name: Start backend
        working-directory: backend
        run: |
          npm run dev &
          npx wait-on http://127.0.0.1:3000/api/products

      - name: Run Newman
        run: |
          mkdir -p reports/newman
          newman run postman/hw06-{api_slug}.postman_collection.json \\
            --environment postman/hw06-local.postman_environment.json \\
            --iteration-data postman/data/hw06-{api_slug}.data.json \\
            --reporters cli,htmlextra,json \\
            --reporter-htmlextra-export reports/newman/hw06-{api_slug}.html \\
            --reporter-json-export reports/newman/hw06-{api_slug}.json

      - name: Upload Newman reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-reports
          path: reports/newman/
"""


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--api-name", required=True)
    parser.add_argument("--method", required=True)
    parser.add_argument("--path", required=True)
    parser.add_argument("--student-id", required=True)
    parser.add_argument("--out-dir", default="postman")
    parser.add_argument("--auth-mode", default="none", choices=["none", "user", "admin"])
    args = parser.parse_args()

    api_slug = slugify(args.api_name)
    out_dir = Path(args.out_dir)
    data_dir = out_dir / "data"
    workflow_dir = Path(".github/workflows")
    data_dir.mkdir(parents=True, exist_ok=True)
    workflow_dir.mkdir(parents=True, exist_ok=True)

    collection = build_collection(args.api_name, args.method, args.path)
    environment = build_environment(args.student_id)
    data = build_data(args.api_name, args.method)
    data[0]["authMode"] = args.auth_mode

    collection_path = out_dir / f"hw06-{api_slug}.postman_collection.json"
    env_path = out_dir / "hw06-local.postman_environment.json"
    data_path = data_dir / f"hw06-{api_slug}.data.json"
    workflow_path = workflow_dir / "newman-api-test.yml"

    collection_path.write_text(json.dumps(collection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    env_path.write_text(json.dumps(environment, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    data_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    workflow_path.write_text(build_workflow(api_slug), encoding="utf-8")

    print(f"Đã tạo {collection_path}")
    print(f"Đã tạo {env_path}")
    print(f"Đã tạo {data_path}")
    print(f"Đã tạo {workflow_path}")


if __name__ == "__main__":
    main()
