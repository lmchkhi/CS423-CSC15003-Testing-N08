<!-- ai-gap-analysis/FR-09-coupon-gap-analysis.md -->

# AI Gap Analysis — FR-09 Mã Giảm Giá (Coupon)

## Mục đích

Tài liệu này phân tích khách quan lý do tại sao AI (hoặc các phương pháp kiểm thử cơ bản như Kiểm thử Hộp đen ngây thơ) có thể đã bỏ lỡ các lỗi nghiêm trọng (bugs) nếu không có sự can thiệp của con người và phương pháp thiết kế **State Transition Testing (STT)** chặt chẽ.

## 1. Phân tích lỗi BUG-FR09-001 (Double Discount - SP01)

### Mô tả lỗi
Hệ thống cho phép người dùng áp dụng chồng nhiều mã giảm giá (VD: `SAVE10` rồi tiếp tục `VIP100`), dẫn đến việc cộng dồn mức giảm giá.

### AI/Naive Approach Gap
- Nếu chỉ áp dụng **Equivalence Partitioning (EP)** hoặc **Boundary Value Analysis (BVA)** thông thường trên ô nhập coupon, AI (hoặc Tester mới) thường chỉ nhập 1 mã hợp lệ, quan sát hệ thống giảm giá đúng, rồi pass test case.
- Lỗi này yêu cầu hệ thống phải lưu trữ **trạng thái (State)**: khi đang ở `S2: Applied`, hành động `E1: Apply Coupon` đáng lẽ không được phép (Sneak Path). 
- AI thường không tự động nhận diện ra các "chuỗi hành động liên tiếp" (N-switch coverage) ngoài kịch bản Happy Path nếu không được ép phải lập bản đồ State Machine một cách tường minh. Sự can thiệp của STT đã buộc liệt kê các *Invalid Transitions (Sneak Paths)*, nhờ đó phát hiện ra lỗ hổng logic này.

## 2. Phân tích lỗi BUG-FR09-002 (Expired Coupon with is_active=1 - EC01)

### Mô tả lỗi
Hệ thống vẫn chấp nhận mã giảm giá đã hết hạn (`expired_at` trong quá khứ) chỉ vì cờ `is_active` của mã đó vẫn là `1`.

### AI/Naive Approach Gap
- Trong các CSDL thực tế, một entity có thể chưa bị batch job quét để chuyển `is_active = 0` dù thời hạn đã qua. 
- AI khi sinh test data tự động có thể tạo ra các mã giảm giá mẫu "lý tưởng": mã còn hạn thì luôn có `is_active=1`, mã hết hạn thì luôn có `is_active=0`. 
- Sự tương tác chéo (interaction) giữa 2 điều kiện C1 (`is_active`) và C2 (`expired_at`) là một Edge Case đặc thù. Con người khi đánh giá Spec FR-09 đã nhận ra C1 và C2 là 2 điều kiện độc lập, từ đó thiết kế test case EC01 (mã EXPIRED có is_active=1 nhưng expired_at ở quá khứ) để bắt lập trình viên phải validate thời gian thực.
- Nếu không có bảng State Transition Table buộc phải isolate riêng C2=False khi C1=True, AI có thể đã nhập nhằng bỏ qua trường hợp này.

## 3. Kết luận về STT

Sự ép buộc của phương pháp **State Transition Testing (STT)** theo khung CLAUDE.md đã giúp hệ thống hóa vòng đời của 1 phiên Checkout, từ đó lấp đầy các khoảng trống:
1. Xác định rõ **Sneak Paths** (chuỗi thao tác không lường trước).
2. Tách biệt các **Guard Conditions** ở các ranh giới.
3. Đòi hỏi con người và AI cùng thảo luận chốt State Diagram, ngăn AI vội vã sinh code mà bỏ qua luồng nghiệp vụ sâu.
