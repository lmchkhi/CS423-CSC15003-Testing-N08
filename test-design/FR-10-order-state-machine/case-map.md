# FR-10 — Ánh xạ test case

Nguồn: 14 case Domain Testing của HW02.
Yêu cầu HW04 §6: tối thiểu 12 case tự động cho feature này.
Oracle: [`sut-requirements.md`](../../sut-requirements.md) §3.

## 1. Bảng ánh xạ

| HW04 Case ID | HW02 Case ID | Category | Requirement (sut-requirements.md §3) | Automated test title | Data row | Trạng thái |
|---|---|---|---|---|---|---|
| F10-TC-001 | TC-FR10-DT-001 | state | `pending → confirmed` do Admin là chuyển đổi hợp lệ | `F10-TC-001 — Admin xác nhận đơn chờ xác nhận` | `[0]` | automated |
| F10-TC-002 | TC-FR10-DT-002 | state | `confirmed → shipping` do Admin là chuyển đổi hợp lệ | `F10-TC-002 — Admin chuyển đơn đã xác nhận sang đang giao` | `[1]` | automated |
| F10-TC-003 | TC-FR10-DT-003 | state | `shipping → delivered` do Admin là chuyển đổi hợp lệ | `F10-TC-003 — Admin hoàn tất đơn đang giao` | `[2]` | automated |
| F10-TC-004 | TC-FR10-DT-004 | state | `pending → canceled` do User là chuyển đổi hợp lệ | `F10-TC-004 — User hủy đơn đang chờ xác nhận` | `[3]` | automated |
| F10-TC-005 | TC-FR10-DT-005 | state | `confirmed → canceled` do Admin là chuyển đổi hợp lệ | `F10-TC-005 — Admin hủy đơn đã xác nhận` | `[4]` | automated |
| F10-TC-006 | TC-FR10-DT-006 | negative | Không có cạnh `pending → shipping`; mọi chuyển đổi ngoài sơ đồ phải bị chặn | `F10-TC-006 — Đơn chờ xác nhận không cho phép nhảy thẳng sang đang giao` | `[5]` | automated |
| F10-TC-007 | TC-FR10-DT-007 | negative | Không có cạnh ngược `confirmed → pending` | `F10-TC-007 — Đơn đã xác nhận không quay ngược về chờ xác nhận` | `[6]` | automated |
| F10-TC-008 | TC-FR10-DT-008 | state | `delivered` là trạng thái kết thúc | `F10-TC-008 — Đơn đã giao là trạng thái kết thúc` | `[7]` | automated |
| F10-TC-009 | TC-FR10-DT-009 | state | `canceled` là trạng thái kết thúc | `F10-TC-009 — Đơn đã hủy là trạng thái kết thúc` | `[8]` | automated |
| F10-TC-010 | TC-FR10-DT-010 | negative | Khi đơn ở `shipping`, User không được phép tự hủy | `F10-TC-010 — User không được tự hủy đơn đang giao` | `[9]` | automated |
| F10-TC-011 | TC-FR10-DT-011 | security | Chuyển trạng thái là thao tác của Admin (FR-10 + FR-12) | `F10-TC-011 — Phiên User thường không được đổi trạng thái đơn hàng` | `[10]` | automated |
| F10-TC-012 | TC-FR10-DT-012 | negative | Trạng thái chỉ thuộc 5 giá trị được đặc tả | `F10-TC-012 — Danh sách đơn chỉ hiển thị trạng thái trong miền hợp lệ` | `[11]` | automated |
| F10-TC-013 | TC-FR10-DT-014 | negative | Chỉ actor hợp lệ mới thao tác được lên đơn hàng | `F10-TC-013 — Khách chưa đăng nhập không xem và không hủy được đơn` | `[12]` | automated |
| F10-TC-014 | — (thiết kế mới HW04) | negative | FR-11: người dùng chỉ xem được đơn của chính mình | `F10-TC-014 — User chỉ nhìn thấy đơn của chính mình` | `[13]` | automated |

**Tổng: 14 case tự động** — đạt yêu cầu ≥12 của §6. 13/14 case HW02 được ánh xạ;
TC-FR10-DT-013 không automate được, lý do ghi ở
[`../not-automated.md`](../not-automated.md).

## 2. Quan sát từ recon (cơ sở chọn locator và assertion)

