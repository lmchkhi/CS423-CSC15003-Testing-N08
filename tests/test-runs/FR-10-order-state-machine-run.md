# Test Run: FR-10 - Trạng thái Đơn hàng

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-10: Trạng thái Đơn hàng (Order State Machine) |
| **Ngày thực thi** | 01/07/2026 |
| **Môi trường** | Browser: Chrome Version 149.0.7827.103 · OS: macOS Tahoe 26.5.1 · URL: Backend `http://localhost:3000`; Frontend Admin `http://localhost:5174/`; Frontend Web `http://localhost:5173/` |
| **Build / Commit** | `31a3053` |
| **Tester** | Người dùng cung cấp kết quả execution |
| **Nguồn evidence** | `bug-reports/screenshots/` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR10-DT-001 | Admin xác nhận đơn hàng đang chờ xử lý | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-002 | Admin chuyển đơn hàng đã xác nhận sang đang giao | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-003 | Admin hoàn tất đơn hàng đang giao | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-004 | User hủy đơn hàng đang chờ xử lý | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-005 | Admin hủy đơn hàng đã xác nhận | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-006 | Từ chối Admin chuyển đơn hàng từ đang chờ xử lý thẳng sang đang giao | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-007 | Từ chối Admin chuyển đơn hàng đã xác nhận về đang chờ xử lý | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-008 | Từ chối chuyển trạng thái từ đơn hàng đã giao | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-009 | Từ chối chuyển trạng thái từ đơn hàng đã hủy | Người dùng | Failed | [BUG-FR10-001](../../bug-reports/BUG-FR10-001.md) | Actual Result: Đơn hàng đã ở trạng thái kết thúc `canceled` nhưng UI vẫn hiện nút đánh dấu đã giao; khi click thì báo thành công và đơn hàng bị chuyển sang `delivered`. Backend chặn đúng các chuyển đổi trạng thái khác nhưng để lọt trường hợp `canceled` -> `delivered`. Evidence: `bug-reports/screenshots/TC-FR10-DT-009-canceled-state.png`, `bug-reports/screenshots/TC-FR10-DT-009-canceled-to-delivered.png`. |
| TC-FR10-DT-010 | Từ chối User tự hủy đơn hàng đang giao | Người dùng | Failed | [BUG-FR10-002](../../bug-reports/BUG-FR10-002.md) | Actual Result: Đơn hàng đang ở trạng thái `shipping` nhưng giao diện vẫn hiển thị nút "Hủy đơn"; khi User bấm vào, hệ thống cho phép hủy thành công và đổi trạng thái sang `canceled`, vi phạm quy định User không được tự hủy đơn đang giao. Evidence: `bug-reports/screenshots/TC-FR10-DT-010-shipping-shows-cancel.png`, `bug-reports/screenshots/TC-FR10-DT-010-cancel-success.png`. |
| TC-FR10-DT-011 | Từ chối User xác nhận đơn hàng đang chờ xử lý | Người dùng | Failed | [BUG-FR10-003](../../bug-reports/BUG-FR10-003.md) | Actual Result: Endpoint cập nhật trạng thái đơn hàng `PUT /api/admin/orders/:id/status` không kiểm tra quyền Admin. User thường lấy token gọi API qua DevTools vẫn có thể thay đổi trạng thái đơn hàng của bất kỳ ai; API trả về HTTP 200 thành công. Evidence: `bug-reports/screenshots/TC-FR10-DT-011-user-calls-admin-api.png`. |
| TC-FR10-DT-012 | Từ chối trạng thái đích ngoài domain | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-013 | Từ chối xử lý đơn hàng có trạng thái hiện tại ngoài domain | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |
| TC-FR10-DT-014 | Từ chối actor chưa đăng nhập hủy đơn hàng | Người dùng | Passed | None | Actual Result giống Expected Result theo xác nhận của người dùng. |

### Boundary Value Analysis (BVA)

Không có test case BVA cho FR-10 trong thư mục hiện tại. FR-10 là state machine theo trạng thái và quyền actor, không có biên số/ngày/độ dài để thực thi bằng BVA.

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---:|
| Passed | 11 |
| Failed | 3 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **14** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue hoặc bug report nội bộ) hoặc lý do rõ ràng trong cột **Note**.
