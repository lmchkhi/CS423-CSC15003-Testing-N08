# [BUG][Profile] Trường Họ Tên bắt buộc thiếu dấu `*` và thông báo inline

## Found by Test Case
GUI-019, GUI-020

## Requirement liên quan
FR-04, FR-22

## Severity / Priority
Major / P1

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5173/profile
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập và mở `/profile`.
2. Quan sát nhãn “Họ Tên”.
3. Xóa giá trị Họ Tên và gửi form.

## Expected result
Nhãn có dấu `*`; thông báo bắt buộc rõ ràng xuất hiện phía trên nút “Cập nhật” và liên kết với trường.

## Actual result
Input Họ Tên có thuộc tính `required` nhưng nhãn không có `*`; form không có vùng thông báo validation inline phía trên nút và control không có `aria-describedby`.

## Evidence
![Evidence](../gui-testing/evidence/profile-page-baseline.png)
