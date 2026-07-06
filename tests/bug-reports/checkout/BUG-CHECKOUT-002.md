# [BUG][Checkout API] Backend chấp nhận total_amount do client gửi lên

## Found by Test Case
TC-CHECKOUT-UCT-005

## Requirement liên quan
FR-08

## Severity / Priority
Critical / P0

## Environment
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Browser: DevTools Console
- Tài khoản test: `test@eshop.com`
- Test data: giỏ hàng/danh sách sản phẩm có tổng tiền thực tế `450000`, request cố tình gửi `total_amount = 1000`
- Build/commit: local workspace hiện tại

## Steps to reproduce
1. Đăng nhập bằng tài khoản người dùng hợp lệ để lấy JWT token.
2. Chuẩn bị dữ liệu đặt hàng gồm:
   - Áo thun basic x 2, đơn giá `100000`
   - Quần jeans x 1, đơn giá `250000`
3. Xác nhận tổng tiền thực tế của dữ liệu đặt hàng là `450000`.
4. Gửi request `POST /api/checkout` với header `Authorization: Bearer <valid_token>`.
5. Trong request body, cố tình gửi `total_amount` là `1000`.
6. Kiểm tra response checkout.
7. Gọi `GET /api/orders/my-orders` để kiểm tra đơn hàng mới nhất.

## Expected result
Backend không được lưu đơn hàng theo giá trị `total_amount` do client gửi lên. Backend phải tự tính lại tổng tiền từ dữ liệu tin cậy phía server và lưu `450000`, hoặc từ chối request nếu không đủ dữ liệu tin cậy để tính lại.

## Actual result
Backend trả checkout thành công với status `200` và tạo đơn hàng mới. Đơn hàng mới nhất được lưu với `total_amount = 1000`, đúng bằng giá trị đã bị client sửa.

## Evidence
Console result:

```text
checkoutStatus: 200
orderId: 16
latestTotalAmount: 1000
expected: 'Không được lưu total_amount = 1000; phải là 450000 hoặc từ chối request'
pass: false
```

## Labels đề xuất
`Type: Bug`, `Status: New`, `module: checkout`, `module: api`, `severity: critical`, `priority: P0`, `found-by: test-case`
