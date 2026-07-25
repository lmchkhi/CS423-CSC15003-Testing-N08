# Thiết kế Đánh giá Khả dụng — Luồng Quản lý Tài khoản & Đơn hàng

## 1. Phạm vi và giả định

- **Sản phẩm:** Hệ thống EShop — phân hệ Frontend Web (React + Vite, `http://localhost:5173`).
- **Luồng đánh giá:** Đăng nhập → Cập nhật hồ sơ cá nhân → Xem lịch sử đơn hàng → Hủy đơn hàng đủ điều kiện.
- **Trạng thái bắt đầu:** Người dùng chưa đăng nhập, đang ở trang chủ EShop. Tài khoản `test@eshop.com` / `Test1234!` đã có sẵn trong hệ thống, đã có ít nhất một đơn hàng ở trạng thái `pending` hoặc `confirmed` (đủ điều kiện hủy theo FR-10).
- **Trạng thái kết thúc:** Đơn hàng đủ điều kiện chuyển sang trạng thái `canceled` và người dùng thấy trạng thái cập nhật trên màn hình lịch sử đơn hàng.
- **Đối tượng người dùng mục tiêu:** Người mua hàng trực tuyến phổ thông, có kinh nghiệm cơ bản với các sàn thương mại điện tử (Shopee, Lazada…), sử dụng trình duyệt trên máy tính.
- **Bằng chứng tham khảo:** Đặc tả yêu cầu hệ thống EShop (README.md) — các yêu cầu FR-02 (Đăng nhập), FR-04 (Quản lý hồ sơ), FR-10 (Trạng thái đơn hàng & State Machine), FR-11 (Xem lịch sử đơn hàng), FR-21–FR-24 (Yêu cầu giao diện).

**Giả định ảnh hưởng thiết kế:**

- Hệ thống có dữ liệu đơn hàng sẵn với ít nhất một đơn ở trạng thái `pending` hoặc `confirmed` để người tham gia có thể thực hiện hành động hủy.
- Tài khoản test không bị khóa (chưa đăng nhập sai quá 3 lần liên tiếp).
- Luồng được đánh giá trên trình duyệt máy tính (Chrome/Firefox), không bao gồm phân hệ Mobile.

---

## 2. Mục tiêu kiểm thử khả dụng

| ID | Mục tiêu cần tìm hiểu | Bằng chứng/chỉ số quan sát |
| --- | --- | --- |
| OBJ-01 | Xác định liệu người dùng mục tiêu có thể hoàn thành toàn bộ luồng (đăng nhập → cập nhật hồ sơ → xem đơn hàng → hủy đơn) mà không cần sự can thiệp của người điều hành. | Tỷ lệ hoàn thành không cần hỗ trợ; số lần và thời điểm người điều hành phải can thiệp. |
| OBJ-02 | Nhận diện các điểm nghẽn điều hướng khi chuyển giữa bốn bước trong luồng (đăng nhập → hồ sơ → lịch sử đơn → hủy đơn). | Số lần rẽ sai, quay lại, do dự trước khi tìm đúng chức năng tiếp theo; nhận xét think-aloud về điều hướng. |
| OBJ-03 | Tìm hiểu liệu người dùng có nhận biết được đơn hàng nào đủ điều kiện hủy và phản ứng ra sao khi gặp lỗi hoặc ràng buộc trạng thái (ví dụ: đơn `shipping` không thể hủy). | Hành vi nhận diện trạng thái đơn hàng; phản ứng khi nút hủy không khả dụng hoặc hệ thống từ chối; nỗ lực khắc phục và kết quả. |
| OBJ-04 | Đánh giá nhận thức của người dùng về tốc độ và nỗ lực khi thực hiện luồng, đặc biệt ở các bước cập nhật hồ sơ và hủy đơn hàng. | Thời gian hoàn thành mỗi phân đoạn (mang tính mô tả); nhận xét think-aloud về bước nào nhanh hay chậm hơn kỳ vọng. |
| OBJ-05 | Tìm hiểu mức độ tin tưởng của người dùng vào thông tin phản hồi của hệ thống ở các thời điểm then chốt: xác nhận cập nhật hồ sơ, hiển thị trạng thái đơn hàng, và xác nhận hủy đơn. | Nhận xét think-aloud về sự rõ ràng của thông báo hệ thống; hành vi kiểm tra lại (reload, quay lại danh sách) sau khi thực hiện thao tác; mức độ do dự trước khi xác nhận hủy. |

