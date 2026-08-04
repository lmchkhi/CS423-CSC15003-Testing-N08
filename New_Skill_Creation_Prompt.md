# Prompt tạo mới Agent Skill — AI-First Playwright Testing (HW04, dựa trên baseline HW02)

## PROMPT

Hãy tạo cho tôi một Agent Skill hoàn chỉnh, tên `ai-first-playwright-testing`, dùng để thực hiện bài tập HW04 – Automation Testing. Tạo toàn bộ cấu trúc thư mục và nội dung file từ đầu, không tham chiếu đến bất kỳ bản skill nào trước đó.

### Bối cảnh bắt buộc phải hiểu trước khi viết skill

- **SUT:** EShop — ứng dụng thương mại điện tử demo (Node.js/Express + React), có 3 tầng: Frontend Web, Web Admin, Backend API. (source: `src/eshop-sut`)
- **Chuỗi bài tập:** Ở **HW02**, sinh viên đã tự thiết kế bộ test case thủ công (positive/negative/edge) cho 3 tính năng — một tính năng mỗi Pool A (FR-05) , Pool B (FR-08) và Pool C (FR-12) không thực hiện trên Pool D (FR-09) . Ở **HW04**, nhiệm vụ là **chuyển đổi (convert)** chính bộ test case đó thành script automation bằng AI, có review, KHÔNG phải để AI tự khám phá SUT rồi tự nghĩ ra bộ test case hoàn toàn mới.
- Chỉ khi sinh viên **không có HW02**, họ mới được tự khai báo lý do và cho phép skill tự thiết kế test case mới từ đầu (đây là nhánh ngoại lệ, không phải hành vi mặc định).
- Toàn bộ quy trình phải tuân thủ nguyên tắc **AI-first có con người duyệt ở từng checkpoint** — agent không được tự ý làm hết mọi giai đoạn trong một lượt, không được vượt qua giai đoạn khi chưa có xác nhận rõ ràng của người dùng (ví dụ "approved, continue").
- Toàn bộ quá trình kiểm thử phải theo nguyên tắc **hộp đen (black-box)**: chỉ được đọc tài liệu setup/run/seed của SUT; tuyệt đối không đọc source code, logic validation, hay schema database để suy ra test case hoặc kết quả mong đợi — chỉ được quan sát qua UI, accessibility tree, URL và network request/response. (Đọc các file trong source như `README.md` và `api_specification.md` là hợp lệ)
- Mọi lượt tương tác giữa người dùng và agent phải được ghi log tự động vào `reports/ai-audit-report.md` theo định dạng cố định (Tool / Date / User Prompt / AI Action), với timestamp ISO 8601 thật, tạo tại thời điểm ghi log. Thay thế hoàn toàn nội dung cũ và ghi mới. Đọc mẫu theo file có sẵn và tuân thủ nghiêm ngặt định dạng.
- Agent phải tuyệt đối trung thực: không tuyên bố đã chạy khi chưa chạy, không biến lỗi test thành defect SUT, không tự tạo GitHub Issue/screenshot giả, không bịa timestamp hay lịch sử commit.

### Yêu cầu kỹ thuật cụ thể (từ đề bài HW04) mà skill phải đảm bảo

- Với mỗi tính năng: tối thiểu 12 test case (kế thừa từ HW02 + bổ sung nếu thiếu), được chuyển thành script Playwright TypeScript.
- Dữ liệu kiểm thử phải nằm ở file `.json`/`.csv` tách riêng khỏi spec — không hardcode inline.
- Tối thiểu 3 nhóm assertion khác nhau trong toàn bộ suite (DOM/visible text, state/attribute, network/response, count/aggregate, visual/snapshot).
- Chạy trên tối thiểu 3 trình duyệt (Chromium/Firefox/Edge), tổng tối thiểu 9 lượt tính năng–trình duyệt cho 3 tính năng.
- Báo cáo HTML (Playwright HTML reporter hoặc Allure) phải hiển thị `Run by: 23127464` kèm timestamp ISO 8601 thật, tạo tại thời điểm chạy — phải kiểm chứng trực tiếp trên artifact, không chỉ cấu hình rồi mặc định là đúng.
- Với mỗi thất bại thật của SUT (không phải lỗi script/môi trường): tạo bug report kèm bằng chứng, đề xuất log GitHub Issue kèm ảnh chụp màn hình.
- Ghi lại: test case không tự động hóa được và lý do; gap analysis giữa yêu cầu và kết quả kiểm chứng thực tế.
- Không được thay agent viết các phần bắt buộc do chính sinh viên phải tự làm: video demo, AI Critique cá nhân.

### Cấu trúc thư mục cần tạo

