# AI Gap Analysis - HW02

> Phạm vi: FR-02, FR-10, FR-13, FR-26.

## 1. Mục đích

Tài liệu này ghi lại các gap, giả định quá mức và điểm cần sửa được phát hiện sau khi review các artifact có AI hỗ trợ: analysis, test case, test run và bug report của HW02.

## 2. Tóm tắt gap

| Feature | Gap / rủi ro từ AI | Vì sao AI bỏ sót hoặc dễ sai | Cách sinh viên đã sửa |
|---|---|---|---|
| FR-02 | AI ban đầu dễ xem login chỉ là Email + Password và coi nhẹ trạng thái lockout. | Form login thường được mô hình hóa như quá trình kiểm tra thông tin đăng nhập đơn giản, trong khi FR-02 có system state: failed counter và lock duration. | Bổ sung `failed_login_attempt_count`, `account lock state`, `elapsed_lock_time`; tạo cả Domain Testing và BVA cho lockout. |
| FR-02 | AI tham chiếu requirement không tồn tại `FR-22` cho hành vi form input. | Model suy diễn ID dạng feature cho requirement GUI thay vì kiểm tra mã định danh thực tế. | Thay `FR-22` bằng `GUI-02` và kiểm lại traceability. |
| FR-02 | AI có thể khẳng định quá chắc chắn về hành vi tại đúng mốc 30 giây. | Requirement nêu thời lượng khóa nhưng không nêu dung sai đo thời gian hoặc hành vi chính xác tại mốc 30 giây. | Giữ ON boundary nhưng ghi là giả định cần xác nhận khi execution. |
| FR-10 | AI có thể áp dụng gượng ép BVA cho state machine có các trạng thái rời rạc. | Feature có 5 trạng thái nên dễ bị hiểu nhầm thành miền giá trị có thứ tự. | Tạo BVA analysis kết luận không áp dụng và không sinh test case BVA. |
| FR-10 | AI có thể tự suy diễn quyền Admin chưa được FR-10 nêu rõ, nhất là ở luồng chuyển trạng thái từ `shipping -> canceled`. | Requirement chỉ nói User không được tự hủy khi `shipping`; không nói rõ Admin có được hủy ở trạng thái đó không. | Không tạo valid case Admin hủy `shipping` như một quy tắc mặc định. |
| FR-13 | AI có thể tạo boundary giả cho doanh thu hoặc số lượng đơn hàng. | Output là số nên dễ bị lẫn với BVA, dù requirement không có min/max/range/threshold. | Ghi BVA không áp dụng và dùng Domain Testing theo dataset/status. |
| FR-26 | AI có thể gộp nhiều yêu cầu UI vào một test case lớn. | Các yêu cầu UI nhỏ nhìn có vẻ phụ, nhưng mỗi yêu cầu cần traceability và bug report riêng. | Tách test case theo nhãn, nút điều chỉnh số lượng, dialog xóa, nhãn tổng tiền, empty state và thêm trùng sản phẩm. |
| FR-26 | AI ban đầu xem việc thiếu screenshot dialog xóa là bằng chứng (evidence) chưa thuyết phục. | AI kỳ vọng có ảnh chụp trực tiếp, trong khi defect là dialog không xuất hiện và item bị xóa ngay. | Giữ screenshot mobile cart dùng chung và ghi rõ Actual Result trong test run/bug report. |

## 3. Nguyên tắc rút ra

AI mạnh ở việc tạo cấu trúc và gợi ý coverage, nhưng yếu ở việc xử lý những trường hợp tài liệu yêu cầu không đề cập đến (silent requirements). Trong HW02, mọi output AI đều phải được đối chiếu lại với SRS. Nếu constraint không có trong requirement, constraint đó phải bị loại bỏ hoặc được ghi là `Chưa được đặc tả` / `Giả định cần xác nhận`.

