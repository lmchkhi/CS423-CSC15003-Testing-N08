# Phân tích Boundary Value Analysis — FR-26: Giỏ hàng trên Mobile

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-26 |
| Tên chức năng | Giỏ hàng trên Mobile |
| Preconditions | Ứng dụng Mobile truy cập được màn Giỏ hàng. Có thể chuẩn bị giỏ hàng trống hoặc giỏ có một dòng sản phẩm với số lượng xác định. |
| Input | Số lượng của một dòng sản phẩm trong giỏ hàng, số dòng sản phẩm trong giỏ hàng, thao tác tăng/giảm bằng nút +/-, trạng thái hiển thị sau khi điều chỉnh. |
| Validation rules | FR-26 kế thừa FR-07 về giỏ hàng. FR-07 yêu cầu cột Số lượng có nút +/- để chỉnh và giỏ hàng trống phải có empty state. FR-06 đặc tả số lượng khi thêm sản phẩm là số nguyên dương, tối thiểu 1; vì vậy số lượng của một dòng sản phẩm đang tồn tại trong giỏ được xem là có lower boundary tại 1. |
| Business rules | Giỏ hàng trên Mobile phải tương đương FR-07: hiển thị danh sách sản phẩm, số lượng có nút +/-, thành tiền, thao tác xóa có dialog xác nhận, thêm cùng sản phẩm làm tăng số lượng và không tạo dòng mới, giỏ hàng trống có hình minh họa và thông báo rõ ràng. |
| Success condition | Số lượng dòng giỏ hàng và số dòng sản phẩm trong giỏ phản ánh đúng trạng thái tại các biên dưới có ý nghĩa. |
| Error conditions | Dòng sản phẩm tồn tại với số lượng 0; giỏ hàng trống không có empty state; giỏ có một sản phẩm nhưng vẫn hiển thị như giỏ trống; sản phẩm bị xóa khi giảm từ 1 mà không có dialog xác nhận. |
| Tài liệu đối chiếu | `requirements/api-specification.md` chỉ được dùng để kiểm tra tính nhất quán kỹ thuật; không đưa chi tiết kỹ thuật triển khai hoặc công cụ kiểm thử vào analysis/test case. |

## 2. Các biến có biên

| Variable | Type | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Nominal value | Requirement source | Thông tin còn thiếu |
|---|---|---:|---|---|---|---:|---|---|
| `cartLineQuantity` | Integer quantity | 1 | Chưa được đặc tả | Lower inclusive: giá trị 1 là hợp lệ | Sản phẩm | 2 | FR-26, FR-07, FR-06 | Upper boundary, giới hạn tồn kho, giới hạn số lần bấm +, và hành vi chính xác khi bấm - tại số lượng 1 cần xác nhận. |
| `cartItemCount` | Collection size | 0 | Chưa được đặc tả | Lower inclusive: giá trị 0 là hợp lệ và đại diện cho giỏ trống | Dòng sản phẩm | 1 | FR-26, FR-07 | Upper boundary của số dòng sản phẩm trong giỏ chưa được đặc tả. Giá trị -1 không thể tạo qua black-box. |

Các biến `deleteConfirmationChoice`, `totalLabel`, `continueShoppingAction`, và tên nhãn UI không được đưa vào BVA vì chúng là lựa chọn categorical hoặc exact text, không có miền giá trị có thứ tự.

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Robust BVA cho lower boundary của `cartLineQuantity`; BVA cho empty/non-empty boundary của `cartItemCount`.
- Lý do lựa chọn: `cartLineQuantity` có biên dưới hợp lệ tại 1; `cartItemCount` có biên empty/non-empty tại 0 và 1 vì requirement yêu cầu hai trạng thái hiển thị khác nhau cho giỏ trống và giỏ có sản phẩm.
- Phạm vi: Chỉ kiểm tra lower boundary. Không tạo upper boundary vì requirement không đặc tả số lượng tối đa, tồn kho tối đa, hoặc giới hạn số dòng trong giỏ.

