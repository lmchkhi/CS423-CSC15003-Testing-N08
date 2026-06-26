# Review test case - FR-02: Đăng nhập & Khóa tài khoản

## 1. Phạm vi review

| Hạng mục | File / thư mục |
|---|---|
| Requirement | `requirements/system-requirements.md` |
| Analysis | `analysis/FR-02-login/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-02-login/domain-testing/TC-FR02-DT-001.md` đến `TC-FR02-DT-009.md` |
| Technique | Domain Testing |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Đúng requirement reference | Đạt |
| Đúng technique Domain Testing | Đạt |
| Test data cụ thể | Đạt |
| Expected result quan sát được | Đạt |
| Traceability từ test case về analysis | Đạt |
| Invalid case isolate một điều kiện chính | Đạt |
| Status ban đầu `Not Run / None` | Đạt |
| Domain Matrix chỉ nằm trong analysis | Đạt |
| Readiness | Sẵn sàng execution |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR02-001 | Minor | `analysis/FR-02-login/domain-testing-analysis.md` | Giá trị `failed_login_count` tăng đúng 1 đơn vị là trạng thái nội bộ, chưa có cách quan sát trực tiếp từ requirement. | Khi execution chỉ có thể kiểm chứng gián tiếp qua hành vi khóa sau 3 lần sai liên tiếp nếu không có log/API/admin. | Đã xử lý bằng cách ghi rõ requirement gap trong analysis và thiết kế TC-FR02-DT-006, TC-FR02-DT-007 để kiểm chứng gián tiếp. |
| REV-FR02-002 | Minor | Các test case invalid | Requirement không nêu thông báo lỗi cụ thể, chỉ yêu cầu phù hợp và không lộ nguyên nhân. | Không thể assert text chính xác mà không bịa requirement. | Đã xử lý bằng expected result theo hành vi quan sát được: bị từ chối, không có JWT Token, không tạo phiên, thông báo không tiết lộ chi tiết nguyên nhân. |

Không có finding Critical hoặc Major cần sửa trước execution.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-DT-001 | FR-02 | COND-FR02-DT-001 | EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05 | Hợp lệ | Happy path và token/header. |
| TC-FR02-DT-002 | FR-02 | COND-FR02-DT-002 | EC-EMAIL-I01, EC-TOKEN-I01 | Hợp lệ | Email rỗng. |
| TC-FR02-DT-003 | FR-02 | COND-FR02-DT-003 | EC-EMAIL-I02, EC-TOKEN-I01 | Hợp lệ | HTML5 email format. |
| TC-FR02-DT-004 | FR-02 | COND-FR02-DT-004 | EC-PASSWORD-I01, EC-TOKEN-I01 | Hợp lệ | Password rỗng. |
| TC-FR02-DT-005 | FR-02 | COND-FR02-DT-005 | EC-EMAIL-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-01 | Hợp lệ | Email không tồn tại, không lộ nguyên nhân. |
| TC-FR02-DT-006 | FR-02 | COND-FR02-DT-006 | EC-PASSWORD-I02, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-I01, DC-02 | Hợp lệ | Sai password dưới ngưỡng khóa. |
| TC-FR02-DT-007 | FR-02 | COND-FR02-DT-007 | EC-PASSWORD-I02, EC-FAILEDCOUNT-I01, EC-LOCK-I01, EC-TOKEN-I01, DC-02, DC-03 | Hợp lệ | Khóa sau 3 lần sai liên tiếp. |
| TC-FR02-DT-008 | FR-02 | COND-FR02-DT-008 | EC-PASSWORD-V01, EC-LOCK-I01, EC-TOKEN-I01, DC-04 | Hợp lệ | Đang khóa chặn cả mật khẩu đúng. |
| TC-FR02-DT-009 | FR-02 | COND-FR02-DT-009 | EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05 | Hợp lệ | Hết 30 giây khóa. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Email hợp lệ | TC-FR02-DT-001, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Dùng trong các luồng xác thực và lock. |
| Email rỗng | TC-FR02-DT-002 | Đạt | Invalid isolated. |
| Email sai HTML5 format | TC-FR02-DT-003 | Đạt | Invalid isolated. |
| Account tồn tại | TC-FR02-DT-001, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Cần cho success, sai mật khẩu, lock. |
| Account không tồn tại | TC-FR02-DT-005 | Đạt | Kiểm tra không lộ nguyên nhân. |
| Password đúng | TC-FR02-DT-001, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Bao phủ success, đang khóa, hết khóa. |
| Password rỗng | TC-FR02-DT-004 | Đạt | Invalid isolated. |
| Password sai | TC-FR02-DT-006, TC-FR02-DT-007 | Đạt | Dưới ngưỡng và đạt ngưỡng khóa. |
| Dưới ngưỡng khóa | TC-FR02-DT-006 | Đạt | Không tạo duplicate cho lần sai thứ 2 vì không thêm class mới. |
| Đạt ngưỡng khóa | TC-FR02-DT-007 | Đạt | Bao phủ điều kiện 3 lần sai liên tiếp. |
| Đang trong 30 giây khóa | TC-FR02-DT-008 | Đạt | Kiểm tra credential đúng vẫn bị chặn. |
| Sau khi hết 30 giây khóa | TC-FR02-DT-009 | Đạt | Kiểm tra có thể đăng nhập lại. |
| Token khi thành công | TC-FR02-DT-001, TC-FR02-DT-009 | Đạt | Có kiểm tra lưu/gửi token. |
| Không token khi thất bại | TC-FR02-DT-002 đến TC-FR02-DT-008 | Đạt | Không duplicate mục tiêu chính vì mỗi case cover invalid class khác nhau. |

## 6. Kết luận readiness

Sẵn sàng execution.

Các test case đã có dữ liệu cụ thể, bước thực thi rõ ràng, expected result quan sát được và traceability đầy đủ. Không có lỗi Critical/Major cần sửa trước khi chạy test.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Có thể reset hoặc chuẩn bị trạng thái tài khoản `test@eshop.com` về không khóa và 0 lần sai liên tiếp trước các test độc lập.
- Giả định cần xác nhận: Người kiểm thử có thể quan sát token/header bằng browser devtools, log proxy, hoặc công cụ kiểm thử tương đương.
- Chưa được đặc tả: Cách quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Nội dung chính xác của message lỗi khi login thất bại hoặc tài khoản bị khóa.
