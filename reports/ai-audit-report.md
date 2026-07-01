# AI Audit Report - HW02 Domain Testing on EShop

Khoa Công nghệ Thông tin (FIT) - Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM  
CS423 / CSC15003 - Kiểm thử Phần mềm (AI-augmented, 2026)  
AI Audit Report - mẫu 5 phần cho từng artifact

Phụ lục bắt buộc cho bài tập có sử dụng AI.

---

## 1. Thông tin sinh viên

| Trường | Giá trị |
|---|---|
| Họ tên sinh viên | Hà Bảo Ngọc |
| MSSV | 23127300 |
| Lớp / Nhóm | CS423 / CSC15003 - N08 |
| Mã bài tập | HW#02 - Domain Testing on EShop |
| Ngày làm bài | 01/07/2026 |
| AI tool(s) used | Codex, AI assistant dạng ChatGPT |
| Có sử dụng AI? | [x] Yes  [ ] No |

## 2. Hướng dẫn điền báo cáo

- Mỗi artifact do AI hỗ trợ được ghi thành một dòng audit riêng.
- `Prompt` phải được dán nguyên văn, không diễn giải lại.
- `AI Output` ghi output nguyên văn khi phù hợp; nếu output quá dài thì ghi rõ artifact được tạo và evidence tương ứng trong `prompt_log.md`.
- `Verdict` dùng một trong ba giá trị: `VALID` / `INVALID` / `INCOMPLETE`.
- Phần lý do đánh giá phải viện dẫn kỹ thuật kiểm thử, ISTQB hoặc tài liệu kỹ thuật liên quan.
- Phần `Student Fix` phải nêu rõ sinh viên đã sửa hoặc chấp nhận artifact như thế nào.
- Các dòng ví dụ trong template gốc đã được bỏ và thay bằng artifact thật của HW02.

## 3. Audit Table - mỗi artifact một dòng

### Artifact #1

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-06-26 23:36:02 +07

Prompt:

```text
$domain-testing
$test-case-review
$prompt-log

Áp dụng Domain Testing cho FR-02 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Tạo analysis và test case theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Tạo `analysis/FR-02-login/domain-testing-analysis.md`, 9 Domain Testing test case và `reviews/FR-02-login/domain-testing-review.md`. Log ghi output chính: `Created 9 test case files`.

#### (3) Verdict

INCOMPLETE

#### (4) Lý do đánh giá (ISTQB)

Domain Testing phù hợp cho email/password, trạng thái tài khoản, trạng thái khóa và token. Tuy nhiên audit sau đó phát hiện reference `FR-22` bị hallucinate trong artifact FR-02. Theo ISTQB CTFL v4.0, Sec. 4.1/4.2, test phải được suy ra từ test basis hợp lệ, không được dựa trên requirement không tồn tại.

#### (5) Sinh viên đã sửa

Đã thay reference sai `FR-22` bằng `GUI-02`; giữ lại các domain class có traceability với SRS; không đưa chi tiết kỹ thuật API vào test case steps.

### Artifact #2

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-06-26 23:54:50 +07

Prompt:

```text
$boundary-value-analysis
$test-case-review
$prompt-log

Đánh giá và áp dụng BVA cho FR-02 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Chỉ tạo BVA analysis và test case nếu FR-02 thực sự có boundary phù hợp; nếu không phù hợp thì ghi rõ lý do và không tạo test case gượng ép.

Tạo output theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Tạo `analysis/FR-02-login/bva-analysis.md`, 6 BVA test case và `reviews/FR-02-login/bva-review.md`.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

FR-02 có boundary thật: số lần đăng nhập sai quanh ngưỡng 3 lần và thời gian khóa quanh 30 giây. Cách chọn này phù hợp với ISTQB CTFL v4.0, Sec. 4.2.2 Boundary Value Analysis.

#### (5) Sinh viên đã sửa

Chấp nhận. Có ghi chú rằng dung sai chính xác tại mốc 30 giây là requirement gap, nên khi execution phải ghi Actual Result cẩn thận.

### Artifact #3

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 13:16:15 +07 and 13:25:57 +07

Prompt:

