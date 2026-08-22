# Ma trận coverage — POST /api/login

| Thành phần | Valid | Invalid / missing / null / empty | Type / boundary | Interaction / security | Oracle |
|---|---|---|---|---|---|
| Path | `/api/login` | Không có path parameter | N/A | Query thừa không được đổi kết quả | API specification 1.2 |
| Header | `Content-Type: application/json`, `X-Student-Id: 23127062` | `text/plain` | N/A | Bearer thừa/invalid không được bypass credentials | API specification; artifact contract |
| `email` | user/admin đã đăng ký | unknown, missing, null, empty, whitespace | number, boolean, object, uppercase, trim, oversized | SQLi, NoSQL-style, XSS, CRLF; không user enumeration | FR-02, SEC-04, SEC-05 |
| `password` | password đúng | sai, missing, null, empty, whitespace | number, boolean, object, trailing whitespace | SQLi; không trả plaintext | FR-02, SEC-01, SEC-05 |
| Top-level body | JSON object | omitted, null | array, string | Content-Type confusion | API specification 1.2 |
| Response thành công | 200 JSON object | N/A | `token` là JWT string; `user` là object | Không có `password`; unknown `role` input không nâng quyền | API specification 1.2, SEC-01 |
| Response lỗi | JSON error, không token/user | Credentials sai hoặc input lỗi | Status âm chưa được tài liệu hóa đầy đủ | Thông báo không lộ email có tồn tại | FR-02; các status chưa rõ được đánh dấu `INCOMPLETE` |
| State | unlocked → success | wrong attempt → counter +1 | khóa từ lần sai thứ 3; 30 giây | success trước ngưỡng reset chuỗi; login khi locked bị từ chối | FR-02 |

AI baseline hiện bao phủ transition từ trạng thái chưa xác thực/tài khoản không khóa sang trạng thái đã xác thực bằng JWT tại TC-LOGIN-001. Các transition chuyên sâu về bộ đếm sai, ngưỡng khóa và hết hạn 30 giây không còn nằm trong suite AI hiện tại; đây là khoảng trống để sinh viên tự thiết kế test case Extend.
