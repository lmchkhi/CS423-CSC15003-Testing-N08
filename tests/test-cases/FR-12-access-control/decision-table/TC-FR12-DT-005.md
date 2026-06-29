# TC-FR12-DT-005: Admin truy cập được API `/api/admin/*` (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R5

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | Y |
| Token có `role = 'admin'` | Y |
| Request có tính ảnh hưởng dữ liệu | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép truy cập API Admin | Yes |
| Trả lỗi xác thực/phân quyền | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Đăng nhập thành công bằng `admin@eshop.com` / `Admin123!` để lấy token admin.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `/api/admin/orders` |
| Authorization header | `Bearer <valid-admin-token>` |

## Các bước kiểm thử
1. Đăng nhập bằng tài khoản admin và lưu JWT.
2. Gửi request `GET http://localhost:3000/api/admin/orders` với JWT admin.
3. Quan sát response.

## Kết quả mong đợi
Request vượt qua lớp kiểm soát truy cập của FR-12. API trả về kết quả theo chức năng Admin Orders, không bị từ chối bởi lỗi thiếu token hoặc không có quyền admin.

## Kết quả thực tế
Request được chấp nhận:
```http
HTTP/1.1 200 OK
```

```json
[]
```

## Trạng thái / Bug liên quan
Passed / None
