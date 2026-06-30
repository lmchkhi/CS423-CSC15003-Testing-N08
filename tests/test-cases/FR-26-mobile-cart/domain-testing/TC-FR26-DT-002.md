# TC-FR26-DT-002: Hiển thị đúng nhãn Đơn giá trong giỏ hàng trên Mobile

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `unitPriceLabel` | UI text | Nhãn đơn giá phải thể hiện đúng là "Đơn giá". |
| `cartState` | System state | Giỏ hàng có ít nhất một sản phẩm để quan sát nhãn đơn giá. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `unitPriceLabel` | Expected |
|---|---|---|---|
| COND-FR26-DT-002 | Giỏ có iPhone 15 Pro Max | EC-UNITPRICE-V01, EC-UNITPRICE-I01 | Nhãn đơn giá hiển thị đúng "Đơn giá", không hiển thị nhãn sai nghĩa. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng sản phẩm iPhone 15 Pro Max.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Nhãn hợp lệ | Đơn giá |
| Nhãn không hợp lệ | Giá |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát nhãn hoặc tiêu đề ứng với giá của sản phẩm.

## Expected result
Khu vực giá của sản phẩm hiển thị nhãn đúng là "Đơn giá". Màn hình không dùng nhãn gây sai nghĩa như "Giá" thay cho yêu cầu "Đơn giá".

## Status / Related bugs
Fail / Pending
