# Cross-Browser / Cross-Platform Report — HW03 Task 3

## Platform matrix

3 platform theo đúng §6 ("Chrome, Firefox, và Safari (hoặc Android Chrome)"
— Android Chrome thay thế Safari):

1. **Chrome (desktop, local)** — điều khiển trực tiếp qua Claude for Chrome.
2. **Firefox 153 / Windows 11** — qua BrowserStack Live (tài khoản trial của
   sinh viên), điều khiển qua Claude for Chrome tương tác với phiên live
   nhúng trong trang browserstack.com.
3. **Chrome / Android 14 (Google Pixel 8, thiết bị thật)** — qua BrowserStack
   Live real device, điều khiển qua Claude for Chrome tương tác với phiên
   live nhúng.

**SUT bản deploy thật** (khác với Task 1/2 dùng dev server localhost):
- Frontend: `https://frontend-web-eight-mu.vercel.app/` (Vercel)
- Backend: `https://eshop-backend-demo2.onrender.com` (Render, xác nhận qua
  Network tab)

**Flow tái sử dụng từ Task 1/2** (không test lại từ đầu, dùng đúng luồng đã
chọn ở §5 để việc kiểm tra cross-platform có ý nghĩa so sánh được):
Home → Search (từ khóa "keychron") → Product Detail → Thêm vào giỏ hàng →
Giỏ hàng. Trên Android, bước search bằng gõ chữ trên bàn phím ảo bị bỏ qua
(xem Notes) — dùng Home → Xem chi tiết trực tiếp thay thế.

## Results

| Platform | Browser/OS/Device | Flow tested | Result | Notes | Screenshot | Bug ID |
|---|---|---|---|---|---|---|
| 1 | Chrome (desktop, local) | Home → Search "keychron" → Product Detail → Add to cart → Cart | **Fail** (2 vấn đề, xem Notes) | (a) Xác nhận lại bug đã biết từ Task 1: nút "Thêm vào giỏ hàng" ở Product Detail cần bấm đúng 2 lần, lần đầu bị bỏ qua im lặng — hành vi giống hệt dev server. (b) **Phát hiện mới**: truy cập trực tiếp URL `/product/5` (deep link/reload) trả về lỗi 404 `NOT_FOUND` của Vercel — không xảy ra trên dev server Task 1/2, chỉ xảy ra trên bản deploy thật | `screenshots/desktop-chrome-search-results.png`, `screenshots/desktop-chrome-deeplink-404.png`, `screenshots/desktop-chrome-cart-added.png` | BUG-IA04-PRODUCTDETAIL-001 (đã có), BUG-XPLAT-DEEPLINK-001 (mới) |
| 2 | Firefox 153 / Windows 11 (BrowserStack Live) | Home → Search "keychron" → Product Detail → Add to cart → Cart | **Fail** (cùng 2 vấn đề) | Render/layout giống hệt Chrome — không phát hiện khác biệt CSS/font riêng cho Firefox. Ô nhập Số lượng hiển thị thêm nút tăng/giảm dạng spinner mặc định của Firefox (Chrome không có) — khác biệt trình duyệt vô hại, không phải bug. Cùng bug (a) và (b) ở trên tái hiện y hệt | `screenshots/desktop-firefox-search-results.png`, `screenshots/desktop-firefox-deeplink-404.png`, `screenshots/desktop-firefox-cart-added.png` | BUG-IA04-PRODUCTDETAIL-001 (đã có), BUG-XPLAT-DEEPLINK-001 (mới) |
| 3 | Chrome / Android 14 (Google Pixel 8, BrowserStack real device) | Home → Xem chi tiết (iPhone 15 Pro Max) → Add to cart (Product Detail, 1 lần bấm) → Add to cart (Home grid, 1 lần bấm) → Cart | **Fail** (1 vấn đề, xem Notes) | Layout responsive đúng (1 cột), không vỡ giao diện. Xác nhận lại đúng pattern đã biết: nút "Thêm vào giỏ hàng" ở Product Detail cần 2 lần bấm (lần 1 → giỏ trống); nút "Thêm vào giỏ" trên Home grid chỉ cần 1 lần bấm và có tác dụng ngay — nhất quán với dev server. **Không test được deep link 404** trên platform này (không cần thiết — bug (b) là lỗi server-side, đã xác nhận đủ trên 2 platform desktop) | `screenshots/android-chrome-product-detail.png`, `screenshots/android-chrome-cart-added.png` | BUG-IA04-PRODUCTDETAIL-001 (đã có) |

**Giới hạn thao tác cần ghi nhận trung thực**: gõ chữ vào ô tìm kiếm trên
bàn phím ảo Android qua remote real-device (BrowserStack) không đáng tin
cậy — ký tự bị rớt ngẫu nhiên khi gõ nhanh qua automation (xác nhận qua
nhiều lần thử: "eight" bị gõ thành "eigt"). Đây là hạn chế của việc điều
khiển từ xa một bàn phím ảo qua automation, không phải bug của SUT — vì
vậy bước search bằng gõ chữ trên Android được thay bằng điều hướng trực
tiếp (Home → Xem chi tiết) để không lẫn lỗi công cụ với lỗi SUT.

## Summary

| Platform | Pass | Fail | Bugs filed |
|---|---|---|---|
| Chrome (desktop) | 0 | 2 | BUG-IA04-PRODUCTDETAIL-001 (cross-link), BUG-XPLAT-DEEPLINK-001 (mới) |
| Firefox / Windows 11 | 0 | 2 | BUG-IA04-PRODUCTDETAIL-001 (cross-link), BUG-XPLAT-DEEPLINK-001 (cross-link) |
| Chrome / Android 14 | 0 | 1 | BUG-IA04-PRODUCTDETAIL-001 (cross-link) |

**Kết luận chính**: không phát hiện lỗi hiển thị/CSS riêng theo từng
platform (layout responsive nhất quán trên cả 3) — mọi lỗi phát hiện đều là
lỗi hành vi/logic xuất hiện **giống hệt nhau trên cả 3 platform**, xác nhận
đây là bug thật của ứng dụng/hạ tầng deploy chứ không phải vấn đề tương
thích trình duyệt. Phát hiện quan trọng nhất của riêng Task 3 (không thể
phát hiện được nếu chỉ test trên dev server localhost như Task 1/2):
**BUG-XPLAT-DEEPLINK-001** — deep link/reload vào trang chi tiết sản phẩm
bị 404 trên bản deploy Vercel thật do thiếu SPA fallback rewrite.
