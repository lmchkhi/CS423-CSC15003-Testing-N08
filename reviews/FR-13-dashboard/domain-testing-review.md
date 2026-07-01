# Review test case - FR-13: Dashboard

## 1. Phạm vi review

| Hạng mục | File |
|---|---|
| Requirement chính | `requirements/system-requirements.md` - FR-13 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` |
| Analysis | `analysis/FR-13-dashboard/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-13-dashboard/domain-testing/TC-FR13-DT-001.md` đến `TC-FR13-DT-006.md` |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Technique đúng Domain Testing | Đạt |
| Có valid và invalid classes | Đạt |
| Test data cụ thể | Đạt |
| Expected Result quan sát được | Đạt |
| Traceability giữa analysis và test case | Đạt |
| Không đưa endpoint/method/request body/công cụ kiểm thử vào test case | Đạt |
| Status ban đầu | `Not Run / None` |

## 3. Findings cần sửa

Không còn finding Critical/Major/Minor đang mở sau khi sửa.

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái |
|---|---|---|---|---|---|
| REV-FR13-001 | Minor | `analysis/FR-13-dashboard/domain-testing-analysis.md` - mục 8 | Số liệu tổng valid/invalid equivalence class trong bảng coverage bị đếm lệch so với danh sách class. | Làm giảm độ tin cậy của coverage summary, dù test case và traceability vẫn đúng. | Đã sửa: cập nhật tổng valid classes thành `8` và tổng invalid classes thành `4`. |
| Không có finding mở | - | - | Không phát hiện thêm lỗi format, traceability, dữ liệu test hoặc expected result cần sửa. | - | Đã review |

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR13-DT-001 | FR-13 | COND-FR13-DT-001 | EC-SESSION-V01, EC-DATASET-V01, EC-COUNT-V01, DC-03 | Hợp lệ | Bao phủ dữ liệu rỗng. |
| TC-FR13-DT-002 | FR-13 | COND-FR13-DT-002 | EC-SESSION-V01, EC-DATASET-V02, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | Hợp lệ | Bao phủ một đơn delivered. |
| TC-FR13-DT-003 | FR-13 | COND-FR13-DT-003 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | Hợp lệ | Bao phủ cộng dồn nhiều đơn delivered. |
| TC-FR13-DT-004 | FR-13 | COND-FR13-DT-004 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-STATUS-I01, EC-AMOUNT-V01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | Hợp lệ | Bao phủ loại trừ trạng thái không delivered khỏi doanh thu. |
| TC-FR13-DT-005 | FR-13 | COND-FR13-DT-005 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-I01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | Hợp lệ | Bao phủ có đơn hàng nhưng không có đơn delivered. |
| TC-FR13-DT-006 | FR-12, FR-13 | COND-FR13-DT-006 | EC-ROLE-I01, DC-01 | Hợp lệ | Bao phủ dependency truy cập phân hệ Admin. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Admin truy cập hợp lệ | TC-FR13-DT-001 đến TC-FR13-DT-005 | Đạt | Điều kiện danh nghĩa cho Dashboard. |
| User không có quyền Admin | TC-FR13-DT-006 | Đạt | Một invalid access representative, không mở rộng sang toàn bộ FR-12. |
| Tập dữ liệu rỗng | TC-FR13-DT-001 | Đạt | Expected Result quan sát được. |
| Một đơn delivered | TC-FR13-DT-002 | Đạt | Bao phủ rule doanh thu cơ bản. |
| Nhiều đơn delivered | TC-FR13-DT-003 | Đạt | Bao phủ phép cộng dồn. |
| Trạng thái khác delivered không tính doanh thu | TC-FR13-DT-004, TC-FR13-DT-005 | Đạt | Không duplicate vì một case có dữ liệu trộn, một case không có delivered. |
| Tổng số đơn hàng đếm toàn bộ dataset | TC-FR13-DT-001 đến TC-FR13-DT-005 | Đạt | Phù hợp FR-13, không thêm filter chưa đặc tả. |
| EC-SESSION-I01 | Không cover | Chủ động loại trừ | Đã có EC-ROLE-I01 đại diện invalid access; không đăng nhập thuộc trọng tâm FR-12. |

## 6. Kết luận readiness

Sẵn sàng execution.

Các file đã được review theo checklist: requirement reference, technique, ID, test data cụ thể, Expected Result quan sát được, Preconditions, invalid isolation, Status `Not Run / None`, tiếng Việt có dấu và không đưa chi tiết endpoint/method/request body/công cụ kiểm thử vào analysis/test case.

## 7. Giả định và thông tin cần xác nhận

- Cách chuẩn bị dữ liệu đơn hàng cho môi trường test chưa được FR-13 đặc tả.
- Định dạng hiển thị tiền tệ, ký hiệu tiền, dấu phân tách hàng nghìn và quy tắc làm tròn chưa được FR-13 đặc tả.
- Cách phản hồi khi user không có quyền Admin truy cập Dashboard chưa được đặc tả; test case chỉ yêu cầu không hiển thị dữ liệu Dashboard.
