# Phân tích Domain Testing — FR-26: Giỏ hàng trên Mobile

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-26 |
| Tên chức năng | Giỏ hàng trên Mobile |
| Actor | Người dùng ứng dụng Mobile |
| Preconditions | Ứng dụng Mobile có dữ liệu giỏ hàng để hiển thị. Trạng thái đăng nhập của người dùng đối với màn giỏ hàng: Chưa được đặc tả trong FR-26. |
| Input | Trạng thái giỏ hàng, sản phẩm được thêm vào giỏ, thao tác tăng/giảm số lượng, thao tác xóa sản phẩm, lựa chọn xác nhận hoặc hủy trong dialog xóa, thao tác Tiếp tục mua sắm. |
| Output | Danh sách sản phẩm trong giỏ, thông tin Sản phẩm/Đơn giá/Số lượng/Thành tiền/Thao tác, nút +/- để chỉnh số lượng, nút xóa sản phẩm, dialog xác nhận xóa, nút Tiếp tục mua sắm, nhãn "Tổng cộng", empty state có hình minh họa và thông báo rõ ràng. |
| Business rules | Ứng dụng Mobile phải hỗ trợ Giỏ hàng tương đương FR-07. Vì vậy FR-26 kế thừa đầy đủ các yêu cầu của FR-07 trên giao diện Mobile. |
| Validation rules | Không có validation field cụ thể được đặc tả cho FR-26. Lower boundary của số lượng được xử lý trong BVA riêng. |
| Dependency | FR-07 là requirement tương đương trên Web. `requirements/api-specification.md` chỉ dùng để kiểm tra tính nhất quán kỹ thuật, không đưa chi tiết kỹ thuật triển khai hoặc công cụ kiểm thử vào analysis/test case. |
| Success condition | Người dùng xem và thao tác giỏ hàng trên Mobile đúng các thông tin và hành vi được đặc tả. |
| Error conditions | Thiếu thông tin bắt buộc trong dòng sản phẩm, tạo dòng mới khi thêm trùng sản phẩm, xóa sản phẩm không có dialog xác nhận, hiển thị sai nhãn tổng tiền, tính sai thành tiền/tổng tiền, empty state thiếu hình minh họa hoặc thiếu thông báo rõ ràng. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Requirement source |
|---|---|---|---|---|
| `cartState` | System state | Có | Giỏ hàng có sản phẩm hoặc giỏ hàng trống. Khi có sản phẩm, danh sách phải hiển thị thông tin bắt buộc. Khi trống, phải có hình minh họa và thông báo rõ ràng trên giao diện mobile. | FR-26, FR-07 |
| `cartTableColumns` | UI state | Có khi giỏ có sản phẩm | Danh sách giỏ hàng phải thể hiện đủ 5 thông tin/cột: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. | FR-26, FR-07 |
| `unitPriceLabel` | UI text | Có khi giỏ có sản phẩm | Nhãn/tiêu đề cho đơn giá phải thể hiện đúng là "Đơn giá" theo requirement, không thay bằng nhãn khác gây sai nghĩa. | FR-26, FR-07 |
| `quantityControl` | UI control | Có khi giỏ có sản phẩm | Khu vực Số lượng phải có nút + và nút - để chỉnh. | FR-26, FR-07 |
| `quantityAdjustment` | User action | Có khi giỏ có sản phẩm | Bấm + làm tăng số lượng; bấm - làm giảm số lượng khi số lượng đang lớn hơn 1. Hành vi khi số lượng bằng 1 được kiểm tra bằng BVA và vẫn cần xác nhận chi tiết. | FR-26, FR-07 |
| `sameProductAdd` | User action / system state | Có | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng của dòng hiện có, không tạo dòng mới. | FR-26, FR-07 |
| `differentProductAdd` | User action / system state | Có | Thêm các sản phẩm khác nhau thì giỏ hàng hiển thị các dòng riêng biệt tương ứng. | FR-26, FR-07, suy ra từ danh sách sản phẩm trong giỏ |
| `lineSubtotal` | Calculated UI value | Có khi giỏ có sản phẩm | Thành tiền của dòng phản ánh Đơn giá × Số lượng. | FR-26, FR-07, suy ra từ ý nghĩa Thành tiền |
| `deleteAction` | User action | Có khi giỏ có sản phẩm | Có nút xóa sản phẩm khỏi giỏ hàng. Hệ thống phải hiển thị dialog xác nhận trước khi xóa. | FR-26, FR-07 |
| `deleteConfirmationChoice` | User choice | Có khi chọn xóa | Người dùng xác nhận thì sản phẩm bị xóa; người dùng hủy thì sản phẩm không bị xóa. Tên nút cụ thể chưa được đặc tả. | FR-26, FR-07, suy ra từ dialog xác nhận |
| `totalLabel` | UI text | Có | Tổng tiền phải hiển thị nhãn chính xác là "Tổng cộng"; không được hiển thị "Tổng tạm tính". | FR-26, FR-07 |
| `continueShoppingAction` | User action | Có | Có nút Tiếp tục mua sắm để quay về trang chủ. | FR-26, FR-07 |
| `mobilePresentation` | UI context | Có | Các trạng thái và thao tác phải thể hiện trên giao diện mobile. Kích thước màn hình, thiết bị, hệ điều hành, orientation: Chưa được đặc tả. | FR-26 |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-CARTSTATE-V01 | `cartState` | Giỏ hàng có ít nhất một sản phẩm và hiển thị danh sách sản phẩm. | Valid | Giỏ có iPhone 15 Pro Max | FR-26, FR-07 | |
| EC-CARTSTATE-V02 | `cartState` | Giỏ hàng trống và hiển thị empty state. | Valid | Giỏ không có sản phẩm | FR-26, FR-07 | Phải có hình minh họa và thông báo rõ ràng. |
| EC-CARTSTATE-I01 | `cartState` | Giỏ hàng trống nhưng không hiển thị đủ empty state. | Invalid | Màn hình trống hoặc chỉ có khoảng trắng | FR-26, FR-07 | |
| EC-COLUMNS-V01 | `cartTableColumns` | Danh sách hiển thị đủ Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. | Valid | Một dòng iPhone 15 Pro Max có đủ 5 thông tin | FR-26, FR-07 | |
| EC-COLUMNS-I01 | `cartTableColumns` | Thiếu ít nhất một thông tin/cột bắt buộc. | Invalid | Thiếu Thành tiền hoặc thiếu Thao tác | FR-26, FR-07 | |
| EC-UNITPRICE-V01 | `unitPriceLabel` | Nhãn đơn giá hiển thị đúng "Đơn giá". | Valid | "Đơn giá" | FR-26, FR-07 | |
| EC-UNITPRICE-I01 | `unitPriceLabel` | Nhãn đơn giá sai hoặc gây nhầm nghĩa. | Invalid | "Giá" hoặc nhãn khác | FR-26, FR-07 | |
| EC-QUANTITYCTRL-V01 | `quantityControl` | Khu vực số lượng có cả nút + và nút -. | Valid | Có nút + và nút - cạnh số lượng | FR-26, FR-07 | |
| EC-QUANTITYCTRL-I01 | `quantityControl` | Thiếu nút + hoặc nút -, hoặc số lượng chỉ hiển thị dạng text không chỉnh được. | Invalid | Chỉ có số lượng dạng text | FR-26, FR-07 | |
| EC-QUANTITY-V01 | `quantityAdjustment` | Bấm nút + làm tăng số lượng sản phẩm trong giỏ. | Valid | Số lượng 1 thành 2 | FR-26, FR-07 | |
| EC-QUANTITY-V02 | `quantityAdjustment` | Bấm nút - làm giảm số lượng khi số lượng đang lớn hơn 1. | Valid | Số lượng 2 thành 1 | FR-26, FR-07 | |
| EC-SAMEPRODUCT-V01 | `sameProductAdd` | Thêm cùng một sản phẩm làm tăng số lượng dòng hiện có. | Valid | Thêm iPhone 15 Pro Max lần 2, số lượng từ 1 thành 2 | FR-26, FR-07 | |
| EC-SAMEPRODUCT-I01 | `sameProductAdd` | Thêm cùng một sản phẩm tạo thêm dòng mới cho cùng sản phẩm. | Invalid | Có 2 dòng iPhone 15 Pro Max riêng biệt | FR-26, FR-07 | |
| EC-DIFFERENTPRODUCT-V01 | `differentProductAdd` | Thêm hai sản phẩm khác nhau thì hiển thị hai dòng riêng biệt. | Valid | iPhone 15 Pro Max và Samsung Galaxy S24 Ultra | FR-26, FR-07 | |
| EC-DIFFERENTPRODUCT-I01 | `differentProductAdd` | Các sản phẩm khác nhau bị gộp sai hoặc thiếu một dòng. | Invalid | Chỉ hiển thị một dòng dù đã thêm hai sản phẩm khác nhau | FR-26, FR-07 | |
| EC-LINESUBTOTAL-V01 | `lineSubtotal` | Thành tiền bằng Đơn giá × Số lượng. | Valid | 30000000 × 3 = 90000000 | FR-26, FR-07 | Suy ra từ ý nghĩa Thành tiền. |
| EC-LINESUBTOTAL-I01 | `lineSubtotal` | Thành tiền không phản ánh Đơn giá × Số lượng. | Invalid | Số lượng 3 nhưng thành tiền vẫn 30000000 | FR-26, FR-07 | |
| EC-REMOVE-V01 | `deleteAction` | Bấm nút xóa hiển thị dialog xác nhận trước khi xóa. | Valid | Bấm xóa iPhone 15 Pro Max, dialog xác nhận xuất hiện | FR-26, FR-07 | |
| EC-REMOVE-I01 | `deleteAction` | Bấm nút xóa làm xóa sản phẩm ngay mà không có dialog xác nhận. | Invalid | Sản phẩm biến mất ngay sau khi bấm xóa | FR-26, FR-07 | |
| EC-REMOVECHOICE-V01 | `deleteConfirmationChoice` | Chọn hủy trong dialog thì sản phẩm vẫn còn trong giỏ. | Valid | Bấm Hủy, iPhone 15 Pro Max vẫn còn | FR-26, FR-07 | |
| EC-REMOVECHOICE-V02 | `deleteConfirmationChoice` | Chọn xác nhận trong dialog thì sản phẩm bị xóa khỏi giỏ. | Valid | Bấm Xác nhận, iPhone 15 Pro Max bị xóa | FR-26, FR-07 | |
| EC-TOTALLABEL-V01 | `totalLabel` | Nhãn tổng tiền hiển thị chính xác là "Tổng cộng". | Valid | "Tổng cộng" | FR-26, FR-07 | |
| EC-TOTALLABEL-I01 | `totalLabel` | Nhãn tổng tiền hiển thị là "Tổng tạm tính" hoặc text khác. | Invalid | "Tổng tạm tính" | FR-26, FR-07 | |
| EC-CONTINUE-V01 | `continueShoppingAction` | Có nút Tiếp tục mua sắm và bấm vào thì quay về trang chủ. | Valid | Bấm Tiếp tục mua sắm, ứng dụng hiển thị trang chủ | FR-26, FR-07 | |
| EC-CONTINUE-I01 | `continueShoppingAction` | Thiếu nút Tiếp tục mua sắm hoặc bấm nút không quay về trang chủ. | Invalid | Không có nút hoặc bấm nhưng vẫn ở Giỏ hàng | FR-26, FR-07 | |
| EC-MOBILE-V01 | `mobilePresentation` | Chức năng được quan sát trên giao diện mobile. | Valid | Màn hình giỏ hàng trong Mobile App | FR-26 | |
| EC-MOBILE-I01 | `mobilePresentation` | Chức năng chỉ thể hiện trên giao diện không phải mobile hoặc không phù hợp mobile. | Invalid | Chỉ có giao diện Web/Desktop | FR-26 | Chủ động loại trừ nếu toàn bộ execution chạy trên Mobile App. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source |
|---|---|---|---|---|
| DC-01 | `cartState` quyết định UI cần hiển thị. | Giỏ có sản phẩm thì hiển thị danh sách; giỏ trống thì hiển thị hình minh họa và thông báo rõ ràng. | Giỏ có sản phẩm nhưng hiển thị empty state, hoặc giỏ trống nhưng không có empty state rõ ràng. | FR-26, FR-07 |
| DC-02 | `cartTableColumns`, `unitPriceLabel`, `quantityControl`, và `deleteAction` cùng tạo thành dòng sản phẩm đầy đủ. | Dòng sản phẩm có đủ 5 thông tin, nhãn đúng, nút +/- và nút xóa. | Thiếu thông tin, nhãn sai, thiếu nút chỉnh hoặc thiếu thao tác xóa. | FR-26, FR-07 |
| DC-03 | `sameProductAdd` phụ thuộc vào sản phẩm đã tồn tại trong giỏ. | Nếu sản phẩm đã có trong giỏ, thao tác thêm lại chỉ tăng số lượng dòng hiện có. | Hệ thống tạo dòng mới cho cùng một sản phẩm. | FR-26, FR-07 |
| DC-04 | `differentProductAdd` phụ thuộc vào định danh sản phẩm khác nhau. | Hai sản phẩm khác nhau hiển thị hai dòng riêng biệt. | Gộp sai hai sản phẩm hoặc thiếu dòng sản phẩm. | FR-26, FR-07 |
| DC-05 | `quantityAdjustment` ảnh hưởng đến `lineSubtotal` và tổng tiền. | Sau khi tăng/giảm số lượng, số lượng, thành tiền của dòng, và tổng tiền phản ánh trạng thái mới. | Số lượng thay đổi nhưng thành tiền hoặc tổng tiền không cập nhật tương ứng. | FR-26, FR-07 |
| DC-06 | `deleteAction` phải đi qua `deleteConfirmationChoice`. | Bấm xóa hiển thị dialog trước; chỉ khi xác nhận thì sản phẩm mới bị xóa. | Sản phẩm bị xóa trước khi có xác nhận. | FR-26, FR-07 |
| DC-07 | `totalLabel` phụ thuộc vào trạng thái giỏ có tổng tiền. | Khi giỏ có sản phẩm, khu vực tổng tiền dùng nhãn "Tổng cộng". | Khu vực tổng tiền dùng "Tổng tạm tính" hoặc nhãn khác. | FR-26, FR-07 |
| DC-08 | `continueShoppingAction` phụ thuộc vào khả năng điều hướng từ giỏ hàng về trang chủ. | Bấm Tiếp tục mua sắm thì ứng dụng quay về trang chủ trên Mobile. | Thiếu nút hoặc bấm nút nhưng không quay về trang chủ. | FR-26, FR-07 |

