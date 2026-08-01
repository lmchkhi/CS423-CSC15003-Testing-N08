# BUG-IA04-SEARCHRESULTS-001: Không có cơ chế công bố nội dung động (focus/aria-live) khi kết quả tìm kiếm cập nhật

## Found by Test Case
GUI-092, GUI-095

## Requirement liên quan
IA03/IA04 chuẩn (accessibility: dynamic content phải được công bố cho screen reader; xem `ia-seed-categories.md`)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Tại trang chủ, tìm kiếm từ khóa "pro" (gõ + bấm "Tìm"), kết quả lọc còn 3 sản phẩm.
2. Kiểm tra `document.activeElement` ngay sau khi kết quả cập nhật: vẫn là nút "Tìm" (hành vi mặc định của trình duyệt sau khi click một button), không có bất kỳ cơ chế nào chủ động chuyển focus tới vùng thông báo kết quả mới cho người dùng dùng bàn phím/screen reader.
3. Quét toàn bộ trang bằng `document.querySelectorAll('[aria-live]')` ở cả trạng thái có kết quả và trạng thái trống, trả về 0 phần tử trong mọi trường hợp.

## Expected result
Khi nội dung trang thay đổi động do một hành động của người dùng (submit tìm kiếm), khu vực kết quả (dòng "Kết quả tìm kiếm cho..." và/hoặc số lượng sản phẩm) nên nằm trong một vùng `aria-live="polite"` (hoặc tương đương), hoặc focus nên được chuyển tới vùng đó, để người dùng screen reader biết nội dung đã thay đổi mà không cần dò lại toàn trang.

## Actual result
Không có `aria-live` nào tồn tại trên trang, và focus luôn ở lại nút "Tìm" sau khi submit, người dùng screen reader không có cách nào biết kết quả tìm kiếm đã cập nhật trừ khi tự điều hướng lại từ đầu trang.

## Evidence
![BUG-IA04-SEARCHRESULTS-001](screenshots/BUG-IA04-SEARCHRESULTS-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/192
