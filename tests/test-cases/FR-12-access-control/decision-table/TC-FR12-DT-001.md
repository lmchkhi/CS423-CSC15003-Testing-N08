# TC-FR12-DT-001: User thường không truy cập được Web Admin (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Web Admin / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R1

## Điều kiện

| Condition | Value |
| --- | --- |
| Truy cập phân hệ Admin | Y |
| Có token JWT hợp lệ | Y |
| Token có `role = 'admin'` | N |
| Endpoint/API có tính ảnh hưởng dữ liệu | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép vào phân hệ Admin | No |
| Hiển thị/trả về lỗi phân quyền | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống đang chạy.
- Tài khoản user mặc định tồn tại: `test@eshop.com` / `Test1234!`.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Admin URL | `http://localhost:5174` |
| Email | `test@eshop.com` |
| Password | `Test1234!` |

## Các bước kiểm thử
1. Mở Web Admin tại `http://localhost:5174`.
2. Đăng nhập bằng tài khoản user thường.
3. Quan sát trang sau đăng nhập và thử truy cập các chức năng quản trị.

## Kết quả mong đợi
User thường bị từ chối truy cập phân hệ Admin. Hệ thống hiển thị thông báo/redirect phù hợp về việc không có quyền admin; không hiển thị chức năng quản trị và không làm thay đổi dữ liệu.

## Trạng thái / Bug liên quan
Passed / None
