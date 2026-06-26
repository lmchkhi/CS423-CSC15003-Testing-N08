<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-008.md -->

# TC-FR22-DT-008: Bàn phím Email — Form Đăng ký (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable            | Type               | Domain / Constraints                                                                                        |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Kiểu bàn phím Email | Categorical / Prop | Trường Email phải kích hoạt bàn phím email (`keyboardType="email-address"`). Web equivalent: `type="email"` |
| Form mục tiêu       | Categorical        | Form Đăng ký                                                                                                |

### Domain Matrix

| TC     | Bàn phím      | Form    | Expected                    |
| ------ | ------------- | ------- | --------------------------- |
| DT-008 | email-address | Đăng ký | ✅ Bàn phím email xuất hiện |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field                         | Value                                            |
| ----------------------------- | ------------------------------------------------ |
| Không cần nhập dữ liệu cụ thể | Chỉ quan sát bàn phím khi focus vào trường Email |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng ký
3. Nhấn (tap) vào trường nhập "Email" để focus
4. Quan sát bàn phím ảo (virtual keyboard) xuất hiện
5. Kiểm tra xem bàn phím có hiển thị phím `@` và `.` trực tiếp hay không

## Expected result

- Khi focus vào trường Email trên form Đăng ký, bàn phím ảo hiển thị dạng email
- Có phím `@` và `.` dễ truy cập
- Tương đương `keyboardType="email-address"` (Web: `type="email"`)

## Actual result

- Khi focus vào trường Email trên form Đăng ký, bàn phím ảo xuất hiện nhưng không có phím `@` và `.` trực tiếp, người dùng phải chuyển sang bàn phím ký tự đặc biệt để nhập các ký tự này.

## Status

FAILED
