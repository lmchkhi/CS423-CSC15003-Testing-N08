# HW02 – Domain Testing on EShop

> **Sinh viên:** Ngô Hồng Thanh — 23127475
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Feature A — FR-03: Quên mật khẩu & Đặt lại mật khẩu (Domain + Boundary) | 25 | |
| 2 | Feature B — FR-11: Xem lịch sử đơn hàng (Domain + Boundary) | 25 | |
| 3 | Feature C — FR-14: Quản lý danh mục CRUD (Domain + Boundary) | 25 | |
| 4 | Feature D — Mobile, FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile (Domain + Boundary) | 15 | |
| 5 | Agent Skills | 10 | |
| | **Total** | **100** | **/100** |

---

## 2. Test Summary Report

### 2.1. Features Tested

| Pool | Feature ID | Feature Name | Platform |
|---|---|---|---|
| A | FR-03 | Quên mật khẩu & Đặt lại mật khẩu | Web |
| B | FR-11 | Xem lịch sử đơn hàng | Web |
| C | FR-14 | Quản lý danh mục CRUD | Web Admin |
| D | FR-23 | Quên mật khẩu & Đặt lại mật khẩu trên Mobile | Mobile |

### 2.2. Test Case Summary

| Feature | Technique | Designed | Executed | Passed | Failed | Not Run | Blocked |
|---|---|---|---|---|---|---|---|
| FR-03 | Domain Testing | 12 | 12 | 6 | 6 | 0 | 0 |
| FR-03 | BVA | 6 | 6 | 1 | 5 | 0 | 0 |
| FR-11 | Domain Testing | 12 | 12 | 10 | 2 | 0 | 0 |
| FR-11 | BVA | 3 | 3 | 3 | 0 | 0 | 0 |
| FR-14 | Domain Testing | 16 | 16 | 8 | 8 | 0 | 0 |
| FR-14 | BVA | 6 | 6 | 5 | 1 | 0 | 0 |
| FR-23 | Domain Testing | 12 | 12 | 5 | 5 | 0 | 2 |
| FR-23 | BVA | 6 | 6 | 3 | 3 | 0 | 0 |
| **Total** | | **73** | **73** | **41** | **30** | **0** | **2** |

### 2.3. Bug Summary

| Bug ID | Feature | Severity | Status | GitHub Issue |
|---|---|---|---|---|
| BUG-FR03-001 | FR-03 | Major | Open | [#52](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/52) |
| BUG-FR03-002 | FR-03 | Major | Open | [#53](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/53) |
| BUG-FR03-003 | FR-03 | Major | Open | [#54](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/54) |
| BUG-FR03-004 | FR-03 | Major | Open | [#55](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/55) |
| BUG-FR03-005 | FR-03 | Critical | Open | [#56](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/56) |
| BUG-FR11-007 | FR-11 | Critical | Open | [#59](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/59) |
| BUG-FR11-012 | FR-11 | Minor | Open | [#60](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/60) |
| BUG-FR14-001 | FR-14 | Critical | Open | [#62](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/62) |
| BUG-FR14-002 | FR-14 | Major | Open | [#63](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/63) |
| BUG-FR14-003 | FR-14 | Major | Open | [#64](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/64) |
| BUG-FR23-001 | FR-23 | Critical | Open | [#80](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/80) |
| BUG-FR23-002 | FR-23 | Major | Open | [#81](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/81) |
| BUG-FR23-003 | FR-23 | Major | Open | [#82](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/82) |
| BUG-FR23-004 | FR-23 | Major | Open | [#83](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/83) |

> **Tổng số bugs:** 14

### 2.4. Demo Videos

| Feature | Technique | Video Link |
|---|---|---|
| FR-11 | Domain Testing + BVA | [YouTube](https://youtu.be/-46x3OEIPFs) |