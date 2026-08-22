# FR-01 Register - Test case do AI sinh

**API endpoint:** `POST /api/register`  
**Base URL:** `http://localhost:3000`  
**Tham chiếu đặc tả:** Mục 1.1 (`api-specification.md`)  
**MSSV:** 23127300  
**Kỹ thuật:** Phân vùng miền `name`/`email`/`password`, schema validation, bảo mật (SEC), trạng thái tài khoản

---

## Ma trận test case

| ID | Nhóm kiểm thử | Dữ liệu (`name` / `email` / `password`) | Tiền điều kiện | Kết quả mong đợi (theo spec) | Oracle |
|---|---|---|---|---|---|
| TC-FR01-001 | Đăng ký hợp lệ | "Nguyen Van A" / "valid@hw06.test" / "Password123!" | Tài khoản mới | 200 OK; `{message:"User registered successfully", id:<int>}` | Mã phản hồi 200; khớp schema |
| TC-FR01-002 | Tên rỗng | "" / "email@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; lỗi validation | Mã phản hồi 400 |
| TC-FR01-003 | Thiếu trường tên | (omitted) / "email@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; lỗi validation | Mã phản hồi 400 |
| TC-FR01-004 | Tên chỉ gồm khoảng trắng | "   " / "email@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; từ chối khoảng trắng | Mã phản hồi 400 |
| TC-FR01-005 | Tên quá dài | "A" * 300 / "email@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; giới hạn độ dài | Mã phản hồi 400 |
| TC-FR01-006 | Tên có Unicode | "Nguyễn Văn Á" / "email@hw06.test" / "Password123!" | Tài khoản mới | 200 OK (nếu hỗ trợ) hoặc 400 | Chấp nhận hoặc từ chối Unicode một cách nhất quán |
| TC-FR01-007 | Tên chỉ gồm chữ số | "12345" / "email@hw06.test" / "Password123!" | Tài khoản mới | 200 OK (nếu cho phép chuỗi số) hoặc 400 | Chấp nhận hoặc từ chối theo spec |
| TC-FR01-008 | Tên có ký tự đặc biệt | "John@O'Brien#" / "email@hw06.test" / "Password123!" | Tài khoản mới | 200 OK hoặc 400 | Chấp nhận hoặc từ chối ký tự đặc biệt |
| TC-FR01-009 | Email hợp lệ | "Test User" / "valid.email@domain.com" / "Password123!" | Tài khoản mới | 200 OK | Mã phản hồi 200 |
| TC-FR01-010 | Email rỗng | "Test User" / "" / "Password123!" | Tài khoản mới | 400 Bad Request; validation | Mã phản hồi 400 |
| TC-FR01-011 | Thiếu trường email | "Test User" / (omitted) / "Password123!" | Tài khoản mới | 400 Bad Request; validation | Mã phản hồi 400 |
| TC-FR01-012 | Email thiếu ký tự @ | "Test User" / "invalidemail.com" / "Password123!" | Tài khoản mới | 400 Bad Request; định dạng email | Mã phản hồi 400 |
| TC-FR01-013 | Email thiếu domain | "Test User" / "user@" / "Password123!" | Tài khoản mới | 400 Bad Request; email thiếu thành phần | Mã phản hồi 400 |
| TC-FR01-014 | Email thiếu TLD | "Test User" / "user@domain" / "Password123!" | Tài khoản mới | 400 Bad Request hoặc 200 (tùy validation) | Kiểm tra độ nghiêm ngặt của định dạng email |
| TC-FR01-015 | Email có khoảng trắng đầu chuỗi | "Test User" / " user@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; khoảng trắng | Mã phản hồi 400 |
| TC-FR01-016 | Email có khoảng trắng cuối chuỗi | "Test User" / "user@hw06.test " / "Password123!" | Tài khoản mới | 400 Bad Request hoặc được trim | Kiểm tra hành vi trim |
| TC-FR01-017 | Email chứa SQL meta OR | "Test User" / "a' OR '1'='1" / "Password123!" | Tài khoản mới | 400 Bad Request; chống SQL injection | Mã phản hồi 400; không bị injection |
| TC-FR01-018 | Email chứa SQL meta UNION | "Test User" / "a' UNION SELECT" / "Password123!" | Tài khoản mới | 400 Bad Request; chống SQL injection | Mã phản hồi 400; không bị injection |
| TC-FR01-019 | Email chứa XSS script tag | "Test User" / "<script>alert('xss')</script>" / "Password123!" | Tài khoản mới | 400 Bad Request; chống XSS | Mã phản hồi 400; không có XSS |
| TC-FR01-020 | Email chứa XSS event | "Test User" / "test@hw06.test' onclick='alert(1)'" / "Password123!" | Tài khoản mới | 400 Bad Request; chống XSS | Mã phản hồi 400 |
| TC-FR01-021 | Email dài 320 ký tự | "Test User" / "a" * 300 + "@test.com" / "Password123!" | Tài khoản mới | 400 Bad Request; giới hạn độ dài | Mã phản hồi 400 |
| TC-FR01-022 | Email trùng theo đặc tả | "User A" / "dup@hw06.test" / "Password123!" | Tài khoản với email `dup@hw06.test` đã tồn tại | Theo spec: phải từ chối với 400 hoặc 409 | Kiểm tra enforce tính duy nhất |
| TC-FR01-023 | Mật khẩu hợp lệ | "Test User" / "email@hw06.test" / "Password123!" | Tài khoản mới | 200 OK | Mã phản hồi 200 |
| TC-FR01-024 | Mật khẩu rỗng | "Test User" / "email@hw06.test" / "" | Tài khoản mới | 400 Bad Request; validation | Mã phản hồi 400 |
| TC-FR01-025 | Thiếu trường mật khẩu | "Test User" / "email@hw06.test" / (omitted) | Tài khoản mới | 400 Bad Request; validation | Mã phản hồi 400 |
| TC-FR01-026 | Mật khẩu quá ngắn (3 ký tự) | "Test User" / "email@hw06.test" / "abc" | Tài khoản mới | 400 Bad Request; độ dài tối thiểu 8 | Mã phản hồi 400 |
| TC-FR01-027 | Mật khẩu quá ngắn (7 ký tự) | "Test User" / "email@hw06.test" / "Pass12!" | Tài khoản mới | 400 Bad Request; độ dài tối thiểu 8 | Mã phản hồi 400 |
| TC-FR01-028 | Mật khẩu thiếu chữ hoa | "Test User" / "email@hw06.test" / "password123!" | Tài khoản mới | 400 Bad Request; độ phức tạp | Mã phản hồi 400 hoặc 200 (kiểm tra theo spec) |
| TC-FR01-029 | Mật khẩu thiếu chữ số | "Test User" / "email@hw06.test" / "Password!" | Tài khoản mới | 400 Bad Request; độ phức tạp | Mã phản hồi 400 hoặc 200 |
| TC-FR01-030 | Mật khẩu thiếu ký tự đặc biệt | "Test User" / "email@hw06.test" / "Password123" | Tài khoản mới | 400 Bad Request; độ phức tạp | Mã phản hồi 400 hoặc 200 |
| TC-FR01-031 | Mật khẩu chỉ gồm khoảng trắng | "Test User" / "email@hw06.test" / "        " | Tài khoản mới | 400 Bad Request; khoảng trắng | Mã phản hồi 400 |
| TC-FR01-032 | Mật khẩu quá dài (500 ký tự) | "Test User" / "email@hw06.test" / "Pass" * 125 | Tài khoản mới | 400 Bad Request; giới hạn độ dài | Mã phản hồi 400 |
| TC-FR01-033 | Schema - Body rỗng | (body JSON rỗng `{}`) | Tài khoản mới | 400 Bad Request; thiếu field | Mã phản hồi 400 |
| TC-FR01-034 | Schema - Có field thừa | "Test" / "email@hw06.test" / "Password123!" + {"extra":"field"} | Tài khoản mới | 200 OK (bỏ qua field thừa) hoặc 400 | Kiểm tra schema nghiêm ngặt |
| TC-FR01-035 | Trạng thái - Tài khoản mới | "Alice" / "alice@hw06.test" / "Password123!" | Chưa có tài khoản trước đó | 200 OK; id được sinh | Mã phản hồi 200; id là số nguyên |
| TC-FR01-036 | Trạng thái - Email trùng (bug đã biết) | "Bob" / "bob@hw06.test" / "Password123!" | `bob@hw06.test` đã tồn tại | **Phải từ chối (400)** nhưng **SUT chèn dòng thứ hai và trả 200** | Mã phản hồi **200** (BUG) |
| TC-FR01-037 | Bảo mật - Lộ mật khẩu plaintext | "Charlie" / "charlie@hw06.test" / "SecurePass123!" | Sau khi đăng ký qua /login | Password không được xuất hiện trong `/api/users/me` | Kiểm tra response `/api/users/me` |
| TC-FR01-038 | Bảo mật - Đăng ký hàng loạt | Cùng email base, biến thể +1/+2, gửi nhanh 100 lần | Không có auth/rate limit | 200 OK nhưng tạo tải lớn lên server | Quan sát hệ thống có áp dụng rate-limit không |
| TC-FR01-039 | Bảo mật - SQL injection trong name | "'; DROP TABLE users; --" / "email@hw06.test" / "Password123!" | Tài khoản mới | 400 Bad Request; không bị injection | Xác minh bảng vẫn tồn tại sau test |
| TC-FR01-040 | Bảo mật - SQL injection trong password | "Test User" / "email@hw06.test" / "Pass' OR '1'='1" | Tài khoản mới | 400 Bad Request hoặc 200 (parameterized) | Kiểm tra dữ liệu được lưu an toàn |

