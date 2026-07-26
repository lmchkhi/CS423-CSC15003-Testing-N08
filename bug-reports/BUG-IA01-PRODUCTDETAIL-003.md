# BUG-IA01-PRODUCTDETAIL-003: Không có trạng thái loading/skeleton khi ảnh sản phẩm đang tải

## Found by Test Case
GUI-012

## Requirement liên quan
IA01 chuẩn (loading performance perception); liên quan gián tiếp FR-06 (ảnh lớn sản phẩm)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/product/1
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Vào trang chi tiết sản phẩm bất kỳ.
2. Kiểm tra DOM tại thời điểm ảnh chưa tải xong: thẻ `<img>` được render ngay với `src` trỏ tới `placehold.co`, không có wrapper skeleton/placeholder nào bao quanh.

## Expected result
Trong lúc ảnh (đặc biệt ảnh từ domain ngoài `placehold.co`, có độ trễ mạng) đang tải, nên có skeleton hoặc placeholder màu xám thay vì khoảng trắng/giật hình khi ảnh load xong.

## Actual result
Component `ProductDetail.jsx` render trực tiếp `<img src={product.imageUrl} .../>` không có state loading, không có skeleton — nếu mạng chậm, người dùng sẽ thấy khoảng trắng trống cho tới khi ảnh tải xong rồi "giật" hiện ra.

## Evidence
![BUG-IA01-PRODUCTDETAIL-003](screenshots/BUG-IA01-PRODUCTDETAIL-003.png)