```text
$test-execution
$prompt-log

Ghi nhận kết quả tôi đã tự thực thi cho FR-02:

1. TC-FR02-DT-004, TC-FR02-BVA-001
   - Actual result: Tài khoản bị khóa chỉ sau 2 lần nhập sai mật khẩu (đúng ra phải là 3 lần). Ở lần thử thứ 3, dù nhập đúng mật khẩu nhưng vẫn bị báo lỗi "Tài khoản bị khóa", không đăng nhập được.
   - Evidence: screenshots/Screenshot 2026-07-01 at 11.24.01.png

2. TC-FR02-DT-007, TC-FR02-BVA-005, TC-FR02-BVA-006
   - Actual result: Thời gian khóa tài khoản kéo dài tới khoảng ~180 giây thay vì 30 giây như yêu cầu. Đã thử đăng nhập lại ở giây 30 và 31 nhưng vẫn báo lỗi tài khoản bị khóa, phải chờ đến 180 giây mới vào được.
   - Evidence:
     - screenshots/giay0.jpg
     - screenshots/giay30.jpg
     - screenshots/giay33.jpg
     - screenshots/giay180.jpg

3. TC-FR02-DT-002
   - Actual result: Ô nhập email đang dùng type="text" nên trình duyệt không kiểm tra định dạng. Khi nhập "abc" vẫn bấm gửi được, sau đó mới hiện lỗi đăng nhập. Thêm nữa, ô nhập mật khẩu cũng đang dùng type="text".
   - Evidence: screenshots/matkhauemail.png

4. TC-FR02-DT-001 (quan sát trong khi thực thi)
   - Actual result: Sau khi đăng nhập thành công, API trả về toàn bộ dữ liệu user bao gồm cả mật khẩu (password) ở dạng không mã hóa và các trường ẩn khác. Việc này làm lộ mật khẩu trong response của API.
   - Evidence:
     
     screenshots/passwordinres.png

5. TC-FR02-DT-006 (quan sát trong khi thực thi)
   - Actual result: Khi tài khoản bị khóa, giao diện chỉ báo lỗi chung chung là "Đăng nhập thất bại". Kiểm tra API thấy backend có trả về dòng "Tài khoản đã bị khóa" nhưng frontend không hiển thị lên cho người dùng thấy.
   - Evidence: screenshots/taikhoanbikhoa.png

6. TC-FR02-DT-009 (quan sát trong khi thực thi)
   - Actual result: Khi gõ mật khẩu, ký tự hiện rõ trên màn hình do ô input bị để thuộc tính type="text" thay vì password.
   - Evidence: screenshots/matkhauemail.png

7. Các TC còn lại: giống với expected
Đối chiếu từng test case, xác định Pass/Fail/Blocked và cập nhật test run theo template và cấu trúc hiện có. Đồng thời đổi tên file screenshot cho phù hợp

Sau khi hoàn tất, append log.
```

Prompt tiếp theo:

```text
$bug-report
$prompt-log

Tạo bug report cho các test case Fail của FR-02.

Tự tìm test case, test run và evidence tương ứng.
Dùng template và cấu trúc hiện có.
Không tạo bug trùng hoặc bug cho test chưa có kết quả Fail.

Sau khi hoàn tất, append log.
```

#### (2) AI Output

Tạo `tests/test-runs/FR-02-login-run.md` và `BUG-FR02-001` đến `BUG-FR02-005`; cập nhật test case liên quan và đổi tên screenshot evidence.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

Kết quả execution dựa trên Actual Result và evidence do sinh viên cung cấp, không phải AI tự đoán. Các defect được gom theo root cause, phù hợp với ISTQB CTFL v4.0, Sec. 5.5 Defect Management.

#### (5) Sinh viên đã sửa

Chấp nhận. Sinh viên cung cấp evidence; AI liên kết các failed test case vào 5 bug report duy nhất thay vì tạo bug trùng cho từng test case.

### Artifact #4

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-06-30 20:02:43 +07 and 20:06:47 +07

Prompt:

```text
$domain-testing
$test-case-review
$prompt-log

Áp dụng Domain Testing cho FR-13 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Tạo analysis và test case theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

Prompt BVA:

```text
$boundary-value-analysis
$test-case-review
$prompt-log

Đánh giá và áp dụng BVA cho FR-13 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Chỉ tạo BVA analysis và test case nếu FR-13 thực sự có boundary phù hợp; nếu không phù hợp thì ghi rõ lý do và không tạo test case gượng ép.

