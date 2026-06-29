# TC-FR12-DT-004: API `/api/admin/*` từ chối token user thường (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R4

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | Y |
| Token có `role = 'admin'` | N |
| Request có tính ảnh hưởng dữ liệu | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép truy cập API Admin | No |
| Trả lỗi không có quyền admin | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Đăng nhập thành công bằng `test@eshop.com` / `Test1234!` để lấy token user.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `DELETE` |
| Endpoint | `/api/admin/users/2` |
| Authorization header | `Bearer <valid-user-token>` |

## Các bước kiểm thử
1. Đăng nhập bằng tài khoản user thường và lưu JWT.
2. Gửi request `DELETE http://localhost:3000/api/admin/users/2` với JWT user.
3. Quan sát response.
4. Kiểm tra user có id `2` không bị xóa.

## Kết quả mong đợi
Request bị từ chối vì token không có `role = 'admin'`. User mục tiêu không bị xóa.

## Kết quả thực tế
Reproduced bằng user tạm để tránh ảnh hưởng dữ liệu mẫu:
- Tạo user tạm `fr12-temp-user@example.com`, response trả về `id = 3`.
- Đăng nhập bằng user thường `test@eshop.com`.
- Gửi request `DELETE /api/admin/users/3` với JWT user thường.

Request được thực hiện thành công và có response:
```http
HTTP/1.1 200 OK
```

```json
{"message":"User deleted"}
```

## Trạng thái / Bug liên quan
Failed / BUG-FR12-001
