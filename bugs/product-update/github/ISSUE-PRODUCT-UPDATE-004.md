## Found by Test Case
TC-PRODUCT-UPDATE-037

## Requirement liên quan
FR-15; schema/content-type validation; safe error handling

## Severity / Priority
Major / P1

## Environment
- Base URL: `http://localhost:3000`
- Commit/build: `192090fbdf78207f3873cfd5008d655cb16e4dff`
- Executed at: `2026-08-23T14:51:00+07:00`
- X-Student-Id: `23127062`

## Steps to reproduce
1. Gửi `PUT /api/products/1` bằng JWT admin.
2. Đặt `Content-Type: text/plain` và body JSON-looking hợp lệ.
3. Lặp lại với body tối giản `{}`.

## Expected result
API trả controlled `400/415/422` dạng JSON, không trả 5xx và không lộ stack trace/path nội bộ.

## Actual result
Cả hai request trả HTTP `500`, `Content-Type: text/html; charset=utf-8`, kèm `TypeError` và absolute filesystem paths.

## Evidence
![TC-PRODUCT-UPDATE-037 Content-Type 500](https://raw.githubusercontent.com/lmchkhi/CS423-CSC15003-Testing-N08/HW06/23127062/test-reports/evidence/product-update/content-type-500.png)

[Raw reproduction evidence](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt)

## Reproducibility
2/2; Newman canonical run cũng tái hiện HTTP 500.
