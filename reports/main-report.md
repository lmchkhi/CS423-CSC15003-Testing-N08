# HW03 — GUI & Usability Testing — Báo cáo chính

**Sinh viên**: Hà Bảo Ngọc, MSSV 23127300, CS423/CSC15003, nhóm N08
**SUT**: EShop (`github.com/ttbhanh/eshop-sut`), chạy tại
`http://localhost:5173/`, build đã kiểm thử `85af3ba`.
**Hình thức**: bài tập cá nhân theo §1. Cả 3 task dưới đây là phạm vi của
riêng tôi, không phải một phần của bài nộp nhóm; repo dùng chung với N08 chỉ
để tránh trùng màn hình và luồng chính với đồng đội theo §5.

Tài liệu này tổng hợp quy trình và kết quả của cả 3 task theo đúng cấu trúc §6
của đề bài. Chi tiết đầy đủ nằm ở các file được trỏ tới trong mỗi mục.

---

## Phạm vi đã chọn (§5)

- **GUI checklist (Task 1)**: 4 màn hình, gồm Trang chủ (đã bao gồm lưới sản
  phẩm), Kết quả tìm kiếm, Trạng thái tìm kiếm rỗng, và Chi tiết sản phẩm.
  Chọn nhiều màn hình vì §5 lưu ý một màn hình khó đạt 40 item có ý nghĩa. Cả
  4 màn vẫn là trách nhiệm của riêng tôi, không chia với thành viên khác.
- **Luồng usability (Task 2)**: Duyệt sản phẩm → tìm theo từ khóa → mở chi tiết
  → chọn số lượng → thêm vào giỏ hàng.

---

## Task 1 — GUI Checklist

### Quy trình

1. Đọc `sut-requirements.md`, bản trích FR-05, FR-06, FR-21 đến FR-24 từ
   README của SUT, làm ground truth trước khi sinh checklist. Không tự đặt ra
   yêu cầu không có trong spec.
2. Với mỗi màn hình, gửi AI 4 prompt riêng biệt theo IA01 đến IA04, đúng tinh
   thần "guide the AI through every step" của §2 thay vì một prompt chung. Toàn
   bộ 29 lượt tương tác nằm trong `reports/ai-audit-report.md` và
   `reports/prompt-log.md`.
3. Phản biện kết quả AI và bổ sung 12 item do tôi tự thêm
   (`ai-gap-analysis/gui-checklist-gaps.md`), mỗi item kèm lý do AI bỏ sót. Ba
   nhóm nguyên nhân lặp lại:
   - **Phạm vi prompt tôi viết thiếu** (7/12 item). Rõ nhất là mục "dark mode
     contrast" bị quên ở prompt IA01 của **cả 4 màn hình** (GUI-042, 084, 099,
     110). Đây là pattern trong cách tôi soạn prompt, không phải chuyện AI
     không biết dark mode là gì.
   - **Đặc thù giao diện tiếng Việt** (3/12 item): dấu tiếng Việt khi hiển thị
     và khi tìm kiếm (GUI-045, 085, 109). AI được huấn luyện chủ yếu trên các
     SUT tiếng Anh nên không tự nghĩ tới rủi ro encoding cho input có dấu.
   - **Giới hạn mô hình** (2/12 item): không tự đối chiếu ngược giữa 2 màn hình
     để phát hiện thiếu sót ngầm (GUI-086), và không tự suy ra kịch bản hết
     phiên đăng nhập khi FR không mô tả rõ (GUI-044).
4. Thực thi toàn bộ **110/110 item** trực tiếp trên SUT đang chạy bằng thao
   tác thật: click, gõ, resize, đọc DevTools
   Network/DOM/console, gọi thẳng API để đối chiếu. Đánh dấu Passed, Failed
   hoặc N/A; cột Notes ghi rõ lý do cho mọi item Failed; screenshot chỉ đính
   kèm cho item Failed đúng theo §6.

### Kết quả

