<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-005.md -->

# TC-FR22-DT-005: Ký hiệu `*` trên trường bắt buộc — Form Hồ sơ cá nhân (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable               | Type             | Domain / Constraints                                              |
| ---------------------- | ---------------- | ----------------------------------------------------------------- |
| Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc phải hiển thị `*` bên cạnh label              |
| Form mục tiêu          | Categorical      | Form Hồ sơ cá nhân (Họ Tên là bắt buộc; SĐT, Địa chỉ là tùy chọn) |

### Domain Matrix

| TC     | Ký hiệu `*`       | Form          | Expected                                                |
| ------ | ----------------- | ------------- | ------------------------------------------------------- |
| DT-005 | Kiểm tra hiển thị | Hồ sơ cá nhân | ✅ Trường bắt buộc có `*`, trường tùy chọn không có `*` |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!`

## Test data

| Field    | Value          |
| -------- | -------------- |
| Email    | test@eshop.com |
| Mật khẩu | Test1234!      |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test
3. Điều hướng đến màn hình Hồ sơ cá nhân (Profile)
4. Quan sát nhãn (label) của trường "Họ Tên"
5. Quan sát nhãn (label) của trường "Số điện thoại"
6. Quan sát nhãn (label) của trường "Địa chỉ giao hàng"
7. Kiểm tra trường bắt buộc "Họ Tên" có ký hiệu `*` hay không
8. Kiểm tra các trường tùy chọn (SĐT, Địa chỉ) không nên có ký hiệu `*`

## Expected result

- Trường "Họ Tên" hiển thị nhãn có ký hiệu `*` (trường bắt buộc)
- Trường "Số điện thoại" và "Địa chỉ giao hàng" không hiển thị `*` (trường tùy chọn) hoặc nếu hệ thống coi chúng là bắt buộc thì phải có `*`

## Actual result

- Trường "Họ Tên" không hiển thị ký hiệu `*` (trường bắt buộc)
- Trường "Số điện thoại" và "Địa chỉ giao hàng" không hiển thị `*` (trường tùy chọn) hoặc nếu hệ thống coi chúng là bắt buộc thì phải có `*`

## Status

FAILED
