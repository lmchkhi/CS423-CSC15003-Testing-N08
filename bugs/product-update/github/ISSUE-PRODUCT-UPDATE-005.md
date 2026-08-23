## Found by Test Case
TC-PRODUCT-UPDATE-044

## Requirement liên quan
Schema/content-type validation; safe error handling

## Severity / Priority
Major / P1

## Environment
- Base URL: `http://localhost:3000`
- Commit/build: `192090fbdf78207f3873cfd5008d655cb16e4dff`
- Executed at: `2026-08-23T14:51:00+07:00`
- X-Student-Id: `23127062`

## Steps to reproduce
1. Gửi `PUT /api/products/1` bằng JWT admin và `Content-Type: application/json`.
2. Dùng top-level JSON string `"invalid-body"`.
3. Lặp lại với JSON string tối giản `"x"`.

## Expected result
API trả controlled `400/422` dạng JSON với error message an toàn, không lộ stack trace/path nội bộ.

## Actual result
API trả HTTP `400` nhưng `Content-Type: text/html; charset=utf-8`; body chứa `SyntaxError` và absolute filesystem paths.

## Evidence
![TC-PRODUCT-UPDATE-044 primitive JSON HTML](https://raw.githubusercontent.com/lmchkhi/CS423-CSC15003-Testing-N08/HW06/23127062/test-reports/evidence/product-update/primitive-json-html.png)

[Raw reproduction evidence](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/product-update/reproduction-20260823T144713+0700.txt)

## Reproducibility
2/2 với hai JSON string tối giản.
