# Phân tích Domain Testing — FR-26: Giỏ hàng trên Mobile

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-26 |
| Tên chức năng | Giỏ hàng trên Mobile |
| Actor | Người dùng ứng dụng Mobile |
| Preconditions | Ứng dụng Mobile có dữ liệu giỏ hàng để hiển thị. Trạng thái đăng nhập của người dùng đối với màn giỏ hàng: Chưa được đặc tả trong FR-26. |
| Input | Trạng thái giỏ hàng, sản phẩm được thêm vào giỏ, thao tác tăng/giảm số lượng, thao tác xóa sản phẩm, lựa chọn xác nhận hoặc hủy trong dialog xóa. |
| Output | Danh sách sản phẩm trong giỏ, thông tin Sản phẩm/Đơn giá/Số lượng/Thành tiền/Thao tác, nút +/- để chỉnh số lượng, nút xóa sản phẩm, dialog xác nhận xóa, nút Tiếp tục mua sắm, nhãn "Tổng cộng", empty state có hình minh họa và thông báo rõ ràng. |
| Business rules | Ứng dụng Mobile phải hỗ trợ Giỏ hàng tương đương FR-07. Vì vậy FR-26 kế thừa đầy đủ các yêu cầu của FR-07 trên giao diện Mobile: hiển thị cột/thông tin Thao tác, có nút Tiếp tục mua sắm, thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới. |
| Validation rules | Không có validation field cụ thể được đặc tả cho FR-26. |
| Dependency | FR-07 là requirement tương đương trên Web. API specification chỉ được dùng để xác nhận hệ thống có khái niệm giỏ hàng, không đưa chi tiết kỹ thuật API vào analysis hoặc test case. |
| Success condition | Người dùng xem và thao tác giỏ hàng trên Mobile đúng các thông tin và hành vi được đặc tả. |
| Error conditions | Các trạng thái không hợp lệ cần bị tránh hoặc từ chối: thiếu thông tin bắt buộc trong dòng sản phẩm, tạo dòng mới khi thêm trùng sản phẩm, xóa sản phẩm không có dialog xác nhận, hiển thị sai nhãn tổng tiền, empty state thiếu hình minh họa hoặc thiếu thông báo rõ ràng. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Requirement source |
|---|---|---|---|---|
| `cartState` | System state | Có | Giỏ hàng có sản phẩm hoặc giỏ hàng trống. Khi có sản phẩm, danh sách phải hiển thị thông tin Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. Khi trống, phải có hình minh họa và thông báo rõ ràng trên giao diện mobile. | FR-26, FR-07 |
| `cartLineDisplay` | UI state | Có khi giỏ có sản phẩm | Mỗi dòng sản phẩm phải hiển thị đủ Sản phẩm, Đơn giá, Số lượng có nút +/- để chỉnh, Thành tiền, và Thao tác. Trong Thao tác phải có nút xóa sản phẩm. | FR-26 kế thừa FR-07 |
| `sameProductAdd` | User action / system state | Có | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng của dòng hiện có, không tạo dòng mới. | FR-26, FR-07 |
| `quantityAdjustment` | User action | Có khi giỏ có sản phẩm | Người dùng dùng nút + hoặc - để chỉnh số lượng. Giá trị tối thiểu, tối đa, và xử lý khi giảm về 0: Chưa được đặc tả trong FR-26. | FR-26 |
| `deleteAction` | User action | Có khi giỏ có sản phẩm | Có nút xóa sản phẩm khỏi giỏ hàng. Hệ thống phải hiển thị dialog xác nhận trước khi xóa. | FR-26, FR-07 |
| `deleteConfirmationChoice` | User choice | Có khi chọn xóa | Người dùng xác nhận thì sản phẩm bị xóa; người dùng hủy thì sản phẩm không bị xóa. Hành vi hủy không được nêu trực tiếp nhưng được suy ra từ ý nghĩa của dialog xác nhận. | FR-26, suy ra từ dialog xác nhận |
| `totalLabel` | UI text | Có | Tổng tiền phải hiển thị nhãn chính xác là "Tổng cộng"; không được hiển thị "Tổng tạm tính". | FR-26, FR-07 |
| `continueShoppingAction` | User action | Có | Có nút Tiếp tục mua sắm để quay về trang chủ. | FR-26 kế thừa FR-07 |
| `mobilePresentation` | UI context | Có | Các trạng thái và thao tác phải thể hiện trên giao diện mobile. Kích thước màn hình, thiết bị, hệ điều hành, orientation: Chưa được đặc tả. | FR-26 |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-CARTSTATE-V01 | `cartState` | Giỏ hàng có ít nhất một sản phẩm và hiển thị danh sách sản phẩm. | Valid | Giỏ có 2 sản phẩm: Áo thun Basic, Balo Mini | FR-26 | Dùng để kiểm tra danh sách và tổng tiền. |
| EC-CARTSTATE-V02 | `cartState` | Giỏ hàng trống và hiển thị empty state. | Valid | Giỏ không có sản phẩm | FR-26 | Phải có hình minh họa và thông báo rõ ràng. |
| EC-CARTSTATE-I01 | `cartState` | Giỏ hàng trống nhưng không hiển thị đủ empty state. | Invalid | Màn hình trống hoặc chỉ có khoảng trắng | FR-26 | Không có cách nhập trực tiếp, kiểm tra bằng quan sát trạng thái hệ thống. |
| EC-CARTLINE-V01 | `cartLineDisplay` | Dòng sản phẩm hiển thị đủ Sản phẩm, Đơn giá, Số lượng có nút +/-, Thành tiền, Thao tác có nút xóa. | Valid | Áo thun Basic, 120000 ₫, số lượng 1, thành tiền 120000 ₫, có nút xóa | FR-26 kế thừa FR-07 | Đơn vị tiền và format phân cách hàng nghìn không được FR-26/FR-07 nhắc lại, chỉ kiểm tra nội dung bắt buộc. |
| EC-CARTLINE-I01 | `cartLineDisplay` | Dòng sản phẩm thiếu ít nhất một thông tin bắt buộc, thiếu nút +/- ở số lượng, hoặc thiếu Thao tác/nút xóa. | Invalid | Có tên và giá nhưng không có Thành tiền, không có nút +/-, hoặc không có nút xóa | FR-26 kế thừa FR-07 | Một invalid UI state. |
| EC-SAMEPRODUCT-V01 | `sameProductAdd` | Thêm cùng một sản phẩm làm tăng số lượng dòng hiện có. | Valid | Thêm Áo thun Basic lần 2, số lượng từ 1 thành 2 | FR-26 | |
| EC-SAMEPRODUCT-I01 | `sameProductAdd` | Thêm cùng một sản phẩm tạo thêm dòng mới cho cùng sản phẩm. | Invalid | Có 2 dòng Áo thun Basic riêng biệt | FR-26 | |
| EC-QUANTITY-V01 | `quantityAdjustment` | Bấm nút + làm tăng số lượng sản phẩm đang có trong giỏ. | Valid | Số lượng 1 thành 2 | FR-26 | |
| EC-QUANTITY-V02 | `quantityAdjustment` | Bấm nút - làm giảm số lượng sản phẩm đang có trong giỏ khi số lượng đang lớn hơn 1. | Valid | Số lượng 2 thành 1 | FR-26 | Tránh suy diễn hành vi khi số lượng đang bằng 1. |
| EC-QUANTITY-I01 | `quantityAdjustment` | Không có nút + hoặc - để chỉnh số lượng. | Invalid | Chỉ hiển thị số lượng dạng text không thể chỉnh | FR-26 | Được cover cùng EC-CARTLINE-I01, không tạo test case riêng để tránh trùng. |
| EC-DELETE-V01 | `deleteAction` | Bấm nút xóa hiển thị dialog xác nhận trước khi xóa. | Valid | Bấm xóa Áo thun Basic, dialog xác nhận xuất hiện | FR-26 | |
| EC-DELETE-I01 | `deleteAction` | Bấm nút xóa làm xóa sản phẩm ngay mà không có dialog xác nhận. | Invalid | Sản phẩm biến mất ngay sau khi bấm xóa | FR-26 | |
| EC-DELETECHOICE-V01 | `deleteConfirmationChoice` | Chọn hủy trong dialog thì sản phẩm vẫn còn trong giỏ. | Valid | Bấm Hủy, Áo thun Basic vẫn còn | FR-26, suy ra từ dialog xác nhận | Tên nút hủy cụ thể: Chưa được đặc tả. |
| EC-DELETECHOICE-V02 | `deleteConfirmationChoice` | Chọn xác nhận trong dialog thì sản phẩm bị xóa khỏi giỏ. | Valid | Bấm Xác nhận, Áo thun Basic bị xóa | FR-26 | Tên nút xác nhận cụ thể: Chưa được đặc tả. |
| EC-TOTALLABEL-V01 | `totalLabel` | Nhãn tổng tiền hiển thị chính xác là "Tổng cộng". | Valid | "Tổng cộng" | FR-26 |
| EC-TOTALLABEL-I01 | `totalLabel` | Nhãn tổng tiền hiển thị là "Tổng tạm tính" hoặc text khác. | Invalid | "Tổng tạm tính" | FR-26 |
| EC-CONTINUE-V01 | `continueShoppingAction` | Có nút Tiếp tục mua sắm và bấm vào thì quay về trang chủ. | Valid | Bấm Tiếp tục mua sắm, ứng dụng hiển thị trang chủ | FR-26 kế thừa FR-07 | Tên trang chủ trên Mobile App: Chưa được đặc tả chi tiết. |
| EC-CONTINUE-I01 | `continueShoppingAction` | Thiếu nút Tiếp tục mua sắm hoặc bấm nút không quay về trang chủ. | Invalid | Không có nút Tiếp tục mua sắm, hoặc bấm nút nhưng vẫn ở Giỏ hàng | FR-26 kế thừa FR-07 | |
| EC-MOBILE-V01 | `mobilePresentation` | Chức năng được quan sát trên giao diện mobile. | Valid | Màn hình giỏ hàng trong Mobile App | FR-26 | |
| EC-MOBILE-I01 | `mobilePresentation` | Chức năng chỉ thể hiện trên giao diện không phải mobile hoặc không phù hợp mobile. | Invalid | Chỉ có giao diện Web/Desktop | FR-26 | Không tạo test case riêng nếu toàn bộ execution đã chạy trên Mobile App. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source |
|---|---|---|---|---|
| DC-01 | `cartState` quyết định UI cần hiển thị. | Giỏ có sản phẩm thì hiển thị danh sách; giỏ trống thì hiển thị hình minh họa và thông báo rõ ràng. | Giỏ có sản phẩm nhưng hiển thị empty state, hoặc giỏ trống nhưng không có empty state rõ ràng. | FR-26 |
| DC-02 | `sameProductAdd` phụ thuộc vào sản phẩm đã tồn tại trong giỏ. | Nếu sản phẩm đã có trong giỏ, thao tác thêm lại chỉ tăng số lượng dòng hiện có. | Hệ thống tạo dòng mới cho cùng một sản phẩm. | FR-26 |
| DC-03 | `quantityAdjustment` ảnh hưởng đến `cartLineDisplay` và tổng tiền. | Sau khi tăng/giảm số lượng, số lượng, thành tiền của dòng, và tổng tiền phản ánh trạng thái mới. | Số lượng thay đổi nhưng thành tiền hoặc tổng tiền không cập nhật tương ứng. | FR-26, suy ra từ ý nghĩa Thành tiền và Tổng cộng |
| DC-04 | `deleteAction` phải đi qua `deleteConfirmationChoice`. | Bấm xóa hiển thị dialog trước; chỉ khi xác nhận thì sản phẩm mới bị xóa. | Sản phẩm bị xóa trước khi có xác nhận. | FR-26 |
| DC-05 | `totalLabel` phụ thuộc vào trạng thái giỏ có tổng tiền. | Khi giỏ có sản phẩm, khu vực tổng tiền dùng nhãn "Tổng cộng". | Khu vực tổng tiền dùng "Tổng tạm tính" hoặc nhãn khác. | FR-26 |
| DC-06 | `continueShoppingAction` phụ thuộc vào khả năng điều hướng từ giỏ hàng về trang chủ. | Bấm Tiếp tục mua sắm thì ứng dụng quay về trang chủ trên Mobile. | Thiếu nút hoặc bấm nút nhưng không quay về trang chủ. | FR-26 kế thừa FR-07 |

