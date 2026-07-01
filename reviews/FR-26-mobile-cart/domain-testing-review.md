# Review test case - FR-26: Giỏ hàng trên Mobile

## 1. Phạm vi review

| Hạng mục | File / Thư mục |
|---|---|
| Requirement chính | `requirements/system-requirements.md`, FR-26 và FR-07 được tham chiếu bởi FR-26 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md`, chỉ dùng để kiểm tra tính nhất quán kỹ thuật, không đưa chi tiết kỹ thuật triển khai hoặc công cụ kiểm thử vào artifact |
| Tài liệu đối chiếu coverage | `reports/main-report.md` trên nhánh `origin/23127062`, phần FR-07 có 14 test case Domain Testing |
| Analysis | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-26-mobile-cart/domain-testing/TC-FR26-DT-001.md` đến `TC-FR26-DT-014.md` |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Technique | Đúng Domain Testing |
| Ngôn ngữ | Tiếng Việt có dấu chuẩn |
| Tách analysis và test case | Đạt |
| Mỗi test case một file | Đạt |
| Tổng test case Domain Testing | 14 |
| Đồng bộ mức chi tiết với FR-07 | Đạt sau khi tách các mục bị gộp |
| Test data cụ thể | Đạt |
| Expected Result quan sát được | Đạt |
| Status ban đầu | `Not Run / None` |
| Traceability | Đạt |
| Chi tiết kỹ thuật triển khai trong analysis/test case | Không có |
| Kết luận | Sẵn sàng execution, với các giả định cần xác nhận đã ghi rõ |

## 3. Findings cần sửa

