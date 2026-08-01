# Báo cáo Cross-Browser / Cross-Platform (HW03 Task 3)

## Ma trận nền tảng

3 nền tảng theo §6 ("Chrome, Firefox, và Safari (hoặc Android Chrome)", dùng
Android Chrome thay cho Safari):

| # | Nền tảng | Cách chạy |
|---|---|---|
| 1 | **Chrome 150 / macOS 26.5.2** | Máy thật của sinh viên, chụp màn hình toàn cửa sổ |
| 2 | **Firefox 153 / Windows 11** | BrowserStack Live |
| 3 | **Chrome / Android 14, Google Pixel 8** | BrowserStack Live, thiết bị thật (serial 38231FDJH0XXXX) |

**Hệ thống được test**: bản deploy thật, không phải dev server localhost dùng ở
Task 1 và Task 2.

- Frontend: `https://frontend-web-eight-mu.vercel.app/` (Vercel)
- Backend: `https://eshop-backend-demo2.onrender.com` (Render)

Lý do chọn bản deploy: BrowserStack Live chạy trên máy ở xa nên không truy cập
được `localhost` của máy sinh viên nếu không dựng thêm BrowserStack Local
tunnel; và `BUG-XPLAT-DEEPLINK-001` chỉ tồn tại trên bản deploy, dev server
Vite tự rewrite mọi route về `index.html` nên không thể tái hiện. §6 chỉ nhắc
tới "localhost URL" trong điều kiện dành cho trường hợp *thay thế* khi trial
hết hạn, không áp dụng cho nhánh BrowserStack đang dùng ở đây.

**Cần ghi nhận**: không xác minh được bản deploy trên Vercel có đúng là commit
`85af3ba` đã dùng cho Task 1 hay không, nên về nguyên tắc một khác biệt so với
Task 1 có thể đến từ chênh lệch build. `BUG-XPLAT-DEEPLINK-001` đúng là một ví
dụ như vậy: đây là lỗi cấu hình hosting, không phải lỗi trình duyệt.

## Phạm vi: 16 item nhạy cảm với nền tảng

Không chạy lại cả 110 item trên từng nền tảng. Lý do và danh sách đầy đủ 16
item được chọn, kèm lập luận vì sao 94 item còn lại là platform-invariant, nằm
ở `cross-platform/subset-rationale.md`.

## Kết quả từng item trên từng nền tảng

Ký hiệu: **P** = Passed · **F** = Failed · **N/A** = không áp dụng cho nền tảng
đó · **–** = không kiểm thử lại ở lượt này (đã có kết quả ở Task 1) · **T** =
không kiểm thử được do giới hạn công cụ, xem mục Giới hạn bên dưới.

| # | Item | Nội dung | Task 1 (Chrome/localhost) | Chrome / macOS | Firefox / Win 11 | Chrome / Android 14 |
|---|---|---|---|---|---|---|
| 1 | GUI-049 | Định dạng giá trên lưới | F | **F** | **F** | – |
| 2 | GUI-052 | Tỷ lệ khung hình ảnh | P | **P** | **P** | **P** |
| 3 | GUI-054 | Canh lưới, khoảng cách thẻ | P | **P** | **P** | **P** |
| 4 | GUI-057 | Số cột theo breakpoint | P | **P** (3 cột) | **P** (3 cột) | **P** (1 cột) |
| 5 | GUI-056 | Tương phản giá sản phẩm | F | **F** | **F** | – |
| 6 | GUI-045 | Hiển thị dấu tiếng Việt | P | **P** | **P** | **P** |
| 7 | GUI-085 | Gõ từ khóa có dấu tiếng Việt | P | – | **T** | **T** |
| 8 | GUI-016 | Ô số lượng từ chối ký tự chữ | P | – | **P** | – |
| 9 | GUI-018 | Bàn phím số trên thiết bị di động | – | N/A | N/A | **T** |
| 10 | GUI-065 | Thứ tự Tab và focus ring | P | – | – | N/A |
| 11 | GUI-071 | Back làm mất từ khóa tìm kiếm | F | – | **F** | – |
| 12 | GUI-028 | Deep link `/product/:id` | P | **F** | **F** | **F** |
| 13 | GUI-074 | Kích thước vùng chạm | F | N/A | N/A | **T** |
| 14 | GUI-033 | Phản hồi sau khi thêm vào giỏ | F | **F** | **F** | – |
| 15 | GUI-081 | Thêm 2 lần tạo dòng trùng | F | – | – | – |
| 16 | GUI-100 | Trạng thái tìm kiếm 0 kết quả | F | – | **F** | – |

Tổng số ô đã kiểm thử ở lượt này: **26** trên 3 nền tảng (Chrome 8, Firefox 12,
Android 6), phủ cả 4 khía cạnh IA01 đến IA04 trên mỗi nền tảng.

## Phát hiện

### 1. Deep link 404 tái hiện trên cả 3 nền tảng (`BUG-XPLAT-DEEPLINK-001`)

Truy cập trực tiếp `/product/:id` trả về trang lỗi tĩnh của Vercel
(`404: NOT_FOUND`) trên cả Chrome/macOS, Firefox/Windows 11 và Chrome/Android
14. Vì hành vi giống hệt nhau trên 3 engine và 3 hệ điều hành khác nhau, đây
chắc chắn là lỗi cấu hình hosting (thiếu SPA fallback rewrite) chứ không phải
vấn đề tương thích trình duyệt.

Bằng chứng: `desktop-chrome-deeplink-404.png`,
`desktop-firefox-deeplink-404.png`, `android-chrome-deeplink-404.png`.