## 5. Domain Matrix

| Test Condition | Cart state | Action / UI condition | Expected validity | Expected behavior | Covered classes | Lý do chọn |
|---|---|---|---|---|---|---|
| COND-FR26-DT-001 | Giỏ có 2 sản phẩm | Quan sát danh sách giỏ hàng mobile | Valid | Hiển thị từng dòng với Sản phẩm, Đơn giá, Số lượng có nút +/-, Thành tiền, Thao tác có nút xóa; có nhãn "Tổng cộng". | EC-CARTSTATE-V01, EC-CARTLINE-V01, EC-CARTLINE-I01, EC-QUANTITY-I01, EC-TOTALLABEL-V01, EC-MOBILE-V01, DC-01, DC-05 | Kiểm tra luồng hiển thị danh sách chính theo FR-07 được FR-26 kế thừa và loại trừ trạng thái thiếu thông tin/nút thao tác. |
| COND-FR26-DT-002 | Giỏ đã có Áo thun Basic số lượng 1 | Thêm lại Áo thun Basic vào giỏ | Valid | Giỏ vẫn có một dòng Áo thun Basic, số lượng tăng lên 2, không tạo dòng mới. | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-02 | Kiểm tra business rule quan trọng nhất của thao tác thêm trùng sản phẩm. |
| COND-FR26-DT-003 | Giỏ có Áo thun Basic số lượng 1 | Bấm nút + | Valid | Số lượng tăng lên 2; thành tiền của dòng và "Tổng cộng" cập nhật theo số lượng mới. | EC-QUANTITY-V01, DC-03 | Kiểm tra nút tăng số lượng và ảnh hưởng đến tiền. |
| COND-FR26-DT-004 | Giỏ có Áo thun Basic số lượng 2 | Bấm nút - | Valid | Số lượng giảm xuống 1; thành tiền của dòng và "Tổng cộng" cập nhật theo số lượng mới. | EC-QUANTITY-V02, DC-03 | Kiểm tra nút giảm số lượng trong miền đã được đặc tả an toàn, tránh suy diễn giảm từ 1. |
| COND-FR26-DT-005 | Giỏ có Áo thun Basic | Bấm xóa rồi chọn hủy trong dialog | Valid | Dialog xác nhận xuất hiện trước khi xóa; sau khi hủy, sản phẩm vẫn còn trong giỏ. | EC-DELETE-V01, EC-DELETE-I01, EC-DELETECHOICE-V01, DC-04 | Kiểm tra yêu cầu có dialog và nhánh không xóa. |
| COND-FR26-DT-006 | Giỏ có Áo thun Basic | Bấm xóa rồi chọn xác nhận trong dialog | Valid | Dialog xác nhận xuất hiện trước khi xóa; sau khi xác nhận, sản phẩm bị xóa khỏi giỏ. | EC-DELETE-V01, EC-DELETECHOICE-V02, DC-04 | Kiểm tra nhánh xóa thật sự sau xác nhận. |
| COND-FR26-DT-007 | Giỏ không có sản phẩm | Quan sát màn hình giỏ hàng mobile | Valid | Hiển thị hình minh họa và thông báo rõ ràng cho giỏ hàng trống. | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | Kiểm tra empty state bắt buộc. |
| COND-FR26-DT-008 | Giỏ có ít nhất một sản phẩm | Quan sát nhãn khu vực tổng tiền | Valid | Nhãn hiển thị chính xác "Tổng cộng" và không hiển thị "Tổng tạm tính". | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-05 | Tách riêng vì requirement nhấn mạnh text chính xác. |
| COND-FR26-DT-009 | Đang ở màn Giỏ hàng mobile | Bấm nút Tiếp tục mua sắm | Valid | Ứng dụng quay về trang chủ trên Mobile. | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-06 | Kiểm tra yêu cầu FR-07 được FR-26 kế thừa đầy đủ. |

