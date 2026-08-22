# FR-14 Category CRUD - Test case do AI sinh

**API endpoint:** `GET/POST/PUT/DELETE /api/categories`  
**Base URL:** `http://localhost:3000`  
**Tham chiếu đặc tả:** FR-14, SEC-02, SEC-03, SEC-05  
**MSSV:** 23127300  
**Kỹ thuật:** Phân vùng miền `name`, CRUD lifecycle, auth/access control, schema và security

---

## Ma trận test case

| ID | Nhóm kiểm thử | Dữ liệu | Tiền điều kiện | Kết quả mong đợi (theo spec) | Oracle |
|---|---|---|---|---|---|
| TC-FR14-001 | POST tên hợp lệ | `{"name":"Điện thoại"}` | Admin token | 200, `{message, id}` | Theo spec §3.4 |
| TC-FR14-002 | POST tên hợp lệ | `{"name":"Laptop"}` | Admin token | 200, `{message, id}` | Theo spec §3.4 |
| TC-FR14-003 | POST tên rỗng | `{"name":""}` | Admin token | 400, lỗi validation | Ràng buộc input |
| TC-FR14-004 | POST thiếu tên | `{}` | Admin token | 400, missing field | Ràng buộc input |
| TC-FR14-005 | POST tên chỉ gồm khoảng trắng | `{"name":"   "}` | Admin token | 400, invalid format | Ràng buộc input |
| TC-FR14-006 | POST tên quá dài | `{"name":"A" * 256}` | Admin token | 400 or truncated | Length limit |
| TC-FR14-007 | POST tên Unicode | `{"name":"Đồng hồ thông minh"}` | Admin token | 200, `{message, id}` | Hỗ trợ Unicode |
| TC-FR14-008 | POST tên có ký tự đặc biệt | `{"name":"Phụ kiện & Linh kiện"}` | Admin token | 200, `{message, id}` | Ký tự đặc biệt |
| TC-FR14-009 | POST tên dạng số | `{"name":"12345"}` | Admin token | 200, `{message, id}` | Cho phép chuỗi số |
| TC-FR14-010 | POST tên trùng | `{"name":"Điện thoại"}` | Exists, admin token | 400 or accepts | Tính duy nhất |
| TC-FR14-011 | POST tên chứa SQL meta | `{"name":"'; DROP TABLE categories;--"}` | Admin token | 200, escaped | SQL injection |
| TC-FR14-012 | POST tên chứa XSS | `{"name":"<script>alert('xss')</script>"}` | Admin token | 200, escaped | XSS |
| TC-FR14-013 | POST tên chứa null byte | `{"name":"Test\u0000"}` | Admin token | 400 or sanitized | Null byte |
| TC-FR14-014 | POST không có token | `{"name":"Test"}` | Không có Authorization header | 401 Unauthorized | Yêu cầu xác thực |
| TC-FR14-015 | POST token không hợp lệ | `{"name":"Test"}` | `Bearer invalid.token` | 403 Forbidden | Kiểm tra token |
| TC-FR14-016 | POST bằng user token | `{"name":"Test"}` | Valid user (non-admin) token | 403 Forbidden | Yêu cầu role admin |
| TC-FR14-017 | POST bằng admin token | `{"name":"Valid"}` | Admin token hợp lệ | 200, `{message, id}` | Quyền admin |
| TC-FR14-018 | POST có field thừa | `{"name":"Test","extra":"field"}` | Admin token | 200, extra ignored | Robustness |
| TC-FR14-019 | POST sai kiểu dữ liệu | `{"name":123}` | Admin token | 400, type error | Type validation |
| TC-FR14-020 | GET danh sách tất cả | N/A | DB có category | 200, array object | Theo spec §3.4 |
| TC-FR14-021 | GET danh sách rỗng | N/A | DB rỗng | 200, `[]` | Tập rỗng |
| TC-FR14-022 | GET không cần xác thực | N/A | Không có token | 200, public endpoint | Public read |
| TC-FR14-023 | PUT đổi tên hợp lệ | `{"name":"New Name"}` | Id hợp lệ, admin token | 200, `{message}` | Theo spec §3.4 |
| TC-FR14-024 | PUT tên rỗng | `{"name":""}` | Id hợp lệ, admin token | 400, validation | Ràng buộc input |
| TC-FR14-025 | PUT thiếu tên | `{}` | Id hợp lệ, admin token | 400, missing field | Ràng buộc input |
| TC-FR14-026 | PUT id không tồn tại | `{"name":"Test"}` | id=999999, admin token | 404 Not Found | Kiểm tra resource |
| TC-FR14-027 | PUT không có token | `{"name":"Test"}` | Id hợp lệ, no token | 401 Unauthorized | Yêu cầu xác thực |
| TC-FR14-028 | PUT bằng user token | `{"name":"Test"}` | Id hợp lệ, user token | 403 Forbidden | Yêu cầu role admin |
| TC-FR14-029 | PUT tên chứa SQL injection | `{"name":"' OR '1'='1"}` | Id hợp lệ, admin token | 200, escaped | SQL injection |
| TC-FR14-030 | DELETE id hợp lệ | N/A | Id hợp lệ, admin token | 200, `{message}` | Theo spec §3.4 |
| TC-FR14-031 | DELETE id không tồn tại | N/A | id=999999, admin token | 404 Not Found | Kiểm tra resource |
| TC-FR14-032 | DELETE không có token | N/A | Id hợp lệ, no token | 401 Unauthorized | Yêu cầu xác thực |
| TC-FR14-033 | DELETE bằng user token | N/A | Id hợp lệ, user token | 403 Forbidden | Yêu cầu role admin |
| TC-FR14-034 | Lifecycle tạo-đọc-cập nhật-xóa | Chuỗi thao tác đầy đủ | Admin token | All 200, state reflects | Luồng trạng thái |
| TC-FR14-035 | GET sau khi tạo | POST rồi GET | Admin token cho POST | GET list có category mới | Tính nhất quán |
| TC-FR14-036 | GET sau khi cập nhật | PUT rồi GET | Admin token | GET phản ánh tên đã cập nhật | Tính nhất quán |
| TC-FR14-037 | GET sau khi xóa | DELETE rồi GET | Admin token | GET list không còn category đã xóa | Tính nhất quán |
| TC-FR14-038 | POST biên độ dài 255 | `{"name":"A" * 255}` | Admin token | 200 or 400 | Biên độ dài |
| TC-FR14-039 | POST tên có khoảng trắng đầu chuỗi | `{"name":" Leading"}` | Admin token | 200 or trimmed | Xử lý khoảng trắng |
| TC-FR14-040 | POST tên có khoảng trắng cuối chuỗi | `{"name":"Trailing "}` | Admin token | 200 or trimmed | Xử lý khoảng trắng |

