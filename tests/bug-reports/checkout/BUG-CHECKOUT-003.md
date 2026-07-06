# [BUG][Checkout] Giỏ hàng không được xóa sau khi thanh toán thành công

## Found by Test Case
TC-CHECKOUT-UCT-006

## Requirement liên quan
FR-08

## Severity / Priority
Major / P1

## Environment
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Browser: DevTools Console
- Trạng thái ban đầu: người dùng đã đăng nhập, giỏ hàng có sản phẩm, checkout xử lý thành công
- Build/commit: local workspace hiện tại

## Steps to reproduce
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Thêm ít nhất một sản phẩm vào giỏ hàng.
3. Mở trang Giỏ hàng.
4. Bấm `Tiến hành thanh toán`.
5. Bấm `Xác Nhận Thanh Toán`.
6. Chờ hệ thống hiển thị thông báo thanh toán thành công.
7. Quay lại trang chủ.
8. Mở lại trang Giỏ hàng.
9. Kiểm tra trạng thái giỏ hàng sau thanh toán.

## Expected result
Sau khi thanh toán thành công, giỏ hàng của người dùng phải được xóa. Khi mở lại trang Giỏ hàng, hệ thống phải hiển thị trạng thái giỏ hàng trống và không còn sản phẩm vừa thanh toán.

## Actual result
Hệ thống hiển thị thanh toán thành công, nhưng khi quay lại trang Giỏ hàng thì giỏ hàng vẫn chưa trống.

## Evidence
Console result:

```text
successShown: true
cartEmpty: false
expected: 'Thanh toán thành công và giỏ hàng trống'
pass: false
```

## Labels đề xuất
`Type: Bug`, `Status: New`, `module: checkout`, `severity: major`, `priority: P1`, `found-by: test-case`
