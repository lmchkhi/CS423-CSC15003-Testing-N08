# [BUG][Register] Register missing confirm password

## Found by Test Case

GUI-REG-003

## Requirement liên quan

FR-01: Account registration

## Severity / Priority

Major / P0 

## Environment
<!--Browser, OS, URL, build/commit-->

Windows 10, `http://localhost:5173/register`

## Steps to reproduce

Mở `http://localhost:5173/register`

## Expected result

Trường Họ tên, Email, mật khẩu, xác thực mật khẩu và nút đăng ký có trên giao diện

## Actual result

Giao diện không có xác thực mật khẩu.

## Evidence

![Ảnh thể hiện không có xác thực mật khẩu](pic/image.png)
