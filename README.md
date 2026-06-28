# HW02 – Domain Testing on EShop

> **Sinh viên:** Trần Minh Quang - 23127464
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

---

## 1. Self-Assessment Table

| No. | Criteria                                                      | Grade   | Self-Assessed Grade |
| --- | ------------------------------------------------------------- | ------- | ------------------- |
| 1   | Feature A — FR-05: Xem danh sách & Tìm kiếm sản phẩm (Domain) | 25      | 25                  |
| 2   | Feature B — FR-08: Thanh toán Checkout (Domain + BVA)         | 25      | 25                  |
| 3   | Feature C — FR-12: Kiểm soát truy cập Access Control (Domain) | 25      | 25                  |
| 4   | Feature D — FR-09: Mã giảm giá Coupon — Mobile (Domain + BVA) | 15      | 15                  |
| 5   | Agent Skills                                                  | 10      | 10                  |
|     | **Total**                                                     | **100** | **100**             |

---

## 2. Test Summary Report

### 2.1. Features Tested

| Pool | Feature ID | Feature Name                        | Platform  | Technique            |
| ---- | ---------- | ----------------------------------- | --------- | -------------------- |
| A    | FR-05      | Xem danh sách & Tìm kiếm sản phẩm   | Web       | Domain Testing       |
| B    | FR-08      | Thanh toán (Checkout)               | Web       | Domain Testing + BVA |
| C    | FR-12      | Kiểm soát truy cập (Access Control) | Web Admin | Domain Testing       |
| D    | FR-09      | Mã giảm giá (Coupon)                | Mobile    | Domain Testing + BVA |

### 2.2. Test Case Summary

| Feature   | Technique      | Designed | Executed | Passed | Failed | Not Run | Blocked |
| --------- | -------------- | -------- | -------- | ------ | ------ | ------- | ------- |
| FR-05     | Domain Testing | 12       | 12       | 4      | 8      | 0       | 0       |
| FR-05     | BVA            | 0        | 0        | 0      | 0      | 0       | 0       |
| FR-08     | Domain Testing | 15       | 15       | 3      | 12     | 0       | 0       |
| FR-08     | BVA            | 3        | 3        | 0      | 3      | 0       | 0       |
| FR-12     | Domain Testing | 40       | 40       | 23     | 17     | 0       | 0       |
| FR-12     | BVA            | 0        | 0        | 0      | 0      | 0       | 0       |
| FR-09     | Domain Testing | 10       | 10       | 7      | 3      | 0       | 0       |
| FR-09     | BVA            | 11       | 11       | 7      | 4      | 0       | 0       |
| **Total** |                | **91**   | **91**   | **44** | **47** | **0**   | **0**   |

> **Pass Rate:** 48.4% (44/91) — **Fail Rate:** 51.6% (47/91)

### 2.3. Bug Summary

| Bug ID       | Feature | Severity | Mô tả ngắn                                                   |
| ------------ | ------- | -------- | ------------------------------------------------------------ |
| BUG-FR05-001 | FR-05   | Minor    | Thiếu empty state khi không có kết quả tìm kiếm              |
| BUG-FR05-002 | FR-05   | Minor    | Tìm kiếm ký tự đặc biệt không trả kết quả/empty state        |
| BUG-FR05-003 | FR-05   | Critical | XSS payload gây lỗi 500, lộ raw DB error                     |
| BUG-FR05-004 | FR-05   | Critical | SQL Injection thành công, trả về toàn bộ sản phẩm            |
| BUG-FR05-005 | FR-05   | Minor    | Ký hiệu tiền tệ hiển thị 'VND' thay vì ₫                     |
| BUG-FR05-006 | FR-05   | Minor    | Thiếu loading indicator khi đang tải dữ liệu                 |
| BUG-FR05-007 | FR-05   | Trivial  | Trang chủ có 2 thẻ h1 thay vì 1                              |
| BUG-FR08-001 | FR-08   | Critical | Backend tin tưởng total_amount từ client, không tự tính      |
| BUG-FR08-002 | FR-08   | Major    | Stored XSS qua shipping_address trên Admin                   |
| BUG-FR08-003 | FR-08   | Major    | Thiếu validation cho shipping_address (rỗng/missing)         |
| BUG-FR08-004 | FR-08   | Major    | Checkout thành công khi giỏ hàng trống                       |
| BUG-FR08-005 | FR-08   | Major    | Giỏ hàng không được xóa sau checkout thành công              |
| BUG-FR09-001 | FR-09   | Critical | Lỗi tính giảm giá loại percent — sai gấp 100 lần             |
| BUG-FR09-002 | FR-09   | Major    | Lỗi biên off-by-one — min_order_amount dùng `>` thay vì `>=` |
| BUG-FR12-001 | FR-12   | Critical | Product API endpoints thiếu middleware xác thực              |
| BUG-FR12-002 | FR-12   | Critical | Admin API endpoints thiếu kiểm tra role                      |
| BUG-FR12-003 | FR-12   | Critical | Category API endpoints thiếu kiểm tra role                   |
| BUG-FR12-004 | FR-12   | Minor    | Token không hợp lệ trả về 403 thay vì 401                    |

