# [AI-02] AI Audit Report — HW04 Automation Testing

## 1. Thông tin Sinh viên

| Field | Content |
| --- | --- |
| **Họ tên** | Hà Bảo Ngọc |
| **MSSV** | 23127300 |
| **Lớp / Nhóm** | CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS — Nhóm N08 |
| **Ngày làm bài** | 06/08/2026 – 07/08/2026 |
| **Công cụ AI đã dùng** | Claude (Opus 5, chạy trong Claude Code) |

## 2. Hướng dẫn / Phạm vi

Phụ lục bắt buộc theo HW04 §9. Mỗi entry ghi lại một giai đoạn chuyển đổi test
case thủ công sang script tự động, kèm phán quyết của sinh viên về chất lượng
output. Bản ghi thô, không lọc, nằm ở [`prompt-log.md`](prompt-log.md).

Nguyên tắc: **Full prompt** và **AI Output** giữ nguyên văn, không dịch, không
rút gọn. Các phần còn lại là nhận định của sinh viên.

> Phạm vi hiện tại: các entry của Session 1 (FR-02, ngày 06/08/2026) chưa được
> ghi tại thời điểm diễn ra và không được dựng lại từ trí nhớ. File này bắt đầu
> từ Session 2 (FR-10).

## 3. Audit Entries

## Entry #1

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:20 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 1–3 (Analyze → Design → Review) — bảng ánh xạ 14 case trong `test-design/FR-10-order-state-machine/case-map.md` |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Prompt trên kích hoạt Task 7 của kế hoạch. Nội dung điều khiển giai đoạn này
là Task 7 trong `docs/superpowers/plans/2026-08-05-hw04-automation.md`, mục
Step 2 và Step 4: đọc 14 case HW02, phát biểu lại state machine từ oracle §3,
recon hai giao diện, rồi viết bảng ánh xạ ≥12 case.)

### (2) AI Output

```
14 case: F10-TC-001..F10-TC-014, ánh xạ 13/14 case HW02.
- 001–005: năm chuyển đổi hợp lệ (pending→confirmed, confirmed→shipping,
  shipping→delivered, pending→canceled bởi User, confirmed→canceled bởi Admin)
- 006–009: chuyển đổi không hợp lệ, assert bằng "tập nút của dòng phải khớp
  chính xác tập cạnh hợp lệ" (nhảy pending→shipping, lùi confirmed→pending,
  delivered final, canceled final)
- 010: User không được tự hủy đơn Đang giao
- 011: phiên User thường không được đổi trạng thái đơn (FR-10 + FR-12)
- 012: mọi nhãn trạng thái hiển thị phải nằm trong miền 5 giá trị
- 013: khách chưa đăng nhập không xem/không hủy được đơn
- 014: (thiết kế mới HW04) User chỉ thấy đơn của chính mình
TC-FR10-DT-013 (trạng thái hiện tại ngoài miền) → not-automated.md.
Dự đoán FAIL vì lỗi thật: F10-TC-009, F10-TC-010, F10-TC-011.
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Bộ case bám sát oracle §3 và không phát minh thêm quy tắc nào ngoài đặc tả. Điểm
đáng giá nhất là cách xử lý nhóm "chuyển đổi không hợp lệ": giao diện admin
không có ô chọn trạng thái, nên không thể "thử chuyển sai" như kịch bản thủ công
mô tả. Thay vì bỏ nhóm case này, thiết kế đổi góc nhìn — tập nút mà một dòng đơn
chào mời **chính là** tuyên bố của hệ thống về các cạnh đi ra của trạng thái đó,
nên assert tập nút khớp chính xác sẽ chứng minh cả hai chiều: không thiếu cạnh
hợp lệ, không thừa cạnh ngoài sơ đồ. Đây là suy luận đúng về mặt kiểm thử hộp
đen, không phải cách lách.

Việc loại TC-FR10-DT-013 cũng trung thực: recon cho thấy mọi đường ghi mà client
tiếp cận được đều từ chối giá trị `returned`, nên không dựng nổi tiền điều kiện.
Ghi rõ lý do và điều kiện để automate được, thay vì độn thêm một case giả.

### (5) Student Fix

Không cần chỉnh sửa nội dung bảng ánh xạ. Có bổ sung mục §3 trong `case-map.md`
để nêu rõ F10-TC-011 là ngoại lệ có chủ ý của quy ước "API chỉ dùng để setup",
kèm lý do — nếu không ghi, người chấm sẽ đọc nhầm thành vi phạm quy ước.

---

## Entry #2

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:28 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 4–5 (Model data) — `orderStateCaseSchema` trong `automation/utils/data.ts` + `automation/test-data/fr-10-order-state.cases.json` |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Giai đoạn này do Task 8 của kế hoạch điều khiển. Kế hoạch có sẵn một bản nháp
schema, trích nguyên văn:)

```ts
export const orderStateCaseSchema = baseCaseSchema.extend({
  setupPath: z.array(
    z.enum(['pending', 'confirmed', 'shipping', 'delivered', 'canceled']),
  ),
  actor: z.enum(['admin', 'user']),
  action: z.enum(['set-status', 'cancel', 'view-only']),
  targetStatus: z
    .enum(['pending', 'confirmed', 'shipping', 'delivered', 'canceled'])
    .nullable(),
  expected: z.object({
    allowed: z.boolean(),
    statusLabel: z.string().nullable(),
    controlAbsent: z.boolean(),
    messageContains: z.string().nullable(),
  }),
});
```

### (2) AI Output

```
Schema thực tế đã viết:
  setupPath: OrderStatus[]
  actor: 'admin' | 'user' | 'guest'
  control: string | null            // nhãn nút sẽ bấm, hoặc phải vắng mặt
  expectedControls: string[] | null // tập nút mà dòng phải chào mời, khớp đúng
  targetStatus: OrderStatus | null  // chỉ dùng cho case dò quyền
  assertion: 'transition-succeeds' | 'controls-exactly' | 'control-not-offered'
           | 'status-labels-in-domain' | 'privileged-transition-refused'
           | 'history-requires-login' | 'orders-are-owner-scoped'
  expected: { statusLabel: string | null }
