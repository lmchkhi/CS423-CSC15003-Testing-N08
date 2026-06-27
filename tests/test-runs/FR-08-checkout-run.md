<!-- tests/test-runs/FR-08-checkout-run.md -->

# Test Run Report: FR-08 — Thanh toán (Checkout)

## Thông tin chung

| Mục | Chi tiết |
| --- | --- |
| **Feature** | FR-08: Thanh toán (Checkout) |
| **Tester** | Trần Minh Quang (AI-assisted) |
| **Ngày thực hiện** | 2026-06-27 |
| **Môi trường** | EShop Backend — `http://localhost:3000`, Postman |
| **Công cụ test** | Postman (API testing) |
| **Tổng số TC** | 18 |
| **Passed** | 3 (16.7%) |
| **Failed** | 15 (83.3%) |

---

## Kết quả Domain Testing (15 TCs)

| TC ID | Tên Test Case | Status | Bug ID |
| --- | --- | --- | --- |
| TC-FR08-DT-001 | Checkout thành công (happy path) | ❌ FAILED | BUG-FR08-005 |
| TC-FR08-DT-002 | Checkout thiếu Token (chưa đăng nhập) | ✅ PASSED | — |
| TC-FR08-DT-003 | Checkout Token sai/hết hạn/malformed | ✅ PASSED | — |
| TC-FR08-DT-004 | Hacker gửi total_amount thấp hơn thực tế | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-005 | Hacker gửi total_amount = 0 (mua miễn phí) | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-006 | Hacker gửi total_amount âm (hoàn tiền) | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-007 | Hacker gửi total_amount quá cao (over-charge) | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-008 | Không gửi trường total_amount | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-009 | total_amount kiểu string ("abc") | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-DT-010 | shipping_address rỗng | ❌ FAILED | BUG-FR08-003 |
| TC-FR08-DT-011 | Thiếu trường shipping_address | ❌ FAILED | BUG-FR08-003 |
| TC-FR08-DT-012 | XSS Injection trong shipping_address | ❌ FAILED | BUG-FR08-002 |
| TC-FR08-DT-013 | SQL Injection trong shipping_address | ✅ PASSED | — |
| TC-FR08-DT-014 | Checkout với giỏ hàng trống | ❌ FAILED | BUG-FR08-004 |
| TC-FR08-DT-015 | Giỏ hàng xóa sau checkout thành công | ❌ FAILED | BUG-FR08-005 |

## Kết quả BVA (3 TCs)

| TC ID | Tên Test Case | Boundary Point | Status | Bug ID |
| --- | --- | --- | --- | --- |
| TC-FR08-BVA-001 | total_amount = -1 | OFF⁻ | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-BVA-002 | total_amount = 0 | ON | ❌ FAILED | BUG-FR08-001 |
| TC-FR08-BVA-003 | total_amount = 1 | OFF⁺ | ❌ FAILED | BUG-FR08-001 |

---

## Tổng hợp Bug được phát hiện

| Bug ID | Tên Bug | Severity | TCs liên quan |
| --- | --- | --- | --- |
| BUG-FR08-001 | Backend tin tưởng total_amount từ client, không tự tính | Critical | DT-004, DT-005, DT-006, DT-007, DT-008, DT-009, BVA-001, BVA-002, BVA-003 |
| BUG-FR08-002 | Stored XSS qua shipping_address trên Admin | Major | DT-012 |
| BUG-FR08-003 | Thiếu validation cho shipping_address (rỗng/missing) | Major | DT-010, DT-011 |
| BUG-FR08-004 | Checkout thành công khi giỏ hàng trống | Major | DT-014 |
| BUG-FR08-005 | Giỏ hàng không được xóa sau checkout thành công | Major | DT-001, DT-015 |

---

## Phân bổ kết quả

```
Total: 18 TCs
├── PASSED:  3  (16.7%)  ██░░░░░░░░
└── FAILED: 15  (83.3%)  ████████░░

Bug Severity Distribution:
├── Critical: 1  (BUG-FR08-001 — total_amount manipulation)
└── Major:    4  (BUG-FR08-002..005)
```
