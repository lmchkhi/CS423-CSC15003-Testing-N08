# HW03 – GUI & Usability Testing

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Hình thức:** Bài tập cá nhân. Repo dùng chung với nhóm N08 chỉ để trỏ về
> cùng một SUT và tránh trùng màn hình, luồng chính với đồng đội theo §5,
> không phải bài nộp nhóm.

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | 30 |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | 40 |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | 20 |
| 4 | Agent Skills | 10 | 10 |
| | **Total** | **100** | **100/100** |

---

## 2. Test Summary Report

### 2.1. Phạm vi

- **Màn hình cho GUI checklist (Task 1)**: Trang chủ (gồm lưới sản phẩm), Kết
  quả tìm kiếm, Trạng thái tìm kiếm rỗng, Chi tiết sản phẩm. Tính là 4 màn
  hình hiệu dụng: lưới sản phẩm được gộp vào trang chủ vì cả hai là cùng một
  trang render, và các batch IA01/IA04 của trang chủ đã bao phủ bố cục thẻ, tỷ
  lệ ảnh, định dạng giá và tính responsive của lưới. Tách riêng ra thành một
  màn hình thứ năm sẽ là kiểm thử lặp lại chứ không thêm độ bao phủ.
- **Luồng cho usability (Task 2)**: Duyệt sản phẩm → tìm theo từ khóa → mở chi
  tiết → chọn số lượng → thêm vào giỏ hàng.
- **SUT**: EShop, `github.com/ttbhanh/eshop-sut`, build đã kiểm thử `85af3ba`,
  chạy tại `http://localhost:5173/`.

### 2.2. GUI Checklist (Task 1)

| Khía cạnh IA | Thiết kế | Thực thi | Passed | Failed | N/A |
|---|---|---|---|---|---|
| IA01 — Giao diện chung | 34 | 34 | 24 | 10 | 0 |
| IA02 — Form | 27 | 27 | 12 | 14 | 1 |
| IA03 — Điều hướng | 24 | 24 | 8 | 14 | 2 |
| IA04 — Phản hồi và trạng thái | 25 | 25 | 4 | 20 | 1 |
| **Tổng** | **110** | **110** | **48** | **58** | **4** |

Cả 4 màn hình đều đã thiết kế và thực thi đầy đủ trên SUT thật: Chi tiết sản
phẩm (GUI-001–046), Trang chủ (GUI-047–086), Kết quả tìm kiếm (GUI-087–099),
Trạng thái tìm kiếm rỗng (GUI-100–110). Chi tiết từng item ở
`checklist/gui-checklist.md`, bản Excel ở `checklist/gui-checklist.xlsx`.

Trong 110 item có 12 item do tôi tự thêm sau khi phản biện kết quả AI, mỗi item
kèm lý do AI bỏ sót, quy về 3 nhóm nguyên nhân
(`ai-gap-analysis/gui-checklist-gaps.md`).

Hai bug nặng nhất: `BUG-IA02-HOMEPAGE-003` (SQL Injection trong API tìm kiếm
sản phẩm) và `BUG-IA04-EMPTYSEARCH-001` (trạng thái 0 kết quả hiển thị hoàn
toàn trống, vi phạm FR-05 và FR-24).

### 2.3. Usability Evaluation (Task 2)

