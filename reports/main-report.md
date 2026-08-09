# HW04 - AI Automation Testing Main Report

## 1. Thông tin bài làm

| Mục | Giá trị |
| --- | --- |
| Họ tên sinh viên | Ngô Hồng Thanh |
| MSSV | 23127475 |
| Lớp / Khoá | CS423 / CSC13003 |
| Bài tập | HW04 - AI Automation Testing |
| SUT | EShop - Vietnamese e-commerce demo application |
| Công cụ AI sử dụng | Codex |
| Automation framework | Playwright Test |
| Ngôn ngữ test script | TypeScript |
| Trình duyệt yêu cầu | Chromium, Firefox, WebKit |

## 2. Phạm vi automation

Theo HW02, ba web feature được chọn cho HW04 là:

| Pool | Feature | Trạng thái automation | Ghi chú |
| --- | --- | --- | --- |
| Pool A | FR-03 - Forgot password and password reset | Đã chạy xong | Có script, data-driven JSON, report 3 browser, bug report |
| Pool B | FR-11 - Order history view | Chưa thực hiện trong report này | Đã có kế hoạch commit/test case trong [`reports/automation-commit-plan.md`](automation-commit-plan.md) |
| Pool C | FR-14 - Category management CRUD | Chưa thực hiện trong report này | Đã có kế hoạch commit/test case trong [`reports/automation-commit-plan.md`](automation-commit-plan.md) |

Feature mobile từ HW02 không được dùng trong HW04 vì đề yêu cầu automation web frontend.

## 3. Cấu trúc deliverables

Các artifact chính được tổ chức như sau:

| Loại artifact | Đường dẫn |
| --- | --- |
| Playwright config | [`playwright.config.ts`](../playwright.config.ts) |
| Automation test scripts | [`tests/automation/specs/`](../tests/automation/specs/) |
| Automation test data | [`tests/automation/data/`](../tests/automation/data/) |
| Manual test case source | [`tests/test-cases/`](../tests/test-cases/) |
| HTML reports | [`reports/html/`](html/) |
| JSON results | [`reports/results/`](results/) |
| Playwright failure evidence | [`test-results/`](../test-results/) |
| Automation bug reports | [`bug-reports/automation/`](../bug-reports/automation/) |
| AI audit report | [`reports/ai-audit-report.md`](ai-audit-report.md) |
| Commit planning | [`reports/automation-commit-plan.md`](automation-commit-plan.md) |

## 4. Quy ước chạy và report

Mỗi feature được chạy trên 3 browser: Chromium, Firefox và WebKit. Mỗi browser có thư mục HTML report riêng để tránh ghi đè kết quả.

Report wrapper `hw04-report.html` được thêm vào từng browser report để hiển thị rõ:

- `Run by: 23127475`
- feature đang chạy
- browser
- tổng số test, số pass, số fail

Playwright HTML report gốc vẫn được giữ ở `index.html`. File wrapper chỉ đóng vai trò trang mở nhanh để đáp ứng yêu cầu hiển thị metadata sinh viên trong report.

## 5. Tổng quan kết quả hiện tại

| Feature | Test case automated | Browser runs | Passed per browser | Failed per browser | Bug reports |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-03 | 18 | 3 | 7 | 11 | 6 |
| FR-11 | 5 / 15 planned | 1 | 5 | 0 | 0 |
| FR-14 | TODO | TODO | TODO | TODO | TODO |

Tổng hiện tại:

- Features hoàn tất: 1/3
- Test cases automated: 23
- Browser runs hoàn tất: 4
- Tổng lượt test đã thực thi: 59
- Tổng pass: 26
- Tổng fail: 33
- Automation bug reports: 6

## 6. FR-03 - Forgot Password And Password Reset

### 6.1 Mục tiêu kiểm thử

FR-03 kiểm tra luồng quên mật khẩu và đặt lại mật khẩu hai bước:

1. Người dùng nhập email để lấy OTP/reset token.
2. Người dùng nhập OTP và mật khẩu mới để đặt lại mật khẩu.

Automation tập trung vào:

- Positive flow lấy OTP và reset password.
- Negative flow cho email rỗng, email sai định dạng, email chưa đăng ký.
- Negative flow cho OTP sai, OTP chưa phát sinh, OTP của email khác.
- Validation mật khẩu mới.
- Boundary value analysis cho độ dài OTP và độ dài mật khẩu.
- Kiểm tra UI và API ở mức black-box, không đọc source code backend/frontend.

