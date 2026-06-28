# TEST SUMMARY REPORT

## Thông tin chung

| Mục | Giá trị |
| :--- | :--- |
| **Project Name** | EShop Testing (HW02) |
| **Creator** | Trần Minh Quang |
| **Note** | CS423 / CSC13003 -- Black-Box Testing (Domain Testing + BVA) |

## Tổng quan Coverage

| Chỉ số | Giá trị |
| :--- | :--- |
| **Test Coverage:** | 100% (4/4 Requirement được test) |
| **Successful Test Coverage:** | 49.5% (45 Passed / 91 Total) |
| **Date:** | 2026/06/27 |

---

## Bảng tổng hợp kết quả theo Requirement

| No | Requirement ID | Requirement name | Tested | Passed | Failed | Blocked | Skipped | Not Yet Tested | Total | Tested Coverage |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | FR-05 | Xem danh sách và Tìm kiếm sản phẩm | 12 | 4 | 8 | 0 | 0 | 0 | **12** | **33.3%** |
| 2 | FR-08 | Thanh toán (Checkout) | 18 | 3 | 15 | 0 | 0 | 0 | **18** | **16.7%** |
| 3 | FR-12 | Kiểm soát truy cập (Access Control) | 40 | 23 | 17 | 0 | 0 | 0 | **40** | **57.5%** |
| 4 | FR-09 | Mã Giảm Giá (Coupon) -- Mobile App | 21 | 15 | 6 | 0 | 0 | 0 | **21** | **71.4%** |
| | | **Total** | **91** | **45** | **46** | **0** | **0** | **0** | **91** | **49.5%** |

---

## Chi tiết theo kỹ thuật kiểm thử

### Domain Testing (Equivalence Partitioning)

| No | Requirement ID | Requirement name | Tested | Passed | Failed | Total | Pass Rate |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | FR-05 | Xem danh sách và Tìm kiếm sản phẩm | 12 | 4 | 8 | 12 | 33.3% |
| 2 | FR-08 | Thanh toán (Checkout) | 15 | 3 | 12 | 15 | 20.0% |
| 3 | FR-12 | Kiểm soát truy cập (Access Control) | 40 | 23 | 17 | 40 | 57.5% |
| 4 | FR-09 | Mã Giảm Giá (Coupon) -- Mobile App | 10 | 8 | 2 | 10 | 80.0% |
| | | **Total** | **77** | **38** | **39** | **77** | **49.4%** |

### Boundary Value Analysis (BVA)

| No | Requirement ID | Requirement name | Tested | Passed | Failed | Total | Pass Rate |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| 1 | FR-05 | Xem danh sách và Tìm kiếm sản phẩm | 0 | 0 | 0 | 0 | N/A (Skipped) |
| 2 | FR-08 | Thanh toán (Checkout) | 3 | 0 | 3 | 3 | 0.0% |
| 3 | FR-12 | Kiểm soát truy cập (Access Control) | 0 | 0 | 0 | 0 | N/A (Skipped) |
| 4 | FR-09 | Mã Giảm Giá (Coupon) -- Mobile App | 11 | 7 | 4 | 11 | 63.6% |
| | | **Total** | **14** | **7** | **7** | **14** | **50.0%** |

> [!NOTE]
> FR-05 và FR-12 không có biến numerical nên BVA bị bỏ qua theo STRICT BVA RULE.

---

## Tổng hợp Bug phát hiện

| No | Requirement ID | Bug ID | Mô tả ngắn | Mức độ |
| :---: | :---: | :--- | :--- | :---: |
| 1 | FR-05 | BUG-FR05-001 | Thiếu empty state khi không có kết quả tìm kiếm | Minor |
| 2 | FR-05 | BUG-FR05-002 | Tìm kiếm ký tự đặc biệt không trả kết quả/empty state | Minor |
| 3 | FR-05 | BUG-FR05-003 | XSS payload gây lỗi 500, lộ raw DB error | Critical |
| 4 | FR-05 | BUG-FR05-004 | SQL Injection thành công, trả về toàn bộ sản phẩm | Critical |
| 5 | FR-05 | BUG-FR05-005 | Ký hiệu tiền tệ hiển thị 'VND' thay vì ₫ | Minor |
| 6 | FR-05 | BUG-FR05-006 | Thiếu loading indicator khi đang tải dữ liệu | Minor |
| 7 | FR-05 | BUG-FR05-007 | Trang chủ có 2 thẻ h1 thay vì 1 | Trivial |
| 8 | FR-08 | BUG-FR08-001 | Backend tin tưởng `total_amount` từ client, không tự tính lại | Critical |
| 9 | FR-08 | BUG-FR08-002 | Stored XSS qua trường `shipping_address` | Major |
| 10 | FR-08 | BUG-FR08-003 | Thiếu validation cho `shipping_address` (rỗng/missing) | Major |
| 11 | FR-08 | BUG-FR08-004 | Cho phép checkout khi giỏ hàng trống | Major |
| 12 | FR-08 | BUG-FR08-005 | Giỏ hàng không được xóa sau checkout thành công | Major |
| 13 | FR-12 | BUG-FR12-001 | Product API hoàn toàn thiếu middleware xác thực | Critical |
| 14 | FR-12 | BUG-FR12-002 | Admin API thiếu kiểm tra role -- user thường truy cập được | Critical |
| 15 | FR-12 | BUG-FR12-003 | Category API thiếu kiểm tra role | Critical |
| 16 | FR-12 | BUG-FR12-004 | Token không hợp lệ trả 403 thay vì 401 | Minor |
| 17 | FR-09 | BUG-FR09-001 | Lỗi tính giảm giá loại percent -- sai gấp 100 lần | Critical |
| 18 | FR-09 | BUG-FR09-002 | Lỗi off-by-one: `min_order_amount` dùng `>` thay vì `>=` | Major |

### Phân bố Bug theo mức độ

| Mức độ | Số lượng | Tỷ lệ |
| :--- | :---: | :---: |
| **Critical** | 7 | 38.9% |
| **Major** | 6 | 33.3% |
| **Minor** | 4 | 22.2% |
| **Trivial** | 1 | 5.6% |
| **Tổng** | **18** | **100%** |
