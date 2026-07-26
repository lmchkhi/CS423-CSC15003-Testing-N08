# BUG-IA04-HOMEPAGE-002: Ảnh sản phẩm trong lưới trang chủ có `alt=""` rỗng, không mô tả nội dung

## Found by Test Case
GUI-078

## Requirement liên quan
FR-05 (Mỗi sản phẩm hiển thị Ảnh có alt text mô tả); FR-24 (Tất cả ảnh sản phẩm phải có thuộc tính `alt` mô tả nội dung ảnh, không để rỗng)

## Severity / Priority
Minor / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Chạy `[...document.querySelectorAll('img')].map(img => img.getAttribute('alt'))` trên trang chủ — kết quả: `["", "", "", "", ""]` cho cả 5 ảnh sản phẩm.
2. Xác nhận qua source `frontend-web/src/pages/Home.jsx` dòng 82: `<img src={p.imageUrl} alt="" className="w-full h-48 object-cover mb-4 rounded" />` — thuộc tính `alt` bị hard-code rỗng, không dùng `p.name`.

## Expected result
Mỗi ảnh sản phẩm phải có `alt` mô tả đúng tên sản phẩm (ví dụ `alt={p.name}`), theo FR-05/FR-24.

## Actual result
Toàn bộ 5 ảnh sản phẩm trên trang chủ có `alt=""` rỗng — người dùng screen reader không nhận được bất kỳ mô tả nào cho ảnh sản phẩm khi duyệt lưới sản phẩm.

## Evidence
![BUG-IA04-HOMEPAGE-002](screenshots/BUG-IA04-HOMEPAGE-002.png)
