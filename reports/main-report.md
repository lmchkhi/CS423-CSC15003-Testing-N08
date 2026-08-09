# HW04 — Báo cáo chính: Automation Testing trên EShop

**Sinh viên:** Hà Bảo Ngọc — MSSV 23127300 — Nhóm N08
**Môn:** CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS
**SUT:** EShop (`github.com/ttbhanh/eshop-sut`) — backend `:3000`, frontend web `:5173`, frontend admin `:5174`
**Phạm vi:** FR-02 (Đăng nhập & khóa tài khoản), FR-10 (Trạng thái đơn hàng), FR-13 (Dashboard) — đúng bộ ba feature đã chọn ở HW02, theo yêu cầu §5 của HW04.
**Công cụ:** Playwright (TypeScript) + `@playwright/test` HTML reporter, chạy trên Chromium/Firefox/WebKit.
**Oracle:** [`sut-requirements.md`](../sut-requirements.md) — mọi assertion mã hoá đúng những gì tài liệu này nói hệ thống *phải* làm, không phải hành vi của bản build hiện tại.

---

## 1. Bảng requirement ledger

| Feature | HW02 source cases | Case IDs (HW04) | Count | Data file | Spec file | Browsers | Reports |
|---|---|---|---:|---|---|---|---|
| FR-02 | 15 (9 DT + 6 BVA) | F02-TC-001…014 | 14 | [`fr-02-login.cases.json`](../automation/test-data/fr-02-login.cases.json) | [`fr-02-login.spec.ts`](../automation/tests/fr-02-login.spec.ts) | Chromium, Firefox, WebKit | `reports/html/fr-02-login/{chromium,firefox,webkit}/` |
| FR-10 | 14 DT | F10-TC-001…014 | 14 | [`fr-10-order-state.cases.json`](../automation/test-data/fr-10-order-state.cases.json) | [`fr-10-order-state.spec.ts`](../automation/tests/fr-10-order-state.spec.ts) | Chromium, Firefox, WebKit | `reports/html/fr-10-order-state/{chromium,firefox,webkit}/` |
| FR-13 | 6 DT (5 mang sang + 1 không automate được) | F13-TC-001…012 | 12 (5 mang sang + **7 thiết kế mới trong HW04**) | [`fr-13-dashboard.cases.json`](../automation/test-data/fr-13-dashboard.cases.json) | [`fr-13-dashboard.spec.ts`](../automation/tests/fr-13-dashboard.spec.ts) | Chromium, Firefox, WebKit | `reports/html/fr-13-dashboard/{chromium,firefox,webkit}/` |
| **Tổng** | 35 case HW02 đọc lại | | **40** | | | **9 browser run** | |

Mọi case tự động đạt tối thiểu 12/feature theo §6. Case-map chi tiết từng
feature (HW02 ID → HW04 ID → tiêu đề test → data row → trạng thái) nằm ở
`test-design/<feature>/case-map.md`. Case không tự động hoá được và lý do:
[`../test-design/not-automated.md`](../test-design/not-automated.md) (3 case:
1 FR-02, 1 FR-10, 1 FR-13).

---

## 2. Quy trình 7 bước — áp dụng cho từng feature

Theo skill `playwright-automation` (§6 cấm một prompt chung "viết hết script"):
Analyze → Design → Review → Model data → Map automation → Generate → Verify
& repair. Mỗi bước log riêng ở [`ai-audit-report.md`](ai-audit-report.md);
mục dưới đây tóm tắt những gì thực sự xảy ra, không lặp lại toàn văn.

### 2.1. FR-02 — Đăng nhập & khóa tài khoản (Session 1, 06/08/2026)

