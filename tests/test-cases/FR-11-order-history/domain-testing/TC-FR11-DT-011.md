# TC-FR11-DT-011: Dịch trạng thái đơn hàng sang tiếng Việt rõ ràng (Domain Testing)

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
| Status label | UI text | Phải được dịch sang tiếng Việt rõ ràng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có đơn hàng ở các trạng thái cần kiểm tra.

## Test data

| API status | Expected Vietnamese meaning |
| --- | --- |
| `pending` | Đang chờ xử lý / Chờ xác nhận |
| `confirmed` | Đã xác nhận |
| `shipping` | Đang giao hàng |
| `delivered` | Đã giao hàng / Hoàn tất |
| `canceled` | Đã hủy |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Quan sát nhãn trạng thái của các đơn hàng ở từng trạng thái.
4. Đối chiếu status raw từ API nếu cần.

## Expected result
Giao diện không hiển thị status raw tiếng Anh; mỗi trạng thái được dịch sang tiếng Việt rõ ràng và đúng ý nghĩa nghiệp vụ.

## Status / Related bugs
Passed / None
