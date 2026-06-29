# TC-FR12-DT-010: API đọc công khai không bị bắt buộc quyền admin (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R10

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | N |
| Endpoint là API ghi dữ liệu products/categories/coupons | N |
| Có token JWT | N |
| Token JWT hợp lệ | - |
| Token có `role = 'admin'` | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Áp dụng bắt buộc quyền admin theo FR-12 | No |
| Từ chối chỉ vì thiếu role admin | No |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `GET` |
| Endpoint | `/api/products` |
| Authorization header | Không gửi |

## Các bước kiểm thử
1. Gửi request `GET http://localhost:3000/api/products` không kèm token.
2. Quan sát response.

## Kết quả mong đợi
Request không bị từ chối chỉ vì thiếu quyền admin, vì endpoint đọc danh sách sản phẩm không nằm trong phạm vi bắt buộc admin của FR-12. API trả về kết quả theo FR-05 hoặc lỗi khác không liên quan đến admin access control.

## Kết quả thực tế
Request không có token vẫn được chấp nhận cho API đọc công khai:
```http
HTTP/1.1 200 OK
```

Response trả về danh sách sản phẩm.

## Trạng thái / Bug liên quan
Passed / None
