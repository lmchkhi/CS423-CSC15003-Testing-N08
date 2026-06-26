<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-001.md -->

# TC-FR22-DT-001: Ký hiệu `*` trên trường bắt buộc — Form Đăng nhập (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable               | Type             | Domain / Constraints                                 |
| ---------------------- | ---------------- | ---------------------------------------------------- |
| Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc phải hiển thị `*` bên cạnh label |
| Form mục tiêu          | Categorical      | Form Đăng nhập (Email, Mật khẩu)                     |

### Domain Matrix

| TC     | Ký hiệu `*`       | Form      | Expected                         |
| ------ | ----------------- | --------- | -------------------------------- |
| DT-001 | Kiểm tra hiển thị | Đăng nhập | ✅ Tất cả trường bắt buộc có `*` |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field                  | Value                  |
| ---------------------- | ---------------------- |
| Không cần nhập dữ liệu | Chỉ quan sát giao diện |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Quan sát nhãn (label) của trường "Email"
4. Quan sát nhãn (label) của trường "Mật khẩu"
5. Kiểm tra xem ký hiệu `*` có xuất hiện bên cạnh mỗi nhãn trường bắt buộc hay không

## Expected result

- Trường "Email" hiển thị nhãn có ký hiệu `*` (ví dụ: "Email _" hoặc "Email" kèm dấu `_` màu đỏ)
- Trường "Mật khẩu" hiển thị nhãn có ký hiệu `*`
- Ký hiệu `*` phải rõ ràng, dễ nhận biết

## Actual result

- Trường "Email" và "Mật khẩu" đều không hiển thị nhãn có ký hiệu `*`

## Status

FAILED