### 6.2 Test script và test data

| Artifact | Đường dẫn |
| --- | --- |
| Test script | [`tests/automation/specs/fr03-forgot-password.spec.ts`](../tests/automation/specs/fr03-forgot-password.spec.ts) |
| Test data | [`tests/automation/data/fr03-forgot-password.json`](../tests/automation/data/fr03-forgot-password.json) |
| Manual domain test cases | [`tests/test-cases/FR-03-forgot-password/domain-testing/`](../tests/test-cases/FR-03-forgot-password/domain-testing/) |
| Manual BVA test cases | [`tests/test-cases/FR-03-forgot-password/bva/`](../tests/test-cases/FR-03-forgot-password/bva/) |

Test script dùng data-driven approach: danh sách test case, input, expected status/pattern và source manual case được đặt trong JSON riêng. Script đọc JSON và dispatch theo trường `kind`.

Các nhóm `kind` chính:

- `uiForgotValidEmail`
- `uiBackToLoginAtStepOne`
- `uiForgotRejected`
- `uiResetSuccess`
- `uiConfirmPasswordRequired`
- `apiResetRejected`
- `apiResetRejectedAfterOtp`
- `apiOtherEmailOtpRejected`
- `apiGeneratedOtpLength`
- `apiResetAcceptedAfterOtp`

### 6.3 Test case được automate

| Test case | Tên test case | Loại | Kết quả |
| --- | --- | --- | --- |
| TC-FR03-DT-001 | Lấy OTP thành công với email đã đăng ký | Domain | Failed |
| TC-FR03-DT-002 | Kiểm tra nút Quay lại đăng nhập ở bước lấy OTP | Domain | Failed |
| TC-FR03-DT-003 | Lấy OTP với email rỗng | Domain | Failed |
| TC-FR03-DT-004 | Lấy OTP với email sai định dạng | Domain | Failed |
| TC-FR03-DT-005 | Lấy OTP với email chưa đăng ký | Domain | Failed |
| TC-FR03-DT-006 | Đặt lại mật khẩu thành công với OTP hợp lệ | Domain | Failed |
| TC-FR03-DT-007 | Đặt lại mật khẩu khi chưa lấy OTP | Domain | Passed |
| TC-FR03-DT-008 | Đặt lại mật khẩu với OTP sai | Domain | Passed |
| TC-FR03-DT-009 | Không dùng OTP của email khác để đặt lại mật khẩu | Domain | Passed |
| TC-FR03-DT-010 | Đặt lại mật khẩu với mật khẩu mới yếu | Domain | Failed |
| TC-FR03-DT-011 | Đặt lại mật khẩu khi xác nhận mật khẩu không khớp | Domain | Failed |
| TC-FR03-DT-012 | Đặt lại mật khẩu với mật khẩu mới rỗng | Domain | Failed |
| TC-FR03-BVA-001 | OTP đúng 6 chữ số | BVA | Failed |
| TC-FR03-BVA-002 | OTP 5 chữ số | BVA | Passed |
| TC-FR03-BVA-003 | OTP 7 chữ số | BVA | Passed |
| TC-FR03-BVA-004 | Mật khẩu mới 7 ký tự | BVA | Failed |
| TC-FR03-BVA-005 | Mật khẩu mới đúng 8 ký tự | BVA | Passed |
| TC-FR03-BVA-006 | Mật khẩu mới 9 ký tự | BVA | Passed |

Tổng cộng FR-03 có 18 test case được automate, vượt yêu cầu tối thiểu 12 test case/feature.

### 6.4 Assertion patterns

FR-03 sử dụng nhiều kiểu assertion để tránh chỉ kiểm tra một dạng kết quả:

| Assertion pattern | Ví dụ mục đích |
| --- | --- |
| Visibility assertion | Kiểm tra input/button/form có hiển thị trước khi thao tác |
| URL assertion | Kiểm tra điều hướng về `/login` khi bấm quay lại đăng nhập |
| Text/content assertion | Kiểm tra nội dung lỗi, thông báo thành công, step indicator |
| Negative text assertion | Đảm bảo không xuất hiện OTP/reset token khi input không hợp lệ |
| API status assertion | Kiểm tra HTTP status `200`/`400` cho reset password API |
| API body assertion | Kiểm tra body response có thông báo lỗi hoặc success pattern |
| Regex boundary assertion | Kiểm tra OTP đúng định dạng `^\d{6}$` |
| Count assertion | Kiểm tra form reset có đủ số trường nhập liệu mong đợi |

