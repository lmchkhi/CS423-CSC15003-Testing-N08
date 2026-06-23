# Main Report

## FR-01: Đăng ký tài khoản

### Mô tả yêu cầu

- Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
- Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
- Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
- Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường            | Kiểu dữ liệu | Ràng buộc                                                                                       |
|--------|-----------------------|---------------|--------------------------------------------------------------------------------------------------|
| Input  | Họ Tên                | String        | Bắt buộc nhập, không được để trống                                                               |
| Input  | Email                 | String        | Bắt buộc nhập, định dạng hợp lệ (user@domain.com), duy nhất trong hệ thống                      |
| Input  | Mật khẩu              | String        | Bắt buộc nhập, tối thiểu 8 ký tự, ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt     |
| Input  | Xác nhận mật khẩu     | String        | Bắt buộc nhập, phải khớp với trường Mật khẩu                                                     |
| Output | Đăng ký thành công     | Hành vi       | Chuyển hướng tới trang Đăng nhập                                                                 |
| Output | Đăng ký thất bại       | Hành vi       | Hiển thị thông báo lỗi tương ứng, giữ nguyên trang Đăng ký                                       |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường nhập liệu      | Mã phân vùng | Loại    | Mô tả                                                    | Giá trị đại diện         |
|------------------------|-------------|---------|-----------------------------------------------------------|--------------------------|
| Họ Tên                 | EP-01-01    | Valid   | Chuỗi ký tự hợp lệ (có nội dung)                          | `Nguyễn Văn A`            |
| Họ Tên                 | EP-01-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-01    | Valid   | Định dạng email hợp lệ, chưa tồn tại trong hệ thống       | `user01@gmail.com`        |
| Email                  | EP-02-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-03    | Invalid | Định dạng email không hợp lệ (thiếu @)                    | `user01gmail.com`         |
| Email                  | EP-02-04    | Invalid | Định dạng email không hợp lệ (thiếu domain)               | `user01@`                 |
| Email                  | EP-02-05    | Invalid | Email đã tồn tại trong hệ thống                           | `existing@gmail.com`      |
| Mật khẩu               | EP-03-01    | Valid   | Đáp ứng tất cả ràng buộc (≥8 ký tự, có hoa, thường, số, đặc biệt) | `Abcd@1234`        |
| Mật khẩu               | EP-03-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Mật khẩu               | EP-03-03    | Invalid | Độ dài < 8 ký tự                                          | `Ab@12`                   |
| Mật khẩu               | EP-03-04    | Invalid | Thiếu chữ hoa                                             | `abcd@1234`               |
| Mật khẩu               | EP-03-05    | Invalid | Thiếu chữ thường                                          | `ABCD@1234`               |
| Mật khẩu               | EP-03-06    | Invalid | Thiếu chữ số                                              | `Abcd@efgh`               |
| Mật khẩu               | EP-03-07    | Invalid | Thiếu ký tự đặc biệt                                      | `Abcd12345`               |
| Xác nhận mật khẩu      | EP-04-01    | Valid   | Khớp với trường Mật khẩu                                   | `Abcd@1234`               |
| Xác nhận mật khẩu      | EP-04-02    | Invalid | Không khớp với trường Mật khẩu                             | `Abcd@5678`               |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên               | Giá trị biên | Loại |
|-------------------|-------------------|--------------|------|
| Mật khẩu          | Độ dài tối thiểu   | 8            | Min  |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên               | Điểm           | Giá trị                | Số ký tự | Kết quả mong đợi |
|--------------------|--------------  |------------------------|----------|-------------------|
| Min = 8            | ON (8)         | `Abcd@123`             | 8        | Valid — Đăng ký thành công |
| Min = 8            | OFF⁻ (7)       | `Abc@123`              | 7        | Invalid — Báo lỗi mật khẩu quá ngắn |
| Min = 8            | OFF⁺ (9)       | `Abcd@1234`            | 9        | Valid — Đăng ký thành công |

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật        | Mô tả ngắn                                              |
|-----------------|----------------|----------------------------------------------------------|
| TC-FR-01-001    | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ            |
| TC-FR-01-002    | Domain Testing | Đăng ký với Họ Tên rỗng                                  |
| TC-FR-01-003    | Domain Testing | Đăng ký với Email rỗng                                   |
| TC-FR-01-004    | Domain Testing | Đăng ký với Email sai định dạng (thiếu @)                |
| TC-FR-01-005    | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain)           |
| TC-FR-01-006    | Domain Testing | Đăng ký với Email đã tồn tại                             |
| TC-FR-01-007    | Domain Testing | Đăng ký với Mật khẩu rỗng                                |
| TC-FR-01-008    | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự)               |
| TC-FR-01-009    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa                       |
| TC-FR-01-010    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường                    |
| TC-FR-01-011    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số                        |
| TC-FR-01-012    | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt               |
| TC-FR-01-013    | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp                 |
| TC-FR-01-014    | BVA            | Mật khẩu đúng 8 ký tự (ON — min)                         |
| TC-FR-01-015    | BVA            | Mật khẩu 7 ký tự (OFF⁻ — min-1)                         |
| TC-FR-01-016    | BVA            | Mật khẩu 9 ký tự (OFF⁺ — min+1)                         |

---

### AI Gap Analysis

AI đưa dư biên độ dài tối đa cho password, trong khi đề bài chỉ có ràng buộc tối thiểu.

Giải thích: AI tự suy diễn ra ràng buộc max độ dài cho password hoặc AI cẩn thận thái quá muốn kiểm tra thêm các trường hợp hợp lệ.

---