# [BUG][Order History] Người dùng có thể hủy đơn đang giao

## Found by Test Case
GUI-039

## Requirement liên quan
FR-10

## Severity / Priority
Major / P1

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5173/profile
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Chuẩn bị đơn của người dùng ở trạng thái `shipping`.
2. Mở `/profile`.
3. Bấm “Hủy đơn” trên dòng “Đang giao”.

## Expected result
Không hiển thị hành động tự hủy cho đơn `shipping`; server từ chối chuyển đổi này.

## Actual result
Nút “Hủy đơn” vẫn hiển thị và thao tác thành công; dòng đơn chuyển từ “Đang giao” sang “Đã hủy”.

## Evidence
![Evidence](../gui-testing/evidence/order-shipping-shows-cancel.png)
