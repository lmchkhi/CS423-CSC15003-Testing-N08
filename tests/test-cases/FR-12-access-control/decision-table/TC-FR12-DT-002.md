# TC-FR12-DT-002: API `/api/admin/*` từ chối khi không có token (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R2

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | Y |
| Có token JWT | N |
| Token JWT hợp lệ | - |
| Token có `role = 'admin'` | - |
| Request có tính ảnh hưởng dữ liệu | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép truy cập API Admin | No |
| Trả lỗi xác thực/phiên đăng nhập bắt buộc | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `/api/admin/users` |
| Authorization header | Không gửi |

## Các bước kiểm thử
1. Gửi request `GET http://localhost:3000/api/admin/users` không kèm header `Authorization`.
2. Quan sát response.
3. Kiểm tra danh sách/tài khoản người dùng không bị thay đổi.

## Kết quả mong đợi
Request bị từ chối vì thiếu JWT hợp lệ. API không trả về dữ liệu quản trị và không làm thay đổi dữ liệu.

## Kết quả thực tế
Request bị từ chối đúng như expected:
```http
HTTP/1.1 401 Unauthorized
```

```json
{"error":"Unauthorized"}
```

## Trạng thái / Bug liên quan
Passed / None
