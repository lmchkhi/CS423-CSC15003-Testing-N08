# BUG-IA03-PRODUCTDETAIL-002: Bấm Back từ trang chi tiết làm mất vị trí cuộn của trang danh sách khi danh sách sản phẩm tải chậm

## Found by Test Case
GUI-027

## Requirement liên quan
IA03 chuẩn (giữ trạng thái điều hướng khi quay lại)

## Severity / Priority
Minor / P3

## Environment
**Browser/Device**: Chrome (desktop, qua Claude for Chrome)
**OS**: macOS
**URL**: http://localhost:5173/ → /product/5 → Back
**Build/commit**: eshop-sut @ 85af3ba

**Điều kiện tái hiện**: lỗi chỉ xuất hiện khi lệnh gọi lấy danh sách sản phẩm
trả về chậm hơn thời điểm trình duyệt khôi phục vị trí cuộn. Trên localhost
tải nhanh, vị trí cuộn được khôi phục đúng và lỗi **không** tái hiện. Đo bằng
cách làm chậm phản hồi của `/api/products` khoảng 1,5 giây, tương đương điều
kiện mạng chậm của người dùng thật (cùng kỹ thuật mô phỏng mạng đã dùng ở
GUI-079).

## Steps to reproduce
1. Mở DevTools, tab Network, đặt throttling ở mức "Slow 3G".
2. Thu nhỏ cửa sổ trình duyệt để trang chủ có thể cuộn được một đoạn đáng kể.
3. Vào trang chủ, cuộn xuống tới hàng sản phẩm thứ 2 (AirPods Pro 2, Keychron Q1).
4. Bấm "Xem chi tiết" của một sản phẩm bất kỳ ở hàng dưới.
5. Bấm nút Back của trình duyệt và chờ cho tới khi đủ 5 sản phẩm hiện lại.

## Expected result
Sau khi danh sách sản phẩm render xong, trang quay lại đúng vị trí cuộn trước
khi rời đi (hàng sản phẩm thứ 2).

## Actual result
Trang quay lại đúng nội dung nhưng nằm ở đầu trang. Trình duyệt cố khôi phục
vị trí cuộn lúc trang còn rỗng, chiều cao trang lúc đó bằng 0 nên vị trí bị
kẹp về 0; khi dữ liệu về và trang cao trở lại thì vị trí cuộn không được khôi
phục lần nữa.

Đo cụ thể: cuộn tới `scrollY = 53` trước khi rời trang, sau khi Back thì
`scrollY = 0` ở mọi mốc đo (200ms, 800ms, 1700ms, 2600ms, 3500ms), kể cả sau
khi lưới đã render đủ 5 sản phẩm ở mốc 1700ms. Khi không làm chậm mạng, cùng
thao tác cho `scrollY = 53` (khôi phục đúng), xác nhận đây là lỗi phụ thuộc
thời điểm chứ không phải lỗi xảy ra mọi lúc.

## Evidence
![Vị trí cuộn không được khôi phục sau khi Back khi danh sách tải chậm](screenshots/BUG-IA03-PRODUCTDETAIL-002.png)

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/99
