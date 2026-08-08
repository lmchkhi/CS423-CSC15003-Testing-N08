# TC-REG-007: Từ chối email đã tồn tại

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đã tồn tại từ dữ liệu seed.
- Backend đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-007` |

## Test steps

1. Gửi `POST /api/register` với email `test@eshop.com` và các trường còn lại hợp lệ.
2. Ghi nhận mã trạng thái và nội dung phản hồi.

## Expected result

API trả về `409 Conflict`, thông báo email đã tồn tại và không tạo bản ghi trùng.

## Status / Related bugs

Fail / BUG-REG-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7
