# 🏃 Nhật ký Chạy Test — Sprint 1: Module Home (FR-05)

> **Sprint**: 1  
> **Module**: Home — Xem danh sách & Tìm kiếm sản phẩm  
> **Tester**: AI QA Agent  
> **Ngày thực hiện**: 2026-06-08  
> **Requirement**: FR-05, FR-21, FR-24, SEC-04, SEC-05  

---

## 📊 Bảng kết quả chạy test

| TC ID | Module | Tester | Result | Related Bug | Note |
|-------|--------|--------|--------|-------------|------|
| TC-HOME-001 | Home | AI QA Agent | ✅ Pass | — | Grid layout hoạt động đúng |
| TC-HOME-002 | Home | AI QA Agent | ❌ Fail | BUG-HOME-003 | alt text rỗng |
| TC-HOME-003 | Home | AI QA Agent | ❌ Fail | BUG-HOME-004 | Hiển thị VND thay vì ₫ |
| TC-HOME-004 | Home | AI QA Agent | ✅ Pass | — | Tìm kiếm hoạt động |
| TC-HOME-005 | Home | AI QA Agent | ❌ Fail | BUG-HOME-001, BUG-HOME-002 | XSS vulnerability |
| TC-HOME-006 | Home | AI QA Agent | ❌ Fail | BUG-HOME-005 | Không có loading state |
| TC-HOME-007 | Home | AI QA Agent | ❌ Fail | BUG-HOME-006 | Không có empty state |
| TC-HOME-008 | Home | AI QA Agent | ❌ Fail | BUG-HOME-007 | 2 thẻ h1 |
| TC-HOME-009 | Home | AI QA Agent | ✅ Pass | — | Reset về danh sách đầy đủ |
| TC-HOME-010 | Home | AI QA Agent | ❌ Fail | BUG-HOME-008 | SQL Injection |

---

## 📈 Tổng kết kết quả

| Trạng thái | Số lượng | Tỷ lệ |
|------------|----------|--------|
| ✅ Pass | 3 | 30% |
| ❌ Fail | 7 | 70% |
| ⛔ Blocked | 0 | 0% |
| **Tổng** | **10** | **100%** |

---

## 🔗 Kiểm tra ràng buộc Fail — Truy vết Bug ID (Skill 3.2)

Mỗi Test Case có kết quả **Fail** phải được liên kết với ít nhất một Bug ID tương ứng. Dưới đây là bảng xác nhận:

| TC Fail | Bug ID liên kết | Trạng thái truy vết |
|---------|-----------------|---------------------|
| TC-HOME-002 | BUG-HOME-003 | ✅ Có liên kết |
| TC-HOME-003 | BUG-HOME-004 | ✅ Có liên kết |
| TC-HOME-005 | BUG-HOME-001, BUG-HOME-002 | ✅ Có liên kết |
| TC-HOME-006 | BUG-HOME-005 | ✅ Có liên kết |
| TC-HOME-007 | BUG-HOME-006 | ✅ Có liên kết |
| TC-HOME-008 | BUG-HOME-007 | ✅ Có liên kết |
| TC-HOME-010 | BUG-HOME-008 | ✅ Có liên kết |

> **Kết luận**: Tất cả 7 TC Fail đều có Bug ID liên kết. Không có trạng thái Fail "mồ côi" (orphan fail — fail không có bug report đi kèm).
