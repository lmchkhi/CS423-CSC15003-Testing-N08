# TC-FR12-PW-005: Coupon POST với token admin (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Bổ sung cặp Resource=Coupon và Method=POST với admin token, vì endpoint coupon có đường dẫn trong API specification là `/api/admin/coupons`, trong khi FR-12 cũng nhắc đến nhóm `/api/coupons`.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Coupon |
| Method | POST |
| Auth state | Valid admin token |

## Tiền điều kiện
- Đăng nhập bằng `admin@eshop.com` / `Admin123!` để lấy token admin.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/admin/coupons` |
| Body | `{"code":"FR12PW005","type":"percent","discount_value":5,"min_order_amount":100000,"expired_at":"2099-12-31","max_uses_per_user":1}` |
| Authorization header | `Bearer <valid-admin-token>` |

## Các bước kiểm thử
1. Gửi request `POST http://localhost:3000/api/admin/coupons` với JWT admin và body hợp lệ.
2. Quan sát response.
3. Kiểm tra coupon `FR12PW005` được tạo theo chức năng Coupon CRUD.

## Kết quả mong đợi
Request vượt qua lớp kiểm soát truy cập của FR-12. Coupon mới được tạo; không bị từ chối bởi lỗi thiếu token hoặc không có quyền admin.

## Kết quả thực tế
Request được chấp nhận:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Coupon created","id":7}
```

Khi gọi `GET /api/coupons` bằng admin token, coupon `FR12PW005` xuất hiện trong danh sách. Sau khi ghi nhận bằng chứng, coupon tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Passed / None
