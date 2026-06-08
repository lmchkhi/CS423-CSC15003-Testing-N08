# TC-LOGIN-002: Đăng nhập thất bại do Email sai định dạng

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Domain Testing

## Preconditions
- User đang ở trang Login.

## Test data
| Email | test.eshop.com (Thiếu @) |
| Password | Test1234! |

## Test steps
1. Mở trang Login.
2. Nhập Email: `test.eshop.com`
3. Nhập Password: `Test1234!`
4. Bấm nút "Đăng nhập".

## Expected result
- Trình duyệt/Client báo lỗi validation HTML5 (`type="email"`).
- Không gọi API gửi dữ liệu lên server.

## Status / Related bugs
Fail / #1
