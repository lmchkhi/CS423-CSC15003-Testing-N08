# BUG-IA03-PRODUCTDETAIL-002: Bấm nút Back của trình duyệt từ trang chi tiết không giữ lại vị trí cuộn của trang danh sách

## Found by Test Case
GUI-027

## Requirement liên quan
IA03 chuẩn (giữ trạng thái điều hướng khi quay lại)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/ → /product/3 → back
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Vào trang chủ, cuộn xuống để thấy hàng sản phẩm thứ 2 (AirPods Pro, Keychron Q1).
2. Bấm "Xem chi tiết" của MacBook Pro M3.
3. Bấm nút Back của trình duyệt.

## Expected result
Trang danh sách sản phẩm hiển thị lại đúng vị trí cuộn trước đó (đã cuộn xuống hàng thứ 2).

## Actual result
Trang danh sách sản phẩm quay lại đúng nội dung nhưng vị trí cuộn bị reset về đầu trang (top), không giữ lại vị trí đã cuộn trước khi vào trang chi tiết.

## Evidence
Không có bug nào về mặt nội dung (dữ liệu danh sách vẫn đúng), lỗi chỉ ở vị trí cuộn — không cần ảnh chụp minh họa riêng vì trạng thái cuối cùng trông giống trang tải mới bình thường; xem lại bằng cách tái hiện các bước trên.