```
ai-first-playwright-testing/
├── SKILL.md
├── references/
│   └── conventions.md
└── assets/
    └── templates/
        ├── ai-audit-entry.md
        ├── test-cases.md
        ├── review-notes.md
        ├── bug-report.md
        └── readme-summary.md
```

Mọi đường dẫn được tham chiếu bên trong `SKILL.md` (ví dụ `assets/templates/test-cases.md`, `references/conventions.md`) phải khớp chính xác với vị trí file thật trong cây thư mục trên — kiểm tra lại trước khi hoàn tất.

### Nội dung bắt buộc của `SKILL.md`

Viết bằng tiếng Việt, có frontmatter YAML với `name` và `description` (description phải nêu rõ: skill dùng để chuyển đổi bộ test case đã thiết kế sẵn — mặc định lấy từ HW02 — thành automation Playwright TypeScript theo hướng hộp đen, data-driven, đa trình duyệt, có checkpoint người duyệt).

Nội dung chính chia theo các phần sau:

**1. Mục tiêu** — nêu triết lý checkpoint-first, người dùng luôn là người duyệt trong vòng lặp.

**2. Bắt đầu mỗi lượt** — quy tắc ghi `reports/ai-audit-report.md` mỗi khi nhận prompt.

**3. Thu thập đầu vào** — agent phải hỏi/xác định:

- Đường dẫn tới file test case HW02 cho tính năng đang xử lý (bắt buộc hỏi trước khi làm bất cứ điều gì khác).
- Nếu người dùng xác nhận không có HW02 cho tính năng này → yêu cầu người dùng tự khai báo lý do bằng văn bản trước khi cho phép chuyển sang nhánh "tự thiết kế mới".
- Mã và mô tả tính năng, URL SUT, mã sinh viên, tài khoản test, thư mục output.
- Quy ước đặt tên file mặc định: `data/<feature>.json`, `tests/<feature>.spec.ts`, `reports/<feature>/REVIEW_NOTES.md`, `reports/<feature>/bugs/`.

**4. Ranh giới hộp đen** — như mô tả ở phần Bối cảnh.

**5. Điều phối theo tính năng** — xử lý tuần tự từng tính năng, hoàn tất A→E cho tính năng hiện tại trước khi sang tính năng kế tiếp; sau mỗi giai đoạn: trình bày kết quả, nêu điểm chưa chắc chắn, dừng chờ duyệt.

**6. Giai đoạn A — Xác minh & đối chiếu (KHÔNG phải "khám phá tự do")**

- Đọc các test case HW02 đã cung cấp (định dạng markdown và có các file tổng hợp).
- Với từng case, tương tác trực tiếp với UI/SUT thật để xác nhận: luồng thao tác, locator khả dụng, precondition, dữ liệu mẫu còn đúng như mô tả HW02 hay không.
- Tạo ra một **bảng đối chiếu**: mỗi dòng gồm ID case HW02, mô tả gốc, kết quả quan sát thực tế, trạng thái (khớp / lệch / không xác định).
- Nếu không có HW02 (nhánh ngoại lệ đã khai báo): thực hiện khám phá tự do như một tester thật, ghi lại 5-8 gạch đầu dòng về hành vi quan sát được.
- Dừng lại chờ người dùng duyệt bảng đối chiếu (hoặc kết quả khám phá, nếu ở nhánh ngoại lệ).

**7. Giai đoạn B — Nhập liệu & bổ sung khoảng trống (KHÔNG phải "tự thiết kế mới")**

- Lấy nguyên bộ test case HW02 làm nền, giữ ID gốc.
- Cập nhật lại các case bị đánh dấu "lệch" ở Giai đoạn A, có ghi chú thay đổi.
- Chỉ bổ sung case mới khi: tổng số chưa đủ 12, hoặc Giai đoạn A phát hiện khoảng trống rõ ràng — mọi case bổ sung phải gắn nhãn nguồn `Bổ sung (lý do: ...)`, phân biệt rõ với case gốc gắn nhãn `HW02`.
- Dùng mẫu `assets/templates/test-cases.md` (có cột "Nguồn").
- Dừng lại chờ duyệt bảng test case cuối cùng trước khi viết bất kỳ code nào.

**8. Giai đoạn C — Tự động hóa data-driven**

- Toàn bộ input/expected value tách sang fixture ngoài spec, có type/interface TypeScript kiểm tra cấu trúc.
- Locator ưu tiên theo `getByRole` → `getByTestId` → `getByLabel` → `getByText`; tránh CSS/XPath giòn.
- Cấm `waitForTimeout` trừ khi có lý do bất khả kháng được ghi lại.
- Tối thiểu 3 nhóm assertion, chú thích rõ tại chỗ.
- Chạy lint/type-check/test nếu môi trường cho phép, báo đúng kết quả thật.
- Dừng lại chờ duyệt.

