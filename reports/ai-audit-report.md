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

## Entry #4

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 15:40 GMT+7             |
| **Artifact type** | Automation commit plan         |

**Full prompt:**

```text
vậy tạo giúp tôi file plan đó đi; continue, 2 fr còn lại là fr-11 và fr-14
```

### (2) AI Output

```text
Tạo reports/automation-commit-plan.md bằng tiếng Việt, chia 6 commit còn thiếu cho FR-11 và FR-14 theo 3 đợt mỗi feature. Plan liệt kê test case manual được chọn, artifact cần tạo, thời điểm chạy Playwright report, bug report, GitHub Issue, main-report và checklist trước/sau commit.
```

## Entry #5

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 16:02 GMT+7             |
| **Artifact type** | Main report update for FR-03         |

**Full prompt:**

```text
hiện tại fr-03 đã chạy xong và có report, bug report rồi, bây giờ cập nhật dần vào main report giúp tôi, trình bày chi tiết những thông tin cần thiết giúp tôi, nhớ tổng quát để còn trình bày những phần yêu cầu khác vào main report nữa
```

### (2) AI Output

```text
Cập nhật reports/main-report.md từ file trống thành main report tổng quát cho HW04. Đã điền chi tiết FR-03 gồm phạm vi, artifact, data-driven script, 18 test case, assertion patterns, setup data, lệnh chạy 3 browser, report paths, kết quả 18 total/7 passed/11 failed mỗi browser, phân tích 6 nhóm lỗi, bug report paths, human review/fixes, gap còn lại và các section placeholder cho FR-11, FR-14, Git commit log, GitHub Issues, demo video, AI critique, self-assessment và checklist nộp bài.
```

## Entry #6

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 16:31 GMT+7             |
| **Artifact type** | Clickable evidence links update         |

**Full prompt:**

```text
các bug report trong bug-reports/automation tôi muốn phần Screenshot Evidence để thông tin đường dẫn giống hiện tại và thêm dạng có thể hiển thị được, còn các phần còn lại trong Evidence đang để dạng đường dẫn nhưng không thể bấm vào và nhảy tới được, tôi muốn thể hiện đường dẫn giống hiện tại nhưng bấm vào có thể di chuyển tới được. trong main report cũng có vài chỗ để dạng đường dẫn, tôi cũng muốn nó có thể bấm được
```

### (2) AI Output

```text
Cập nhật 6 bug report FR-03 automation để các Evidence path giữ nguyên label dạng đường dẫn nhưng chuyển thành Markdown links có thể bấm. Thêm Screenshot Evidence bằng cả link text và ảnh Markdown hiển thị trực tiếp. Cập nhật reports/main-report.md để các đường dẫn artifact/report/data/bug report/skill chính có thể bấm được. Đã kiểm tra 100 Markdown relative links, missing=0.
```

## Entry #7

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 16:50 GMT+7             |
| **Artifact type** | Agent skill tạo mới - GitHub issue workflow         |

**Full prompt:**

```text
[-creator] tạo thêm cho tôi skill để tại github issue với các yêu cầu cơ bản...
```

### (2) AI Output

```text
Tạo skill mới skills/gh-create-bug-issues gồm SKILL.md và agents/openai.yaml. Skill hướng dẫn kiểm tra gh auth status, gh repo view, lấy label bằng gh label list --limit 100, đảm bảo mỗi issue có 5 label Type/Status/Module/Priority/Severity, tái sử dụng label exact match, tạo label còn thiếu bằng gh label create, suy luận module/priority/severity từ bug report, tạo issue bằng gh issue create, cập nhật bug report/main report bằng issue URL thật, và ghi chú cách xử lý screenshot. Đã sửa default_prompt trong agents/openai.yaml để giữ đúng -create-bug-issues. quick_validate.py không chạy được do thiếu PyYAML; đã validate thay thế bằng Ruby YAML parse frontmatter thành công và rà không còn TODO template.
```

## Entry #8

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex + GitHub CLI (`gh`) |
| **Timestamp**     | 09/08/2026 17:21 GMT+7 |
| **Artifact type** | GitHub Issues creation for FR-03 automation bug reports |

**Full prompt:**

```text
bây giờ tạo github issue cho fr-03 giúp tôi và cập nhật các file liên quan
```

### (2) AI Output

```text
Áp dụng workflow từ skill gh-create-bug-issues. Đã kiểm tra gh auth status, xác định repo target lmchkhi/CS423-CSC15003-Testing-N08 bằng gh repo view --json nameWithOwner,url, chạy gh label list --limit 100 để lấy đủ label hiện có và dùng lại label chính xác: Type: Bug, Status: New, Module: Forgot password, Priority: P1/P2/P3, Severity: Major/Minor/Critical. Tạo 6 GitHub Issues cho FR-03 từ các bug report BUG-FR03-AUTO-001..006: #214, #216, #215, #217, #218, #219. Đã kiểm tra lại title/label bằng gh issue view, cập nhật section GitHub Issue vào từng bug report Markdown, cập nhật bảng bug reports và trạng thái GitHub Issues trong reports/main-report.md. Issue body dùng bản tạm trong /tmp với evidence link dạng GitHub blob URL theo branch hw04/23127475 và note về việc upload screenshot thủ công nếu cần ảnh inline.
```