## 5. Domain Matrix

| Test Condition | Cart state | Action / UI condition | Expected validity | Expected behavior | Covered classes | Lý do chọn |
|---|---|---|---|---|---|---|
| COND-FR26-DT-001 | Giỏ có 1 sản phẩm | Quan sát danh sách giỏ hàng mobile | Valid | Hiển thị đủ 5 thông tin: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. | EC-CARTSTATE-V01, EC-COLUMNS-V01, EC-COLUMNS-I01, EC-MOBILE-V01, DC-01, DC-02 | Tương ứng TC-FR-07-001, kiểm tra khung hiển thị chính. |
| COND-FR26-DT-002 | Giỏ có ít nhất 1 sản phẩm | Quan sát nhãn đơn giá | Valid | Nhãn đơn giá hiển thị đúng "Đơn giá", không dùng nhãn sai nghĩa. | EC-UNITPRICE-V01, EC-UNITPRICE-I01, DC-02 | Tương ứng TC-FR-07-002, tách riêng nhãn cột được nhấn mạnh. |
| COND-FR26-DT-003 | Giỏ có ít nhất 1 sản phẩm | Quan sát khu vực số lượng | Valid | Cột/khu vực Số lượng có cả nút + và nút -. | EC-QUANTITYCTRL-V01, EC-QUANTITYCTRL-I01, DC-02 | Tương ứng TC-FR-07-003, tách sự hiện diện của control khỏi hành động tăng/giảm. |
| COND-FR26-DT-004 | Giỏ có iPhone 15 Pro Max số lượng 1 | Bấm nút + | Valid | Số lượng tăng lên 2; thành tiền và "Tổng cộng" cập nhật theo số lượng mới. | EC-QUANTITY-V01, DC-05 | Tương ứng TC-FR-07-004. |
| COND-FR26-DT-005 | Giỏ có iPhone 15 Pro Max số lượng 2 | Bấm nút - | Valid | Số lượng giảm xuống 1; thành tiền và "Tổng cộng" cập nhật theo số lượng mới. | EC-QUANTITY-V02, DC-05 | Tương ứng TC-FR-07-005. |
| COND-FR26-DT-006 | Giỏ đã có iPhone 15 Pro Max số lượng 1 | Thêm lại iPhone 15 Pro Max vào giỏ | Valid | Giỏ vẫn có một dòng iPhone 15 Pro Max, số lượng tăng lên 2, không tạo dòng mới. | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-03 | Tương ứng TC-FR-07-006. |
| COND-FR26-DT-007 | Giỏ có iPhone 15 Pro Max | Bấm nút xóa | Valid | Dialog xác nhận xuất hiện trước khi xóa; sản phẩm chưa bị xóa trước khi người dùng chọn. | EC-REMOVE-V01, EC-REMOVE-I01, DC-06 | Tương ứng TC-FR-07-007. |
| COND-FR26-DT-008 | Giỏ có iPhone 15 Pro Max | Bấm xóa rồi chọn xác nhận trong dialog | Valid | Dialog xác nhận xuất hiện trước khi xóa; sau khi xác nhận, sản phẩm bị xóa khỏi giỏ. | EC-REMOVE-V01, EC-REMOVECHOICE-V02, DC-06 | Tương ứng TC-FR-07-008. |
| COND-FR26-DT-009 | Giỏ có iPhone 15 Pro Max | Bấm xóa rồi chọn hủy trong dialog | Valid | Dialog xác nhận xuất hiện trước khi xóa; sau khi hủy, sản phẩm vẫn còn trong giỏ. | EC-REMOVE-V01, EC-REMOVE-I01, EC-REMOVECHOICE-V01, DC-06 | Tương ứng TC-FR-07-009. |
| COND-FR26-DT-010 | Đang ở màn Giỏ hàng mobile | Bấm nút Tiếp tục mua sắm | Valid | Ứng dụng quay về trang chủ trên Mobile. | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-08 | Tương ứng TC-FR-07-010. |
| COND-FR26-DT-011 | Giỏ có ít nhất 1 sản phẩm | Quan sát nhãn khu vực tổng tiền | Valid | Nhãn hiển thị chính xác "Tổng cộng" và không hiển thị "Tổng tạm tính". | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-07 | Tương ứng TC-FR-07-011. |
| COND-FR26-DT-012 | Giỏ không có sản phẩm | Quan sát màn hình giỏ hàng mobile | Valid | Hiển thị hình minh họa và thông báo rõ ràng cho giỏ hàng trống. | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | Tương ứng TC-FR-07-012. |
| COND-FR26-DT-013 | Giỏ có iPhone 15 Pro Max số lượng 3 | Quan sát Thành tiền | Valid | Thành tiền bằng Đơn giá × Số lượng; Tổng cộng phản ánh thành tiền. | EC-LINESUBTOTAL-V01, EC-LINESUBTOTAL-I01, DC-05 | Tương ứng TC-FR-07-013. |
| COND-FR26-DT-014 | Giỏ có 2 sản phẩm khác nhau | Quan sát danh sách giỏ hàng mobile | Valid | Hiển thị 2 dòng riêng biệt cho 2 sản phẩm khác nhau, mỗi dòng có thông tin bắt buộc. | EC-DIFFERENTPRODUCT-V01, EC-DIFFERENTPRODUCT-I01, DC-04 | Tương ứng TC-FR-07-014. |