---

## 3. Kịch bản nhiệm vụ

### Bối cảnh

Người tham gia đóng vai một khách hàng thường xuyên mua sắm trực tuyến. Họ đã tạo tài khoản trên EShop trước đây và đã đặt một số đơn hàng. Hôm nay họ cần đăng nhập vào hệ thống để xử lý một vài việc cá nhân liên quan đến tài khoản và đơn hàng.

### Nhiệm vụ giao cho người tham gia

> Bạn là khách hàng đã có tài khoản trên EShop với email `test@eshop.com` và mật khẩu `Test1234!`. Gần đây bạn chuyển nhà nên cần cập nhật thông tin giao hàng của mình. Số điện thoại mới của bạn là `0912345678` và địa chỉ mới là `123 Nguyễn Huệ, Quận 1, TP.HCM`. Sau khi cập nhật xong, bạn nhớ ra rằng mình đã đặt nhầm một đơn hàng và muốn hủy nó trước khi cửa hàng kịp giao. Hãy tìm cách xử lý tất cả các việc này trên hệ thống.

### Điều kiện hoàn thành *(chỉ dành cho người nghiên cứu)*

- Người tham gia đã đăng nhập thành công vào hệ thống.
- Hồ sơ cá nhân đã được cập nhật với số điện thoại `0912345678` và địa chỉ `123 Nguyễn Huệ, Quận 1, TP.HCM`, hệ thống hiển thị phản hồi xác nhận cập nhật.
- Người tham gia đã truy cập được trang lịch sử đơn hàng và quan sát danh sách đơn.
- Người tham gia đã hủy thành công một đơn hàng đang ở trạng thái `pending` hoặc `confirmed`, trạng thái đơn chuyển sang `canceled` trên giao diện.

### Điều kiện dừng/can thiệp *(chỉ dành cho người điều hành)*

- Người tham gia thể hiện sự bối rối rõ ràng hoặc không có tiến triển trong **3 phút liên tục** ở bất kỳ bước nào.
- Người tham gia cố gắng hủy đơn hàng ở trạng thái `shipping` hoặc `delivered` (không đủ điều kiện) và không tự nhận ra → người điều hành ghi nhận hành vi, sau đó gợi ý nhẹ nhàng: *"Bạn có nhận thấy gì khác biệt giữa các đơn hàng không?"*
- Người tham gia muốn dừng hoặc thể hiện sự khó chịu kéo dài.
- Tài khoản bị khóa do nhập sai mật khẩu → người điều hành hỗ trợ kỹ thuật (đợi 30 giây hoặc reset) và ghi nhận sự cố.

---

## 4. Thang đo sau nhiệm vụ

### Lựa chọn: `SUS` (System Usability Scale)

### Lý do phù hợp với flow

Luồng đánh giá là một chuỗi giao dịch cụ thể (đăng nhập → cập nhật hồ sơ → xem đơn hàng → hủy đơn) với mục tiêu hoàn thành nhiệm vụ rõ ràng, không yêu cầu đánh giá trải nghiệm cảm xúc hay tính sáng tạo của giao diện. Câu hỏi chính của nghiên cứu là liệu hệ thống có **dễ sử dụng, nhất quán, và dễ học** cho người dùng phổ thông hay không — đây chính là các khía cạnh mà SUS đo lường hiệu quả nhất. Ngoài ra, SUS cung cấp một điểm số tổng hợp duy nhất dễ so sánh với benchmark chuẩn, phù hợp cho việc đánh giá nhanh sau một phiên kiểm thử có phạm vi giới hạn.

### Cách thực hiện

- **Thời điểm:** Ngay sau khi người tham gia hoàn thành (hoặc dừng) nhiệm vụ, trước khi bắt đầu phỏng vấn mở.
- **Định dạng:** Bảng in giấy hoặc biểu mẫu điện tử gồm 10 phát biểu, mỗi phát biểu đánh giá trên thang Likert 5 điểm (1 = Hoàn toàn không đồng ý → 5 = Hoàn toàn đồng ý).
- **Hướng dẫn:** Yêu cầu người tham gia trả lời dựa trên trải nghiệm vừa thực hiện, chọn phương án phù hợp nhất, không suy nghĩ quá lâu ở mỗi câu.

