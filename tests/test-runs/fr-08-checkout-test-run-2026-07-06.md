# Test Run — FR-08 Checkout — 2026-07-06

## Thông tin thực thi

| Field | Value |
|---|---|
| Requirement | FR-08 — Thanh toán (Checkout) |
| Technique | State Transition Testing |
| Tester | Lâm Vĩ Khang |
| Execution date | 2026-07-06 (Asia/Ho_Chi_Minh) |
| Application URL | `http://localhost:5173` |
| Backend URL | `http://localhost:3000` |
| Browser | Chrome 149.0.7827.201 |
| OS | macOS 26.5.2 |
| Node.js | v24.18.0 |
| Build/commit | `969e156` |

## Kết quả tổng hợp

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-CHECKOUT-001 | Checkout | Lâm Vĩ Khang | Pass | — | Đăng nhập hợp lệ thiết lập phiên user; với giỏ trống user ở S1. |
| TC-CHECKOUT-002 | Checkout | Lâm Vĩ Khang | Pass | — | Đăng nhập với giỏ có iPhone 15 Pro Max và mở được Checkout; sản phẩm và tổng 30.000.000 ₫ hiển thị đúng. |
| TC-CHECKOUT-003 | Checkout | Lâm Vĩ Khang | Pass | — | Từ giỏ trống, thêm sản phẩm số lượng 1; Cart và Checkout hiển thị đúng sản phẩm, số lượng, thành tiền. |
| TC-CHECKOUT-004 | Checkout / API | Lâm Vĩ Khang | Fail | [BUG-FR08-001](../bug-reports/BUG-FR08-001.md) | Backend không tự tính tổng; dùng trực tiếp `total_amount` từ request. |
| TC-CHECKOUT-005 | Checkout / API | Lâm Vĩ Khang | Fail | [BUG-FR08-001](../bug-reports/BUG-FR08-001.md) | Payload giả mạo có thể quyết định tổng tiền đơn hàng. |
| TC-CHECKOUT-006 | Checkout | Lâm Vĩ Khang | Fail | [BUG-FR08-002](../bug-reports/BUG-FR08-002.md) | Nhánh thành công không gọi `clearCart`; backend cũng không xóa giỏ. |
| TC-CHECKOUT-007 | Checkout | Lâm Vĩ Khang | Blocked | — | Không có cấu hình, mock hoặc test hook để buộc một lần thanh toán hợp lệ trả về thất bại theo precondition. |
| TC-CHECKOUT-008 | Checkout / Auth | Lâm Vĩ Khang | Pass | — | Khi chưa đăng nhập, bấm tiến hành Checkout bị chuyển tới `/login`; API Checkout yêu cầu JWT. |
| TC-CHECKOUT-009 | Checkout / API | Lâm Vĩ Khang | Fail | [BUG-FR08-003](../bug-reports/BUG-FR08-003.md) | UI và backend không chặn Checkout khi giỏ trống. |
| TC-CHECKOUT-010 | Checkout | Lâm Vĩ Khang | Fail | [BUG-FR08-001](../bug-reports/BUG-FR08-001.md) | Tổng tiền là input `type=number`, không `readonly`/`disabled`, có thể sửa trực tiếp. |
| TC-CHECKOUT-011 | Checkout / API | Lâm Vĩ Khang | Fail | [BUG-FR08-003](../bug-reports/BUG-FR08-003.md) | Backend không kiểm tra giỏ và cho phép gửi lặp để tạo thêm đơn. |
| TC-CHECKOUT-012 | Checkout | Lâm Vĩ Khang | Fail | [BUG-FR08-002](../bug-reports/BUG-FR08-002.md) | Chuỗi không đạt hậu điều kiện S3 vì giỏ không được xóa sau thành công. |

## Thống kê

| Metric | Count |
|---|---:|
| Total | 12 |
| Pass | 4 |
| Fail | 7 |
| Blocked | 1 |
| Not Run | 0 |
| Pass rate trên test đã có kết luận Pass/Fail | 36,4% (4/11) |

## Defect summary

| Bug ID | Title | Severity | Priority | Found by | Status |
|---|---|---|---|---|---|
| [BUG-FR08-001](../bug-reports/BUG-FR08-001.md) | Client có thể sửa và quyết định tổng tiền đơn hàng | Critical | P0 | TC-004, TC-005, TC-010 | New |
| [BUG-FR08-002](../bug-reports/BUG-FR08-002.md) | Thanh toán thành công không xóa giỏ hàng | Major | P1 | TC-006, TC-012 | New |
| [BUG-FR08-003](../bug-reports/BUG-FR08-003.md) | Backend tạo đơn khi giỏ trống hoặc gửi lại Checkout | Critical | P0 | TC-009, TC-011 | New |

## Evidence và ghi chú môi trường

- Browser xác nhận luồng chưa đăng nhập bị chuyển đến `/login`.
- Browser xác nhận đăng nhập tài khoản test thành công.
- Browser xác nhận Cart chứa iPhone 15 Pro Max × 1, thành tiền 30.000.000 ₫.
- Browser xác nhận Checkout hiển thị cùng sản phẩm và tổng 30.000.000 ₫.
- DOM Checkout xác nhận tổng tiền là input số có thể chỉnh sửa.
- Các kết luận backend được đối chiếu tại endpoint `POST /api/checkout`, đúng phạm vi DevTools/API được nêu trong TC-CHECKOUT-004 và TC-CHECKOUT-005.
- Một lần đăng nhập ban đầu thất bại do backend localhost ngừng phản hồi giữa phiên; lần đó bị loại khỏi kết quả. Sau khi dữ liệu seed/API ổn định, đăng nhập lại thành công.
- GitHub CLI hiện chưa xác thực, nên các bug được lưu thành bug-report Markdown sẵn để tạo Issue; chưa có số Issue `#...`.

## Exit criteria

Không đạt. Có 2 defect Critical/P0 và 1 defect Major/P1 đang mở; cần fix, tạo PR và retest toàn bộ TC-CHECKOUT-004 đến TC-CHECKOUT-012 trước khi đóng FR-08.
