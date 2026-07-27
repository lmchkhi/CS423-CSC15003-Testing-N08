# Kết quả và lỗi sản phẩm FR-01

## Thông tin thực thi

- Người chạy: `23127062`
- Chromium: 15 ca, 9 pass, 6 fail — `2026-07-27T07:50:53.071Z`
- Firefox: 15 ca, 9 pass, 6 fail — `2026-07-27T07:51:00.986Z`
- WebKit: 15 ca, 9 pass, 6 fail — `2026-07-27T07:51:13.375Z`
- Các ca fail giống nhau trên cả ba trình duyệt: FR01-TC-001, FR01-TC-005, FR01-TC-006, FR01-TC-007, FR01-TC-014, FR01-TC-015.

## BUG-FR01-001 — Mật khẩu mạnh hợp lệ bị từ chối

**Ca liên quan:** FR01-TC-001, FR01-TC-007; đồng thời chặn quan sát độc lập oracle email trùng ở FR01-TC-006.

**Bước tái hiện:** mở `/register`, nhập họ tên và email hợp lệ, nhập `Valid123@` hoặc mật khẩu 8 ký tự `Aa1@aaaa`, rồi bấm Đăng Ký.

**Kỳ vọng:** mật khẩu có chữ hoa, chữ thường, chữ số và `@` được chấp nhận; người dùng được chuyển đến `/login`.

**Thực tế:** trang vẫn ở `/register` và báo mật khẩu yếu. Mẫu lỗi giống nhau trên Chromium, Firefox và WebKit.

**Bằng chứng:** [ảnh WebKit của FR01-TC-001](evidence/bug-fr01-001-valid-password-rejected.png).

**Phân loại:** lỗi sản phẩm. Biểu thức chính quy hiện tại yêu cầu khoảng trắng thay vì một ký tự đặc biệt thuộc danh sách FR-01.

## BUG-FR01-002 — Email sai định dạng không bị HTML5 validation từ chối

**Ca liên quan:** FR01-TC-005.

**Bước tái hiện:** mở `/register`, nhập `email-khong-hop-le` vào trường Email và dữ liệu còn lại, rồi bấm Đăng Ký.

**Kỳ vọng:** trường email không hợp lệ (`checkValidity() === false`) và form không được gửi.

**Thực tế:** `checkValidity() === true` trên cả ba trình duyệt vì trường đang dùng `type="text"` thay vì `type="email"`.

**Bằng chứng:** [ảnh WebKit của FR01-TC-005](evidence/bug-fr01-002-invalid-email-accepted.png).

**Phân loại:** lỗi sản phẩm.

## BUG-FR01-003 — Thiếu trường xác nhận mật khẩu

**Ca liên quan:** FR01-TC-014, FR01-TC-015.

**Bước tái hiện:** mở `/register` và quan sát form đăng ký.

**Kỳ vọng:** có trường Xác nhận mật khẩu dạng `password`; khi hai giá trị không khớp phải có thông báo phù hợp.

**Thực tế:** form chỉ có Họ Tên, Email và Mật khẩu; không thể nhập hoặc đối chiếu xác nhận mật khẩu.

**Bằng chứng:** [ảnh WebKit của FR01-TC-014](evidence/bug-fr01-003-missing-confirm-password.png).

**Phân loại:** lỗi sản phẩm.

## Ghi chú về email trùng

FR01-TC-006 tạo email đã tồn tại thành công bằng API trước khi thao tác UI. Tuy nhiên mật khẩu hợp lệ của ca bị BUG-FR01-001 chặn ở client, nên lần chạy này chưa thể quan sát độc lập phản hồi uniqueness từ backend qua UI. Test vẫn giữ expected result đúng theo README và tiếp tục fail; cần chạy lại sau khi sửa BUG-FR01-001 để kết luận riêng về uniqueness.

Không tạo GitHub Issue trong lần thực thi này vì repo chưa có kết nối GitHub được cấp quyền. Tài liệu Markdown và screenshot thật được giữ lại làm bằng chứng để sinh viên tạo issue sau.