### 6.5 Thiết kế dữ liệu và setup

Các test reset password tạo email tạm bằng `runId` để hạn chế phụ thuộc vào dữ liệu cố định và tránh làm hỏng tài khoản dùng chung. Khi cần user tồn tại, test gọi API register ở mức black-box trước khi lấy OTP/reset token.

Một số test dùng API để kiểm tra trực tiếp behavior backend, ví dụ:

- Reset password khi chưa lấy OTP.
- Reset password với OTP sai.
- Không dùng OTP của email khác.
- Boundary value cho độ dài OTP và độ dài mật khẩu.

Việc dùng API trong các case này giúp giảm độ giòn của UI automation, đồng thời vẫn kiểm thử đúng behavior user-facing/API theo specification đã cho.

### 6.6 Lệnh chạy

Các lệnh chạy FR-03 theo từng browser:

```bash
STUDENT_ID=23127475 HW04_FEATURE=fr03-forgot-password HW04_BROWSER=chromium HW04_REPORT_DIR=reports/html/fr03-forgot-password/chromium HW04_JSON_REPORT=reports/results/fr03-forgot-password/chromium/results.json WEB_BASE_URL=http://localhost:5173 API_BASE_URL=http://localhost:3000 npx playwright test tests/automation/specs/fr03-forgot-password.spec.ts --project=chromium
```

```bash
STUDENT_ID=23127475 HW04_FEATURE=fr03-forgot-password HW04_BROWSER=firefox HW04_REPORT_DIR=reports/html/fr03-forgot-password/firefox HW04_JSON_REPORT=reports/results/fr03-forgot-password/firefox/results.json WEB_BASE_URL=http://localhost:5173 API_BASE_URL=http://localhost:3000 npx playwright test tests/automation/specs/fr03-forgot-password.spec.ts --project=firefox
```

```bash
STUDENT_ID=23127475 HW04_FEATURE=fr03-forgot-password HW04_BROWSER=webkit HW04_REPORT_DIR=reports/html/fr03-forgot-password/webkit HW04_JSON_REPORT=reports/results/fr03-forgot-password/webkit/results.json WEB_BASE_URL=http://localhost:5173 API_BASE_URL=http://localhost:3000 npx playwright test tests/automation/specs/fr03-forgot-password.spec.ts --project=webkit
```

### 6.7 Browser report

| Browser | HTML report | JSON result | Label check |
| --- | --- | --- | --- |
| Chromium | [`reports/html/fr03-forgot-password/chromium/hw04-report.html`](html/fr03-forgot-password/chromium/hw04-report.html) | [`reports/results/fr03-forgot-password/chromium/results.json`](results/fr03-forgot-password/chromium/results.json) | [`reports/html/fr03-forgot-password/chromium/report-label-check.json`](html/fr03-forgot-password/chromium/report-label-check.json) |
| Firefox | [`reports/html/fr03-forgot-password/firefox/hw04-report.html`](html/fr03-forgot-password/firefox/hw04-report.html) | [`reports/results/fr03-forgot-password/firefox/results.json`](results/fr03-forgot-password/firefox/results.json) | [`reports/html/fr03-forgot-password/firefox/report-label-check.json`](html/fr03-forgot-password/firefox/report-label-check.json) |
| WebKit | [`reports/html/fr03-forgot-password/webkit/hw04-report.html`](html/fr03-forgot-password/webkit/hw04-report.html) | [`reports/results/fr03-forgot-password/webkit/results.json`](results/fr03-forgot-password/webkit/results.json) | [`reports/html/fr03-forgot-password/webkit/report-label-check.json`](html/fr03-forgot-password/webkit/report-label-check.json) |

Kết quả label verification cho cả 3 browser: `ok=true`. Mỗi wrapper report đều có `Run by: 23127475` và không còn placeholder.

### 6.8 Kết quả chạy FR-03

| Browser | Total | Passed | Failed |
| --- | ---: | ---: | ---: |
| Chromium | 18 | 7 | 11 |
| Firefox | 18 | 7 | 11 |
| WebKit | 18 | 7 | 11 |

