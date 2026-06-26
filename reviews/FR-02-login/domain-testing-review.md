# Review test case - FR-02: Đăng nhập & Khóa tài khoản

## 1. Phạm vi review

| Hạng mục | File / thư mục |
|---|---|
| Requirement | `requirements/system-requirements.md` |
| Analysis | `analysis/FR-02-login/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-02-login/domain-testing/TC-FR02-DT-001.md` đến `TC-FR02-DT-010.md` |
| Technique | Domain Testing |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Đúng requirement reference | Đạt |
| Đúng technique Domain Testing | Đạt |
| Miền hết khóa là tại hoặc sau 30 giây | Đạt |
| `31` giây chỉ là test data an toàn khi chạy thủ công | Đạt |
| Login thành công/nhận JWT tách khỏi lưu token/gửi header | Đạt |
| Email/password rỗng được ghi là điều kiện suy ra | Đạt |
| Test data cụ thể | Đạt |
| Expected result quan sát được | Đạt |
| Traceability từ test case về analysis | Đạt |
| Status ban đầu `Not Run / None` | Đạt |
| Readiness | Sẵn sàng execution |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR02-DT-003 | Major | `analysis/FR-02-login/domain-testing-analysis.md`, `TC-FR02-DT-009.md` | Miền hết khóa trước đó mô tả bằng “sau ít nhất 31 giây”, dễ hiểu sai thành rule mới thay vì dữ liệu test an toàn. | Có thể làm lệch FR-02 vì requirement nêu khóa 30 giây. | Đã sửa: analysis ghi miền hợp lệ là tại hoặc sau 30 giây; TC-FR02-DT-009 dùng 31 giây chỉ khi chạy thủ công để giảm rủi ro timing. |
| REV-FR02-DT-004 | Major | `analysis/FR-02-login/domain-testing-analysis.md`, `TC-FR02-DT-001.md` | Login thành công, nhận JWT, lưu token và gửi `Authorization` header bị gộp trong một condition/test case. | Một test case có nhiều mục tiêu quan sát khác nhau, traceability kém rõ. | Đã sửa: TC-FR02-DT-001 chỉ kiểm tra login thành công/nhận JWT; tạo TC-FR02-DT-010 cho lưu token và gửi header. |
| REV-FR02-DT-005 | Minor | `analysis/FR-02-login/domain-testing-analysis.md`, TC-FR02-DT-002, TC-FR02-DT-004 | Email/password rỗng chưa nhấn rõ là điều kiện suy ra, không phải rule `required` được đặc tả trực tiếp. | Có nguy cơ tự thêm validation rule. | Đã sửa: analysis và test case ghi rõ đây là điều kiện kiểm thử suy ra; rule/thông báo cụ thể là `Chưa được đặc tả`. |

