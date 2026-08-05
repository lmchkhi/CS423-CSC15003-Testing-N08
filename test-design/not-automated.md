# Case không tự động hoá được

HW04 §6 yêu cầu ghi rõ những test case không automate được và lý do.

| Case ID | Feature | Nội dung case | Lý do không automate | Điều kiện để automate được |
|---|---|---|---|---|
| — (nửa sau của BUG-FR02-002) | FR-02 | Ô nhập mật khẩu phải dùng `type="password"` để không hiển thị rõ ký tự | Không phải "không automate được về kỹ thuật" mà là **không có oracle**: `sut-requirements.md` §2 chỉ quy định kiểu của trường email, hoàn toàn im lặng về trường mật khẩu. Assert một quy tắc mà đặc tả không nêu sẽ biến quan sát chủ quan thành tiêu chí đánh giá | Đặc tả bổ sung ràng buộc kiểu cho trường mật khẩu (hoặc một yêu cầu chung về che giấu thông tin nhập nhạy cảm) |

> Lý do phải cụ thể: cần oracle từ con người, cần truy cập email/OTP ngoài hệ
> thống, phụ thuộc thiết bị mobile (ngoài phạm vi HW04), kết quả không tất
> định, hoặc trình duyệt không tiếp cận được. Danh sách ngắn và trung thực tốt
> hơn một suite được độn thêm case.
