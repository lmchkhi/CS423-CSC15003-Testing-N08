# BÁO CÁO CHÍNH - HW04: AUTOMATION TESTING

## 1. Thông tin sinh viên

| Mục               | Nội dung                                                                            |
| ----------------- | ----------------------------------------------------------------------------------- |
| Họ và tên         | Lâm Vĩ Khang                                                                        |
| MSSV              | 23127062                                                                            |
| Lớp               | CS423 / CSC13003                                                                    |
| Bài tập           | HW04 - Automation Testing                                                           |
| Hệ thống kiểm thử | EShop                                                                               |
| Công cụ chính     | Codex, Playwright                                                                   |
| Public repository | [CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08) |

## 2. Phạm vi và mục tiêu

Em tự động hóa ba chức năng web đã chọn, mỗi chức năng thuộc một pool khác nhau:

- Pool A - **FR-01: Đăng ký tài khoản**.
- Pool B - **FR-07: Giỏ hàng**.
- Pool C - **FR-16: Import sản phẩm từ CSV**.

Mục tiêu của em là chuyển các test case thành bộ kiểm thử Playwright theo hướng data-driven, chạy độc lập trên Chromium, Firefox và WebKit, tạo HTML report, đồng thời phân loại các failure để tách lỗi test, lỗi môi trường và lỗi sản phẩm.

## 3. Cách thực hiện

1. Em dùng AI để phân tích yêu cầu, đề xuất test case, dữ liệu và script Playwright.
2. Mỗi test case được lưu thành một file Markdown; dữ liệu được tách khỏi script sang JSON.
3. Em kiểm tra lại selector, dữ liệu đầu vào, assertion, cơ chế đồng bộ và tính độc lập giữa các case.
4. Em chạy từng feature trên ba browser. Mỗi cặp feature-browser được tính là một browser run và tạo một HTML report riêng.
5. Với mỗi failure, em xem screenshot/trace và đối chiếu đặc tả trước khi kết luận là product bug.
6. Bug được ghi thành báo cáo Markdown và liên kết với GitHub Issue; issue đã tồn tại được tái sử dụng để tránh trùng lặp.

Các suite sử dụng nhiều loại assertion, gồm kiểm tra trạng thái/giá trị, URL, nội dung hoặc thuộc tính DOM, số lượng phần tử và trạng thái backend/API. Không có test case nào bị bỏ lại ở trạng thái chưa tự động hóa.

## 4. Tổng hợp kết quả thực thi

| Feature                     | Test case tự động hóa | Lượt thực thi | Passed | Failed | Browser runs | Product bugs |
| --------------------------- | --------------------: | ------------: | -----: | -----: | -----------: | -----------: |
| FR-01 - Đăng ký tài khoản   |                    15 |            45 |     27 |     18 |            3 |            4 |
| FR-07 - Giỏ hàng            |                    14 |            42 |     15 |     27 |            3 |            7 |
| FR-16 - Import sản phẩm CSV |                    15 |            45 |     18 |     27 |            3 |            4 |
| **Tổng**                    |                **44** |       **132** | **60** | **72** |        **9** |       **15** |

“Lượt thực thi” được tính theo từng test case trên từng browser. Vì vậy, 44 test case chạy trên ba browser tạo thành 132 lượt thực thi. Các failure nhất quán giữa ba browser và được quy về 15 nguyên nhân lỗi sản phẩm, không phải 72 bug riêng biệt.

## 5. Báo cáo theo feature

### 5.1. FR-01 - Đăng ký tài khoản

Suite gồm 15 test case, bao phủ đăng ký hợp lệ, trường bắt buộc, định dạng và tính duy nhất của email, các lớp mật khẩu mạnh, trường xác nhận mật khẩu và điều hướng sau đăng ký. Mỗi browser đạt 9 pass và 6 fail.

Bốn lỗi sản phẩm được xác nhận:

