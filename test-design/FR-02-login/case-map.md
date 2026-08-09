# FR-02 — Ánh xạ test case

Nguồn: 15 case thủ công của HW02 (9 Domain Testing + 6 BVA).
Yêu cầu HW04 §6: tối thiểu 12 case tự động cho feature này.
Oracle: [`sut-requirements.md`](../../sut-requirements.md) §2.

## 1. Bảng ánh xạ

| HW04 Case ID | HW02 Case ID | Category | Requirement (sut-requirements.md §2) | Automated test title | Data row | Trạng thái |
|---|---|---|---|---|---|---|
| F02-TC-001 | TC-FR02-DT-001 | positive | Đăng nhập thành công trả về JWT, token lưu phía client | `F02-TC-001 — Đăng nhập thành công với tài khoản hợp lệ` | `[0]` | automated |
| F02-TC-002 | TC-FR02-DT-002 | negative | Trường email phải dùng `type="email"` (validate HTML5) | `F02-TC-002 — Email sai định dạng bị chặn bởi validate HTML5` | `[1]` | automated |
| F02-TC-003 | TC-FR02-DT-003 | negative | Thông báo lỗi không để lộ chi tiết nguyên nhân | `F02-TC-003 — Từ chối email đúng định dạng nhưng không tồn tại` | `[2]` | automated |
| F02-TC-004 | TC-FR02-DT-004, TC-FR02-BVA-001 | boundary | Chỉ khóa khi sai **từ 3 lần trở lên** liên tiếp | `F02-TC-004 — Sai 2 lần liên tiếp chưa khóa — mật khẩu đúng vẫn vào được` | `[3]` | automated |
| F02-TC-005 | TC-FR02-DT-005, TC-FR02-BVA-002 | state | Sai ≥3 lần liên tiếp → tạm khóa 30 giây | `F02-TC-005 — Khóa tài khoản sau 3 lần sai liên tiếp` | `[4]` | automated |
| F02-TC-006 | TC-FR02-DT-006 | state | Trong thời gian khóa, mật khẩu đúng vẫn bị từ chối | `F02-TC-006 — Từ chối mật khẩu đúng khi tài khoản đang bị khóa` | `[5]` | automated |
| F02-TC-007 | TC-FR02-BVA-004 | boundary | Khóa kéo dài 30 giây (mốc 29s vẫn còn khóa) | `F02-TC-007 — Sau 29 giây tài khoản vẫn còn bị khóa` | `[6]` | automated |
| F02-TC-008 | TC-FR02-BVA-005, TC-FR02-BVA-006 | boundary | Hết 30 giây thì mở khóa | `F02-TC-008 — Sau 31 giây hết khóa — đăng nhập lại được` | `[7]` | automated |
| F02-TC-009 | TC-FR02-DT-008 | negative | Form không chấp nhận đăng nhập khi thiếu dữ liệu bắt buộc | `F02-TC-009 — Từ chối đăng nhập khi bỏ trống email` | `[8]` | automated |
| F02-TC-010 | TC-FR02-DT-009 | negative | Form không chấp nhận đăng nhập khi thiếu dữ liệu bắt buộc | `F02-TC-010 — Từ chối đăng nhập khi bỏ trống mật khẩu` | `[9]` | automated |
| F02-TC-011 | TC-FR02-BVA-003 | boundary | Vượt ngưỡng 3 lần sai vẫn giữ trạng thái khóa | `F02-TC-011 — Vượt ngưỡng 3 lần sai — lần thử thứ 4 vẫn bị từ chối` | `[10]` | automated |
| F02-TC-012 | TC-FR02-DT-001 (qua BUG-FR02-001) | security | Đăng nhập thành công trả về JWT — không kèm dữ liệu nhạy cảm | `F02-TC-012 — Response đăng nhập không được chứa mật khẩu người dùng` | `[11]` | automated |
| F02-TC-013 | — (thiết kế mới HW04) | security | Đăng nhập chỉ thành công với thông tin đăng nhập hợp lệ | `F02-TC-013 — Chuỗi SQL injection ở email không vượt qua xác thực` | `[12]` | automated |
| F02-TC-014 | — (thiết kế mới HW04) | negative | Thông báo lỗi không để lộ chi tiết nguyên nhân | `F02-TC-014 — Thông báo lỗi giống nhau cho email không tồn tại và mật khẩu sai` | `[13]` | automated |

