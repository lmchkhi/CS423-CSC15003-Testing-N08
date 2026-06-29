# TC-FR12-PW-007: Category PUT với token admin (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Hoàn thiện ma trận pairwise cho nhóm API ghi dữ liệu với cặp Resource=Category, Method=PUT và Auth state=Valid admin token.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Category |
| Method | PUT |
| Auth state | Valid admin token |

## Tiền điều kiện
- Đăng nhập bằng `admin@eshop.com` / `Admin123!` để lấy token admin.
- Tạo category test riêng `FR12 PW Category Original` để tránh cập nhật dữ liệu mẫu quan trọng.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/categories/6` |
| Body | `{"name":"FR12 PW Category Updated 20260629"}` |
| Authorization header | `Bearer <valid-admin-token>` |

## Các bước kiểm thử
1. Tạo category test `FR12 PW Category Original 20260629` bằng tài khoản admin, nhận id `6`.
2. Gửi request `PUT http://localhost:3000/api/categories/6` với JWT admin và body hợp lệ.
3. Quan sát response.
4. Kiểm tra category test được cập nhật thành `FR12 PW Category Updated 20260629`.

## Kết quả mong đợi
Request vượt qua lớp kiểm soát truy cập của FR-12. Category test được cập nhật theo chức năng Category CRUD; không bị từ chối bởi lỗi thiếu token hoặc không có quyền admin.

## Kết quả thực tế
Request được chấp nhận:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Category updated"}
```

Khi gọi `GET /api/categories`, category id `6` có tên `FR12 PW Category Updated 20260629`. Sau khi ghi nhận bằng chứng, category tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Passed / None
