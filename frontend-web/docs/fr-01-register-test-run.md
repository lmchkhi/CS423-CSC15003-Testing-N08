# Báo cáo thực thi kiểm thử FR-01 — Đăng ký tài khoản

## Thông tin chung

| Thuộc tính       | Giá trị                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Tính năng        | FR-01 — Đăng ký tài khoản                                           |
| Người chạy       | `23127062`                                                          |
| Ngày chạy        | 2026-07-27                                                          |
| Frontend URL     | `http://127.0.0.1:5173/register`                                    |
| Backend URL      | `http://127.0.0.1:3000`                                             |
| Công cụ          | Playwright 1.62.0                                                   |
| Trình duyệt      | Chromium, Firefox, WebKit                                           |
| Hệ điều hành     | macOS 26.5.2, Build 25F84, arm64                                    |
| Base commit      | `969e1566f2c1195effaf95fbb322052292cec08a`                          |
| Trạng thái build | Working tree hiện tại có thay đổi chưa commit                       |
| Test design      | [fr-01-register-test-design.md](fr-01-register-test-design.md)      |
| Test data        | [`test-data/fr-01-register.json`](../test-data/fr-01-register.json) |
| Test spec        | [`tests/fr-01-register.spec.ts`](../tests/fr-01-register.spec.ts)   |

## Tổng quan kết quả

| Chỉ số             | Kết quả |
| ------------------ | ------: |
| Ca kiểm thử logic  |      15 |
| Browser            |       3 |
| Tổng lượt thực thi |      45 |
| Pass               |      27 |
| Fail               |      18 |
| Flaky              |       0 |
| Skipped            |       0 |

| Browser  | ISO timestamp              | Tổng | Pass | Fail | Trạng thái | HTML report                                                     |
| -------- | -------------------------- | ---: | ---: | ---: | ---------- | --------------------------------------------------------------- |
| Chromium | `2026-07-27T07:50:53.071Z` |   15 |    9 |    6 | Failed     | [Mở report](../reports/html/fr-01-register/chromium/index.html) |
| Firefox  | `2026-07-27T07:51:00.986Z` |   15 |    9 |    6 | Failed     | [Mở report](../reports/html/fr-01-register/firefox/index.html)  |
| WebKit   | `2026-07-27T07:51:13.375Z` |   15 |    9 |    6 | Failed     | [Mở report](../reports/html/fr-01-register/webkit/index.html)   |

Metadata nhúng của cả ba report đã được kiểm tra: mỗi report có đúng 15 ca, đúng browser, nhãn `Run by: 23127062` và ISO timestamp tương ứng.

## Kết quả chi tiết theo ca kiểm thử

| Mã ca         | Mô tả                                         | Chromium | Firefox | WebKit | Bug liên quan / ghi chú                                                                                                                                                              |
| ------------- | --------------------------------------------- | -------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FR01-TC-001` | Đăng ký thành công với dữ liệu hợp lệ         | Fail     | Fail    | Fail   | [BUG-FR01-001](bugs/BUG-FR01-001-valid-password-rejected.md) — mật khẩu hợp lệ bị báo yếu.                                                                                           |
| `FR01-TC-002` | Từ chối khi bỏ trống họ tên                   | Pass     | Pass    | Pass   | Validation trường bắt buộc hoạt động đúng.                                                                                                                                           |
| `FR01-TC-003` | Từ chối khi bỏ trống email                    | Pass     | Pass    | Pass   | Validation trường bắt buộc hoạt động đúng.                                                                                                                                           |
| `FR01-TC-004` | Từ chối khi bỏ trống mật khẩu                 | Pass     | Pass    | Pass   | Validation trường bắt buộc hoạt động đúng.                                                                                                                                           |
| `FR01-TC-005` | Từ chối email sai định dạng                   | Fail     | Fail    | Fail   | [BUG-FR01-002](bugs/BUG-FR01-002-invalid-email-validation.md) — input Email dùng `type="text"` nên `checkValidity()` trả về `true`.                                                  |
| `FR01-TC-006` | Từ chối email đã tồn tại                      | Fail     | Fail    | Fail   | Bị [BUG-FR01-001](bugs/BUG-FR01-001-valid-password-rejected.md) chặn ở validation mật khẩu trước khi quan sát được oracle email trùng; uniqueness chưa được kết luận độc lập qua UI. |
| `FR01-TC-007` | Chấp nhận mật khẩu mạnh đúng 8 ký tự          | Fail     | Fail    | Fail   | [BUG-FR01-001](bugs/BUG-FR01-001-valid-password-rejected.md) — mật khẩu đúng biên 8 ký tự bị từ chối.                                                                                |
| `FR01-TC-008` | Từ chối mật khẩu chỉ có 7 ký tự               | Pass     | Pass    | Pass   | Thông báo lỗi tối thiểu 8 ký tự xuất hiện.                                                                                                                                           |
| `FR01-TC-009` | Từ chối mật khẩu thiếu chữ hoa                | Pass     | Pass    | Pass   | Mật khẩu yếu bị từ chối.                                                                                                                                                             |
| `FR01-TC-010` | Từ chối mật khẩu thiếu chữ thường             | Pass     | Pass    | Pass   | Mật khẩu yếu bị từ chối.                                                                                                                                                             |
| `FR01-TC-011` | Từ chối mật khẩu thiếu chữ số                 | Pass     | Pass    | Pass   | Mật khẩu yếu bị từ chối.                                                                                                                                                             |
| `FR01-TC-012` | Từ chối mật khẩu thiếu ký tự đặc biệt         | Pass     | Pass    | Pass   | Mật khẩu yếu bị từ chối.                                                                                                                                                             |
| `FR01-TC-013` | Từ chối ký tự đặc biệt ngoài danh sách        | Pass     | Pass    | Pass   | Ký tự `#` không thuộc danh sách cho phép và bị từ chối.                                                                                                                              |
| `FR01-TC-014` | Biểu mẫu có trường xác nhận mật khẩu được che | Fail     | Fail    | Fail   | [BUG-FR01-003](bugs/BUG-FR01-003-missing-confirm-password.md) — không tìm thấy trường Xác nhận mật khẩu.                                                                             |
| `FR01-TC-015` | Từ chối khi xác nhận mật khẩu không khớp      | Fail     | Fail    | Fail   | [BUG-FR01-003](bugs/BUG-FR01-003-missing-confirm-password.md) là lỗi chính; [BUG-FR01-001](bugs/BUG-FR01-001-valid-password-rejected.md) cũng chặn luồng submit.                     |

## Đánh giá

- Kết quả nhất quán trên Chromium, Firefox và WebKit; không có flaky hoặc ca bị skip.
- 9 ca pass xác nhận validation trường bắt buộc và các trường hợp mật khẩu yếu hiện có phản hồi quan sát được.
- 6 ca fail trên mỗi browser được giữ nguyên theo expected result của `README.md`; không thay đổi oracle để làm test xanh.
- Có 3 bug sản phẩm đã được xác nhận và lưu bằng chứng.
- `FR01-TC-006` chưa đánh giá độc lập được uniqueness qua UI vì BUG-FR01-001 chặn trước khi request đăng ký được gửi. Cần chạy lại toàn ma trận sau khi sửa BUG-FR01-001.
