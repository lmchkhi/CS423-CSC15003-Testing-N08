---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-17][API] Unsupported text/plain request crashes coupon create endpoint"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR17-API-SCH-005

## Requirement liên quan
FR-17 Coupon CRUD, schema/content-type validation.

## Severity / Priority
Major / P1

## Environment
Backend API URL: `http://localhost:3000`

OS: macOS, local Newman run

Commit/build: `0af3548`

Tool: Newman with `htmlextra` and JSON reporter

Required header: `X-Student-Id: 23127475`

## Steps to reproduce
1. Login as admin and obtain a JWT.
2. Send `POST /api/admin/coupons` with `Content-Type: text/plain`.
3. Use a JSON-looking body as text:

```json
{
  "code": "HW06TEXTPLAIN_<runId>",
  "type": "fixed",
  "discount_value": 10000,
  "min_order_amount": 0,
  "expired_at": "2099-12-31",
  "max_uses_per_user": 1
}
```

## Expected result
API returns `400` or `415` with safe JSON error body. It must not create a coupon and must not return 5xx.

## Actual result
API returns `500 Internal Server Error` with `text/html; charset=utf-8`.

Representative Newman failures:

- Expected `[400,415]`, got `500`.
- Expected no unexpected 5xx.
- Expected JSON error shape, got HTML response.

## Evidence
Newman HTML report: `reports/newman/hw06-fr17-admin-coupons.html`

Newman JSON report: `reports/newman/hw06-fr17-admin-coupons.json`

Newman CLI output: `reports/newman/hw06-fr17-admin-coupons-cli.txt`

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/284
