# [BUG][Login] Tài khoản vẫn bị khóa sau mốc 30 giây

## Found by Test Case

TC-LOGIN-EXT-003

## Requirement liên quan

FR-02: tài khoản chỉ bị tạm khóa 30 giây trong môi trường demo.

## Severity / Priority

Major / P1

## Environment

- Base URL: http://localhost:3000
- Endpoint: `POST /api/login`
- SUT code commit: `85af3ba875c88283615e22cb108f13e2fccaf0e9`
- Git HEAD lúc chạy: `802f7174dc515d88a5612f52db7b1489de2a7350` (working tree có thay đổi chưa commit)
- Executed at: `2026-08-22T16:24:58+07:00`
- Student ID header: `23127062`

## Steps to reproduce

1. Tạo hoặc dùng một tài khoản chưa bị khóa.
2. Gửi các request đăng nhập sai liên tiếp để kích hoạt lockout.
3. Xác nhận credentials đúng vẫn bị từ chối trước mốc 30 giây.
4. Sau tổng thời gian chờ 30,5 giây, gửi lại credentials đúng.
5. Quan sát status và response body.

## Expected result

Sau khi đủ 30 giây, lockout hết hiệu lực. Credentials đúng phải trả HTTP 200, JWT và thông tin user.

## Actual result

Sau 30,5 giây, SUT vẫn trả HTTP 403 và không cấp token/user. Hành vi phù hợp với lockout thực tế khoảng 180 giây đã được báo cáo trước đó.

## Evidence

- Screenshot: ![TC-LOGIN-EXT-003 vẫn fail sau biên 30 giây](../../test-reports/evidence/login/lockout-duration/evidence.png)
- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/lockout-duration/response-or-log.txt)
- Newman report: [newman-report.html](../../test-reports/newman/login-20260822T162458+0700/newman-report.html)

## Reproducibility

3/3 full runs với database được reset giữa các lần; request hợp lệ sau 30,5 giây đều trả HTTP 403.

## Duplicate check

- Result: Trùng root cause với [issue #73](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/73); không tạo issue mới.
