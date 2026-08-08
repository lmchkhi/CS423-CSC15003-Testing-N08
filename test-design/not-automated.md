# Case không tự động hoá được

HW04 §6 yêu cầu ghi rõ những test case không automate được và lý do.

| Case ID | Feature | Nội dung case | Lý do không automate | Điều kiện để automate được |
|---|---|---|---|---|
| — (nửa sau của BUG-FR02-002) | FR-02 | Ô nhập mật khẩu phải dùng `type="password"` để không hiển thị rõ ký tự | Không phải "không automate được về kỹ thuật" mà là **không có oracle**: `sut-requirements.md` §2 chỉ quy định kiểu của trường email, hoàn toàn im lặng về trường mật khẩu. Assert một quy tắc mà đặc tả không nêu sẽ biến quan sát chủ quan thành tiêu chí đánh giá | Đặc tả bổ sung ràng buộc kiểu cho trường mật khẩu (hoặc một yêu cầu chung về che giấu thông tin nhập nhạy cảm) |
| TC-FR10-DT-013 | FR-10 | Từ chối xử lý đơn hàng có trạng thái hiện tại ngoài miền (`returned`) | **Không dựng được tiền điều kiện**: mọi đường tạo/đổi trạng thái mà client tiếp cận được đều từ chối giá trị ngoài 5 trạng thái đặc tả (recon: thao tác đặt trạng thái `returned` bị trả về lỗi *invalid state transition*), nên không có cách nào đưa một đơn về trạng thái `returned` để bắt đầu case. Bản thân việc chặn này chính là hành vi đúng mà TC-FR10-DT-012 (→ F10-TC-012) đã kiểm chứng | Một đường ghi trực tiếp vào dữ liệu (API seed hoặc fixture nạp database riêng cho từng lượt chạy) cho phép đặt đơn vào trạng thái ngoài miền |
| TC-FR13-DT-001 | FR-13 | Dashboard khi hệ thống chưa có đơn hàng nào | Toàn bộ SUT dùng chung một file SQLite; ma trận 3 trình duyệt × 3 feature chạy trước feature này đã tạo đơn hàng, và việc reseed về "không đơn hàng" đòi hỏi dừng backend giữa lượt chạy | Một backend cho phép reset dữ liệu qua API, hoặc mỗi cell chạy trên một database riêng |

> Lý do phải cụ thể: cần oracle từ con người, cần truy cập email/OTP ngoài hệ
> thống, phụ thuộc thiết bị mobile (ngoài phạm vi HW04), kết quả không tất
> định, hoặc trình duyệt không tiếp cận được. Danh sách ngắn và trung thực tốt
> hơn một suite được độn thêm case.
