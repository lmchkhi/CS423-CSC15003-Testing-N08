---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-09][API] Coupon exact min_order_amount boundary is rejected"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR09-API-DOM-002, TC-FR09-API-DOM-003, TC-FR09-API-DOM-004

## Requirement liên quan
FR-09 C3

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
2. Send `POST /api/apply-coupon` with a coupon total exactly equal to its documented `min_order_amount`.
3. Example request body: `{"code":"BIGBUY","total_amount":500000,"user_id":<currentUserId>}`.
4. Repeat with `VIP100` at `300000` and `SAVE10` at `300000`.

## Expected result
FR-09 C3 states the order total must be greater than or equal to `min_order_amount`.

Requests at the exact minimum threshold should be accepted when all other conditions are satisfied.

## Actual result
The API rejects exact-boundary values with `400 Bad Request`.

Representative response for `BIGBUY` at `500000`:

```json
{
  "error": "Đơn hàng chưa đủ giá trị tối thiểu 500,000 ₫ để áp dụng mã này"
}
```

## Evidence
Newman HTML report: `reports/newman/hw06-fr09-apply-coupon.html`

Newman JSON report: `reports/newman/hw06-fr09-apply-coupon.json`

Newman CLI output: `reports/newman/hw06-fr09-apply-coupon-cli.txt`

Representative assertion failures:

- `TC-FR09-API-DOM-002`: expected `200`, got `400`.
- `TC-FR09-API-DOM-003`: expected `200`, got `400`.
- `TC-FR09-API-DOM-004`: expected `200`, got `400`.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/272