## 6. Quá trình lựa chọn test case

Bộ Domain Testing được tách thành 14 test condition để đồng bộ mức chi tiết với FR-07 trong `reports/main-report.md`: mỗi hành vi/UI assertion chính có một test case riêng thay vì gộp nhiều assertion vào một test lớn. Cách này giúp traceability rõ hơn khi FR-26 được mô tả là tương đương FR-07 trên Mobile.

Các input không phải mục tiêu của từng test dùng dữ liệu hợp lệ danh nghĩa: sản phẩm có tên, đơn giá, số lượng ban đầu rõ ràng và giỏ hàng truy cập trên Mobile App. Invalid class được cover bằng Expected Result của từng condition mà không ép hệ thống vào trạng thái không tạo được trực tiếp từ UI.

Không tạo test riêng cho giao diện không phải Mobile vì toàn bộ execution của FR-26 đặt precondition là Mobile App. Các boundary của số lượng như `0`, `1`, `2` được chuyển sang bộ BVA riêng để tránh trùng mục tiêu với Domain Testing.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR26-DT-001 | COND-FR26-DT-001 | EC-CARTSTATE-V01, EC-COLUMNS-V01, EC-COLUMNS-I01, EC-MOBILE-V01, DC-01, DC-02 | FR-26, FR-07 | Hiển thị danh sách giỏ hàng mobile với đủ 5 thông tin bắt buộc. |
| TC-FR26-DT-002 | COND-FR26-DT-002 | EC-UNITPRICE-V01, EC-UNITPRICE-I01, DC-02 | FR-26, FR-07 | Kiểm tra riêng nhãn "Đơn giá" như FR-07. |
| TC-FR26-DT-003 | COND-FR26-DT-003 | EC-QUANTITYCTRL-V01, EC-QUANTITYCTRL-I01, DC-02 | FR-26, FR-07 | Kiểm tra riêng sự tồn tại nút +/-. |
| TC-FR26-DT-004 | COND-FR26-DT-004 | EC-QUANTITY-V01, DC-05 | FR-26, FR-07 | Kiểm tra tăng số lượng bằng nút +. |
| TC-FR26-DT-005 | COND-FR26-DT-005 | EC-QUANTITY-V02, DC-05 | FR-26, FR-07 | Kiểm tra giảm số lượng bằng nút - trong miền số lượng lớn hơn 1. |
| TC-FR26-DT-006 | COND-FR26-DT-006 | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-03 | FR-26, FR-07 | Business rule thêm trùng sản phẩm không tạo dòng mới. |
| TC-FR26-DT-007 | COND-FR26-DT-007 | EC-REMOVE-V01, EC-REMOVE-I01, DC-06 | FR-26, FR-07 | Kiểm tra dialog xác nhận xuất hiện trước khi xóa. |
| TC-FR26-DT-008 | COND-FR26-DT-008 | EC-REMOVE-V01, EC-REMOVECHOICE-V02, DC-06 | FR-26, FR-07 | Kiểm tra nhánh xác nhận xóa. |
| TC-FR26-DT-009 | COND-FR26-DT-009 | EC-REMOVE-V01, EC-REMOVE-I01, EC-REMOVECHOICE-V01, DC-06 | FR-26, FR-07 | Kiểm tra nhánh hủy xóa. |
| TC-FR26-DT-010 | COND-FR26-DT-010 | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-08 | FR-26, FR-07 | Kiểm tra nút Tiếp tục mua sắm. |
| TC-FR26-DT-011 | COND-FR26-DT-011 | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-07 | FR-26, FR-07 | Kiểm tra nhãn chính xác "Tổng cộng". |
| TC-FR26-DT-012 | COND-FR26-DT-012 | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | FR-26, FR-07 | Kiểm tra empty state bắt buộc trên mobile. |
| TC-FR26-DT-013 | COND-FR26-DT-013 | EC-LINESUBTOTAL-V01, EC-LINESUBTOTAL-I01, DC-05 | FR-26, FR-07 | Kiểm tra Thành tiền = Đơn giá × Số lượng. |
| TC-FR26-DT-014 | COND-FR26-DT-014 | EC-DIFFERENTPRODUCT-V01, EC-DIFFERENTPRODUCT-I01, DC-04 | FR-26, FR-07 | Kiểm tra nhiều sản phẩm khác nhau hiển thị nhiều dòng. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 13 |
| Tổng valid classes | 16 |
| Tổng invalid classes | 10 |
| Tổng dependent conditions | 8 |
| Tổng test conditions | 14 |
| Tổng test cases | 14 |
| Classes đã cover | 25 |
| Classes chủ động loại trừ | 1 |
| Classes bị chặn do thiếu requirement | 0 |