| Chỉ số | Giá trị |
|---|---|
| Số người tham gia | 7 người thật, ngoài lớp học phần (`usability/participants.md`) |
| SUS trung bình | **53.2 / 100** (thấp nhất 15, cao nhất 87.5, độ lệch chuẩn ≈ 27.8) |
| Kết quả task | 4 hoàn thành (có do dự) / 2 một phần / 1 thất bại hoàn toàn (người #7) |
| Findings (Blocker / Major / Minor) | 1 / 1 / 2 |
| Bug mới | 0. Cross-link 2 bug đã có từ Task 1 làm bằng chứng bổ sung (`BUG-IA04-PRODUCTDETAIL-001`, `BUG-IA03-HOMEPAGE-002`) |

Phát hiện đáng chú ý nhất: điểm SUS không đi cùng kết quả task. Người #7 có SUS
82.5, cao thứ nhì trong 7 người, nhưng lại là buổi thất bại hoàn toàn sau 3 lần
thử. Chi tiết ở `usability/plan.md`, `usability/sessions/`,
`usability/analysis.md`.

### 2.4. Cross-Platform (Task 3)

Chạy trên bản deploy thật (`frontend-web-eight-mu.vercel.app` +
`eshop-backend-demo2.onrender.com`), dùng **16 item** của Task 1 thực sự phụ
thuộc vào engine render, hệ điều hành hoặc loại thiết bị. Lý do chọn tập con và
lập luận vì sao 94 item còn lại là platform-invariant:
`cross-platform/subset-rationale.md`.

| Platform | Số ô có kết quả | Kết quả |
|---|---|---|
| Chrome 150 / macOS 26.5.2 | 8 | 4 Fail (định dạng giá, tương phản, deep link 404, thiếu phản hồi khi thêm vào giỏ) |
| Firefox 153 / Windows 11 (BrowserStack Live) | 11 | 6 Fail (cùng các lỗi Task 1, tái hiện y hệt) |
| Chrome / Android 14 (Pixel 8, BrowserStack real device) | 7 | 2 Fail (deep link 404, vùng chạm 36px < 44px) |

Không phát hiện lỗi hiển thị hay CSS riêng theo từng platform; layout responsive
nhất quán (3 cột desktop, 1 cột điện thoại). Khác biệt trình duyệt duy nhất là
nút spinner mặc định của Firefox trên ô Số lượng, vô hại.

Phát hiện riêng của Task 3: `BUG-XPLAT-DEEPLINK-001`, deep link hoặc reload vào
trang chi tiết sản phẩm trả về 404 trên bản deploy Vercel do thiếu SPA fallback
rewrite. **Xác nhận trên cả 3 platform**, nên đây là lỗi cấu hình hosting chứ
không phải vấn đề trình duyệt. Lỗi này chỉ thấy được khi test trên bản deploy
thật, không xuất hiện trên dev server dùng ở Task 1 và Task 2.

2 ô còn lại (gõ từ khóa có dấu) không kiểm thử được do bàn phím điều khiển từ
xa làm hỏng ký tự, ghi là không kiểm thử thay vì suy đoán. Trong lượt này chỉ
Firefox chạm cả 4 khía cạnh IA, Chrome và Android mỗi bên chạm 3. Chi tiết:
`cross-platform/report.md`.

### 2.5. Tổng hợp bug

| Bug ID | Nguồn | Mức độ | Trạng thái | GitHub Issue |
|---|---|---|---|---|
| BUG-IA02-HOMEPAGE-003 | Task 1 | Critical | Open | [#106](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/106) |
| BUG-IA02-HOMEPAGE-002 | Task 1 | Critical | Open | [#105](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/105) |
| BUG-IA02-PRODUCTDETAIL-001 | Task 1 | Critical | Open | [#97](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/97) |
| BUG-IA04-HOMEPAGE-003 | Task 1 | Critical | Open | [#112](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/112) |
| BUG-IA04-PRODUCTDETAIL-001 | Task 1, xác nhận thêm qua Task 2 (5/7 người) | Critical | Open | [#100](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/100) |
| BUG-IA01-HOMEPAGE-001 | Task 1 | Major | Open | [#101](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/101) |
| BUG-IA01-PRODUCTDETAIL-002 | Task 1 | Major | Open | [#95](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/95) |
| BUG-IA03-HOMEPAGE-002 | Task 1, giả thuyết liên hệ Task 2 (1/7) | Major | Open | [#108](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/108) |
| BUG-IA03-PRODUCTDETAIL-001 | Task 1 | Major | Open | [#98](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/98) |
| BUG-IA04-EMPTYSEARCH-001 | Task 1 | Major | Open | [#194](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/194) |
| BUG-IA04-SEARCHRESULTS-002 | Task 1 | Major | Open | [#193](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/193) |
| BUG-XPLAT-DEEPLINK-001 | Task 3 | Major | Open | [#197](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/197) |
| BUG-IA01-HOMEPAGE-002 | Task 1 | Minor | Open | [#102](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/102) |
| BUG-IA01-HOMEPAGE-003 | Task 1 | Minor | Open | [#103](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/103) |
| BUG-IA01-PRODUCTDETAIL-001 | Task 1 | Minor | Open | [#94](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/94) |
| BUG-IA01-PRODUCTDETAIL-003 | Task 1 | Minor | Open | [#96](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/96) |
| BUG-IA02-HOMEPAGE-001 | Task 1 | Minor | Open | [#104](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/104) |
| BUG-IA02-HOMEPAGE-004 | Task 1 | Minor | Open | [#196](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/196) |
| BUG-IA02-SEARCHRESULTS-001 | Task 1 | Minor | Open | [#190](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/190) |
| BUG-IA02-SEARCHRESULTS-002 | Task 1 | Minor | Open | [#191](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/191) |
| BUG-IA03-HOMEPAGE-001 | Task 1 | Minor | Open | [#107](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/107) |
| BUG-IA03-HOMEPAGE-003 | Task 1 | Minor | Open | [#109](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/109) |
| BUG-IA04-HOMEPAGE-001 | Task 1 | Minor | Open | [#110](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/110) |
| BUG-IA04-HOMEPAGE-002 | Task 1 | Minor | Open | [#111](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/111) |
| BUG-IA04-SEARCHRESULTS-001 | Task 1 | Minor | Open | [#192](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/192) |

**Tổng: 25 bug** (5 Critical, 7 Major, 13 Minor). 24 bug từ Task 1 và 1 bug từ
Task 3. Task 2 không phát sinh bug mới, chỉ cross-link 2 bug đã có làm bằng
chứng bổ sung từ người dùng thật.

Ảnh chụp trang GitHub Issues của cả 26 issue nằm ở
`bug-reports/github-issues/`, đặt tên theo số issue (`issue-094.png` đến
`issue-197.png`).

Bug thứ 26, `BUG-IA03-PRODUCTDETAIL-002` (mất vị trí cuộn khi bấm Back), đã tự
rút lại: đo lại với cửa sổ dài hơn cho thấy vị trí cuộn được khôi phục đúng.
GitHub issue [#99](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/99)
đã đóng kèm lý do, GUI-027 chuyển sang Passed, file bug giữ nguyên để đối
chiếu. Xem `reports/ai-critique.md`.

### 2.6. Demo Videos

| Skill | Link |
|---|---|
| `gui-checklist` | https://youtu.be/Vi-yk2z-LYQ |
| `usability-evaluation` | https://youtu.be/l7MVHgso8qc |

Kịch bản quay: `skills-demo-script.md`.

### 2.7. Bản ghi 7 buổi usability test

| # | Người tham gia | Bản ghi | Loại |
|---|---|---|---|
| 1 | Nguyễn Hà Chiêu Dương | https://youtu.be/tctKlOGofmc | Màn hình + tiếng |
| 2 | Nguyễn Thành Đạt | https://youtu.be/czE9kNIG_y0 | Màn hình + tiếng |
| 3 | Nguyễn Ngọc Trúc Mây | https://youtu.be/A9ZBu9xlwpY | Màn hình + tiếng |
| 4 | Huỳnh Yến Nhi | https://youtube.com/shorts/Y4rrfpNAxiU?feature=share | Chỉ có tiếng |
| 5 | Dương Quang Thắng | https://youtu.be/aSgQ0qqPo2E | Màn hình + tiếng |
| 6 | Nguyễn Quốc Huy | https://youtu.be/bVbO8UFuEWE | Màn hình + tiếng |
| 7 | Lê Hữu Sang | https://youtu.be/mXStbe4FDLI | Màn hình + tiếng |

6/7 buổi có bản ghi màn hình, buổi #4 chỉ có bản ghi âm. Các bằng chứng khác
của buổi #4 (transcript, bảng quan sát theo mốc thời gian, phản hồi SUS) vẫn
đầy đủ như 6 buổi còn lại. Danh sách người tham gia đầy đủ:
`usability/participants.md`.

---

## 3. AI Critique & Audit

- AI Critique (200–300 từ, §10): `reports/ai-critique.md`
- AI Audit Report (phụ lục bắt buộc, §9): `reports/ai-audit-report.md`
- Prompt log thô, không lọc: `reports/prompt-log.md`
