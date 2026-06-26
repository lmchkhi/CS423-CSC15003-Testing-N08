---
name: prompt-log-eshop
description: Dùng khi cần ghi nhật ký prompt/output AI cho HW02 EShop vào reports/prompt_log.md để sau này tổng hợp AI Audit Report bắt buộc, bao gồm tool, ngày giờ, mục tiêu, prompt, output, file thay đổi và nhận xét human review.
---

# Prompt Log cho AI Audit Report HW02

## Mục tiêu

Dùng skill này sau mỗi lần dùng AI để làm bài HW02 EShop. Mục tiêu là ghi log đủ dữ liệu để cuối bài viết `reports/ai-audit-report.md` mà không phải lục lại lịch sử chat.

File log mặc định:

```text
reports/prompt_log.md
```

## Khi nào phải ghi log

- Khi dùng AI để phân tích requirement hoặc SRS.
- Khi dùng AI để phân tích API specification.
- Khi dùng AI tạo/sửa Domain Testing test cases.
- Khi dùng AI tạo/sửa Boundary Value Analysis test cases.
- Khi dùng AI viết AI gap analysis, bug report, main report, README, commit log, hoặc script hỗ trợ.
- Khi dùng AI kiểm tra lỗi, review test case, hoặc đề xuất bug.

## Quy trình ghi log

1. Nếu `reports/prompt_log.md` chưa tồn tại, tạo file với tiêu đề `# Prompt Log`.
2. Thêm một entry mới ở cuối file cho mỗi tương tác AI quan trọng.
3. Ghi đúng ngày và giờ Việt Nam theo timezone `Asia/Ho_Chi_Minh` với format `YYYY-MM-DD HH:mm +07` nếu có thể lấy được; nếu không, ghi ngày/giờ ước lượng và đánh dấu `Approximate`.
4. Không ghi API key, password thật, token thật, OTP thật còn hiệu lực, cookie/session, hoặc dữ liệu nhạy cảm.
5. Output có thể tóm tắt nếu quá dài, nhưng phải đủ để chứng minh AI đã làm gì và sinh ra kết quả nào.
6. Luôn có phần `Human review` để ghi người làm đã kiểm tra/sửa gì, vì bài yêu cầu không nộp raw AI output.

## Template entry

```markdown
## YYYY-MM-DD HH:mm +07 - <Tên tác vụ ngắn>

| Field | Value |
| --- | --- |
| AI tool | Codex / ChatGPT / Claude / Gemini / Copilot / Cursor / Khác |
| Feature | FR-03 / FR-11 / FR-14 / FR-23 / General |
| Technique | Domain Testing / BVA / Bug Reporting / Report Writing / Skill Creation / Other |
| Goal | <Mục tiêu của tương tác AI> |
| Files changed | <Danh sách file hoặc None> |

### Prompt

```text
<Prompt đã gửi cho AI>
```

### AI output

```text
<Tóm tắt output hoặc phần output quan trọng>
```

### Human review

- <Bạn đã kiểm tra/sửa/chấp nhận/bác bỏ phần nào>
- <Nếu AI sai hoặc thiếu, ghi rõ để dùng cho AI gap analysis/AI critique>
```

## Tiêu chuẩn chất lượng

- Log phải đủ 4 thông tin bắt buộc trong đề: tên AI tool, ngày giờ, prompt, AI output.
- Entry nên ngắn nhưng không mơ hồ; người chấm phải hiểu AI đã được dùng vào bước nào.
- Nếu AI tạo test case, ghi rõ test case nào được sinh ra hoặc sửa.
- Nếu AI bỏ sót/sai, ghi lại ngay trong `Human review` để sau này tổng hợp AI gap analysis và AI critique.
- Không thay thế AI Audit Report bằng prompt log; prompt log là nguồn thô để viết appendix cuối cùng.
