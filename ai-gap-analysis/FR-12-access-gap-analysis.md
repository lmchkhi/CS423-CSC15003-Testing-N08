<!-- ai-gap-analysis/FR-12-access-gap-analysis.md -->

# AI Gap Analysis: FR-12 — Kiểm soát truy cập (Access Control)

## 1. Tổng quan

- AI đã thiết kế 40 test case cho FR-12, bao phủ 13 API endpoints với 3 kịch bản chính (No Token / User Token / Admin Token) + 1 kịch bản bổ sung (Invalid Token).
- Kỹ thuật áp dụng: Equivalence Partitioning (EP) — BVA được bỏ qua theo STRICT BVA RULE vì không có biến numerical.
- Kết quả: 23 Passed, 17 Failed, 0 Not Run.
- AI đã phát hiện thành công các lỗ hổng bảo mật nghiêm trọng thông qua thiết kế test case có hệ thống.

---

## 2. Các hạn chế của AI được xác định

### 2.1. Sắp xếp test case không tối ưu cho quy trình thực thi (Test Execution Order)

- **Vấn đề:** AI sắp xếp test case theo endpoint (DT-001→004 cho `/api/admin/users`, DT-005→007 cho DELETE, v.v.), xen kẽ giữa các kịch bản No Token → Invalid Token → User Token → Admin Token cho mỗi endpoint. Điều này buộc tester phải liên tục chuyển đổi access token giữa các lần test.
- **Ví dụ cụ thể:** Tester chạy DT-003 (user token) → DT-004 (admin token) → DT-005 (no token) → DT-006 (user token) → DT-007 (admin token), phải đăng nhập/đăng xuất và copy token liên tục.
- **Nguyên nhân gốc:** AI tổ chức test case theo **logical grouping** (nhóm theo endpoint) thay vì **execution grouping** (nhóm theo role/token). AI ưu tiên tính rõ ràng về mặt truy vết requirement (traceability) hơn hiệu quả thực thi.
- **Bài học:** Khi thiết kế test suite cho Access Control, AI nên cân nhắc thứ tự thực thi thực tế: chạy hết tất cả test case với cùng một role/token trước (ví dụ: tất cả "No Token" tests → tất cả "User Token" tests → tất cả "Admin Token" tests), rồi mới chuyển sang role khác. Điều này giảm số lần đăng nhập/đăng xuất và tăng hiệu quả cho tester.

### 2.2. Thiếu khả năng đánh giá trạng thái thực thi

- **Vấn đề:** AI không thể dự đoán các test case phụ thuộc lẫn nhau về mặt dữ liệu. Ví dụ: DT-007 (xóa user bằng admin token) có thể ảnh hưởng đến DT-030 (xóa sản phẩm bằng user token) nếu user đã bị xóa.
- **Nguyên nhân gốc:** Black-box testing — AI không có thông tin về trạng thái CSDL sau mỗi lần thực thi test case.
- **Bài học:** AI nên thêm ghi chú về thứ tự thực thi và các dependency giữa test case, đặc biệt với các thao tác DELETE có tính phá hủy dữ liệu.


---

## 3. Các bugs mà AI test design đã phát hiện thành công

Mặc dù có hạn chế về thứ tự thực thi, thiết kế test của AI đã phát hiện thành công các lỗ hổng bảo mật nghiêm trọng:

| Bug | Nguồn gốc từ AI Design | Đánh giá |
|-----|------------------------|----------|
| BUG-FR12-001 (Product API thiếu auth) | EP: No Token partition cho data-mutation APIs | ✅ AI thiết kế đúng — phân hoạch "Không có Token" cho POST/PUT/DELETE /api/products phát hiện endpoints hoàn toàn không có middleware xác thực |
| BUG-FR12-002 (Admin API thiếu role check) | EP: User Token partition cho /api/admin/* | ✅ AI thiết kế đúng — phân hoạch "Token hợp lệ + role=user" cho Admin APIs phát hiện SEC-03 violation hệ thống |
| BUG-FR12-003 (Category API thiếu role check) | EP: User Token partition cho data-mutation APIs | ✅ AI thiết kế đúng — tương tự BUG-FR12-002 nhưng cho Categories endpoints |
| BUG-FR12-004 (Wrong HTTP status code) | EP: Invalid Token partition | ✅ AI thiết kế đúng — phân hoạch "Token sai/hết hạn" phát hiện sai mã lỗi HTTP |

---

## 4. Kết luận

AI là công cụ hiệu quả cho việc thiết kế test case Access Control có tính hệ thống và coverage cao. Tuy nhiên, **human review là bắt buộc** để:

- Tối ưu hóa thứ tự thực thi test case theo workflow thực tế của tester (nhóm theo role thay vì theo endpoint)
- Xác định dependency giữa các test case có thao tác phá hủy dữ liệu (DELETE)
- Đánh giá mức độ nghiêm trọng (severity) phù hợp với ngữ cảnh hệ thống thực tế
