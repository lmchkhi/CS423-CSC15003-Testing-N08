# Tập con item dùng cho kiểm thử đa nền tảng (HW03 Task 3)

## Vì sao không chạy lại cả 110 item trên cả 3 platform

§6 yêu cầu "thực hiện Task 1 trên ít nhất 3 nền tảng". Chạy lại nguyên 110 item
trên từng platform nghe thì đầy đủ, nhưng phần lớn trong số đó không đo được
điều gì mới: chúng kiểm tra hành vi của backend, cấu trúc dữ liệu, hoặc nội
dung DOM do chính React sinh ra, tức là những thứ giống hệt nhau bất kể trình
duyệt nào đang render.

Ví dụ, chạy lại GUI-064 (SQL Injection trong API tìm kiếm) trên Firefox và
Android chỉ chứng minh rằng backend vẫn có lỗi đó, một điều đã biết từ Task 1
và không liên quan gì tới trình duyệt. Tương tự với GUI-098 (backend không trim
khoảng trắng), GUI-078 (`alt` rỗng trong markup), GUI-023 (không có breadcrumb
trong DOM), GUI-095 (không có `aria-live` ở bất kỳ đâu).

Vì vậy tôi chọn ra 16 item thực sự phụ thuộc vào engine render, hệ điều hành,
hoặc loại thiết bị, và chỉ chạy đúng những item đó trên cả 3 platform. 94 item
còn lại được xếp là platform-invariant với lý do ghi ở mục dưới.

Cách làm này cũng đúng với thực tế: khác biệt giữa các trình duyệt nằm ở
rendering, ở control gốc của trình duyệt, ở cách xử lý history, và ở tương tác
cảm ứng, chứ không nằm ở logic nghiệp vụ.

## 16 item được chọn

| # | Item gốc | Nội dung kiểm tra | Vì sao phụ thuộc platform |
|---|---|---|---|
| 1 | GUI-049 | Định dạng giá trên lưới sản phẩm | `toLocaleString` cho kết quả khác nhau giữa các JS engine |
| 2 | GUI-052 | Tỷ lệ khung hình ảnh sản phẩm | Mức hỗ trợ `object-fit` khác nhau |
| 3 | GUI-054 | Canh lưới và khoảng cách giữa các thẻ | Cách triển khai CSS Grid khác nhau |
| 4 | GUI-057 | Số cột của lưới theo breakpoint | Phụ thuộc viewport và devicePixelRatio thật của thiết bị |
| 5 | GUI-056 | Độ tương phản giá sản phẩm | Cách render màu và font khác nhau giữa các hệ điều hành |
| 6 | GUI-045 | Dấu tiếng Việt trong tên và mô tả | Font stack mặc định khác nhau theo hệ điều hành |
| 7 | GUI-085 | Dấu tiếng Việt trong từ khóa tìm kiếm | Bàn phím và IME khác nhau, rõ nhất trên Android |
| 8 | GUI-016 | Ô số lượng từ chối ký tự chữ | Cơ chế lọc input của `type="number"` do trình duyệt quyết định |
| 9 | GUI-018 | Ô số lượng dùng bàn phím số trên di động | Chỉ kiểm chứng được trên thiết bị thật |
| 10 | GUI-065 | Thứ tự Tab và focus ring | Style focus mặc định do trình duyệt quyết định |
| 11 | GUI-071 | Back làm mất từ khóa tìm kiếm | Cách triển khai history và scroll restoration khác nhau |
| 12 | GUI-028 | Deep link tới `/product/:id` | Phụ thuộc routing phía hosting, đây là item tìm ra BUG-XPLAT-DEEPLINK-001 |
| 13 | GUI-074 | Kích thước vùng chạm trên di động | Chỉ đo được trên thiết bị cảm ứng thật |
| 14 | GUI-033 | Phản hồi sau khi bấm Thêm vào giỏ hàng | Kiểm tra xem lỗi bấm 2 lần có phải do trình duyệt hay không |
| 15 | GUI-081 | Thêm cùng sản phẩm 2 lần tạo dòng trùng | Trạng thái giỏ hàng nằm ở client, có thể khác theo cách lưu trữ của trình duyệt |
| 16 | GUI-100 | Trạng thái tìm kiếm 0 kết quả | Bố cục trạng thái rỗng ở các viewport khác nhau |

