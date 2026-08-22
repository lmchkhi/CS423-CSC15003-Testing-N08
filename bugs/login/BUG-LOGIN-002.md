# [BUG][Login] Content-Type không phải JSON gây HTTP 500 và lộ stack trace

## Found by Test Case

TC-LOGIN-034

## Also detected by

- Minimal reproduction bằng `curl` với body `{}` và `Content-Type: text/plain`.

## Requirement liên quan

FR-02 và API contract của `POST /api/login` yêu cầu JSON body gồm `email` và `password`.

## Severity / Priority

Major / P1

## Environment

- Base URL: http://localhost:3000
- Endpoint: `POST /api/login`
- SUT code commit: `85af3ba875c88283615e22cb108f13e2fccaf0e9`
- Git HEAD lúc chạy: `13393f68c13ae433c1929bdad1106ee19cc28630` (working tree có thay đổi chưa commit)
- Executed at: `2026-08-22T15:24:07+07:00`
- Student ID header: `23127062`

## Steps to reproduce

1. Gửi `POST /api/login` với header `Content-Type: text/plain`.
2. Gửi body tối thiểu `{}` hoặc chuỗi JSON chứa credentials.
3. Quan sát HTTP status, Content-Type và response body.

## Expected result

SUT từ chối media type/body không hợp lệ bằng client error phù hợp (`400`, `415` hoặc `422`), không trả stack trace và không cấp `token`/`user`.

## Actual result

SUT trả `500 Internal Server Error`, `Content-Type: text/html` và stack trace bắt đầu bằng `TypeError: Cannot destructure property 'email' of 'req.body' as it is undefined`.

## Evidence

- Screenshot: ![TC-LOGIN-034 - HTTP 500 với Content-Type text/plain](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/login/unsupported-content-type-500/evidence.png?raw=1)
- Raw response/log: [response-or-log.txt](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/evidence/login/unsupported-content-type-500/response-or-log.txt)
- Newman report: [newman-report.html](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/blob/HW06/23127062/test-reports/newman/login-20260822T152407+0700/newman-report.html)

## Reproducibility

3/3 lần: hai lần chạy Newman với TC-LOGIN-034 và một minimal request bằng `curl` đều trả HTTP 500 với cùng TypeError.

## Duplicate check

- Queries: `"Content-Type" login 500`, `req.body undefined login`, `text/plain login`
- Scope: Open và closed issues của `lmchkhi/CS423-CSC15003-Testing-N08`
- Result: Không tìm thấy duplicate; đã tạo [issue #267](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/267).
