# TC-FR26-DT-008: Hiển thị đúng nhãn Tổng cộng trong giỏ hàng

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `totalLabel` | UI text | Tổng tiền phải hiển thị nhãn chính xác "Tổng cộng", không phải "Tổng tạm tính". |
| `cartState` | System state | Giỏ hàng có ít nhất một sản phẩm để có khu vực tổng tiền. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `totalLabel` | Expected |
|---|---|---|---|
| COND-FR26-DT-008 | Giỏ có Áo thun Basic số lượng 1 | EC-TOTALLABEL-V01 và EC-TOTALLABEL-I01 | Khu vực tổng tiền hiển thị đúng "Tổng cộng" và không hiển thị "Tổng tạm tính". |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng Áo thun Basic, đơn giá 120000, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | Áo thun Basic |
| Đơn giá | 120000 |
| Số lượng | 1 |
| Tổng tiền | 120000 |
| Nhãn hợp lệ | Tổng cộng |
| Nhãn không hợp lệ | Tổng tạm tính |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát khu vực hiển thị tổng tiền của giỏ hàng.
4. Kiểm tra text nhãn đứng cạnh hoặc phía trên giá trị tổng tiền.

## Expected result
Khu vực tổng tiền hiển thị nhãn chính xác "Tổng cộng" với giá trị tổng tiền 120000. Màn hình không hiển thị nhãn "Tổng tạm tính" cho tổng tiền giỏ hàng.

## Status / Related bugs
Not Run / None