Phân bố theo khía cạnh IA: IA01 có 5 item (1, 2, 3, 4, 5), IA02 có 4 item (6,
7, 8, 9), IA03 có 4 item (10, 11, 12, 13), IA04 có 3 item (14, 15, 16). Cả 4
khía cạnh đều được chạm tới trên từng platform.

## Vì sao 94 item còn lại là platform-invariant

Xếp thành 4 nhóm:

1. **Hành vi backend** (khoảng 12 item, gồm GUI-060, 064, 079, 097, 098): kết
   quả do server trả về, giống hệt nhau bất kể client nào gọi. Đã xác nhận
   bằng cách gọi thẳng API ở Task 1.
2. **Cấu trúc DOM và markup** (khoảng 34 item, gồm GUI-001, 023, 047, 078,
   095): do cùng một bundle React sinh ra, cùng một markup được gửi tới mọi
   trình duyệt. Sự vắng mặt của một phần tử (breadcrumb, `aria-live`, badge)
   không phụ thuộc vào engine render.
3. **Tính năng không tồn tại trong SUT** (4 item N/A: GUI-019, 030, 036, 093):
   không có gì để kiểm thử trên bất kỳ platform nào.
4. **Logic nghiệp vụ và trạng thái dữ liệu** (khoảng 44 item còn lại, gồm
   GUI-013, 038, 041, 062, 088): phụ thuộc vào code ứng dụng và dữ liệu, không
   phụ thuộc vào nơi code đó chạy.

Nếu một item trong nhóm platform-invariant lại cho kết quả khác nhau giữa các
platform trong lúc chạy tập con, tôi sẽ ghi nhận và mở rộng tập con. Trên thực
tế điều này không xảy ra: mọi khác biệt quan sát được đều nằm trong 16 item đã
chọn, và khác biệt duy nhất mang tính trình duyệt thuần túy là nút spinner
tăng giảm mặc định của Firefox ở ô số lượng (item 8).

## Môi trường kiểm thử

Task 3 chạy trên **bản deploy thật** chứ không phải dev server localhost dùng ở
Task 1 và Task 2:

- Frontend: `https://frontend-web-eight-mu.vercel.app/` (Vercel)
- Backend: `https://eshop-backend-demo2.onrender.com` (Render)

Ba lý do:

1. BrowserStack Live chạy trên máy ảo ở xa, không truy cập được `localhost` của
   máy tôi trừ khi cài thêm BrowserStack Local tunnel. Dùng bản deploy thật là
   cách trung thực để test từ xa mà không phải dựng thêm hạ tầng.
2. Đây là bản mà người dùng thật sự truy cập, nên khác biệt tìm được ở đây có
   giá trị thực tế hơn.
3. `BUG-XPLAT-DEEPLINK-001` chỉ tồn tại trên bản deploy. Nếu chỉ test localhost
   thì không bao giờ phát hiện được lỗi này.

**Cần ghi nhận trung thực**: tôi không xác minh được bản deploy trên Vercel có
đúng là commit `85af3ba` đã dùng cho Task 1 hay không. Vì vậy một khác biệt so
với kết quả Task 1 về nguyên tắc có thể đến từ chênh lệch build chứ không phải
từ platform. `BUG-XPLAT-DEEPLINK-001` là ví dụ đúng cho khả năng đó: nó là lỗi
cấu hình hosting, không phải lỗi trình duyệt, và tôi đã ghi rõ như vậy trong
bug report.
