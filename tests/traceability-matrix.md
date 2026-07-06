# Traceability Matrix

## Phạm vi
Ma trận này dùng để truy vết yêu cầu FR-08 với các test case đã thiết kế cho module Checkout.

| Requirement | Test case | Module | Mục tiêu kiểm thử | Result | Related bug | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FR-08 | TC-CHECKOUT-UCT-001 | Checkout | Chặn thanh toán khi người dùng chưa đăng nhập từ giao diện | Not Run | None | Ready |
| FR-08 | TC-CHECKOUT-UCT-002 | Checkout API | Từ chối request checkout khi không có token hợp lệ | Not Run | None | Ready |
| FR-08 | TC-CHECKOUT-UCT-003 | Checkout UI | Hiển thị đầy đủ danh sách sản phẩm đặt mua | Not Run | None | Ready |
| FR-08 | TC-CHECKOUT-UCT-004 | Checkout UI | Tổng tiền được tính tự động và không cho sửa trực tiếp | Not Run | None | Ready |
| FR-08 | TC-CHECKOUT-UCT-005 | Checkout API | Backend không chấp nhận `total_amount` do client tự sửa | Not Run | None | Ready |
| FR-08 | TC-CHECKOUT-UCT-006 | Checkout | Xóa giỏ hàng sau khi thanh toán thành công | Not Run | None | Ready |

## Ghi chú
Khi execute test case, cập nhật cột `Result` theo trạng thái thực tế: `Pass`, `Fail`, `Blocked` hoặc `Not Run`. Nếu kết quả là `Fail` hoặc `Blocked`, cần bổ sung mã bug tương ứng vào cột `Related bug`.