Recon trên bản build đang chạy, ghi lại để giải thích vì sao script được viết như
hiện tại — mọi mô tả đều là hành vi quan sát được từ giao diện.

**2.1. Nhãn trạng thái tiếng Việt.** `pending` → `Chờ xác nhận`, `confirmed` →
`Đã xác nhận`, `shipping` → `Đang giao`, `delivered` → `Đã giao`, `canceled` →
`Đã hủy`. Đây là bộ nhãn F10-TC-012 dùng làm miền hợp lệ.

**2.2. Admin không dùng `<select>` mà dùng nút hành động.** Kế hoạch ban đầu giả
định ô chọn trạng thái; thực tế mỗi dòng đơn có một nhóm nút, và **tập nút được
hiển thị chính là tập chuyển đổi mà hệ thống cho phép** ở trạng thái đó:

| Trạng thái | Nút phía Admin | Nút phía User |
|---|---|---|
| Chờ xác nhận | `Xác nhận`, `Hủy` | `Hủy đơn` |
| Đã xác nhận | `Giao hàng`, `Hủy` | `Hủy đơn` |
| Đang giao | `Hoàn thành` | `Hủy đơn` |
| Đã giao | *(không có nút)* | *(không có nút)* |
| Đã hủy | `Đánh dấu Đã giao` | *(không có nút)* |

Vì vậy các case "chuyển đổi không hợp lệ" (F10-TC-006, -007, -008, -009) được
assert bằng **tập nút của dòng phải khớp chính xác** với tập chuyển đổi hợp lệ
theo oracle. Đây là cách kiểm chứng state machine qua UI mà không cần gọi API:
nếu giao diện chào mời một chuyển đổi ngoài sơ đồ thì đó đã là vi phạm.

**2.3. Trang lịch sử đơn của User nằm ở `/profile`, không phải `/orders`.**
Route `/orders` không tồn tại ở frontend web. Admin cũng không điều hướng bằng
URL: `:5174/orders` vẫn render Dashboard, phải bấm mục `Đơn hàng` ở sidebar.

**2.4. Khoá lưu token của hai origin khác nhau.** Shop dùng `token`, admin dùng
`adminToken`. Fixture phải seed đúng khoá cho từng origin.

## 3. Ngoại lệ có chủ ý ở F10-TC-011

HW02 phát hiện BUG-FR10-003 bằng cách gọi endpoint đổi trạng thái từ DevTools
của chính phiên User đã đăng nhập. Giao diện web không có nút nào để tái hiện,
nên case này được giữ nguyên cách tái hiện của HW02: thao tác phát đi **từ trong
phiên trình duyệt của User** (dùng đúng token mà trình duyệt đang giữ), rồi kiểm
chứng kết quả **trên giao diện lịch sử đơn hàng** của User đó.

Đây là ngoại lệ duy nhất của quy ước "API chỉ dùng để setup": bản thân ranh giới
phân quyền là đối tượng kiểm thử, và nó chỉ quan sát được ở tầng đó. Kết quả vẫn
được đọc bằng UI nên case không rời khỏi phạm vi hộp đen.

## 4. Case dự kiến FAIL vì lỗi thật của SUT

Các case dưới đây assert đúng theo oracle nhưng bản build hiện tại vi phạm.
Chúng **giữ nguyên trạng thái fail**, đã xác nhận lại trên bản build hiện tại
ngày 08/08/2026 ở cả 3 trình duyệt, và có bug report HW04 riêng ở
[`../../bug-reports/`](../../bug-reports/).

| Case | Vi phạm quan sát được | Bug HW02 tương ứng | Bug report HW04 |
|---|---|---|---|
| F10-TC-009 | Đơn `Đã hủy` vẫn được chào mời nút `Đánh dấu Đã giao`, bấm vào thì đơn chuyển thành `Đã giao` | BUG-FR10-001 | [`BUG-FR10-001`](../../bug-reports/BUG-FR10-001.md) |
| F10-TC-010 | Đơn `Đang giao` vẫn hiện nút `Hủy đơn` cho User, bấm vào thì hủy thành công | BUG-FR10-002 | [`BUG-FR10-002`](../../bug-reports/BUG-FR10-002.md) |
| F10-TC-011 | Phiên User thường đổi được trạng thái đơn hàng qua endpoint quản trị | BUG-FR10-003 | [`BUG-FR10-003`](../../bug-reports/BUG-FR10-003.md) |