| Finding ID | Mức độ | File | Mô tả vấn đề | Ảnh hưởng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|---|
| REV-FR26-DT-001 | Major | `analysis/FR-26-mobile-cart/domain-testing-analysis.md`, `tests/test-cases/FR-26-mobile-cart/domain-testing/` | Bộ trước chỉ có 9 test case vì gộp nhiều mục tiêu FR-07 vào cùng test case, trong khi FR-07 ở main report có 14 Domain Testing case. | Coverage khó đối chiếu với FR-07 và dễ bị xem là thiếu test case cho FR-26 tương đương FR-07. | Tách thành 14 test condition/test case: đủ cột, nhãn Đơn giá, nút +/-, tăng, giảm, thêm trùng, dialog xóa, xác nhận xóa, hủy xóa, Tiếp tục mua sắm, Tổng cộng, empty state, Thành tiền, nhiều sản phẩm khác nhau. | Đã xử lý |
| REV-FR26-DT-002 | Major | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` | Bản trước ghi một số behavior như Thành tiền và nhiều sản phẩm khác nhau chỉ nằm trong test lớn hoặc chưa tách class riêng. | Traceability chưa rõ cho các mục tương ứng TC-FR-07-013 và TC-FR-07-014. | Bổ sung `lineSubtotal`, `differentProductAdd`, equivalence class, dependent condition và test case riêng. | Đã xử lý |
| REV-FR26-DT-003 | Minor | `tests/test-cases/FR-26-mobile-cart/domain-testing/*.md` | Cần đảm bảo các test case mới vẫn có Status ban đầu đúng. | Tránh gán kết quả khi chưa execution. | Giữ `Status / Related bugs` là `Not Run / None` cho tất cả 14 file. | Đã xử lý |
| REV-FR26-DT-004 | Minor | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` | Cần tách boundary số lượng khỏi Domain Testing sau khi đã có BVA riêng. | Tránh duplicate mục tiêu giữa Domain Testing và BVA. | Domain Testing chỉ kiểm tra hành vi tăng/giảm thông thường; boundary `0/1/2` nằm ở BVA. | Đã xử lý |
| REV-FR26-DT-005 | Minor | Tất cả artifact Domain Testing | Cần đổi dữ liệu sản phẩm cũ sang dữ liệu sản phẩm theo prompt hiện tại. | Test data không khớp yêu cầu người dùng và dễ giống artifact nhánh khác. | Đổi sang `iPhone 15 Pro Max` giá `30000000` và `Samsung Galaxy S24 Ultra` giá `28000000`; cập nhật thành tiền/tổng cộng tương ứng. | Đã xử lý |
| REV-FR26-DT-006 | Minor | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` | Rà soát khả năng thêm Domain Testing mới sau khi đã có 14 case. | Nếu thêm trùng sẽ làm bộ test phình ra nhưng không tăng coverage thực. | Không thêm Domain Testing mới vì các miền FR-26/FR-07 quan sát được đã cover; boundary empty/non-empty được bổ sung ở BVA thay vì Domain Testing. | Đã xử lý |

Không còn finding mở cần sửa trước execution.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR26-DT-001 | FR-26, FR-07 | COND-FR26-DT-001 | EC-CARTSTATE-V01, EC-COLUMNS-V01, EC-COLUMNS-I01, EC-MOBILE-V01, DC-01, DC-02 | Hợp lệ | Cover hiển thị đủ 5 thông tin/cột. |
| TC-FR26-DT-002 | FR-26, FR-07 | COND-FR26-DT-002 | EC-UNITPRICE-V01, EC-UNITPRICE-I01, DC-02 | Hợp lệ | Cover nhãn "Đơn giá". |
| TC-FR26-DT-003 | FR-26, FR-07 | COND-FR26-DT-003 | EC-QUANTITYCTRL-V01, EC-QUANTITYCTRL-I01, DC-02 | Hợp lệ | Cover sự hiện diện nút +/-. |
| TC-FR26-DT-004 | FR-26, FR-07 | COND-FR26-DT-004 | EC-QUANTITY-V01, DC-05 | Hợp lệ | Cover tăng số lượng bằng nút +. |
| TC-FR26-DT-005 | FR-26, FR-07 | COND-FR26-DT-005 | EC-QUANTITY-V02, DC-05 | Hợp lệ | Cover giảm số lượng bằng nút -. |
| TC-FR26-DT-006 | FR-26, FR-07 | COND-FR26-DT-006 | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-03 | Hợp lệ | Cover thêm trùng sản phẩm. |
| TC-FR26-DT-007 | FR-26, FR-07 | COND-FR26-DT-007 | EC-REMOVE-V01, EC-REMOVE-I01, DC-06 | Hợp lệ | Cover dialog xác nhận trước khi xóa. |
| TC-FR26-DT-008 | FR-26, FR-07 | COND-FR26-DT-008 | EC-REMOVE-V01, EC-REMOVECHOICE-V02, DC-06 | Hợp lệ | Cover xác nhận xóa. |
| TC-FR26-DT-009 | FR-26, FR-07 | COND-FR26-DT-009 | EC-REMOVE-V01, EC-REMOVE-I01, EC-REMOVECHOICE-V01, DC-06 | Hợp lệ | Cover hủy xóa. |
| TC-FR26-DT-010 | FR-26, FR-07 | COND-FR26-DT-010 | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-08 | Hợp lệ | Cover Tiếp tục mua sắm. |
| TC-FR26-DT-011 | FR-26, FR-07 | COND-FR26-DT-011 | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-07 | Hợp lệ | Cover nhãn "Tổng cộng". |
| TC-FR26-DT-012 | FR-26, FR-07 | COND-FR26-DT-012 | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | Hợp lệ | Cover empty state. |
| TC-FR26-DT-013 | FR-26, FR-07 | COND-FR26-DT-013 | EC-LINESUBTOTAL-V01, EC-LINESUBTOTAL-I01, DC-05 | Hợp lệ | Cover Thành tiền = Đơn giá × Số lượng. |
| TC-FR26-DT-014 | FR-26, FR-07 | COND-FR26-DT-014 | EC-DIFFERENTPRODUCT-V01, EC-DIFFERENTPRODUCT-I01, DC-04 | Hợp lệ | Cover nhiều sản phẩm khác nhau hiển thị nhiều dòng. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Hiển thị đủ 5 thông tin/cột | TC-FR26-DT-001 | Đạt | Tương ứng FR-07 TC-FR-07-001. |
| Nhãn "Đơn giá" | TC-FR26-DT-002 | Đạt | Được tách khỏi test hiển thị danh sách. |
| Nút +/- số lượng | TC-FR26-DT-003 | Đạt | Được tách khỏi test tăng/giảm. |
| Tăng số lượng bằng nút + | TC-FR26-DT-004 | Đạt | Có kiểm tra thành tiền/tổng tiền sau thao tác. |
| Giảm số lượng bằng nút - | TC-FR26-DT-005 | Đạt | Tránh boundary giảm từ 1 vì đã có BVA riêng. |
| Thêm trùng sản phẩm tăng số lượng, không tạo dòng mới | TC-FR26-DT-006 | Đạt | |
| Xóa sản phẩm có dialog xác nhận | TC-FR26-DT-007 | Đạt | |
| Xác nhận xóa sản phẩm | TC-FR26-DT-008 | Đạt | |
| Hủy xóa sản phẩm | TC-FR26-DT-009 | Đạt | |
| Tiếp tục mua sắm quay về trang chủ | TC-FR26-DT-010 | Đạt | |
| Nhãn "Tổng cộng" | TC-FR26-DT-011 | Đạt | |
| Giỏ hàng trống có hình minh họa và thông báo | TC-FR26-DT-012 | Đạt | Không bịa text cụ thể. |
| Thành tiền = Đơn giá × Số lượng | TC-FR26-DT-013 | Đạt | |
| Nhiều sản phẩm khác nhau hiển thị nhiều dòng | TC-FR26-DT-014 | Đạt | |
| Giao diện Mobile | Tất cả test case | Đạt | Được đặt trong precondition/module. |

Có overlap có chủ đích giữa một số test case vì FR-07 main report cũng tách các assertion UI thành test case riêng. Overlap này được chấp nhận để traceability giữa FR-26 và FR-07 rõ ràng hơn.

## 6. Kết luận readiness

Sẵn sàng execution.

Bộ Domain Testing FR-26 hiện có 14 test case, đồng bộ mức chi tiết với FR-07 trong main report nhưng được điều chỉnh wording sang Mobile App. Các phần thiếu requirement đã được ghi rõ và không dùng làm Expected Result vượt quá đặc tả.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Tester có thể chuẩn bị giỏ hàng bằng thao tác trên Mobile App trước khi chạy từng test case.
- Giả định cần xác nhận: Môi trường test có sản phẩm iPhone 15 Pro Max giá 30000000 và Samsung Galaxy S24 Ultra giá 28000000 hoặc sản phẩm tương đương với đơn giá xác định.
- Chưa được đặc tả: Text chính xác của dialog xác nhận xóa.
- Chưa được đặc tả: Text chính xác của thông báo giỏ hàng trống.
- Chưa được đặc tả: Trạng thái đăng nhập bắt buộc đối với màn Giỏ hàng trên Mobile trong FR-26.
