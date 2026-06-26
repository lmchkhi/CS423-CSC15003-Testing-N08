<!-- ai-gap-analysis/FR-05-search-gap-analysis.md -->

# AI Gap Analysis: FR-05 — Xem danh sách & Tìm kiếm sản phẩm

## 1. Tổng quan

- AI đã thiết kế 14 test case ban đầu, sau khi human review đã giảm còn 12 test case.
- 2 test case bị loại (DT-013: alt text, DT-014: format giá) do nằm ngoài phạm vi FR-05 hoặc trùng lặp.
- Tester đã phát hiện 8 lỗi, tất cả đều được tìm thấy qua test case của AI nhưng cần human intervention để xác nhận và điều chỉnh.

---

## 2. Các hạn chế của AI được xác định

### 2.1. Khuynh hướng mở rộng phạm vi (Scope Creep)

- **Vấn đề:** AI có xu hướng đọc thêm các requirement khác (FR-21, FR-24) dù user chỉ yêu cầu tập trung vào FR-05.
- **Ví dụ cụ thể:** AI tạo DT-013 (kiểm tra alt text ảnh — nguồn gốc từ FR-24) và DT-014 (format giá — nguồn gốc từ FR-21) — những requirement này không thuộc phạm vi trực tiếp của FR-05 mà user yêu cầu test.
- **Nguyên nhân gốc:** AI thực hiện truy vết (traceability) giữa các requirement liên quan, dẫn đến việc tạo test case vượt ngoài scope được chỉ định.
- **Bài học:** AI cần được ràng buộc chặt hơn về phạm vi — chỉ tạo test case cho requirement được chỉ định, không tự mở rộng sang requirement liên quan trừ khi user yêu cầu.

### 2.2. Test data lệch với dữ liệu thực tế

- **Vấn đề:** AI tạo test steps với sản phẩm/dữ liệu/loại sản phẩm không tồn tại trong hệ thống thực tế.
- **Ví dụ cụ thể:** AI dùng từ khóa "Áo" làm test data cho EP2, nhưng trong CSDL thực tế không có sản phẩm tên "Áo" — tester phải đổi thành "Iphone" (sản phẩm thực tế có trong DB).
- **Nguyên nhân gốc:** Thực hiện Black-box testing, AI chỉ được đọc đặc tả (description_project.md, api_specification.md) mà KHÔNG được truy cập CSDL hoặc chạy API thực tế. Do đó, AI phải đoán/giả định dữ liệu test.
- **Bài học:** Khi thiết kế test case dựa trên đặc tả, AI nên ghi rõ giả định về test data và yêu cầu tester xác nhận/điều chỉnh trước khi thực thi. Hoặc cho phép AI gọi API `GET /api/products` để lấy dữ liệu thực.

### 2.3. Tạo test case trùng lặp / ngoài phạm vi

- **Vấn đề:** AI sinh ra các test case có nội dung trùng lặp hoặc nguồn gốc từ requirement khác, không tập trung vào FR-05.
- **Ví dụ cụ thể:** Cả DT-009 (UI-2: Card SP) và DT-012 (UI-8: Format giá) đều phát hiện cùng một lỗi (VND vs ₫), cho thấy sự trùng lặp trong phạm vi kiểm tra.
- **Nguyên nhân gốc:** AI cố gắng bao phủ tất cả các khía cạnh liên quan đến FR-05 bằng cách truy vết các requirement khác (FR-21 về nhất quán tiền tệ, FR-24 về alt text). Điều này dẫn đến test case bị phân tán và trùng lặp.
- **Bài học:** AI nên xác nhận phạm vi requirement cụ thể với user trước khi thiết kế test case, và tránh tự mở rộng phạm vi.

---

## 3. Các bugs mà AI test design đã phát hiện thành công

Mặc dù có hạn chế, thiết kế test của AI đã bao phủ đúng các vùng quan trọng:

| Bug | Nguồn gốc từ AI Design | Đánh giá |
|-----|------------------------|----------|
| BUG-FR05-003 (XSS → 500) | EP6 — Malicious Payload partition | ✅ AI đề xuất đúng — phân hoạch Malicious Payload là do user yêu cầu nhưng AI thiết kế test steps phù hợp |
| BUG-FR05-004 (SQL Injection) | EP7 — Malicious Payload partition | ✅ AI đề xuất đúng |
| BUG-FR05-001 (Missing empty state) | EP3 — Không có kết quả | ✅ AI đề xuất đúng |
| BUG-FR05-006 (No loading) | UI-4 requirement | ✅ AI trích xuất đúng từ đặc tả FR-05 |
| BUG-FR05-007 (Two h1 tags) | UI-6 requirement | ✅ AI trích xuất đúng từ đặc tả FR-05 |

---

## 4. Kết luận

AI là công cụ hữu ích cho việc thiết kế test case ban đầu, nhưng **human review là bắt buộc** để:

- Điều chỉnh phạm vi test case cho đúng requirement được yêu cầu
- Thay thế test data giả định bằng dữ liệu thực tế của hệ thống
- Loại bỏ test case trùng lặp hoặc ngoài phạm vi
- Xác nhận kết quả test trên hệ thống thực