Các test failed giống nhau trên cả 3 browser:

- TC-FR03-DT-001
- TC-FR03-DT-002
- TC-FR03-DT-003
- TC-FR03-DT-004
- TC-FR03-DT-005
- TC-FR03-DT-006
- TC-FR03-DT-010
- TC-FR03-DT-011
- TC-FR03-DT-012
- TC-FR03-BVA-001
- TC-FR03-BVA-004

Các test passed giống nhau trên cả 3 browser:

- TC-FR03-DT-007
- TC-FR03-DT-008
- TC-FR03-DT-009
- TC-FR03-BVA-002
- TC-FR03-BVA-003
- TC-FR03-BVA-005
- TC-FR03-BVA-006

### 6.9 Phân tích lỗi chính

Các lỗi fail không được xem là lỗi script đơn thuần vì đều map được về expected result của manual test/SRS và reproduce ổn định qua nhiều browser hoặc qua API.

| Nhóm lỗi | Test liên quan | Actual result quan sát được | Mức độ |
| --- | --- | --- | --- |
| OTP chỉ có 4 chữ số thay vì 6 chữ số | TC-FR03-DT-001, TC-FR03-DT-006, TC-FR03-BVA-001 | UI/API trả OTP/resetToken dạng 4 chữ số | Major / P1 |
| Thiếu chỉ báo bước 1/2 | TC-FR03-DT-001 | UI không hiển thị step indicator | Minor / P3 |
| Thiếu nút quay lại đăng nhập ở bước nhập email | TC-FR03-DT-002 | Không tìm thấy button/link quay lại login | Major / P2 |
| Form lấy OTP không hiển thị lỗi validation email | TC-FR03-DT-003, TC-FR03-DT-004, TC-FR03-DT-005 | Sau submit, body vẫn chỉ có form ban đầu, không có lỗi rõ ràng | Major / P2 |
| Thiếu ô xác nhận mật khẩu mới | TC-FR03-DT-011 | Form reset chỉ có 2 textbox thay vì 3 textbox | Major / P1 |
| API reset password chấp nhận mật khẩu không đạt rule | TC-FR03-DT-010, TC-FR03-DT-012, TC-FR03-BVA-004 | API trả `200` cho password yếu/rỗng/7 ký tự | Critical / P1 |

### 6.10 Bug reports

