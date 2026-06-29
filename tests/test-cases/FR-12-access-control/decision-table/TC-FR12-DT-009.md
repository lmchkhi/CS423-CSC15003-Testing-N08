# TC-FR12-DT-009: Admin thực hiện được API ghi dữ liệu (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R9

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | N |
| Endpoint là API ghi dữ liệu products/categories/coupons | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | Y |
| Token có `role = 'admin'` | Y |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép thao tác ghi dữ liệu | Yes |
| Trả lỗi xác thực/phân quyền | No |
| Dữ liệu hợp lệ được thay đổi | Yes |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Đăng nhập thành công bằng `admin@eshop.com` / `Admin123!` để lấy token admin.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/categories` |
| Body | `{"name":"FR12 Admin Category 20260629"}` |
| Authorization header | `Bearer <valid-admin-token>` |

## Các bước kiểm thử
1. Đăng nhập bằng tài khoản admin và lưu JWT.
2. Gửi request `POST http://localhost:3000/api/categories` với JWT admin và body hợp lệ.
3. Quan sát response.
4. Kiểm tra category `FR12 Admin Category 20260629` được tạo hoặc API trả về kết quả thành công theo chức năng Category CRUD.

## Kết quả mong đợi
Request vượt qua lớp kiểm soát truy cập của FR-12. Với body hợp lệ, category mới được tạo; không bị từ chối bởi lỗi thiếu token hoặc không có quyền admin.

## Kết quả thực tế
Request được chấp nhận:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Category created","id":4}
```

Category tạm đã được dọn sau khi dùng để xác minh `TC-FR12-DT-007`.

## Trạng thái / Bug liên quan
Passed / None
