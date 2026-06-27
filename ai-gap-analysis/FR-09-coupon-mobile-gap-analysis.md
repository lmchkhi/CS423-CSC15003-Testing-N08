<!-- ai-gap-analysis/FR-09-coupon-mobile-gap-analysis.md -->

# AI Gap Analysis — FR-09: Mã Giảm Giá (Coupon) — Mobile App

## Thông tin chung

| Mục               | Chi tiết                                         |
| ------------------ | ------------------------------------------------ |
| **Requirement**    | FR-09: Mã Giảm Giá (Coupon)                     |
| **Nền tảng**       | Mobile App (React Native + Expo)                 |
| **AI Tool**        | Claude Opus 4.6 (Thinking)                       |
| **Ngày phân tích** | 2026-06-27                                       |
| **Phương pháp**    | Domain Testing (EP) + Boundary Value Analysis    |

---

## Tổng quan kết quả

| Metric               | Giá trị  |
| ---------------------- | -------- |
| Tổng Test Cases AI tạo| 21       |
| ✅ Passed              | 14       |
| ❌ Failed              | 7        |
| 🐛 Bug phát hiện      | 2        |

---

## Bug đã phát hiện thành công

### BUG-FR09-001: Lỗi tính giảm giá percent (Critical)
- **Phát hiện bởi:** TC-FR09-DT-001, TC-FR09-DT-010, TC-FR09-BVA-003, TC-FR09-BVA-010
- **AI có dự đoán trước không?** ✅ **Có** — AI đã thiết kế test case với công thức tính sẵn `discount = total × discount_value / 100`, cho phép tester so sánh trực tiếp expected vs actual và phát hiện lỗi tính sai gấp 100 lần.

### BUG-FR09-002: Lỗi biên off-by-one (Major)
- **Phát hiện bởi:** TC-FR09-BVA-002, TC-FR09-BVA-005
- **AI có dự đoán trước không?** ✅ **Có** — AI đã áp dụng BVA đúng cách cho biến `total_amount` với 3 điểm biên (OFF⁻, ON, OFF⁺) tại ngưỡng `min_order_amount`. Test case ON boundary (total = min_order_amount) chính là test case phát hiện lỗi này.

---

## Điểm yếu và hạn chế của AI — Cần sự can thiệp của con người

### GAP-01: Không hướng dẫn tạo sản phẩm giả để đáp ứng giá trị biên BVA

**Mô tả vấn đề:**

AI tạo test case BVA với các giá trị biên chính xác (ví dụ: 299,999₫, 300,000₫, 300,001₫) nhưng **không xem xét** rằng seed data trong hệ thống EShop có các sản phẩm với giá trị quá lớn so với các ngưỡng biên cần test. Vì đây là black-box testing, AI không có quyền truy cập vào CSDL để biết giá các sản phẩm có sẵn.

**Hệ quả:**

- Tester không thể tạo giỏ hàng có tổng giá trị **đúng bằng** 299,999₫ hoặc 300,001₫ chỉ từ sản phẩm có sẵn trong hệ thống
- AI không đưa ra hướng dẫn chuẩn bị dữ liệu test, ví dụ:
  - Tạo sản phẩm giả (dummy product) với giá trị nhỏ phù hợp thông qua Admin panel
  - Kết hợp nhiều sản phẩm để đạt tổng giá trị chính xác
  - Sử dụng API `POST /api/products` để tạo sản phẩm với giá tùy ý
- Tester phải **tự sáng tạo** cách giải quyết mà không có hướng dẫn từ AI

**Bài học:**

Khi thiết kế BVA test case cho giá trị tổng hợp (aggregated values) như `total_amount`, AI cần bổ sung hướng dẫn chuẩn bị dữ liệu test trong phần **Preconditions** hoặc **Test Steps**, ví dụ:

> *"Để đạt tổng giỏ hàng = 299,999₫, Admin cần tạo sản phẩm giả với giá 299,999₫ (hoặc kết hợp nhiều sản phẩm). Sử dụng Admin panel hoặc API `POST /api/products` để tạo sản phẩm."*

