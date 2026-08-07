# AI Audit Report (HW04)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh              |
| **MSSV:**               | 23127475              |
| **Lớp / Khoá:**         | CS423 / CSC13003              |
| **Mã bài tập :**        | HW04                    |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 06/08/2026 23:08 GMT+7             |
| **Artifact type** | Agent skill tạo mới + cập nhật env automation         |

**Full prompt:**

```text
[$skill-creator] tiếp theo là viết skill để ghi log mỗi khi chat vào file reports/ai-audit-report.md. tham khảo vài entry đầu của file mẫu reports/ai-audit-report-sample.md để nắm cấu trúc và cách viết. dựa vào thông tin sinh viên đó có thể bổ sung cho các biến env của skill eshop-hw04-task1-automation
```

### (2) AI Output

```text
AI đã đọc skill-creator và các entry đầu của reports/ai-audit-report-sample.md để lấy format audit và thông tin sinh viên. Đã tạo skill skills/write-ai-audit-report gồm SKILL.md, agents/openai.yaml với allow_implicit_invocation=true, và script scripts/append_ai_audit_entry.py để tự tạo header, tìm Entry # tiếp theo, dùng timestamp GMT+7, rồi append Prompt + Tool và AI Output vào reports/ai-audit-report.md. Đã cập nhật skill skills/eshop-hw04-task1-automation để nhắc dùng audit logger trước final và bổ sung env mặc định STUDENT_ID=23127475, STUDENT_NAME="Ngô Hồng Thanh", COURSE_CLASS="CS423 / CSC13003", AI_TOOL=Codex; đồng thời đổi ví dụ Playwright report verification sang student id 23127475. Đã test script append trên /tmp thành công và parse YAML bằng Ruby/Python stdlib thành công. quick_validate.py chưa chạy được vì môi trường Python thiếu module yaml (PyYAML), lỗi ModuleNotFoundError: No module named yaml.
```

## Entry #2

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 06/08/2026 23:41 GMT+7             |
| **Artifact type** | Playwright smoke run FR-03 + HTML report         |

**Full prompt:**

```text
bây giờ tôi muốn chạy thử với 1 test case của FR-03 đầu tiên để xem thử report ra sao. lưu ý full flow luôn nhé. thiếu tool gì thì xin quyền tôi để tải, cái nào yêu cầu mật khẩu thì đưa tôi lệnh và dừng để tôi tự tải, sau khi tải xong tôi sẽ yêu cầu tiếp tục để thực hiện tiếp nếu chưa xong
```

### (2) AI Output

```text
AI đã thực hiện black-box flow cho TC-FR03-DT-001. Đã cài @playwright/test bằng npm install sau khi xin quyền, tạo playwright.config.ts, data file tests/automation/data/fr03-forgot-password.json và spec tests/automation/specs/fr03-forgot-password.spec.ts. Đã chạy backend và frontend web ngoài sandbox sau khi xin quyền do cần bind localhost. Đã tải Chromium bằng npx playwright install chromium sau khi xin quyền vì browser binary thiếu. Chạy Playwright lần đầu gặp lỗi sandbox khi launch browser, sau đó chạy ngoài sandbox. Spec được sửa để dùng soft assertion cho full flow và fallback locator role textbox dựa trên Playwright error-context runtime. Lần chạy cuối đi hết UI + API: UI thiếu step indicator, UI hiển thị OTP 4 số, API cũng trả resetToken 4 số nên test fail đúng theo SRS. Đã sinh report tại reports/html/fr03-forgot-password/chromium, thêm wrapper hw04-report.html có Run by: 23127475 và verify bằng verify_report_labels.py với kết quả ok=true. Đã dừng backend/frontend sau khi hoàn tất.
```

## Entry #3

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 07/08/2026 08:52 GMT+7             |
| **Artifact type** | FR-03 automation suite and bug reports         |

**Full prompt:**

```text
bây giờ làm toàn bộ các test cho fr-03 giúp tôi luôn. lưu ý chọn hết những test case phù hợp với fr-03 và ít nhất là 12 test case. tôi đã chạy backend và frontend-web sẵn trong terminal của tôi rồi. nhớ ghi log vào reports/ai-audit-report.md và ngoài report html của playwright cần tạo thêm bug report theo template .github/ISSUE_TEMPLATE/bug-report-template.md để sau này tạo github issue nữa, có thể đặt trong bug-reports/automation
```

### (2) AI Output

```text
Tạo suite Playwright data-driven cho FR-03 với 18 test case từ manual cases, chạy full flow trên frontend/backend localhost bằng Chromium, Firefox và WebKit, tạo HTML report, JSON result, report-label manifest, outputDir evidence tách theo browser và 6 bug report automation theo template GitHub. Kết quả mỗi browser: 18 tests, 7 passed, 11 failed.
```
