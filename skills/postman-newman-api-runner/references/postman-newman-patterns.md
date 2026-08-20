# Postman và Newman Patterns

## Environment variables bắt buộc

Dùng local environment file có ít nhất:

| Variable | Example | Ghi chú |
| --- | --- | --- |
| `baseUrl` | `http://localhost:3000` | Backend API. |
| `studentId` | `<MSSV>` | Dùng cho `X-Student-Id`. |
| `userToken` | blank initially | Set sau login hoặc thủ công từ Postman. |
| `adminToken` | blank initially | Admin JWT. |
| `expiredToken` | placeholder | Used only for expired-token negative cases. |
| `createdOrderId` | blank initially | Capture từ checkout/setup. |
| `createdProductId` | blank initially | Capture từ admin product create. |

## Generic Pre-Request Script

```javascript
pm.request.headers.upsert({
  key: "X-Student-Id",
  value: pm.environment.get("studentId"),
});

const body = pm.iterationData.get("requestBody");
if (body !== undefined && body !== null && pm.request.body) {
  pm.variables.set("requestBody", body);
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
```

## Generic Test Script

```javascript
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
```

## Capture token

Cho login happy path:

```javascript
if (pm.response.code === 200) {
  const jsonData = pm.response.json();
  if (jsonData.token && pm.iterationData.get("saveTokenAs")) {
    pm.environment.set(pm.iterationData.get("saveTokenAs"), jsonData.token);
  }
}
```

## Data row fields

Khuyến nghị:

| Field | Ý nghĩa |
| --- | --- |
| `tc_id` | Stable test case ID từ final audited table. |
| `description` | Case summary dễ đọc. |
| `authMode` | `none`, `missing`, `user`, `admin`, `expired`, `malformed`. |
| `expectedStatus` | Numeric expected HTTP status. |
| `requestBody` | Raw JSON string cho body requests. |
| `queryString` | Optional raw query string, ví dụ `search=iphone`. |
| `pathId` | Optional dynamic path value. |
| `expectedFields` | Array hoặc comma-separated required response fields. |
| `saveTokenAs` | Optional environment variable name, ví dụ `userToken`. |

## Newman Commands

CLI + JSON:

```bash
newman run postman/hw06-login.postman_collection.json \
  --environment postman/hw06-local.postman_environment.json \
  --iteration-data postman/data/hw06-login.data.json \
  --reporters cli,json \
  --reporter-json-export reports/newman/hw06-login.json
```

CLI + HTML extra:

```bash
newman run postman/hw06-login.postman_collection.json \
  --environment postman/hw06-local.postman_environment.json \
  --iteration-data postman/data/hw06-login.data.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export reports/newman/hw06-login.html \
  --reporter-json-export reports/newman/hw06-login.json
```

## Lỗi thường gặp

- Thiếu `X-Student-Id` trong setup/login requests.
- Hard-code tokens vào collection files đã commit.
- Quên phân biệt 401 và 403.
- Chạy stateful requests song song khi chúng phụ thuộc previous state.
- Expect exact dynamic values thay vì assert field existence/type.
- Nộp report không có Newman hoặc GitHub Actions evidence thật.
