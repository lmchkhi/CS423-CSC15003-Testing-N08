# 📊 Ma trận Truy vết (Traceability Matrix) — Sprint 1

> **Skill 6.1: Build_Traceability_Matrix**
> Tự động sinh bảng tổng kết luồng: Requirement → Test Case → Result → Bug Issue → Status
> Ngày tạo: 2026-06-08 | Sprint: 1 | Module: Home

---

## Bảng Ma trận Truy vết

| Requirement | Mô tả Requirement | Test Case ID | Kết quả | Bug Issue | Trạng thái Bug | Ghi chú |
|-------------|-------------------|--------------|---------|-----------|----------------|---------|
| FR-05-01 | Hiển thị sản phẩm dạng lưới (grid) | TC-HOME-001 | ✅ Pass | — | — | Grid responsive hoạt động đúng |
| FR-05-02 | Ảnh có alt text mô tả | TC-HOME-002 | ❌ Fail | BUG-HOME-003 | 🔴 Open | `alt=""` — thiếu mô tả ảnh |
| FR-05-02, FR-21 | Giá hiển thị ₫ + phân cách nghìn | TC-HOME-003 | ❌ Fail | BUG-HOME-004 | 🔴 Open | Hiển thị "VND" thay vì "₫" |
| FR-05-03 | Tìm kiếm theo tên sản phẩm | TC-HOME-004 | ✅ Pass | — | — | Chức năng tìm kiếm cơ bản OK |
| FR-05-03, SEC-04 | Từ khóa tìm kiếm hiển thị an toàn | TC-HOME-005 | ❌ Fail | BUG-HOME-001 | 🔴 Open | XSS qua `dangerouslySetInnerHTML` |
| SEC-04 | Error HTML hiển thị an toàn | TC-HOME-005 | ❌ Fail | BUG-HOME-002 | 🔴 Open | XSS qua error rendering |
| FR-05-04 | Hiển thị trạng thái loading | TC-HOME-006 | ❌ Fail | BUG-HOME-005 | 🔴 Open | Không có loading indicator |
| FR-05-05, FR-24 | Hiển thị empty state | TC-HOME-007 | ❌ Fail | BUG-HOME-006 | 🔴 Open | Khu vực trống, không thông báo |
| FR-05-06, FR-21 | Chỉ có 1 thẻ `<h1>` trên trang chủ | TC-HOME-008 | ❌ Fail | BUG-HOME-007 | 🔴 Open | Có 2 thẻ `<h1>` |
| FR-05-03 | Tìm kiếm với từ khóa rỗng | TC-HOME-009 | ✅ Pass | — | — | Reset về toàn bộ sản phẩm |
| SEC-05 | Backend dùng Parameterized Query | TC-HOME-010 | ❌ Fail | BUG-HOME-008 | 🔴 Open | SQL Injection — nối chuỗi trực tiếp |

---

## ⚠️ Phân tích Độ phủ (Coverage Analysis)

### Requirement Coverage

| Requirement | Số TC | Đã test | Kết quả | Trạng thái |
|-------------|-------|---------|---------|------------|
| FR-05-01 | 1 | ✅ | Pass | ✅ Đạt |
| FR-05-02 | 2 | ✅ | 2 Fail | ❌ Chưa đạt |
| FR-05-03 | 3 | ✅ | 1 Pass / 1 Fail (XSS) | ❌ Chưa đạt |
| FR-05-04 | 1 | ✅ | Fail | ❌ Chưa đạt |
| FR-05-05 | 1 | ✅ | Fail | ❌ Chưa đạt |
| FR-05-06 | 1 | ✅ | Fail | ❌ Chưa đạt |
| FR-05-07 | 1 | ✅ | Fail | ❌ Chưa đạt |
| SEC-04 | 2 | ✅ | 2 Fail | ❌ Chưa đạt |
| SEC-05 | 1 | ✅ | Fail | ❌ Chưa đạt |

### ❌ Cảnh báo: Requirement chưa đạt

> [!WARNING]
> **7/9 requirement** chưa đạt yêu cầu kiểm thử. Cần khắc phục **8 lỗi** trước khi release.

### Phân bổ theo Mức độ nghiêm trọng

| Severity | Số lượng | Bug IDs |
|----------|----------|---------|
| 🔴 Critical | 3 | BUG-HOME-001, BUG-HOME-002, BUG-HOME-008 |
| 🟠 Major | 3 | BUG-HOME-004, BUG-HOME-005, BUG-HOME-006 |
| 🟡 Minor | 2 | BUG-HOME-003, BUG-HOME-007 |
| ⚪ Trivial | 0 | — |

---

## 🔗 Kiểm tra Liên kết 2 chiều (Bi-directional Link Audit)

> **Skill 4.2: Establish_Two_Way_Link**

| Bug ID | → Found by TC? | ← TC → Bug? | → Test Run? | Trạng thái liên kết |
|--------|----------------|--------------|-------------|---------------------|
| BUG-HOME-001 | ✅ TC-HOME-005 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-002 | ✅ TC-HOME-005 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-003 | ✅ TC-HOME-002 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-004 | ✅ TC-HOME-003 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-005 | ✅ TC-HOME-006 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-006 | ✅ TC-HOME-007 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-007 | ✅ TC-HOME-008 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |
| BUG-HOME-008 | ✅ TC-HOME-010 | ✅ | ✅ sprint-1 | ✅ Hoàn chỉnh |

> **Kết luận:** 8/8 Bug có liên kết 2 chiều hoàn chỉnh. **Không có Bug "mồ côi".**

---

## 📈 Tóm tắt Sprint 1

```
╔══════════════════════════════════════════════════╗
║          SPRINT 1 — MODULE HOME (FR-05)          ║
╠══════════════════════════════════════════════════╣
║  Tổng Test Cases:         10                     ║
║  ✅ Pass:                  3  (30%)              ║
║  ❌ Fail:                  7  (70%)              ║
║  ⏸️ Blocked:               0  (0%)               ║
║                                                  ║
║  Tổng Bug phát hiện:      8                      ║
║  🔴 Critical:             3                      ║
║  🟠 Major:                3                      ║
║  🟡 Minor:                2                      ║
║                                                  ║
║  Liên kết 2 chiều:       8/8 ✅ (100%)           ║
║  Fail "mồ côi":          0   ✅                  ║
║  Requirement chưa đạt:   7/9 ⚠️                  ║
╚══════════════════════════════════════════════════╝
```

> [!CAUTION]
> **Khuyến nghị:** KHÔNG release module Home cho đến khi tất cả 3 lỗi Critical (XSS, SQL Injection) được khắc phục và retest Pass.

---

*Tài liệu sinh tự động bởi Skill 6.1: Build_Traceability_Matrix — Ngày: 2026-06-08*
