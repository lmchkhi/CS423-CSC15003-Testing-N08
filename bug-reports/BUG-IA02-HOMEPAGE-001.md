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
1. Xác nhận qua source `frontend-web/src/pages/Home.jsx`: `<input type="text" placeholder="Tìm kiếm..." value={search} onChange={...} className="border p-2 rounded" />` — không có `aria-label`, không có `id` gắn với `<label htmlFor>` nào.
2. Khi người dùng bắt đầu gõ, placeholder biến mất và không còn văn bản nào mô tả mục đích ô nhập cho screen reader.

## Expected result
Ô tìm kiếm cần có tên truy cập (accessible name) bền vững — qua `aria-label="Tìm kiếm sản phẩm"` hoặc một `<label>` liên kết — không chỉ dựa vào placeholder vốn biến mất khi có giá trị.

## Actual result
Ô tìm kiếm chỉ có placeholder, không có nhãn/aria-label nào — người dùng screen reader mất khả năng biết mục đích ô nhập ngay khi họ bắt đầu gõ.

## Evidence
![BUG-IA02-HOMEPAGE-001](screenshots/BUG-IA02-HOMEPAGE-001.png)
