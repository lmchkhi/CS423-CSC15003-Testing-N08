<!-- tests/test-runs/FR-09-coupon-mobile-run.md -->

# Test Run: FR-09 — Mã Giảm Giá (Coupon) — Mobile App

## Thông tin chung

| Mục                | Chi tiết                                            |
| ------------------- | --------------------------------------------------- |
| **Requirement**     | FR-09: Mã Giảm Giá (Coupon)                        |
| **Nền tảng**        | Mobile App (React Native + Expo)                    |
| **Ngày thực hiện**  | 2026-06-27                                          |
| **Người thực hiện** | Tester (Manual)                                     |
| **Môi trường**      | React Native Expo, Backend localhost:3000            |
| **Tài khoản test**  | test@eshop.com / Test1234!                          |

---

## Tổng kết

| Metric           | Giá trị      |
| ---------------- | ------------ |
| Tổng Test Cases  | 21           |
| ✅ Passed        | 14 (66.7%)   |
| ❌ Failed        | 7 (33.3%)    |
| ⏭️ Not Run       | 0            |
| 🐛 Bug phát hiện | 2            |

---

## Kết quả Domain Testing (EP)

| TC ID    | Tên Test Case                                                            | Status     | Bug ID      |
| -------- | ------------------------------------------------------------------------ | ---------- | ----------- |
| DT-001   | Áp dụng mã SAVE10 thành công — tất cả điều kiện hợp lệ (percent)        | ❌ FAILED  | BUG-FR09-001 |
| DT-002   | Áp dụng mã BIGBUY thành công — tất cả điều kiện hợp lệ (fixed)          | ✅ PASSED  |             |
| DT-003   | Áp dụng mã VIP100 thành công — tất cả điều kiện hợp lệ (fixed, max=2)   | ✅ PASSED  |             |
| DT-004   | Mã không tồn tại trong CSDL (FAKECODE)                                   | ✅ PASSED  |             |
| DT-005   | Chuỗi mã rỗng — không nhập gì                                            | ✅ PASSED  |             |
| DT-006   | Mã hết hạn sử dụng (EXPIRED)                                             | ✅ PASSED  |             |
| DT-007   | Tổng đơn hàng dưới ngưỡng tối thiểu (SAVE10 min=300K, total=200K)       | ✅ PASSED  |             |
| DT-008   | Người dùng chưa đăng nhập                                                | ✅ PASSED  |             |
| DT-009   | Đã dùng hết lượt cho phép (SAVE10, max=1, đã dùng 1 lần)                | ✅ PASSED  |             |
| DT-010   | Mã đúng nhưng nhập sai case — lowercase "save10"                         | ❌ FAILED  | BUG-FR09-001 |

---

## Kết quả BVA Testing

| TC ID    | Tên Test Case                                              | Biến test      | BVA Point | Status     | Bug ID       |
| -------- | ---------------------------------------------------------- | -------------- | --------- | ---------- | ------------ |
| BVA-001  | SAVE10 — total = 299,999₫                                 | total_amount   | OFF⁻      | ✅ PASSED  |              |
| BVA-002  | SAVE10 — total = 300,000₫                                 | total_amount   | ON        | ❌ FAILED  | BUG-FR09-002 |
| BVA-003  | SAVE10 — total = 300,001₫                                 | total_amount   | OFF⁺      | ❌ FAILED  | BUG-FR09-001 |
| BVA-004  | BIGBUY — total = 499,999₫                                 | total_amount   | OFF⁻      | ✅ PASSED  |              |
| BVA-005  | BIGBUY — total = 500,000₫                                 | total_amount   | ON        | ❌ FAILED  | BUG-FR09-002 |
| BVA-006  | BIGBUY — total = 500,001₫                                 | total_amount   | OFF⁺      | ✅ PASSED  |              |
| BVA-007  | VIP100 — Sử dụng lần thứ 1 (usage=0, max=2)              | usage_count    | OFF⁻      | ✅ PASSED  |              |
| BVA-008  | VIP100 — Sử dụng lần thứ 2 (usage=1, max=2)              | usage_count    | ON        | ✅ PASSED  |              |
| BVA-009  | VIP100 — Sử dụng lần thứ 3 (usage=2, max=2)              | usage_count    | OFF⁺      | ✅ PASSED  |              |
| BVA-010  | SAVE10 — Sử dụng lần thứ 1 (usage=0, max=1)              | usage_count    | ON        | ❌ FAILED  | BUG-FR09-001 |
| BVA-011  | SAVE10 — Sử dụng lần thứ 2 (usage=1, max=1)              | usage_count    | OFF⁺      | ✅ PASSED  |              |

---

## Danh sách Bug phát hiện

| Bug ID        | Severity | Mô tả ngắn                                                                              | TC liên quan                          |
| ------------- | -------- | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| BUG-FR09-001  | Critical | Lỗi tính giảm giá loại percent — hệ thống tính sai gấp 100 lần (50K → 5,000K)          | DT-001, DT-010, BVA-003, BVA-010     |
| BUG-FR09-002  | Major    | Lỗi biên off-by-one — `min_order_amount` dùng phép so sánh `>` thay vì `>=`             | BVA-002, BVA-005                      |

---

## Nhận xét chung

- **Lỗi nghiêm trọng nhất (BUG-FR09-001):** Tất cả các mã giảm giá loại `percent` đều bị tính sai — số tiền giảm giá bị nhân lên gấp 100 lần so với giá trị đúng. Ví dụ: với mã SAVE10 (10%), tổng đơn 500,000₫, hệ thống tính discount = 5,000,000₫ thay vì 50,000₫ đúng. Điều này khiến tổng thanh toán tăng lên thay vì giảm.
- **Lỗi biên (BUG-FR09-002):** Hệ thống sử dụng phép so sánh `>` thay vì `>=` khi kiểm tra ngưỡng tối thiểu (`min_order_amount`). Điều này vi phạm trực tiếp đặc tả FR-09 Điều kiện C3: "Tổng đơn hàng **>= (lớn hơn hoặc bằng)** min_order_amount".
- **Mã giảm giá loại `fixed` hoạt động đúng:** DT-002 (BIGBUY), DT-003 (VIP100) đều tính chính xác.
- **Kiểm soát lượt sử dụng hoạt động đúng:** Toàn bộ test case usage_count (BVA-007→009, BVA-011, DT-009) đều PASSED.
- **Hệ thống case-insensitive:** Mã nhập lowercase ("save10") vẫn được chấp nhận — hành vi này cần làm rõ với đội phát triển.