## 4. Xác định ON, OFF⁻ và OFF⁺

Với minimum boundary `cartLineQuantity min = 1`:

- `OFF⁻ = min - 1 = 0`: giá trị ngay dưới biên, không hợp lệ cho một dòng sản phẩm đang tồn tại.
- `ON = min = 1`: giá trị tại biên dưới, hợp lệ.
- `OFF⁺ = min + 1 = 2`: giá trị ngay trên biên dưới, hợp lệ.

Với collection lower boundary `cartItemCount min = 0`:

- `OFF⁻ = min - 1 = -1`: trạng thái không thể tạo qua black-box, không sinh test case.
- `ON = min = 0`: giỏ hàng trống, hợp lệ và phải hiển thị empty state.
- `OFF⁺ = min + 1 = 1`: giỏ vừa có một dòng sản phẩm, hợp lệ và phải hiển thị danh sách sản phẩm.

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---:|---:|---:|---|
| `cartLineQuantity` | Minimum quantity của một dòng sản phẩm đang tồn tại trong giỏ | 0 | 1 | 2 | Biên dưới được suy ra từ yêu cầu số lượng tối thiểu 1 khi thêm sản phẩm ở FR-06 và hành vi chỉnh số lượng trong giỏ ở FR-07/FR-26. |
| `cartItemCount` | Empty/non-empty boundary của collection giỏ hàng | -1 | 0 | 1 | OFF⁻ = -1 không thể tạo bằng thao tác người dùng; ON = 0 và OFF⁺ = 1 có thể kiểm thử qua trạng thái giỏ trống/có sản phẩm. |

## 5. Boundary Value Derivation

| Boundary Value ID | Input | Constraint | Boundary type | Boundary point | Công thức suy ra | Giá trị cụ thể | Validity | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---:|---|---|---|
| BV-CARTQTY-001 | `cartLineQuantity` | Số lượng dòng giỏ hàng là số nguyên dương, lower boundary = 1 | Minimum | ON | `min` | 1 | Valid | Dòng sản phẩm với số lượng 1 được chấp nhận và hiển thị thành tiền tương ứng. | FR-26, FR-07, FR-06 |
| BV-CARTQTY-002 | `cartLineQuantity` | Số lượng dòng giỏ hàng không được nhỏ hơn 1 | Minimum | OFF⁻ | `min - 1` | 0 | Invalid | Hệ thống không để dòng sản phẩm tồn tại với số lượng 0; nếu thao tác giảm từ 1 dẫn tới xóa sản phẩm thì phải có dialog xác nhận trước. | FR-26, FR-07, FR-06 |
| BV-CARTQTY-003 | `cartLineQuantity` | Số lượng dòng giỏ hàng là số nguyên dương, lower boundary = 1 | Minimum | OFF⁺ | `min + 1` | 2 | Valid | Số lượng 2 được chấp nhận; thành tiền và tổng cộng cập nhật theo số lượng mới. | FR-26, FR-07, FR-06 |
| BV-CARTCOUNT-001 | `cartItemCount` | Giỏ hàng có thể trống và phải có empty state | Collection lower boundary | ON | `min` | 0 | Valid | Màn Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho giỏ trống. | FR-26, FR-07 |
| BV-CARTCOUNT-002 | `cartItemCount` | Giỏ hàng có một dòng sản phẩm thì phải hiển thị danh sách | Collection lower boundary | OFF⁺ | `min + 1` | 1 | Valid | Màn Giỏ hàng hiển thị một dòng sản phẩm với thông tin bắt buộc, không hiển thị empty state. | FR-26, FR-07 |
| BV-CARTCOUNT-003 | `cartItemCount` | Số dòng sản phẩm trong giỏ không thể âm | Collection lower boundary | OFF⁻ | `min - 1` | -1 | Invalid / Not executable | Không thể tạo trạng thái giỏ có -1 dòng qua black-box; không sinh test case. | FR-26, FR-07 |

