# TC-FR26-DT-001: Hiển thị danh sách sản phẩm trong giỏ hàng trên Mobile

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `cartState` | System state | Giỏ hàng có ít nhất một sản phẩm thì phải hiển thị danh sách sản phẩm. |
| `cartLineDisplay` | UI state | Mỗi dòng phải có Sản phẩm, Đơn giá, Số lượng có nút +/-, Thành tiền, và Thao tác có nút xóa. |
| `totalLabel` | UI text | Nhãn tổng tiền phải là "Tổng cộng". |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `cartLineDisplay` | `totalLabel` | Expected |
|---|---|---|---|---|
| COND-FR26-DT-001 | EC-CARTSTATE-V01: giỏ có 2 sản phẩm | EC-CARTLINE-V01, EC-CARTLINE-I01, EC-QUANTITY-I01: đủ thông tin, nút +/- và Thao tác/nút xóa | EC-TOTALLABEL-V01: "Tổng cộng" | Danh sách giỏ hàng mobile hiển thị đủ thông tin bắt buộc theo FR-07 được FR-26 kế thừa, có nút chỉnh số lượng, nút xóa và nhãn tổng tiền đúng. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có sẵn 2 sản phẩm:
  - Áo thun Basic, đơn giá 120000, số lượng 1.
  - Balo Mini, đơn giá 250000, số lượng 2.

## Test data

| Field | Value |
|---|---|
| Sản phẩm 1 | Áo thun Basic |
| Đơn giá sản phẩm 1 | 120000 |
| Số lượng sản phẩm 1 | 1 |
| Thành tiền sản phẩm 1 | 120000 |
| Thao tác sản phẩm 1 | Có nút xóa |
| Sản phẩm 2 | Balo Mini |
| Đơn giá sản phẩm 2 | 250000 |
| Số lượng sản phẩm 2 | 2 |
| Thành tiền sản phẩm 2 | 500000 |
| Thao tác sản phẩm 2 | Có nút xóa |
| Tổng cộng | 620000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát danh sách sản phẩm trong giỏ hàng.
4. Quan sát từng dòng sản phẩm, khu vực số lượng, thành tiền từng dòng, khu vực Thao tác và khu vực tổng tiền.

## Expected result
Màn Giỏ hàng hiển thị 2 dòng sản phẩm. Mỗi dòng hiển thị tên sản phẩm, đơn giá, số lượng, có nút + và nút -, thành tiền tương ứng, và khu vực Thao tác có nút xóa sản phẩm. Khu vực tổng tiền hiển thị nhãn chính xác "Tổng cộng" với tổng tiền tương ứng 620000. Không hiển thị nhãn "Tổng tạm tính".

## Status / Related bugs
Not Run / None
