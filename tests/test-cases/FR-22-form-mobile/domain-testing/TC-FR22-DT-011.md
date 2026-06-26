<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-011.md -->

# TC-FR22-DT-011: Ẩn ký tự mật khẩu — Form Đăng ký (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable           | Type           | Domain / Constraints                                                                                         |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------ |
| Che ký tự mật khẩu | Boolean / Prop | Cả trường "Mật khẩu" và "Xác nhận mật khẩu" phải ẩn ký tự (`secureTextEntry={true}`). Web: `type="password"` |
| Form mục tiêu      | Categorical    | Form Đăng ký (2 trường mật khẩu)                                                                             |

### Domain Matrix

| TC     | secureTextEntry | Form    | Expected                   |
| ------ | --------------- | ------- | -------------------------- |
| DT-011 | true (ẩn ký tự) | Đăng ký | ✅ Cả 2 trường MK ẩn ký tự |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field             | Value     |
| ----------------- | --------- |
| Mật khẩu          | Test1234! |
| Xác nhận mật khẩu | Test1234! |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng ký
3. Nhấn vào trường "Mật khẩu" và nhập `Test1234!`
4. Quan sát ký tự hiển thị trong trường "Mật khẩu"
5. Quan sát ký tự hiển thị trong trường "Xác nhận mật khẩu"

## Expected result

- Trường "Mật khẩu": ký tự nhập vào bị ẩn (hiển thị dạng `•••`)

## Actual result

- Trường "Mật khẩu": ký tự nhập vào bị ẩn (hiển thị dạng `•••`)

## Status

PASSED