| Bug         | Mô tả                                  | GitHub Issue                                                         |
| ----------- | -------------------------------------- | -------------------------------------------------------------------- |
| BUG-REG-001 | Mật khẩu hợp lệ theo FR-01 bị từ chối  | [#2](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/2) |
| BUG-REG-002 | Hệ thống chấp nhận email sai định dạng | [#3](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3) |
| BUG-REG-003 | Hệ thống cho phép đăng ký trùng email  | [#7](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7) |
| BUG-REG-004 | Form thiếu trường Xác nhận mật khẩu    | [#8](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8) |

Artifact: [test cases](../../tests/test-cases/account-registration/), [script](../../tests/e2e/account-registration.spec.mjs), [test data](../../tests/data/account-registration.json), [Chromium report](../../reports/account-registration/chromium/index.html), [Firefox report](../../reports/account-registration/firefox/index.html), [WebKit report](../../reports/account-registration/webkit/index.html), [execution summary](../../reports/account-registration/README.md).

### 5.2. FR-07 - Giỏ hàng

Suite gồm 14 test case, bao phủ empty state, cấu trúc bảng, thêm sản phẩm, gộp sản phẩm trùng, tăng/giảm số lượng, thành tiền, tổng cộng, xác nhận xóa và quay lại mua sắm. Mỗi browser đạt 5 pass và 9 fail.

Bảy lỗi sản phẩm được xác nhận:

| Bug          | Mô tả                                   | GitHub Issue                                                             |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------ |
| BUG-CART-001 | Empty state không có hình minh họa      | [#23](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/23)   |
| BUG-CART-002 | Tiêu đề cột đơn giá sai đặc tả          | [#19](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/19)   |
| BUG-CART-003 | Nhãn tổng tiền là “Tổng tạm tính”       | [#22](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/22)   |
| BUG-CART-004 | Thêm cùng sản phẩm tạo dòng trùng       | [#20](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/20)   |
| BUG-CART-005 | Không có nút cộng/trừ để chỉnh số lượng | [#18](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18)   |
| BUG-CART-006 | Xóa sản phẩm không có confirm dialog    | [#21](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/21)   |
| BUG-CART-007 | Nút quay lại mua sắm sai nhãn           | [#213](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/213) |

Artifact: [test cases](../../tests/test-cases/shopping-cart/), [script](../../tests/e2e/shopping-cart.spec.mjs), [test data](../../tests/data/shopping-cart.json), [Chromium report](../../reports/shopping-cart/chromium/index.html), [Firefox report](../../reports/shopping-cart/firefox/index.html), [WebKit report](../../reports/shopping-cart/webkit/index.html), [bug reports](../../bugs/shopping-cart/).

### 5.3. FR-16 - Import sản phẩm từ CSV

Suite gồm 15 test case, bao phủ file hợp lệ, file rỗng, RFC 4180, đuôi file, header, name rỗng, price không hợp lệ và rollback nguyên tử. Mỗi browser đạt 6 pass và 9 fail.

Bốn lỗi sản phẩm được xác nhận:

| Bug         | Mô tả                                                 | GitHub Issue                                                           |
| ----------- | ----------------------------------------------------- | ---------------------------------------------------------------------- |
| BUG-CSV-001 | Parser không hỗ trợ trường có dấu phẩy theo RFC 4180  | [#31](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/31) |
| BUG-CSV-002 | Chấp nhận file không có đuôi `.csv`                   | [#24](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/24) |
| BUG-CSV-003 | Không validate price và không rollback toàn bộ import | [#32](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32) |
| BUG-CSV-004 | Không phát hiện đúng header sai                       | [#25](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/25) |

Artifact: [test cases](../../tests/test-cases/product-csv-import/), [script](../../tests/e2e/product-csv-import.spec.mjs), [test data](../../tests/data/product-csv-import.json), [Chromium report](../../reports/product-csv-import/chromium/index.html), [Firefox report](../../reports/product-csv-import/firefox/index.html), [WebKit report](../../reports/product-csv-import/webkit/index.html), [execution summary](../../reports/product-csv-import/README.md).

## 6. Human review và gap analysis đối với script do AI tạo

AI giúp em tạo nhanh khung kiểm thử và phát hiện nhiều rủi ro, nhưng bản sinh ban đầu chưa đủ tin cậy để nộp trực tiếp. Em đã rà soát và sửa các nhóm vấn đề sau:

| Feature | Vấn đề trong bản AI                                                 | Rủi ro                                                                             | Điều chỉnh của em                                                                                          |
| ------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| FR-01   | Dữ liệu mật khẩu `Valid1 a` không đúng tập ký tự đặc biệt của FR-01 | Test email/uniqueness bị chặn bởi validation mật khẩu và cho kết luận sai          | Thay dữ liệu bằng mật khẩu tuân thủ đặc tả                                                                 |
| FR-01   | Dùng chung `waitForResponse` cho malformed email và duplicate email | Khi HTML5 validation hoạt động đúng, request không được gửi và test có thể timeout | Kiểm tra malformed email bằng validity/DOM; chỉ chờ response cho luồng duplicate email thực sự gửi request |
| FR-01   | Report ban đầu chưa làm MSSV dễ thấy                                | Không thỏa yêu cầu bằng chứng tác giả                                              | Đưa `Run by: 23127062` vào title và metadata của report                                                    |
| FR-16   | `baseURL` mặc định trỏ cổng 5173                                    | Test nhầm Web frontend thay vì Web Admin                                           | Chọn cổng 5174 khi `FEATURE_SLUG=product-csv-import`                                                       |
| FR-16   | TC-CSV-004/012 ép preview hoặc nút phải biến mất                    | False failure với implementation vẫn từ chối hợp lệ bằng thông báo và disable nút  | Oracle chấp nhận hai biểu hiện từ chối hợp lệ và kiểm tra trạng thái backend không đổi                     |
| FR-16   | Locator tên sản phẩm có thể khớp cả `alt` của ảnh                   | Strict-mode failure không liên quan requirement                                    | Scope locator vào đúng product row/cell                                                                    |
| FR-07   | Assertion quantity đọc toàn bộ dòng                                 | Số `1` có thể khớp nhầm từ giá như `123,456`                                       | Kiểm tra riêng từng cell: tên, đơn giá, số lượng, thành tiền và thao tác                                   |
| FR-07   | Chỉ kiểm tra nút `-` tồn tại                                        | Không chứng minh được hành vi giảm số lượng                                        | Tăng lên 2, bấm giảm, rồi kiểm tra quantity, thành tiền và tổng cộng trở lại ban đầu                       |
| FR-07   | Chấp nhận mọi JavaScript dialog                                     | Alert/prompt không đúng yêu cầu vẫn có thể làm test pass                           | Yêu cầu đúng `confirm`, nội dung liên quan “xóa”, rồi kiểm tra kết quả Cancel/Confirm                      |

Nguyên nhân chung là AI thường ưu tiên tạo đủ artifact, suy luận theo implementation hiện tại và xem kết quả chạy ổn định như dấu hiệu test đúng. Tuy nhiên, một oracle sai vẫn có thể chạy ổn định trên cả ba browser. Vì vậy, em đã truy vết assertion về đặc tả, kiểm tra khả năng có nhiều implementation hợp lệ và đọc evidence trước khi quy failure thành bug.
