# FR-11: Xem lịch sử đơn hàng

## Nguồn cần đọc

- `SystemRequirementsSpecification.md`, mục FR-11 và FR-10 nếu cần trạng thái đơn hàng.
- `api_specification.md`, endpoint `GET /api/orders/my-orders` và `GET /api/orders/:id`.
- `tests/test-cases/FR-11-order-history`.
- `tests/test-runs/FR-11-order-history-run.md`.
- `bug-reports/BUG-FR11-*.md` khi automation phát hiện lại defect.

## Requirement oracle

- User chỉ xem được đơn hàng của chính mình.
- Lịch sử đơn hàng hiển thị mã đơn, ngày đặt, tổng tiền, trạng thái hiện tại.
- Trạng thái phải dịch sang tiếng Việt rõ ràng.
- Trạng thái phải được phân biệt bằng màu sắc.
- Guest chưa đăng nhập phải bị chặn hoặc bị chuyển về đăng nhập.

## API liên quan

- `POST /api/login` để lấy token user.
- `GET /api/orders/my-orders` để đối chiếu danh sách cá nhân.
- `GET /api/orders/:id` để kiểm tra quyền xem chi tiết một đơn, đặc biệt case truy cập đơn của user khác.

## Case nên ưu tiên tự động hóa

- Domain: TC-FR11-DT-001 đến TC-FR11-DT-012.
- BVA: TC-FR11-BVA-001 đến TC-FR11-BVA-003 nếu cần bổ sung count boundary.
- Đảm bảo trong 12 case có: logged-in có đơn, guest bị chặn, empty state, nhiều đơn, không lộ đơn user khác, mã đơn, ngày đặt, tổng tiền, dịch trạng thái, màu trạng thái.

## Bug đã biết từ HW02

- `GET /api/orders/:id` có thể cho user xem đơn của người khác.
- Một số trạng thái có màu quá giống nhau, không đạt yêu cầu phân biệt màu sắc.

Với order data khó kiểm soát qua UI, dùng API để setup hoặc verify nhưng vẫn kiểm UI khi case nói về hiển thị.
