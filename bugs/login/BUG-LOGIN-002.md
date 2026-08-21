# [BUG][Login] Tài khoản bị khóa sau 2 lần sai thay vì từ lần thứ 3

## Found by Test Case
TC-LOGIN-042

## Also detected by
- TC-LOGIN-045

## Requirement liên quan
FR-02 — Mỗi lần sai tăng đúng 1 và chỉ khóa từ 3 lần sai liên tiếp trong 30 giây.

## Severity / Priority
Major / P1

## Environment
- Base URL: http://localhost:3000
- Endpoint: `POST /api/login`
- Commit/build: `d4d070a22f00b9365864d40a82b6625b79ba30f6`
- Executed at: `2026-08-20T19:15:31+07:00`
- Student ID header: `23127062`

## Steps to reproduce
1. Đảm bảo tài khoản chưa bị khóa.
2. Login với đúng email và sai password lần 1; nhận HTTP 401.
3. Lặp lại sai password lần 2; nhận HTTP 401.
4. Ngay sau đó login với password đúng.

## Expected result
Sau đúng 2 lần sai, tài khoản vẫn unlocked; request password đúng trả HTTP 200 và JWT.

## Actual result
Request password đúng sau 2 lần sai trả HTTP 403 với thông báo tài khoản bị khóa. Ở tài khoản thứ hai, request sai lần thứ 3 đã trả 403 thay vì xử lý như lần sai kích hoạt khóa. Probe độc lập chờ 31 giây vẫn nhận HTTP 403, trong khi FR-02 quy định khóa 30 giây.

## Evidence
- Screenshot run/header: [evidence.png](../../test-reports/evidence/login/x-student-id-console/evidence.png)
- Raw response/log: [response-or-log.txt](../../test-reports/evidence/login/early-lockout/response-or-log.txt)
- Expiry boundary probe: [expiry-probe.txt](../../test-reports/evidence/login/early-lockout/expiry-probe.txt)
- Newman report: [newman-report.html](../../test-reports/newman/login-20260820T191531+0700/newman-report.html)

## Reproducibility
2/2 chuỗi độc lập (user và admin) cho thấy tài khoản đã locked sau hai lần sai; các rerun trước cũng cho cùng symptom.

## Duplicate check
- Query: `login lockout 2 attempts 180 seconds`
- Result: Existing issue [#246](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/246); không tạo issue mới.
