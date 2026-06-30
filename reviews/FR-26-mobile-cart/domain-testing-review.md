# Review test case - FR-26: Giỏ hàng trên Mobile

## 1. Phạm vi review

| Hạng mục | File / Thư mục |
|---|---|
| Requirement chính | `requirements/system-requirements.md`, FR-26 và FR-07 được tham chiếu bởi FR-26 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md`, chỉ dùng để kiểm tra tính nhất quán, không đưa chi tiết triển khai API hoặc công cụ kiểm thử vào artifact |
| Analysis | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-26-mobile-cart/domain-testing/TC-FR26-DT-001.md` đến `TC-FR26-DT-009.md` |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Technique | Đúng Domain Testing |
| Ngôn ngữ | Tiếng Việt có dấu chuẩn |
| Tách analysis và test case | Đạt |
| Mỗi test case một file | Đạt |
| Test data cụ thể | Đạt |
| Expected Result quan sát được | Đạt |
| Status ban đầu | `Not Run / None` |
| Traceability | Đạt |
| Chi tiết triển khai API trong analysis/test case | Đạt sau khi sửa |
| FR-26 kế thừa đầy đủ FR-07 | Đạt sau khi bổ sung Thao tác/nút xóa và Tiếp tục mua sắm |
| Kết luận | Sẵn sàng execution, với các giả định cần xác nhận đã ghi rõ |

## 3. Findings cần sửa