---

## Ghi chú

- **Spec §1.1 Success:** schema chính xác `{message:"User registered successfully", id:<int>}` khi HTTP 200.
- **Email trùng:** SUT không có unique constraint, có thể chèn dòng thứ hai và trả 200; đây là bug so với kỳ vọng tính duy nhất của email.
- **Lộ plaintext password:** kiểm tra chuỗi đăng ký → login → `/api/users/me` để bảo đảm password không xuất hiện trong response.
- **Rate limit:** spec không nhắc rõ; test dùng để quan sát hành vi khi đăng ký nhanh nhiều lần.
- **SQL injection:** truy vấn phải dùng parameterized query, không được thực thi payload.
- **XSS:** trường email/name phải validate hoặc sanitize phù hợp.

---

## Quy trình sinh test bằng AI

1. Phân vùng trường `name`: hợp lệ, rỗng, thiếu field, quá dài, Unicode, chỉ khoảng trắng, chỉ số, ký tự đặc biệt.
2. Phân vùng trường `email`: hợp lệ, rỗng/thiếu, sai định dạng, khoảng trắng, trùng, SQL injection, XSS, quá dài.
3. Phân vùng trường `password`: hợp lệ, rỗng/thiếu, quá ngắn, thiếu chữ hoa/chữ số/ký tự đặc biệt, chỉ khoảng trắng, quá dài.
4. Bổ sung schema, trạng thái tài khoản và các kiểm thử bảo mật.
5. Gán ID `TC-FR01-001` đến `TC-FR01-040` để audit và encode sang Postman data file.
