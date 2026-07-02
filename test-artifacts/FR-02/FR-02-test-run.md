# Test Run: FR-02 — Đăng nhập & Khóa tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-02: Đăng nhập & Khóa tài khoản |
| **Ngày thực thi** | `<YYYY-MM-DD>` |
| **Môi trường** | `<Browser / OS / URL / API base URL>` |
| **Build / Commit** | `<Build hoặc commit>` |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-02-001 | UI Inspection | Trường Email dùng `type="email"` | `<Tên tester>` | ❌ Failed | — | — |
| TC-FR-02-002 | Decision Table / HTML5 Validation | HTML5 chặn email sai format | `<Tên tester>` | ❌ Failed | — | — |
| TC-FR-02-003 | Decision Table Testing | Credentials đúng trả JWT | `<Tên tester>` | ✅ Passed | — | — |
| TC-FR-02-004 | Functional / Security Testing | Client lưu JWT sau đăng nhập | `<Tên tester>` | ✅ Passed | — | — |
| TC-FR-02-005 | Functional / Security Testing | Request xác thực có Bearer header | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-006 | Decision Table / State Transition | Lần sai thứ nhất chưa khóa tài khoản | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-007 | Decision Table / BVA | Lần sai thứ hai liên tiếp vẫn chưa khóa | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-008 | Decision Table / BVA | Lần sai thứ ba liên tiếp kích hoạt khóa | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-009 | Security Testing | Lỗi không tiết lộ email tồn tại hay mật khẩu sai | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-010 | Decision Table / State Transition | Khóa chặn cả credentials đúng và sai | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-011 | BVA / State Transition | Tài khoản vẫn khóa ngay trước 30 giây | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-012 | Decision Table / BVA | Đăng nhập lại được sau 30 giây | `<Tên tester>` | ⬜ Not Run | — | — |
| TC-FR-02-013 | State Transition Testing | Đăng nhập thành công kết thúc chuỗi sai liên tiếp | `<Tên tester>` | ⬜ Not Run | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---:|
| ✅ Passed | 2 |
| ❌ Failed | 2 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 9 |
| **Tổng** | **13** |