### GAP-02: Tạo test case BVA giống nhau về bản chất — chỉ khác mục đích tái sử dụng

**Mô tả vấn đề:**

Một số test case BVA có nội dung thực thi gần như giống hệt nhau, chỉ khác ở ngữ cảnh setup trước đó. Cụ thể:

| Test Case    | Hành động thực tế                                           | Khác biệt duy nhất              |
| ------------ | ----------------------------------------------------------- | -------------------------------- |
| **BVA-007**  | Áp dụng VIP100 lần 1 (usage=0, max=2) — total 400K         | Chưa dùng lần nào               |
| **BVA-008**  | Áp dụng VIP100 lần 2 (usage=1, max=2) — total 400K         | Đã dùng 1 lần (cần checkout trước) |
| **BVA-010**  | Áp dụng SAVE10 lần 1 (usage=0, max=1) — total 500K         | Giống DT-001 về thao tác        |

**Phân tích:**

- **BVA-008 giống BVA-007** về thao tác kiểm thử — đều nhập VIP100 trên cùng tổng đơn 400,000₫. Sự khác biệt nằm ở trạng thái `usage_count` (server-side), đòi hỏi tester phải **checkout thành công lần 1** trước khi test lần 2. Điều này không sai về lý thuyết BVA, nhưng gây cảm giác **trùng lặp** khi thực hiện.
- **BVA-010 giống DT-001** — cùng áp dụng SAVE10 trên tổng đơn ≥ 300K, cùng expected result thành công. BVA-010 test biên `usage_count` (ON point, usage=0, max=1) nhưng kết quả thực tế giống hệt DT-001.

**Bài học:**

AI nên nhận diện overlap giữa các test case EP và BVA, và:
- Ghi chú rõ ràng rằng test case nào có thể **tham chiếu kết quả** từ test case khác thay vì thực hiện lại
- Kết hợp test case trùng lặp khi có thể, hoặc ít nhất đánh dấu dependency (ví dụ: "Xem kết quả BVA-007 cho setup" trong BVA-008)
- Tránh tạo test case chỉ để "cover" một boundary point mà không mang lại giá trị kiểm thử thực sự mới

---

## Đánh giá tổng thể AI Performance

### Điểm mạnh

| #  | Điểm mạnh                                                                                  |
| -- | ------------------------------------------------------------------------------------------- |
| 1  | Áp dụng đúng STRICT BVA RULE — chỉ BVA cho biến numerical (`total_amount`, `usage_count`)  |
| 2  | Tính sẵn công thức giảm giá (percent/fixed) giúp tester phát hiện bug tính toán ngay lập tức|
| 3  | Thiết kế BVA 3-point (OFF⁻, ON, OFF⁺) phát hiện thành công lỗi off-by-one                  |
| 4  | EP cover đủ 5 điều kiện C1→C5 với cả valid và invalid partitions                            |
| 5  | Test steps đúng ngữ cảnh Mobile App (chạm, bàn phím ảo, Toast/Alert)                        |

### Điểm yếu

| #  | Điểm yếu                                                                                     | Mức ảnh hưởng |
| -- | --------------------------------------------------------------------------------------------- | ------------- |
| 1  | Không hướng dẫn chuẩn bị dữ liệu test (tạo sản phẩm giả) cho giá trị biên BVA               | Trung bình    |
| 2  | Tạo test case BVA trùng lặp thao tác (BVA-008≈BVA-007, BVA-010≈DT-001) gây lãng phí thời gian| Thấp          |

### Kết luận

AI đã thiết kế bộ test case **đủ tốt** để phát hiện cả 2 bug trong hệ thống. Tuy nhiên, sự can thiệp của con người vẫn cần thiết ở khâu **chuẩn bị dữ liệu test** (tạo sản phẩm giả phù hợp giá trị biên) và **tối ưu bộ test** (loại bỏ trùng lặp). Đây là giới hạn tự nhiên của black-box testing khi AI không có thông tin về dữ liệu thực tế trong hệ thống.
