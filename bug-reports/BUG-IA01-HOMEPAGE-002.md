# BUG-IA01-HOMEPAGE-002: Giá sản phẩm trên trang chủ hiển thị "VND" thay vì ký hiệu ₫, không nhất quán với Product Detail và Giỏ hàng

## Found by Test Case
GUI-049

## Requirement liên quan
FR-21 (Nhất quán đơn vị tiền: luôn dùng ký hiệu ₫ với định dạng phân cách hàng nghìn)

## Severity / Priority
Minor / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Mở trang chủ — quan sát giá của cả 5 sản phẩm, ví dụ "30,000,000 VND".
2. So sánh với trang Chi tiết sản phẩm (`/product/3`) và trang Giỏ hàng (`/cart`) — cả hai đều hiển thị "45,000,000 đ" / "30,000,000 đ" (ký hiệu đ, không phải chữ "VND").
3. Xác nhận qua source `frontend-web/src/pages/Home.jsx` dòng 87: `{Number(p.price).toLocaleString()} VND` — literal string " VND" bị hard-code thay vì ký hiệu ₫/đ dùng ở các trang khác.

## Expected result
Toàn bộ màn hình trong hệ thống dùng thống nhất ký hiệu ₫ (hoặc đ) với dấu phân cách hàng nghìn cho mọi hiển thị giá tiền (FR-21).

## Actual result
Riêng trang chủ hiển thị đơn vị "VND" bằng chữ, khác với Product Detail và Giỏ hàng đều dùng ký hiệu đ — không nhất quán trong cùng một hệ thống.

## Evidence
![BUG-IA01-HOMEPAGE-002](screenshots/BUG-IA01-HOMEPAGE-002.png)
