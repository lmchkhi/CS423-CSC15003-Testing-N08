---
name: postman-newman-api-runner
description: "Tạo Postman, Newman và GitHub Actions artifacts cho blackbox EShop HW06 API tests. Dùng khi chuyển audited test cases thành Postman collections, environments, iteration data, pre-request scripts có X-Student-Id, Newman commands/reports, Postman feature lists, và CI/CD pass/fail evidence mà không suy ra test từ source code."
---

# Postman Newman API Runner

## Tổng quan

Dùng skill này sau khi test cases đã được generate, audit, và extend. Skill chuyển final blackbox cases thành Postman/Newman artifacts execute được và CI evidence cho HW06.

## Inputs

- Final audited test cases có expected status và assertions.
- Student ID.
- Metadata của API đã chọn: method, path, auth requirement, required tokens/IDs.
- Real setup data thu qua API, ví dụ product IDs, order IDs, user/admin tokens.

Không dùng source code để quyết định expected behavior. Dùng spec, FR/SEC requirements, và observed blackbox responses.

## Workflow

### 1. Chọn artifact layout

Paths khuyến nghị:

```text
postman/
  hw06-<api-name>.postman_collection.json
  hw06-local.postman_environment.json
  data/
    hw06-<api-name>.data.json
reports/
  newman/
    hw06-<api-name>.html
.github/workflows/
  newman-api-test.yml
```

### 2. Tạo data-driven test data

Mỗi data row nên map với một audited test case:

```json
{
  "tc_id": "LOGIN_DOM_01",
  "description": "Valid login",
  "expectedStatus": 200,
  "requestBody": "{\"email\":\"test@eshop.com\",\"password\":\"Test1234!\"}",
  "expectedFields": ["token", "user"],
  "authMode": "none"
}
```

Giữ token và dynamic IDs trong environment hoặc collection variables, không hard-code trong data files.

### 3. Thêm required header

Thêm pre-request script này ở collection hoặc request level:

```javascript
pm.request.headers.upsert({
  key: "X-Student-Id",
  value: pm.environment.get("studentId"),
});
```

Nếu row cần auth, set `Authorization` từ environment variable tương ứng:

```javascript
const authMode = pm.iterationData.get("authMode");
const tokenByMode = {
  user: pm.environment.get("userToken"),
  admin: pm.environment.get("adminToken"),
  expired: pm.environment.get("expiredToken"),
};

if (tokenByMode[authMode]) {
  pm.request.headers.upsert({
    key: "Authorization",
    value: `Bearer ${tokenByMode[authMode]}`,
  });
}
```

### 4. Viết assertions

Dùng `references/postman-newman-patterns.md` cho script patterns. Tối thiểu phải có:

- Status code bằng `expectedStatus`.
- `Content-Type` chứa `application/json` với JSON responses.
- Response time dưới threshold, thường là 1000ms.
- Expected response fields tồn tại.
- Negative/security cases không trả 500, trừ khi 500 chính là bug đang document.
- Với login, capture token khi valid.
- Với create/update flows, capture created IDs cho requests sau.

### 5. Chạy Newman

Command mặc định:

```bash
newman run postman/hw06-<api-name>.postman_collection.json \
  --environment postman/hw06-local.postman_environment.json \
  --iteration-data postman/data/hw06-<api-name>.data.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export reports/newman/hw06-<api-name>.html \
  --reporter-json-export reports/newman/hw06-<api-name>.json
```

Nếu `htmlextra` chưa có, cài `newman-reporter-htmlextra` hoặc dùng built-in `json` reporter và document limitation.

### 6. Tạo CI/CD evidence

Dùng `references/ci-patterns.md` cho GitHub Actions workflow. Tạo:

- Passing run với tất cả API tests xanh.
- Intentional failing run, thường bằng cách đổi một expected status trong data file.
- Restored passing run làm trạng thái cuối.

### 7. Optional starter script

Dùng `scripts/scaffold_postman_hw06.py` để tạo starter collection, environment, sample data file, và workflow:

```bash
python3 skills/postman-newman-api-runner/scripts/scaffold_postman_hw06.py \
  --api-name login \
  --method POST \
  --path /api/login \
  --student-id 23127475 \
  --out-dir postman \
  --auth-mode none
```

Sau đó thay sample rows bằng audited cases và chỉnh request setup khi cần.

## References

- `references/postman-newman-patterns.md`: Postman scripts, data-driven patterns, và assertion checklist.
- `references/ci-patterns.md`: GitHub Actions workflow và quy trình pass/fail evidence.
