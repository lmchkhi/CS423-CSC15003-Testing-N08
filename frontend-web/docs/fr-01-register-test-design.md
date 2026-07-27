# Thiết kế kiểm thử tự động FR-01 — Đăng ký tài khoản

## Sổ yêu cầu

| Tính năng | Nguồn yêu cầu | Quy tắc | Mã ca kiểm thử | Tệp dữ liệu | Tệp spec | Trình duyệt | Báo cáo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-01 Đăng ký tài khoản | `../README.md`, mục FR-01 | Họ tên, email và mật khẩu bắt buộc; email đúng định dạng và duy nhất; mật khẩu mạnh; xác nhận khớp; thành công chuyển đến đăng nhập | `FR01-TC-001`–`FR01-TC-015` | `test-data/fr-01-register.json` | `tests/fr-01-register.spec.ts` | Chromium, Firefox, WebKit | `reports/html/fr-01-register/<browser>/` |

## Phân tích

- Tác nhân: khách chưa đăng nhập.
- Tiền điều kiện: frontend ở `http://127.0.0.1:5173`, backend ở `http://127.0.0.1:3000`.
- Dữ liệu bắt buộc: họ tên, email, mật khẩu và xác nhận mật khẩu.
- Email phải theo dạng `user@domain.com` và không trùng email đã tồn tại.
- Mật khẩu dài ít nhất 8 ký tự, chứa chữ hoa, chữ thường, chữ số và ít nhất một ký tự trong `@`, `$`, `!`, `%`, `*`, `?`, `&`.
- Hai giá trị mật khẩu phải khớp.
- Oracle thành công: URL chuyển sang `/login`.
- Oracle thất bại: form vẫn ở `/register` và hiển thị validation hoặc thông báo phù hợp.

## Thiết kế và rà soát

15 ca bao phủ luồng dương, trường bắt buộc, email sai định dạng/trùng, biên 7–8 ký tự, từng nhóm ký tự mật khẩu, ký tự ngoài danh sách, sự tồn tại/kiểu của trường xác nhận và xác nhận không khớp. Các ca khác nhau về quy tắc hoặc oracle, không dùng việc lặp trình duyệt để tăng số ca logic.

### Bảng tóm tắt ca kiểm thử

| Mã ca | Mô tả | Phân loại | Dữ liệu / điều kiện chính | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| `FR01-TC-001` | Đăng ký thành công với dữ liệu hợp lệ | Positive | Họ tên và email mới hợp lệ; mật khẩu/xác nhận `Valid123@` | Chuyển tới `/login`. |
| `FR01-TC-002` | Từ chối khi bỏ trống họ tên | Negative | Họ tên rỗng; các trường còn lại hợp lệ | Trường Họ Tên không hợp lệ theo HTML5 và vẫn ở `/register`. |
| `FR01-TC-003` | Từ chối khi bỏ trống email | Negative | Email rỗng; các trường còn lại hợp lệ | Trường Email không hợp lệ theo HTML5 và vẫn ở `/register`. |
| `FR01-TC-004` | Từ chối khi bỏ trống mật khẩu | Negative | Mật khẩu và xác nhận rỗng | Trường Mật khẩu không hợp lệ theo HTML5 và vẫn ở `/register`. |
| `FR01-TC-005` | Từ chối email sai định dạng | Validation | Email `email-khong-hop-le`; dữ liệu còn lại hợp lệ | Trường Email không hợp lệ theo HTML5 và vẫn ở `/register`. |
| `FR01-TC-006` | Từ chối email đã tồn tại | Negative | Tạo trước email bằng API, sau đó đăng ký lại email đó qua UI | Hiển thị lỗi email đã tồn tại/trùng và vẫn ở `/register`. |
| `FR01-TC-007` | Chấp nhận mật khẩu mạnh đúng 8 ký tự | Boundary | Mật khẩu/xác nhận `Aa1@aaaa` có đúng 8 ký tự và đủ bốn nhóm | Chuyển tới `/login`. |
| `FR01-TC-008` | Từ chối mật khẩu chỉ có 7 ký tự | Boundary | Mật khẩu/xác nhận `Aa1@aaa` | Hiển thị lỗi tối thiểu 8 ký tự và vẫn ở `/register`. |
| `FR01-TC-009` | Từ chối mật khẩu thiếu chữ hoa | Validation | Mật khẩu/xác nhận `valid123@` | Hiển thị lỗi thiếu chữ hoa hoặc mật khẩu yếu. |
| `FR01-TC-010` | Từ chối mật khẩu thiếu chữ thường | Validation | Mật khẩu/xác nhận `VALID123@` | Hiển thị lỗi thiếu chữ thường hoặc mật khẩu yếu. |
| `FR01-TC-011` | Từ chối mật khẩu thiếu chữ số | Validation | Mật khẩu/xác nhận `ValidPwd@` | Hiển thị lỗi thiếu chữ số hoặc mật khẩu yếu. |
| `FR01-TC-012` | Từ chối mật khẩu thiếu ký tự đặc biệt | Validation | Mật khẩu/xác nhận `Valid1234` | Hiển thị lỗi thiếu ký tự đặc biệt hoặc mật khẩu yếu. |
| `FR01-TC-013` | Từ chối ký tự đặc biệt ngoài danh sách | Validation | Mật khẩu/xác nhận `Valid123#`; `#` không thuộc danh sách cho phép | Hiển thị lỗi ký tự đặc biệt không hợp lệ hoặc mật khẩu yếu. |
| `FR01-TC-014` | Kiểm tra trường xác nhận mật khẩu được che | Structure | Mở form và tìm trường Xác nhận mật khẩu | Trường hiển thị và có thuộc tính `type="password"`. |
| `FR01-TC-015` | Từ chối xác nhận mật khẩu không khớp | Validation | Mật khẩu `Valid123@`; xác nhận `Different123@` | Hiển thị lỗi hai mật khẩu không khớp và vẫn ở `/register`. |

