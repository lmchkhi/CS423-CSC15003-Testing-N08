# [BUG][Login] Tài khoản bị khóa sau 2 lần đăng nhập sai thay vì 3 lần

## Found by Test Case

TC-LOGIN-EXT-002

## Also detected by

- TC-LOGIN-EXT-001
- TC-LOGIN-EXT-004

## Requirement liên quan

FR-02: mỗi lần đăng nhập sai tăng bộ đếm đúng 1 và chỉ khóa tài khoản từ lần sai thứ 3 trở lên.

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

1. Tạo hoặc dùng một tài khoản đang ở trạng thái chưa khóa và có bộ đếm bằng 0.
2. Gửi hai request đăng nhập liên tiếp với đúng email nhưng password sai.
3. Ngay sau lần sai thứ hai, gửi request đăng nhập bằng credentials đúng.
4. Quan sát status và response body.

## Expected result

Sau hai lần sai, tài khoản vẫn chưa đạt ngưỡng khóa 3 lần. Request dùng credentials đúng phải trả HTTP 200, có JWT/user và reset bộ đếm sai về 0.

## Actual result

Request dùng credentials đúng sau hai lần sai trả HTTP 403, không có token/user. Hành vi được quan sát độc lập trên nhiều tài khoản trong TC-LOGIN-EXT-001, 002 và 004.

## Evidence

- Screenshot: ![Các assertion state transition lockout thất bại](../../test-reports/evidence/login/early-lockout/evidence.png)
- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/early-lockout/response-or-log.txt)
- Newman report: [newman-report.html](../../test-reports/newman/login-20260822T162458+0700/newman-report.html)

## Reproducibility

3/3 full runs, mỗi run reset database và tạo tài khoản riêng qua API; tất cả tài khoản đều bị từ chối bằng HTTP 403 sau đúng hai lần sai.

## Duplicate check

- Result: Trùng root cause với [issue #71](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/71); không tạo issue mới.