Tạo output theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Tạo `analysis/FR-13-dashboard/domain-testing-analysis.md`, 6 DT test case, `reviews/FR-13-dashboard/domain-testing-review.md`, `analysis/FR-13-dashboard/bva-analysis.md` và `reviews/FR-13-dashboard/bva-review.md`. Không tạo BVA test case.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

Dữ liệu dashboard của FR-13 được chia partition theo dataset/trạng thái đơn hàng và quyền Admin, nên Domain Testing là phù hợp. BVA không phù hợp vì requirement không có min/max, threshold hoặc range; điều này bám theo ISTQB CTFL v4.0, Sec. 4.2.1 và 4.2.2.

#### (5) Sinh viên đã sửa

Chấp nhận. Artifact ghi rõ BVA không áp dụng, tránh ép boundary số học cho doanh thu hoặc số lượng đơn hàng.

### Artifact #5

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-06-30 21:03:40 +07 and 21:10:52 +07

Prompt:

```text
$test-execution
$prompt-log

Ghi nhận kết quả tôi đã tự thực thi cho FR-02:

1. `TC-FR13-DT-001`
   - Actual result: giống với expected result

2. `TC-FR13-DT-002`
   - Actual result: doanh thu hiển thị 60,000,000 đ
   - Evidence: bug-reports/screenshots/Screenshot 2026-06-30 at 20.46.12.png, bug-reports/screenshots/Screenshot 2026-06-30 at 20.46.17.png  

3. `TC-FR13-DT-003`
   - Actual result: doanh thu hiển thị 72,000,000 đ
   - Evidence: bug-reports/screenshots/Screenshot 2026-06-30 at 20.47.39.png, bug-reports/screenshots/Screenshot 2026-06-30 at 20.47.41.png

4. `TC-FR13-DT-004`
   - Actual result: doanh thu hiển thị 90,000,000 đ
   - Evidence: bug-reports/screenshots/Screenshot 2026-06-30 at 20.50.31.png, bug-reports/screenshots/Screenshot 2026-06-30 at 20.50.34.png

5. `TC-FR13-DT-005`
   - Actual result: giống với expected result

6. `TC-FR13-DT-006`
   - Actual result: giống với expected result

Đối chiếu từng test case, xác định Pass/Fail/Blocked và cập nhật test run theo template và cấu trúc hiện có.

Sau khi hoàn tất, append log.
```

Prompt tiếp theo:

```text
$bug-report
$prompt-log

Tạo bug report cho các test case Fail của FR-13.

Tự tìm test case, test run và evidence tương ứng.
Dùng template và cấu trúc hiện có.
Không tạo bug trùng hoặc bug cho test chưa có kết quả Fail.

Sau khi hoàn tất, append log.
```

#### (2) AI Output

Tạo `tests/test-runs/FR-13-dashboard-run.md`, `BUG-FR13-001.md` và liên kết 3 failed dashboard revenue test case vào cùng một bug report.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

Prompt ghi nhầm feature là FR-02, nhưng Test Case ID đều thuộc FR-13. AI đã xác định đúng scope theo Test Case ID. Việc gom 3 failure vào một bug tính sai doanh thu giúp tránh duplicate defect report, phù hợp với nguyên tắc defect management của ISTQB.

#### (5) Sinh viên đã sửa

Chấp nhận. Giữ một bug cho root cause chung và bảo toàn screenshot evidence.

### Artifact #6

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 00:31:47 +07

Prompt:

```text
$domain-testing
$test-case-review
$prompt-log

Áp dụng Domain Testing cho FR-26 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Tạo analysis và test case theo cấu trúc hiện có. Tên thư mục là tiếng anh.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Tạo Domain Testing analysis, test case và review cho FR-26 Mobile Cart trong thư mục `FR-26-mobile-cart`. Repo hiện tại có 14 FR-26 DT test case.

#### (3) Verdict

INCOMPLETE

#### (4) Lý do đánh giá (ISTQB)

Domain Testing phù hợp với các trạng thái UI mobile cart và hành vi categorical. Tuy nhiên log ban đầu nhắc đến 8 test case, trong khi artifact cuối cùng có 14 test case. Chênh lệch này chỉ chấp nhận được vì đã cross-check file hiện tại và review. ISTQB CTFL v4.0, Sec. 4.1 yêu cầu traceability từ test basis đến test case cuối cùng.

#### (5) Sinh viên đã sửa

Chấp nhận artifact cuối sau review. Báo cáo ghi rõ discrepancy và không dựa vào summary trong prompt log ban đầu như nguồn duy nhất.

### Artifact #7

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 00:43:28 +07

Prompt:

```text
$boundary-value-analysis
$test-case-review
$prompt-log

