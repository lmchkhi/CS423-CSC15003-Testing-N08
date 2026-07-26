# BUG-IA02-HOMEPAGE-001: Ô tìm kiếm không có nhãn thực sự, chỉ dựa vào placeholder

## Found by Test Case
GUI-059

## Requirement liên quan
FR-22 (Form Requirements); IA02 chuẩn (placeholder không thay thế nhãn thật)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Kiểm tra qua DevTools (Inspect Element / Accessibility tree): ô tìm kiếm không có thuộc tính `aria-label`, và không có phần tử `<label>` nào trên trang liên kết tới ô nhập này qua `for`/`id`.
2. Khi người dùng bắt đầu gõ, placeholder biến mất khỏi màn hình và không còn văn bản nào mô tả mục đích ô nhập cho screen reader (tên truy cập của ô nhập trong Accessibility tree chỉ còn dựa vào placeholder, vốn không phải nguồn tên truy cập bền vững).

## Expected result
Ô tìm kiếm cần có tên truy cập (accessible name) bền vững — qua `aria-label="Tìm kiếm sản phẩm"` hoặc một `<label>` liên kết — không chỉ dựa vào placeholder vốn biến mất khi có giá trị.

## Actual result
Ô tìm kiếm chỉ có placeholder, không có nhãn/aria-label nào — người dùng screen reader mất khả năng biết mục đích ô nhập ngay khi họ bắt đầu gõ.

## Evidence
![BUG-IA02-HOMEPAGE-001](screenshots/BUG-IA02-HOMEPAGE-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/104
