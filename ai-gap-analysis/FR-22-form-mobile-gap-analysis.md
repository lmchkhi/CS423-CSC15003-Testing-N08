<!-- ai-gap-analysis/FR-22-form-mobile-gap-analysis.md -->

# AI Gap Analysis: FR-22 — Form Requirements (Mobile App)

## 1. Tổng quan

- AI đã thiết kế 19 test case cho FR-22, kiểm tra 5 yêu cầu giao diện form trên 6 form mobile.
- Kỹ thuật áp dụng: Equivalence Partitioning (EP) — BVA được bỏ qua theo STRICT BVA RULE vì không có biến numerical.
- Kết quả: 6 Passed, 13 Failed, 0 Not Run.
- Tester phải chỉnh sửa nhiều test case do AI sinh ra nội dung không khớp với dự án thực tế.

---

## 2. Các hạn chế của AI được xác định

### 2.1. Thiếu bước cấu hình môi trường Mobile (App.js / IP Configuration)

- **Vấn đề:** AI yêu cầu tester thực hiện test trên mobile app nhưng không đề cập đến bước quan trọng là cấu hình file `App.js` (hoặc file tương tự) để chỉnh sửa IP address sao cho trùng với IP của máy host đang chạy backend server. Đây là bước tiên quyết để mobile app kết nối được với backend.
- **Ví dụ cụ thể:** Tất cả test case đều bắt đầu bằng "Mở ứng dụng EShop trên thiết bị di động" nhưng không có bước nào hướng dẫn cấu hình IP trong `App.js` hoặc file config để app kết nối đến `http://<host-IP>:3000`.
- **Nguyên nhân gốc:** AI thiết kế test case theo mô hình Black-box thuần túy, chỉ tập trung vào yêu cầu chức năng trong spec mà không xem xét điều kiện tiên quyết về hạ tầng/cấu hình môi trường. AI thiếu kiến thức thực tế về quy trình triển khai React Native + Expo trên thiết bị vật lý.
- **Bài học:** Khi test trên môi trường Mobile App (React Native + Expo), Preconditions của test case phải bao gồm bước cấu hình kết nối (IP config) giữa app và backend server. AI cần được cung cấp thêm context về môi trường triển khai.

### 2.2. Sử dụng email demo thay vì email thực cho quy trình cần OTP

- **Vấn đề:** AI chỉ định sử dụng email `test@eshop.com` (tài khoản test trong spec) cho các test case liên quan đến Quên mật khẩu / Đặt lại mật khẩu. Tuy nhiên, quy trình này yêu cầu nhận mã OTP qua email thực. Email demo `test@eshop.com` không nhận được OTP thực tế, khiến tester không thể hoàn tất Bước 1 để tiến tới Bước 2.
- **Ví dụ cụ thể:** TC-FR22-DT-004 (Ký hiệu `*` form Đặt lại MK B2), TC-FR22-DT-012 (Ẩn MK form Đặt lại MK B2) đều yêu cầu hoàn tất Bước 1 với `test@eshop.com`, nhưng email demo không nhận OTP.
- **Nguyên nhân gốc:** AI dựa vào thông tin "Tài khoản mặc định" trong spec (`test@eshop.com`) mà không phân biệt giữa tài khoản đăng nhập (dùng được) và tài khoản nhận OTP email thực (cần email thật). Spec ghi "trong môi trường demo: hiển thị trực tiếp trên màn hình" nhưng AI không hiểu context rằng mobile app có thể không hiển thị OTP trực tiếp như web.
- **Bài học:** AI cần phân biệt rõ giữa test data cho đăng nhập thông thường và test data cho quy trình yêu cầu giao tiếp bên ngoài (OTP, email verification). Khi thiết kế test case cho mobile, cần xác minh cách thức OTP được cung cấp trên nền tảng cụ thể.

### 2.3. Sinh ra trường input/output không tồn tại trong dự án thực tế

- **Vấn đề:** AI sinh test case dựa trên giả định về cấu trúc form chung (common form patterns) thay vì kiểm tra giao diện thực tế của dự án. Nhiều trường mà AI giả định tồn tại thực tế KHÔNG có trong app.
- **Ví dụ cụ thể:**
  - TC-FR22-DT-002 và DT-011 giả định form Đăng ký có trường "Xác nhận mật khẩu" — thực tế form Đăng ký trên mobile KHÔNG có trường này.
  - TC-FR22-DT-004 giả định form Đặt lại MK B2 có trường "Xác nhận mật khẩu mới" — thực tế KHÔNG tồn tại.
  - TC-FR22-DT-006 giả định form Checkout có trường "Địa chỉ giao hàng" riêng biệt — thực tế form có thể khác.
