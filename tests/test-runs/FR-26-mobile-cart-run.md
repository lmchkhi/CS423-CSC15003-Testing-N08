# Test Run: FR-26 — Giỏ hàng trên Mobile

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-26: Giỏ hàng trên Mobile |
| **Ngày thực thi** | 01/07/2026 |
| **Môi trường** | Device: iPhone 13 Pro · OS: iOS 18.6.2 · App runtime: Expo Go client 1017756 · Supported SDK: 54 · API_URL: `http://192.168.2.69:3000/api` |
| **Build / Commit** | `4d6dbcf` |
| **Tester** | Người dùng tự thực thi |
| **Evidence** | Actual Result do người dùng cung cấp trong prompt ngày 01/07/2026 |

> **Ghi chú phạm vi:** Người dùng ghi "FR-02" trong prompt, nhưng toàn bộ test case BVA/DT được cung cấp và artifact hiện có thuộc `FR-26-mobile-cart`. Test run này cập nhật theo đúng Requirement ID trong test case: FR-26.

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR26-DT-001 | Hiển thị danh sách sản phẩm trong giỏ hàng với đủ thông tin trên Mobile | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-DT-002 | Hiển thị đúng nhãn Đơn giá trong giỏ hàng trên Mobile | Người dùng tự thực thi | Fail | [BUG-FR26-001](../../bug-reports/BUG-FR26-001.md) | Actual Result: nhãn hiển thị là "Giá", khác Expected Result yêu cầu "Đơn giá". |
| TC-FR26-DT-003 | Cột Số lượng có nút + và nút - để chỉnh | Người dùng tự thực thi | Fail | [BUG-FR26-002](../../bug-reports/BUG-FR26-002.md) | Actual Result: không có nút +/-, người dùng chỉnh số lượng bằng bàn phím. |
| TC-FR26-DT-004 | Bấm nút + để tăng số lượng sản phẩm | Người dùng tự thực thi | Fail | [BUG-FR26-002](../../bug-reports/BUG-FR26-002.md), [BUG-FR26-005](../../bug-reports/BUG-FR26-005.md) | Actual Result: không có nút tăng; tổng tiền hiển thị nhãn "Tổng tạm tính" thay vì "Tổng cộng". |
| TC-FR26-DT-005 | Bấm nút - để giảm số lượng sản phẩm | Người dùng tự thực thi | Fail | [BUG-FR26-002](../../bug-reports/BUG-FR26-002.md), [BUG-FR26-005](../../bug-reports/BUG-FR26-005.md) | Actual Result: không có nút giảm; tổng tiền hiển thị nhãn "Tổng tạm tính" thay vì "Tổng cộng". |
| TC-FR26-DT-006 | Thêm cùng sản phẩm vào giỏ làm tăng số lượng, không tạo dòng mới | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-DT-007 | Nút xóa sản phẩm hiển thị dialog xác nhận trước khi xóa | Người dùng tự thực thi | Fail | [BUG-FR26-003](../../bug-reports/BUG-FR26-003.md) | Actual Result: không có dialog xác nhận. |
| TC-FR26-DT-008 | Xác nhận xóa sản phẩm khỏi giỏ hàng | Người dùng tự thực thi | Fail | [BUG-FR26-003](../../bug-reports/BUG-FR26-003.md) | Actual Result: không có dialog xác nhận trước khi xóa. |
| TC-FR26-DT-009 | Hủy xóa sản phẩm trong dialog xác nhận | Người dùng tự thực thi | Fail | [BUG-FR26-003](../../bug-reports/BUG-FR26-003.md) | Actual Result: không có dialog xác nhận nên không thể thực hiện nhánh hủy theo Expected Result. |
| TC-FR26-DT-010 | Nút Tiếp tục mua sắm quay về trang chủ trên Mobile | Người dùng tự thực thi | Fail | [BUG-FR26-004](../../bug-reports/BUG-FR26-004.md) | Actual Result: nút hiển thị "Mua tiếp"; dữ liệu giỏ hàng không bị xóa hoặc thay đổi. Label khác Expected Result yêu cầu "Tiếp tục mua sắm". |
| TC-FR26-DT-011 | Nhãn tổng tiền hiển thị đúng là Tổng cộng | Người dùng tự thực thi | Fail | [BUG-FR26-005](../../bug-reports/BUG-FR26-005.md) | Actual Result: màn hình hiển thị nhãn "Tổng tạm tính", khác Expected Result yêu cầu "Tổng cộng". |
| TC-FR26-DT-012 | Giỏ hàng trống hiển thị hình minh họa và thông báo rõ ràng | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-DT-013 | Thành tiền bằng Đơn giá nhân Số lượng | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-DT-014 | Thêm nhiều sản phẩm khác nhau hiển thị nhiều dòng riêng biệt | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR26-BVA-001 | Số lượng dòng giỏ hàng bằng 1 tại biên dưới | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-BVA-002 | Không cho dòng giỏ hàng tồn tại với số lượng 0 | Người dùng tự thực thi | Fail | [BUG-FR26-003](../../bug-reports/BUG-FR26-003.md) | Actual Result: không có dialog; sau khi nhấn xóa, sản phẩm biến mất. Expected Result yêu cầu có dialog xác nhận trước nếu thao tác giảm từ 1 dẫn tới xóa sản phẩm. |
| TC-FR26-BVA-003 | Số lượng dòng giỏ hàng tăng lên 2 ngay trên biên dưới | Người dùng tự thực thi | Fail | [BUG-FR26-002](../../bug-reports/BUG-FR26-002.md) | Actual Result: không có nút cộng để tăng số lượng theo bước test. |
| TC-FR26-BVA-004 | Giỏ hàng có 0 dòng sản phẩm tại biên empty | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |
| TC-FR26-BVA-005 | Giỏ hàng có 1 dòng sản phẩm ngay trên biên empty | Người dùng tự thực thi | Pass | None | Actual Result: giống Expected Result. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---:|
| Passed | 8 |
| Failed | 11 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **19** |

> **Ghi chú:** Các test case `Fail` đã được liên kết đến bug report tương ứng trong `bug-reports/`.
