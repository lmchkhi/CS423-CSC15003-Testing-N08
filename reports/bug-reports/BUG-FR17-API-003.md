---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-17][SEC] Normal user token can create admin coupons"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR17-API-SEC-004, TC-FR17-API-SEC-008, TC-FR17-API-WF-006

## Requirement liên quan
FR-12 Access Control, FR-17 Coupon CRUD, SEC-02, SEC-03.

Admin APIs under `/api/admin/*` must require a valid JWT and `role = admin`.

## Severity / Priority
Critical / P0

## Environment
Backend API URL: `http://localhost:3000`

OS: macOS, local Newman run

Commit/build: `0af3548`

Tool: Newman with `htmlextra` and JSON reporter

Required header: `X-Student-Id: 23127475`

## Steps to reproduce
1. Login as normal user `test@eshop.com` / `Test1234!`.
2. Send `POST /api/admin/coupons` with `Authorization: Bearer <userToken>` and `X-Student-Id: 23127475`.
3. Use a valid coupon body.
4. Repeat with extra client body field `"role": "admin"`.

## Expected result
API returns `403 Forbidden` and does not create any coupon.

## Actual result
API returns `200 OK` and creates coupons when using a normal user token. Newman list verification found the created codes in the coupon list before cleanup.

Representative Newman failures:

- `TC-FR17-API-SEC-004`: expected `403`, got `200`.
- `TC-FR17-API-SEC-008`: expected `403`, got `200`.
- `TC-FR17-API-WF-006`: expected `403`, got `200`.

## Evidence
Newman HTML report: `reports/newman/hw06-fr17-admin-coupons.html`

Newman JSON report: `reports/newman/hw06-fr17-admin-coupons.json`

Newman CLI output: `reports/newman/hw06-fr17-admin-coupons-cli.txt`

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/283
