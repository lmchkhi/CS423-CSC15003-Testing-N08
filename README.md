# HW02 – Domain Testing on EShop

> **Sinh viên:** Lâm Vĩ Khang — 23127062
>
> **Nhóm:** N08
>
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

---

## 1. Self-Assessment Table

| No. | Criteria                                                         | Grade   | Self-Assessed Grade |
| --- | ---------------------------------------------------------------- | ------- | ------------------- |
| 1   | Feature A — FR-01: Đăng ký tài khoản (Domain + Boundary)         | 25      | 25                  |
| 2   | Feature B — FR-07: Giỏ hàng (Domain + Boundary)                  | 25      | 25                  |
| 3   | Feature C — FR-16: Import Sản phẩm từ CSV (Domain + Boundary)    | 25      | 25                  |
| 4   | Feature D — Mobile, FR-25: Đăng ký tài khoản (Domain + Boundary) | 15      | 15                  |
| 5   | Agent Skills                                                     | 10      | 9                   |
|     | **Total**                                                        | **100** | 99                  |

---

## 2. Test Summary Report

### 2.1. Features Tested

| Pool | Feature ID | Feature Name             | Platform  |
| ---- | ---------- | ------------------------ | --------- |
| A    | FR-01      | Đăng ký tài khoản        | Web       |
| B    | FR-07      | Giỏ hàng (Shopping Cart) | Web       |
| C    | FR-16      | Import Sản phẩm từ CSV   | Web Admin |
| D    | FR-25      | Đăng ký tài khoản        | Mobile    |

### 2.2. Test Case Summary

| Feature   | Technique      | Designed | Executed | Passed | Failed | Not Run | Blocked |
| --------- | -------------- | -------- | -------- | ------ | ------ | ------- | ------- |
| FR-01     | Domain Testing | 13       | 0        | 0      | 0      | 0       | 13      |
| FR-01     | BVA            | 3        | 0        | 0      | 0      | 0       | 3       |
| FR-07     | Domain Testing | 14       | 9        | 2      | 7      | 0       | 5       |
| FR-07     | BVA            | 3        | 0        | 0      | 0      | 0       | 3       |
| FR-16     | Domain Testing | 12       | 12       | 2      | 10     | 0       | 0       |
| FR-16     | BVA            | 3        | 3        | 2      | 1      | 0       | 0       |
| FR-25     | Domain Testing | 13       | 1        | 0      | 1      | 0       | 12      |
| FR-25     | BVA            | 3        | 0        | 0      | 0      | 0       | 3       |
| **Total** |                | **64**   | **25**   | **6**  | **19** | **0**   | **39**  |

> **Executed** được tính bằng tổng số test case có kết quả **Passed** hoặc **Failed**; test case **Blocked** được thống kê riêng.

### 2.3. Bug Summary

| Bug ID        | Feature | Severity | Status | GitHub Issue                                                           |
| ------------- | ------- | -------- | ------ | ---------------------------------------------------------------------- |
| BUG-FR-01-001 | FR-01   | Critical | Open   | [#8](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8)   |
| BUG-FR-07-001 | FR-07   | Medium   | Open   | [#18](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18) |
| BUG-FR-07-002 | FR-07   | Low      | Open   | [#19](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/19) |
| BUG-FR-07-003 | FR-07   | High     | Open   | [#20](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/20) |
| BUG-FR-07-004 | FR-07   | Medium   | Open   | [#21](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/21) |
| BUG-FR-07-005 | FR-07   | Low      | Open   | [#22](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/22) |
| BUG-FR-07-006 | FR-07   | Low      | Open   | [#23](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/23) |
| BUG-FR-16-001 | FR-16   | Medium   | Open   | [#24](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/24) |
| BUG-FR-16-002 | FR-16   | High     | Open   | [#25](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/25) |
| BUG-FR-16-003 | FR-16   | High     | Open   | [#26](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/26) |
| BUG-FR-16-004 | FR-16   | High     | Open   | [#27](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/27) |
| BUG-FR-16-005 | FR-16   | High     | Open   | [#28](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/28) |
| BUG-FR-16-006 | FR-16   | High     | Open   | [#29](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/29) |
| BUG-FR-16-007 | FR-16   | High     | Open   | [#30](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/30) |
| BUG-FR-16-008 | FR-16   | Medium   | Open   | [#31](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/31) |
| BUG-FR-16-009 | FR-16   | High     | Open   | [#32](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32) |
| BUG-FR-25-001 | FR-25   | High     | Open   | [#33](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/33) |

> **Tổng số bugs:** 17

### 2.4. Demo Videos

**Agent Skill Demo**: https://youtu.be/CLmkBbvMBQs