+ 14 record JSON tương ứng.
Loader xác nhận: 14 case, không trùng caseId, đạt ngưỡng ≥12.
```

### (3) Verdict

**`INCOMPLETE`** (đối với bản nháp schema mà kế hoạch đưa ra)

### (4) Reasoning

Bản nháp trong kế hoạch được thiết kế cho một giao diện **không tồn tại**. Nó giả
định admin đổi trạng thái bằng một ô `<select>` nên mới có `action: 'set-status'`
và `targetStatus` cho mọi case. Recon cho thấy admin dùng một nút riêng cho từng
chuyển đổi hợp lệ. Nếu giữ nguyên schema đó, các case "chuyển đổi không hợp lệ"
sẽ không có chỗ để biểu diễn kỳ vọng, và `expected.allowed` cùng
`expected.controlAbsent` trở thành hai cờ boolean chồng lấn nhau — kiểu dữ liệu
cho phép mô tả những tổ hợp vô nghĩa (`allowed: true` nhưng `controlAbsent: true`).

Trường `messageContains` cũng thừa: cả hai giao diện không hiển thị thông báo lỗi
nào cho thao tác bị chặn — chúng đơn giản là không chào mời nút. Giữ lại một
trường luôn `null` chỉ làm dữ liệu nhiễu.

Đây là bài học lặp lại của Session 1: schema do AI đề xuất trước khi nhìn DOM
thật luôn phải coi là giả thuyết, không phải đặc tả.

### (5) Student Fix

Viết lại schema quanh hai khái niệm quan sát được thay vì quanh cờ boolean:
`expectedControls` (tập nút phải khớp chính xác) và `assertion` (từ vựng nhỏ để
spec dispatch). Bỏ `action`, `allowed`, `controlAbsent`, `messageContains`. Thêm
`'guest'` vào `actor` vì TC-FR10-DT-014 cần actor chưa đăng nhập — bản nháp bỏ
sót. Giữ `targetStatus` nhưng thu hẹp mục đích, chỉ phục vụ case dò quyền
F10-TC-011.

---

## Entry #3

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Opus 5, Claude Code) |
| **Timestamp**     | 8:34 AM 07/08/2026 |
| **Artifact type** | FR-10 stage 6–7 (Generate → Verify & repair) — `auth.fixture.ts`, `admin-orders.page.ts`, `my-orders.page.ts`, `fr-10-order-state.spec.ts` + lượt chạy Chromium |

**Full prompt:**

```
execute the session 2 in superpowers plan
```

(Task 9 của kế hoạch, kèm bản nháp page object dùng `statusSelect(orderId)` /
`selectOption(status)` và `goto()` điều hướng thẳng tới `:5174/orders`, và
`MyOrdersPage.goto()` tới `:5173/orders`.)

### (2) AI Output

```
Kết quả chạy `npx playwright test tests/fr-10-order-state.spec.ts --project=chromium`:

  3 failed
    F10-TC-009 — Đơn đã hủy là trạng thái kết thúc
    F10-TC-010 — User không được tự hủy đơn đang giao
    F10-TC-011 — Phiên User thường không được đổi trạng thái đơn hàng
  11 passed (26.7s)

Thông báo lỗi của F10-TC-009 (nguyên văn):
  Error: state `Đã hủy` must offer exactly the transitions §3 allows
  Locator: getByRole('row').filter({ has: getByRole('cell', { name: '#30', exact: true }) }).getByRole('button')
  - Array []
  + Array [
  +   "Đánh dấu Đã giao",
  + ]

Thông báo lỗi của F10-TC-010 (nguyên văn):
  Error: the user must not be offered a control §3 forbids them
  expect(locator).toHaveCount(expected) failed
  Expected: 0
  Received: 1

