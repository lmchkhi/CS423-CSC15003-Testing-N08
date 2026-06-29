# Báo cáo kiểm thử HW02 EShop

## FR-12 - Decision Table Testing

### Giải thích áp dụng kỹ thuật

FR-12 được kiểm thử bằng Decision Table Testing vì requirement có nhiều điều kiện nghiệp vụ ảnh hưởng trực tiếp đến kết quả truy cập: bề mặt kiểm thử có thuộc phân hệ Admin hay không, request có token JWT hay không, token có hợp lệ hay không, và token có `role = 'admin'` hay không. Các điều kiện được lấy từ `SystemRequirementsSpecification.md` và `api_specification.md`; test case được thiết kế theo black-box, không dựa vào source code, schema hoặc controller nội bộ.

Feature đang làm: FR-12: Kiểm soát truy cập (Access Control).

### Giả định

| ID | Giả định |
| --- | --- |
| A1 | SRS/API không quy định mã HTTP cụ thể cho lỗi xác thực/phân quyền, nên expected result mô tả hành vi quan sát được: request bị từ chối, có thông báo lỗi phù hợp, và dữ liệu không thay đổi. |
| A2 | Token user/admin được lấy bằng API đăng nhập công khai với tài khoản mặc định trong SRS. |
| A3 | Với test xóa/cập nhật, tester nên dùng bản ghi test riêng nếu có nguy cơ ảnh hưởng dữ liệu mẫu. |
| A4 | FR-12 nêu nhóm API ghi dữ liệu `/api/coupons`, trong khi API specification công khai có endpoint tạo/xóa coupon dưới `/api/admin/coupons`; khi execute cần ghi rõ endpoint thực tế đã dùng. |

### Full Decision Table

| Conditions / Rules | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Truy cập phân hệ Web Admin | Y | - | - | - | - | - | - | - | - | - |
| Endpoint thuộc `/api/admin/*` | - | Y | Y | Y | Y | N | N | N | N | N |
| Endpoint là API ghi dữ liệu products/categories/coupons | - | - | - | - | - | Y | Y | Y | Y | N |
| Có token JWT | Y | N | Y | Y | Y | N | Y | Y | Y | N |
| Token JWT hợp lệ | Y | - | N | Y | Y | - | N | Y | Y | - |
| Token có `role = 'admin'` | N | - | - | N | Y | - | - | N | Y | - |
| Cho phép truy cập/thao tác |  |  |  |  | X |  |  |  | X | X |
| Từ chối do thiếu token |  | X |  |  |  | X |  |  |  |  |
| Từ chối do token không hợp lệ |  |  | X |  |  |  | X |  |  |  |
| Từ chối do không có role admin | X |  |  | X |  |  |  | X |  |  |
| Không thay đổi dữ liệu khi bị từ chối | X | X | X | X |  | X | X | X |  | X |

### Reduced Decision Table

| Conditions / Rules | RR1 | RR2 | RR3 | RR4 | RR5 | RR6 |
| --- | --- | --- | --- | --- | --- | --- |
| Surface nằm trong phạm vi FR-12 | Y | Y | Y | Y | Y | N |
| Có token JWT | N | Y | Y | Y | Y | - |
| Token JWT hợp lệ | - | N | Y | Y | Y | - |
| Token có `role = 'admin'` | - | - | N | Y | N | - |
| Surface là Web Admin UI | N | N | Y | N | N | N |
| Surface là API ghi dữ liệu/Admin API | Y | Y | N | Y | Y | N |
| Expected result chính | Từ chối thiếu token | Từ chối token không hợp lệ | Từ chối không có role admin | Cho phép | Từ chối không có role admin | Không bắt buộc admin theo FR-12 |

### Lý do rút gọn

| Phần rút gọn | Lý do |
| --- | --- |
| Gộp các API `/api/admin/*` vào cùng nhóm | Tất cả API Admin đều có cùng rule FR-12: bắt buộc JWT hợp lệ và role admin. |
| Gộp các API ghi dữ liệu products/categories/coupons vào cùng nhóm | FR-12 quy định chung cho `POST/PUT/DELETE` của các resource này; kết quả access-control phụ thuộc token và role trước khi xét logic riêng của từng CRUD. |
| Không gộp Web Admin UI với API thành công | Web Admin UI là surface riêng cần test user thường bị chặn ở phân hệ Admin. |
| Giữ rule endpoint public/read riêng | FR-12 không nên làm các API đọc công khai bị bắt buộc role admin. |

### Kết quả execute test case Decision Table