## 6. Quá trình lựa chọn test case

Các test condition được chọn theo nguyên tắc cover từng miền hành vi chính và các invalid state có rủi ro cao mà không tạo Cartesian product. Những input không phải mục tiêu của từng test dùng dữ liệu hợp lệ danh nghĩa: sản phẩm có tên, đơn giá, số lượng ban đầu rõ ràng và giỏ hàng truy cập trên Mobile App.

Các invalid class như thiếu nút +/-, thiếu Thao tác/nút xóa, hoặc thiếu thông tin dòng sản phẩm được cover qua test quan sát danh sách chính, vì chúng là biến thể lỗi của cùng miền hiển thị. Trường hợp giảm số lượng khi đang bằng 1, giới hạn số lượng tối đa, đồng bộ tồn kho, và nội dung chính xác của thông báo empty state không được tạo test riêng vì FR-26/FR-07 chưa đặc tả rule đủ rõ.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR26-DT-001 | COND-FR26-DT-001 | EC-CARTSTATE-V01, EC-CARTLINE-V01, EC-CARTLINE-I01, EC-QUANTITY-I01, EC-TOTALLABEL-V01, EC-MOBILE-V01, DC-01, DC-05 | FR-26, FR-07 | Luồng hiển thị danh sách giỏ hàng mobile có sản phẩm và loại trừ trạng thái thiếu thông tin/nút chỉnh số lượng/nút thao tác. |
| TC-FR26-DT-002 | COND-FR26-DT-002 | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-02 | FR-26, FR-07 | Business rule thêm trùng sản phẩm không tạo dòng mới. |
| TC-FR26-DT-003 | COND-FR26-DT-003 | EC-QUANTITY-V01, DC-03 | FR-26 | Nút + là thao tác chỉnh số lượng bắt buộc. |
| TC-FR26-DT-004 | COND-FR26-DT-004 | EC-QUANTITY-V02, DC-03 | FR-26 | Nút - là thao tác chỉnh số lượng bắt buộc trong miền số lượng lớn hơn 1. |
| TC-FR26-DT-005 | COND-FR26-DT-005 | EC-DELETE-V01, EC-DELETE-I01, EC-DELETECHOICE-V01, DC-04 | FR-26, FR-07 | Kiểm tra dialog xác nhận trước khi xóa và nhánh hủy. |
| TC-FR26-DT-006 | COND-FR26-DT-006 | EC-DELETE-V01, EC-DELETECHOICE-V02, DC-04 | FR-26, FR-07 | Kiểm tra xóa sản phẩm chỉ xảy ra sau xác nhận. |
| TC-FR26-DT-007 | COND-FR26-DT-007 | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | FR-26, FR-07 | Kiểm tra empty state bắt buộc trên mobile. |
| TC-FR26-DT-008 | COND-FR26-DT-008 | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-05 | FR-26, FR-07 | Requirement nhấn mạnh nhãn chính xác "Tổng cộng". |
| TC-FR26-DT-009 | COND-FR26-DT-009 | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-06 | FR-26, FR-07 | FR-26 tương đương FR-07 nên phải có nút Tiếp tục mua sắm để quay về trang chủ. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 9 |
| Tổng valid classes | 12 |
| Tổng invalid classes | 8 |
| Tổng dependent conditions | 6 |
| Tổng test conditions | 9 |
| Tổng test cases | 9 |
| Classes đã cover | 19 |
| Classes chủ động loại trừ | 1 |
| Classes bị chặn do thiếu requirement | 0 |

