# TC-FR26-DT-003: Cột Số lượng có nút + và nút - để chỉnh

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `quantityControl` | UI control | Khu vực Số lượng phải có nút + và nút -. |
| `cartState` | System state | Giỏ hàng có sản phẩm để quan sát control số lượng. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `quantityControl` | Expected |
|---|---|---|---|
| COND-FR26-DT-003 | Giỏ có iPhone 15 Pro Max | EC-QUANTITYCTRL-V01, EC-QUANTITYCTRL-I01 | Khu vực Số lượng hiển thị cả nút + và nút -. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng sản phẩm iPhone 15 Pro Max với số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Số lượng hiện tại | 1 |
| Control bắt buộc | Nút + và nút - |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát khu vực Số lượng của dòng iPhone 15 Pro Max.

## Expected result
Khu vực Số lượng hiển thị giá trị số lượng hiện tại kèm nút + và nút - để người dùng có thể chỉnh số lượng. Không chỉ hiển thị số lượng dạng text không thể chỉnh.

## Status / Related bugs
Fail / Pending