### 2. Mọi bug hành vi từ Task 1 tái hiện y hệt

Không có bug nào chỉ xuất hiện trên một nền tảng:

- Nút "Thêm vào giỏ hàng" nuốt lần bấm đầu tiên: xác nhận trên Firefox bằng
  cách bấm đúng 1 lần rồi mở giỏ hàng, giỏ trống hoàn toàn
  (`desktop-firefox-cart-empty-one-click.png`). Trên Chrome phải bấm 2 lần mới
  vào được giỏ (`desktop-chrome-cart-added.png`).
- Back làm mất từ khóa tìm kiếm và trả lại đủ 5 sản phẩm
  (`desktop-firefox-back-loses-search.png`).
- Trạng thái tìm kiếm 0 kết quả hiển thị trống trơn
  (`desktop-firefox-diacritics-tooling-limit.png`, phần dưới dòng chú thích).
- Giá vẫn hiển thị "VND" trên lưới nhưng "đ" ở trang chi tiết và giỏ hàng.

### 3. Khác biệt trình duyệt thật sự duy nhất: spinner của Firefox

Firefox vẽ nút tăng/giảm mặc định của trình duyệt trên ô `type="number"` của
trường Số lượng, Chrome thì không
(`desktop-firefox-product-detail-spinner.png`). Đây là khác biệt về control
gốc của từng trình duyệt, không phải lỗi của ứng dụng, và không ảnh hưởng tới
chức năng.

Ngoài mục này, không phát hiện bất kỳ lỗi hiển thị, vỡ layout hay khác biệt
CSS nào riêng theo nền tảng. Layout responsive nhất quán: 3 cột trên desktop,
1 cột trên điện thoại.

## Giới hạn công cụ cần ghi nhận trung thực

Ba ô đánh dấu **T** trong bảng trên không kiểm thử được, và lý do là công cụ
chứ không phải SUT:

**Bàn phím từ xa làm hỏng ký tự nhập vào.** Khi điều khiển phiên BrowserStack
qua automation, chuỗi gửi đi không tới nơi nguyên vẹn:

| Gửi đi | Nhận được | Nền tảng |
|---|---|---|
| `bàn phím` | `bn phm` | Firefox / Windows 11 |
| `https://frontend-web-eight-mu.vercel.app/` | `ahttps;//fronten-web-eight-mu.vercel.app/` | Chrome / Android 14 |

Dấu tiếng Việt bị rớt hoàn toàn, dấu hai chấm thành dấu chấm phẩy, và ký tự bị
mất giữa chuỗi. Vì vậy:

- Item 7 (gõ từ khóa có dấu) không kiểm thử được trên cả Firefox lẫn Android.
  Lưu ý phần **hiển thị** dấu tiếng Việt vẫn kiểm thử được bình thường và đều
  Pass (item 6), vấn đề chỉ nằm ở khâu nhập liệu qua automation.
- Item 9 và 13 (bàn phím số và kích thước vùng chạm trên di động) cần vào được
  trang chủ và trang chi tiết trên Android. Vì deep link bị 404 và không gõ
  được URL trang chủ, không có đường nào tới được 2 trang đó trong phiên. Đã
  thử 5 cách: tham số `url` của BrowserStack (chỉ có tác dụng lúc khởi tạo
  phiên), khởi động lại phiên, gợi ý lịch sử của Chrome, link sửa lỗi chính tả
  của Google, và chọn-tất-cả-rồi-gõ-lại.

Đây là hạn chế của việc điều khiển thiết bị từ xa qua automation, không phải
defect của EShop, nên không file bug. Ghi nhận là không kiểm thử thay vì suy
đoán kết quả.

## Kết luận

Không có lỗi nào chỉ xuất hiện trên một nền tảng. Toàn bộ lỗi quan sát được
đều là lỗi hành vi hoặc lỗi hạ tầng deploy, tái hiện giống hệt nhau trên mọi
nền tảng đã test. Khác biệt duy nhất mang tính trình duyệt thuần túy là nút
spinner mặc định của Firefox, và nó vô hại.

Phát hiện riêng của Task 3, không thể có được nếu chỉ dừng ở dev server
localhost như Task 1 và Task 2: **`BUG-XPLAT-DEEPLINK-001`**, deep link và
reload vào trang chi tiết sản phẩm bị 404 trên bản deploy thật do thiếu SPA
fallback rewrite. GitHub issue
[#197](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/197).

## Danh sách ảnh bằng chứng

Mỗi ảnh đều có watermark `23127300@student.hcmus.edu.vn`, họ tên `Hà Bảo Ngọc`, và tên
trình duyệt/hệ điều hành/thiết bị theo §6 và §11.

| Nền tảng | File |
|---|---|
| Chrome / macOS | `desktop-chrome-home-grid.png`, `desktop-chrome-search-results.png`, `desktop-chrome-cart-added.png`, `desktop-chrome-deeplink-404.png` |
| Firefox / Win 11 | `desktop-firefox-home-grid.png`, `desktop-firefox-product-detail-spinner.png`, `desktop-firefox-cart-empty-one-click.png`, `desktop-firefox-back-loses-search.png`, `desktop-firefox-deeplink-404.png`, `desktop-firefox-diacritics-tooling-limit.png` |
| Chrome / Android 14 | `android-chrome-deeplink-404.png`, `android-chrome-product-detail.png`, `android-chrome-cart-added.png` |

Ảnh gốc chưa đóng watermark của lượt chạy này nằm trong `raw-firefox/` và
`raw-android/`.
