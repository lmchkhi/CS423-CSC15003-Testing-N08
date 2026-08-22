# [BUG][Login] Response đăng nhập trả plaintext password trong user object

## Found by Test Case

TC-LOGIN-001

## Also detected by

- TC-LOGIN-002
- TC-LOGIN-027
- TC-LOGIN-035
- TC-LOGIN-037

## Requirement liên quan

SEC-01 — Mật khẩu không được lưu hoặc trả về dưới dạng plaintext.

## Severity / Priority

Critical / P0

## Environment

- Base URL: http://localhost:3000
- Endpoint: `POST /api/login`
- SUT code commit: `85af3ba875c88283615e22cb108f13e2fccaf0e9`
- Git HEAD lúc chạy: `802f7174dc515d88a5612f52db7b1489de2a7350` (working tree có thay đổi chưa commit)
- Executed at: `2026-08-22T16:24:58+07:00`
- Student ID header: `23127062`

## Steps to reproduce

1. Gửi request login với một tài khoản hợp lệ và `Content-Type: application/json`.
2. Quan sát HTTP 200 và object `user` trong response.
3. Kiểm tra sự tồn tại của field `user.password`.

## Expected result

Response có JWT token và thông tin user nhưng không chứa plaintext password hoặc field nhạy cảm tương đương.

## Actual result

HTTP 200 trả object `user` có field `password`; giá trị thật đã được redaction khỏi artifacts.

## Evidence

- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/plaintext-password/response-or-log.txt)
- Newman report: [newman-report.html](../../test-reports/newman/login-20260822T162458+0700/newman-report.html)
- Screenshot: ![evidence.png](../../test-reports/evidence/login/plaintext-password/evidence.png) — output Newman hiện tại, thể hiện trực tiếp các assertion `user.password absent` thất bại mà không in giá trị password.

## Reproducibility

15/15 login thành công qua ba run gần nhất làm assertion `user.password absent` thất bại; cùng triệu chứng xuất hiện ở user và admin.

## Duplicate check

- Query: `login plaintext password user.password`
- Result: Existing issue [#69](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69); không tạo issue mới.
