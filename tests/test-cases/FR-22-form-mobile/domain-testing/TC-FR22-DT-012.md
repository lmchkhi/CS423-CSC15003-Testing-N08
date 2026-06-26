<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-012.md -->

# TC-FR22-DT-012: Ẩn ký tự mật khẩu — Form Đặt lại mật khẩu Bước 2 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable           | Type           | Domain / Constraints                                                                                           |
| ------------------ | -------------- | -------------------------------------------------------------------------------------------------------------- |
| Che ký tự mật khẩu | Boolean / Prop | Cả trường "Mật khẩu mới" và "Xác nhận MK mới" phải ẩn ký tự (`secureTextEntry={true}`). Web: `type="password"` |
| Form mục tiêu      | Categorical    | Form Đặt lại MK — Bước 2 (2 trường mật khẩu)                                                                   |

### Domain Matrix

| TC     | secureTextEntry | Form          | Expected                   |
| ------ | --------------- | ------------- | -------------------------- |
| DT-012 | true (ẩn ký tự) | Đặt lại MK B2 | ✅ Cả 2 trường MK ẩn ký tự |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã hoàn tất Bước 1 Quên mật khẩu (nhận OTP)

## Test data

| Field                 | Value          |
| --------------------- | -------------- |
| Email (Bước 1)        | test@eshop.com |
| Mật khẩu mới          | NewPass123!    |
| Xác nhận mật khẩu mới | NewPass123!    |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Thực hiện quy trình Quên mật khẩu — hoàn tất Bước 1 với email `test@eshop.com`
3. Tại màn hình Đặt lại mật khẩu — Bước 2
4. Nhấn vào trường "Mật khẩu mới" và nhập `NewPass123!`
5. Quan sát ký tự hiển thị trong trường "Mật khẩu mới"

## Expected result

- Trường "Mật khẩu mới": ký tự nhập vào bị ẩn (hiển thị dạng `•••`)
- Trường "Xác nhận mật khẩu mới": ký tự nhập vào cũng bị ẩn
- Cả hai trường đều tương đương `secureTextEntry={true}` (Web: `type="password"`)

## Actual result

- Trường "Mật khẩu mới": ký tự nhập vào bị ẩn (hiển thị dạng `•••`)
- Trường "Xác nhận mật khẩu mới" không tồn tại trong form.

## Status

FAILED
