# Test Run: FR-16 — Import Sản phẩm từ CSV

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-16: Import Sản phẩm từ CSV |
| **Ngày thực thi** | 25/06/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-16-001 | Domain Testing | Import thành công với file CSV hợp lệ (nhiều dòng, tất cả hợp lệ) | | ✅ Passed | — | — |
| TC-FR-16-002 | Domain Testing | Upload file không phải `.csv` (ví dụ: `.txt`) | | ❌ Failed | BUG-FR-16-001 | — |
| TC-FR-16-003 | Domain Testing | Không chọn file nào để upload | | ✅ Passed | — | — |
| TC-FR-16-004 | Domain Testing | File CSV có header sai (thiếu cột) | | ❌ Failed | BUG-FR-16-002 | — |
| TC-FR-16-005 | Domain Testing | File CSV có dòng dữ liệu với `name` rỗng | | ❌ Failed | BUG-FR-16-003 | — |
| TC-FR-16-006 | Domain Testing | File CSV có dòng dữ liệu với `price` bằng 0 | | ❌ Failed | BUG-FR-16-004 | — |
| TC-FR-16-007 | Domain Testing | File CSV có dòng dữ liệu với `price` là số âm | | ❌ Failed | BUG-FR-16-005 | — |
| TC-FR-16-008 | Domain Testing | File CSV có dòng dữ liệu với `price` không phải số | | ❌ Failed | BUG-FR-16-006 | — |
| TC-FR-16-009 | Domain Testing | File CSV có dòng dữ liệu với `price` rỗng | | ❌ Failed | BUG-FR-16-007 | — |
| TC-FR-16-010 | Domain Testing | File CSV có trường chứa dấu phẩy bọc trong nháy kép (RFC 4180) | | ❌ Failed | BUG-FR-16-008 | — |
| TC-FR-16-011 | Domain Testing | File CSV có 1 dòng lỗi — kiểm tra rollback toàn bộ | | ❌ Failed | BUG-FR-16-003 | — |
| TC-FR-16-012 | Domain Testing | Kiểm tra báo cáo kết quả hiển thị số dòng thành công/lỗi và lý do | | ❌ Failed | BUG-FR-16-009 | — |
| TC-FR-16-013 | BVA | Price = 1 (ON — min, số dương nhỏ nhất hợp lệ) | | ✅ Passed | — | — |
| TC-FR-16-014 | BVA | Price = 0 (OFF⁻ — min-1, không hợp lệ) | | ❌ Failed | BUG-FR-16-004 | — |
| TC-FR-16-015 | BVA | Price = 2 (OFF⁺ — min+1, hợp lệ) | | ✅ Passed | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 4 |
| ❌ Failed | 11 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 0 |
| **Tổng** | **15** |
