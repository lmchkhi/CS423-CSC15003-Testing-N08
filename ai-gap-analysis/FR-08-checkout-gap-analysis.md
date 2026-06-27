<!-- ai-gap-analysis/FR-08-checkout-gap-analysis.md -->

# AI Gap Analysis — FR-08: Thanh toán (Checkout)

## Tổng quan

| Mục                | Chi tiết                       |
| ------------------ | ------------------------------ |
| **Feature**        | FR-08: Thanh toán (Checkout)   |
| **Tổng TC**        | 18 (15 Domain Testing + 3 BVA) |
| **Passed**         | 3 (16.7%)                      |
| **Failed**         | 15 (83.3%)                     |
| **Bugs phát hiện** | 5 bugs (1 Critical + 4 Major)  |
| **AI Model**       | Claude Opus 4 (Thinking)       |
| **Ngày phân tích** | 2026-06-27                     |

---

## 1. Phân tích Gap: Sự trùng lặp giữa Domain Testing (DT) và BVA

### Vấn đề được User phát hiện

User nhận xét chính xác rằng AI tạo **test case tương đồng** giữa hai kỹ thuật:

| BVA Test Case                          | DT Test Case tương đồng                   | Giá trị trùng | Vấn đề                                                    |
| -------------------------------------- | ----------------------------------------- | ------------- | --------------------------------------------------------- |
| **BVA-003** (`total_amount = 1`, OFF⁺) | **DT-004** (`total_amount = 1`, EP-V2-02) | `1`           | Cùng giá trị, cùng mục tiêu test, chỉ khác label kỹ thuật |
| **BVA-002** (`total_amount = 0`, ON)   | **DT-005** (`total_amount = 0`, EP-V2-03) | `0`           | Cùng giá trị, cùng kịch bản "mua miễn phí"                |

### Nguyên nhân gốc (Root Cause)

AI đã mắc lỗi **thiết kế test redundancy** do:

1. **Không nhận diện sự chồng lấp logic giữa EP và BVA:** Khi xây dựng EP cho `total_amount`, AI đã tạo các partition riêng cho giá trị `0` (EP-V2-03), giá trị dương nhỏ (EP-V2-02), và giá trị âm (EP-V2-04). Sau đó, khi áp dụng BVA trên cùng biến, AI lại chọn boundary points tại `{-1, 0, 1}` — trùng hoàn toàn với các EP đã tạo.

2. **BVA nên bổ sung EP, không lặp lại EP:** Theo nguyên tắc ISTQB, BVA được thiết kế để **bổ sung** cho EP bằng cách tập trung vào ranh giới giữa các partition. Trong trường hợp này, ranh giới tại `0` đã được EP cover rõ ràng (EP-V2-03 test giá trị `0`, EP-V2-04 test giá trị âm), nên BVA trở nên dư thừa.

3. **Đặc thù của biến `total_amount` trong FR-08:** Biến này khác biệt so với BVA truyền thống vì FR-08 yêu cầu backend **bỏ qua hoàn toàn** giá trị client gửi. Điều này có nghĩa là mọi giá trị của `total_amount` (dương, âm, 0, bất kỳ) đều phải cho **cùng một kết quả**: backend tự tính. BVA mất ý nghĩa khi không có sự phân biệt hành vi tại biên.

### Giải pháp cải thiện

Nếu làm lại, AI nên:

- **Loại bỏ các BVA test case trùng lặp** với DT đã cover
- **Hoặc** giữ BVA nhưng loại bỏ các EP tương ứng (DT-004 dùng giá trị `1` nên merge vào BVA-003)
- **Hoặc** sử dụng BVA với giá trị biên **khác biệt hơn** (ví dụ: `MIN_INT`, `MAX_INT`, `0.001`, `-0.001`) để tránh trùng EP

---

## 2. Đánh giá hiệu quả phát hiện Bug

### Bugs mà AI test design đã phát hiện thành công

| Bug ID       | Mô tả                                      | AI có dự đoán đúng? | Ghi chú                                                                                                                |
| ------------ | ------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| BUG-FR08-001 | Backend tin tưởng `total_amount` từ client | ✅ Có               | AI đã phân tích đúng mâu thuẫn Spec vs API ngay từ Step 1 và xây dựng test cases đúng hướng. Đây là phát hiện cốt lõi. |
| BUG-FR08-002 | Stored XSS qua `shipping_address`          | ✅ Có               | AI chủ động thêm EP cho XSS payload (SEC-04) mặc dù không được user yêu cầu cụ thể.                                    |
| BUG-FR08-003 | Thiếu validation `shipping_address`        | ✅ Có               | AI thiết kế EP cho trường hợp rỗng/missing — phát hiện thiếu validation.                                               |
| BUG-FR08-004 | Checkout với giỏ hàng trống                | ✅ Có               | AI xác định đúng biến `Cart State` là implicit và test partition "empty cart".                                         |
| BUG-FR08-005 | Giỏ hàng không xóa sau checkout            | ✅ Có               | AI thiết kế DT-015 như post-condition check dựa trên FR-08.                                                            |

### Tự đánh giá

- **Điểm mạnh:** AI phân tích tốt mâu thuẫn giữa đặc tả (FR-08) và API specification, xác định đúng attack vector chính. Phủ rộng từ authentication, business logic, security (XSS, SQLi), đến post-condition.
- **Điểm yếu chính:** Tạo test case trùng lặp giữa DT và BVA, gây lãng phí effort test execution mà không tăng độ phủ kiểm thử.

---

## 3. Bài học rút ra

### Cho AI Test Designer

1. **Trước khi tạo BVA, kiểm tra overlap với EP:** Nếu EP đã cover giá trị biên, BVA nên dùng giá trị cận biên khác biệt hoặc bỏ qua.
2. **BVA mất ý nghĩa khi hành vi không phân biệt tại biên:** Với `total_amount` trong FR-08, backend phải bỏ qua mọi giá trị → không có "hành vi thay đổi tại biên" → BVA truyền thống không phù hợp.
3. **Chất lượng hơn số lượng:** 15 DT test cases đã đủ coverage. 3 BVA test cases trùng lặp chỉ tăng thêm effort mà không tăng thêm phát hiện bug mới.

### Cho quá trình QA

1. **Human review là bắt buộc:** Dù AI thiết kế test tốt, con người cần review để loại bỏ redundancy.
2. **Mâu thuẫn Spec vs Implementation là vùng màu mỡ:** FR-08 nói backend tự tính, nhưng API cho phép client gửi `total_amount` → đây là nguồn bug phổ biến nhất.
3. **Tỷ lệ fail 83.3% cho thấy module Checkout có vấn đề nghiêm trọng** cần được fix trước khi release.