| Khía cạnh IA | Thiết kế | Thực thi | Passed | Failed | N/A |
|---|---|---|---|---|---|
| IA01 — Giao diện chung | 34 | 34 | 24 | 10 | 0 |
| IA02 — Form | 27 | 27 | 12 | 14 | 1 |
| IA03 — Điều hướng | 24 | 24 | 8 | 14 | 2 |
| IA04 — Phản hồi và trạng thái | 25 | 25 | 4 | 20 | 1 |
| **Tổng** | **110** | **110** | **48** | **58** | **4** |

Chi tiết từng item: `checklist/gui-checklist.md` (bản đầy đủ có Notes,
Screenshot, Bug ID) và `checklist/gui-checklist.xlsx` (bản Excel theo §14).

### Bug phát hiện được (24 bug)

Nặng nhất:

- **BUG-IA02-HOMEPAGE-003**: SQL Injection thật trong API tìm kiếm sản phẩm.
  Backend không dùng parameterized query, xác nhận qua HTTP 500 `SQLITE_ERROR`
  và qua bypass boolean-based với payload `' OR '1'='1' -- `.
- **BUG-IA02-HOMEPAGE-002**: Reflected XSS qua từ khóa tìm kiếm, payload
  `<img src=x onerror=...>` thực thi được.
- **BUG-IA04-PRODUCTDETAIL-001**: nút "Thêm vào giỏ hàng" cần bấm 2 lần, lần
  đầu bị bỏ qua im lặng, không có toast hay badge, số lượng không cộng dồn, và
  giỏ hàng mất khi tải lại trang. Đây cũng là bug được xác nhận độc lập bởi dữ
  liệu Task 2: 5 trên 7 người dùng thật gặp đúng hành vi này.
- **BUG-IA04-EMPTYSEARCH-001**: trạng thái 0 kết quả tìm kiếm hoàn toàn trống,
  không icon, không thông điệp, không lối thoát, vi phạm FR-05 và FR-24.

