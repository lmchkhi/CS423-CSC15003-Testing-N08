# TC-FR12-PW-001: Product PUT với token user thường (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Decision table đã rút gọn nhóm API ghi dữ liệu products/categories/coupons. Vùng này có nhiều resource, method và trạng thái token; nếu chỉ test một endpoint đại diện có thể bỏ sót endpoint ghi dữ liệu chưa được bảo vệ.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Product |
| Method | PUT |
| Auth state | Valid user token |

## Tiền điều kiện
- Đăng nhập bằng `test@eshop.com` / `Test1234!` để lấy token user.
- Tạo product tạm bằng admin để tránh cập nhật dữ liệu mẫu.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/products/7` |
| Body | `{"name":"FR12 PW User Product Updated 20260629","price":120000,"description":"pairwise","imageUrl":"","category_id":1}` |
| Authorization header | `Bearer <valid-user-token>` |

## Các bước kiểm thử
1. Tạo product tạm `FR12 PW User Product Original 20260629` bằng admin, nhận id `7`.
2. Gửi request `PUT http://localhost:3000/api/products/7` với JWT user và body hợp lệ.
3. Quan sát response.
4. Kiểm tra product id `7` không bị cập nhật.

## Kết quả mong đợi
Request bị từ chối vì token không có `role = 'admin'`. Product không bị cập nhật.

## Kết quả thực tế
Request với JWT user thường vẫn được thực hiện thành công:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Product updated"}
```

Khi gọi `GET /api/products?search=FR12%20PW`, product id `7` có tên `FR12 PW User Product Updated 20260629`, chứng tỏ dữ liệu đã bị cập nhật. Sau khi ghi nhận bằng chứng, product tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Failed / BUG-FR12-004
