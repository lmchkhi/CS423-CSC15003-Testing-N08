# HW04 – Automation Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Phạm vi:** FR-02 (Pool A), FR-10 (Pool B), FR-13 (Pool C) — đúng bộ feature web đã chọn ở HW02 theo §5.
> **Công cụ:** Playwright (TypeScript) + Playwright HTML reporter, chạy trên Chromium / Firefox / WebKit.

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Selected Feature | Self-Assessed Grade |
|---|---|---:|---|---:|
| 1 | Task 1 — Feature A | 25 | FR-02: Đăng nhập & khóa tài khoản | 25 |
| 2 | Task 1 — Feature B | 25 | FR-10: Trạng thái đơn hàng | 25 |
| 3 | Task 1 — Feature C | 25 | FR-13: Dashboard | 25 |
| 4 | Task 2 — Demo video | 15 | Demo suite chạy end-to-end + HTML report | 15 |
| 5 | Agent Skills | 10 | `.claude/skills/playwright-automation` | 10 |
| | **Total** | **100** | | **100 / 100** |

---

## 2. Test Summary Report

### 2.1. Features Automated

| Pool | Feature ID | Feature Name | Platform | Spec |
|---|---|---|---|---|
| A | FR-02 | Đăng nhập & khóa tài khoản | Web `:5173` | `automation/tests/fr-02-login.spec.ts` |
| B | FR-10 | Trạng thái đơn hàng | Web `:5173` + Admin `:5174` | `automation/tests/fr-10-order-state.spec.ts` |
| C | FR-13 | Dashboard | Admin `:5174` | `automation/tests/fr-13-dashboard.spec.ts` |

### 2.2. Test Case Summary

Số case đếm theo case logic, không nhân theo browser.

| Feature | Automated | Executed | Passed | Failed | Not automated |
|---|---:|---:|---:|---:|---:|
| FR-02 | 14 | 14 | 10 | 4 | 1 |
| FR-10 | 14 | 14 | 11 | 3 | 1 |
| FR-13 | 12 | 12 | 1 | 11 | 1 |
| **Total** | **40** | **40** | **22** | **18** | **3** |

> Case không tự động hoá được và lý do: [`test-design/not-automated.md`](test-design/not-automated.md).
> Ánh xạ case HW02 → case HW04 → automated test: `test-design/<feature>/case-map.md`.

### 2.3. Browser Runs

| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| FR-02 | 10p / 4f | 10p / 4f | 10p / 4f |
| FR-10 | 11p / 3f | 11p / 3f | 11p / 3f |
| FR-13 | 1p / 11f | 1p / 11f | 1p / 11f |

> **Tổng số browser run:** 9 (3 feature × 3 browser). Mỗi run sinh một HTML
> report riêng tại `reports/html/<feature>/<browser>/index.html`, hiển thị
> `Run by: 23127300` kèm ISO timestamp. Kết quả từng cell:
> [`reports/run-manifest.md`](reports/run-manifest.md).

### 2.4. Assertion Patterns

| Pattern | Ví dụ | Dùng ở |
|---|---|---|
| Navigation (`toHaveURL`) | Đăng nhập thành công phải chuyển khỏi `/login` | FR-02 |
| `localStorage` + `toBeTruthy` | JWT phải được lưu sau đăng nhập | FR-02 |
| Visibility + text content | Thông báo lỗi hiển thị, không lộ nguyên nhân | FR-02 |
| Thuộc tính DOM + validity state | Ô email `type="email"` chặn định dạng sai | FR-02 |
| Đếm phần tử (`toHaveCount`) | Đơn hàng xuất hiện đúng 1 lần trước khi thao tác | FR-10 |
| So khớp tập hợp chính xác | Tập nút hành động khớp đúng tập cạnh hợp lệ | FR-10 |
| Vắng mặt (`toHaveCount(0)`) | Nút bị cấm không được chào mời | FR-10 |
| Thành viên tập hợp | Mọi nhãn trạng thái nằm trong 5 giá trị đặc tả | FR-10 |
| Số học với oracle tính động từ API | Doanh thu = baseline + phần vừa thêm, tính lại mỗi lần | FR-13 |

