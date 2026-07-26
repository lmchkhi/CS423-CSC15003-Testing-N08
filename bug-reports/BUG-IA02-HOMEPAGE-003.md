# BUG-IA02-HOMEPAGE-003: SQL Injection trong API tìm kiếm sản phẩm (backend, không dùng Parameterized Query)

## Found by Test Case
GUI-060, GUI-064 (phát hiện trong lúc kiểm thử an toàn hiển thị từ khóa tìm kiếm — vượt ngoài phạm vi item gốc, phát hiện thêm lỗ hổng backend)

## Requirement liên quan
SEC-05 (Truy vấn CSDL phải dùng Parameterized Query, không nối chuỗi trực tiếp); FR-05

## Severity / Priority
Critical / P0

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome) — lỗ hổng nằm ở backend, không phụ thuộc trình duyệt
**OS**: macOS
**URL**: http://localhost:5173/ (frontend) → http://localhost:3000/api/products?search=... (backend API bị khai thác)
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Mở trang chủ, gõ vào ô tìm kiếm: `<img src=x onerror="...">` rồi Tìm — server trả về HTTP 500 (xác nhận qua tab Network) với nội dung `Database Error: SQLITE_ERROR: near "data": syntax error`. Một dấu nháy kép đơn lẻ trong input đã làm vỡ cú pháp câu lệnh phía server và rò rỉ thông báo lỗi CSDL thô ra ngoài — dấu hiệu kinh điển của SQL Injection (error-based).
2. Xác nhận khai thác thật (boolean-based): gõ `zzz' OR '1'='1' -- ` (một chuỗi không khớp tên sản phẩm nào) rồi Tìm — kết quả trả về **toàn bộ 5 sản phẩm** thay vì 0 sản phẩm. Payload này chỉ có ý nghĩa nếu chuỗi nhập vào được nối trực tiếp vào bên trong mệnh đề `WHERE` của câu SQL (dấu `'` đóng chuỗi ký tự literal, `OR '1'='1'` biến điều kiện thành luôn đúng, `-- ` comment bỏ phần còn lại của câu lệnh) — kết quả quan sát được khớp chính xác với hành vi dự đoán của một lỗ hổng SQL Injection dạng nối chuỗi, không phải trùng hợp ngẫu nhiên.
3. Thử thêm một biến thể khác không cân bằng dấu nháy (`zzznotarealproduct%' OR '1'='1`, thiếu `-- ` để comment phần đuôi) — trả về HTTP 200 với 0 sản phẩm thay vì lỗi cú pháp, đúng như dự đoán cho một câu SQL vẫn hợp lệ về cú pháp nhưng điều kiện logic không còn là `TRUE` do phần đuôi câu lệnh gốc chưa được vô hiệu hóa — củng cố thêm giả thuyết về cách câu truy vấn được ghép chuỗi.
4. Thông báo lỗi CSDL thô trả về ở bước 1 tự nó cũng là một lỗ hổng độc lập: rò rỉ chi tiết nội bộ (tên engine CSDL, thông báo lỗi cú pháp) ra client, đồng thời nội dung lỗi đó lại được render thành HTML trên trang (xem BUG-IA02-HOMEPAGE-002) — một lỗ hổng thông tin hai lớp.

## Expected result
Ứng dụng phải dùng parameterized query cho mọi truy vấn CSDL (SEC-05), không cho phép bất kỳ input người dùng nào làm thay đổi cấu trúc/logic câu lệnh SQL. Thông báo lỗi trả về client không được chứa chi tiết lỗi CSDL thô.

## Actual result
Endpoint `GET /api/products?search=` cho phép SQL Injection đầy đủ — đã chứng minh bằng cả hai kỹ thuật độc lập (error-based: input đơn giản làm vỡ cú pháp và lộ lỗi CSDL thô; boolean-based: payload `OR '1'='1'` bypass hoàn toàn điều kiện tìm kiếm, trả về dữ liệu không liên quan gì đến từ khóa). Về lý thuyết, kẻ tấn công có thể mở rộng thành UNION-based injection để đọc dữ liệu từ các bảng khác trong CSDL (ví dụ bảng người dùng — xem SEC-01 về việc lưu mật khẩu), không chỉ giới hạn ở dữ liệu sản phẩm. Đây là lỗ hổng bảo mật nghiêm trọng nhất phát hiện được trong toàn bộ đợt kiểm thử GUI checklist.

## Evidence
![BUG-IA02-HOMEPAGE-003](screenshots/BUG-IA02-HOMEPAGE-003.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/106
