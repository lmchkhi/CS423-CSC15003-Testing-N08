# Nhiệm vụ cho 7 participant

Cùng 1 flow (Browse → search by keyword → product detail → choose quantity →
add to cart), đổi nhẹ mức giá/số lượng mỗi người để không bị lặp y chang —
kết quả vẫn so sánh được với nhau vì độ khó/cấu trúc task giống hệt.

**Catalog thật trên SUT đang chạy** (`http://localhost:5173/`, 5 sản phẩm cố
định, kiểm tra lại 26/07/2026): Bàn phím cơ Keychron Q1 4,000,000₫ · Tai
nghe AirPods Pro 2 6,000,000₫ · Samsung Galaxy S24 Ultra 28,000,000₫ ·
iPhone 15 Pro Max 30,000,000₫ · MacBook Pro M3 45,000,000₫. Mức giá cũ
(300,000₫–1,000,000₫) thấp hơn sản phẩm rẻ nhất rất nhiều — không có bất kỳ
sản phẩm nào khớp, khiến bước "search by keyword" luôn ra 0 kết quả và
participant không thể hoàn thành nổi task. Đã đổi lại toàn bộ mức giá bên
dưới cho khớp catalog thật, mỗi dòng cho ra một tập sản phẩm hợp lệ khác
nhau (1 → tất cả 5 sản phẩm) để vẫn giữ được sự đa dạng giữa các participant.

Đọc/nhắn đúng câu này cho từng người (điền tên/mã participant vào
`usability/participants.md` tương ứng số thứ tự):

| # | Nhiệm vụ đọc cho participant | Sản phẩm hợp lệ (tham khảo, không đọc cho participant) |
|---|---|---|
| 1 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 5,000,000₫, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Keychron Q1 |
| 2 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 10,000,000₫, chọn mua 2 cái, rồi bỏ vào giỏ hàng nha." | Keychron Q1, AirPods Pro 2 |
| 3 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 29,000,000₫, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Keychron Q1, AirPods Pro 2, Samsung Galaxy S24 Ultra |
| 4 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 31,000,000₫, chọn mua 3 cái, rồi bỏ vào giỏ hàng nha." | + iPhone 15 Pro Max |
| 5 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 46,000,000₫, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Cả 5 sản phẩm (kể cả MacBook Pro M3) |
| 6 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 7,000,000₫, chọn mua 2 cái, rồi bỏ vào giỏ hàng nha." | Keychron Q1, AirPods Pro 2 |
| 7 | "Tìm giúp mình 1 sản phẩm bạn thích trên web này, giá dưới 35,000,000₫, chọn mua 1 cái, rồi bỏ vào giỏ hàng nha." | Keychron Q1, AirPods Pro 2, Samsung Galaxy S24 Ultra, iPhone 15 Pro Max |

⚠️ Trước buổi test, mở EShop lên kiểm tra còn sản phẩm nào nằm trong mức giá
đó không (catalog có thể đổi tuỳ instance) — nếu mức giá nào không có sản
phẩm phù hợp thì đổi số tiền ở dòng đó cho khớp catalog lúc test thật, đừng
đổi cấu trúc câu. Cột "Sản phẩm hợp lệ" chỉ để người điều phối đối chiếu khi
quan sát, không đọc cho participant nghe.
