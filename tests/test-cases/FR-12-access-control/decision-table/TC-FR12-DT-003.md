# TC-FR12-DT-003: API `/api/admin/*` từ chối token không hợp lệ (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R3

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | N |
| Token có `role = 'admin'` | - |
| Request có tính ảnh hưởng dữ liệu | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép truy cập API Admin | No |
| Trả lỗi token không hợp lệ/hết hạn | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `/api/admin/orders` |
| Authorization header | `Bearer invalid.jwt.token` |

## Các bước kiểm thử
1. Gửi request `GET http://localhost:3000/api/admin/orders`.
2. Kèm header `Authorization: Bearer invalid.jwt.token`.
3. Quan sát response.

## Kết quả mong đợi
Request bị từ chối vì JWT không hợp lệ. API không trả về dữ liệu đơn hàng toàn hệ thống và không làm thay đổi dữ liệu.

## Kết quả thực tế
Request bị từ chối đúng theo kỳ vọng access-control:
```http
HTTP/1.1 403 Forbidden
```

```json
{"error":"Forbidden"}
```

## Trạng thái / Bug liên quan
Passed / None