---

## Ghi chú

- **Endpoint:** GET list category public; POST/PUT/DELETE là thao tác thay đổi dữ liệu và phải được kiểm soát xác thực/quyền.
- **Tên category:** bắt buộc, không được rỗng; cần kiểm tra khoảng trắng, độ dài, Unicode, ký tự đặc biệt, duplicate, SQL/XSS.
- **Access control:** các thao tác CUD cần token hợp lệ và role admin theo yêu cầu bảo mật.
- **Resource validation:** PUT/DELETE id không tồn tại phải có phản hồi lỗi phù hợp, không trả thành công giả.
- **Lifecycle:** create→read→update→read→delete→read dùng để kiểm tra tính nhất quán dữ liệu.

---

## Quy trình sinh test bằng AI

1. Tóm tắt endpoint GET/POST/PUT/DELETE `/api/categories`.
2. Sinh phân vùng `name`: hợp lệ, rỗng, thiếu, whitespace, rất dài, Unicode, ký tự đặc biệt, numeric, duplicate, SQL/XSS, null byte, boundary 255.
3. Sinh nhóm auth/access control: không token, token sai, user token, admin token.
4. Sinh nhóm PUT/DELETE với id hợp lệ và id không tồn tại.
5. Sinh lifecycle/consistency cases và gán ID `TC-FR14-001` đến `TC-FR14-040`.