| Class ID | Trạng thái coverage | Test Case / Lý do |
|---|---|---|
| EC-CARTSTATE-V01 | Đã cover | TC-FR26-DT-001 |
| EC-CARTSTATE-V02 | Đã cover | TC-FR26-DT-007 |
| EC-CARTSTATE-I01 | Đã cover | TC-FR26-DT-007 |
| EC-CARTLINE-V01 | Đã cover | TC-FR26-DT-001 |
| EC-CARTLINE-I01 | Đã cover | TC-FR26-DT-001, kiểm tra thiếu thông tin, thiếu nút +/- hoặc thiếu Thao tác/nút xóa qua Expected Result. |
| EC-SAMEPRODUCT-V01 | Đã cover | TC-FR26-DT-002 |
| EC-SAMEPRODUCT-I01 | Đã cover | TC-FR26-DT-002 |
| EC-QUANTITY-V01 | Đã cover | TC-FR26-DT-003 |
| EC-QUANTITY-V02 | Đã cover | TC-FR26-DT-004 |
| EC-QUANTITY-I01 | Đã cover | TC-FR26-DT-001, kiểm tra sự hiện diện của nút +/-. |
| EC-DELETE-V01 | Đã cover | TC-FR26-DT-005, TC-FR26-DT-006 |
| EC-DELETE-I01 | Đã cover | TC-FR26-DT-005 |
| EC-DELETECHOICE-V01 | Đã cover | TC-FR26-DT-005 |
| EC-DELETECHOICE-V02 | Đã cover | TC-FR26-DT-006 |
| EC-TOTALLABEL-V01 | Đã cover | TC-FR26-DT-001, TC-FR26-DT-008 |
| EC-TOTALLABEL-I01 | Đã cover | TC-FR26-DT-008 |
| EC-CONTINUE-V01 | Đã cover | TC-FR26-DT-009 |
| EC-CONTINUE-I01 | Đã cover | TC-FR26-DT-009 |
| EC-MOBILE-V01 | Đã cover | Tất cả test case được thiết kế để chạy trên Mobile App. |
| EC-MOBILE-I01 | Chủ động loại trừ | Không tạo test case riêng vì execution trên Mobile App là precondition chung; nếu không truy cập được Mobile App thì toàn bộ bộ test bị Blocked. |

