# BUG-IA02-SEARCHRESULTS-002: Từ khóa tìm kiếm có khoảng trắng thừa ở đầu/cuối không trả về kết quả đúng

## Found by Test Case
GUI-098

## Requirement liên quan
FR-05 (Xem danh sách & Tìm kiếm sản phẩm — "Thanh tìm kiếm tìm theo tên sản phẩm")

## Severity / Priority
Minor / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Gọi trực tiếp API để cô lập vấn đề khỏi các bất ổn khác của giao diện:
   `GET http://localhost:3000/api/products?search=iphone` → trả về 1 kết quả ("iPhone 15 Pro Max").
   `GET http://localhost:3000/api/products?search=%20iphone%20` (có khoảng trắng ở đầu và cuối) → trả về 0 kết quả.
2. Xác nhận lại qua giao diện thật: gõ " iphone " (có khoảng trắng đầu/cuối) vào ô tìm kiếm rồi bấm "Tìm" — dòng "Kết quả tìm kiếm cho: iphone" hiển thị (trình duyệt trim khoảng trắng khi hiển thị text), nhưng lưới sản phẩm trả về **0 sản phẩm**, dù cùng từ khóa "iphone" không có khoảng trắng thừa trả về đúng 1 sản phẩm.

## Expected result
Backend phải tự động trim (loại bỏ) khoảng trắng thừa ở đầu/cuối từ khóa tìm kiếm trước khi so khớp, để " iphone " và "iphone" trả về cùng một kết quả — đây là hành vi chuẩn của mọi ô tìm kiếm, đặc biệt quan trọng vì khoảng trắng thừa rất dễ xảy ra khi người dùng copy-paste từ khóa.

## Actual result
Khoảng trắng thừa không được trim ở backend, khiến từ khóa hợp lệ bị coi là không khớp bất kỳ sản phẩm nào — người dùng nhận nhầm kết quả "không tìm thấy" cho một sản phẩm thực sự tồn tại.

## Evidence
![BUG-IA02-SEARCHRESULTS-002](screenshots/BUG-IA02-SEARCHRESULTS-002.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/191