> **Tổng số bugs:** 18 (7 Critical, 5 Major, 4 Minor, 1 Trivial, 1 Minor/P2)

### 2.4. Demo Videos

Agent demo youtube: [Nội dung demo](https://youtu.be/z8VBOkv9DZ0)

Agent demo drive: [Nội dung demo](https://drive.google.com/file/d/1_QK7JtG1i52mfrXZPxIjk8lnoDW6ir8y/view?usp=sharing)

---

## 3. Project Structure

```
CS423-CSC15003-Testing-N08/
├── README.md                           # File này
├── CLAUDE.md                           # Cấu hình AI Agent (QA Test Designer)
├── description_project.md              # Đặc tả yêu cầu hệ thống EShop
├── api_specification.md                # Đặc tả API
│
├── tests/
│   ├── test-cases/
│   │   ├── FR-05-search/
│   │   │   └── domain-testing/         # 12 test cases (TC-FR05-DT-001 → 012)
│   │   ├── FR-08-checkout/
│   │   │   ├── domain-testing/         # 15 test cases (TC-FR08-DT-001 → 015)
│   │   │   └── bva/                    # 3 test cases  (TC-FR08-BVA-001 → 003)
│   │   ├── FR-09-coupon-mobile/
│   │   │   ├── domain-testing/         # 10 test cases (TC-FR09-DT-001 → 010)
│   │   │   └── bva/                    # 11 test cases (TC-FR09-BVA-001 → 011)
│   │   └── FR-12-access/
│   │       └── domain-testing/         # 40 test cases (TC-FR12-DT-001 → 040)
│   └── test-runs/
│       ├── FR-05-search-run.md         # Kết quả chạy FR-05
│       ├── FR-08-checkout-run.md       # Kết quả chạy FR-08
│       ├── FR-09-coupon-mobile-run.md  # Kết quả chạy FR-09
│       └── FR-12-access-run.md         # Kết quả chạy FR-12
│
├── bug-reports/
│   ├── FR-05/                          # 7 bug reports  (BUG-FR05-001 → 007)
│   ├── FR-08/                          # 5 bug reports  (BUG-FR08-001 → 005)
│   ├── FR-09/                          # 2 bug reports  (BUG-FR09-001 → 002)
│   ├── FR-12/                          # 4 bug reports  (BUG-FR12-001 → 004)
│   ├── screenshots/                    # Ảnh chụp kết quả test
│   └── screenshots_issues/             # Ảnh chụp các lỗi phát hiện
│
├── ai-gap-analysis/
│   ├── FR-05-search-gap-analysis.md
│   ├── FR-08-checkout-gap-analysis.md
│   ├── FR-09-coupon-mobile-gap-analysis.md
│   └── FR-12-access-gap-analysis.md
│
├── reports/
│   ├── main-report.md                  # Báo cáo chính (chi tiết toàn bộ quá trình)
│   ├── ai-audit-report.md              # Báo cáo AI Audit (AI-02)
│   ├── ai-critique.md                  # Nhận xét đánh giá AI Agent
│   └── implemation_plan/               # Kế hoạch triển khai cho từng feature
│       ├── implementation_plan_FR05.md
│       ├── implementation_plan_FR08.md
│       ├── implementation_plan_FR09.md
│       └── implementation_plan_FR12.md
│
└── git-log.txt                         # Lịch sử commit
```

---

## 4. Công cụ & Kỹ thuật

| Hạng mục              | Chi tiết                                                                      |
| --------------------- | ----------------------------------------------------------------------------- |
| **Kỹ thuật kiểm thử** | Domain Testing (Equivalence Partitioning), BVA                                |
| **Công cụ AI**        | Antigravity (Claude Opus 4.6 Thinking), ChatGPT, Grok                         |
| **Công cụ test**      | Postman (API), Manual Testing (UI, Mobile)                                    |
| **Môi trường**        | Backend localhost:3000, Web localhost:5173, Admin localhost:5174, Mobile Expo |

---

## 5. Ghi chú

- FR-05 chỉ áp dụng Domain Testing, **không áp dụng BVA** do biến đầu vào `search_keyword` là kiểu String (theo STRICT BVA RULE trong `CLAUDE.md`).
- FR-12 chỉ áp dụng Domain Testing, **không áp dụng BVA** do các biến đầu vào là Token và Role (kiểu categorical).
- FR-08 và FR-09 áp dụng **cả Domain Testing và BVA** cho các biến số (numerical) như `total_amount`, `usage_count`, `min_order_amount`.
- Tổng cộng phát hiện **18 bugs**, trong đó **7 lỗi Critical** liên quan đến bảo mật (SQL Injection, XSS) và logic nghiệp vụ (thiếu xác thực, tính sai giảm giá).