| Bug report | Tóm tắt | Test case liên quan | Severity / Priority | GitHub Issue |
| --- | --- | --- | --- | --- |
| [`bug-reports/automation/BUG-FR03-AUTO-001.md`](../bug-reports/automation/BUG-FR03-AUTO-001.md) | OTP quên mật khẩu được sinh 4 chữ số thay vì 6 chữ số | TC-FR03-DT-001, TC-FR03-DT-006, TC-FR03-BVA-001 | Major / P1 | [#214](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/214) |
| [`bug-reports/automation/BUG-FR03-AUTO-002.md`](../bug-reports/automation/BUG-FR03-AUTO-002.md) | Bước 1 không hiển thị chỉ báo bước | TC-FR03-DT-001 | Minor / P3 | [#216](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/216) |
| [`bug-reports/automation/BUG-FR03-AUTO-003.md`](../bug-reports/automation/BUG-FR03-AUTO-003.md) | Thiếu nút Quay lại đăng nhập ở bước nhập email | TC-FR03-DT-002 | Major / P2 | [#215](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/215) |
| [`bug-reports/automation/BUG-FR03-AUTO-004.md`](../bug-reports/automation/BUG-FR03-AUTO-004.md) | Form lấy OTP không hiển thị thông báo lỗi cho email không hợp lệ | TC-FR03-DT-003, TC-FR03-DT-004, TC-FR03-DT-005 | Major / P2 | [#217](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/217) |
| [`bug-reports/automation/BUG-FR03-AUTO-005.md`](../bug-reports/automation/BUG-FR03-AUTO-005.md) | Bước đặt lại mật khẩu thiếu ô Xác nhận mật khẩu mới | TC-FR03-DT-011 | Major / P1 | [#218](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/218) |
| [`bug-reports/automation/BUG-FR03-AUTO-006.md`](../bug-reports/automation/BUG-FR03-AUTO-006.md) | API reset password chấp nhận mật khẩu mới không đạt rule | TC-FR03-DT-010, TC-FR03-DT-012, TC-FR03-BVA-004 | Critical / P1 | [#219](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/219) |

Ghi chú: 6 GitHub Issues của FR-03 đã được tạo trên repo [`lmchkhi/CS423-CSC15003-Testing-N08`](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08). Mỗi issue có đủ 5 label: `Type: Bug`, `Status: New`, `Module: Forgot password`, `Priority: Px`, `Severity: ...`. Issue body dùng link evidence dạng GitHub blob URL theo branch `hw04/23127475`; nếu cần ảnh hiển thị inline trong GitHub issue, có thể upload screenshot thủ công qua GitHub UI.

### 6.11 Human review và các chỉnh sửa đối với AI-generated script

Trong quá trình tạo FR-03 automation, script ban đầu cần được review và chỉnh ở các điểm sau:

| Vấn đề phát hiện | Cách chỉnh |
| --- | --- |
| Locator email ban đầu có thể giòn nếu UI không có label/placeholder chuẩn | Thêm fallback theo `input[type="email"]` và `getByRole('textbox')` |
| Dữ liệu test nếu dùng user cố định có thể làm thay đổi trạng thái tài khoản dùng chung | Tạo email tạm bằng `runId` cho các case reset password |
| Chạy UI full flow có thể dừng sớm ở assertion đầu, làm thiếu evidence cho các bước sau | Dùng `expect.soft` ở các oracle cần gom nhiều bằng chứng |
| JSON reporter ghi cùng thư mục HTML có thể bị HTML reporter dọn sạch | Tách JSON result sang [`reports/results/`](results/) |
| Playwright `test-results` mặc định bị ghi đè giữa các browser | Tách `outputDir` theo [`test-results/fr03-forgot-password/`](../test-results/fr03-forgot-password/) |
| Playwright HTML `index.html` không dễ thấy `Run by` trong nội dung report | Tạo `hw04-report.html` wrapper có header rõ `Run by: 23127475` |

### 6.12 Gap và giới hạn còn lại của FR-03

- Đã tạo 6 GitHub Issues từ 6 bug report Markdown và cập nhật link vào bug report/main report.
- Issue body đã có link evidence tới repo path/blob URL. Screenshot inline trên GitHub Issue có thể cần upload thủ công qua GitHub UI nếu GitHub không render trực tiếp từ blob URL.
- Chưa quay demo video end-to-end; phần này sẽ làm ở Task 2.
- Một số test dùng API setup để tăng độ ổn định. Đây là lựa chọn black-box hợp lý vì API đã được cung cấp trong specification, nhưng report cần nêu rõ đây không phải đọc source code.

## 7. FR-11 - Order History View

Trạng thái: in progress - Commit 3 / đợt 1 đã hoàn tất.

Kế hoạch chi tiết nằm trong [`reports/automation-commit-plan.md`](automation-commit-plan.md).

### 7.1 Phạm vi Commit 3

Commit 3 tạo baseline automation cho FR-11 với 5 test case đầu:

| Test case | Mục tiêu | Kết quả Chromium |
| --- | --- | --- |
| TC-FR11-DT-001 | User đăng nhập và có ít nhất 1 đơn hàng xem được lịch sử | Passed |
| TC-FR11-DT-002 | Guest bị chặn khỏi lịch sử đơn hàng và API `my-orders` | Passed |
| TC-FR11-DT-003 | User chưa có đơn hàng thấy empty state | Passed |
| TC-FR11-BVA-001 | Boundary 0 đơn hàng | Passed |
| TC-FR11-BVA-002 | Boundary đúng 1 đơn hàng | Passed |

### 7.2 Automation artifact

- Data file: [`tests/automation/data/fr11-order-history.json`](../tests/automation/data/fr11-order-history.json)
- Spec file: [`tests/automation/specs/fr11-order-history.spec.ts`](../tests/automation/specs/fr11-order-history.spec.ts)
- Playwright report wrapper: [`reports/html/fr11-order-history/chromium/hw04-report.html`](html/fr11-order-history/chromium/hw04-report.html)
- Playwright report gốc: [`reports/html/fr11-order-history/chromium/index.html`](html/fr11-order-history/chromium/index.html)
- JSON result: [`reports/results/fr11-order-history/chromium/results.json`](results/fr11-order-history/chromium/results.json)
- Label verification manifest: [`reports/html/fr11-order-history/report-label-check.json`](html/fr11-order-history/report-label-check.json)

### 7.3 Cách setup và oracle

Script dùng API black-box theo `api_specification.md` để tạo dữ liệu trước test:

- `POST /api/register` tạo user riêng theo `runId`.
- `POST /api/login` lấy token.
- `POST /api/checkout` tạo 0 hoặc 1 order theo data case.
- `GET /api/orders/my-orders` đối chiếu số lượng đơn hàng và quyền guest.

UI vẫn là mục tiêu kiểm thử chính cho các case hiển thị: script login qua form web, mở lịch sử đơn hàng bằng danh sách route ứng viên và fallback link navigation, sau đó kiểm tra text/order amount/empty state. Assertion pattern đã dùng trong đợt 1 gồm API status/body, navigation/UI content, list count/data consistency.

### 7.4 Kết quả chạy Commit 3

Command đã chạy:

```bash
STUDENT_ID=23127475 HW04_FEATURE=fr11-order-history HW04_BROWSER=chromium HW04_REPORT_DIR=reports/html/fr11-order-history/chromium HW04_JSON_REPORT=reports/results/fr11-order-history/chromium/results.json HW04_TEST_RESULTS_DIR=test-results/fr11-order-history/chromium WEB_BASE_URL='http://[::1]:5174' API_BASE_URL='http://[::1]:3000' ./node_modules/.bin/playwright test tests/automation/specs/fr11-order-history.spec.ts --project=chromium
```

Kết quả: 5 executed, 5 passed, 0 failed. Không tạo bug report hoặc GitHub Issue ở đợt này vì chưa có defect reproduce ổn định trong subset Commit 3.

### 7.5 Human review và chỉnh sửa script AI-generated

| Vấn đề phát hiện | Cách chỉnh |
| --- | --- |
| Lần chạy đầu fail do locator mật khẩu dựa vào label/type chưa phù hợp với DOM black-box của form login | Thêm fallback `getByRole('textbox').nth(1)` cho password field |
| Button login hiển thị `Sign In`, không khớp regex ban đầu chỉ có `đăng nhập/login/submit` | Bổ sung `sign in` vào locator button |
| Browser launch trong sandbox macOS fail `MachPortRendezvousServer Permission denied` | Rerun Playwright với quyền ngoài sandbox để tạo report thật |
| Frontend web không listen ở `5173`; khi khởi động SUT black-box, Vite chọn `5174` | Chạy report với `WEB_BASE_URL='http://[::1]:5174'` và ghi rõ command |

### 7.6 Phần còn lại của FR-11

- Commit 4 sẽ mở rộng TC-FR11-DT-004 đến TC-FR11-DT-010: nhiều đơn, ownership, detail/API, mã đơn, ngày đặt, tổng tiền.
- Commit 5 sẽ hoàn thiện TC-FR11-DT-011, TC-FR11-DT-012 và TC-FR11-BVA-003, chạy đủ Chromium/Firefox/WebKit, rồi tạo bug report/GitHub Issue nếu defect được reproduce.

## 8. FR-14 - Category Management CRUD

Trạng thái: planned.

Kế hoạch chi tiết nằm trong [`reports/automation-commit-plan.md`](automation-commit-plan.md).

Tóm tắt dự kiến:

- Automate 22 test case: TC-FR14-DT-001 đến TC-FR14-DT-016 và TC-FR14-BVA-001 đến TC-FR14-BVA-006.
- Chia 3 commit: access baseline, create/update validation, delete/full cross-browser.
- Chạy Chromium, Firefox, WebKit.
- Tạo report HTML, JSON result, bug report và GitHub Issues nếu có lỗi thật.

Kết quả sẽ cập nhật sau khi chạy.

## 9. Git commit log

Yêu cầu gốc của đề là tối thiểu 8 commit có thay đổi đến test script hoặc file tương đương. Giảng viên đã bỏ yêu cầu trải qua 4 ngày cho trường hợp này, nhưng vẫn cần commit history có ý nghĩa.

Kế hoạch 6 commit còn lại:

| Commit dự kiến | Nội dung |
| --- | --- |
| Commit 3 | FR-11 baseline + smoke + access control |
| Commit 4 | FR-11 ownership/detail/display assertions |
| Commit 5 | FR-11 full cross-browser + bug reports |
| Commit 6 | FR-14 admin/guest/user access baseline |
| Commit 7 | FR-14 create/update validation + BVA |
| Commit 8 | FR-14 delete/API authorization + full cross-browser |

Chi tiết: [`reports/automation-commit-plan.md`](automation-commit-plan.md).

Sau khi tạo commit thật, cần cập nhật phần này bằng hash commit và message thực tế.

## 10. GitHub Issues

Trạng thái hiện tại:

- FR-03: đã tạo 6 GitHub Issues từ bug reports automation:
  - [#214](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/214) - OTP quên mật khẩu được sinh 4 chữ số thay vì 6 chữ số.
  - [#216](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/216) - Bước 1 của luồng quên mật khẩu không hiển thị chỉ báo bước.
  - [#215](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/215) - Trang quên mật khẩu thiếu nút Quay lại đăng nhập ở bước nhập email.
  - [#217](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/217) - Form lấy OTP không hiển thị thông báo lỗi cho email không hợp lệ.
  - [#218](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/218) - Bước đặt lại mật khẩu thiếu ô Xác nhận mật khẩu mới.
  - [#219](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/219) - API reset password chấp nhận mật khẩu mới không đạt rule.
- FR-11: TODO.
- FR-14: TODO.

Quy tắc cập nhật:

- Chỉ tạo issue khi bug reproduce ổn định.
- Mỗi issue cần có screenshot hoặc Playwright evidence.
- Sau khi tạo issue, cập nhật link vào bug report Markdown và bảng bug report trong main report.

## 11. Demo video

TODO sau khi chọn script demo.

Yêu cầu cần có trong video:

- Video unlisted YouTube, tối thiểu 5 phút.
- Narration tiếng Việt.
- Demo một script automation chạy end-to-end.
- Có multi-browser run và HTML report.
- Nêu ít nhất một fix đã thực hiện khi review AI-generated script.
- Chứng minh authorship bằng face-cam hoặc terminal chạy `whoami` và `hostname`.

Ứng viên demo phù hợp hiện tại:

- FR-03 vì đã hoàn tất 3 browser, có report và có bug thật để phân tích.

## 12. AI audit và AI critique

AI audit report:

- [`reports/ai-audit-report.md`](ai-audit-report.md)

AI critique 200-300 words:

- TODO sau khi hoàn tất cả FR-11 và FR-14, vì lúc đó sẽ có đủ dữ liệu để đánh giá AI toàn diện hơn.

Các ý chính dự kiến cho critique:

- AI hữu ích trong việc tạo skeleton, data-driven dispatch, helper setup và report workflow.
- AI có thể sinh locator giòn nếu thiếu runtime evidence.
- AI dễ bỏ sót yêu cầu nộp bài như report label, JSON/result separation, screenshot/issue linkage nếu prompt không nhắc rõ.
- Human review quan trọng để phân biệt lỗi sản phẩm thật với lỗi script/setup.

## 13. Self-assessment draft

| Criteria | Status | Evidence |
| --- | --- | --- |
| Task 1 - Feature A / FR-03 | Done | Script, JSON data, 3 browser reports, 6 bug reports, 6 GitHub Issues |
| Task 1 - Feature B / FR-11 | In progress | Commit 3 baseline: 5 Chromium tests passed, report generated |
| Task 1 - Feature C / FR-14 | TODO | Planned |
| Task 2 - Demo video | TODO | Not recorded yet |
| Agent Skill | In progress / available | [`skills/eshop-hw04-task1-automation`](../skills/eshop-hw04-task1-automation/), [`skills/write-ai-audit-report`](../skills/write-ai-audit-report/) |

## 14. Submission TODO checklist

- Hoàn tất FR-11 automation và cập nhật report.
- Hoàn tất FR-14 automation và cập nhật report.
- Tạo GitHub Issues từ bug reports của FR-11/FR-14 nếu các feature này phát hiện lỗi thật.
- Cập nhật link GitHub Issues vào bug reports và main report cho FR-11/FR-14.
- Sinh Git commit log text file.
- Viết AI critique 200-300 words.
- Quay demo video và thêm YouTube link.
- Xuất main report và AI audit report sang PDF.
- Cập nhật README self-assessment table và test summary.
