---
name: run-usability-evaluation-eshop
description: Chuẩn bị, điều phối và báo cáo Task 2 HW03 Usability Evaluation cho EShop. Dùng khi Codex cần chọn hoặc cụ thể hóa một end-to-end flow, viết objective/task scenario/probe questions, tạo participant/session templates, hướng dẫn chạy 7 moderated usability sessions, phân tích notes thật, tính SUS hoặc UEQ-S từ dữ liệu người dùng cung cấp, tổng hợp severity-ranked findings, tạo bug report/GitHub issue cho usability bugs, cập nhật reports/main-report.md và append reports/ai-audit-report.md. Không dùng skill này để bịa participant, contact, recording, survey response hoặc evidence.
---

# Run Usability Evaluation EShop

## Tổng Quan

Thực hiện Task 2 như một usability evaluation có kiểm soát: lập kế hoạch, chuẩn bị instrument, ghi nhận 7 phiên moderated thật, tính điểm SUS/UEQ-S, tổng hợp pain points, phân loại bug/design issue và cập nhật report.

Luôn xem `reports/ai-audit-report.md` là artifact bắt buộc. Mọi lần tạo/sửa plan, template, scoring, analysis, bug report hoặc GitHub issue cho Task 2 đều phải append audit entry trước khi trả lời final.

## Đầu Vào Cần Đọc

Đọc khi bắt đầu workflow Task 2:

- `HW03-GUI&Usability.md`: đọc phần Task 2, Agent Skill, AI Audit, Anti-AI-Cheat và submission requirements.
- `SystemRequirementsSpecification.md`: lấy target users, flow requirement, business rules và expected behavior.
- `api_specification.md`: chỉ dùng để hiểu contract/user-visible flow khi cần chuẩn bị dữ liệu, không đọc source implementation.
- `reports/main-report.md`: cập nhật thêm section usability evaluation.
- `reports/ai-audit-report.md` và `skills/write-ai-audit-report/SKILL.md`: append audit entry.
- `skills/run-usability-evaluation-eshop/references/hw03-task2-usability-workflow.md`: đọc khi cần quy trình chi tiết, bảng output và tiêu chí phân loại findings.

Không đọc các thư mục mã nguồn khi thiết kế usability study hoặc phân tích evidence:

- `backend/`
- `frontend-admin/`
- `frontend-web/`
- `frontend-mobile/`

## Workflow

1. Xác định flow và objective.
   - Nếu người dùng đã chọn flow, dùng đúng flow đó.
   - Nếu chưa có, đề xuất 2-3 end-to-end flow phù hợp, ví dụ Sign-up -> Add to cart -> Checkout with coupon, Search -> Product detail -> Cart, hoặc Login -> Order history.
   - Chốt objective theo điều cần học: navigation bottleneck, trust, speed, error recovery, comprehension, confidence.

2. Chuẩn bị instruments.
   - Tạo task scenario dạng goal-oriented, không viết step-by-step instruction.
   - Chọn SUS hoặc UEQ-S. Mặc định dùng SUS nếu người dùng chưa chọn vì scoring đơn giản và phổ biến.
   - Tạo probe questions tối thiểu phủ clarity, error recovery, speed và trust.
   - Tạo participant table có contact được mask middle four digits; không bịa participant.
   - Dùng templates trong `assets/` khi cần tạo file nhanh:
     - `assets/usability-plan-template.md`
     - `assets/participant-list-template.md`
     - `assets/session-notes-template.md`
     - `assets/usability-report-template.md`

3. Pilot và refine.
   - Tạo note cho 1 pilot session.
   - Sau pilot, chỉnh scenario/instrument nếu câu chữ gây hiểu nhầm, flow hỏng hoặc timing không hợp lý.
   - Ghi rõ thay đổi sau pilot trong report.

4. Thu thập 7 session thật.
   - Mỗi participant có một session note riêng hoặc một bảng tổng hợp.
   - Ghi task completion, time on task, errors, hesitations, assist events, quotes ngắn, SUS/UEQ-S answers, evidence path.
   - Không tự tạo response, quote, contact, recording hoặc screenshot nếu người dùng chưa cung cấp.

5. Tính điểm survey.
   - Dùng `scripts/score_usability.py` để tính SUS hoặc UEQ-S từ CSV.
   - Với SUS: CSV cần `participant_id,q1,q2,...,q10`, giá trị 1-5.
   - Với UEQ-S: CSV cần `participant_id,q1,...,q8`, giá trị -3 đến 3.
   - Lưu kết quả vào `reports/usability/` hoặc section trong `reports/main-report.md`.

6. Phân tích findings.
   - Gom pain points lặp lại theo theme.
   - Tách genuine bug khỏi systemic design issue và isolated complaint.
   - Gán severity/priority dựa trên impact, frequency và recoverability.
   - Ưu tiên bằng chứng từ notes, survey score, screenshot/video và participant quote ngắn.

7. Tạo bug report và GitHub issue khi người dùng yêu cầu.
   - Dùng `.github/ISSUE_TEMPLATE/bug-report-template.md` cho genuine bugs.
   - Đặt ID như `BUG-USAB-001`, `BUG-USAB-002`.
   - Evidence dùng Markdown image hoặc link repo path/recording path đã có thật.
   - Khi publish GitHub issue bằng `gh`, kiểm tra `gh auth status`, `gh repo view --json nameWithOwner,url`, `gh label list --limit 100`; dùng đủ label `Type: Bug`, `Status: New`, `Module`, `Priority`, `Severity`.

8. Cập nhật report.
   - Cập nhật `reports/main-report.md` với Task 2: flow, participants summary, method, pilot changes, SUS/UEQ-S result, findings, severity ranking, bugs/issues, limitations.
   - Không ghi lộ contact đầy đủ; chỉ ghi contact đã mask.
   - Nêu rõ AI không tạo participant/evidence/session data.

## Scoring Script

Chạy:

```bash
python3 skills/run-usability-evaluation-eshop/scripts/score_usability.py sus reports/usability/sus-responses.csv
python3 skills/run-usability-evaluation-eshop/scripts/score_usability.py ueqs reports/usability/ueqs-responses.csv
```

Script in Markdown summary ra stdout để copy vào report hoặc redirect vào file.

## Chất Lượng Đầu Ra

- Có đúng 7 participant thật, không trùng với sinh viên đang học HW03.
- Contact participant được mask middle four digits.
- Scenario là mục tiêu thực tế, không dẫn từng bước.
- Notes phân biệt observation, quote và interpretation.
- Findings có evidence và severity rõ.
- Survey scoring tính được từng participant và trung bình.
- Bug report/GitHub issue chỉ tạo từ bug thật có evidence.
- `reports/ai-audit-report.md` có entry tương ứng cho mỗi lần AI hỗ trợ Task 2.
