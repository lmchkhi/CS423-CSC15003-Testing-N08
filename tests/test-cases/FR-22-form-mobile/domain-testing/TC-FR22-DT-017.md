<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-017.md -->

# TC-FR22-DT-017: Vị trí thông báo lỗi trên nút Submit — Form Hồ sơ cá nhân (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type                | Domain / Constraints                                              |
| -------------------- | ------------------- | ----------------------------------------------------------------- |
| Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi phải xuất hiện TRÊN nút Submit, không phải bên dưới |
| Form mục tiêu        | Categorical         | Form Hồ sơ cá nhân (Profile)                                      |

### Domain Matrix

| TC     | Vị trí lỗi      | Form          | Expected                          |
| ------ | --------------- | ------------- | --------------------------------- |
| DT-017 | Trên nút Submit | Hồ sơ cá nhân | ✅ Lỗi hiển thị TRÊN nút Cập nhật |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!`

## Test data

| Field  | Value                                   |
| ------ | --------------------------------------- |
| Họ Tên | (xóa trống — để trigger lỗi validation) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản `test@eshop.com` / `Test1234!`
3. Điều hướng đến màn hình Hồ sơ cá nhân (Profile)
4. Xóa nội dung trường "Họ Tên" (để trống)
5. Nhấn nút "Cập nhật" hoặc "Lưu" (Submit)
6. Quan sát vị trí thông báo lỗi

## Expected result

- Thông báo lỗi validation hiển thị **phía trên** nút Submit (Cập nhật/Lưu) hoặc **pop-up**
- Không hiển thị lỗi phía dưới nút

## Actual result

- Thông báo hiển thị pop-up hoặc toast notification phía trên nút Submit (Cập nhật/Lưu). Tuy nhiên nội dung của pop-up lại yêu cầu "số điện thoại không hợp lệ" thay vì "Họ Tên không được để trống" (do lỗi validation chưa được triển khai đúng cho trường Họ Tên)

## Status

FAILED
