# Review test case - FR-02: Đăng nhập và Khóa tài khoản

## 1. Phạm vi review

| Hạng mục | Đường dẫn |
|---|---|
| Requirement nguồn | `requirements/system-requirements.md` |
| Tài liệu đối chiếu kỹ thuật | `requirements/api-specification.md` |
| Analysis | `analysis/FR-02-login/bva-analysis.md` |
| Test cases | `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-001.md` đến `TC-FR02-BVA-006.md` |

Review được thực hiện theo hướng black-box. Tài liệu API chỉ được dùng để kiểm tra tính nhất quán và xác minh chức năng đăng nhập có trong đặc tả kỹ thuật; review không đưa endpoint, method, request body hoặc công cụ kiểm thử vào artifact.

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Requirement reference | Đạt: analysis và test case đều tham chiếu FR-02. |
| Technique | Đạt: dùng Boundary Value Analysis (BVA) cho ngưỡng số lần sai liên tiếp và thời gian khóa. |
| BVA applicability | Đạt: FR-02 có boundary phù hợp, gồm `>= 3` lần sai và khóa `30 giây`. |
| Test data cụ thể | Đạt: dùng `test@eshop.com`, `Test1234!`, `Wrong123!`, số lần cụ thể 2/3/4 và thời gian 29/30/31 giây. |
| Expected Result quan sát được | Đạt: nêu rõ accepted/rejected, khóa/chưa khóa, token được lưu hoặc không tạo token. |
| Traceability | Đạt: mỗi test case map về một Boundary Value ID và một condition trong analysis. |
| Invalid case isolate điều kiện chính | Đạt: các input còn lại dùng valid nominal; state setup được ghi rõ. |
| Status ban đầu | Đạt: tất cả test case là `Not Run / None`. |

## 3. Findings cần sửa

| Mã finding | Mức độ | File / dòng | Mô tả vấn đề | Ảnh hưởng | Xử lý |
|---|---|---|---|---|---|
| REV-FR02-BVA-001 | Minor | `analysis/FR-02-login/bva-analysis.md`; `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-005.md` | Mốc đúng 30 giây có thể gây tranh luận vì requirement chỉ nói khóa 30 giây, không nêu dung sai hoặc inclusive/exclusive tại đúng thời điểm. | Có thể làm expected result tại đúng 30 giây phụ thuộc cách đo thời gian khi execution. | Đã ghi rõ `Giả định cần xác nhận` trong analysis và test case; giữ test vì đây là ON boundary quan trọng. |

Không còn finding Critical hoặc Major sau khi review.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | FR-02 | COND-FR02-BVA-001 | BV-FAILED-001 / OFF⁻ = 2 lần sai liên tiếp | Hợp lệ | Kiểm tra không khóa quá sớm. |
| TC-FR02-BVA-002 | FR-02 | COND-FR02-BVA-002 | BV-FAILED-002 / ON = 3 lần sai liên tiếp | Hợp lệ | Kiểm tra đúng ngưỡng khóa. |
| TC-FR02-BVA-003 | FR-02 | COND-FR02-BVA-003 | BV-FAILED-003 / OFF⁺ = 4 lần sai liên tiếp | Hợp lệ | Kiểm tra vùng ngay trên ngưỡng vẫn bị từ chối. |
| TC-FR02-BVA-004 | FR-02 | COND-FR02-BVA-004 | BV-LOCKTIME-001 / OFF⁻ = 29 giây | Hợp lệ | Kiểm tra chưa hết khóa quá sớm. |
| TC-FR02-BVA-005 | FR-02 | COND-FR02-BVA-005 | BV-LOCKTIME-002 / ON = 30 giây | Cần xác nhận | Expected dựa trên giả định hết đủ 30 giây thì mở khóa. |
| TC-FR02-BVA-006 | FR-02 | COND-FR02-BVA-006 | BV-LOCKTIME-003 / OFF⁺ = 31 giây | Hợp lệ | Kiểm tra sau mốc khóa. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| `failed_login_attempt_count` OFF⁻ = 2 | TC-FR02-BVA-001 | Đã cover | Không khóa quá sớm. |
| `failed_login_attempt_count` ON = 3 | TC-FR02-BVA-002 | Đã cover | Kích hoạt khóa. |
| `failed_login_attempt_count` OFF⁺ = 4 | TC-FR02-BVA-003 | Đã cover | Vẫn bị từ chối trong vùng `>= 3`. |
| `elapsed_lock_time` OFF⁻ = 29 giây | TC-FR02-BVA-004 | Đã cover | Còn trong thời gian khóa. |
| `elapsed_lock_time` ON = 30 giây | TC-FR02-BVA-005 | Đã cover / Cần xác nhận | Requirement chưa nêu dung sai exact timing. |
| `elapsed_lock_time` OFF⁺ = 31 giây | TC-FR02-BVA-006 | Đã cover | Đã qua thời gian khóa. |

Không phát hiện duplicate không cần thiết. Các test case thời gian đều có setup tạo trạng thái khóa giống nhau, nhưng mục tiêu boundary khác nhau nên không trùng lặp coverage.

## 6. Kết luận readiness

Trạng thái: Sẵn sàng execution.

Bộ BVA có thể dùng để execution với lưu ý rằng `TC-FR02-BVA-005` cần ghi Actual Result cẩn thận vì hành vi tại đúng mốc 30 giây phụ thuộc dung sai thời gian chưa được requirement đặc tả. Chưa có Actual Result nên không gán Passed/Failed và không tạo bug report.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: tại đúng thời điểm đủ 30 giây kể từ lúc khóa, tài khoản được phép đăng nhập lại.
- Chưa được đặc tả dung sai thời gian khi kiểm thử các mốc 29/30/31 giây.
- Chưa được đặc tả thông báo lỗi chính xác cho trạng thái đăng nhập sai hoặc tài khoản bị khóa.
- Chưa được đặc tả cách reset bộ đếm đăng nhập sai giữa các test case; precondition yêu cầu tài khoản bắt đầu ở trạng thái không bị khóa.
