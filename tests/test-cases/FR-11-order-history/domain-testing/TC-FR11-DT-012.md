# TC-FR11-DT-012: Phân biệt trạng thái đơn hàng bằng màu sắc (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Assumptions
- Cần chuẩn bị các đơn hàng của `test@eshop.com` bao phủ các trạng thái `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Order status | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` |
| Status color | UI visual state | Các trạng thái phải phân biệt bằng màu sắc |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có đơn hàng ở các trạng thái cần kiểm tra.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Statuses | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Quan sát màu sắc của nhãn/badge trạng thái trên từng đơn.
4. So sánh các trạng thái khác nhau trong cùng danh sách.

## Expected result
Các trạng thái đơn hàng được trình bày bằng màu sắc đủ khác biệt để user phân biệt trạng thái hiện tại của từng đơn; màu sắc không gây nhầm lẫn giữa các trạng thái.

## Status / Related bugs
Failed / BUG-FR11-012
