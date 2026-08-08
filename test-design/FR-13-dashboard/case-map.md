# FR-13 — Ánh xạ test case

Nguồn: 6 case Domain Testing của HW02. 1/6 không automate được (xem
[`../not-automated.md`](../not-automated.md)), còn lại 5 case được mang sang.
Yêu cầu HW04 §6: tối thiểu 12 case tự động cho feature này — 7 case còn thiếu
được **thiết kế mới trong HW04** (cột HW02 Case ID ghi `—`).
Oracle: [`sut-requirements.md`](../../sut-requirements.md) §4.

## 1. Bảng ánh xạ

| HW04 Case ID | HW02 Case ID | Category | Requirement (sut-requirements.md §4) | Automated test title | Data row | Trạng thái |
|---|---|---|---|---|---|---|
| F13-TC-001 | TC-FR13-DT-002 | positive | Doanh thu = tổng `total_amount` của đơn `delivered` | `F13-TC-001 — Doanh thu tăng đúng total_amount của một đơn delivered` | `[0]` | automated |
| F13-TC-002 | TC-FR13-DT-003 | positive | Doanh thu cộng dồn nhiều đơn `delivered` | `F13-TC-002 — Doanh thu cộng dồn đúng khi có nhiều đơn delivered` | `[1]` | automated |
| F13-TC-003 | TC-FR13-DT-004 | state | Chỉ đơn `delivered` được tính, kể cả khi dữ liệu lẫn nhiều trạng thái | `F13-TC-003 — Doanh thu chỉ tính đơn delivered khi dữ liệu có nhiều trạng thái khác nhau` | `[2]` | automated |
| F13-TC-004 | TC-FR13-DT-005 | negative | Không có đơn `delivered` → doanh thu không đổi | `F13-TC-004 — Doanh thu không đổi khi không có đơn delivered nào` | `[3]` | automated |
| F13-TC-005 | TC-FR13-DT-006 | security | FR-12: phân hệ Admin chỉ dành cho `role = admin` | `F13-TC-005 — Người dùng không có quyền Admin không xem được Dashboard` | `[4]` | automated |
| F13-TC-006 | — (thiết kế mới HW04) | positive | Dashboard hiển thị đúng doanh thu/số đơn hiện có (oracle tổng quát, không cần seed) | `F13-TC-006 — Dashboard phản ánh đúng doanh thu và số đơn hiện có mà không cần tạo thêm dữ liệu` | `[5]` | automated |
| F13-TC-007 | — (thiết kế mới HW04) | boundary | Đơn `pending` không được cộng vào doanh thu | `F13-TC-007 — Doanh thu không đổi khi thêm một đơn pending` | `[6]` | automated |
| F13-TC-008 | — (thiết kế mới HW04) | boundary | Đơn `canceled` không được cộng vào doanh thu | `F13-TC-008 — Doanh thu không đổi khi thêm một đơn canceled` | `[7]` | automated |
| F13-TC-009 | — (thiết kế mới HW04) | boundary | Đơn `shipping` không được cộng vào doanh thu | `F13-TC-009 — Doanh thu không đổi khi thêm một đơn shipping` | `[8]` | automated |
| F13-TC-010 | — (thiết kế mới HW04) | state | Doanh thu cập nhật ngay khi một đơn chuyển sang `delivered` | `F13-TC-010 — Doanh thu tăng đúng total_amount ngay khi một đơn chuyển sang delivered` | `[9]` | automated |
| F13-TC-011 | — (thiết kế mới HW04) | boundary | Tổng số đơn hàng tính mọi trạng thái, không lọc theo `delivered` | `F13-TC-011 — Tổng số đơn hàng tính đủ mọi trạng thái, không chỉ delivered` | `[10]` | automated |
| F13-TC-012 | — (thiết kế mới HW04) | security | FR-12: phân hệ Admin yêu cầu token JWT hợp lệ | `F13-TC-012 — Phiên chưa đăng nhập không xem được Dashboard` | `[11]` | automated |

**Tổng: 12 case tự động** — đạt yêu cầu ≥12 của §6. 5/6 case HW02 được ánh xạ;
TC-FR13-DT-001 không automate được, lý do ghi ở
[`../not-automated.md`](../not-automated.md). 7 case còn lại (F13-TC-006 đến
F13-TC-012) là công việc thiết kế mới của HW04, không tồn tại ở HW02.

## 2. Vì sao không có case nào hardcode số liệu kỳ vọng

Bộ suite chạy `workers: 1` trên một file SQLite duy nhất, dùng chung cho cả 9
cell của ma trận 3×3 — khi feature này chạy, dữ liệu đơn hàng do FR-02/FR-10 để
lại (và do các case FR-13 trước đó trong cùng lượt chạy) vẫn còn nguyên. Vì
vậy **không case nào so khớp với một con số cố định**: mỗi case đọc số dư
(`baseline`) qua API ngay trước khi tạo dữ liệu riêng của mình, rồi so Dashboard
với `baseline + phần mà chính case đó vừa thêm vào`. Đây là lý do
`test-data/fr-13-dashboard.cases.json` chỉ mô tả **những trạng thái đơn hàng
cần tạo** (`seedOrders`, `promoteTo`), không mô tả con số doanh thu/số đơn kỳ
vọng.

## 3. Quan sát từ recon

**3.1. Nhãn hiển thị.** Card doanh thu có tiêu đề `Tổng doanh thu (Delivered)`,
giá trị dạng `"<số> ₫"` (không có dấu phân cách nghìn ở dữ liệu nhỏ, chưa quan
sát được ở số lớn). Card số đơn có tiêu đề `Tổng số đơn hàng`, giá trị là số
nguyên trần. Cả hai tiêu đề là thẻ `<h3>`, giá trị là thẻ `<p>` ngay bên trong
cùng khối `div` — không có `role` hay `data-testid` riêng cho giá trị.

**3.2. Không có định tuyến theo URL.** Admin app là một trang duy nhất, ẩn/hiện
theo việc có token hay không: có token hợp lệ trong `localStorage` (khoá
`adminToken`, giống FR-10) thì hiện heading `Dashboard`; không có token thì
hiện form đăng nhập với heading `Admin Login`. Vì vậy các case FR-12 không thể
assert bằng URL — phải assert bằng heading nào đang hiển thị.

**3.3. Phát hiện quan trọng khi recon case F13-TC-005.** Bơm thẳng token của
một tài khoản `role = 'user'` vào `localStorage` rồi mở app admin: Dashboard
**vẫn hiển thị bình thường**, không quay về form đăng nhập. Gọi thẳng
`GET /api/admin/orders` với cùng token đó cũng trả về `200` (mảng đơn hàng),
không phải lỗi từ chối quyền. Đây là vi phạm quan sát được của §4 (dẫn theo
FR-12: "Tất cả API Admin ... đều phải yêu cầu ... role = 'admin' trong
Token") — F13-TC-005 được giữ nguyên assertion đúng theo oracle nên sẽ FAIL,
xem mục 4.

## 4. Case dự kiến FAIL vì lỗi thật của SUT

Điền sau khi chạy Task 12/13 trên build hiện tại; xem
[`../../bug-reports/`](../../bug-reports/) cho báo cáo lỗi tương ứng.
