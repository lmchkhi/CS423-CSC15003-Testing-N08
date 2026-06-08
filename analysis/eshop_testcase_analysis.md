# Lý Giải Xây Dựng Bộ Test Case FR-04

## Các bước dùng để đưa ra test case
1. Xác định đúng phạm vi là FR-04: quản lý hồ sơ cá nhân.
2. Tách yêu cầu thành các ràng buộc kiểm thử độc lập: trường được phép sửa, định dạng số điện thoại, email không cho đổi và role không được tự thay đổi.
3. Thiết kế ít nhất một testcase dương để xác nhận luồng hợp lệ và các testcase âm để kiểm tra từng ràng buộc bị chặn.
4. Đưa vào trường hợp biên cho số điện thoại vì đặc tả nêu rõ khoảng 10 đến 11 chữ số và bắt đầu bằng 0.
5. Giữ testcase bám sát hành vi quan sát được trên giao diện hoặc request, không mở rộng sang yêu cầu ngoài FR-04.

## Lý giải theo từng testcase
**TC-04-01:** Case này xác nhận luồng chính của FR-04: người dùng đã đăng nhập phải cập nhật được Họ tên, Số điện thoại và Địa chỉ giao hàng mặc định khi dữ liệu hợp lệ.

**TC-04-02:** Case này kiểm tra trực tiếp ràng buộc số điện thoại hợp lệ, bao gồm điều kiện bắt đầu bằng số 0 và độ dài 10 đến 11 chữ số. Đây là trường dễ sai ở cả validate giao diện lẫn backend.

**TC-04-03:** Case này bám vào yêu cầu email không được phép thay đổi qua giao diện. Nó giúp phát hiện lỗi cho phép sửa nhầm trường định danh tài khoản.

**TC-04-04:** Case này kiểm tra ranh giới quyền cập nhật hồ sơ của chính mình và ngăn thay đổi thuộc tính role. Đây là điểm quan trọng về phân quyền và bảo mật đúng theo FR-04.