**Tổng: 14 case tự động** — đạt yêu cầu ≥12 của §6. Toàn bộ 15 case HW02 đều
được ánh xạ; TC-FR02-DT-004 gộp vào F02-TC-004 và TC-FR02-BVA-006 gộp vào
F02-TC-008 vì trùng nhau về ngữ nghĩa (cùng điều kiện biên, cùng oracle).

## 2. Quyết định khi review (HW04 §6 — human review)

**2.1. Không mã hoá lại BUG-FR02-004 thành assertion.**
HW02 ghi nhận frontend chỉ hiện `Đăng nhập thất bại. Vui lòng kiểm tra lại.`
trong khi backend trả về `Tài khoản đã bị khóa. Vui lòng thử lại sau.`. Nhưng
oracle §2 yêu cầu *"không để lộ chi tiết nguyên nhân"* — một thông báo chung
chung **thoả mãn** yêu cầu đó. Vì vậy các case về khóa tài khoản chỉ assert
đúng điều oracle nói: đăng nhập **bị từ chối**, không sinh token, người dùng vẫn
ở `/login`. Assert nội dung thông báo cụ thể sẽ mâu thuẫn với chính yêu cầu
không tiết lộ nguyên nhân.

**2.2. Chỉ tách nửa được oracle bảo chứng của BUG-FR02-002.**
Bug này gộp hai quan sát: ô email dùng `type="text"`, và ô mật khẩu cũng dùng
`type="text"`. Oracle §2 chỉ quy định *"Trường email phải dùng `type="email"`"*
và **không nói gì** về kiểu của ô mật khẩu. Theo nguyên tắc "requirement im lặng
thì không phải bug", chỉ nửa về ô email trở thành assertion (F02-TC-002). Quan
sát về ô mật khẩu được ghi ở [`../not-automated.md`](../not-automated.md) như
một phát hiện không có oracle bảo chứng.

**2.3. Mọi case có ít nhất một lần nhập sai đều dùng tài khoản throwaway.**
Recon cho thấy tài khoản bị từ chối ngay ở lần thử thứ 3, tức khóa được áp dụng
chỉ sau **2** lần sai; HW02 đo thời gian khóa kéo dài tới ~180 giây. Nếu dùng
chung `test@eshop.com`, một case sai mật khẩu sẽ khóa tài khoản dùng chung trong
phần còn lại của ma trận. Vì vậy chỉ F02-TC-001 dùng tài khoản seed; mọi case
còn lại tự đăng ký tài khoản riêng qua `POST /api/register`.

## 3. Case dự kiến FAIL vì lỗi thật của SUT

Các case dưới đây assert đúng theo oracle nhưng bản build hiện tại vi phạm.
Chúng **giữ nguyên trạng thái fail**, đã xác nhận lại trên bản build hiện tại
ngày 08/08/2026 ở cả 3 trình duyệt, và có bug report HW04 riêng ở
[`../../bug-reports/`](../../bug-reports/).

| Case | Vi phạm quan sát được | Bug HW02 tương ứng | Bug report HW04 |
|---|---|---|---|
| F02-TC-002 | Ô email dùng `type="text"`, trình duyệt không validate định dạng | BUG-FR02-002 | [`BUG-FR02-001`](../../bug-reports/BUG-FR02-001.md) |
| F02-TC-004 | Tài khoản đã bị khóa khi mới sai 2 lần liên tiếp | BUG-FR02-003 | [`BUG-FR02-002`](../../bug-reports/BUG-FR02-002.md) |
| F02-TC-008 | Sau 31 giây tài khoản vẫn còn khóa (HW02 đo ~180 giây) | BUG-FR02-005 | [`BUG-FR02-003`](../../bug-reports/BUG-FR02-003.md) |
| F02-TC-012 | Response `/api/login` trả về trường `password` dạng plaintext | BUG-FR02-001 | [`BUG-FR02-004`](../../bug-reports/BUG-FR02-004.md) |
