# Prompt Log

*Complete, unfiltered record of every AI interaction during HW04. See
`reports/ai-audit-report.md` for the reviewed subset with verdicts.*

> Ghi chú về phạm vi: file này bắt đầu được ghi từ Session 2 (07/08/2026).
> Các tương tác của Session 1 (FR-02, ngày 06/08/2026) đã diễn ra trong một
> phiên làm việc khác và không được ghi lại tại thời điểm đó; theo nguyên tắc
> verbatim của chính skill này, chúng **không** được dựng lại từ trí nhớ. Phần
> khuyết đó được nêu thẳng ở đây thay vì bịa nội dung.

## [1] Claude (Opus 5, Claude Code) — 8:12 AM 07/08/2026

**Prompt:**
```
execute the session 2 in superpowers plan
```

**Output:**
```
Phiên agentic: trợ lý đọc docs/superpowers/plans/2026-08-05-hw04-automation.md,
xác định Session 2 = Task 7–10 (FR-10), rồi thực thi bằng tool call. Sản phẩm
tạo ra trong phiên (đường dẫn tương đối từ gốc repo):

- test-design/FR-10-order-state-machine/case-map.md   (14 case F10-TC-001..014)
- test-design/not-automated.md                        (thêm dòng TC-FR10-DT-013)
- automation/utils/data.ts                            (thêm orderStateCaseSchema)
- automation/test-data/fr-10-order-state.cases.json   (14 record)
- automation/fixtures/auth.fixture.ts
- automation/pages/admin-orders.page.ts
- automation/pages/my-orders.page.ts
- automation/tests/fr-10-order-state.spec.ts

Trước khi sinh code, trợ lý chạy một script recon tạm (automation/recon-fr10.ts,
đã xoá sau khi dùng) để đọc DOM thật của cả hai giao diện. Kết quả recon nguyên
văn — phần quyết định thiết kế:

  === admin dialog: (không có dialog nào ở thao tác admin)
  --- ADMIN pending  : nút "Xác nhận", "Hủy"          | badge "Chờ xác nhận"
  --- ADMIN confirmed: nút "Giao hàng", "Hủy"         | badge "Đã xác nhận"
  --- ADMIN shipping : nút "Hoàn thành"               | badge "Đang giao"
  --- ADMIN delivered: (không có nút)                 | badge "Đã giao"
  --- ADMIN canceled : nút "Đánh dấu Đã giao"         | badge "Đã hủy"
  --- USER  shipping : nút "Hủy đơn"                  | badge "Đang giao"
  === (a) canceled + click "Đánh dấu Đã giao" -> row: #10 ... Đã giao
  === (a) API status now: delivered
  === dialog: alert "Hủy đơn thành công!"
  === (b) shipping + user click "Hủy đơn" -> row: #11 8/7/2026 30,000,000 ₫ Đã hủy
  === (b) API status now: canceled
  === (c) guest /profile URL: http://localhost:5173/profile
  === (c) guest main: Vui lòng đăng nhập
  === user B sees own #14: 1
  === user B sees A #13: 0
  === guest admin body: Admin Login Login
  === API pending -> shipping: REJECTED 400 {"error":"Invalid state transition from pending to shipping"}
  === API pending -> returned: REJECTED 400 {"error":"Invalid state transition from pending to returned"}

Kết quả chạy suite trên Chromium (nguyên văn phần tổng kết của Playwright):

  3 failed
    [chromium] › tests/fr-10-order-state.spec.ts:62:9 › FR-10 — Trạng thái đơn hàng › F10-TC-009 — Đơn đã hủy là trạng thái kết thúc
    [chromium] › tests/fr-10-order-state.spec.ts:62:9 › FR-10 — Trạng thái đơn hàng › F10-TC-010 — User không được tự hủy đơn đang giao
    [chromium] › tests/fr-10-order-state.spec.ts:62:9 › FR-10 — Trạng thái đơn hàng › F10-TC-011 — Phiên User thường không được đổi trạng thái đơn hàng
  11 passed (26.7s)
```

---

## [2] Claude (Opus 5, Claude Code) — 8:44 AM 07/08/2026

**Prompt:**
```
execute the session 2 in superpowers plan
```

**Output:**
```
(Tiếp Task 10 của cùng phiên agentic: chạy ma trận 3 trình duyệt.)

Lượt chạy đầu tiên — WebKit lệch so với hai engine kia:

  FAIL  fr-10-order-state  chromium  11p/3f  ...  label=ok
  FAIL  fr-10-order-state  firefox   11p/3f  ...  label=ok
  FAIL  fr-10-order-state  webkit    10p/4f  ...  label=ok

Case đỏ thêm trên WebKit: F10-TC-014. Page snapshot lúc lỗi:
  - main [ref=f2e10]:
    - generic [ref=f2e11]: Vui lòng đăng nhập

Probe so sánh hai engine (script tạm automation/probe-webkit.ts, đã xoá):
  [chromium net] 200 GET http://localhost:3000/api/orders/my-orders
  [chromium net] 200 GET http://localhost:3000/api/users/me
  [chromium] token now: eyJhbGciOiJI
  [chromium] rows for #82: 1
  [webkit] token now: null
  [webkit] rows for #83: 0
  (WebKit không phát request nào tới :3000)

Sửa: automation/fixtures/auth.fixture.ts — seedToken dùng page.addInitScript
thay cho goto + evaluate + reload.

Lượt chạy lại sau khi sửa:
  FAIL  fr-10-order-state  chromium  11p/3f  reports/html/fr-10-order-state/chromium/index.html  label=ok
  FAIL  fr-10-order-state  firefox   11p/3f  reports/html/fr-10-order-state/firefox/index.html  label=ok
  FAIL  fr-10-order-state  webkit    11p/3f  reports/html/fr-10-order-state/webkit/index.html  label=ok

Kiểm chứng: 3/3 report chứa "Run by: 23127300" kèm ISO timestamp;
reports/run-manifest.md giữ đủ 6 dòng (FR-02 ba dòng cũ + FR-10 ba dòng mới).
```

---
