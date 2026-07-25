## Participant table

| ID  | Relevant experience                                      | Device/browser           | Session date          | Consent | Completion              | Notes                                                                            |
| --- | -------------------------------------------------------- | ------------------------ | --------------------- | ------- | ----------------------- | -------------------------------------------------------------------------------- |
| P02 | Đã từng sử dụng app mua hàng online (shoppe, lazada,...) | Laptop, Windows 11, Edge | 22h23 ngày 25/07/2026 | Yes     | Hoàn thành có can thiệp | Đã xác minh danh tính người tham gia, thông tin liên hệ lưu riêng ngoài file này |

## Observation notes

| Participant | Time             | Participant action/quote                                                                                                                  | Observed UI/state                                    | Outcome                                                                | Possible finding                                                                                                                                             | Evidence ref |
| ----------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| P02         | 22h23 25/07/2026 | "Thêm sản phẩm mong muốn vào giỏ hàng, vào giỏ hàng kiểm tra, xóa một vài sản phẩm trong giỏ"                                             | Thao tác thêm/xóa diễn ra bình thường                | Hoàn thành độc lập                                                     |                                                                                                                                                              |              |
| P02         | 22h24 25/07/2026 | "Chốt danh sách sản phẩm, tiến hành checkout, nhập random một coupon — mã không phù hợp"                                                  | Hệ thống báo coupon không hợp lệ                     | Không hoàn thành (lần thử đầu)                                         | Không có gợi ý mã nào trên UI, participant phải tự đoán                                                                                                      |              |
| P02         | 22h24 25/07/2026 | "[Intervention] Participant hỏi mã hệ thống là gì, sau đó hỏi thêm 'có phải viết hoa hay thường không?' → Facilitator cung cấp mã SAVE10" | Participant nhập SAVE10                              | Hoàn thành có can thiệp                                                | Xác nhận lại finding discoverability đã ghi ở Task 1; đồng thời có băn khoăn về case-sensitivity của ô nhập mã (liên quan GUI-20)                            |              |
| P02         | 22h24 25/07/2026 | "Quan sát một lúc, tự nhận ra tính toán của mã SAVE10 là sai và báo cáo cho facilitator"                                                  | Tổng tiền sau áp mã tăng thay vì giảm                | Hoàn thành có can thiệp (đã ghi nhận nhưng không được hướng dẫn xử lý) | Participant tự phát hiện độc lập bug đã log ở Task 1 (GUI-07/GUI-049 — coupon SAVE10 tính sai làm tăng giá) — đây là bằng chứng chéo, không phải finding mới |              |
| P02         | 22h25 25/07/2026 | "Vô tình phát hiện tại bước checkout có thể tùy ý sửa giá đơn hàng"                                                                       | Trường tổng tiền là input có thể chỉnh sửa trực tiếp | Hoàn thành độc lập (phát hiện ngẫu nhiên trong lúc thao tác)           | Trùng khớp bug đã log ở Task 1 (GUI-17 — tổng tiền không phải trường chỉ đọc)                                                                                |              |
| P02         | 22h27 25/07/2026 | "Tiến hành thanh toán, trang báo thành công"                                                                                              | Xác nhận đơn hàng hiển thị                           | Hoàn thành có can thiệp                                                |                                                                                                                                                              |              |

## Bộ 10 câu SUS

| Câu | Phát biểu SUS                                                                                           | Điểm (1–5) |
| --: | ------------------------------------------------------------------------------------------------------- | ---------: |
|   1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống này thường xuyên.                                               |          4 |
|   2 | Tôi thấy hệ thống này phức tạp một cách không cần thiết.                                                |          1 |
|   3 | Tôi nghĩ hệ thống này dễ sử dụng.                                                                       |          4 |
|   4 | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của một người có chuyên môn kỹ thuật để có thể sử dụng hệ thống này. |          1 |
|   5 | Tôi thấy các chức năng khác nhau trong hệ thống này được tích hợp tốt.                                  |          5 |
|   6 | Tôi nghĩ rằng hệ thống này có quá nhiều điểm không nhất quán.                                           |          3 |
|   7 | Tôi cho rằng phần lớn mọi người sẽ học cách sử dụng hệ thống này rất nhanh.                             |          5 |
|   8 | Tôi thấy hệ thống này rất rườm rà khi sử dụng.                                                          |          1 |
|   9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này.                                                       |          5 |
|  10 | Tôi cần học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này.                                |          1 |

**SUS score:** 90/100

## Post-task probe questions

| Participant | Khía cạnh              | Câu hỏi                                                                                                                           | Câu trả lời                                                                                            |
| ----------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| P02         | Clarity                | Những thông tin hoặc phản hồi nào trong quá trình mua hàng là rõ ràng, và những phần nào chưa rõ ràng đối với bạn?                | "Rõ ràng: các quy trình thanh toán ổn, không vấp. Chưa rõ: coupon tính toán sai đưa ra giá trị sai."   |
| P02         | Error recovery         | Khi gặp kết quả không như mong đợi, bạn đã quyết định làm gì tiếp theo, và điều gì đã giúp hoặc cản trở bạn khắc phục tình huống? | "Khi gặp kết quả không mong đợi thường lựa chọn F5, hoặc khi chờ lâu dự đoán do mạng hoặc sập server." |
| P02         | Speed                  | Những phần nào của quá trình khiến bạn cảm thấy nhanh hoặc chậm, và vì sao?                                                       | "Thanh toán khá nhanh, vì nghĩ chỉ dừng ở mức demo."                                                   |
| P02         | Trust                  | Những yếu tố nào trong trải nghiệm khiến bạn tin tưởng hoặc còn ngần ngại khi xác nhận thanh toán?                                | "Chưa thấy hình ảnh sản phẩm tại bước thanh toán."                                                     |
| P02         | Coupon discoverability | Bạn đã tìm và quyết định nhập mã coupon như thế nào, và trải nghiệm đó diễn ra ra sao?                                            | "Không biết mã nên phải hỏi admin và được cung cấp."                                                   |