Toàn bộ 24 bug đã file cả ở `bug-reports/*.md` lẫn GitHub Issues (issue #94
đến #112 trừ #99, #190 đến #194, và #196).

---

## Task 2 — Usability Evaluation

### Quy trình

**Phase 1, lập kế hoạch** (`usability/plan.md`): xác định mục tiêu, cụ thể là
kiểm chứng bằng người dùng thật xem lỗi thiếu phản hồi khi thêm vào giỏ hàng
phát hiện ở Task 1 có gây bối rối ở quy mô lớn hơn hay không. Viết task
scenario cho 7 biến thể từ khóa (`usability/task-scenarios.md`), chọn thang đo
SUS 10 câu chuẩn theo Brooke (1996) kèm 4 câu probe bắt buộc phủ clarity,
error recovery, speed và trust.

Tôi có chạy 1 buổi pilot thật với người ngoài danh sách 7 người chính thức
trước khi vào các buổi thật. Buổi pilot không ghi âm nên không có transcript
kèm theo, nhưng phát hiện chính của nó (nút "Thêm vào giỏ hàng" thiếu phản hồi)
trùng với phát hiện lớn nhất ở 5 trên 7 buổi chính thức sau đó. Ngoài pilot,
kịch bản còn qua 2 vòng tự rà soát và bắt được 2 lỗi thiết kế cụ thể trước khi
chạy thật.

**Phase 2, chạy các buổi test**: 7 buổi thật, mỗi người một kịch bản biến thể
(khác từ khóa và số lượng, cùng cấu trúc). Khi chạy thật, thứ tự biến thể được
giao lệch so với bản kế hoạch và người #1 với #3 nhận trùng một biến thể, nên
7 buổi phủ 6 biến thể phân biệt; bảng đối chiếu kế hoạch với thực tế nằm ở
`usability/task-scenarios.md`. Mỗi buổi có ghi âm và ghi chú quan sát theo
mốc thời gian, đóng buổi bằng form SUS và 4 câu probe. 7 transcript thật nằm ở
`usability/transcript/*.tsv`; 7 file tổng hợp từng buổi (quan sát, SUS từng
câu, probe) ở `usability/sessions/session-01.md` đến `session-07.md`. Link bản
ghi hình của cả 7 buổi nằm ở `usability/participants.md` và ở đầu từng file
`session-0N.md`.

**Phase 3, phân tích** (`usability/analysis.md`): tính SUS theo công thức chuẩn
cho từng người, tách vấn đề hệ thống khỏi lỗi đơn lẻ, xếp severity, và
cross-link vào bug đã có ở Task 1 thay vì file trùng.

### Người tham gia

7 người thật, đều ngoài lớp học phần này. Danh sách đầy đủ kèm liên hệ đã che 4
số giữa: `usability/participants.md`. Nguồn dữ liệu là 7 phản hồi Google Form
SUS thật (CSV đính kèm trong `usability/`), đối chiếu chéo với nội dung 7 bản
ghi âm để xác nhận đúng người.

### Kết quả SUS

| Chỉ số | Giá trị |
|---|---|
| Số người tham gia | 7 |
| SUS trung bình | **53.2 / 100** |
| Thấp nhất / cao nhất | 15 / 87.5 |
| Độ lệch chuẩn (tổng thể) | ≈ 27.8 |
| Kết quả task | 4 hoàn thành (có do dự) / 2 một phần / **1 thất bại hoàn toàn** |

**Phát hiện quan trọng nhất của Task 2**: điểm SUS không đi cùng kết quả task.
Người #7 có SUS 82.5, cao thứ nhì trong 7 người, nhưng đây lại là buổi thất bại
hoàn toàn: thử đủ 3 lần trọn chu trình mà giỏ hàng vẫn trống ở lần kiểm tra
cuối. Nếu chỉ nhìn con số trung bình, mức nghiêm trọng thật sự của lỗi thêm vào
giỏ hàng sẽ bị đánh giá thấp. Chi tiết ở `usability/analysis.md`.

### Findings xếp theo mức độ nghiêm trọng

| Mức độ | Phát hiện | Bằng chứng |
|---|---|---|
| **Blocker** | Thêm vào giỏ hàng thất bại hoàn toàn sau 3 lần thử, task không hoàn thành | `session-07.md`, cùng root cause với `BUG-IA04-PRODUCTDETAIL-001` |
| **Major** | Không có phản hồi trực quan sau khi bấm "Thêm vào giỏ hàng". 5 trên 7 người gặp, dẫn tới bối rối hoặc thêm dư sản phẩm | `session-01/02/03/04.md` |
| **Minor** | Mất dấu sản phẩm mục tiêu khi đi qua nhiều trang, thêm nhầm sản phẩm | `session-06.md` (1/7, giả thuyết liên hệ `BUG-IA03-HOMEPAGE-002`) |
| **Minor** | Ô chọn số lượng không đủ nổi bật | `session-05.md` (1/7) |

7 buổi test không làm lộ ra defect nào nằm ngoài phạm vi đã ghi nhận ở Task 1.
Mọi điểm vướng đều quy về 2 bug đã file, và tôi đã cross-link trực tiếp vào
`bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`.

---

## Task 3 — Cross-Browser / Cross-Platform

Thực hiện trên **bản deploy thật**, khác với dev server localhost dùng ở Task 1
và Task 2: frontend `https://frontend-web-eight-mu.vercel.app/` (Vercel),
backend `https://eshop-backend-demo2.onrender.com` (Render). Lý do chọn bản
deploy thật thay vì localhost được giải thích trong `cross-platform/report.md`.

3 platform, mỗi screenshot có overlay `23127300@student.hcmus.edu.vn` và họ tên theo §6
và §11:

1. **Chrome (desktop, macOS)**
2. **Firefox 153 / Windows 11**, qua BrowserStack Live
3. **Chrome / Android 14 (Google Pixel 8, thiết bị thật)**, qua BrowserStack
   Live real device, thay thế Safari theo §6

Thay vì chạy lại toàn bộ 110 item trên cả 3 platform, tôi chọn **16 item** thực
sự phụ thuộc vào engine render, hệ điều hành hoặc loại thiết bị, kèm lập luận
vì sao 94 item còn lại là platform-invariant (hành vi backend, cấu trúc DOM,
tính năng không tồn tại, logic nghiệp vụ). Chạy lại những item đó trên 3
platform chỉ đo lại backend 3 lần chứ không đo được gì về platform. Danh sách
tập con và lý do: `cross-platform/subset-rationale.md`; bảng kết quả từng item
trên từng platform: `cross-platform/report.md`.

**Kết quả**: 26 ô cho kết quả Passed/Failed ở lượt này (Chrome 8, Firefox 11,
Android 7), cộng 2 ô đánh dấu không kiểm thử được vì giới hạn công cụ. Độ phủ
IA không đều giữa 3 platform: chỉ Firefox chạm được cả 4 khía cạnh ở chính lượt
chạy này, Chrome và Android mỗi bên chạm 3, bảng chi tiết ở
`cross-platform/report.md`. Không phát hiện lỗi hiển thị hay CSS riêng theo
platform; layout
responsive nhất quán (3 cột desktop, 1 cột điện thoại). Mọi bug hành vi từ Task
1 đều tái hiện y hệt, gồm `BUG-IA04-PRODUCTDETAIL-001` (bấm đúng 1 lần trên
Firefox thì giỏ hàng vẫn trống), `BUG-IA03-HOMEPAGE-002` (Back làm mất từ khóa)
và `BUG-IA04-EMPTYSEARCH-001` (trạng thái 0 kết quả trống trơn).

Phát hiện riêng của Task 3 là **BUG-XPLAT-DEEPLINK-001**: truy cập trực tiếp
hoặc reload URL `/product/:id` trả về 404 của Vercel do thiếu cấu hình SPA
fallback rewrite. Xác nhận trên **cả 3 platform**, tức 3 engine và 3 hệ điều
hành khác nhau, nên đây chắc chắn là lỗi cấu hình hosting chứ không phải vấn đề
tương thích trình duyệt. Đây là loại lỗi chỉ Task 3 mới phát hiện được, không
thể thấy nếu chỉ dừng ở dev server localhost.

Khác biệt trình duyệt thật sự duy nhất tìm được: Firefox vẽ nút tăng/giảm mặc
định trên ô `type="number"` của trường Số lượng, Chrome thì không. Vô hại,
không phải defect.

**Giới hạn cần ghi nhận**: 2 ô trong bảng, cùng thuộc một item, không kiểm thử
được vì bàn phím điều khiển từ xa của BrowserStack làm hỏng ký tự nhập vào
(`bàn phím` tới nơi thành
`bn phm`; URL bị rớt ký tự và sai dấu). Chỉ việc gõ từ khóa có dấu ghi là không
kiểm thử.

Hai item di động (bàn phím số, kích thước vùng chạm) ban đầu cũng xếp vào nhóm
này, sau đó kiểm lại được qua DOM và CSS của bản deploy: ô Số lượng đúng là
`type="number"` (Pass); chiều cao nút 36px cố định, không đạt 44px trên mọi
thiết bị (Fail). Chi tiết ở `cross-platform/report.md`.

---

## Tổng hợp bug (cả 3 task)

**Tổng 25 bug**: 24 từ GUI checklist ở Task 1 và 1 từ Cross-Platform ở Task 3.
Task 2 không phát sinh bug mới, chỉ cross-link 2 bug đã có. Phân bố mức độ: 5
Critical, 7 Major, 13 Minor. Đầy đủ trong `bug-reports/*.md`, mỗi bug có một
GitHub Issue tương ứng tại
`github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues`.

---

## AI Audit & Critique

- AI Audit Report đầy đủ (29 entry, template §9): `reports/ai-audit-report.md`
- Prompt log thô, không lọc: `reports/prompt-log.md`
- AI Critique (200–300 từ, §10): `reports/ai-critique.md`

## Git Commit Log (§12)

Mỗi bước của quy trình (thiết kế checklist, thực thi, file bug, từng buổi
usability, phân tích) là một commit riêng. Export đầy đủ tại `git-log.txt` ở
gốc repo.
