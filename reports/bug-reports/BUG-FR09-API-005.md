---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-09][API] Apply coupon accepts invalid total_amount and user_id types"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR09-API-DOM-019, TC-FR09-API-DOM-020, TC-FR09-API-DOM-022, TC-FR09-API-DOM-023, TC-FR09-API-SEC-006

## Requirement liên quan
FR-09 C3-C5, API spec `POST /api/apply-coupon`, SEC-05

## Severity / Priority
Major / P1

## Environment
Backend API URL: `http://localhost:3000`

OS: macOS, local Newman run

Commit/build: `69eaa9b`

Tool: Newman with `htmlextra` and JSON reporter

Required header: `X-Student-Id: 23127475`

## Steps to reproduce
1. Login as a normal user and obtain a valid JWT.
2. Send `POST /api/apply-coupon` with invalid domain partitions:
   - `total_amount` as string: `{"code":"SAVE10","total_amount":"500000","user_id":<userId>}`
   - missing `user_id`
   - `user_id: null`
   - `user_id` as string numeric
   - SQLi-like `user_id`: `"1 OR 1=1"`
3. Observe the response status and whether success discount fields are returned.

## Expected result
The API should validate parameter types and required fields.

Invalid `total_amount` or invalid/missing `user_id` should return `400` with no successful discount result.

## Actual result
The API accepts multiple invalid partitions and returns `200 OK`.

Representative response for `total_amount` as string:

```json
{
  "success": true,
  "coupon_id": 1,
  "discount_amount": -4500000,
  "final_amount": 5000000,
  "message": "Áp dụng thành công! Giảm 10%"
}
```

## Evidence
Newman HTML report: `reports/newman/hw06-fr09-apply-coupon.html`

Newman JSON report: `reports/newman/hw06-fr09-apply-coupon.json`

Newman CLI output: `reports/newman/hw06-fr09-apply-coupon-cli.txt`

Representative assertion failures:

- `TC-FR09-API-DOM-019`: expected `400`, got `200`.
- `TC-FR09-API-DOM-020`: expected `400`, got `200`.
- `TC-FR09-API-DOM-022`: expected `400`, got `200`.
- `TC-FR09-API-DOM-023`: expected `400`, got `200`.
- `TC-FR09-API-SEC-006`: expected `400`, got `200`.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/275
