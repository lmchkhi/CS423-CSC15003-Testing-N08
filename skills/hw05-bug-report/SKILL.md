---
name: hw05-bug-report
description: Tạo Markdown bug report cho HW05 từ .github/ISSUE_TEMPLATE/bug-report-template.md và lưu vào reports/bug-reports/. Dùng khi Codex phát hiện bug/performance issue thật trong quá trình smoke test API, chạy JMeter, phân tích JTL/HTML report hoặc kiểm tra evidence; chuẩn hóa title, module, test case, requirement, severity/priority, environment, steps, expected/actual và evidence trước khi tùy chọn dùng gh-create-bug-issues để tạo GitHub Issue.
---

# HW05 Bug Report

## Mục tiêu

Khi phát hiện bug thật, tạo bug report Markdown trong `reports/bug-reports/` theo đúng template repo. Không tạo bug report cho lỗi script/test data/sandbox nếu chưa xác nhận đó là lỗi SUT.

## Đầu vào cần đọc

- `.github/ISSUE_TEMPLATE/bug-report-template.md`: template bắt buộc.
- `reports/bug-reports/`: nơi lưu bug report local.
- Artifact liên quan: screenshot, video, `.jtl`, HTML report, command output hoặc response API.
- Nếu muốn tạo GitHub issue sau đó, đọc và dùng `$gh-create-bug-issues`.

## Quy trình

1. Phân loại lỗi:

- Bug SUT: functional regression, API sai đặc tả, 5xx/timeout/crash có thể tái hiện, performance issue có bằng chứng.
- Không phải bug SUT: sai payload, account lockout do test data, CSV thiếu dòng, sandbox chặn request Authorization, JMeter listener quá nặng, backend chưa chạy.

2. Nếu là bug SUT, tạo file ở `reports/bug-reports/` với tên:

```text
BUG-HW05-<module>-<short-slug>.md
```

Ví dụ: `BUG-HW05-cart-checkout-timeout.md`.

3. Dùng template repo và điền đầy đủ:

- `title`: `[BUG][<Module>] <Name of bug>`.
- `Found by Test Case`: nếu chưa có test case ID, dùng `TC-HW05-WF1-<SCENARIO>-<NN>`.
- `Requirement liên quan`: dùng FR liên quan như `FR-02`, `FR-05`, `FR-07`, `FR-08`; performance issue có thể ghi `HW05 Task 1 - Performance`.
- `Severity / Priority`: chọn theo impact.
- `Environment`: OS, backend URL, scenario, JMeter/CLI, ngày giờ, commit nếu biết.
- `Steps to reproduce`: đủ bước tái hiện.
- `Expected result`: theo requirement hoặc kỳ vọng performance.
- `Actual result`: số liệu/lỗi thật.
- `Evidence`: path screenshot/video/log/JTL/HTML report.

4. Nếu user yêu cầu hoặc bài cần GitHub Issue, dùng `$gh-create-bug-issues` với file bug report đã tạo. Không bịa issue URL; chỉ cập nhật bug report sau khi `gh issue create` thành công.

5. Dùng `$hw05-ai-audit-log` trước final để ghi entry audit cho bug report đã tạo.

## Script tạo nhanh

```bash
python3 skills/hw05-bug-report/scripts/create_bug_report.py \
  --module "Cart Checkout" \
  --summary "Checkout trả 500 khi giỏ hàng hợp lệ" \
  --test-case "TC-HW05-WF1-LOAD-001" \
  --requirement "FR-08" \
  --severity "Major" \
  --priority "P1" \
  --environment "macOS, Backend http://localhost:3000, JMeter Load" \
  --steps-file /private/tmp/bug-steps.txt \
  --expected "Checkout thành công và trả orderId." \
  --actual "API trả HTTP 500 trong 12/500 samples." \
  --evidence "testing-artifacts/hw05/results/load/23127475_Load_20260815.jtl"
```

Luôn đọc lại file sau khi tạo để kiểm tra nội dung không còn placeholder quan trọng.
