# TC-FR12-DT-008: API ghi dữ liệu từ chối token user thường (Decision Table Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Decision Table Testing

## Luật quyết định
Rule ID: R8

## Điều kiện

| Condition | Value |
| --- | --- |
| Endpoint thuộc API ghi dữ liệu coupon | Y |
| Có token JWT | Y |
| Token JWT hợp lệ | Y |
| Token có `role = 'admin'` | N |

## Hành động / Kết quả mong đợi

| Action | Expected |
| --- | --- |
| Cho phép thao tác ghi dữ liệu | No |
| Trả lỗi không có quyền admin | Yes |
| Dữ liệu hệ thống thay đổi | No |

## Tiền điều kiện
- Hệ thống backend đang chạy tại `http://localhost:3000`.
- Đăng nhập thành công bằng `test@eshop.com` / `Test1234!` để lấy token user.
- Tạo coupon tạm bằng admin để tránh xóa dữ liệu mẫu.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Method | `DELETE` |
| Endpoint theo test ban đầu | `/api/coupons/5` |
| Endpoint theo API specification | `/api/admin/coupons/5` |
| Authorization header | `Bearer <valid-user-token>` |

## Các bước kiểm thử
1. Tạo coupon tạm `FR12DT008` bằng admin, nhận id `5`.
2. Đăng nhập bằng tài khoản user thường và lưu JWT.
3. Gửi request `DELETE http://localhost:3000/api/coupons/5` với JWT user.
4. Vì endpoint trên không tồn tại trong SUT, gửi thêm request theo API specification: `DELETE http://localhost:3000/api/admin/coupons/5` với JWT user.
5. Quan sát response.
6. Kiểm tra danh sách coupon.

## Kết quả mong đợi
Request ghi dữ liệu coupon phải bị từ chối vì token không có `role = 'admin'`. Coupon không bị xóa.

## Kết quả thực tế
Endpoint theo test ban đầu không tồn tại:
```http
HTTP/1.1 404 Not Found
```

```html
Cannot DELETE /api/coupons/5
```

Endpoint xóa coupon theo API specification lại chấp nhận JWT của user thường:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Coupon deleted"}
```

Sau khi ghi nhận bằng chứng, coupon tạm không còn trong danh sách coupon.

## Trạng thái / Bug liên quan
Failed / BUG-FR12-003
