# AI Audit Report — HW03 GUI & Usability Testing

Tài liệu này ghi lại đầy đủ prompt và AI output tương ứng từ ba cuộc hội thoại Codex được tham chiếu. Mỗi prompt của người dùng được ghi thành một entry riêng theo đúng thứ tự thời gian trong từng cuộc hội thoại.

## Entry #1

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 12:57:42

**Full prompt:**

```
Dùng skill eshop-gui-usability-audit để soạn usability test plan cho flow được giao: thêm sản phẩm vào giỏ → xem lại giỏ → xóa/cập nhật sản phẩm → vào checkout → áp dụng mã coupon hợp lệ/không hợp lệ → xác nhận thanh toán.

Yêu cầu:

Xác định 3–4 mục tiêu đánh giá cụ thể (ví dụ: người dùng có hiểu rõ tổng tiền/phản hồi coupon không, họ có tự tin khi hoàn tất thanh toán không, họ phản ứng thế nào khi coupon hoạt động không như mong đợi, họ có tự tìm được mã coupon để thử hay không mà không cần được cho biết trước).
Kịch bản (scenario) cho participant phải mang tính mục tiêu (goal-oriented) tuyệt đối: chỉ mô tả cần đạt được gì, không nói cụ thể bấm nút/menu/trường nào, và **không tiết lộ mã coupon cụ thể trước** — chỉ được cung cấp mã nếu participant chủ động hỏi trong lúc test, và việc này phải được ghi lại như một can thiệp của facilitator (Intervention), không đưa sẵn vào kịch bản.
Dùng đúng format bảng trong references/templates.md cho: Usability test plan, Participant table (chỉ khung rỗng), Observation notes (chỉ khung rỗng), SUS result summary (chỉ khung rỗng).
Xác nhận dùng SUS (10 câu, thang 1–5) là công cụ đo lường duy nhất — không trộn với UEQ-S.
Bước này chỉ tạo kế hoạch và khung bảng rỗng. Không tự điền bất kỳ dữ liệu participant mẫu/ví dụ nào vào Participant table hay Observation notes — dữ liệu participant thật sẽ do tôi tự nhập sau các phiên test thật, không do AI tạo ra.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit`, đọc đầy đủ hướng dẫn và đúng template tham chiếu trước khi soạn. Mình sẽ chỉ tạo kế hoạch cùng các khung bảng rỗng, dùng duy nhất SUS và giữ mã coupon hoàn toàn ngoài kịch bản participant.

Template đã được kiểm tra. Có một điểm cần điều chỉnh có chủ đích: template gộp “SUS / UEQ-S”, nhưng yêu cầu của bạn là chỉ dùng SUS, nên mình sẽ giữ cấu trúc bảng tương ứng và loại toàn bộ cột UEQ-S; các bảng participant và observation sẽ không có bất kỳ dòng dữ liệu nào.

Bản nháp đã có đủ bốn mục tiêu, quy tắc can thiệp và khung SUS. Mình đang rà lại lần cuối theo hai ràng buộc dễ bị vi phạm nhất: kịch bản không được biến thành hướng dẫn thao tác, và mọi bảng dữ liệu phải thực sự trống.

Đã tạo [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md).

Nội dung gồm:

- 4 mục tiêu đánh giá cụ thể.
- Scenario hoàn toàn goal-oriented, không hướng dẫn thao tác hay tiết lộ coupon.
- Quy tắc chỉ cung cấp coupon khi participant chủ động hỏi và ghi `[Intervention]`.
- Chỉ sử dụng SUS: 10 câu, thang 1–5; không dùng UEQ-S.
- Participant table, Observation notes và SUS result summary đều là khung rỗng.
- Không tạo dữ liệu participant mẫu.
- Có prerequisite và tiêu chí xử lý task bị blocked.

Commit message đề xuất: `test(hw03): add cart checkout usability test plan`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 12:57:42 +07:00
- User Prompt: Soạn usability test plan cho flow cart, checkout, coupon và thanh toán bằng SUS.
- AI Action: Tạo kế hoạch goal-oriented, quy trình facilitator và các khung bảng dữ liệu rỗng theo template.
```
