---
title: "[BUG][Login] Login lockout tăng 2 lần thay vì 1 và khóa 180 giây thay vì 30 giây"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

PERF-RCO-01-Login (Phase A source code review + API spec reconciliation)

## Requirement liên quan

FR-02 — Login and account lockout

## Severity / Priority

Major / P1

## Environment

- Backend: Node.js + Express + SQLite, `localhost:3000`
- OS: Windows 11 Pro, Intel i7-12700H, 32 GB RAM
- Commit: `fd030c68`

## Steps to reproduce

1. Đăng ký tài khoản mới (`POST /api/register`)
2. Gửi `POST /api/login` với password sai lần 1
3. Kiểm tra `login_attempts` trong database → expect `1`, actual `2`
4. Gửi `POST /api/login` với password sai lần 2
5. Kiểm tra `login_attempts` → expect `2`, actual `4` (≥3 → tài khoản bị khóa)
6. Thử đăng nhập với password đúng → bị từ chối với HTTP 403

## Expected result

Theo assignment spec:

- Mỗi lần login sai tăng `login_attempts` thêm **1**
- Khóa tài khoản khi đạt **3 lần sai**
- Thời gian khóa: **30 giây**

## Actual result

- Mỗi lần login sai tăng `login_attempts` thêm **2** (dòng `const newAttempts = user.login_attempts + 2`)
- Khóa khi `newAttempts >= 3` → thực tế chỉ cần **2 lần sai** là bị khóa (vì 0+2=2, rồi 2+2=4 ≥ 3)
- Thời gian khóa: **180.000 ms = 3 phút** (thay vì 30 giây)

## Evidence

- **Performance test impact:** Reset strategy (Phase B) phải tính đến lockout 180 giây — nếu credential sai 2 lần, account bị khóa 3 phút thay vì 30 giây. Workflow dùng credential đúng nên không trigger lockout trong measured run.
