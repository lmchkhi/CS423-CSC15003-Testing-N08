<!-- tests/test-runs/FR-22-form-mobile-run.md -->

# Test Run: FR-22 — Form Requirements (Mobile App)

## Tóm tắt

| Thông tin           | Giá trị        |
|---------------------|----------------|
| Ngày thực hiện      | 2026-06-27     |
| Tester              |                |
| Tổng test case      | 19             |
| Passed              | 6              |
| Failed              | 13             |
| Not Run             | 0              |
| Pass Rate           | 31.6%          |

## Kết quả chi tiết

| TC ID  | Tên Test Case                                                  | Status     | Ghi chú                                                                       |
|--------|----------------------------------------------------------------|------------|-------------------------------------------------------------------------------|
| DT-001 | Ký hiệu `*` trên trường bắt buộc — Form Đăng nhập            | ❌ Failed  | Trường Email và Mật khẩu đều không có `*`                                     |
| DT-002 | Ký hiệu `*` trên trường bắt buộc — Form Đăng ký              | ❌ Failed  | Các trường Họ Tên, Email, Mật khẩu đều không có `*`                           |
| DT-003 | Ký hiệu `*` trên trường bắt buộc — Form Quên MK B1           | ❌ Failed  | Trường Email không có `*`                                                     |
| DT-004 | Ký hiệu `*` trên trường bắt buộc — Form Đặt lại MK B2        | ❌ Failed  | Các trường OTP, Mật khẩu mới không có `*`                                     |
| DT-005 | Ký hiệu `*` trên trường bắt buộc — Form Hồ sơ cá nhân        | ❌ Failed  | Trường Họ Tên không có `*`                                                    |
| DT-006 | Ký hiệu `*` trên trường bắt buộc — Form Checkout              | ❌ Failed  | Không có trường bắt buộc nào hiển thị `*`                                     |
| DT-007 | Bàn phím Email — Form Đăng nhập                                | ❌ Failed  | Bàn phím không hiện phím `@` và `.` trực tiếp                                 |
| DT-008 | Bàn phím Email — Form Đăng ký                                  | ❌ Failed  | Bàn phím không hiện phím `@` và `.` trực tiếp                                 |
| DT-009 | Bàn phím Email — Form Quên MK Bước 1                           | ❌ Failed  | Bàn phím không đúng dạng email                                                |
| DT-010 | Ẩn ký tự mật khẩu — Form Đăng nhập                             | ✅ Passed  | Ký tự ẩn dạng •••                                                             |
| DT-011 | Ẩn ký tự mật khẩu — Form Đăng ký                               | ✅ Passed  | Ký tự ẩn dạng •••                                                             |
| DT-012 | Ẩn ký tự mật khẩu — Form Đặt lại MK Bước 2                    | ❌ Failed  | MK mới ẩn đúng, nhưng trường "Xác nhận MK mới" không tồn tại                 |
| DT-013 | Vị trí lỗi trên nút Submit — Form Đăng nhập                    | ❌ Failed  | Lỗi hiển thị phía DƯỚI nút Submit                                            |
| DT-014 | Vị trí lỗi trên nút Submit — Form Đăng ký                      | ✅ Passed  | Lỗi hiển thị phía trên nút                                                   |
| DT-015 | Vị trí lỗi trên nút Submit — Form Quên MK B1                   | ✅ Passed  | Lỗi hiển thị dạng pop-up                                                      |
| DT-016 | Vị trí lỗi trên nút Submit — Form Đặt lại MK B2                | ✅ Passed  | Lỗi hiển thị dạng pop-up                                                      |
| DT-017 | Vị trí lỗi trên nút Submit — Form Hồ sơ cá nhân                | ❌ Failed  | Pop-up hiện sai nội dung: "SĐT không hợp lệ" thay vì "Họ Tên không được để trống" |
| DT-018 | Step Indicator — Form Quên MK 2 bước                            | ❌ Failed  | Không hiển thị Step Indicator trên cả 2 bước                                  |
| DT-019 | Không có Step Indicator — Form 1 bước Đăng nhập                 | ❌ Failed  | Form 1 bước không hiện Step Indicator (hành vi đúng nhưng status ghi Failed bởi tester) |

## Danh sách Bug Reports

| Bug ID        | Tên                                                                        | Severity       | Test Cases liên quan                          |
|---------------|----------------------------------------------------------------------------|----------------|-----------------------------------------------|
| BUG-FR22-001  | Tất cả form mobile thiếu ký hiệu `*` cho trường bắt buộc                 | Major / P1     | DT-001, DT-002, DT-003, DT-004, DT-005, DT-006 |
| BUG-FR22-002  | Trường Email trên mobile không sử dụng bàn phím email (keyboardType)      | Major / P1     | DT-007, DT-008, DT-009                        |
| BUG-FR22-003  | Trường "Xác nhận mật khẩu mới" không tồn tại trên form Đặt lại MK       | Minor / P2     | DT-012                                         |
| BUG-FR22-004  | Form Đăng nhập hiển thị lỗi validation phía dưới nút Submit               | Major / P1     | DT-013                                         |
| BUG-FR22-005  | Form Hồ sơ cá nhân hiển thị sai nội dung lỗi validation                   | Minor / P2     | DT-017                                         |
| BUG-FR22-006  | Form Quên mật khẩu (2 bước) thiếu Step Indicator                          | Major / P1     | DT-018                                         |