1. **Analyze/Design/Review** (Entry #6): đọc 15 case HW02, đối chiếu 5 quy
   tắc mã hoá được từ `sut-requirements.md` §2, rồi recon trực tiếp lên form
   đăng nhập đang chạy trước khi thiết kế. Recon phát hiện hai điều tài liệu
   không nói: khóa kích hoạt sau **2** lần sai (không phải 3), và response
   đăng nhập trả về mật khẩu dạng plaintext. Cả hai được giữ làm case sẽ FAIL
   theo đúng oracle, không phải điều chỉnh assertion cho khớp hành vi lỗi.
2. **Model data** (Entry #7): `loginCaseSchema` tách 3 trục độc lập —
   `account` (nguồn danh tính), `emailSource`, `priorFailures`, để một
   record data phục vụ được nhiều biến thể mà không nhánh theo `caseId`.
3. **Map automation / Generate** (Entry #8): page object `LoginPage` viết
   lại locator hai lần sau khi đọc DOM thật (bản nháp `getByLabel` không
   khớp gì vì form không gắn label; banner lỗi nằm ngoài `<form>`).
4. **Verify & repair** (Entry #9): 10 pass / 4 fail, giống hệt trên cả 3
   trình duyệt, không có lỗi đặc thù engine. `report:verify` từng báo sai
   (regex cũ khớp dạng UTC) sau khi đổi timestamp sang giờ ICT; sửa công cụ
   thay vì sửa lại dữ liệu để không làm sai lệch ngày trên report.

**Kết quả cuối (xác nhận lại 08/08/2026):** 10 pass / 4 fail trên cả 3
trình duyệt. 4 case fail là lỗi thật của SUT, có bug report riêng (§5).

### 2.2. FR-10 — Trạng thái đơn hàng (Session 2, 07/08/2026)

1. **Analyze/Design/Review** (Entry #10): phát biểu lại state machine 5
   trạng thái từ §3, recon cả hai giao diện (admin `:5174`, user `:5173`).
   Phát hiện quan trọng nhất: admin không dùng `<select>` mà dùng một nút
   riêng cho mỗi chuyển đổi hợp lệ. Tập nút mà một dòng đơn chào mời chính
   là tuyên bố của hệ thống về các cạnh đi ra hợp lệ từ trạng thái đó, nên
   assert "tập nút khớp chính xác" chứng minh được cả hai chiều (không thiếu
   cạnh hợp lệ, không thừa cạnh ngoài sơ đồ) mà không cần gọi API.
2. **Model data** (Entry #11): schema viết lại quanh `expectedControls` +
   `assertion` thay vì cờ boolean chồng lấn (`allowed`/`controlAbsent`) của
   bản nháp kế hoạch, vốn giả định một giao diện dropdown không hề tồn tại.
3. **Map automation / Generate** (Entry #12): fixture, `AdminOrdersPage`,
   `MyOrdersPage`, spec. 11 pass / 3 fail ngay từ chromium, đúng bằng 3 case
   bảng ánh xạ đã dự đoán sẽ fail (BUG-FR10-001/002/003 tái hiện từ HW02).
4. **Verify & repair**: `selectOption` trên select ảo, điều hướng URL sai,
   khoá token sai origin — cả ba chỉ lộ ra nhờ recon, không nhờ chạy thử.

**Kết quả cuối (xác nhận lại 08/08/2026):** 11 pass / 3 fail trên cả 3
trình duyệt.

### 2.3. FR-13 — Dashboard (Session 3, 08/08/2026)

1. **Analyze/Design/Review** (Entry #16): đọc 6 case HW02, phát hiện 3/6 đã
   `Failed/BUG-FR13-001` từ HW02 (doanh thu sai). Recon phát hiện **thêm một
   lỗi mới** không có trong kế hoạch: token của tài khoản `role='user'` bơm
   thẳng vào `localStorage` của app admin vẫn xem được Dashboard, và
   `GET /api/admin/orders` trả `200` cho cùng token đó — vi phạm FR-12.
2. **Model data**: `dashboardCaseSchema` không hardcode số liệu kỳ vọng —
   `seedOrders` mô tả trạng thái đơn cần tạo, số kỳ vọng tính từ
   `expectedDashboardTotals()` (API) ngay trước khi assert, vì suite chạy
   chung một SQLite không reset giữa các cell.
3. **Generate** (Entry #17): `DashboardPage` + spec. Lượt chạy đầu tiên có
   1 case pass sai lý do: nhánh kiểm tra non-admin gọi nhầm
   `seedUserToken` (seed origin shop) thay vì `seedAdminToken` (seed đúng
   origin admin đang được test), khiến case không hề chạm tới bề mặt cần
   kiểm tra. Tự phát hiện và sửa trước khi chạy ma trận.
4. **Verify & repair** (Entry #18): 1 pass / 11 fail, giống hệt trên cả 3
   trình duyệt. Xác minh độc lập bằng script ngoài Playwright (không phải
   test) để loại trừ khả năng chính script tạo đơn trùng trước khi kết luận
   đây là lỗi SUT: đúng 1 đơn được tạo, số đơn trên Dashboard khớp chính
   xác, chỉ riêng doanh thu gấp đúng 2 lần tổng thật.

**Kết quả cuối:** 1 pass / 11 fail trên cả 3 trình duyệt, quy về đúng 2 lỗi
độc lập (`BUG-FR13-001`, `BUG-FR13-002`, §5).

### 2.4. FR-13 — 7 case thiết kế mới trong HW04

HW02 chỉ để lại 6 case Domain Testing cho FR-13, và 1/6
(`TC-FR13-DT-001` — dashboard khi chưa có đơn hàng) không automate được vì
suite dùng chung một SQLite giữa các cell (chi tiết:
[`../test-design/not-automated.md`](../test-design/not-automated.md)). Còn
lại 5 case mang sang, cần **7 case mới** để đạt tối thiểu 12 của §6. Bảy
case này (F13-TC-006…012) được thiết kế trong Session 3 dựa trên đúng hai
mệnh đề của oracle §4 (doanh thu chỉ tính đơn `delivered`; số đơn hàng tính
mọi trạng thái) cộng bối cảnh FR-12: cô lập từng nguyên nhân loại trừ doanh
thu (đơn `pending`/`canceled`/`shipping` riêng lẻ: F13-TC-007…009), một case
kiểm tra cập nhật động khi đơn chuyển sang `delivered` (F13-TC-010), một case
đối chiếu tổng quát không cần seed thêm dữ liệu (F13-TC-006), một case cô
lập riêng phép đếm khỏi phép lọc doanh thu (F13-TC-011), và một case FR-12
mới cho phiên hoàn toàn chưa đăng nhập (F13-TC-012), bổ sung cho case
non-admin-token đã mang từ HW02 (F13-TC-005). Chi tiết thiết kế và recon:
[`../test-design/FR-13-dashboard/case-map.md`](../test-design/FR-13-dashboard/case-map.md).

---

## 3. Kết quả ma trận 3×3 (9 browser run)

| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| FR-02 | 10 pass / 4 fail | 10 pass / 4 fail | 10 pass / 4 fail |
| FR-10 | 11 pass / 3 fail | 11 pass / 3 fail | 11 pass / 3 fail |
| FR-13 | 1 pass / 11 fail | 1 pass / 11 fail | 1 pass / 11 fail |
| **Tổng** | **22 pass / 18 fail** | **22 pass / 18 fail** | **22 pass / 18 fail** |

Kết quả giống hệt nhau trên cả ba trình duyệt ở mọi feature. Không có lỗi
đặc thù engine nào còn tồn tại sau bước Verify & repair; toàn bộ 18 case
fail/browser là lỗi thật của SUT, không phải lỗi tương thích trình duyệt.
Chi tiết từng cell (timestamp ISO, đường dẫn report, xác nhận nhãn
`Run by: 23127300`): [`run-manifest.md`](run-manifest.md). Cả 9 report HTML
đều chứa `Run by: 23127300` kèm timestamp ISO (§11), xác nhận bằng
`npm run report:verify` → `9/9 expected reports found, 0 unlabeled`.

---

## 4. Assertion patterns (§6 yêu cầu tối thiểu 3 loại khác nhau)

| # | Pattern | Ví dụ | Dùng ở |
|---|---|---|---|
| 1 | Navigation (`toHaveURL`) | Đăng nhập thành công phải chuyển khỏi `/login` | `fr-02-login.spec.ts` |
| 2 | Trạng thái lưu trữ client (`localStorage` + `toBeTruthy`) | JWT phải được lưu sau đăng nhập thành công | `fr-02-login.spec.ts` |
| 3 | Visibility + text content (`toBeVisible`, `toContainText`) | Thông báo lỗi phải hiển thị và không tiết lộ nguyên nhân | `fr-02-login.spec.ts` |
| 4 | Thuộc tính DOM + validity state (`toHaveAttribute`, `validity.valid`) | Ô email phải có `type="email"` và chặn định dạng sai | `fr-02-login.spec.ts` |
| 5 | Đếm phần tử (`toHaveCount`) | Đơn hàng phải xuất hiện đúng 1 lần trước khi thao tác | `fr-10-order-state.spec.ts` |
| 6 | So khớp tập hợp chính xác (`toHaveText` trên nhiều phần tử) | Tập nút hành động phải khớp đúng tập cạnh hợp lệ của trạng thái | `fr-10-order-state.spec.ts` |
| 7 | Vắng mặt (`toHaveCount(0)`) | Nút bị cấm không được chào mời cho actor không có quyền | `fr-10-order-state.spec.ts` |
| 8 | Thành viên tập hợp (`toEqual([])` trên phần tử ngoài miền) | Mọi nhãn trạng thái hiển thị phải nằm trong 5 giá trị đặc tả | `fr-10-order-state.spec.ts` |
| 9 | So sánh số học với oracle tính động từ API (`toBe`) | Doanh thu Dashboard phải bằng baseline + phần vừa thêm, tính lại qua `expectedDashboardTotals()` mỗi lần, không hardcode | `fr-13-dashboard.spec.ts` |

---

## 5. Bug tổng hợp

9 bug được phát hiện bởi assertion thất bại đúng theo oracle (không phải
selector hỏng hay dữ liệu sai): 4 ở FR-02, 3 ở FR-10, 2 ở FR-13. Danh sách
đầy đủ kèm severity, local report và link GitHub Issue:
[`../README.md`](../README.md#25-bug-summary). Toàn bộ 9 report nằm ở
[`../bug-reports/`](../bug-reports/), mỗi report kèm ảnh chụp thất bại do
chính Playwright sinh ra. `BUG-FR13-001` gộp 10 case cùng một nguyên nhân
(doanh thu Dashboard nhân đôi) thành một bug report duy nhất, theo đúng quy
ước "một lỗi thật là một bug, không phải một bug mỗi case".

---

## 6. Review AI-generated scripts (§6)

Phân tích chi tiết những gì AI sinh sai/thiếu và vì sao, gắn với từng entry
trong `ai-audit-report.md`, nằm ở
[`../ai-gap-analysis/ai-generated-script-gaps.md`](../ai-gap-analysis/ai-generated-script-gaps.md).
Tóm tắt: hai nhóm lỗi lặp lại xuyên suốt cả ba feature. Một là, mọi giả định
về giao diện đưa ra *trước khi* recon trên build thật đều sai ở ít nhất một
chỗ, và không lỗi nào lộ ra bằng cách đọc code. Hai là, AI có xu hướng tin
vào chính sản phẩm hoặc kết luận trước đó của nó thay vì đối chiếu chéo với
quan sát độc lập. 20 entry đã audit: 11 `VALID`, 8 `INCOMPLETE`, 1 `INVALID`.

---

## 7. Phụ lục bắt buộc

| Tài liệu | Đường dẫn |
|---|---|
| AI Audit Report (§9) | [`ai-audit-report.md`](ai-audit-report.md) — 20 entry |
| Prompt Log (bản ghi thô, không lọc) | [`prompt-log.md`](prompt-log.md) |
| AI Critique (§10, 200–300 từ) | [`ai-critique.md`](ai-critique.md) |
| AI Gap Analysis (§6) | [`../ai-gap-analysis/ai-generated-script-gaps.md`](../ai-gap-analysis/ai-generated-script-gaps.md) |
| Git commit log (§12) | [`../git-log.txt`](../git-log.txt) |
| Case không tự động hoá | [`../test-design/not-automated.md`](../test-design/not-automated.md) |

## 8. Demo video (Task 2 + Agent Skill)

- Task 2 — chạy end-to-end suite trên 3 trình duyệt kèm report HTML:
  https://youtu.be/0ESx-AIHPK4
- Agent Skill demo (§7) — skill `playwright-automation`:
  https://youtu.be/cRN4PV6iYfE
