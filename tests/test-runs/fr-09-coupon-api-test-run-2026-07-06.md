# Test Run FR-09 — Coupon API — 06/07/2026

## Thông tin Test Run

| Thuộc tính | Giá trị |
|---|---|
| **Requirement** | FR-09 — Mã Giảm Giá |
| **Module** | Coupon / API |
| **Technique** | Use Case Testing |
| **Tester** | Lâm Vĩ Khang |
| **Execution Date** | 06/07/2026 16:19 (UTC+07) |
| **Environment** | macOS 26.5.2 (25F84), Node.js v24.18.0 |
| **Browser** | Chrome 149.0.7827.201 |
| **Base URL** | `http://localhost:3000` |
| **Build / Commit** | `969e156` |
| **Runner** | `node tests/api/run-fr09-api-tests.js` |
| **Overall Result** | **Fail** |

## Tổng hợp

| Chỉ số | Kết quả |
|---|---:|
| Tổng test case | 12 |
| Pass | 1 |
| Fail | 11 |
| Blocked | 0 |
| Not Run | 0 |
| Pass rate | 8,33% |
| Bug report được tạo | 7 |

## Kết quả thực thi

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| [TC-COUPON-001](../test-cases/coupon/TC-COUPON-001.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-001](../bug-reports/coupon/BUG-COUPON-001.md), [BUG-COUPON-002](../bug-reports/coupon/BUG-COUPON-002.md) | Percent 10% tạo `discount_amount = -3.600.000`, `final_amount = 4.000.000`; lượt dùng vẫn 0. |
| [TC-COUPON-002](../test-cases/coupon/TC-COUPON-002.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-002](../bug-reports/coupon/BUG-COUPON-002.md) | Tính mã fixed đúng nhưng không tăng lượt dùng từ 0 lên 1. |
| [TC-COUPON-003](../test-cases/coupon/TC-COUPON-003.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-003](../bug-reports/coupon/BUG-COUPON-003.md) | HTTP 400 khi tổng đơn đúng bằng ngưỡng 300.000 ₫. |
| [TC-COUPON-004](../test-cases/coupon/TC-COUPON-004.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-002](../bug-reports/coupon/BUG-COUPON-002.md) | `VIP100` được áp dụng nhưng lượt dùng vẫn là 1 thay vì tăng lên 2. |
| [TC-COUPON-005](../test-cases/coupon/TC-COUPON-005.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-004](../bug-reports/coupon/BUG-COUPON-004.md) | Thông báo gộp mã không tồn tại và mã bị vô hiệu hóa. |
| [TC-COUPON-006](../test-cases/coupon/TC-COUPON-006.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-004](../bug-reports/coupon/BUG-COUPON-004.md) | Mã inactive không có thông báo riêng phù hợp. |
| [TC-COUPON-007](../test-cases/coupon/TC-COUPON-007.md) | Coupon API | Lâm Vĩ Khang | **Pass** | None | HTTP 400, thông báo hết hạn đúng, không tăng lượt dùng. |
| [TC-COUPON-008](../test-cases/coupon/TC-COUPON-008.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-005](../bug-reports/coupon/BUG-COUPON-005.md) | Từ chối đúng nhưng nội dung thông báo khác Expected Result. |
| [TC-COUPON-009](../test-cases/coupon/TC-COUPON-009.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-006](../bug-reports/coupon/BUG-COUPON-006.md) | Không có JWT vẫn nhận HTTP 200 và áp dụng mã. |
| [TC-COUPON-010](../test-cases/coupon/TC-COUPON-010.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-006](../bug-reports/coupon/BUG-COUPON-006.md) | JWT sai vẫn nhận HTTP 200 và áp dụng mã. |
| [TC-COUPON-011](../test-cases/coupon/TC-COUPON-011.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-007](../bug-reports/coupon/BUG-COUPON-007.md) | Chặn đúng giới hạn nhưng thông báo khác Expected Result. |
| [TC-COUPON-012](../test-cases/coupon/TC-COUPON-012.md) | Coupon API | Lâm Vĩ Khang | **Fail** | [BUG-COUPON-004](../bug-reports/coupon/BUG-COUPON-004.md) | Phân biệt hoa/thường đúng nhưng thông báo không khớp Expected Result. |

## Traceability Matrix

| Requirement | Test Case | Result | Bug Issue | Status |
|---|---|---|---|---|
| FR-09 | TC-COUPON-001 | Fail | BUG-COUPON-001, BUG-COUPON-002 | New |
| FR-09 | TC-COUPON-002 | Fail | BUG-COUPON-002 | New |
| FR-09 | TC-COUPON-003 | Fail | BUG-COUPON-003 | New |
| FR-09 | TC-COUPON-004 | Fail | BUG-COUPON-002 | New |
| FR-09 | TC-COUPON-005 | Fail | BUG-COUPON-004 | New |
| FR-09 | TC-COUPON-006 | Fail | BUG-COUPON-004 | New |
| FR-09 | TC-COUPON-007 | Pass | — | Done |
| FR-09 | TC-COUPON-008 | Fail | BUG-COUPON-005 | New |
| FR-09 | TC-COUPON-009 | Fail | BUG-COUPON-006 | New |
| FR-09 | TC-COUPON-010 | Fail | BUG-COUPON-006 | New |
| FR-09 | TC-COUPON-011 | Fail | BUG-COUPON-007 | New |
| FR-09 | TC-COUPON-012 | Fail | BUG-COUPON-004 | New |

## Đánh giá rủi ro

- **Critical / P0:** Sai công thức giảm phần trăm có thể làm sai nghiêm trọng số tiền thanh toán; API không kiểm tra JWT nên vi phạm trực tiếp điều kiện C4.
- **Major / P1:** Không ghi nhận lượt sử dụng làm mất hiệu lực giới hạn theo User; điều kiện biên `total = min_order_amount` bị xử lý sai.
- **Minor / P2:** Một số thông báo lỗi không khớp nội dung đã phê duyệt hoặc không phân biệt được nguyên nhân.

## Evidence

- Kết quả thực tế, Related Bug và ghi chú của từng test case đã được lưu trực tiếp trong bảng **Kết quả thực thi** phía trên.
- Request/response quan trọng được nhúng trực tiếp trong từng Bug Report tương ứng.
- Lệnh thực thi: `node tests/api/run-fr09-api-tests.js`.
- Exit code: `1` do Test Run có test case Fail; runner không gặp lỗi kỹ thuật.

## Labels đề xuất

- `type: test-run`
- `module: coupon`
- `module: api`
- `technique: use-case`
- `result: fail`
