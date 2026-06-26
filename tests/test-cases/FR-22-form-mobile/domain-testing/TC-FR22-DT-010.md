<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-010.md -->

# TC-FR22-DT-010: Ẩn ký tự mật khẩu — Form Đăng nhập (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable           | Type           | Domain / Constraints                                                                        |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------- |
| Che ký tự mật khẩu | Boolean / Prop | Trường mật khẩu phải ẩn ký tự (`secureTextEntry={true}`). Web equivalent: `type="password"` |
| Form mục tiêu      | Categorical    | Form Đăng nhập                                                                              |

### Domain Matrix

| TC     | secureTextEntry | Form      | Expected                      |
| ------ | --------------- | --------- | ----------------------------- |
| DT-010 | true (ẩn ký tự) | Đăng nhập | ✅ Ký tự mật khẩu bị ẩn (•••) |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field    | Value     |
| -------- | --------- |
| Mật khẩu | Test1234! |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn (tap) vào trường "Mật khẩu" để focus
4. Nhập chuỗi `Test1234!` vào trường mật khẩu
5. Quan sát ký tự hiển thị trong trường mật khẩu

## Expected result

- Ký tự nhập vào trường "Mật khẩu" phải được ẩn (hiển thị dạng `•••••••••` hoặc `*********`)
- Ký tự không được hiển thị rõ (plaintext) tại bất kỳ thời điểm nào (trừ hiệu ứng flash ngắn trên một số hệ điều hành là chấp nhận được)
- Tương đương `secureTextEntry={true}` trong React Native (Web: `type="password"`)

## Actual result

- Ký tự nhập vào trường "Mật khẩu" phải được ẩn (hiển thị dạng `•••••••••` hoặc `*********`)
- Ký tự không được hiển thị rõ (plaintext) tại bất kỳ thời điểm nào (trừ hiệu ứng flash ngắn trên một số hệ điều hành là chấp nhận được)

## Status

PASSED
