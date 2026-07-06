<!-- tests/test-runs/FR-09-coupon-run.md -->

# Test Run Report: FR-09 Mã Giảm Giá (Coupon)

**Date Executed:** 2026-07-06
**Tester:** (Mock) Sinh viên
**Environment:** Web Frontend (localhost:5173), Backend API (localhost:3000)
**Technique:** State Transition Testing (STT)

## Summary

- **Total Test Cases:** 21
- **Passed:** 19
- **Failed:** 2
- **Pass Rate:** 90.5%

## Test Execution Details

| TC ID | Test Case Name | Status | Bug ID (If Failed) | Note |
|-------|----------------|--------|--------------------|------|
| STT-001 | Apply coupon trigger flow | ✅ Passed | | |
| STT-002 | All guards pass (SAVE10) | ✅ Passed | | |
| STT-003 | C1=F Rejected (NOTEXIST) | ✅ Passed | | |
| STT-004 | C2=F Rejected (EXPIRED) | ✅ Passed | | |
| STT-005 | C3=F Rejected (BIGBUY under min amount) | ✅ Passed | | |
| STT-006 | C4=F Rejected (No JWT) | ✅ Passed | | |
| STT-007 | C5=F Rejected (SAVE10 max uses reached) | ✅ Passed | | |
| STT-008 | Remove coupon | ✅ Passed | | |
| STT-009 | Place order with coupon | ✅ Passed | | |
| STT-010 | Place order without coupon | ✅ Passed | | |
| STT-011 | Re-Apply after Rejected | ✅ Passed | | |
| STT-012 | Apply lại khi đã Applied (chồng mã) | ❌ Failed | BUG-FR09-001 | Cho phép cộng dồn mã giảm giá |
| STT-013 | Checkout khi coupon bị Rejected | ✅ Passed | | |
| STT-014 | Apply coupon sau khi Checked Out | ✅ Passed | | |
| STT-015 | Place Order lại sau khi Checked Out | ✅ Passed | | |
| STT-016 | Double-click Apply (Race condition) | ✅ Passed | | |
| STT-017 | Apply mã rỗng | ✅ Passed | | |
| STT-018 | EXPIRED with is_active=1 | ❌ Failed | BUG-FR09-002 | Quên check expired_at khi is_active=1 |
| STT-019 | SAVE10 at min_order_amount | ✅ Passed | | |
| STT-020 | VIP100 at max_uses - 1 | ✅ Passed | | |
| STT-021 | VIP100 at max_uses_per_user | ✅ Passed | | |

## Defect Summary

1. **BUG-FR09-001:** (Major) Hệ thống cho phép áp dụng chồng nhiều coupon nếu người dùng tiếp tục nhập mã mới sau khi đã ở trạng thái Applied.
2. **BUG-FR09-002:** (Major) Backend thiếu logic kiểm tra thời gian thực (C2) khi flag `is_active` của coupon vẫn là 1.
