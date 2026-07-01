# TC-FR26-DT-001: Hiển thị danh sách sản phẩm trong giỏ hàng với đủ thông tin trên Mobile

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `cartState` | System state | Giỏ hàng có ít nhất một sản phẩm thì phải hiển thị danh sách sản phẩm. |
| `cartTableColumns` | UI state | Danh sách phải thể hiện đủ Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `cartTableColumns` | Expected |
|---|---|---|---|
| COND-FR26-DT-001 | EC-CARTSTATE-V01: giỏ có 1 sản phẩm | EC-COLUMNS-V01, EC-COLUMNS-I01 | Danh sách giỏ hàng mobile hiển thị đủ 5 thông tin bắt buộc. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng sản phẩm iPhone 15 Pro Max.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng | 1 |
| Thành tiền | 30000000 |
| Thao tác | Có nút xóa |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát dòng sản phẩm trong danh sách giỏ hàng.

## Expected result
Màn Giỏ hàng hiển thị dòng iPhone 15 Pro Max với đủ thông tin Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác. Không thiếu thông tin bắt buộc của dòng sản phẩm.

## Status / Related bugs
Pass / None
