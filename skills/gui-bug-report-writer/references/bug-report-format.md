# Bug Report Format Reference

This reference distills the bug report format from `GUI_Testing.html`.

## Slide-Derived Bug Report Fields

A GUI bug report should include:

- Bug ID and title
- Environment
- Preconditions
- Steps to Reproduce
- Expected Result
- Actual Result
- Severity and Priority
- Screenshot or video evidence

Quality rules from the slides:

- Title must describe the defect accurately.
- Steps must be clear and reproducible.
- Expected and actual behavior must not be ambiguous.
- Environment must be complete enough to reproduce the issue.
- Evidence must visibly demonstrate the defect.

Flow from checklist to bug:

1. Start from a checklist item.
2. Execute it.
3. If it fails, record the failure.
4. Attach evidence.
5. Create the bug report.
6. Later perform re-test and regression.

## Markdown Template

Use Vietnamese prose, preserving English field names where useful.

```md
# BUG_<CHECKLIST_ID>: <Tiêu đề mô tả lỗi>

## Thông Tin Chung

| Trường | Giá trị |
|---|---|
| Bug ID | `BUG_<CHECKLIST_ID>` |
| Checklist ID | `<CHECKLIST_ID>` |
| Screen / Feature | `<Màn hình hoặc chức năng>` |
| Category | `<Visual / Functional / Validation / Responsive / Accessibility / ...>` |
| Status | `Open` |

## Environment

| Trường | Giá trị |
|---|---|
| Test Environment | `<Staging / Local / Production / Chưa cung cấp>` |
| Browser | `<Chrome / Edge / Firefox / Chưa cung cấp>` |
| Device / OS | `<Desktop / Mobile / OS / Chưa cung cấp>` |
| Viewport | `<1440x900 / 768x1024 / 390x844 / Chưa cung cấp>` |
| Account / Role | `<User role / Chưa cung cấp>` |

## Preconditions

- `<Điều kiện trước khi thực hiện bug reproduction>`

## Steps to Reproduce

1. `<Bước 1>`
2. `<Bước 2>`
3. `<Bước 3>`

## Expected Result

- `<Kết quả mong đợi lấy từ checklist hoặc requirement>`

## Actual Result

- `<Hành vi lỗi quan sát được>`

## Severity & Priority

| Trường | Giá trị | Lý do |
|---|---|---|
| Severity | `<Low / Medium / High / Critical>` | `<Mức độ ảnh hưởng tới user/system>` |
| Priority | `<Low / Medium / High / Critical>` | `<Mức độ cần sửa sớm>` |

## Evidence

- `<Screenshot / video / log / Chưa cung cấp>`

## Notes

- `<Ghi chú thêm, phạm vi ảnh hưởng, re-test/regression suggestion nếu có>`
```

## Severity Guidance

- `Critical`: blocks a core flow, causes data loss, payment/order failure, security/privacy issue, or app crash with no workaround.
- `High`: breaks an important user task, validation, checkout/cart/login flow, or makes a key screen unusable; workaround is poor or unavailable.
- `Medium`: affects usability, layout, responsive behavior, or a secondary function; workaround exists.
- `Low`: cosmetic issue, wording issue, minor alignment/spacing inconsistency, or low-risk visual defect.

## Priority Guidance

- `Critical`: fix immediately before release.
- `High`: fix in the current sprint/release if it affects common or high-value flows.
- `Medium`: schedule after higher-risk defects.
- `Low`: fix when capacity allows.

Priority can be higher than severity when the bug is visible to many users or affects a demo/release requirement. Severity can be higher than priority when impact is serious but the case is rare or out of current release scope.

## Example

```md
# BUG_RES-01: Product List bị tràn ngang tại viewport 390px

## Thông Tin Chung

| Trường | Giá trị |
|---|---|
| Bug ID | `BUG_RES-01` |
| Checklist ID | `RES-01` |
| Screen / Feature | Product List |
| Category | Responsive |
| Status | Open |

## Environment

| Trường | Giá trị |
|---|---|
| Test Environment | Local |
| Browser | Chrome |
| Device / OS | Mobile viewport |
| Viewport | 390x844 |
| Account / Role | Guest |

## Preconditions

- User đang ở màn hình Product List.

## Steps to Reproduce

1. Mở Product List.
2. Chuyển viewport sang `390x844`.
3. Quan sát chiều ngang của trang và product cards.

## Expected Result

- Product List không xuất hiện horizontal scroll.
- Product cards nằm gọn trong viewport.

## Actual Result

- Trang xuất hiện horizontal scroll tại viewport `390x844`.
- Một phần product card bị tràn ra ngoài màn hình.

## Severity & Priority

| Trường | Giá trị | Lý do |
|---|---|---|
| Severity | Medium | Lỗi ảnh hưởng trải nghiệm mobile nhưng chưa chặn hoàn toàn flow mua hàng. |
| Priority | High | Mobile viewport là phạm vi kiểm tra chính và lỗi dễ thấy với user. |

## Evidence

- Screenshot cho thấy horizontal scroll tại viewport `390x844`.

## Notes

- Cần re-test trên `390x844` và regression nhanh trên `768x1024`, `1440x900`.
```