| Finding ID | Mức độ | File | Mô tả vấn đề | Ảnh hưởng | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|---|---|
| REV-FR26-001 | Major | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` | Bản nháp có câu nhắc trực tiếp đến chi tiết triển khai API bị giới hạn bởi prompt. | Có thể vi phạm phạm vi black-box theo requirement nghiệp vụ. | Thay bằng mô tả tổng quát rằng API specification chỉ dùng để xác nhận tính nhất quán kỹ thuật. | Đã xử lý |
| REV-FR26-002 | Major | `analysis/FR-26-mobile-cart/domain-testing-analysis.md` | Bản nháp ghi tổng valid classes và classes đã cover không khớp với danh sách equivalence class. | Làm sai báo cáo coverage và gây khó truy vết. | Cập nhật lại số liệu coverage theo bộ test hiện tại: 12 valid classes, 8 invalid classes, 19 classes đã cover, và 1 class chủ động loại trừ. | Đã xử lý |
| REV-FR26-003 | Major | `analysis/FR-26-mobile-cart/domain-testing-analysis.md`, `tests/test-cases/FR-26-mobile-cart/domain-testing/TC-FR26-DT-001.md` | Bản trước diễn giải FR-26 chỉ theo các bullet được lặp lại trong FR-26 nên chưa kế thừa đầy đủ FR-07, thiếu Thao tác/nút xóa trong DT-001 và thiếu test cho Tiếp tục mua sắm. | Coverage chưa đúng với câu "Ứng dụng Mobile phải hỗ trợ Giỏ hàng tương đương FR-07". | Cập nhật analysis để FR-26 y chang FR-07 trên Mobile, bổ sung Thao tác/nút xóa vào TC-FR26-DT-001 và thêm TC-FR26-DT-009 cho Tiếp tục mua sắm. | Đã xử lý |

Không còn finding mở cần sửa trước execution.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR26-DT-001 | FR-26, FR-07 | COND-FR26-DT-001 | EC-CARTSTATE-V01, EC-CARTLINE-V01, EC-CARTLINE-I01, EC-QUANTITY-I01, EC-TOTALLABEL-V01, EC-MOBILE-V01, DC-01, DC-05 | Hợp lệ | Cover hiển thị danh sách chính và loại trừ thiếu thông tin/nút chỉnh số lượng/nút xóa. |
| TC-FR26-DT-002 | FR-26, FR-07 | COND-FR26-DT-002 | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01, DC-02 | Hợp lệ | Cover business rule thêm trùng sản phẩm. |
| TC-FR26-DT-003 | FR-26 | COND-FR26-DT-003 | EC-QUANTITY-V01, DC-03 | Hợp lệ | Cover tăng số lượng bằng nút +. |
| TC-FR26-DT-004 | FR-26 | COND-FR26-DT-004 | EC-QUANTITY-V02, DC-03 | Hợp lệ | Cover giảm số lượng bằng nút - trong miền số lượng lớn hơn 1. |
| TC-FR26-DT-005 | FR-26, FR-07 | COND-FR26-DT-005 | EC-DELETE-V01, EC-DELETE-I01, EC-DELETECHOICE-V01, DC-04 | Hợp lệ | Cover dialog xác nhận và nhánh hủy. |
| TC-FR26-DT-006 | FR-26, FR-07 | COND-FR26-DT-006 | EC-DELETE-V01, EC-DELETECHOICE-V02, DC-04 | Hợp lệ | Cover xác nhận xóa sản phẩm. |
| TC-FR26-DT-007 | FR-26, FR-07 | COND-FR26-DT-007 | EC-CARTSTATE-V02, EC-CARTSTATE-I01, DC-01 | Hợp lệ | Cover empty state của giỏ hàng trống. |
| TC-FR26-DT-008 | FR-26, FR-07 | COND-FR26-DT-008 | EC-TOTALLABEL-V01, EC-TOTALLABEL-I01, DC-05 | Hợp lệ | Cover nhãn chính xác "Tổng cộng". |
| TC-FR26-DT-009 | FR-26, FR-07 | COND-FR26-DT-009 | EC-CONTINUE-V01, EC-CONTINUE-I01, DC-06 | Hợp lệ | Cover nút Tiếp tục mua sắm được FR-26 kế thừa từ FR-07. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Giỏ hàng có sản phẩm hiển thị danh sách | TC-FR26-DT-001 | Đạt | Expected Result quan sát được. |
| Dòng sản phẩm có đủ Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác | TC-FR26-DT-001 | Đạt | Có kiểm tra nút +/- và nút xóa trong cùng test. |
| Thêm trùng sản phẩm tăng số lượng, không tạo dòng mới | TC-FR26-DT-002 | Đạt | Không duplicate với test tăng bằng nút + vì thao tác nguồn khác nhau. |
| Tăng số lượng bằng nút + | TC-FR26-DT-003 | Đạt | Có kiểm tra thành tiền và tổng tiền. |
| Giảm số lượng bằng nút - | TC-FR26-DT-004 | Đạt | Tránh vùng chưa đặc tả khi số lượng bằng 1. |
| Xóa sản phẩm có dialog xác nhận, nhánh hủy | TC-FR26-DT-005 | Đạt | Isolate hành vi hủy. |
| Xóa sản phẩm có dialog xác nhận, nhánh xác nhận | TC-FR26-DT-006 | Đạt | Isolate hành vi xóa. |
| Giỏ hàng trống có hình minh họa và thông báo rõ ràng | TC-FR26-DT-007 | Đạt | Không bịa text cụ thể. |
| Nhãn tổng tiền chính xác "Tổng cộng" | TC-FR26-DT-008 | Đạt | Có một phần overlap với TC-FR26-DT-001 nhưng được giữ vì requirement nhấn mạnh text chính xác. |
| Tiếp tục mua sắm quay về trang chủ | TC-FR26-DT-009 | Đạt | Bổ sung để FR-26 y chang FR-07 trên Mobile. |
| Giao diện Mobile | Tất cả test case | Đạt | Được đặt trong precondition/module, không tạo test riêng cho giao diện không phải Mobile. |

Không phát hiện duplicate không cần thiết. TC-FR26-DT-008 có overlap có chủ đích với TC-FR26-DT-001 để kiểm tra riêng requirement về nhãn chính xác. TC-FR26-DT-009 được tách riêng vì đây là hành vi điều hướng khác với hiển thị danh sách giỏ hàng.

## 6. Kết luận readiness

Sẵn sàng execution.

Bộ test case có thể chạy thủ công trên Mobile App sau khi chuẩn bị được dữ liệu giỏ hàng theo preconditions. Các phần thiếu requirement đã được ghi trong analysis, không dùng làm expected result vượt quá đặc tả.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Tester có thể chuẩn bị giỏ hàng bằng thao tác trên Mobile App trước khi chạy từng test case.
- Giả định cần xác nhận: Môi trường test có sản phẩm Áo thun Basic và Balo Mini hoặc sản phẩm tương đương với đơn giá xác định.
- Chưa được đặc tả: Text chính xác của dialog xác nhận xóa.
- Chưa được đặc tả: Text chính xác của thông báo giỏ hàng trống.
- Chưa được đặc tả: Hành vi khi bấm nút - tại số lượng 1 và giới hạn số lượng tối đa.
- Chưa được đặc tả: Trạng thái đăng nhập bắt buộc đối với màn Giỏ hàng trên Mobile trong FR-26.
