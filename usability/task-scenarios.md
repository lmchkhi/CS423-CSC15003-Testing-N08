# Nhiệm vụ cho 7 participant

Cùng 1 flow (Browse → search by keyword → product detail → choose quantity →
add to cart), đổi nhẹ mức giá/số lượng mỗi người để không bị lặp y chang —
kết quả vẫn so sánh được với nhau vì độ khó/cấu trúc task giống hệt.

**Catalog thật trên SUT đang chạy** (`http://localhost:5173/`, 5 sản phẩm cố
định, kiểm tra lại 26/07/2026): Bàn phím cơ Keychron Q1 4,000,000₫ · Tai
nghe AirPods Pro 2 6,000,000₫ · Samsung Galaxy S24 Ultra 28,000,000₫ ·
iPhone 15 Pro Max 30,000,000₫ · MacBook Pro M3 45,000,000₫.

**2 lỗi đã sửa ở bản trước:**
1. Mức giá cũ (300,000₫–1,000,000₫) thấp hơn sản phẩm rẻ nhất rất nhiều —
   không sản phẩm nào khớp, participant không thể hoàn thành task.
2. Câu nhiệm vụ chỉ nói "tìm 1 sản phẩm bạn thích" — với catalog chỉ 5 sản
   phẩm hiện sẵn trên một màn hình, participant hoàn toàn có thể bấm thẳng
   "Xem chi tiết" từ lưới mà **không bao giờ chạm vào ô tìm kiếm** — bước
   "search by keyword" của flow chưa từng thực sự bị bắt buộc xảy ra.

Bản dưới đây sửa cả hai: mỗi participant được giao một **từ khóa cụ thể**
phải gõ vào ô tìm kiếm (không phải tự chọn sản phẩm tuỳ ý), nên bước search
chắc chắn được thực hiện và quan sát được. Từ khóa cố ý đổi dạng giữa các
participant (tên đầy đủ, một phần tên, tiếng Việt có dấu, viết hoa) để nhân
tiện quan sát xem search có case-insensitive / khớp dấu / khớp một phần hay
không — mỗi từ khóa chỉ khớp đúng 1 sản phẩm nên độ khó vẫn giống nhau giữa
các participant.

Đọc/nhắn đúng câu này cho từng người (điền tên/mã participant vào
`usability/participants.md` tương ứng số thứ tự):

| # | Nhiệm vụ đọc cho participant | Sản phẩm đúng (tham khảo, không đọc cho participant) |
|---|---|---|
| 1 | "Dùng ô tìm kiếm trên web này, gõ 'keychron' để tìm sản phẩm. Mở trang chi tiết, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Bàn phím cơ Keychron Q1 — 4,000,000₫ |
| 2 | "Dùng ô tìm kiếm trên web này, gõ 'tai nghe' để tìm sản phẩm. Mở trang chi tiết, chọn mua 2 cái, rồi bỏ vào giỏ hàng nha." | Tai nghe AirPods Pro 2 — 6,000,000₫ |
| 3 | "Dùng ô tìm kiếm trên web này, gõ 'samsung' để tìm sản phẩm. Mở trang chi tiết, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Samsung Galaxy S24 Ultra — 28,000,000₫ |
| 4 | "Dùng ô tìm kiếm trên web này, gõ 'iphone' để tìm sản phẩm. Mở trang chi tiết, chọn mua 3 cái, rồi bỏ vào giỏ hàng nha." | iPhone 15 Pro Max — 30,000,000₫ |
| 5 | "Dùng ô tìm kiếm trên web này, gõ 'macbook' để tìm sản phẩm. Mở trang chi tiết, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | MacBook Pro M3 — 45,000,000₫ |
| 6 | "Dùng ô tìm kiếm trên web này, gõ 'bàn phím' để tìm sản phẩm. Mở trang chi tiết, chọn mua 2 cái, rồi bỏ vào giỏ hàng nha." | Bàn phím cơ Keychron Q1 — 4,000,000₫ |
| 7 | "Dùng ô tìm kiếm trên web này, gõ 'GALAXY' để tìm sản phẩm. Mở trang chi tiết, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Samsung Galaxy S24 Ultra — 28,000,000₫ |

⚠️ Trước buổi test, mở EShop lên gõ thử từng từ khóa vào ô tìm kiếm, xác
nhận vẫn ra đúng 1 sản phẩm như cột tham khảo (catalog có thể đổi tuỳ
instance) — nếu từ khóa nào không còn khớp đúng 1 sản phẩm thì đổi từ khóa ở
dòng đó cho khớp catalog lúc test thật, đừng đổi cấu trúc câu. Cột "Sản phẩm
đúng" chỉ để người điều phối đối chiếu khi quan sát, không đọc cho
participant nghe.
