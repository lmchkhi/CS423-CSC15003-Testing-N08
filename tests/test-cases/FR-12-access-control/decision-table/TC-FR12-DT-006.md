# TC-FR12-DT-006: API ghi dữ liệu từ chối khi không có token (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R6

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc `/api/admin/*` | N |
| Endpoint là API ghi dữ liệu products/categories/coupons | Y |
| Có token JWT | N |
| Token JWT hợp lệ | - |
| Token có `role = 'admin'` | - |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép thao tác ghi dữ liệu | No |
| Trả lỗi xác thực/phiên đăng nhập bắt buộc | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Category id `1` tồn tại.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `POST` |
| Endpoint | `/api/products` |
| Body | `{"name":"FR12 No Token Product 20260629","price":100000,"description":"access control test","imageUrl":"","category_id":1}` |
| Authorization header | Không gửi |

## Các bước kiểm thử
1. Gửi request `POST http://localhost:3000/api/products` với body hợp lệ.
2. Không gửi header `Authorization`.
3. Quan sát response.
4. Kiểm tra sản phẩm `FR12 No Token Product 20260629` không được tạo.

## Kết quả mong đợi
Request bị từ chối vì thiếu JWT hợp lệ. Sản phẩm mới không được tạo.

## Kết quả thực tế
Request không có token vẫn được thực hiện thành công:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Product created","id":6}
```

Khi gọi `GET /api/products?search=FR12%20No%20Token%20Product%2020260629`, sản phẩm id `6` xuất hiện trong danh sách. Sau khi ghi nhận bằng chứng, dữ liệu tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Failed / BUG-FR12-002