## 6. Dependent Boundaries

| ID | Quan hệ | Boundary values | Expected behavior |
|---|---|---|---|
| DB-01 | `cartLineQuantity` ảnh hưởng đến Thành tiền và Tổng cộng. | ON = 1, OFF⁺ = 2 | Thành tiền của dòng = Đơn giá × Số lượng; Tổng cộng phản ánh số lượng sau điều chỉnh. |
| DB-02 | `cartLineQuantity = 0` liên quan đến rule xóa sản phẩm có xác nhận. | OFF⁻ = 0 | Dòng sản phẩm không được âm thầm chuyển về số lượng 0; nếu bị xóa thì phải qua dialog xác nhận theo FR-07/FR-26. |
| DB-03 | `cartItemCount` quyết định kiểu hiển thị của màn Giỏ hàng. | ON = 0, OFF⁺ = 1 | Giỏ trống hiển thị empty state; giỏ có một dòng hiển thị danh sách sản phẩm. |

## 7. BVA Test Matrix

| Test Condition | Target variable | Boundary Value ID | Boundary point | Test value | Các ràng buộc khác | Expected validity | Expected behavior | Lý do lựa chọn |
|---|---|---|---|---|---|---|---|---|
| COND-FR26-BVA-001 | `cartLineQuantity` | BV-CARTQTY-001 | ON | 1 | Sản phẩm hợp lệ, đơn giá 30000000, kiểm tra trên Mobile App | Valid | Dòng sản phẩm hiển thị số lượng 1; thành tiền là 30000000; không phát sinh xóa sản phẩm. | Cover giá trị tại lower boundary của quantity. |
| COND-FR26-BVA-002 | `cartLineQuantity` | BV-CARTQTY-002 | OFF⁻ | 0 | Bắt đầu từ số lượng 1, thao tác bằng nút - trên Mobile App | Invalid | Không hiển thị dòng sản phẩm với số lượng 0; nếu hệ thống xóa sản phẩm thì dialog xác nhận phải xuất hiện trước khi xóa. | Cover giá trị ngay dưới lower boundary của quantity. |
| COND-FR26-BVA-003 | `cartLineQuantity` | BV-CARTQTY-003 | OFF⁺ | 2 | Bắt đầu từ số lượng 1, thao tác bằng nút + trên Mobile App | Valid | Số lượng tăng lên 2; thành tiền là 60000000; Tổng cộng cập nhật tương ứng. | Cover giá trị ngay trên lower boundary của quantity. |
| COND-FR26-BVA-004 | `cartItemCount` | BV-CARTCOUNT-001 | ON | 0 | Giỏ hàng không có dòng sản phẩm | Valid | Màn Giỏ hàng hiển thị empty state có hình minh họa và thông báo rõ ràng. | Cover empty boundary của collection. |
| COND-FR26-BVA-005 | `cartItemCount` | BV-CARTCOUNT-002 | OFF⁺ | 1 | Giỏ hàng có một dòng iPhone 15 Pro Max | Valid | Màn Giỏ hàng hiển thị danh sách với một dòng sản phẩm và không hiển thị empty state. | Cover trạng thái ngay trên empty boundary. |

## 8. Quá trình lựa chọn test case

Chọn 3 test case theo Robust BVA cho lower boundary của `cartLineQuantity`: `0`, `1`, `2`. Dữ liệu nominal dùng chung là sản phẩm `iPhone 15 Pro Max` với đơn giá `30000000`.

Bổ sung 2 test case BVA cho `cartItemCount` vì FR-26/FR-07 đặc tả rõ hai trạng thái liền kề của collection: giỏ trống (`0`) và giỏ có sản phẩm (`1`). Không tạo test case cho `cartItemCount = -1` vì đây là trạng thái không thể tạo bằng thao tác black-box và không có expected behavior quan sát được.