| Requirement gap | Ảnh hưởng |
|---|---|
| FR-26/FR-07 không đặc tả giới hạn số lượng tối thiểu/tối đa trong giỏ hàng. | Không thiết kế test giảm số lượng từ 1 về 0 hoặc vượt giới hạn tối đa. |
| FR-26/FR-07 không đặc tả nội dung chính xác của thông báo giỏ hàng trống. | Expected Result chỉ yêu cầu thông báo rõ ràng, không kiểm tra text cụ thể. |
| FR-26 không đặc tả trạng thái đăng nhập khi truy cập giỏ hàng trên Mobile. | Không tạo test auth cho FR-26; thông tin API chỉ dùng để đối chiếu kỹ thuật. |
| FR-26 không đặc tả cách tạo dữ liệu giỏ hàng trước khi test. | Preconditions mô tả trạng thái dữ liệu cần có, không ràng buộc endpoint hoặc công cụ kiểm thử. |

## 9. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: Tester có thể chuẩn bị giỏ hàng mobile bằng cách thêm sản phẩm từ màn danh sách hoặc chi tiết sản phẩm trước khi mở màn Giỏ hàng.
- Giả định cần xác nhận: Tên sản phẩm và giá trong test data là dữ liệu seed hoặc dữ liệu có thể tạo trong môi trường kiểm thử.
- Chưa được đặc tả: Text chính xác của dialog xác nhận xóa, tên nút xác nhận, tên nút hủy.
- Chưa được đặc tả: Text chính xác của thông báo giỏ hàng trống.
- Chưa được đặc tả: Quy tắc số lượng tối thiểu/tối đa trong giỏ hàng và hành vi khi bấm nút - tại số lượng 1.
- Chưa được đặc tả: Yêu cầu đăng nhập đối với màn Giỏ hàng trên Mobile trong FR-26, dù API specification có mô tả giỏ hàng là tài nguyên yêu cầu xác thực.