Đánh giá và áp dụng BVA cho FR-26 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Chỉ tạo BVA analysis và test case nếu FR-26 thực sự có boundary phù hợp; nếu không phù hợp thì ghi rõ lý do và không tạo test case gượng ép.

Tạo output theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Prompt log ghi rằng AI ban đầu kết luận BVA không áp dụng và chỉ tạo analysis/review. Repo hiện tại lại có `analysis/FR-26-mobile-cart/bva-analysis.md`, `reviews/FR-26-mobile-cart/bva-review.md` và 5 BVA test case.

#### (3) Verdict

INCOMPLETE

#### (4) Lý do đánh giá (ISTQB)

Đây là bằng chứng rõ nhất rằng chỉ dựa vào `prompt_log.md` thì chưa đủ tin cậy. Artifact BVA cuối có thể hợp lý vì lower boundary của `cartLineQuantity` và empty/non-empty boundary của `cartItemCount` là kiểm thử được, nhưng transcript không giải thích đầy đủ quá trình sửa từ “không áp dụng” thành 5 test case. ISTQB BVA yêu cầu boundary derivation và traceability rõ ràng.

#### (5) Sinh viên đã sửa

Đã review trực tiếp các file cuối. Báo cáo đánh dấu evidence log là `INCOMPLETE`, chỉ giữ artifact BVA cuối vì analysis/review hiện tại đã document boundary `0/1/2` cho quantity và `0/1` cho cart count, đồng thời ghi upper boundary còn thiếu là requirement gap.

### Artifact #8

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 01:17:33 +07 and 09:43:52 +07

Prompt:

```text
$test-execution
$prompt-log

Ghi nhận kết quả tôi đã tự thực thi cho FR-02:

BVA:
- 1: giôngs expected
- 2: ko có dialog, sau khi nhấn xoá thì sản phẩm biến mất
- 3: ko có nút cộng
- 4: giôngs expected
- 5: giôngs expected
DT:
- 001: giống Expected result
- 002: hiện là "Giá"
- 3: không có nút + -, chỉnh bằng cách dùng bàn phím
- 4: không có nút tăng, tổng tiền hiển thị "Tổng tạm tính"
- 5: ko có nút giảm,  tổng tiền hiển thị "Tổng tạm tính"
- 6: giôngs expected
- 7: ko có dialog
- 8: ko có dialog
- 9: ko có dialog
- 10: nút hiển thị :"Mua tiếp",  Dữ liệu giỏ hàng không bị xóa hoặc thay đổi
- 11: màn hình hiển thị "Tổng tạm tính"
- 12: giôngs expected
- 13: giống expected
- 14: giống expected

Đối chiếu từng test case, xác định Pass/Fail/Blocked và cập nhật test run theo template và cấu trúc hiện có.
```

Prompt tiếp theo:

```text
$bug-report
$prompt-log

Tạo bug report cho các test case Fail của FR-26.

Tự tìm test case, test run và evidence tương ứng.
Dùng template và cấu trúc hiện có.
Không tạo bug trùng hoặc bug cho test chưa có kết quả Fail.

Sau khi hoàn tất, append log.
```

#### (2) AI Output

Tạo `tests/test-runs/FR-26-mobile-cart-run.md`, `BUG-FR26-001` đến `BUG-FR26-005` và liên kết related bug.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

Prompt ghi nhầm feature là FR-02, nhưng toàn bộ Test Case ID và file đang mở đều thuộc FR-26. AI map đúng sang FR-26. Nhiều failed case được gom thành 5 bug theo root cause, tốt hơn việc tạo một bug cho từng assertion.

#### (5) Sinh viên đã sửa

Chấp nhận. Bổ sung ghi chú evidence cho bug không có dialog xác nhận xóa, vì bản chất defect là dialog không xuất hiện nên không thể có screenshot của dialog; Actual Result trong test run là evidence chính.

### Artifact #9

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-06-27 00:04:44 +07 and 00:11:08 +07

Prompt:

```text
$domain-testing
$test-case-review
$prompt-log

Áp dụng Domain Testing cho FR-10 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Tạo analysis và test case theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

Prompt BVA:

```text
$boundary-value-analysis
$test-case-review
$prompt-log

