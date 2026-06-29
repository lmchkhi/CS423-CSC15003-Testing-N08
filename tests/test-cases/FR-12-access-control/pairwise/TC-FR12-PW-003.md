# TC-FR12-PW-003: Category POST với token user thường (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Bổ sung cặp Resource=Category và Method=POST với user token, vì decision table chỉ test thành cong POST category bằng admin.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Category |
| Method | POST |
| Auth state | Valid user token |

## Tiền điều kiện
- Đăng nhập bằng `test@eshop.com` / `Test1234!` để lấy token user.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/categories` |
| Body | `{"name":"FR12 PW User Category 20260629"}` |
| Authorization header | `Bearer <valid-user-token>` |

## Các bước kiểm thử
1. Gửi request `POST http://localhost:3000/api/categories` với JWT user và body hợp lệ.
2. Quan sát response.
3. Kiểm tra category `FR12 PW User Category 20260629` không được tạo.

## Kết quả mong đợi
Request bị từ chối vì token không có `role = 'admin'`. Category mới không được tạo.

## Kết quả thực tế
Request với JWT user thường vẫn được thực hiện thành công:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Category created","id":7}
```

Khi gọi `GET /api/categories`, category id `7` có tên `FR12 PW User Category 20260629` xuất hiện trong danh sách. Sau khi ghi nhận bằng chứng, category tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Failed / BUG-FR12-005