## Entry #9

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 22:21 GMT+7             |
| **Artifact type** | Playwright automation script + report FR-11 Commit 3         |

**Full prompt:**

```text
bây giờ bắt đầu thực hiện commit 3 theo plan reports/automation-commit-plan.md giúp tôi. nhớ dùng các skill eshop-hw04-task1-automation, write-ai-audit-report, gh-create-bug-issues khi cần
```

### (2) AI Output

```text
Đã đọc plan reports/automation-commit-plan.md và các skill local eshop-hw04-task1-automation, write-ai-audit-report, gh-create-bug-issues. Đọc SRS/API/manual cases FR-11 theo phạm vi black-box, không đọc source backend/frontend. Tạo tests/automation/data/fr11-order-history.json với 5 case Commit 3 và tests/automation/specs/fr11-order-history.spec.ts theo data-driven Playwright. Probe API public qua http://[::1]:3000 để xác nhận register/login/checkout/my-orders. Chạy npm install vì node_modules thiếu Playwright binary. Khởi động frontend web black-box bằng npm run dev, Vite chọn http://[::1]:5174 do 5173 đang bận. Lần chạy đầu phát hiện browser launch bị sandbox macOS và locator password/sign-in chưa phù hợp; đã rerun ngoài sandbox và chỉnh locator fallback theo screenshot runtime. Chạy Chromium report thành công: 5 executed, 5 passed, 0 failed. Tạo reports/html/fr11-order-history/chromium/hw04-report.html, reports/html/fr11-order-history/chromium/index.html, reports/results/fr11-order-history/chromium/results.json và report-label-check.json; verify Run by: 23127475 thành công. Cập nhật reports/main-report.md và reports/automation-commit-plan.md. Không tạo bug report/GitHub Issue vì subset Commit 3 chưa có defect reproduce ổn định.
```

## Entry #10

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 22:45 GMT+7             |
| **Artifact type** | Playwright automation script + bug report FR-11 Commit 4         |

**Full prompt:**

```text
bây giờ tiếp tục với commit 4, tôi đã chạy sẵn backend và frontend-web giúp rồi
```

### (2) AI Output

```text
Đã tiếp tục Commit 4 theo reports/automation-commit-plan.md cho FR-11. Đọc skill eshop-hw04-task1-automation và write-ai-audit-report, đọc reference FR-11/manual cases TC-FR11-DT-004 đến TC-FR11-DT-010 và bug report HW02 BUG-FR11-007; không đọc source backend/frontend. Bổ sung 7 test case vào tests/automation/data/fr11-order-history.json, mở rộng tests/automation/specs/fr11-order-history.spec.ts với helper user A/user B, nhiều đơn hàng, detail API, ownership và field display assertions. Chạy Playwright Chromium với WEB_BASE_URL=http://[::1]:5173 và API_BASE_URL=http://[::1]:3000: 12 executed, 11 passed, 1 failed. Đã review và sửa lỗi script ở order id regex, date format non-zero-padded và login success text. Fail còn lại là defect thật TC-FR11-DT-007: GET /api/orders/<other_user_order_id> bằng token user A trả 200 và body chứa dữ liệu order user B. Đã tạo bug-reports/automation/BUG-FR11-AUTO-001.md theo template, kèm screenshot/error context/trace/video/report links. Cập nhật reports/main-report.md, reports/automation-commit-plan.md, reports/html/fr11-order-history/chromium/*, reports/results/fr11-order-history/chromium/results.json và report-label-check.json. Verify report label ok=true, bug report links missing=0. Chưa tạo GitHub Issue ở Commit 4 vì plan chốt issue sau Commit 5 full suite.
```

## Entry #11

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 09/08/2026 23:27 GMT+7             |
| **Artifact type** | Playwright automation script + report/evidence + GitHub issues         |

**Full prompt:**

```text
bây giờ làm tiếp tục tới commit 5
```

### (2) AI Output

```text
Đã hoàn tất Commit 5 cho FR-11: bổ sung 3 test case TC-FR11-DT-011, TC-FR11-DT-012 và TC-FR11-BVA-003 vào data/spec Playwright; thêm helper setup trạng thái bằng admin API black-box, assertion dịch trạng thái và đo khoảng cách màu; chạy lại WebKit để loại bỏ flake login và xác nhận full suite 15 test case. Kết quả Chromium/Firefox/WebKit đều 15 total, 13 passed, 2 failed với hai lỗi thật TC-FR11-DT-007 và TC-FR11-DT-012. Đã sinh lại wrapper report hw04-report.html cho 3 browser, thêm metadata Run by: 23127475 vào report gốc, chạy verify_report_labels.py với ok=true. Đã cập nhật BUG-FR11-AUTO-001, tạo BUG-FR11-AUTO-002, tạo GitHub issues #239 và #240 với đủ 5 label bắt buộc, cập nhật issue link vào bug reports, reports/main-report.md và reports/automation-commit-plan.md.
```
