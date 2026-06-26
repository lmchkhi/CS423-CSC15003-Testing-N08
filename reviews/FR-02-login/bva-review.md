# Review test case - FR-02: Đăng nhập & Khóa tài khoản

## 1. Phạm vi review

| Hạng mục | File / thư mục |
|---|---|
| Requirement | `requirements/system-requirements.md` |
| Analysis | `analysis/FR-02-login/bva-analysis.md` |
| Test cases | `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-001.md` đến `TC-FR02-BVA-006.md` |
| Technique | Boundary Value Analysis (BVA) |

## 2. Tóm tắt kết quả

| Tiêu chí | Kết quả |
|---|---|
| Đúng requirement reference | Đạt |
| Không tự thêm requirement về counter khi tài khoản đã khóa | Đạt |
| Phân biệt counter boundary và lock-state behavior | Đạt |
| Đổi Valid/Invalid sang expected locked/unlocked state khi phù hợp | Đạt |
| Mô tả 30 giây là transition threshold | Đạt |
| Ghi rõ rủi ro timing tại đúng 30 giây | Đạt |
| Test value cụ thể | Đạt |
| Expected result quan sát được | Đạt |
| Traceability từ test case về analysis | Đạt |
| BVA Test Matrix chỉ nằm trong analysis | Đạt |
| Status ban đầu `Not Run / None` | Đạt |
| Readiness | Sẵn sàng execution |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR02-BVA-004 | Major | `analysis/FR-02-login/bva-analysis.md`, `TC-FR02-BVA-003.md` | Analysis/test case trước đó mô tả `failed_login_count` OFF⁺ = 4 và dễ hiểu là lần thử trong lúc khóa làm counter tăng thành 4. FR-02 không đặc tả hành vi counter khi tài khoản đã khóa. | Có nguy cơ tự thêm requirement mới và làm sai traceability BVA. | Đã sửa: không chọn `failed_login_count = 4` làm boundary value; TC-FR02-BVA-003 được chuyển sang `account_lock_state` với `BV-LOCKSTATE-001`. |
| REV-FR02-BVA-005 | Major | `analysis/FR-02-login/bva-analysis.md` | Analysis cũ dùng Valid/Invalid cho các mốc khóa/hết khóa, chưa phản ánh đúng bản chất expected state. | Dễ gây nhầm giữa tính hợp lệ input và trạng thái hệ thống mong đợi. | Đã sửa: BVA matrix và traceability dùng `Expected locked/unlocked state`. |
| REV-FR02-BVA-006 | Major | `analysis/FR-02-login/bva-analysis.md` | Mốc 30 giây chưa được mô tả rõ là transition threshold. | Có thể hiểu 30 giây như một valid/invalid value đơn giản thay vì ngưỡng chuyển trạng thái. | Đã sửa: mô tả `lock_elapsed_time` ON = 30 là transition threshold từ locked sang unlocked. |
| REV-FR02-BVA-007 | Minor | `TC-FR02-BVA-005.md` | Test tại đúng 30 giây có rủi ro timing nếu thao tác thủ công. | Execution có thể không ổn định nếu không có công cụ đo chính xác. | Đã sửa: precondition, step và expected result ghi rõ cần công cụ đo chính xác và ghi nhận rủi ro timing. |

Không còn finding Critical hoặc Major chưa xử lý.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | FR-02 | COND-FR02-BVA-001 | BV-FAILEDCOUNT-001, `failed_login_count` OFF⁻ = 2 | Hợp lệ | Expected state: Unlocked. |
| TC-FR02-BVA-002 | FR-02 | COND-FR02-BVA-002 | BV-FAILEDCOUNT-002, `failed_login_count` ON = 3 | Hợp lệ | Expected state: Locked. |
| TC-FR02-BVA-003 | FR-02 | COND-FR02-BVA-003 | BV-LOCKSTATE-001, `account_lock_state` ON-state sau ngưỡng 3 | Hợp lệ | Kiểm tra login attempt trong trạng thái khóa; không kết luận counter tăng thành 4. |
| TC-FR02-BVA-004 | FR-02 | COND-FR02-BVA-004 | BV-LOCKTIME-001, `lock_elapsed_time` OFF⁻ = 29 giây | Hợp lệ | Expected state: Locked. |
| TC-FR02-BVA-005 | FR-02 | COND-FR02-BVA-005 | BV-LOCKTIME-002, `lock_elapsed_time` ON = 30 giây | Hợp lệ | Transition threshold; cần đo thời gian chính xác. |
| TC-FR02-BVA-006 | FR-02 | COND-FR02-BVA-006 | BV-LOCKTIME-003, `lock_elapsed_time` OFF⁺ = 31 giây | Hợp lệ | Expected state: Unlocked. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| `failed_login_count` OFF⁻ = 2 | TC-FR02-BVA-001 | Đạt | Chưa khóa ngay dưới ngưỡng. |
| `failed_login_count` ON = 3 | TC-FR02-BVA-002 | Đạt | Khóa tại đúng ngưỡng. |
| Login attempt trong trạng thái khóa | TC-FR02-BVA-003 | Đạt | Dependent lock-state behavior, không phải counter OFF⁺ = 4. |
| `lock_elapsed_time` OFF⁻ = 29 giây | TC-FR02-BVA-004 | Đạt | Chưa hết khóa. |
| `lock_elapsed_time` ON = 30 giây | TC-FR02-BVA-005 | Đạt | Transition threshold, có rủi ro timing. |
| `lock_elapsed_time` OFF⁺ = 31 giây | TC-FR02-BVA-006 | Đạt | Sau mốc transition. |
| `failed_login_count` OFF⁺ = 4 | Không cover | Chủ động loại trừ | FR-02 không đặc tả counter có tăng tiếp khi tài khoản đã khóa. |
| Email/password length boundary | Không cover | Chủ động loại trừ | FR-02 không đặc tả min/max length cho email/password; không áp dụng BVA máy móc. |

Không phát hiện duplicate mục tiêu chính. TC-FR02-BVA-003 được giữ vì nó kiểm tra hành vi phụ thuộc sau boundary ON của counter, không trùng với TC-FR02-BVA-002.

## 6. Kết luận readiness

Sẵn sàng execution.

Analysis và test case BVA đã được sửa theo hướng không tự thêm requirement mới. Bộ test vẫn giữ case tại đúng 30 giây, nhưng đã ghi rõ cần công cụ đo thời gian chính xác và phải xem xét rủi ro timing khi execution.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Có thể đưa tài khoản `test@eshop.com` về trạng thái không khóa và 0 lần sai liên tiếp trước từng test độc lập.
- Giả định cần xác nhận: Có thể đo mốc 29, 30 và 31 giây đủ chính xác trong môi trường demo.
- Chưa được đặc tả: Cách quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Counter có tăng tiếp hay không khi login attempt diễn ra trong trạng thái khóa.
- Chưa được đặc tả: Tolerance chính xác quanh transition threshold 30 giây.
