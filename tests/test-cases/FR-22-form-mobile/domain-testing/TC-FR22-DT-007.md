<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-007.md -->

# TC-FR22-DT-007: Bàn phím Email — Form Đăng nhập (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable            | Type               | Domain / Constraints                                                                                        |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Kiểu bàn phím Email | Categorical / Prop | Trường Email phải kích hoạt bàn phím email (`keyboardType="email-address"`). Web equivalent: `type="email"` |
| Form mục tiêu       | Categorical        | Form Đăng nhập                                                                                              |

### Domain Matrix

| TC     | Bàn phím      | Form      | Expected                                    |
| ------ | ------------- | --------- | ------------------------------------------- |
| DT-007 | email-address | Đăng nhập | ✅ Bàn phím email xuất hiện (có `@` và `.`) |

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
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn (tap) vào trường nhập "Email" để focus
4. Quan sát bàn phím ảo (virtual keyboard) xuất hiện
5. Kiểm tra xem bàn phím có hiển thị phím `@` và `.` trực tiếp (không cần chuyển sang bàn phím ký tự đặc biệt) hay không

## Expected result

- Khi focus vào trường Email, bàn phím ảo hiển thị dạng email (có phím `@` và `.` dễ truy cập)
- Tương đương với `keyboardType="email-address"` trong React Native (Web: `type="email"`)
- Bàn phím không viết hoa chữ cái đầu tự động (autoCapitalize off)

## Actual result

- Khi focus vào trường Email, bàn phím ảo xuất hiện nhưng không có phím `@` và `.` trực tiếp, người dùng phải chuyển sang bàn phím ký tự đặc biệt để nhập các ký tự này.

## Status

FAILED
