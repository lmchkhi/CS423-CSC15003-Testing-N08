<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-019.md -->

# TC-FR22-DT-019: Không có Step Indicator — Form 1 bước Đăng nhập (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable       | Type             | Domain / Constraints                                                                     |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| Step Indicator | Boolean / Visual | Form 1 bước không cần Step Indicator (negative test — xác nhận không hiện khi không cần) |
| Form mục tiêu  | Categorical      | Form Đăng nhập (1 bước)                                                                  |

### Domain Matrix

| TC     | Step Indicator          | Form      | Số bước | Expected                          |
| ------ | ----------------------- | --------- | ------- | --------------------------------- |
| DT-019 | Kiểm tra không hiển thị | Đăng nhập | 1       | ✅ Không có Step Indicator (đúng) |

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
3. Quan sát toàn bộ giao diện form Đăng nhập
4. Kiểm tra xem có Step Indicator (chỉ báo bước) nào hiển thị hay không

## Expected result

- Form Đăng nhập (1 bước) KHÔNG hiển thị Step Indicator
- Không có "Bước 1/1", không có progress dots hoặc step bar
- Đây là hành vi đúng vì form chỉ có 1 bước, không cần chỉ báo bước

## Actual result

- Form Đăng nhập (1 bước) KHÔNG hiển thị Step Indicator

## Status

FAILED
