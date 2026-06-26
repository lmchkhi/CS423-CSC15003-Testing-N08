<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-018.md -->

# TC-FR22-DT-018: Step Indicator — Form Quên mật khẩu 2 bước (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable       | Type             | Domain / Constraints                                                 |
| -------------- | ---------------- | -------------------------------------------------------------------- |
| Step Indicator | Boolean / Visual | Form có ≥ 2 bước phải hiển thị chỉ báo bước (Step Indicator) rõ ràng |
| Form mục tiêu  | Categorical      | Form Quên mật khẩu (2 bước: Nhập Email → Đặt lại MK)                 |

### Domain Matrix

| TC     | Step Indicator    | Form    | Số bước | Expected                     |
| ------ | ----------------- | ------- | ------- | ---------------------------- |
| DT-018 | Kiểm tra hiển thị | Quên MK | 2       | ✅ Có Step Indicator rõ ràng |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng ở màn hình Đăng nhập

## Test data

| Field | Value          |
| ----- | -------------- |
| Email | test@eshop.com |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn liên kết "Quên mật khẩu"
4. **Bước 1:** Quan sát màn hình Quên mật khẩu — Bước 1 (Nhập Email)
5. Kiểm tra xem có Step Indicator hiển thị (ví dụ: "Bước 1/2", progress dots, hoặc step bar) hay không
6. Nhập email `test@eshop.com` và gửi yêu cầu OTP
7. **Bước 2:** Quan sát màn hình Đặt lại mật khẩu — Bước 2
8. Kiểm tra xem Step Indicator có cập nhật sang bước 2 (ví dụ: "Bước 2/2") hay không

## Expected result

- **Bước 1:** Màn hình hiển thị Step Indicator rõ ràng chỉ ra đang ở Bước 1 (ví dụ: "Bước 1/2", dot indicator, progress bar)
- **Bước 2:** Step Indicator cập nhật thành Bước 2 (ví dụ: "Bước 2/2")
- Step Indicator phải dễ nhận biết và giúp người dùng hiểu đang ở bước nào trong quy trình

## Actual result

- Không hiển thị Step Indicator trên cả hai bước của Form Quên mật khẩu.

## Status

FAILED