Không tạo Cartesian product với xóa sản phẩm, nhãn tổng tiền, hoặc Tiếp tục mua sắm vì các hành vi đó đã phù hợp với Domain Testing và không phải boundary định lượng. Không tạo test case cho upper boundary vì FR-26/FR-07 không đặc tả số lượng tối đa, tồn kho, hoặc số dòng tối đa trong giỏ.

## 9. Ma trận truy vết

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference |
|---|---|---|---|---|---|
| TC-FR26-BVA-001 | BV-CARTQTY-001 | Minimum quantity ON | 1 | Valid | FR-26, FR-07, FR-06 |
| TC-FR26-BVA-002 | BV-CARTQTY-002 | Minimum quantity OFF⁻ | 0 | Invalid | FR-26, FR-07, FR-06 |
| TC-FR26-BVA-003 | BV-CARTQTY-003 | Minimum quantity OFF⁺ | 2 | Valid | FR-26, FR-07, FR-06 |
| TC-FR26-BVA-004 | BV-CARTCOUNT-001 | Empty collection ON | 0 | Valid | FR-26, FR-07 |
| TC-FR26-BVA-005 | BV-CARTCOUNT-002 | Empty collection OFF⁺ | 1 | Valid | FR-26, FR-07 |

## 10. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng biến có biên | 2 |
| Tổng lower boundaries | 2 |
| Tổng upper boundaries | 0 |
| Tổng dependent boundaries | 3 |
| Phương pháp BVA | Robust BVA cho lower boundary và empty/non-empty boundary |
| Tổng boundary values | 6 |
| Tổng test cases | 5 |
| Boundary đã cover | 5 |
| Boundary chưa cover | 1 |

| Boundary / Candidate | Trạng thái | Test Case / Lý do |
|---|---|---|
| `cartLineQuantity = 1` | Đã cover | TC-FR26-BVA-001 |
| `cartLineQuantity = 0` | Đã cover | TC-FR26-BVA-002 |
| `cartLineQuantity = 2` | Đã cover | TC-FR26-BVA-003 |
| `cartItemCount = 0` | Đã cover | TC-FR26-BVA-004 |
| `cartItemCount = 1` | Đã cover | TC-FR26-BVA-005 |
| `cartItemCount = -1` | Bị chặn do thiếu trạng thái black-box hợp lệ | Không thể tạo giỏ có số dòng âm qua UI/hành vi người dùng. |
| Upper boundary của `cartLineQuantity` | Bị chặn do thiếu requirement | Không có max quantity hoặc tồn kho tối đa được đặc tả. |
| Upper boundary của `cartItemCount` | Bị chặn do thiếu requirement | Không có giới hạn số dòng sản phẩm trong giỏ. |
| `sameProductAdd` | Chủ động loại trừ | Đây là rule trạng thái/category, không phải boundary. |
| `deleteConfirmationChoice` | Chủ động loại trừ | Đây là lựa chọn categorical. |
| `totalLabel` | Chủ động loại trừ | Đây là kiểm tra text chính xác. |

## 11. Giả định và thông tin chưa được đặc tả

- Giả định cần xác nhận: Lower boundary `cartLineQuantity = 1` áp dụng cho dòng sản phẩm đang tồn tại trong giỏ hàng trên Mobile, dựa trên số lượng tối thiểu khi thêm sản phẩm ở FR-06 và yêu cầu giỏ hàng tương đương FR-07.
- Chưa được đặc tả: Hành vi chính xác khi bấm nút - tại số lượng 1 là giữ nguyên số lượng, disable nút -, hay mở dialog xác nhận xóa.
- Chưa được đặc tả: Số lượng tối đa cho một dòng sản phẩm trong giỏ hàng.
- Chưa được đặc tả: Giới hạn tồn kho hoặc quan hệ giữa số lượng trong giỏ và số lượng còn hàng.
- Chưa được đặc tả: Giới hạn số dòng sản phẩm tối đa trong giỏ hàng.
