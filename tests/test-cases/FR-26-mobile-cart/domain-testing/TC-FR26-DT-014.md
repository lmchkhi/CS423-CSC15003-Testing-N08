# TC-FR26-DT-014: Thêm nhiều sản phẩm khác nhau hiển thị nhiều dòng riêng biệt

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `differentProductAdd` | User action / system state | Các sản phẩm khác nhau phải hiển thị thành các dòng riêng biệt trong giỏ. |
| `cartTableColumns` | UI state | Mỗi dòng có đủ thông tin bắt buộc. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `differentProductAdd` | Expected |
|---|---|---|---|
| COND-FR26-DT-014 | Giỏ có iPhone 15 Pro Max và Samsung Galaxy S24 Ultra | EC-DIFFERENTPRODUCT-V01, EC-DIFFERENTPRODUCT-I01 | Hai sản phẩm khác nhau hiển thị thành hai dòng riêng biệt. |

## Preconditions
- Ứng dụng Mobile có thể thêm sản phẩm vào giỏ từ màn danh sách hoặc chi tiết sản phẩm.
- Giỏ hàng ban đầu không có iPhone 15 Pro Max và Samsung Galaxy S24 Ultra.

## Test data

| Field | Value |
|---|---|
| Sản phẩm 1 | iPhone 15 Pro Max |
| Đơn giá sản phẩm 1 | 30000000 |
| Sản phẩm 2 | Samsung Galaxy S24 Ultra |
| Đơn giá sản phẩm 2 | 28000000 |
| Số lượng mỗi sản phẩm | 1 |
| Số dòng mong đợi | 2 |
| Tổng cộng mong đợi | 58000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Thêm iPhone 15 Pro Max vào giỏ.
3. Thêm Samsung Galaxy S24 Ultra vào giỏ.
4. Điều hướng đến màn Giỏ hàng.
5. Quan sát danh sách sản phẩm trong giỏ.

## Expected result
Giỏ hàng hiển thị 2 dòng riêng biệt: một dòng cho iPhone 15 Pro Max và một dòng cho Samsung Galaxy S24 Ultra. Mỗi dòng có đủ thông tin Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác. Tổng cộng phản ánh tổng thành tiền của hai dòng là 58000000.

## Status / Related bugs
Pass / None
