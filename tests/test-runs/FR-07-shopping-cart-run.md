# Test Run: FR-07 — Giỏ hàng (Shopping Cart)

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-07: Giỏ hàng (Shopping Cart) |
| **Ngày thực thi** | 24/06/2026 |
| **Môi trường** | Browser: Zen Browser 1.21.3b (Firefox 152.0.1) · OS: Fedora 44 · URL: http://localhost:5173/cart |
| **Build / Commit** | 85af3ba |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-07-001 | Domain Testing | Hiển thị giỏ hàng với 1 sản phẩm — kiểm tra đầy đủ các cột | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-001 | Cột số lượng không hiển thị nút +/- |
| TC-FR-07-002 | Domain Testing | Kiểm tra tên cột "Đơn giá" hiển thị đúng | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-002 | Hiển thị tên cột là "Giá" |
| TC-FR-07-003 | Domain Testing | Kiểm tra cột Số lượng có nút +/- để chỉnh | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-003 | Không có nút +/- để điều chỉnh số lượng |
| TC-FR-07-004 | Domain Testing | Bấm nút + để tăng số lượng sản phẩm | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-004 | Thiếu nút + trên giao diện |
| TC-FR-07-005 | Domain Testing | Bấm nút - để giảm số lượng sản phẩm | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-005 | Thiếu nút - trên giao diện |
| TC-FR-07-006 | Domain Testing | Thêm cùng sản phẩm vào giỏ — tăng số lượng, không tạo dòng mới | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-006 | Tạo dòng sản phẩm mới thay vì cộng dồn |
| TC-FR-07-007 | Domain Testing | Nút Xóa sản phẩm hiển thị dialog xác nhận trước khi xóa | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-007 | Xóa ngay lập tức mà không hiện dialog xác nhận |
| TC-FR-07-008 | Domain Testing | Xác nhận xóa sản phẩm — sản phẩm bị xóa khỏi giỏ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-008 | Thiếu dialog xác nhận xóa sản phẩm |
| TC-FR-07-009 | Domain Testing | Hủy xóa sản phẩm — sản phẩm vẫn còn trong giỏ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-009 | Thiếu dialog xác nhận để có thể hủy xóa |
| TC-FR-07-010 | Domain Testing | Nút "Tiếp tục mua sắm" quay về trang chủ | Lâm Vĩ Khang | ✅ Passed | — | — |
| TC-FR-07-011 | Domain Testing | Nhãn tổng tiền hiển thị "Tổng cộng" | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-010 | Nhãn hiển thị là "Tổng tạm tính" |
| TC-FR-07-012 | Domain Testing | Giỏ hàng trống — hiển thị hình minh họa và thông báo | Lâm Vĩ Khang | ❌ Failed | BUG-FR-07-011 | Thiếu hình ảnh minh họa |
| TC-FR-07-013 | Domain Testing | Kiểm tra cột Thành tiền = Đơn giá × Số lượng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-012 | Không thể tăng số lượng sản phẩm để test |
| TC-FR-07-014 | Domain Testing | Thêm nhiều sản phẩm khác nhau — hiển thị nhiều dòng | Lâm Vĩ Khang | ✅ Passed | — | — |
| TC-FR-07-015 | BVA | Số lượng = 1 (ON — min), bấm nút - | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-013 | Thiếu nút - trên giao diện để test |
| TC-FR-07-016 | BVA | Số lượng = 0 (OFF⁻ — min-1), không hợp lệ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-014 | Thiếu nút - trên giao diện để test |
| TC-FR-07-017 | BVA | Số lượng = 2 (OFF⁺ — min+1), hợp lệ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-07-015 | Thiếu nút + trên giao diện để test |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 2 |
| ❌ Failed | 7 |
| 🚫 Blocked | 8 |
| ⬜ Not Run | 0 |
| **Tổng** | **17** |
