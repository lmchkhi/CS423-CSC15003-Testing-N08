# TC-FR12-DT-007: API ghi dữ liệu từ chối token không hợp lệ (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R7

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | N |
| Endpoint là API ghi dữ liệu products/categories/coupons | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | N |
| Token có `role = 'admin'` | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép thao tác ghi dữ liệu | No |
| Trả lỗi token không hợp lệ/hết hạn | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Tạo category tạm bằng admin để tránh sửa dữ liệu mẫu.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `PUT` |
| Endpoint | `/api/categories/4` |
| Body | `{"name":"FR12 Invalid Token Category 20260629"}` |
| Authorization header | `Bearer invalid.jwt.token` |

## Các bước kiểm thử
1. Tạo category tạm `FR12 Admin Category 20260629` bằng admin, nhận id `4`.
2. Gửi request `PUT http://localhost:3000/api/categories/4`.
3. Kèm header `Authorization: Bearer invalid.jwt.token`.
4. Quan sát response.
5. Kiểm tra tên category id `4` không bị đổi thành `FR12 Invalid Token Category 20260629`.

## Kết quả mong đợi
Request bị từ chối vì JWT không hợp lệ. Category không bị cập nhật.

## Kết quả thực tế
Request bị từ chối đúng như expected:
```http
HTTP/1.1 403 Forbidden
```

```json
{"error":"Forbidden"}
```

Danh sách category vẫn giữ tên `FR12 Admin Category 20260629`; sau khi kiểm tra, dữ liệu tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Passed / None
