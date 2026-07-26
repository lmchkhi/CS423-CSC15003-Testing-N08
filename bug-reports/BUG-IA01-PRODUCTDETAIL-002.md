# BUG-IA01-PRODUCTDETAIL-002: Trang chi tiết sản phẩm không hiển thị trường "Danh mục"

## Found by Test Case
GUI-005

## Requirement liên quan
FR-06 (Xem chi tiết sản phẩm — "Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả, Danh mục")

## Severity / Priority
Major / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/product/1 .. /product/5 (toàn bộ 5 sản phẩm)
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Vào lần lượt các trang http://localhost:5173/product/1 đến /product/5.
2. Quan sát toàn bộ nội dung hiển thị: ảnh, tên, giá, mô tả, ô số lượng, nút thêm vào giỏ.
3. Gọi trực tiếp API `GET http://localhost:3000/api/products` để xác nhận backend có trả về trường `category_id` cho mỗi sản phẩm.

## Expected result
FR-06 yêu cầu trang chi tiết hiển thị đầy đủ Ảnh lớn, Tên, Giá, Mô tả, **Danh mục**.

## Actual result
Không có sản phẩm nào trong 5 sản phẩm hiển thị tên danh mục trên trang chi tiết, mặc dù backend đã có sẵn `category_id` cho mọi sản phẩm (`iPhone 15 Pro Max`: category_id=1, `MacBook Pro M3`: category_id=2, v.v.). Xác nhận qua source `frontend-web/src/pages/ProductDetail.jsx` — component chỉ render `product.name`, `product.price`, `product.description`, không có dòng nào render category.

## Evidence
![BUG-IA01-PRODUCTDETAIL-002](screenshots/BUG-IA01-PRODUCTDETAIL-002.png)
