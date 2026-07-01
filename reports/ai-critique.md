# AI Critique

AI hữu ích trong bài HW02 vì giúp chuyển requirement khá rộng thành các artifact có cấu trúc: biến đầu vào, equivalence class, boundary candidate, traceability table, review, test run và bug report draft. Điểm mạnh nhất của AI là tăng tốc việc dựng khung ban đầu. Ví dụ, AI giúp tách rõ FR-10 là state machine dạng categorical nên không nên ép Boundary Value Analysis lên thứ tự trạng thái như `pending`, `confirmed`, `shipping`.

Tuy vậy, AI cũng cho thấy vì sao human review là bắt buộc. Một lỗi rõ ràng là hallucination reference `FR-22` trong FR-02, trong khi requirement đúng phải là `GUI-02`. AI cũng dễ quá tự tin với các boundary còn mơ hồ, như hành vi chính xác tại mốc 30 giây của FR-02 hoặc thao tác giảm số lượng về 0 trong FR-26. Nếu requirement không nói rõ, các điểm này không được biến thành rule cứng mà phải ghi là `Chưa được đặc tả` hoặc `Giả định cần xác nhận`. Ngoài ra, AI có thể tạo tài liệu trông đúng format nhưng sai ngữ cảnh, như AI Audit Report cũ không thuộc HW02.

Nguyên tắc rút ra là AI nên được dùng để draft và gợi ý checklist, không được xem là nguồn chân lý của requirement. Người kiểm thử vẫn phải đối chiếu từng constraint, expected result và bug claim với SRS, evidence thực tế và review checklist trước khi đưa vào bài nộp.