| Class ID | Trạng thái coverage | Test Case / Lý do |
|---|---|---|
| EC-CARTSTATE-V01 | Đã cover | TC-FR26-DT-001 |
| EC-CARTSTATE-V02 | Đã cover | TC-FR26-DT-012 |
| EC-CARTSTATE-I01 | Đã cover | TC-FR26-DT-012 |
| EC-COLUMNS-V01 | Đã cover | TC-FR26-DT-001 |
| EC-COLUMNS-I01 | Đã cover | TC-FR26-DT-001 |
| EC-UNITPRICE-V01 | Đã cover | TC-FR26-DT-002 |
| EC-UNITPRICE-I01 | Đã cover | TC-FR26-DT-002 |
| EC-QUANTITYCTRL-V01 | Đã cover | TC-FR26-DT-003 |
| EC-QUANTITYCTRL-I01 | Đã cover | TC-FR26-DT-003 |
| EC-QUANTITY-V01 | Đã cover | TC-FR26-DT-004 |
| EC-QUANTITY-V02 | Đã cover | TC-FR26-DT-005 |
| EC-SAMEPRODUCT-V01 | Đã cover | TC-FR26-DT-006 |
| EC-SAMEPRODUCT-I01 | Đã cover | TC-FR26-DT-006 |
| EC-DIFFERENTPRODUCT-V01 | Đã cover | TC-FR26-DT-014 |
| EC-DIFFERENTPRODUCT-I01 | Đã cover | TC-FR26-DT-014 |
| EC-LINESUBTOTAL-V01 | Đã cover | TC-FR26-DT-013 |
| EC-LINESUBTOTAL-I01 | Đã cover | TC-FR26-DT-013 |
| EC-REMOVE-V01 | Đã cover | TC-FR26-DT-007, TC-FR26-DT-008, TC-FR26-DT-009 |
| EC-REMOVE-I01 | Đã cover | TC-FR26-DT-007, TC-FR26-DT-009 |
| EC-REMOVECHOICE-V01 | Đã cover | TC-FR26-DT-009 |
| EC-REMOVECHOICE-V02 | Đã cover | TC-FR26-DT-008 |
| EC-TOTALLABEL-V01 | Đã cover | TC-FR26-DT-011 |
| EC-TOTALLABEL-I01 | Đã cover | TC-FR26-DT-011 |
| EC-CONTINUE-V01 | Đã cover | TC-FR26-DT-010 |
| EC-CONTINUE-I01 | Đã cover | TC-FR26-DT-010 |
| EC-MOBILE-V01 | Đã cover | Tất cả test case được thiết kế để chạy trên Mobile App. |
| EC-MOBILE-I01 | Chủ động loại trừ | Không tạo test case riêng vì execution trên Mobile App là precondition chung; nếu không truy cập được Mobile App thì toàn bộ bộ test bị Blocked. |

