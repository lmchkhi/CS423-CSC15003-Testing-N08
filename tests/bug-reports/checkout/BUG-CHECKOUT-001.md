# [BUG][Checkout] Tổng tiền thanh toán có thể chỉnh sửa trực tiếp trên UI

## Found by Test Case
TC-CHECKOUT-UCT-004

## Requirement liên quan
FR-08

## Severity / Priority
Major / P1

## Environment
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Browser: DevTools Console
- Test data: giỏ hàng có tổng tiền ban đầu `58000000`
- Build/commit: local workspace hiện tại

## Steps to reproduce
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Thêm sản phẩm vào giỏ hàng.
3. Mở trang Giỏ hàng.
4. Bấm `Tiến hành thanh toán`.
5. Tại màn hình checkout, tìm trường tổng tiền thanh toán.
6. Đặt con trỏ vào trường tổng tiền và nhập giá trị `1000`.
7. Quan sát giá trị tổng tiền sau khi nhập.

## Expected result
Tổng tiền thanh toán phải được hệ thống tự tính từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp. Nếu tổng tiền được hiển thị bằng input/control, control đó phải ở trạng thái `readonly` hoặc `disabled`.

## Actual result
Tổng tiền thanh toán đang hiển thị bằng input có thể chỉnh sửa. Người dùng có thể đổi tổng tiền từ `58000000` thành `1000`.

## Evidence
Console result:

```text
totalInputExists: true
before: '58000000'
after: '1000'
expected: 'Không có input sửa tổng tiền, hoặc input readonly/disabled'
pass: false
```

## Labels đề xuất
`Type: Bug`, `Status: New`, `module: checkout`, `severity: major`, `priority: P1`, `found-by: test-case`
