# TC-FR12-PW-006: Coupon PUT khi không có token (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Bổ sung cặp Resource=Coupon và Method=PUT với auth state không token, do decision table đã rút gọn nhóm API ghi dữ liệu thành các rule đại diện.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Coupon |
| Method | PUT |
| Auth state | No token |

## Tiền điều kiện
- Tạo coupon tạm bằng admin để tránh cập nhật dữ liệu mẫu.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/coupons/6` |
| Body | `{"code":"FR12PWN","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` |
| Authorization header | Không gửi |

## Các bước kiểm thử
1. Tạo coupon tạm `FR12PW006` bằng admin, nhận id `6`.
2. Gửi request `PUT http://localhost:3000/api/coupons/6` không kèm token.
3. Quan sát response.
4. Kiểm tra coupon id `6` không bị cập nhật thành `FR12PWN`.

## Kết quả mong đợi
Request bị từ chối vì thiếu JWT hợp lệ. Coupon không bị cập nhật.

## Kết quả thực tế
Endpoint `PUT /api/coupons/6` không tồn tại trong SUT:
```http
HTTP/1.1 404 Not Found
```

```html
Cannot PUT /api/coupons/6
```

Coupon id `6` vẫn giữ code `FR12PW006` khi kiểm tra bằng `GET /api/coupons`. Vì route không tồn tại, test case không đánh giá được access-control của `PUT /api/coupons/:id`. Sau khi ghi nhận bằng chứng, coupon tạm đã được dọn bằng tài khoản admin.

## Trạng thái / Bug liên quan
Blocked / None