Đánh giá và áp dụng BVA cho FR-10 dựa trên `requirements/system-requirements.md`.

Dùng `requirements/api-specification.md` chỉ để kiểm tra tính nhất quán và xác minh chi tiết kỹ thuật, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case trừ khi requirement bắt buộc phải thể hiện.

Chỉ tạo BVA analysis và test case nếu FR-10 thực sự có boundary phù hợp; nếu không phù hợp thì ghi rõ lý do và không tạo test case gượng ép.

Tạo output theo cấu trúc hiện có.
Sau khi hoàn tất, review và sửa kết quả, rồi append log vào `prompt_log.md`.
```

#### (2) AI Output

Tạo `analysis/FR-10-order-state-machine/domain-testing-analysis.md`, 14 DT test case, `reviews/FR-10-order-state-machine/domain-testing-review.md`, BVA analysis và BVA review. Không tạo FR-10 BVA test case.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

FR-10 là state machine với trạng thái và quyền actor dạng categorical. Domain/state-transition style coverage là phù hợp; nếu áp dụng BVA sẽ bịa thứ tự số học cho trạng thái. Đây là cách chọn kỹ thuật black-box hợp lý theo ISTQB.

#### (5) Sinh viên đã sửa

Chấp nhận. Review giữ Guest/chưa đăng nhập và một số actor case dưới dạng assumption/gap, không biến thành rule chắc chắn khi requirement chưa nêu.

### Artifact #10

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 16:22:46 +07 and 16:30:45 +07

Prompt:

```text
$prompt-log

Ghi nhận kết quả tôi đã tự thực thi cho FR-10, các ảnh trong folder bug-reports/screenshots:

1. TC-FR10-DT-010
   - Actual result: User vẫn có nút hủy đơn khi trạng thái đang giao và hủy thành công.

2. TC-FR10-DT-011
   - Actual result: Endpoint cập nhật trạng thái đơn hàng (PUT /api/admin/orders/:id/status) không kiểm tra quyền Admin. Dù là User thường, chỉ cần lấy token gọi API qua DevTools là có thể tự do thay đổi trạng thái đơn hàng của bất kỳ ai (API trả về HTTP 200 thành công).

3. TC-FR10-DT-009 (quan sát trong khi thực thi, không có được miêu tả trong test case)
   - Actual result: Đơn hàng đã hủy vẫn còn nút đánh dấu đã giao và chuyển được sang trạng thái đã giao.
```

Prompt tiếp theo:

```text
$bug-report
$prompt-log

Tạo bug report cho các test case Fail của FR-10.

Tìm test case, test run và evidence tương ứng.
Dùng template và cấu trúc hiện có.
Miêu tả giống trong screenshot.
Không tạo bug trùng hoặc bug cho test chưa có kết quả Fail.
Environment:
Browser: Chrome Version 149.0.7827.103
OS: macOS Tahoe 26.5.1
URL: Backend http://localhost:3000; Frontend Admin http://localhost:5174/; Frontend Web http://localhost:5173/

Sau khi hoàn tất, append log. Đổi status thành Passed và Failed
```

#### (2) AI Output

Tạo `tests/test-runs/FR-10-order-state-machine-run.md`, `BUG-FR10-001` đến `BUG-FR10-003`, cập nhật 14 test case với status Passed/Failed và bug link.

#### (3) Verdict

VALID

#### (4) Lý do đánh giá (ISTQB)

AI dùng Actual Result và screenshot do sinh viên cung cấp, sau đó tách 3 failure theo root cause: transition từ final state, User hủy đơn ở trạng thái shipping, và lỗi phân quyền Admin API. Cách tách này phù hợp với traceability và defect isolation.

#### (5) Sinh viên đã sửa

Chấp nhận. Environment được cập nhật theo prompt của sinh viên.

### Artifact #11

#### (1) Prompt + Tool

Tool: Codex

Time: 2026-07-01 14:35:07 +07 and 17:01:59 +07

Prompt:

```text
[$prompt-log](/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/prompt-log/SKILL.md) 

viết phần main report trong folder reports/ cho 2026.HW02.Domain Testing_En (1).pdf, sử dụng các materials hiện có, ngoài các FR hiện có sẽ có thêm FR-10 nữa. 

