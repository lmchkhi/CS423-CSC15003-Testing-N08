<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-006.md -->

# TC-FR22-DT-006: Ký hiệu `*` trên trường bắt buộc — Form Checkout (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable               | Type             | Domain / Constraints                                 |
| ---------------------- | ---------------- | ---------------------------------------------------- |
| Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc phải hiển thị `*` bên cạnh label |
| Form mục tiêu          | Categorical      | Form Checkout (Địa chỉ giao hàng là bắt buộc)        |

### Domain Matrix

| TC     | Ký hiệu `*`       | Form     | Expected                  |
| ------ | ----------------- | -------- | ------------------------- |
| DT-006 | Kiểm tra hiển thị | Checkout | ✅ Trường bắt buộc có `*` |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã đăng nhập
- Giỏ hàng có ít nhất 1 sản phẩm

## Test data

| Field    | Value                           |
| -------- | ------------------------------- |
| Email    | test@eshop.com                  |
| Mật khẩu | Test1234!                       |
| Sản phẩm | Bất kỳ sản phẩm nào, số lượng 1 |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test
3. Thêm 1 sản phẩm bất kỳ vào giỏ hàng
4. Điều hướng đến màn hình Giỏ hàng
5. Nhấn nút Thanh toán / Checkout
6. Quan sát form Checkout
7. Kiểm tra nhãn (label) của trường "Địa chỉ giao hàng" có ký hiệu `*` hay không
8. Kiểm tra các trường bắt buộc khác (nếu có) có ký hiệu `*` hay không

## Expected result

- Trường "Địa chỉ giao hàng" hiển thị nhãn có ký hiệu `*`
- Tất cả trường bắt buộc trên form Checkout đều có ký hiệu `*`

## Actual result

- Không có trường "Địa chỉ giao hàng" hiển thị ký hiệu `*` (trường bắt buộc)
- Không tồn tại trường bắt buộc nào trên form

## Status

FAILED
