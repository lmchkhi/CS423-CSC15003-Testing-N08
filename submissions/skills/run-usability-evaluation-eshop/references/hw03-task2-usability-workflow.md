# HW03 Task 2 Usability Evaluation Workflow

## Phạm Vi Task 2

Task 2 yêu cầu một moderated usability evaluation cho một end-to-end flow đã chọn trong EShop. Cần 7 participant thật, 7 session riêng, một usability scale sau mỗi session, probe questions, phân tích pain points và bug/design issue.

## Artifact Khuyến Nghị

- `reports/usability/usability-plan.md`: objective, target profile, flow, scenario, instrument, pilot plan.
- `reports/usability/participants.md`: participant table đã mask contact.
- `reports/usability/session-notes.md`: notes cho pilot và 7 real sessions.
- `reports/usability/sus-responses.csv` hoặc `reports/usability/ueqs-responses.csv`: raw survey responses.
- `reports/usability/usability-findings.md`: severity-ranked findings.
- `reports/main-report.md`: section Task 2 final.
- `bug-reports/BUG-USAB-xxx.md`: genuine bugs phát hiện trong usability sessions.

## Flow Selection

Flow tốt cho Task 2 phải có mục tiêu rõ, có trạng thái trung gian và có khả năng phát sinh friction:

- Sign-up -> Search/Browse -> Product detail -> Add to cart -> Checkout with coupon.
- Login -> Product listing -> Filter/search -> Add to cart -> Checkout.
- Login -> View order history -> Inspect order detail.
- Forgot password -> Reset password -> Login.

Không chọn flow quá ngắn chỉ có một màn hình nếu không tạo được observation đủ sâu.

## Objective Template

Viết 2-4 objective:

- Người dùng có hiểu điểm bắt đầu và bước tiếp theo của flow không?
- Người dùng có hoàn thành task không cần hint không?
- Người dùng gặp friction ở navigation, form validation, feedback, trust hay speed?
- Người dùng có tin tưởng thông tin giá, coupon, giỏ hàng và checkout không?

## Scenario Rules

Scenario phải:

- Nêu bối cảnh và goal.
- Không liệt kê step-by-step instruction.
- Không nêu tên control cụ thể trừ khi đó là một phần mục tiêu.
- Có dữ liệu đủ rõ, ví dụ ngân sách, sản phẩm cần tìm, coupon cần dùng.

Ví dụ tốt:

```text
Bạn muốn mua một món đồ công nghệ trong ngân sách khoảng 30.000.000 ₫. Hãy tìm sản phẩm phù hợp, thêm vào giỏ hàng, áp dụng mã giảm giá nếu có và đi đến bước đặt hàng.
```

## Participant Rules

- Phải có 7 participant thật.
- Participant không được là sinh viên đang làm HW03 trong lớp.
- Ưu tiên non-IT/non-tester nếu flow hướng tới shopper phổ thông.
- Contact phải verifiable nhưng mask middle four digits, ví dụ `0912****89` hoặc `nguy****@gmail.com`.
- Không tạo giả tên, contact, quote, survey answer, time hoặc recording.

## Session Notes Schema

Ghi cho mỗi session:

- Participant ID.
- Date/time.
- Device/browser.
- Task completion: Success / Partial / Failed.
- Time on task.
- Hints/assist count.
- Error count.
- Key observations.
- Friction points.
- Short quotes, chỉ dùng quote người dùng thật.
- SUS/UEQ-S answers.
- Evidence path.

## SUS Scoring

SUS có 10 câu, mỗi câu 1-5.

- Câu lẻ: contribution = score - 1.
- Câu chẵn: contribution = 5 - score.
- SUS score = tổng contribution * 2.5.
- Report từng participant, mean, min, max và qualitative interpretation.

Interpretation tham khảo:

- >= 85: Excellent.
- 70-84.9: Good/acceptable.
- 50-69.9: Marginal.
- < 50: Poor.

## UEQ-S Scoring

UEQ-S có 8 item, thường scale -3 đến 3.

- Pragmatic quality: trung bình Q1-Q4.
- Hedonic quality: trung bình Q5-Q8.
- Overall: trung bình Q1-Q8.
- Report từng participant và aggregate mean.

## Finding Severity

Ước lượng severity bằng impact + frequency + recoverability:

- Critical: ngăn hoàn thành task chính hoặc gây rủi ro nghiêm trọng.
- Major: nhiều participant bị kẹt, sai, mất tin tưởng hoặc cần hint.
- Minor: friction rõ nhưng participant vẫn tự phục hồi.
- Trivial: polish/visual wording ít ảnh hưởng task.

Priority:

- P0: cần sửa ngay trước release/demo.
- P1: ảnh hưởng flow chính hoặc nhiều participant.
- P2: ảnh hưởng vừa, nên sửa sớm.
- P3: cải thiện nhỏ.

## GitHub Issue Mapping

Chỉ tạo issue cho genuine bugs có expected/actual rõ. Với systemic design issue không phải bug, ghi trong usability findings và report. Khi tạo issue, dùng:

- `Type: Bug`
- `Status: New`
- `Module: <module>`
- `Priority: <P0-P3>`
- `Severity: <Critical/Major/Minor/Trivial>`

Luôn chạy `gh label list --limit 100` trước khi chọn/tạo label.
