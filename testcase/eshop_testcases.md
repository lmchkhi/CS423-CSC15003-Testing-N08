# Bộ Test Case FR-04 - Quản lý hồ sơ cá nhân

## TC-INFO-01: Cập nhật hồ sơ với dữ liệu hợp lệ
**Tên test:** Người dùng cập nhật thành công Họ tên, Số điện thoại và Địa chỉ giao hàng mặc định

**Bước thực hiện:**
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Mở trang Hồ sơ cá nhân.
3. Nhập Họ tên mới hợp lệ.
4. Nhập Số điện thoại bắt đầu bằng 0 và có 10 đến 11 chữ số.
5. Nhập Địa chỉ giao hàng mặc định hợp lệ.
6. Bấm nút lưu thay đổi.

**Kết quả đúng:**
- Thông tin hồ sơ được cập nhật thành công.
- Dữ liệu mới được hiển thị lại đúng sau khi tải lại trang.

## TC-INFO-02: Từ chối số điện thoại không hợp lệ
**Tên test:** Hệ thống chặn số điện thoại không bắt đầu bằng 0 hoặc sai độ dài

**Bước thực hiện:**
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Mở trang Hồ sơ cá nhân.
3. Nhập Số điện thoại không bắt đầu bằng 0.
4. Nhập Số điện thoại có ít hơn 10 chữ số hoặc nhiều hơn 11 chữ số.
5. Bấm nút lưu thay đổi.

**Kết quả đúng:**
- Hệ thống từ chối lưu hồ sơ.
- Hiển thị thông báo lỗi phù hợp về định dạng số điện thoại.

## TC-INFO-03: Không cho thay đổi email qua giao diện
**Tên test:** Trường Email không thể chỉnh sửa trên màn hình hồ sơ

**Bước thực hiện:**
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Mở trang Hồ sơ cá nhân.
3. Kiểm tra trạng thái trường Email trên giao diện.
4. Thử nhập giá trị mới nếu trường có thể focus.
5. Lưu thay đổi hồ sơ.

**Kết quả đúng:**
- Trường Email bị khóa hoặc không cho thay đổi.
- Email của tài khoản không bị cập nhật dưới bất kỳ hình thức nào qua giao diện.

## TC-INFO-04: Không cho thay đổi role của chính mình
**Tên test:** Người dùng chỉ được cập nhật hồ sơ của chính mình và không thể đổi role

**Bước thực hiện:**
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Mở trang Hồ sơ cá nhân.
3. Thử sửa dữ liệu yêu cầu không thuộc phạm vi cho phép, gồm trường role nếu có thể can thiệp bằng request.
4. Lưu thay đổi.
5. Tải lại thông tin tài khoản.

**Kết quả đúng:**
- Hệ thống chỉ cho cập nhật hồ sơ của chính tài khoản đang đăng nhập.
- Trường role không bị thay đổi.
- Dữ liệu ngoài phạm vi FR-04 bị từ chối hoặc bị bỏ qua an toàn.
