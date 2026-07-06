# Báo cáo tổng hợp test case và bug

Phạm vi: 23127300 - Hà Bảo Ngọc

## Tổng quan số lượng test case

Tổng cộng có **50 test case** được tạo trong phạm vi báo cáo.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng ký tài khoản | FR-01 | Decision Table Testing, Pairwise + Decision Table Testing | 15 |
| Đăng nhập và khóa tài khoản | FR-02 | Domain Testing, Boundary Value Analysis | 15 |
| Thanh toán | FR-08 | Use Case Testing | 6 |
| Trạng thái đơn hàng | FR-10 | State Transition Testing | 14 |
| **Tổng** | 4 FR | 5 nhóm kỹ thuật | **50** |

## Coverage của test case

Bộ test hiện bao phủ bốn feature requirement chính:

- **FR-01 - Đăng ký tài khoản:** bao phủ luồng đăng ký thành công, thiếu họ tên, thiếu email, email sai định dạng, email trùng, thiếu mật khẩu, mật khẩu yếu, thiếu xác nhận mật khẩu và xác nhận mật khẩu không khớp. Ngoài các rule chính của decision table, bộ test còn có nhóm pairwise để kiểm tra thêm các tổ hợp lỗi đầu vào.
- **FR-02 - Đăng nhập và khóa tài khoản:** bao phủ đăng nhập hợp lệ, email sai định dạng hoặc không tồn tại, thiếu email/mật khẩu, đăng nhập sai dưới ngưỡng khóa, khóa tài khoản tại/vượt ngưỡng 3 lần sai, đăng nhập khi đang bị khóa, và các mốc biên thời gian 29/30/31 giây sau khi khóa.
- **FR-08 - Thanh toán:** bao phủ yêu cầu người dùng phải đăng nhập, API thanh toán phải có token hợp lệ, màn hình thanh toán phải hiển thị đủ sản phẩm, tổng tiền phải tự tính và không cho chỉnh sửa trực tiếp, backend không được tin `total_amount` từ client, và giỏ hàng phải được xóa sau khi thanh toán thành công.
- **FR-10 - Trạng thái đơn hàng:** bao phủ trạng thái khởi đầu `pending`, các chuyển đổi hợp lệ, các nhánh hủy hợp lệ, chuyển tắt không hợp lệ, ràng buộc user không được hủy đơn khi đang `shipping`, và hai trạng thái kết thúc `delivered`/`canceled`.

## Trạng thái test case

| Chức năng | Passed | Failed | Not Run | Tổng |
|---|---:|---:|---:|---:|
| Đăng ký tài khoản | 9 | 6 | 0 | 15 |
| Đăng nhập và khóa tài khoản | 6 | 9 | 0 | 15 |
| Thanh toán | 0 | 0 | 6 | 6 |
| Trạng thái đơn hàng | 0 | 2 | 12 | 14 |
| **Tổng** | **15** | **17** | **18** | **50** |

Ghi chú: với chức năng thanh toán, trạng thái trong test case hiện vẫn là `Not Run / None`. Tuy nhiên, đã có 3 bug report liên kết với `TC-CHECKOUT-UCT-004`, `TC-CHECKOUT-UCT-005` và `TC-CHECKOUT-UCT-006`, nên phần bug bên dưới vẫn ghi nhận các bug thanh toán đã được tạo.

## Tổng quan bug

Trong phạm vi báo cáo có **16 bug** liên quan trực tiếp đến các test case đã chọn.

| Requirement | Chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-01 | Đăng ký tài khoản | 6 | 6 Major |
| FR-02 | Đăng nhập và khóa tài khoản | 5 | 1 Critical, 3 High, 1 Low |
| FR-08 | Thanh toán | 3 | 1 Critical, 2 Major |
| FR-10 | Trạng thái đơn hàng | 2 | 2 Major |
| **Tổng** |  | **16** | **2 Critical, 3 High, 10 Major, 1 Low** |

## Bug coverage theo requirement

### FR-01 - Đăng ký tài khoản

Có **6 bug**, tất cả đều có severity **Major**:

- `BUG-REGISTER-001`: mật khẩu hợp lệ theo FR-01 vẫn bị từ chối khi đăng ký thành công.
- `BUG-REGISTER-002`: email sai định dạng không được validate đúng theo FR-01.
- `BUG-REGISTER-003`: hệ thống không ngăn đăng ký bằng email đã tồn tại.
- `BUG-REGISTER-004`: form đăng ký thiếu trường xác nhận mật khẩu.
- `BUG-REGISTER-005`: hệ thống không validate trường hợp xác nhận mật khẩu không khớp.
- `BUG-REGISTER-006`: một tổ hợp pairwise invalid không được validate nhất quán.

### FR-02 - Đăng nhập và khóa tài khoản

Có **5 bug** với severity gồm **1 Critical**, **3 High** và **1 Low**:

- `BUG-FR02-001` - Critical: API đăng nhập trả về mật khẩu người dùng ở dạng không mã hóa.
- `BUG-FR02-002` - High: form đăng nhập dùng sai input type cho email và mật khẩu.
- `BUG-FR02-003` - High: tài khoản bị khóa sau 2 lần nhập sai mật khẩu, sớm hơn ngưỡng yêu cầu.
- `BUG-FR02-004` - Low: frontend không hiển thị đúng thông báo tài khoản bị khóa từ backend.
- `BUG-FR02-005` - High: thời gian khóa kéo dài khoảng 180 giây thay vì 30 giây.

### FR-08 - Thanh toán

Có **3 bug** với severity gồm **1 Critical** và **2 Major**:

- `BUG-CHECKOUT-001` - Major: tổng tiền thanh toán có thể chỉnh sửa trực tiếp trên UI.
- `BUG-CHECKOUT-002` - Critical: backend chấp nhận `total_amount` do client gửi lên.
- `BUG-CHECKOUT-003` - Major: giỏ hàng không được xóa sau khi thanh toán thành công.

### FR-10 - Trạng thái đơn hàng

Có **2 bug**, cả hai đều có severity **Major**:

- `BUG-ORDER-STT-001`: user vẫn hủy được đơn hàng đang ở trạng thái `shipping`.
- `BUG-ORDER-STT-002`: admin chuyển được đơn hàng đã `canceled` sang `delivered`.