Không còn finding Critical hoặc Major chưa xử lý.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-DT-001 | FR-02 | COND-FR02-DT-001 | EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05 | Hợp lệ | Đăng nhập thành công và nhận JWT. |
| TC-FR02-DT-002 | FR-02 | COND-FR02-DT-002 | EC-EMAIL-I01, EC-TOKEN-I01 | Hợp lệ | Email rỗng là điều kiện suy ra. |
| TC-FR02-DT-003 | FR-02 | COND-FR02-DT-003 | EC-EMAIL-I02, EC-TOKEN-I01 | Hợp lệ | HTML5 email format. |
| TC-FR02-DT-004 | FR-02 | COND-FR02-DT-004 | EC-PASSWORD-I01, EC-TOKEN-I01 | Hợp lệ | Password rỗng là điều kiện suy ra. |
| TC-FR02-DT-005 | FR-02 | COND-FR02-DT-005 | EC-EMAIL-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-01 | Hợp lệ | Email không tồn tại, không lộ nguyên nhân. |
| TC-FR02-DT-006 | FR-02 | COND-FR02-DT-006 | EC-PASSWORD-I02, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-I01, DC-02 | Hợp lệ | Sai password dưới ngưỡng khóa. |
| TC-FR02-DT-007 | FR-02 | COND-FR02-DT-007 | EC-PASSWORD-I02, EC-FAILEDCOUNT-I01, EC-LOCK-I01, EC-TOKEN-I01, DC-02, DC-03 | Hợp lệ | Khóa sau 3 lần sai liên tiếp. |
| TC-FR02-DT-008 | FR-02 | COND-FR02-DT-008 | EC-PASSWORD-V01, EC-LOCK-I01, EC-TOKEN-I01, DC-04 | Hợp lệ | Đang khóa chặn cả mật khẩu đúng. |
| TC-FR02-DT-009 | FR-02 | COND-FR02-DT-009 | EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05 | Hợp lệ | Hết khóa tại/sau 30 giây; 31 giây là test data an toàn. |
| TC-FR02-DT-010 | FR-02 | COND-FR02-DT-010 | EC-TOKEN-V02, DC-06 | Hợp lệ | Client lưu token và gửi `Authorization` header. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Email hợp lệ | TC-FR02-DT-001, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Dùng trong các luồng xác thực và lock. |
| Email rỗng | TC-FR02-DT-002 | Đạt | Điều kiện suy ra, không phải rule trực tiếp. |
| Email sai HTML5 format | TC-FR02-DT-003 | Đạt | Requirement có nêu `type="email"`. |
| Account tồn tại | TC-FR02-DT-001, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Cần cho success, sai mật khẩu, lock. |
| Account không tồn tại | TC-FR02-DT-005 | Đạt | Kiểm tra không lộ nguyên nhân. |
| Password đúng | TC-FR02-DT-001, TC-FR02-DT-008, TC-FR02-DT-009 | Đạt | Bao phủ success, đang khóa, hết khóa. |
| Password rỗng | TC-FR02-DT-004 | Đạt | Điều kiện suy ra, không phải rule trực tiếp. |
| Password sai | TC-FR02-DT-006, TC-FR02-DT-007 | Đạt | Dưới ngưỡng và đạt ngưỡng khóa. |
| Dưới ngưỡng khóa | TC-FR02-DT-006 | Đạt | Không tạo duplicate cho lần sai thứ 2 vì không thêm class mới. |
| Đạt ngưỡng khóa | TC-FR02-DT-007 | Đạt | Bao phủ điều kiện 3 lần sai liên tiếp. |
| Đang trong 30 giây khóa | TC-FR02-DT-008 | Đạt | Kiểm tra credential đúng vẫn bị chặn. |
| Hết khóa tại hoặc sau 30 giây | TC-FR02-DT-009 | Đạt | Dùng 31 giây làm dữ liệu an toàn khi chạy thủ công. |
| Hệ thống trả JWT khi login thành công | TC-FR02-DT-001, TC-FR02-DT-009 | Đạt | Tách khỏi lưu/gửi token. |
| Client lưu token và gửi header | TC-FR02-DT-010 | Đạt | Cần công cụ quan sát storage/network. |
| Không token khi thất bại | TC-FR02-DT-002 đến TC-FR02-DT-008 | Đạt | Mỗi case cover invalid class khác nhau. |

Không phát hiện duplicate mục tiêu chính sau khi tách TC-FR02-DT-010.

## 6. Kết luận readiness

Sẵn sàng execution.

Các test case đã được đồng bộ với analysis. Những điểm chưa được đặc tả như rule `required`, thông báo lỗi cụ thể, reset counter và khả năng quan sát token/header đã được ghi rõ.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Có thể reset hoặc chuẩn bị trạng thái tài khoản `test@eshop.com` về không khóa và 0 lần sai liên tiếp trước các test độc lập.
- Giả định cần xác nhận: Người kiểm thử có thể quan sát token/header bằng browser devtools, log proxy, hoặc công cụ kiểm thử tương đương.
- Giả định cần xác nhận: Khi chạy thủ công case hết khóa, dùng 31 giây là dữ liệu an toàn để tránh thao tác sát mốc 30 giây.
- Chưa được đặc tả: Cách quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Nội dung chính xác của message lỗi khi login thất bại hoặc tài khoản bị khóa.
- Chưa được đặc tả: Rule `required` hoặc thông báo cụ thể cho Email/Mật khẩu rỗng.
