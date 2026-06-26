# Review test case - FR-10: Trạng thái Đơn hàng

## 1. Phạm vi review

| Hạng mục | File / Thư mục |
|---|---|
| Requirement nguồn | `requirements/system-requirements.md` - FR-10 |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` - chỉ dùng để kiểm tra tính nhất quán kỹ thuật |
| Analysis | `analysis/FR-10-order-state-machine/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-10-order-state-machine/domain-testing/TC-FR10-DT-001.md` đến `TC-FR10-DT-014.md` |
| Technique | Domain Testing |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả | Ghi chú |
|---|---|---|
| Requirement reference | Đạt | Tất cả artifact truy vết về FR-10. |
| Technique | Đạt | Analysis và test case đều theo Domain Testing. |
| Test data cụ thể | Đạt | Mỗi test case có mã đơn, trạng thái hiện tại, actor và trạng thái đích cụ thể. |
| Expected Result quan sát được | Đạt | Có nêu accepted/rejected, trạng thái cuối và phản hồi lỗi/thành công. |
| Traceability | Đạt | Mỗi test case map về một `COND-FR10-DT-*` và các equivalence class/dependent condition. |
| Invalid case isolate điều kiện chính | Đạt | Các invalid case giữ điều kiện còn lại ở trạng thái valid nominal, trừ case chủ đích kiểm tra actor/trạng thái ngoài domain. |
| Không đưa chi tiết API vào artifact | Đạt | Không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case. |
| Status ban đầu | Đạt | Tất cả test case là `Not Run / None`. |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả vấn đề | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR10-001 | Minor | `analysis/FR-10-order-state-machine/domain-testing-analysis.md` | FR-10 không đặc tả thông báo lỗi cụ thể cho từng loại chuyển đổi không hợp lệ. | Nếu test execution cần so khớp exact message thì chưa đủ oracle. | Đã xử lý bằng cách ghi `Chưa được đặc tả` và Expected Result chỉ yêu cầu lỗi phù hợp, trạng thái không đổi. |
| REV-FR10-002 | Minor | `analysis/FR-10-order-state-machine/domain-testing-analysis.md`; `TC-FR10-DT-014.md` | Actor Guest/chưa đăng nhập không được FR-10 đặc tả trực tiếp. | Có thể cần xác nhận trước khi execution nếu phạm vi FR-10 chỉ tập trung vào state machine sau xác thực. | Đã xử lý bằng cách đánh dấu `Giả định cần xác nhận`, không biến thành rule chắc chắn. |
| REV-FR10-003 | Minor | `analysis/FR-10-order-state-machine/domain-testing-analysis.md` | FR-10 không khẳng định Admin được hủy đơn ở trạng thái `shipping`. | Nếu tạo valid case cho Admin hủy khi `shipping` sẽ có nguy cơ bịa requirement. | Đã xử lý bằng cách không tạo valid test case cho `shipping` -> `canceled` bởi Admin và ghi rõ gap. |

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR10-DT-001 | FR-10 | COND-FR10-DT-001 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-V01, DC-01 | Hợp lệ | Chuyển `pending` -> `confirmed`. |
| TC-FR10-DT-002 | FR-10 | COND-FR10-DT-002 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V02, DC-01 | Hợp lệ | Chuyển `confirmed` -> `shipping`. |
| TC-FR10-DT-003 | FR-10 | COND-FR10-DT-003 | EC-CURRENT_STATUS-V03, EC-ACTOR-V01, EC-TARGET_STATUS-V03, DC-01 | Hợp lệ | Chuyển `shipping` -> `delivered`. |
| TC-FR10-DT-004 | FR-10 | COND-FR10-DT-004 | EC-CURRENT_STATUS-V01, EC-ACTOR-V02, EC-TARGET_STATUS-V04, DC-02 | Hợp lệ | User hủy đơn `pending`. |
| TC-FR10-DT-005 | FR-10 | COND-FR10-DT-005 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V04, DC-02 | Hợp lệ | Admin hủy đơn `confirmed`. |
| TC-FR10-DT-006 | FR-10 | COND-FR10-DT-006 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I01, DC-01 | Hợp lệ | Bước nhảy `pending` -> `shipping`. |
| TC-FR10-DT-007 | FR-10 | COND-FR10-DT-007 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-I02, DC-01 | Hợp lệ | Bước lùi `confirmed` -> `pending`. |
| TC-FR10-DT-008 | FR-10 | COND-FR10-DT-008 | EC-CURRENT_STATUS-V04, EC-ACTOR-V01, EC-TARGET_STATUS-I03, DC-03 | Hợp lệ | Final state `delivered`. |
| TC-FR10-DT-009 | FR-10 | COND-FR10-DT-009 | EC-CURRENT_STATUS-V05, EC-ACTOR-V01, EC-TARGET_STATUS-I04, DC-03 | Hợp lệ | Final state `canceled`. |
| TC-FR10-DT-010 | FR-10 | COND-FR10-DT-010 | EC-CURRENT_STATUS-V03, EC-ACTOR-V02, EC-TARGET_STATUS-I05, DC-02 | Hợp lệ | User không được tự hủy khi `shipping`. |
| TC-FR10-DT-011 | FR-10 | COND-FR10-DT-011 | EC-CURRENT_STATUS-V01, EC-ACTOR-I01, EC-TARGET_STATUS-V01, DC-04 | Hợp lệ | User thực hiện thao tác Admin xác nhận. |
| TC-FR10-DT-012 | FR-10 | COND-FR10-DT-012 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I06 | Hợp lệ | Trạng thái đích ngoài domain. |
| TC-FR10-DT-013 | FR-10 | COND-FR10-DT-013 | EC-CURRENT_STATUS-I01, EC-ACTOR-V01, EC-TARGET_STATUS-V01 | Hợp lệ | Trạng thái hiện tại ngoài domain. |
| TC-FR10-DT-014 | FR-10 | COND-FR10-DT-014 | EC-CURRENT_STATUS-V01, EC-ACTOR-I02, EC-TARGET_STATUS-V04, DC-04 | Cần xác nhận | Guest/chưa đăng nhập không được FR-10 đặc tả trực tiếp. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Chuyển hợp lệ `pending` -> `confirmed` | TC-FR10-DT-001 | Đã cover | Không trùng mục tiêu. |
| Chuyển hợp lệ `confirmed` -> `shipping` | TC-FR10-DT-002 | Đã cover | Không trùng mục tiêu. |
| Chuyển hợp lệ `shipping` -> `delivered` | TC-FR10-DT-003 | Đã cover | Không trùng mục tiêu. |
| Hủy hợp lệ từ `pending` | TC-FR10-DT-004 | Đã cover | Bao phủ User. |
| Hủy hợp lệ từ `confirmed` | TC-FR10-DT-005 | Đã cover | Bao phủ Admin. |
| Bước nhảy không hợp lệ | TC-FR10-DT-006 | Đã cover | Invalid isolate. |
| Bước lùi không hợp lệ | TC-FR10-DT-007 | Đã cover | Invalid isolate. |
| Final state `delivered` | TC-FR10-DT-008 | Đã cover | Invalid isolate. |
| Final state `canceled` | TC-FR10-DT-009 | Đã cover | Invalid isolate. |
| User hủy khi `shipping` | TC-FR10-DT-010 | Đã cover | Rule bắt buộc của FR-10. |
| User thực hiện thao tác Admin | TC-FR10-DT-011 | Đã cover | Quyền actor theo mô tả thao tác. |
| Trạng thái đích ngoài domain | TC-FR10-DT-012 | Đã cover | Robustness domain. |
| Trạng thái hiện tại ngoài domain | TC-FR10-DT-013 | Đã cover | Robustness domain. |
| Actor chưa đăng nhập/không xác định | TC-FR10-DT-014 | Cần xác nhận | Không phải gap do test case thiếu, là gap requirement. |
| Duplicate mục tiêu kiểm thử | Không có | Đạt | Các test case có mục tiêu coverage riêng. |

## 6. Kết luận readiness

Sẵn sàng execution.

Lưu ý khi execution: `TC-FR10-DT-013` cần cách chuẩn bị dữ liệu trạng thái ngoài domain, và `TC-FR10-DT-014` cần xác nhận phạm vi nếu giảng viên chỉ yêu cầu state machine sau xác thực. Các điểm này đã được ghi là requirement gap, không phải lỗi artifact.

## 7. Giả định và thông tin cần xác nhận

- Chưa được đặc tả exact validation message cho từng lỗi chuyển trạng thái.
- Chưa được đặc tả cách tạo dữ liệu đơn hàng ở từng trạng thái phục vụ execution.
- Giả định cần xác nhận: actor chưa đăng nhập/không xác định phải bị từ chối khi thao tác trạng thái đơn hàng.
- Giả định cần xác nhận: Admin không được xem là có quyền hủy đơn ở trạng thái `shipping` nếu requirement không nêu rõ cạnh chuyển `shipping` -> `canceled`.
