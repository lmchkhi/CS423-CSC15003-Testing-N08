# BUG-IA01-HOMEPAGE-003: Giá sản phẩm trên trang chủ không đạt chuẩn tương phản WCAG AA

## Found by Test Case
GUI-056

## Requirement liên quan
IA01 chuẩn (Color contrast — WCAG AA: tối thiểu 4.5:1 cho chữ thường)

## Severity / Priority
Minor / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Mở trang chủ, kiểm tra màu chữ giá sản phẩm (class `text-red-500`, rgb(239,68,68)) trên nền trắng (rgb(255,255,255)).
2. Tính tỷ lệ tương phản bằng công thức WCAG relative luminance qua JS console: kết quả 3.76:1.
3. So sánh với tên sản phẩm (đen/trắng): 21:1 — đạt chuẩn thoải mái.

## Expected result
Mọi chữ trên trang (kể cả giá) phải đạt tối thiểu 4.5:1 với nền theo chuẩn WCAG AA cho chữ thường.

## Actual result
Giá sản phẩm (`text-red-500`) chỉ đạt 3.76:1, dưới ngưỡng 4.5:1 — khó đọc hơn mức cần thiết, đặc biệt với người dùng có thị lực kém. Product Detail dùng `text-red-600` (đậm hơn) cho cùng vai trò và đạt 4.83:1 — trang chủ nên đổi sang cùng shade để vừa nhất quán vừa đạt chuẩn.

## Evidence
![BUG-IA01-HOMEPAGE-003](screenshots/BUG-IA01-HOMEPAGE-003.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/103
