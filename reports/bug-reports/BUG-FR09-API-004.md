---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-09][API] Apply coupon trusts body user_id and allows cross-user application"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR09-API-SEC-004, TC-FR09-API-WF-008

## Requirement liên quan
FR-09 C4, FR-09 C5, SEC-02

## Severity / Priority
Critical / P1

## Environment
Backend API URL: `http://localhost:3000`

OS: macOS, local Newman run

Commit/build: `69eaa9b`

Tool: Newman with `htmlextra` and JSON reporter

Required header: `X-Student-Id: 23127475`

## Steps to reproduce
1. Register/login user A and user B through public APIs.
2. Send `POST /api/apply-coupon` using user A's valid JWT.
3. In the body, set `user_id` to user B's ID: `{"code":"SAVE10","total_amount":500000,"user_id":<userBId>}`.
4. Observe whether the API rejects the mismatch between JWT subject and body `user_id`.

## Expected result
The API should bind coupon application to the authenticated user and reject attempts to apply a coupon for another `user_id`.

Expected status: `4xx`, with no successful discount result and no quota consumption for the other user.

## Actual result
The API accepts the cross-user body `user_id` and returns a success response.

Representative response:

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

- `TC-FR09-API-SEC-004`: expected `4xx`, got `200`; success discount fields returned.
- `TC-FR09-API-WF-008`: pre-apply IDOR step expected `4xx`, got `200`.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/274