**9. Giai đoạn D — Đa trình duyệt và báo cáo**

- Cấu hình 3 project Chromium/Firefox/Edge trong `playwright.config.ts`.
- Cấu hình reporter hiển thị `Run by: 23127464` + timestamp ISO 8601 runtime thật, kiểm chứng trực tiếp trên artifact sinh ra.
- Thực thi và phân loại `passed/failed/skipped`, giữ trace/screenshot/video khi có.
- Dừng lại chờ duyệt.

**10. Giai đoạn E — Review và phân tích khoảng trống**

- Ghi review notes: lỗi gì (bao gồm cả lỗi lệch HW02-vs-thực tế lẫn lỗi code AI sinh), vì sao AI có thể bỏ sót, cách sửa, bằng chứng.
- Phân loại lỗi: test defect / environment issue / SUT defect trước khi viết bug report.
- Chỉ tạo bug report khi có bằng chứng tái hiện thật.
- Liệt kê case không tự động hóa được kèm lý do.
- Cập nhật `readme-summary.md` bằng số liệu thật.
- Nhắc người dùng tự làm phần bắt buộc cá nhân (video, AI Critique).
- Nhắc chiến lược commit tăng dần, không bịa lịch sử.
- Dừng lại chờ duyệt gap analysis cuối cùng.

**11. Quy tắc tính trung thực** — như mô tả ở phần Bối cảnh, viết thành danh sách rõ ràng.

**12. Tiêu chí hoàn tất** — chỉ đánh dấu hoàn tất khi có đủ: artifact đã duyệt, kết quả chạy thật, báo cáo có metadata đã kiểm chứng, review/gap analysis, danh sách case không tự động hóa, log AI liên tục.

### Nội dung bắt buộc của `references/conventions.md`

- Cấu trúc fixture tối thiểu: `id`, `title`, `type`, `preconditions`, `input`, `expected` (+ tùy chọn `tags`, `skipReason`, `expectedResponse`, `evidence`, và **`source`** — giá trị `HW02` hoặc `Bổ sung`).
- Quy tắc locator/đồng bộ: ưu tiên role/test-id/label; đồng bộ bằng `expect()`, `waitForResponse`, `waitForURL`.
- Bảng 5 nhóm assertion (DOM/visible text, state/attribute, network/response, count/aggregate, visual/snapshot) — nêu rõ tối thiểu 3 nhóm phải thực sự chạy.
- Quy tắc phân loại thất bại 3 nhóm: test defect / environment issue / SUT defect.
- Quy tắc báo cáo: timestamp runtime thật, phải mở report xác nhận `Run by` hiển thị trước khi tuyên bố đạt yêu cầu.

### Nội dung bắt buộc của các template trong `assets/templates/`

- **`ai-audit-entry.md`**: khung `### AI Audit Entry` với 4 trường Tool/Date/User Prompt/AI Action. (tham khảo mẫu ai-audit-report.md có sẵn trong folder reports)
- **`test-cases.md`**: bảng test case có cột **Nguồn** (`HW02` / `Bổ sung`), cùng phần "Điểm chưa rõ" để đánh dấu giả định cần người dùng xác nhận.
- **`review-notes.md`**: 2 bảng riêng biệt — (1) "Đối chiếu HW02 vs thực tế" (case nào lệch, lệch ở đâu, điều chỉnh ra sao), (2) "Lỗi trong code automation AI sinh" (vấn đề, vì sao AI bỏ sót, cách sửa, bằng chứng) — cùng bảng "Ca chưa tự động hóa".
- **`bug-report.md`**: đầy đủ môi trường, tiền điều kiện, bước tái hiện, expected/actual, mức độ nghiêm trọng, bằng chứng, và trường liên kết GitHub Issue. (tham khảo mẫu tại folder .github/ISSUE_TEMPLATE)
- **`readme-summary.md`**: bảng test summary theo tính năng (thiết kế/tự động hóa/đã chạy/pass/fail/skip/browser runs/defect) + bảng tự đánh giá theo 4 tiêu chí kỹ thuật chính.

### Yêu cầu về cách làm việc khi tạo skill

- Trước khi tạo file thật, tóm tắt lại outline của từng file cho tôi duyệt.
- Sau khi tạo xong, liệt kê toàn bộ cây thư mục và xác nhận mọi đường dẫn tham chiếu trong `SKILL.md` khớp với file thật đã tạo.
- Không tạo thêm file ngoài danh sách đã liệt kê trừ khi tôi yêu cầu.
