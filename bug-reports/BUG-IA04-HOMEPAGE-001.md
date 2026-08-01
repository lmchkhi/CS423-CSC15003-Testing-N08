# BUG-IA04-HOMEPAGE-001: Không có bất kỳ trạng thái loading nào khi tải hoặc tìm kiếm sản phẩm

## Found by Test Case
GUI-058, GUI-063, GUI-080, GUI-082

## Requirement liên quan
FR-05 (Khi đang tải dữ liệu phải hiển thị trạng thái loading)

## Severity / Priority
Minor / P2

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Mở trang chủ và tìm kiếm với một từ khóa bất kỳ, lặp lại nhiều lần, quan sát: không có spinner/skeleton nào xuất hiện ở bất kỳ thời điểm nào, kể cả khi giả lập mạng chậm (patch XMLHttpRequest để trì hoãn phản hồi trước khi trả lỗi, mô phỏng một request chậm hơn bình thường).
2. Kiểm tra ở cả thời điểm tải trang lần đầu và khi bấm "Tìm" nhiều lần liên tiếp, cùng một kết quả: không có bất kỳ phần tử loading/disable nào xuất hiện trên giao diện, dù thời gian chờ dài hay ngắn.

## Expected result
Khi đang tải danh sách sản phẩm lần đầu, khi tìm kiếm lại, hoặc khi mạng chậm, phải có trạng thái loading rõ ràng (skeleton/spinner), tránh nội dung xuất hiện đột ngột hoặc treo vô thời hạn không có phản hồi.

## Actual result
Không tồn tại bất kỳ trạng thái loading nào trong toàn bộ luồng tải/tìm kiếm sản phẩm ở trang chủ, người dùng không có cách nào biết hệ thống đang xử lý hay đã đứng yên, đặc biệt rủi ro khi mạng chậm.

## Evidence
![BUG-IA04-HOMEPAGE-001](screenshots/BUG-IA04-HOMEPAGE-001.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/110