Thông báo lỗi của F10-TC-011 (nguyên văn):
  Error: a shopper session must not be able to drive an admin transition
  Expected: false
  Received: true
```

### (3) Verdict

**`VALID`**

### (4) Reasoning

Ba case đỏ đúng bằng ba case mà bảng ánh xạ đã dự đoán sẽ đỏ, và trùng khớp với
BUG-FR10-001/002/003 của HW02 — tức là script tái hiện được đúng ba lỗi đã biết
chứ không đỏ vì hỏng selector. Thông báo lỗi tự nó là bằng chứng đọc được: dòng
đơn `Đã hủy` chào mời nút `Đánh dấu Đã giao` trong khi oracle nói `canceled` là
trạng thái kết thúc.

Đáng chú ý là 11 case xanh cũng có giá trị chứng minh: F10-TC-006/007/008 xanh
nghĩa là hệ thống **có** chặn đúng các chuyển đổi sai khác, nên ba lỗi trên là
lỗ hổng cục bộ chứ không phải state machine bị bỏ trống hoàn toàn. Không case
nào bị làm nhẹ assertion hay `skip` để lấy màu xanh.

Điểm phải tự phê bình: bản nháp page object trong kế hoạch sai ở ba chỗ, và cả
ba chỉ lộ ra nhờ recon chứ không nhờ chạy thử — `selectOption` trên một ô select
không tồn tại, điều hướng bằng URL trên một app không route theo URL, và trang
lịch sử đơn nằm ở `/profile` chứ không phải `/orders`. Nếu tin bản nháp và chỉ
sửa cho tới khi hết đỏ, kết quả sẽ là một suite chạy được nhưng kiểm thử sai chỗ.

### (5) Student Fix

- `AdminOrdersPage.goto()` điều hướng bằng cách bấm mục `Đơn hàng` ở sidebar và
  chờ tiêu đề `Quản lý Đơn hàng`, thay cho `page.goto(':5174/orders')`.
- Bỏ `statusSelect`/`setStatus`, thay bằng `controlsFor` / `control` / `activate`.
- `MyOrdersPage.goto()` trỏ tới `/profile`.
- Fixture seed đúng khoá lưu token cho từng origin: shop dùng `token`, admin
  dùng `adminToken` — bản nháp dùng `token` cho cả hai, sẽ khiến admin app luôn
  ở màn hình đăng nhập mà không báo lỗi rõ ràng.
- Locator dòng đơn neo bằng regex `^#<id>$` trên ô mã đơn. Bản nháp dùng
  `filter({ hasText: String(orderId) })`, sẽ khớp nhầm: chuỗi `3` có trong cả
  `30,000,000 ₫` lẫn ngày `8/7/2026`, và `#3` là tiền tố của `#30`. Lượt chạy
  thực tế có đơn `#30` nên lỗi này chắc chắn đã xảy ra nếu không sửa.

---

## 4. Tổng hợp độ chính xác của AI

| Verdict | Số entry | Tỷ lệ |
| --- | ---: | ---: |
| `VALID` | 2 | 66.7% |
| `INVALID` | 0 | 0.0% |
| `INCOMPLETE` | 1 | 33.3% |
| **Tổng số entry đã audit** | **3** | **100%** |

## 5. Kết luận

Trong ba giai đoạn của FR-10, phần AI làm tốt là thiết kế case và viết assertion
một khi đã có dữ liệu quan sát thật: bộ 14 case bám oracle, và cách assert "tập
nút phải khớp chính xác tập cạnh hợp lệ" là một ý đúng mà kịch bản thủ công
không gợi ra.

Phần AI làm sai đều nằm ở cùng một chỗ: mọi giả định về giao diện đưa ra **trước
khi** đọc DOM thật đều sai — ô select không tồn tại, route `/orders` không tồn
tại ở cả hai app, khoá lưu token khác nhau giữa hai origin, và locator dòng đơn
theo `hasText` sẽ khớp nhầm nhiều ô khác. Không lỗi nào trong số này làm test
đỏ theo kiểu dễ thấy; chúng làm test **xanh sai chỗ** hoặc đỏ vì lý do vô can.
Nguyên tắc rút ra và đã áp dụng: recon trước, sinh code sau — và khi test đỏ,
đọc thông báo lỗi để phân biệt lỗi script với lỗi SUT trước khi sửa bất cứ thứ gì.

## 6. Công bố bắt buộc (Mandatory Disclosure)

Toàn bộ test case, script Playwright, dữ liệu test và tài liệu của HW04 được
tạo ra với sự hỗ trợ của Claude (Opus 5) chạy trong Claude Code. Mọi output
của AI đều được sinh viên xem xét, đối chiếu với `sut-requirements.md` và với
hành vi quan sát được trên SUT đang chạy trước khi giữ lại; các phần bị sửa hoặc
bác bỏ được ghi ở mục **Student Fix** của từng entry.

**Ký tên:** Hà Bảo Ngọc — 23127300 — 07/08/2026
