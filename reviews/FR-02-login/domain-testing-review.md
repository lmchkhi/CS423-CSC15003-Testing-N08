# Review test case - FR-02: Đăng nhập và Khóa tài khoản

## 1. Phạm vi review

| Hạng mục | Đường dẫn |
|---|---|
| Requirement nguồn | `requirements/system-requirements.md` |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` |
| Analysis | `analysis/FR-02-login/domain-testing-analysis.md` |
| Test cases | `tests/test-cases/FR-02-login/domain-testing/TC-FR02-DT-001.md` đến `TC-FR02-DT-009.md` |

Review được thực hiện theo hướng black-box. Tài liệu API chỉ được dùng để đối chiếu tính nhất quán của chi tiết kỹ thuật; review không yêu cầu đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case.

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Requirement reference | Đạt: các file tham chiếu FR-02, riêng email/password field có tham chiếu FR-22 khi cần. |
| Technique | Đạt: analysis và test case dùng Domain Testing. |
| Test data cụ thể | Đạt: mỗi test case có giá trị cụ thể như `test@eshop.com`, `Test1234!`, `Wrong123!`, `abc`. |
| Expected Result quan sát được | Đạt: nêu rõ accepted/rejected, token/trạng thái xác thực, lockout 30 giây, không tạo token. |
| Traceability | Đạt: mỗi test case có condition, equivalence class và analysis file. |
| Invalid case isolate điều kiện chính | Đạt: các invalid case giữ input còn lại ở giá trị valid nominal, trừ các chuỗi state cần thiết cho lockout. |
| Status ban đầu | Đạt: tất cả test case là `Not Run / None`. |

## 3. Findings cần sửa

| Mã finding | Mức độ | File / dòng | Mô tả vấn đề | Ảnh hưởng | Xử lý |
|---|---|---|---|---|---|
| REV-FR02-001 | Minor | `analysis/FR-02-login/domain-testing-analysis.md` | Ban đầu có ghi chú nhắc đến "Endpoint/API cụ thể" trong DC-05. | Có thể bị hiểu là đưa chi tiết API vào analysis, trong khi người dùng yêu cầu không đưa endpoint/method/request body/công cụ vào artifact. | Đã sửa thành "Chi tiết kỹ thuật cụ thể không đưa vào test case theo yêu cầu người dùng." |

Không còn finding Critical hoặc Major sau khi sửa.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-DT-001 | FR-02 | COND-FR02-DT-001 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V01, EC-TOKEN-V01, DC-01, DC-05 | Hợp lệ | Luồng đăng nhập thành công danh nghĩa. |
| TC-FR02-DT-002 | FR-02, FR-22 | COND-FR02-DT-002 | EC-EMAIL-I01, EC-PASSWORD-V01, EC-TOKEN-I01 | Hợp lệ | Email sai HTML5 format. |
| TC-FR02-DT-003 | FR-02 | COND-FR02-DT-003 | EC-EMAIL-V02, EC-PASSWORD-V01, EC-TOKEN-I01, DC-01 | Hợp lệ | Email đúng format nhưng không tồn tại. |
| TC-FR02-DT-004 | FR-02 | COND-FR02-DT-004 | EC-EMAIL-V01, EC-PASSWORD-I01, EC-ACCOUNT-V01, EC-COUNTER-V01, EC-TOKEN-I01, DC-02 | Hợp lệ | Dưới ngưỡng 3 lần sai liên tiếp. |
| TC-FR02-DT-005 | FR-02 | COND-FR02-DT-005 | EC-EMAIL-V01, EC-PASSWORD-I01, EC-COUNTER-I01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-02, DC-03 | Hợp lệ | Lần sai thứ 3 kích hoạt khóa. |
| TC-FR02-DT-006 | FR-02 | COND-FR02-DT-006 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-04 | Hợp lệ | Tài khoản đang khóa dù password đúng. |
| TC-FR02-DT-007 | FR-02 | COND-FR02-DT-007 | EC-EMAIL-V01, EC-PASSWORD-V01, EC-ACCOUNT-V02, EC-TOKEN-V01, DC-03, DC-05 | Hợp lệ | Hết 30 giây tạm khóa. |
| TC-FR02-DT-008 | FR-02 | COND-FR02-DT-008 | EC-EMAIL-I02, EC-PASSWORD-V01, EC-TOKEN-I01 | Hợp lệ | Email trống; message cụ thể Chưa được đặc tả. |
| TC-FR02-DT-009 | FR-02, FR-22 | COND-FR02-DT-009 | EC-EMAIL-V01, EC-PASSWORD-I02, EC-TOKEN-I01 | Hợp lệ | Mật khẩu trống và password field. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| Email hợp lệ, đã đăng ký | TC-FR02-DT-001, TC-FR02-DT-004, TC-FR02-DT-005, TC-FR02-DT-006, TC-FR02-DT-007, TC-FR02-DT-009 | Đã cover | Giá trị danh nghĩa được tái sử dụng hợp lý. |
| Email đúng format nhưng không tồn tại | TC-FR02-DT-003 | Đã cover | Không duplicate với password sai vì mục tiêu là thông báo không lộ nguyên nhân. |
| Email sai HTML5 format | TC-FR02-DT-002 | Đã cover | Input còn lại valid nominal. |
| Email trống | TC-FR02-DT-008 | Đã cover | Message cụ thể Chưa được đặc tả. |
| Password đúng | TC-FR02-DT-001, TC-FR02-DT-006, TC-FR02-DT-007 | Đã cover | Bao phủ cả unlocked, locked và lock expired. |
| Password sai | TC-FR02-DT-004, TC-FR02-DT-005 | Đã cover | Hai test không duplicate vì một test dưới ngưỡng, một test tại ngưỡng. |
| Password trống | TC-FR02-DT-009 | Đã cover | Message cụ thể Chưa được đặc tả. |
| Bộ đếm sai 0-2 | TC-FR02-DT-004 | Đã cover | Kiểm tra không khóa quá sớm. |
| Bộ đếm sai từ 3 trở lên | TC-FR02-DT-005 | Đã cover | Kiểm tra kích hoạt khóa 30 giây. |
| Tài khoản đang bị khóa | TC-FR02-DT-005, TC-FR02-DT-006 | Đã cover | TC-005 tạo trạng thái khóa, TC-006 kiểm tra password đúng vẫn bị từ chối. |
| Hết 30 giây tạm khóa | TC-FR02-DT-007 | Đã cover | Kiểm tra tài khoản có thể đăng nhập lại. |
| Token/trạng thái xác thực | TC-FR02-DT-001, TC-FR02-DT-007 và các invalid case | Đã cover | Valid có token; invalid không tạo token. |

Không phát hiện duplicate không cần thiết. Các chuỗi thao tác trong TC-FR02-DT-004, TC-FR02-DT-005, TC-FR02-DT-006 và TC-FR02-DT-007 là cần thiết vì requirement phụ thuộc vào state liên tiếp và thời gian khóa.

## 6. Kết luận readiness

Trạng thái: Sẵn sàng execution.

Bộ artifact đã có analysis, domain matrix, 9 test case riêng lẻ, traceability và coverage đầy đủ cho các miền có thể suy ra từ FR-02. Chưa có Actual Result nên không gán Pass/Fail và không tạo bug report.

## 7. Giả định và thông tin cần xác nhận

- Chưa được đặc tả thông báo lỗi chính xác cho credential sai, tài khoản bị khóa, email trống và password trống.
- Chưa được đặc tả bộ đếm đăng nhập sai có reset sau khi login thành công hoặc sau khi hết 30 giây tạm khóa hay không.
- Giả định cần xác nhận: có thể đưa tài khoản `test@eshop.com` về trạng thái không bị khóa trước mỗi test case bằng cách đợi hết 30 giây hoặc reset môi trường demo.