| Requirement gap | Ảnh hưởng |
|---|---|
| FR-26/FR-07 không đặc tả nội dung chính xác của thông báo giỏ hàng trống. | Expected Result chỉ yêu cầu thông báo rõ ràng, không kiểm tra text cụ thể. |
| FR-26/FR-07 không đặc tả text chính xác của dialog xác nhận, nút xác nhận, nút hủy. | Test case kiểm tra ý nghĩa hành vi, không khóa vào wording cụ thể. |
| FR-26 không đặc tả trạng thái đăng nhập khi truy cập giỏ hàng trên Mobile. | Không tạo test auth cho FR-26; thông tin kỹ thuật chỉ dùng để đối chiếu. |
| FR-26 không đặc tả cách tạo dữ liệu giỏ hàng trước khi test. | Preconditions mô tả trạng thái dữ liệu cần có, không ràng buộc công cụ hoặc chi tiết triển khai. |

## 9. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: Tester có thể chuẩn bị giỏ hàng mobile bằng cách thêm sản phẩm từ màn danh sách hoặc chi tiết sản phẩm trước khi mở màn Giỏ hàng.
- Giả định cần xác nhận: Tên sản phẩm và giá trong test data là dữ liệu seed hoặc dữ liệu có thể tạo trong môi trường kiểm thử.
- Chưa được đặc tả: Text chính xác của dialog xác nhận xóa, tên nút xác nhận, tên nút hủy.
- Chưa được đặc tả: Text chính xác của thông báo giỏ hàng trống.
- Chưa được đặc tả: Kích thước màn hình, hệ điều hành, orientation, và yêu cầu responsive chi tiết cho Mobile App.
