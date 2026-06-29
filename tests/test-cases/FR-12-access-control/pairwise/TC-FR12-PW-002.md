# TC-FR12-PW-002: Product DELETE với token admin (Pairwise Testing)

## Requirement ID
FR-12

## Module / Loại kiểm thử / Kỹ thuật
Backend API / Chức năng / Pairwise Testing

## Lý do mở rộng Pairwise
- Bổ sung tương tác resource Product, method DELETE và auth state Admin token sau khi decision table đã gom các API ghi dữ liệu thành rule đại diện.

## Factor Pairwise

| Factor | Value used in this TC |
| --- | --- |
| Resource | Product |
| Method | DELETE |
| Auth state | Valid admin token |

## Tiền điều kiện
- Đăng nhập bằng `admin@eshop.com` / `Admin123!` để lấy token admin.
- Tạo sản phẩm test riêng `FR12 PW Delete Product` để tránh xóa dữ liệu mẫu quan trọng.

## Dữ liệu kiểm thử

| Field | Value |
| --- | --- |
| Endpoint | `/api/products/8` |
| Authorization header | `Bearer <valid-admin-token>` |

## Các bước kiểm thử
1. Tạo sản phẩm test `FR12 PW Delete Product 20260629` bằng tài khoản admin, nhận id `8`.
2. Gửi request `DELETE http://localhost:3000/api/products/8` với JWT admin.
3. Quan sát response.
4. Kiểm tra sản phẩm test đã bị xóa hoặc không còn xuất hiện trong danh sách sản phẩm.

## Kết quả mong đợi
Request vượt qua lớp kiểm soát truy cập của FR-12. Sản phẩm test được xóa theo chức năng Product CRUD; không bị từ chối bởi lỗi thiếu token hoặc không có quyền admin.

## Kết quả thực tế
Request được chấp nhận:
```http
HTTP/1.1 200 OK
```

```json
{"message":"Product deleted"}
```

Sau đó gọi `GET /api/products?search=FR12%20PW` không còn thấy sản phẩm `FR12 PW Delete Product 20260629`.

## Trạng thái / Bug liên quan
Passed / None
