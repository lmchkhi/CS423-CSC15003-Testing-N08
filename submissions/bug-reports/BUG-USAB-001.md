---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Product Management] Cập nhật sản phẩm không lưu đúng và làm sai danh sách sản phẩm"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
USAB-ADMIN-FLOW-P01-P07

## Requirement liên quan
FR-15: Quản lý Sản phẩm (Product CRUD) - Khi Sửa một sản phẩm, chỉ sản phẩm đó bị thay đổi; các sản phẩm khác giữ nguyên.

## Severity / Priority
Critical / P0

## Environment
Web Admin URL `https://frontend-admin-livid-two.vercel.app/`, các browser/device được ghi trong `reports/usability/session-notes/session-notes-P01.md` đến `reports/usability/session-notes/session-notes-P07.md`.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Product Management / Sản phẩm.
3. Tạo một sản phẩm thử nghiệm.
4. Bấm sửa sản phẩm vừa tạo.
5. Thay đổi giá, mô tả hoặc tên sản phẩm.
6. Lưu thay đổi và quan sát danh sách sản phẩm.

## Expected result
Chỉ sản phẩm được chọn được cập nhật. Giá/mô tả/tên mới được lưu đúng và các sản phẩm khác trong danh sách giữ nguyên dữ liệu cũ.

## Actual result
Nhiều participant ghi nhận product update không lưu đúng hoặc làm danh sách sản phẩm hiển thị sai. Một số session thấy tất cả sản phẩm có sẵn bị đổi tên theo sản phẩm vừa sửa; một số session thấy hệ thống báo cập nhật thành công nhưng giá/mô tả không cập nhật đúng.

## Evidence
- Session notes: `reports/usability/session-notes/session-notes-P01.md` đến `reports/usability/session-notes/session-notes-P07.md`
- Transcript examples:
  - `reports/usability/transcript/P04.txt`, `02:42-03:15`
  - `reports/usability/transcript/P05.txt`, `04:15-05:20`
  - `reports/usability/transcript/P07.txt`, `01:34-02:18`
- Related GUI screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-042.png)

## GitHub issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/198

## GitHub labels
- Type: Bug
- Status: New
- Module: Product Management
- Priority: P0
- Severity: Critical
