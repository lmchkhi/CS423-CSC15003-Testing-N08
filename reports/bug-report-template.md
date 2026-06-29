# BUG-FR01-001: Hệ thống cho phép đăng nhập với password sai

## Found by Test Case
TC-LOGIN-003

## Requirement liên quan
FR-LOGIN-02

## Severity / Priority
Major / P1

## Environment
**Browser**: Chrome 114
**OS**: Ubuntu 22.04
**URL**: http://localhost:3000

## Steps to reproduce
1. Mở trang Login
2. Nhập email hợp lệ
3. Nhập password sai
4. Bấm Login

## Expected result
Không cho đăng nhập và hiển thị lỗi.

## Actual result
Hệ thống vẫn đăng nhập thành công.

## Evidence
Screenshot / video / console log