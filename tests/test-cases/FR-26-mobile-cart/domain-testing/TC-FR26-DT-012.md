# TC-FR26-DT-012: Giỏ hàng trống hiển thị hình minh họa và thông báo rõ ràng

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `cartState` | System state | Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `mobilePresentation` | Expected |
|---|---|---|---|
| COND-FR26-DT-012 | EC-CARTSTATE-V02, EC-CARTSTATE-I01 | EC-MOBILE-V01 | Giỏ hàng trống hiển thị hình minh họa và thông báo rõ ràng. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng không có sản phẩm nào.

## Test data

| Field | Value |
|---|---|
| Số sản phẩm trong giỏ | 0 |
| Trạng thái giỏ | Trống |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng khi giỏ không có sản phẩm nào.
3. Quan sát nội dung hiển thị trên màn Giỏ hàng.

## Expected result
Màn Giỏ hàng trống hiển thị một hình minh họa và một thông báo rõ ràng cho biết giỏ hàng đang trống. Màn hình không chỉ hiển thị khoảng trắng, không chỉ hiển thị danh sách rỗng, và không hiển thị các dòng sản phẩm không tồn tại.

## Status / Related bugs
Pass / None