> §6 yêu cầu tối thiểu 3 assertion pattern khác nhau — suite dùng 9. Chi
> tiết: [`reports/main-report.md`](reports/main-report.md#4-assertion-patterns).

### 2.5. Bug Summary

| Bug ID | Feature | Severity / Priority | Status | Local Report | GitHub Issue |
|---|---|---|---|---|---|
| BUG-FR02-001 | FR-02 | Major / P2 | New | [`bug-reports/BUG-FR02-001.md`](bug-reports/BUG-FR02-001.md) | [#204](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/204) |
| BUG-FR02-002 | FR-02 | Major / P1 | New | [`bug-reports/BUG-FR02-002.md`](bug-reports/BUG-FR02-002.md) | [#205](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/205) |
| BUG-FR02-003 | FR-02 | Major / P2 | New | [`bug-reports/BUG-FR02-003.md`](bug-reports/BUG-FR02-003.md) | [#206](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/206) |
| BUG-FR02-004 | FR-02 | Critical / P0 | New | [`bug-reports/BUG-FR02-004.md`](bug-reports/BUG-FR02-004.md) | [#207](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/207) |
| BUG-FR10-001 | FR-10 | Critical / P1 | New | [`bug-reports/BUG-FR10-001.md`](bug-reports/BUG-FR10-001.md) | [#208](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/208) |
| BUG-FR10-002 | FR-10 | Major / P1 | New | [`bug-reports/BUG-FR10-002.md`](bug-reports/BUG-FR10-002.md) | [#209](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/209) |
| BUG-FR10-003 | FR-10 | Critical / P0 | New | [`bug-reports/BUG-FR10-003.md`](bug-reports/BUG-FR10-003.md) | [#210](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/210) |
| BUG-FR13-001 | FR-13 | Critical / P1 | New | [`bug-reports/BUG-FR13-001.md`](bug-reports/BUG-FR13-001.md) | [#211](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/211) |
| BUG-FR13-002 | FR-13 | Critical / P0 | New | [`bug-reports/BUG-FR13-002.md`](bug-reports/BUG-FR13-002.md) | [#212](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/212) |

> **Tổng số bugs:** 9 (4 FR-02, 3 FR-10, 2 FR-13). `BUG-FR13-001` gộp 10 case
> trùng nguyên nhân (doanh thu Dashboard nhân đôi) thành một bug report duy
> nhất, theo đúng quy ước của skill `bug-report`.

### 2.6. Demo Video

| Nội dung | Link |
|---|---|
| Task 2 — chạy automation end-to-end, multi-browser, HTML report (≥5 phút, tiếng Việt) | <!-- TODO: YouTube link, Aug 9 --> |
| Agent Skill demo (§7) | <!-- TODO: YouTube link, Aug 9 --> |

---

## 3. Cấu trúc repo

| Đường dẫn | Nội dung |
|---|---|
| `automation/` | Playwright project (TypeScript): spec, test data, page object, matrix runner. Cách chạy: [`automation/README.md`](automation/README.md) |
| `automation/test-data/*.cases.json` | Toàn bộ dữ liệu test — không có case nào hardcode trong spec (§6) |
| `test-design/` | Ánh xạ case HW02 → HW04 → automated test; danh sách case không tự động hoá |
| `reports/html/<feature>/<browser>/` | 9 HTML report của ma trận 3×3 |
| `reports/run-manifest.md` | Kết quả từng cell: pass/fail, số case, timestamp, đường dẫn report |
| `reports/main-report.md` | Báo cáo chính: quy trình từng bước, requirement ledger, review AI |
| `ai-gap-analysis/` | Phân tích AI làm sai / thiếu gì và vì sao (§6) |
| `reports/ai-audit-report.md`, `reports/prompt-log.md`, `reports/ai-critique.md` | Phụ lục AI bắt buộc (§9, §10) |
| `bug-reports/` | Bug report + screenshot + link GitHub Issue |
| `.claude/skills/` | Agent Skills (§7) — `playwright-automation`, `bug-report`, `ai-audit-log`, `prompt-log` |
| `sut-requirements.md` | Trích đặc tả EShop cho FR-02/10/13 — oracle của toàn bộ assertion |
| `git-log.txt` | Git commit log (§12) |

---

## 4. Liên kết

| Mục | Link |
|---|---|
| GitHub repository | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08 (branch `HW04/23127300`) |
| SUT | https://github.com/ttbhanh/eshop-sut |
| Demo video (Task 2) | <!-- TODO: YouTube link, Aug 9 --> |