### Cách chấm/diễn giải

- Với các phát biểu lẻ (1, 3, 5, 7, 9): lấy điểm người dùng chọn trừ 1.
- Với các phát biểu chẵn (2, 4, 6, 8, 10): lấy 5 trừ điểm người dùng chọn.
- Tổng điểm đóng góp của 10 câu, nhân với 2.5 → điểm SUS (phạm vi 0–100).
- Điểm SUS **không phải phần trăm**. Diễn giải bằng cách đối chiếu với bảng benchmark SUS (ví dụ: trên 68 được coi là trên trung bình, trên 80.3 thuộc nhóm A — tốt).
- Khi mẫu nhỏ (7 người), báo cáo điểm trung vị và phạm vi (range) thay vì chỉ dùng trung bình cộng.

---

## 5. Câu hỏi mở sau nhiệm vụ

| ID | Tiêu chí | Câu hỏi |
| --- | --- | --- |
| PROBE-01 | Rõ ràng | Trong suốt quá trình thực hiện — từ đăng nhập, cập nhật hồ sơ, đến hủy đơn hàng — ở thời điểm nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Và có lúc nào bạn cảm thấy không chắc chắn không? Vì sao? |
| PROBE-02 | Rõ ràng | Khi nhìn vào danh sách đơn hàng, bạn có dễ dàng phân biệt được trạng thái của các đơn (ví dụ: đang chờ, đã xác nhận, đang giao…) không? Điều gì giúp bạn hoặc khiến bạn khó phân biệt? |
| PROBE-03 | Khôi phục lỗi | Nếu có lúc nào thao tác của bạn không cho kết quả mong đợi — ví dụ: cập nhật hồ sơ không thành công hoặc hệ thống từ chối hủy đơn — bạn đã nhận ra vấn đề và cố xử lý như thế nào? |
| PROBE-04 | Khôi phục lỗi | Khi bạn cố hủy đơn hàng, hệ thống có giúp bạn hiểu tại sao một đơn có thể hủy được và đơn khác thì không? Thông tin hiển thị lúc đó có đủ rõ ràng không? |
| PROBE-05 | Tốc độ | Phần nào trong toàn bộ nhiệm vụ khiến bạn cảm thấy nhanh chóng hoặc suôn sẻ? Theo bạn, điều gì tạo ra cảm giác đó? |
| PROBE-06 | Tốc độ | Có bước nào bạn cảm thấy chậm hơn hoặc tốn công sức hơn mong đợi không? Nếu có, đó là bước nào và vì sao? |
| PROBE-07 | Tin cậy | Sau khi cập nhật hồ sơ cá nhân, bạn có tin rằng thông tin đã được lưu đúng không? Điều gì khiến bạn tin tưởng hoặc vẫn còn nghi ngờ? |
| PROBE-08 | Tin cậy | Khi xác nhận hủy đơn hàng, bạn cảm thấy thế nào trước khi nhấn nút? Thông tin hoặc phản hồi nào của hệ thống giúp bạn yên tâm hoặc khiến bạn do dự? |

---

## 6. Kiểm tra độ bao phủ

- [x] **Kịch bản hướng mục tiêu:** Kịch bản mô tả tình huống và mục tiêu, không liệt kê các bước điều hướng cụ thể; người tham gia tự chọn cách thực hiện.
- [x] **Đúng một thang đo:** Chỉ chọn SUS, có lý do gắn với đặc điểm giao dịch của luồng (không phải lợi ích chung chung).
- [x] **Bốn tiêu chí bắt buộc đều có câu hỏi mở:**
  - Rõ ràng: PROBE-01, PROBE-02
  - Khôi phục lỗi: PROBE-03, PROBE-04
  - Tốc độ: PROBE-05, PROBE-06
  - Tin cậy: PROBE-07, PROBE-08
- [x] **Không bịa đặt dữ liệu:** Thiết kế không tuyên bố đã chạy phiên thử, không có thông tin người tham gia, điểm số, trích dẫn, hay kết quả phân tích hư cấu.