| Nhóm | Ca kiểm thử |
| --- | --- |
| Thành công và biên hợp lệ | FR01-TC-001, FR01-TC-007 |
| Trường bắt buộc | FR01-TC-002, FR01-TC-003, FR01-TC-004 |
| Email | FR01-TC-005, FR01-TC-006 |
| Độ mạnh mật khẩu | FR01-TC-008–FR01-TC-013 |
| Xác nhận mật khẩu | FR01-TC-014, FR01-TC-015 |

## Mô hình dữ liệu và ánh xạ tự động

Dữ liệu ngoài spec sử dụng các khóa: `id`, `titleVi`, `category`, `coveredRule`, `journey`, `input`, `expected`. Loader kiểm tra schema, ID trùng và tối thiểu 12 ca trước khi Playwright đăng ký test.

- `submit`: điền form qua nhãn semantic, bấm nút Đăng Ký và kiểm tra oracle.
- `duplicateEmail`: tạo tiền điều kiện bằng API, sau đó thực hiện hành vi cần kiểm thử qua UI.
- `inspectField`: kiểm tra trực tiếp cấu trúc bắt buộc của form.
- Email có `{{RUN_ID}}` được thay bằng định danh duy nhất của tiến trình để các ca độc lập.

Các họ assertion được dùng:

- Điều hướng: `toHaveURL` — FR01-TC-001, FR01-TC-007 và các ca từ chối.
- Hiển thị/nội dung: `toBeVisible` với thông báo regex — FR01-TC-006, FR01-TC-008–FR01-TC-013, FR01-TC-015.
- Trạng thái/giá trị thuần: `checkValidity()` kết hợp `toBe(false)` — FR01-TC-002–FR01-TC-005.
- Thuộc tính: `toHaveAttribute` — FR01-TC-014.

## Cô lập, báo cáo và giới hạn

Runner chạy tuần tự từng ô trình duyệt và tạo một Playwright HTML report riêng. Tiêu đề report chứa chính xác `Run by: 23127062` và ISO timestamp do runner sinh ngay trước lần chạy. Các lỗi do sản phẩm không tuân thủ README được giữ nguyên; không hạ expected result để làm test xanh.

## Kết quả thực thi ngày 2026-07-27

| Trình duyệt | Tổng | Pass | Fail | ISO timestamp |
| --- | ---: | ---: | ---: | --- |
| Chromium | 15 | 9 | 6 | `2026-07-27T07:50:53.071Z` |
| Firefox | 15 | 9 | 6 | `2026-07-27T07:51:00.986Z` |
| WebKit | 15 | 9 | 6 | `2026-07-27T07:51:13.375Z` |

Ba report đã được giải mã metadata để xác nhận đúng project, đủ 15 ca, nhãn `Run by: 23127062` và timestamp tương ứng. Sáu ca fail giống nhau trên ba trình duyệt được phân tích trong `docs/fr-01-defects.md`.
