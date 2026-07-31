# HW03 — GUI & Usability Testing — Main Report

**Sinh viên**: Hà Bảo Ngọc — MSSV 23127300 — CS423/CSC15003, nhóm N08
**SUT**: EShop (`github.com/ttbhanh/eshop-sut`), chạy tại `http://localhost:5173/`,
build/commit đã kiểm thử: `85af3ba`.
**Hình thức**: bài tập cá nhân (§1) — 3 task dưới đây là toàn bộ phạm vi của
riêng tôi, không phải 1 phần của bài nộp nhóm; repo dùng chung với N08 chỉ
để tránh trùng màn hình/luồng chính với đồng đội (§5).

Tài liệu này tổng hợp quy trình và kết quả của cả 3 task theo đúng cấu trúc
§6 của đề bài. Chi tiết đầy đủ từng phần nằm ở các file được trỏ tới trong
mỗi mục — báo cáo này là bản tóm tắt có liên kết, không lặp lại toàn bộ nội
dung.

---

## Phạm vi đã chọn (§5)

- **GUI checklist (Task 1)**: 4 màn hình — Home Page (gồm product grid),
  Search Results, Empty Search State, Product Detail. Chọn nhiều màn hình vì
  đề (§5) lưu ý 1 màn hình khó đạt 40+ item có ý nghĩa; toàn bộ 4 màn vẫn là
  trách nhiệm của riêng tôi, không chia với thành viên khác.
- **Usability flow (Task 2)**: Browse products → search by keyword → open
  product detail → choose quantity → add product to cart.

---

## Task 1 — GUI Checklist

### Quy trình

1. Đọc `sut-requirements.md` (trích FR-05/FR-06/FR-21–24 từ README SUT thật)
   làm ground truth trước khi sinh checklist — không tự bịa yêu cầu.
2. Với mỗi màn hình, gửi AI (Claude) 4 prompt riêng biệt theo IA01–IA04 (xem
   toàn bộ 23 lượt tương tác trong `reports/ai-audit-report.md` và
   `reports/prompt-log.md`), theo đúng tinh thần "guide the AI through every
   step" của §2 — không dùng 1 prompt chung chung.
3. **Phê bình phản biện kết quả AI** và bổ sung 12 item do người kiểm thử tự
   thêm (`ai-gap-analysis/gui-checklist-gaps.md`), mỗi item kèm lý do AI bỏ
   sót, quy về 3 nhóm nguyên nhân lặp lại có hệ thống:
   - **Lỗi phạm vi prompt** (7/12 item) — chủ yếu là "dark mode contrast" bị
     quên liệt kê trong prompt IA01 ở **cả 4 màn hình** (GUI-042, 084, 099,
     110) — một pattern lặp lại do người viết prompt quên, không phải AI
     "không biết" khái niệm dark mode.
   - **Đặc thù giao diện tiếng Việt** (3/12 item) — dấu tiếng Việt trong
     hiển thị/tìm kiếm (GUI-045, 085, 109) — AI được huấn luyện chủ yếu trên
     SUT tiếng Anh nên không tự nghĩ ra rủi ro encoding riêng cho input có
     dấu.
   - **Giới hạn mô hình** (2/12 item) — không tự đối chiếu ngược giữa 2 màn
     hình để phát hiện thiếu sót ngầm (GUI-086), không tự suy luận ra kịch
     bản hết phiên đăng nhập khi FR không mô tả rõ (GUI-044).
4. Thực thi toàn bộ **110/110 item** trực tiếp trên SUT đang chạy qua Claude
   for Chrome — thao tác thật (click, gõ, resize, DevTools Network/DOM/
   console, gọi thẳng API để đối chiếu ground truth), không suy đoán. Đánh
   dấu Passed/Failed/N/A, cột Notes ghi rõ lý do Fail cho mọi item Failed,
   screenshot chỉ đính kèm cho item Failed (đúng yêu cầu §6).

### Kết quả

