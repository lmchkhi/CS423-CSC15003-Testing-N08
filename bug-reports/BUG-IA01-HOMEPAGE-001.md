# BUG-IA01-HOMEPAGE-001: Trang chủ có 2 thẻ `<h1>` thay vì đúng 1 thẻ

## Found by Test Case
GUI-047

## Requirement liên quan
FR-05 (Trang chủ chỉ có đúng một thẻ `<h1>`); FR-21 (Tiêu đề trang: mỗi trang có đúng 1 thẻ `<h1>`)

## Severity / Priority
Major / P1

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Mở trang chủ (http://localhost:5173/), đã đăng nhập test@eshop.com.
2. Chạy `document.querySelectorAll('h1')` trên console — trả về 2 phần tử: `"Danh sách sản phẩm"` (tiêu đề đầu trang) và `"Hiển thị 5 sản phẩm"` (dòng thống kê cuối danh sách sản phẩm).
3. Kiểm tra qua DevTools: thẻ thứ hai ("Hiển thị 5 sản phẩm") là dòng thống kê nhỏ ở cuối danh sách sản phẩm, về mặt nội dung/vai trò rõ ràng không phải là tiêu đề trang — lẽ ra phải là một đoạn văn bản thường (`<p>`) chứ không phải heading cấp 1 thứ hai.

## Expected result
Trang chủ chỉ có đúng 1 thẻ `<h1>` duy nhất, mô tả nội dung trang.

## Actual result
Trang chủ có 2 thẻ `<h1>` — dòng thống kê "Hiển thị N sản phẩm" bị gắn sai thẻ `<h1>` thay vì thẻ văn bản thường, vi phạm cấu trúc heading chuẩn (ảnh hưởng SEO và accessibility — screen reader sẽ đọc 2 heading cấp 1 trên cùng một trang).

## Evidence
![BUG-IA01-HOMEPAGE-001](screenshots/BUG-IA01-HOMEPAGE-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/101
