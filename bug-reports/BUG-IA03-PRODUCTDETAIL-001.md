# BUG-IA03-PRODUCTDETAIL-001: Trang chi tiết sản phẩm hoàn toàn không có breadcrumb

## Found by Test Case
GUI-023, GUI-024, GUI-025, GUI-026, GUI-031, GUI-032

## Requirement liên quan
FR-23 (Navigation Requirements: "Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán, Chi tiết sản phẩm)")

## Severity / Priority
Major / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/product/1 .. /product/5
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Vào bất kỳ trang chi tiết sản phẩm nào.
2. Quan sát toàn bộ vùng phía trên nội dung chính (ảnh/tên/giá).
3. Kiểm tra DOM: `document.querySelector('nav[aria-label*="readcrumb"], .breadcrumb, [class*="breadcrumb"]')` trả về `null`.

## Expected result
FR-23 quy định breadcrumb là **bắt buộc** ở trang Chi tiết sản phẩm (vd: Trang chủ > Danh mục > Tên sản phẩm), với các mắt trước là link, mắt cuối là text.

## Actual result
Không có breadcrumb nào được render trên trang chi tiết sản phẩm. Toàn bộ nội dung trang chỉ gồm: ảnh, tên (h1), giá, mô tả, ô số lượng, nút thêm vào giỏ, không có đường dẫn breadcrumb, cũng không có nút/link "Quay lại danh sách sản phẩm" nào khác. Người dùng chỉ có thể quay lại bằng nút Back của trình duyệt hoặc click logo "EShop". Do breadcrumb không tồn tại, các hành vi phụ thuộc vào nó (click từng mắt, điều hướng bàn phím, tap target trên mobile) đều không thể kiểm thử được.

## Evidence
![BUG-IA03-PRODUCTDETAIL-001](screenshots/BUG-IA03-PRODUCTDETAIL-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/98
