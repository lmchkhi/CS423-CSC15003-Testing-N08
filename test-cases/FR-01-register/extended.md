# FR-01 Register - Test case mở rộng do sinh viên bổ sung

**Người bổ sung:** Hà Bảo Ngọc - 23127300  
**Ngày:** 2026-08-20  
**Cơ sở:** Kết quả audit và các edge case AI bỏ sót

---

## Danh sách case bổ sung

| ID | Mô tả | Vì sao AI bỏ sót | Dữ liệu / Hành động | Kết quả mong đợi / Oracle | Bug liên quan |
|---|---|---|---|---|---|
| TC-EX-001 | Email trùng được chấp nhận (không có unique constraint) | AI giả định hành vi RDBMS phổ biến là email có unique constraint. SUT thực tế không enforce tính duy nhất. | Đăng ký `Alice / alice@hw06.test / Password123!`, sau đó đăng ký `Bob / alice@hw06.test / Password123!`. | Theo spec phải trả 400/409; hành vi quan sát được là 200 và chèn dòng thứ hai. | BUG-FR01-001 |
| TC-EX-002 | Body rỗng được chấp nhận | AI chưa nhấn mạnh case `{}` dù spec yêu cầu đủ name/email/password. | Gửi `POST /api/register` với body `{}`. | Phải trả 400 Bad Request; nếu SUT trả 200 thì đây là lỗi validation nghiêm trọng. | BUG-FR01-002 nếu tái hiện |
| TC-EX-003 | Lộ plaintext password qua `/api/users/me` | AI tập trung vào register endpoint và bỏ sót endpoint sau đăng nhập. | Đăng ký Charlie, login lấy JWT, gọi `GET /api/users/me`. | Response user không được chứa `password`. | BUG-FR01-003 |
| TC-EX-004 | Mật khẩu yếu được chấp nhận | AI chưa tách rõ case mật khẩu cực yếu như `123`. | Đăng ký David với password `123`. | Phải trả 400 Bad Request; nếu 200 thì thiếu enforce password complexity. | BUG-FR01-002 nếu tái hiện |
| TC-EX-005 | Email chỉ gồm khoảng trắng được chấp nhận | AI có kiểm tra leading/trailing space nhưng thiếu pure whitespace. | Đăng ký Eve với email gồm bốn khoảng trắng. | Phải trả 400 Bad Request; nếu 200 thì thiếu validate email format/trim. | BUG-FR01-002 nếu tái hiện |

---

## Tóm tắt

Tổng cộng **5** case bổ sung, tập trung vào uniqueness, missing required fields, password exposure, password complexity và email whitespace. Các case này được dùng để tăng độ bao phủ bảo mật/validation cho FR-01.
