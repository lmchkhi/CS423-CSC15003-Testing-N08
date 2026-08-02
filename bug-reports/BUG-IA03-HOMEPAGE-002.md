# BUG-IA03-HOMEPAGE-002: Bấm Back từ trang chi tiết sản phẩm về trang chủ làm mất từ khóa tìm kiếm và kết quả đã lọc

## Found by Test Case
GUI-071

## Requirement liên quan
IA03 chuẩn (Browser back/forward phải giữ đúng trạng thái, không mất dữ liệu)

## Severity / Priority
Major / P1

## Environment
**Browser/Device**: Chrome (desktop)
**OS**: macOS
**URL**: http://localhost:5173/
**Build/commit**: eshop-sut @ 85af3ba

## Steps to reproduce
1. Tại trang chủ, tìm kiếm từ khóa "pro": kết quả lọc còn 3 sản phẩm (iPhone 15 Pro Max, MacBook Pro M3, AirPods Pro 2).
2. Bấm "Xem chi tiết" MacBook Pro M3 → điều hướng sang `/product/3`.
3. Bấm nút Back của trình duyệt → quay lại `/`.
4. Quan sát: ô tìm kiếm trống rỗng, toàn bộ 5 sản phẩm hiển thị lại (không còn lọc theo "pro"), dòng "Kết quả tìm kiếm cho: pro" biến mất hoàn toàn.
5. Quan sát thêm: URL của trang tìm kiếm vẫn là `http://localhost:5173/` không đổi, không có tham số nào (vd `?search=pro`) được thêm vào URL khi tìm kiếm, nên trình duyệt không có nơi nào trong chính URL để khôi phục lại từ khóa khi điều hướng qua lại bằng Back/Forward.

## Expected result
Bấm Back từ trang chi tiết sản phẩm phải quay lại đúng trạng thái trước đó của trang chủ, giữ nguyên từ khóa tìm kiếm và kết quả đã lọc (lý tưởng là đưa từ khóa vào query string URL để trạng thái là một phần của lịch sử điều hướng).

## Actual result
Từ khóa tìm kiếm và kết quả lọc bị mất hoàn toàn sau khi Back, người dùng phải tìm kiếm lại từ đầu, trải nghiệm gây khó chịu đặc biệt khi danh sách sản phẩm dài.

## Evidence
![BUG-IA03-HOMEPAGE-002](screenshots/BUG-IA03-HOMEPAGE-002.png)

## Cũng xác nhận trên màn Search Results
Cùng root cause (từ khóa tìm kiếm không được lưu vào URL dưới bất kỳ hình
thức nào) tái hiện theo 2 hướng riêng biệt khi kiểm thử trực tiếp màn Search
Results (`checklist/gui-checklist.md`):
- **Chiều ra (outbound)**, GUI-091: sau khi submit một tìm kiếm hợp lệ và
  ra đúng kết quả, `location.search` vẫn luôn là chuỗi rỗng, xác nhận qua
  `location.href === 'http://localhost:5173/'` ngay cả khi đang xem kết quả
  đã lọc theo "pro".
- **Chiều vào (inbound)**, GUI-094: truy cập trực tiếp
  `http://localhost:5173/?search=pro` không hề áp dụng query param này,
  trang tải lên với ô tìm kiếm trống và hiển thị toàn bộ 5 sản phẩm, hoàn
  toàn bỏ qua tham số `search` trên URL.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/108
