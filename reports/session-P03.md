## Participant table

| ID  | Relevant experience                                      | Device/browser         | Session date     | Consent | Completion              | Notes                                                                            |
| --- | -------------------------------------------------------- | ---------------------- | ---------------- | ------- | ----------------------- | -------------------------------------------------------------------------------- |
| P03 | Đã từng sử dụng app mua hàng online (shoppe, lazada,...) | Laptop, Linux, Firefox | 22h45 25/07/2026 | Yes     | Hoàn thành có can thiệp | Đã xác minh danh tính người tham gia, thông tin liên hệ lưu riêng ngoài file này |

## Observation notes

| Participant | Time             | Participant action/quote                                                                                                                                                                     | Observed UI/state                                                  | Outcome                                         | Possible finding                                                                                                    | Evidence ref |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------ |
| P03         | 22h46 25/07/2026 | "Vào chi tiết một sản phẩm muốn mua, tăng số lượng cần mua, ấn thêm sản phẩm phải ấn 2 lần mới biết là đã thêm sản phẩm thành công vào giỏ"                                                  | Không có thông báo/phản hồi rõ ràng ngay sau khi bấm thêm lần đầu  | Hoàn thành độc lập (nhưng mất công sức)         | Thiếu phản hồi xác nhận khi thêm sản phẩm thành công                                                                |              |
| P03         | 22h46 25/07/2026 | "Truy cập giỏ kiểm tra, xác nhận đúng sản phẩm. Quay lại trang chủ, ấn thêm sản phẩm tại trang chủ, thắc mắc không biết sản phẩm đã thêm vào giỏ hay chưa, phải ấn vào giỏ hàng để kiểm tra" | Cùng vấn đề thiếu phản hồi lặp lại ở luồng thêm từ trang chủ       | Hoàn thành độc lập (nhưng phải tự kiểm tra lại) | Xác nhận lại finding thiếu phản hồi xác nhận thêm giỏ hàng, xảy ra ở cả 2 điểm vào (chi tiết sản phẩm và trang chủ) |              |
| P03         | 22h46 25/07/2026 | "Xóa bớt 1 cái hiển thị trùng"                                                                                                                                                               | Giỏ hàng có sản phẩm hiển thị trùng lặp thay vì gộp chung số lượng | Hoàn thành độc lập                              | Xác nhận độc lập bug trùng dòng sản phẩm                                                                            |              |
| P03         | 22h47 25/07/2026 | "Tại bước thanh toán nhập random một mã nhưng không thành công"                                                                                                                              | Hệ thống báo coupon không hợp lệ                                   | Không hoàn thành (lần thử đầu)                  | Không có gợi ý mã nào trên UI                                                                                       |              |
| P03         | 22h47 25/07/2026 | "[Intervention] Participant hỏi facilitator để cung cấp mã → Facilitator cung cấp mã VIP100"                                                                                                 | Participant nhập mã VIP100 thành công, hoàn tất quy trình          | Hoàn thành có can thiệp                         | Xác nhận lại finding discoverability đã ghi ở Task 1 và 2 phiên trước                                               |              |

## Bộ 10 câu SUS

| Câu | Phát biểu SUS                                                                                           | Điểm (1–5) |
| --: | ------------------------------------------------------------------------------------------------------- | ---------: |
|   1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống này thường xuyên.                                               |          3 |
|   2 | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                                                |          2 |
|   3 | Tôi nghĩ hệ thống này dễ sử dụng.                                                                       |          4 |
|   4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một người có chuyên môn kỹ thuật để có thể sử dụng hệ thống này. |          2 |
|   5 | Tôi thấy các chức năng khác nhau trong hệ thống này được tích hợp tốt.                                  |          3 |
|   6 | Tôi nghĩ rằng hệ thống này có quá nhiều điểm không nhất quán.                                           |          5 |
|   7 | Tôi cho rằng phần lớn mọi người sẽ học cách sử dụng hệ thống này rất nhanh.                             |          4 |
|   8 | Tôi thấy hệ thống này rất rườm rà khi sử dụng.                                                          |          1 |
|   9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này.                                                       |          4 |
|  10 | Tôi cần học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này.                                |          1 |

**SUS score:** 67.5/100

## Post-task probe questions

| Participant | Khía cạnh              | Câu hỏi                                                                                                                           | Câu trả lời                                                                                                                                                                                                     |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P03         | Clarity                | Những thông tin hoặc phản hồi nào trong quá trình mua hàng là rõ ràng, và những phần nào chưa rõ ràng đối với bạn?                | "Rõ ràng: hiển thị tên, giá sản phẩm trong chi tiết sản phẩm cũng như thẻ sản phẩm đầy đủ. Chưa rõ: khi ấn thêm sản phẩm tại giao diện thẻ sản phẩm vẫn băn khoăn liệu sản phẩm đã được thêm vào giỏ hay chưa." |
| P03         | Error recovery         | Khi gặp kết quả không như mong đợi, bạn đã quyết định làm gì tiếp theo, và điều gì đã giúp hoặc cản trở bạn khắc phục tình huống? | "Thêm vào giỏ hàng phải kiểm tra xác nhận sản phẩm đã thêm. Danh sách trong giỏ sản phẩm bị lặp lại thay vì gom chung khiến cảm giác đơn hàng bị nhiều, gây rối."                                               |
| P03         | Speed                  | Những phần nào của quá trình khiến bạn cảm thấy nhanh hoặc chậm, và vì sao?                                                       | "Quá chậm tại bước thêm sản phẩm ở trang chi tiết sản phẩm vì phải ấn 2 lần; nhanh tại bước xóa sản phẩm trong giỏ hàng vì xóa ngay lập tức thay vì có thông báo xác nhận."                                     |
| P03         | Trust                  | Những yếu tố nào trong trải nghiệm khiến bạn tin tưởng hoặc còn ngần ngại khi xác nhận thanh toán?                                | "Hiển thị lặp trên giỏ hàng nhưng tính toán tổng tiền đúng nên chưa có ngần ngại."                                                                                                                              |
| P03         | Coupon discoverability | Bạn đã tìm và quyết định nhập mã coupon như thế nào, và trải nghiệm đó diễn ra ra sao?                                            | "Nhập ngẫu nhiên mã tự nghĩ ra nhưng không biết rõ quy trình để tìm mã đúng, nên phải hỏi admin."                                                                                                               |