- **Nguyên nhân gốc:** AI suy luận từ spec (FR-01 ghi "Phải có trường Xác nhận mật khẩu") và áp dụng pattern chung cho tất cả form. Tuy nhiên, mobile app thực tế triển khai khác với spec hoặc spec chỉ áp dụng cho web. AI không có quyền truy cập vào giao diện thực để xác minh.
- **Bài học:** Black-box testing thuần túy dựa trên spec có giới hạn khi spec và implementation không đồng bộ. AI nên ghi chú rõ ràng rằng tester cần xác minh sự tồn tại của các trường trước khi thực thi test case. Hoặc AI nên được cung cấp screenshot/UI inventory của app thực tế.

### 2.4. Tester phải chỉnh sửa Expected Result do AI không hiểu cơ chế hiển thị lỗi thực tế

- **Vấn đề:** AI thiết kế expected result dựa trên mô hình web truyền thống (inline error message trên/dưới button) nhưng mobile app thực tế sử dụng cơ chế khác (pop-up, toast notification, Alert dialog).
- **Ví dụ cụ thể:**
  - TC-FR22-DT-015 và DT-016: AI kỳ vọng "thông báo lỗi hiển thị TRÊN nút Submit" nhưng thực tế lỗi hiển thị dạng pop-up/toast — tester phải sửa expected result.
  - TC-FR22-DT-017: Pop-up xuất hiện nhưng nội dung sai ("SĐT không hợp lệ" thay vì "Họ Tên không được để trống").
- **Nguyên nhân gốc:** AI quy đổi spec Web ("thông báo lỗi phải xuất hiện trên nút submit") sang mobile một cách literal, giả định mobile cũng render inline error text giống web. Trên thực tế, React Native thường dùng Alert.alert() hoặc toast notification thay vì inline text positioning.
- **Bài học:** Khi quy đổi Web spec sang Mobile, AI cần hiểu rằng cơ chế hiển thị lỗi trên mobile thường khác biệt cơ bản so với web (pop-up/Alert thay vì inline text). Expected result cần linh hoạt hơn, chấp nhận nhiều dạng hiển thị lỗi phù hợp với mobile platform.

---

## 3. Các bugs mà AI test design đã phát hiện thành công

Mặc dù có hạn chế, thiết kế test của AI đã phát hiện thành công các lỗi giao diện form trên mobile:

| Bug | Nguồn gốc từ AI Design | Đánh giá |
|-----|------------------------|----------|
| BUG-FR22-001 (Thiếu ký hiệu `*`) | EP: Kiểm tra visual indicator trên tất cả form | ✅ AI thiết kế đúng — phát hiện tất cả 6 form đều thiếu `*` |
| BUG-FR22-002 (Sai keyboardType) | EP: Kiểm tra keyboard type cho trường Email | ✅ AI thiết kế đúng — phát hiện 3 form Email đều thiếu bàn phím email |
| BUG-FR22-004 (Lỗi dưới nút Submit Đăng nhập) | EP: Kiểm tra vị trí error message | ✅ AI thiết kế đúng — phát hiện form Đăng nhập vi phạm FR-22 |
| BUG-FR22-006 (Thiếu Step Indicator) | EP: Kiểm tra Step Indicator cho form 2 bước | ✅ AI thiết kế đúng — phát hiện form Quên MK thiếu chỉ báo bước |

---

## 4. Kết luận

AI hiệu quả trong việc thiết kế test case có hệ thống cho GUI requirements, đặc biệt khi quy đổi Web spec → Mobile. Tuy nhiên, **human review là bắt buộc** để:

- Bổ sung bước cấu hình môi trường (IP config cho React Native + Expo)
- Xác minh test data phù hợp với nền tảng (email thực cho quy trình OTP trên mobile)
- Kiểm tra sự tồn tại của trường input/output trên giao diện thực tế trước khi thực thi
- Điều chỉnh expected result theo cơ chế hiển thị của mobile platform (pop-up/Alert thay vì inline error)