| Rule | Test case | Kết quả | Bug liên quan | Ghi chú |
| --- | --- | --- | --- | --- |
| R1 | `TC-FR12-DT-001` | Passed | None | User thường không vào được Web Admin theo kết quả tester đã chạy trước đó. |
| R2 | `TC-FR12-DT-002` | Passed | None | `/api/admin/users` thiếu token trả `401 Unauthorized`. |
| R3 | `TC-FR12-DT-003` | Passed | None | `/api/admin/orders` với token sai trả `403 Forbidden`. |
| R4 | `TC-FR12-DT-004` | Failed | `BUG-FR12-001` | User thường xóa được user qua `/api/admin/users/:id`. |
| R5 | `TC-FR12-DT-005` | Passed | None | Admin truy cập được `/api/admin/orders`. |
| R6 | `TC-FR12-DT-006` | Failed | `BUG-FR12-002` | `POST /api/products` không token vẫn tạo sản phẩm. |
| R7 | `TC-FR12-DT-007` | Passed | None | `PUT /api/categories/:id` với token sai bị từ chối. |
| R8 | `TC-FR12-DT-008` | Failed | `BUG-FR12-003` | User thường gọi được endpoint xóa coupon theo API specification. |
| R9 | `TC-FR12-DT-009` | Passed | None | Admin tạo được category hợp lệ. |
| R10 | `TC-FR12-DT-010` | Passed | None | `GET /api/products` không token vẫn đọc được danh sách sản phẩm. |

### Rà soát rủi ro sau khi rút gọn

| Vùng rủi ro | Lý do | Cần Pairwise? |
| --- | --- | --- |
| API ghi dữ liệu products/categories/coupons | Decision table đã gộp nhiều resource và method `POST/PUT/DELETE`; nếu implementation bảo vệ thiếu một method/resource thì rule đại diện có thể không phát hiện. | Yes |
| API `/api/admin/*` | Đây là vùng bảo mật quan trọng. Decision table đã test đủ các trạng thái token/role chính; không dùng pairwise để thay thế coverage bảo mật cốt lõi. | No |
| Public read API | FR-12 chỉ yêu cầu không bắt admin cho endpoint ngoài phạm vi; không có nhiều factor cần pairwise. | No |

### Pairwise Expansion

Pairwise Testing chỉ áp dụng cho vùng API ghi dữ liệu products/categories/coupons sau khi decision table đã cover rule chính. Không áp dụng pairwise cho toàn bộ FR-12 vì các rule bảo mật cốt lõi về thiếu token, token không hợp lệ và role user đã được cover trực tiếp bằng decision table.

Các factor:

| Factor | Values |
| --- | --- |
| Resource | Product, Category, Coupon |
| Method | POST, PUT, DELETE |
| Auth state | No token, Valid user token, Valid admin token |

Ma trận pairwise và mapping:

| Pairwise row | Resource | Method | Auth state | Covered by |
| --- | --- | --- | --- | --- |
| P1 | Product | POST | No token | `TC-FR12-DT-006` |
| P2 | Product | PUT | Valid user token | `TC-FR12-PW-001` |
| P3 | Product | DELETE | Valid admin token | `TC-FR12-PW-002` |
| P4 | Category | POST | Valid user token | `TC-FR12-PW-003` |
| P5 | Category | PUT | Valid admin token | `TC-FR12-PW-007` |
| P6 | Category | DELETE | No token | `TC-FR12-PW-004` |
| P7 | Coupon | POST | Valid admin token | `TC-FR12-PW-005` |
| P8 | Coupon | PUT | No token | `TC-FR12-PW-006` |
| P9 | Coupon | DELETE | Valid user token | `TC-FR12-DT-008` |

Pairwise bổ sung các test case `TC-FR12-PW-001` đến `TC-FR12-PW-007`; các row đã được decision table cover thì không tạo lại. Trạng thái invalid token vẫn được cover riêng trong decision table vì đây là rule xác thực cốt lõi, không đưa vào ma trận pairwise bổ sung.

### Kết quả execute test case Pairwise

| Pairwise TC | Kết quả | Bug liên quan | Ghi chú |
| --- | --- | --- | --- |
| `TC-FR12-PW-001` | Failed | `BUG-FR12-004` | User thường cập nhật được product bằng `PUT /api/products/:id`. |
| `TC-FR12-PW-002` | Passed | None | Admin xóa được product tạm bằng `DELETE /api/products/:id`. |
| `TC-FR12-PW-003` | Failed | `BUG-FR12-005` | User thường tạo được category bằng `POST /api/categories`. |
| `TC-FR12-PW-004` | Passed | None | `DELETE /api/categories/:id` không token bị từ chối `401 Unauthorized`. |
| `TC-FR12-PW-005` | Passed | None | Admin tạo được coupon bằng `POST /api/admin/coupons`. |
| `TC-FR12-PW-006` | Blocked | None | `PUT /api/coupons/:id` không tồn tại trong SUT, trả `404 Not Found`, nên không đánh giá được access-control cho route này. |
| `TC-FR12-PW-007` | Passed | None | Admin cập nhật được category bằng `PUT /api/categories/:id`. |