Sau khi hoàn tất, append log.
```

Prompt sửa scope sau đó:

```text
[$prompt-log](/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/prompt-log/SKILL.md) 
tôi đã merge FR-10 vào nhánh này, tôi cần bạn đọc các materials mới và sửa lại reports/main-report.md, README.md và các files liên quan

đồng thời thêm link video demo skills vào docs: https://youtu.be/QkuGNTtqedA

sau khi hoàn thành, append log.
```

#### (2) AI Output

Tạo/cập nhật `reports/main-report.md`, `README.md` và các bảng tổng hợp. Số liệu hiện tại: 54 test case, 28 Passed, 26 Failed, 14 unique bugs.

#### (3) Verdict

INCOMPLETE

#### (4) Lý do đánh giá (ISTQB)

Prompt main report đầu tiên bị ngắt và sau đó đổi scope vì FR-10 chưa merge. Prompt sau đã sửa lại scope sau khi FR-10 được merge. Kết quả cuối chấp nhận được, nhưng audit phải ghi rõ chuỗi thay đổi này để không hiểu nhầm đây là một AI output sạch ngay từ đầu.

#### (5) Sinh viên đã sửa

File cuối `main-report.md` và `README.md` đã được cross-check với số lượng artifact hiện tại và không còn ghi “FR-10 pending”.

## 4. Tóm tắt độ chính xác của AI (AI Accuracy)

| Chỉ số | Số lượng | Tỷ lệ |
|---|---:|---:|
| Tổng artifact có AI hỗ trợ được audit | 11 | 100% |
| VALID - đúng hoặc được chấp nhận sau review thông thường | 7 | 63.6% |
| INVALID - sai và bị loại | 0 | 0% |
| INCOMPLETE - chỉ dùng được sau khi sửa, cross-check hoặc chỉnh lại scope | 4 | 36.4% |

## 5. Kết luận - Khi nào nên dùng AI?

AI hữu ích khi cần dựng nhanh artifact QA có cấu trúc: equivalence class, BVA matrix, test case file, review checklist, test run, bug report, README summary và main report. AI làm tốt nhất khi requirement có category hoặc boundary rõ, ví dụ FR-02 lockout và FR-10 state transition. AI yếu hơn khi test basis thiếu hoặc mơ hồ: từng giữ tham chiếu sai `FR-22`, đánh giá chưa ổn ở FR-26 BVA, và nhiều lúc chỉ dựa được trên `conversation context khả dụng`. Vì vậy AI nên được dùng như công cụ draft và review, không phải nguồn chân lý. Quyết định cuối phải dựa trên traceability với requirement, evidence thực tế và human review.

## 6. Khai báo bắt buộc (Mandatory Disclosure)

"Các test case, analysis file, test-run table, bug-report draft, README/report update và AI Audit Report này được tạo hoặc chỉnh sửa ban đầu với sự hỗ trợ của Codex / AI assistant; tôi đã review và chỉnh sửa reasoning của Domain Testing/BVA, sửa các reference requirement bị hallucinate hoặc mơ hồ, gom bug report trùng theo root cause, bổ sung execution evidence và cross-check số lượng artifact với repository. AI Audit Report chi tiết được đính kèm ở Appendix A. Tôi xác nhận không dùng AI để tạo artifact thuộc nhóm bị cấm."

## Chữ ký

| Trường | Giá trị |
|---|---|
| Họ tên sinh viên | Hà Bảo Ngọc |
| MSSV | 23127300 |
| Lớp / Nhóm | CS423 / CSC15003 - N08 |
| Môn học | CS423 / CSC15003 - Kiểm thử Phần mềm |
| Giảng viên | Cô Trần Thị Bích Hạnh, Thầy Hồ Tuấn Thanh |
| Ngày | 01/07/2026 |
| Chữ ký | Hà Bảo Ngọc |

## Tài liệu tham khảo

- FIT@HCMUS CS423 / CSC15003, AI Audit Report template: `[AI-02] - FIT@HCMUS - AI Audit Report_En.docx`.
- ISTQB Foundation Level Syllabus v4.0, Chapter 4: Test Analysis and Design; Sec. 4.2.1 Equivalence Partitioning; Sec. 4.2.2 Boundary Value Analysis.
- ISTQB Foundation Level Syllabus v4.0, Sec. 5.5 Defect Management.
- `prompt_log.md`, evidence prompt hiện tại trong repository.
- `requirements/system-requirements.md` và `requirements/api-specification.md`, test basis hiện tại trong repository.
