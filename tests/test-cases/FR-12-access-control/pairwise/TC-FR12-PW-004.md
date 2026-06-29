# TC-FR12-PW-004: Category DELETE khi không có token (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Bổ sung cặp Resource=Category và Method=DELETE với auth state không token, vì rule thiếu token trong decision table chỉ dùng Product POST làm đại diện.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Category |
| Method | DELETE |
| Auth state | No token |

## Tiền điều kiện
- Tạo category tạm bằng admin để tránh xóa dữ liệu mẫu.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/categories/5` |
| Authorization header | Không gửi |

## Các bước kiểm thử
1. Tạo category tạm `FR12 PW Delete Category 20260629` bằng admin, nhận id `5`.
2. Gửi request `DELETE http://localhost:3000/api/categories/5` không kèm token.
3. Quan sát response.
4. Kiểm tra category id `5` không bị xóa.

## Kết quả mong đợi
Request bị từ chối vì thiếu JWT hợp lệ. Category không bị xóa.

## Kết quả thực tế
Request không token bị từ chối:
```http
HTTP/1.1 401 Unauthorized
```

```json
{"error":"Unauthorized"}
```

Khi gọi `GET /api/categories`, category id `5` vẫn tồn tại. Sau khi ghi nhận bằng chứng, category tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Passed / None
