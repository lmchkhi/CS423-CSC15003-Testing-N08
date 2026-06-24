# Test Run: FR-07 — Giỏ hàng (Shopping Cart)

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-07: Giỏ hàng (Shopping Cart) |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | Browser: Zen Browser 1.21.3b (Firefox 152.0.1) · OS: Fedora 44 · URL: http://localhost:5173 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-07-001 | Domain Testing | Hiển thị giỏ hàng với 1 sản phẩm — kiểm tra đầy đủ các cột | | ⬜ Not Run | — | — |
| TC-FR-07-002 | Domain Testing | Kiểm tra tên cột "Đơn giá" hiển thị đúng | | ⬜ Not Run | — | — |
| TC-FR-07-003 | Domain Testing | Kiểm tra cột Số lượng có nút +/- để chỉnh | | ⬜ Not Run | — | — |
| TC-FR-07-004 | Domain Testing | Bấm nút + để tăng số lượng sản phẩm | | ⬜ Not Run | — | — |
| TC-FR-07-005 | Domain Testing | Bấm nút - để giảm số lượng sản phẩm | | ⬜ Not Run | — | — |
| TC-FR-07-006 | Domain Testing | Thêm cùng sản phẩm vào giỏ — tăng số lượng, không tạo dòng mới | | ⬜ Not Run | — | — |
| TC-FR-07-007 | Domain Testing | Nút Xóa sản phẩm hiển thị dialog xác nhận trước khi xóa | | ⬜ Not Run | — | — |
| TC-FR-07-008 | Domain Testing | Xác nhận xóa sản phẩm — sản phẩm bị xóa khỏi giỏ | | ⬜ Not Run | — | — |
| TC-FR-07-009 | Domain Testing | Hủy xóa sản phẩm — sản phẩm vẫn còn trong giỏ | | ⬜ Not Run | — | — |
| TC-FR-07-010 | Domain Testing | Nút "Tiếp tục mua sắm" quay về trang chủ | | ⬜ Not Run | — | — |
| TC-FR-07-011 | Domain Testing | Nhãn tổng tiền hiển thị "Tổng cộng" | | ⬜ Not Run | — | — |
| TC-FR-07-012 | Domain Testing | Giỏ hàng trống — hiển thị hình minh họa và thông báo | | ⬜ Not Run | — | — |
| TC-FR-07-013 | Domain Testing | Kiểm tra cột Thành tiền = Đơn giá × Số lượng | | ⬜ Not Run | — | — |
| TC-FR-07-014 | Domain Testing | Thêm nhiều sản phẩm khác nhau — hiển thị nhiều dòng | | ⬜ Not Run | — | — |
| TC-FR-07-015 | BVA | Số lượng = 1 (ON — min), bấm nút - | | ⬜ Not Run | — | — |
| TC-FR-07-016 | BVA | Số lượng = 0 (OFF⁻ — min-1), không hợp lệ | | ⬜ Not Run | — | — |
| TC-FR-07-017 | BVA | Số lượng = 2 (OFF⁺ — min+1), hợp lệ | | ⬜ Not Run | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 0 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 17 |
| **Tổng** | **17** |
