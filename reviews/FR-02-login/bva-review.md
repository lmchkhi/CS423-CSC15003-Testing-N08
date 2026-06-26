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
| Đúng technique Boundary Value Analysis | Đạt |
| Chỉ áp dụng BVA cho miền có ngưỡng | Đạt |
| ON, OFF⁻, OFF⁺ được giải thích | Đạt |
| Test value cụ thể | Đạt |
| Expected result quan sát được | Đạt |
| Traceability từ test case về analysis | Đạt |
| BVA Test Matrix chỉ nằm trong analysis | Đạt |
| Mỗi test case cover một boundary point chính | Đạt |
| Status ban đầu `Not Run / None` | Đạt |
| Readiness | Sẵn sàng execution |

## 3. Findings cần sửa

| Finding ID | Mức độ | File / dòng | Mô tả | Ảnh hưởng | Trạng thái xử lý |
|---|---|---|---|---|---|
| REV-FR02-BVA-001 | Major | `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-003.md` | Test case ban đầu mô tả OFF⁺ của `failed_login_count` nhưng lần thử tiếp theo dùng mật khẩu đúng, chưa khớp test value "4 lần sai liên tiếp". | Traceability giữa boundary value và test data chưa nhất quán. | Đã sửa: TC-FR02-BVA-003 dùng `Wrong123!` cho lần sai thứ 4 và analysis được cập nhật tương ứng. |
| REV-FR02-BVA-002 | Minor | `analysis/FR-02-login/bva-analysis.md` | Counter nội bộ `failed_login_count` không có UI/API/log được đặc tả để quan sát trực tiếp. | Khi execution, người kiểm thử chỉ xác nhận gián tiếp qua hành vi khóa tại các mốc 2/3/4 lần. | Đã ghi rõ requirement gap trong analysis. |
| REV-FR02-BVA-003 | Minor | `TC-FR02-BVA-005.md` | Mốc đúng 30 giây dễ nhiễu do thao tác thủ công và độ chính xác đồng hồ. | Test tại ON boundary có thể cần công cụ đo thời gian để tránh kết quả không ổn định. | Đã ghi precondition cần đồng hồ/công cụ đo thời gian và ghi gap về tolerance trong analysis. |

Không còn finding Critical hoặc Major chưa xử lý.

## 4. Traceability audit

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | FR-02 | COND-FR02-BVA-001 | BV-FAILEDCOUNT-001, `failed_login_count` OFF⁻ = 2 | Hợp lệ | Ngay dưới ngưỡng khóa. |
| TC-FR02-BVA-002 | FR-02 | COND-FR02-BVA-002 | BV-FAILEDCOUNT-002, `failed_login_count` ON = 3 | Hợp lệ | Đúng ngưỡng bắt đầu khóa. |
| TC-FR02-BVA-003 | FR-02 | COND-FR02-BVA-003 | BV-FAILEDCOUNT-003, `failed_login_count` OFF⁺ = 4 | Hợp lệ | Ngay trên ngưỡng khóa; đã sửa test data cho khớp boundary. |
| TC-FR02-BVA-004 | FR-02 | COND-FR02-BVA-004 | BV-LOCKTIME-001, `lock_elapsed_time` OFF⁻ = 29 giây | Hợp lệ | Ngay trước thời điểm hết khóa. |
| TC-FR02-BVA-005 | FR-02 | COND-FR02-BVA-005 | BV-LOCKTIME-002, `lock_elapsed_time` ON = 30 giây | Hợp lệ | Đúng thời hạn khóa, cần đo thời gian cẩn thận. |
| TC-FR02-BVA-006 | FR-02 | COND-FR02-BVA-006 | BV-LOCKTIME-003, `lock_elapsed_time` OFF⁺ = 31 giây | Hợp lệ | Ngay sau thời hạn khóa. |

## 5. Coverage và duplicate audit

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|
| `failed_login_count` OFF⁻ = 2 | TC-FR02-BVA-001 | Đạt | Chưa khóa ngay dưới ngưỡng. |
| `failed_login_count` ON = 3 | TC-FR02-BVA-002 | Đạt | Khóa tại đúng ngưỡng. |
| `failed_login_count` OFF⁺ = 4 | TC-FR02-BVA-003 | Đạt | Vẫn bị khóa ngay trên ngưỡng. |
| `lock_elapsed_time` OFF⁻ = 29 giây | TC-FR02-BVA-004 | Đạt | Chưa hết khóa. |
| `lock_elapsed_time` ON = 30 giây | TC-FR02-BVA-005 | Đạt | Đúng mốc hết khóa theo requirement. |
| `lock_elapsed_time` OFF⁺ = 31 giây | TC-FR02-BVA-006 | Đạt | Sau mốc hết khóa. |
| Email/password length boundary | Không cover | Chủ động loại trừ | FR-02 không đặc tả min/max length cho email/password; không áp dụng BVA máy móc. |

Không phát hiện duplicate mục tiêu chính. Các test case dùng cùng tài khoản và mật khẩu là hợp lý vì đây là valid nominal data để isolate boundary.

## 6. Kết luận readiness

Sẵn sàng execution.

Các finding đã được xử lý hoặc ghi rõ thành requirement gap. Bộ test BVA có thể dùng để kiểm tra FR-02 trước khi execution, với lưu ý cần chuẩn bị trạng thái tài khoản và đo thời gian chính xác cho nhóm test khóa 30 giây.

## 7. Giả định và thông tin cần xác nhận

- Giả định cần xác nhận: Có thể đưa tài khoản `test@eshop.com` về trạng thái không khóa và 0 lần sai liên tiếp trước từng test độc lập.
- Giả định cần xác nhận: Có thể đo mốc 29, 30 và 31 giây đủ chính xác trong môi trường demo.
- Chưa được đặc tả: Cách quan sát trực tiếp giá trị `failed_login_count`.
- Chưa được đặc tả: Tolerance chính xác quanh mốc 30 giây.