| IA aspect | Designed | Executed | Passed | Failed | N/A |
|---|---|---|---|---|---|
| IA01 — General UI | 34 | 34 | 24 | 10 | 0 |
| IA02 — Forms | 27 | 27 | 12 | 14 | 1 |
| IA03 — Navigation | 24 | 24 | 7 | 15 | 2 |
| IA04 — Feedback/state | 25 | 25 | 4 | 20 | 1 |
| **Total** | **110** | **110** | **47** | **59** | **4** |

Chi tiết đầy đủ từng item: `checklist/gui-checklist.md` (bản đầy đủ có
Notes/Screenshot/Bug ID) và `checklist/gui-checklist.xlsx` (bản Excel theo
§14).

### Bug đã phát hiện (24 bug, xem Bug Summary §5 bên dưới)

Nghiêm trọng nhất:
- **BUG-IA02-HOMEPAGE-003** — SQL Injection thật trong API tìm kiếm sản phẩm
  (backend không dùng parameterized query, xác nhận qua HTTP 500
  `SQLITE_ERROR` và bypass boolean-based `' OR '1'='1' -- `).
- **BUG-IA02-HOMEPAGE-002** — Reflected XSS qua từ khóa tìm kiếm (payload
  `<img src=x onerror=...>` thực thi được).
- **BUG-IA04-PRODUCTDETAIL-001** — nút "Thêm vào giỏ hàng" cần bấm 2 lần
  (lần đầu im lặng bỏ qua), không toast/badge, không cộng dồn số lượng, mất
  giỏ hàng khi tải lại trang. **Đây cũng là bug được xác nhận độc lập bởi dữ
  liệu Task 2** (xem bên dưới) — 5/7 người dùng thật gặp đúng hành vi này.
- **BUG-IA04-EMPTYSEARCH-001** — trạng thái 0 kết quả tìm kiếm hoàn toàn
  trống trơn, không icon/message/lối thoát, vi phạm FR-05/FR-24.

Toàn bộ 24 bug đã file cả ở `bug-reports/*.md` lẫn GitHub Issues (issue
#94–#112, #190–#194).

---

## Task 2 — Usability Evaluation

### Quy trình

**Phase 1 — Plan & prepare** (`usability/plan.md`): xác định mục tiêu (kiểm
chứng bằng người dùng thật xem lỗi "thiếu phản hồi thêm-vào-giỏ-hàng" đã
phát hiện ở Task 1 có gây bối rối ở quy mô lớn hơn không), viết task
scenario cho 7 biến thể từ khóa (`usability/task-scenarios.md`), chọn thang
đo SUS (10 câu chuẩn, xem `.claude/skills/usability-evaluation/references/
sus-scale.md`) + 4 câu probe bắt buộc (clarity/error recovery/speed/trust).
Có chạy 1 buổi pilot thật với người ngoài 7 người chính thức trước khi vào
7 buổi thật — không ghi hình/ghi âm nên không có transcript đính kèm, nhưng
phát hiện chính của pilot (nút "Thêm vào giỏ hàng" thiếu phản hồi/xác nhận)
trùng khớp với phát hiện lớn nhất sau này ở 5/7 buổi chính thức, củng cố độ
tin cậy của phát hiện này qua 2 đợt thu thập độc lập. Ngoài ra 2 vòng tự rà
soát kịch bản (tách biệt với pilot) bắt thêm 2 lỗi thiết kế cụ thể trước
khi chạy thật (chi tiết + khuyến nghị cho lần sau: `usability/plan.md`
§Pilot session).

**Phase 2 — Conduct sessions**: 7 buổi test thật, mỗi người 1 kịch bản biến
thể (từ khóa + số lượng khác nhau, cùng cấu trúc), ghi âm + ghi chú quan
sát trực tiếp theo mốc thời gian, đóng bằng form SUS + 4 câu probe. Toàn bộ
7 transcript thật: `usability/transcript/*.tsv`; 7 session file tổng hợp
(quan sát + SUS từng câu + probe): `usability/sessions/session-01.md`
… `session-07.md`.

**Phase 3 — Analyse & report** (`usability/analysis.md`): tính SUS theo
công thức chuẩn cho từng người, tổng hợp systemic vs. isolated issues, xếp
severity, cross-link bug đã có ở Task 1 thay vì file trùng.

### Người tham gia

7 người thật, ngoài lớp học phần này, danh sách đầy đủ + liên hệ đã mask 4
số giữa: `usability/participants.md`. Nguồn dữ liệu: 7 phản hồi Google Form
SUS thật (CSV đính kèm trong `usability/`) đối chiếu chéo với nội dung 7
transcript ghi âm thật để xác nhận đúng người.

### Kết quả SUS

| Metric | Value |
|---|---|
| Số người tham gia | 7 |
| SUS trung bình | **53.2 / 100** |
| Min / Max | 15 / 87.5 |
| Độ lệch chuẩn (population) | ≈ 27.8 |
| Task success | 4 Yes (có hesitation) / 2 Partial / **1 No (thất bại hoàn toàn)** |

**Phát hiện quan trọng nhất của Task 2**: SUS **không tương quan** với việc
task có thành công hay không — participant #7 có SUS = 82.5 (cao thứ 3)
nhưng đây lại là buổi **thất bại hoàn toàn** (3 lần thử đầy đủ chu trình,
giỏ hàng vẫn trống ở lần kiểm tra cuối). Nếu chỉ nhìn con số trung bình,
mức độ nghiêm trọng thật sự của lỗi "Thêm vào giỏ hàng" sẽ bị đánh giá
thấp — chi tiết đầy đủ: `usability/analysis.md`.

### Severity-ranked findings

| Severity | Finding | Bằng chứng |
|---|---|---|
| **Blocker** | Thêm vào giỏ hàng thất bại hoàn toàn sau 3 lần thử — task không hoàn thành | `session-07.md`, cùng root cause `BUG-IA04-PRODUCTDETAIL-001` |
| **Major** | Không có phản hồi trực quan (toast/badge) sau khi bấm "Thêm vào giỏ hàng" — 5/7 người gặp, dẫn tới bối rối hoặc thêm dư sản phẩm | `session-01/02/03/04.md` |
| **Minor** | Mất dấu sản phẩm mục tiêu khi điều hướng nhiều trang, thêm nhầm sản phẩm | `session-06.md` (1/7, giả thuyết liên hệ `BUG-IA03-HOMEPAGE-002`) |
| **Minor** | Ô/nút chọn số lượng không đủ nổi bật | `session-05.md` (1/7) |

Không phát hiện defect nào hoàn toàn mới ngoài phạm vi đã ghi nhận ở Task 1
— toàn bộ friction từ 7 buổi test thật đều quy về (hoặc gợi ý liên hệ hợp
lý tới) 2 bug đã file, đã cross-link trực tiếp vào
`bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`.

---

## Task 3 — Cross-Browser / Cross-Platform

**Trạng thái: chưa thực hiện — đang chờ tài khoản trial BrowserStack/
LambdaTest.** Kế hoạch: chạy lại một tập đại diện của checklist Task 1 trên
≥3 platform (Chrome, Firefox, Safari hoặc Android Chrome), mỗi screenshot
overlay username `23127300@hcmus.edu.vn` theo đúng §6/§11. Sẽ cập nhật mục
này và `cross-platform/report.md` ngay khi có quyền truy cập.

---

## Bug Summary (tổng hợp Task 1 + Task 2)

**Tổng số bug: 24** — tất cả từ Task 1 GUI checklist (Task 2 không phát
sinh bug mới, chỉ cross-link 2 bug đã có, xem trên). Phân bố severity:
5 Critical/P0–P1, 6 Major, 13 Minor. Đầy đủ trong `bug-reports/*.md`, mỗi
bug có GitHub Issue tương ứng (issue #94–#112, #190–#194 tại
`github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues`).

---

## AI Audit & Critique

- AI Audit Report đầy đủ (24 entry, template §9): `reports/ai-audit-report.md`
- Prompt log thô, không lọc: `reports/prompt-log.md`
- AI Critique (200–300 từ, §10): `reports/ai-critique.md`

## Git Commit Log (§12)

Mỗi bước của quy trình (thiết kế checklist, thực thi, file bug, từng buổi
usability, phân tích...) là 1 commit riêng — export đầy đủ tại `git-log.txt`
(gốc repo).
