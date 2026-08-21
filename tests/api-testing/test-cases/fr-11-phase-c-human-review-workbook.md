# FR-11 — Worksheet kiểm toán con người Phase C

## Nguyên tắc sử dụng

- Bản AI gốc được giữ nguyên tại `tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md`.
- SHA-256 bản AI gốc: `ABB5FE9F7D6148C1F1743AC8500001B7FF7401CBA454695383120414895E4667`.
- Cột **Đề xuất AI** chỉ là hỗ trợ review, không phải quyết định của con người.
- Người review phải điền độc lập cột **Kết luận con người** bằng đúng một nhãn `VALID`, `INVALID` hoặc `INCOMPLETE`, kèm lý do và chỉnh sửa cuối cùng.
- Không dùng một câu “approved” chung để thay thế audit từng ca.
- Chưa tạo executable tests và chưa thực thi request.

## A. Kiểm toán `GET /api/orders/my-orders`

- **Chi tiết API:** Endpoint `GET /api/orders/my-orders`, Pool `B`, tính năng `FR-11`.

| Mã | Mô tả rút gọn | Danh mục | Đề xuất AI | Lý do/đề xuất chỉnh sửa của AI | Kết luận con người | Lý do của con người | Chỉnh sửa cuối cùng |
|---|---|---|---|---|---|---|---|
| FR11-MYO-001 | User không có đơn | Miền dữ liệu | INCOMPLETE | Giữ assertion không lộ đơn khác; con người phải quyết định empty response/schema | INCOMPLETE | Thiếu oracle: Giữ assertion không lộ đơn khác; con người phải quyết định empty response/schema | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-002 | User có một đơn | Miền dữ liệu | INCOMPLETE | Ownership có nguồn nhưng cần field mapping để đối chiếu đúng một đơn | INCOMPLETE | Thiếu oracle: Ownership có nguồn nhưng cần field mapping để đối chiếu đúng một đơn | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-003 | User có nhiều đơn | Miền dữ liệu | INCOMPLETE | Ownership có nguồn; cần khóa list schema/completeness, không tự thêm ordering | INCOMPLETE | Thiếu oracle: Ownership có nguồn; cần khóa list schema/completeness, không tự thêm ordering | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-004 | Nhiều owner trong CSDL | Ownership | VALID | Semantic non-disclosure có nguồn và fixture thực thi được; không thêm status/schema | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-005 | Đổi identity A→B | Ownership | VALID | Kiểm tra isolation theo token, có nguồn FR-11 | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-006 | Đổi identity B→A | Ownership | VALID | Hướng đổi ngược phát hiện leakage/cache chéo identity | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-007 | Hai identity đồng thời | Ownership | VALID | Mỗi response vẫn phải scope đúng owner | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-008 | Đối chiếu tập owned ID | Ownership | VALID | Truy vết trực tiếp tới quy tắc chỉ xem đơn của mình | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-009 | Không bỏ sót owned order | Miền dữ liệu | INCOMPLETE | FR-11 chưa khóa completeness, pagination hoặc envelope | INCOMPLETE | Thiếu oracle: FR-11 chưa khóa completeness, pagination hoặc envelope | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-010 | Mã đơn | Lược đồ | INCOMPLETE | Cần human-approved field name/type hoặc semantic extraction rule | INCOMPLETE | Thiếu oracle: Cần human-approved field name/type hoặc semantic extraction rule | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-011 | Ngày đặt | Lược đồ | INCOMPLETE | Cần field name/type/format được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field name/type/format được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-012 | Tổng tiền | Lược đồ | INCOMPLETE | Cần field name/type/format được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field name/type/format được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-013 | Trạng thái hiện tại | Lược đồ | INCOMPLETE | Cần field name/type và representation được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field name/type và representation được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-014 | Query `user_id` ghi đè | Bảo mật | VALID | Extra query không được vượt identity scope; chỉ assert non-disclosure | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-015 | Query `user_id` lặp | Bảo mật | VALID | Kiểm tra parameter pollution không làm lộ foreign order | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-016 | Query `id` foreign | Bảo mật | VALID | Query không công bố không được bypass ownership | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-017 | SQL injection qua query | Bảo mật | VALID | Truy vết FR-11/SEC-05; không assert status/body | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-018 | Thiếu Authorization | Xác thực | VALID | Valid JWT là bắt buộc; chỉ assert không trả order data | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-019 | Authorization rỗng | Xác thực | VALID | Không đáp ứng valid-JWT contract; không assert exact error | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-020 | Bearer thiếu token | Xác thực | VALID | Không có JWT hợp lệ; không assert exact parser/status | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-021 | Token ngẫu nhiên | Xác thực | VALID | Invalid token không được trả order data | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-022 | JWT một segment | Xác thực | VALID | Invalid token partition khác chuỗi ngẫu nhiên | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-023 | JWT hai segment | Xác thực | VALID | Invalid token partition về cấu trúc | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-024 | JWT Base64URL sai | Xác thực | VALID | Invalid encoding partition; không assert error body | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-025 | Sửa identity claim | Xác thực/IDOR | VALID | Token bị sửa không còn hợp lệ và không được đổi owner scope | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-026 | Sửa signature | Xác thực | VALID | Chữ ký sai không đáp ứng SEC-02 | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-027 | JWT hết hạn | Xác thực | VALID | Token hết hạn không còn là JWT hợp lệ; không assert status/body | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-028 | Basic scheme | Xác thực | VALID | Không đáp ứng Bearer/JWT contract | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-029 | JWT thiếu identity claim | Xác thực | INCOMPLETE | Contract không định nghĩa required claims; giữ non-disclosure, cần oracle identity failure | INCOMPLETE | Thiếu oracle: Contract không định nghĩa required claims; giữ non-disclosure, cần oracle identity failure | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-030 | Token owner khác sau client state | Ownership | VALID | Server phải scope theo token, không theo state client | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-MYO-031 | Admin token | Phân quyền | INCOMPLETE | FR-11 không định nghĩa admin dùng endpoint user-scoped như thế nào | INCOMPLETE | Thiếu oracle: FR-11 không định nghĩa admin dùng endpoint user-scoped như thế nào | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-032 | Identity mồ côi | Xác thực/phân quyền | INCOMPLETE | Chưa có contract cho user bị xóa nhưng token còn chữ ký hợp lệ | INCOMPLETE | Thiếu oracle: Chưa có contract cho user bị xóa nhưng token còn chữ ký hợp lệ | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-033 | Hai Authorization header | Giao thức/xác thực | INCOMPLETE | HTTP stack có thể normalize khác nhau; cần khóa cách gửi và oracle | INCOMPLETE | Thiếu oracle: HTTP stack có thể normalize khác nhau; cần khóa cách gửi và oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-MYO-034 | X-Student-Id đúng | Tuân thủ harness | INVALID | Không phải test behavior FR-11 độc lập; chuyển thành precondition chung của mọi request | INVALID | Không phải test behavior FR-11; đây là precondition chung bắt buộc cho mọi request. | Loại ca độc lập; chuyển `X-Student-Id: 23127464` thành precondition chung. |
| FR11-MYO-035 | Media type/exact schema | Lược đồ | INCOMPLETE | Không có source cho Content-Type/envelope/exact schema | INCOMPLETE | Thiếu oracle: Không có source cho Content-Type/envelope/exact schema | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |

### Thống kê audit con người

- Tổng số đã đánh giá: 35/35.
- `VALID`: 21.
- `INVALID`: 1.
- `INCOMPLETE`: 13.

## B. Kiểm toán `GET /api/orders/:id`

- **Chi tiết API:** Endpoint `GET /api/orders/:id`, Pool `B`, tính năng `FR-11`.

| Mã | Mô tả rút gọn | Danh mục | Đề xuất AI | Lý do/đề xuất chỉnh sửa của AI | Kết luận con người | Lý do của con người | Chỉnh sửa cuối cùng |
|---|---|---|---|---|---|---|---|
| FR11-DET-001 | Owned ID A1 | Miền/ownership | INCOMPLETE | Quyền xem có nguồn; cần success oracle/field mapping để thực thi chính xác | INCOMPLETE | Thiếu oracle: Quyền xem có nguồn; cần success oracle/field mapping để thực thi chính xác | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-002 | Owned ID A2 | Miền/ownership | INCOMPLETE | Như DET-001; giữ kiểm tra không trả nhầm A1 | INCOMPLETE | Thiếu oracle: Như DET-001; giữ kiểm tra không trả nhầm A1 | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-003 | User B xem B1 | Miền/ownership | INCOMPLETE | Quyền xem có nguồn; response oracle chưa đủ | INCOMPLETE | Thiếu oracle: Quyền xem có nguồn; response oracle chưa đủ | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-004 | Mã đơn detail | Lược đồ | INCOMPLETE | Cần human-approved field mapping | INCOMPLETE | Thiếu oracle: Cần human-approved field mapping | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-005 | Ngày đặt detail | Lược đồ | INCOMPLETE | Cần field/type/format được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field/type/format được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-006 | Tổng tiền detail | Lược đồ | INCOMPLETE | Cần field/type/format được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field/type/format được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-007 | Trạng thái detail | Lược đồ | INCOMPLETE | Cần field/type/representation được phê duyệt | INCOMPLETE | Thiếu oracle: Cần field/type/representation được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-008 | Phân biệt A1/A2 | Miền/ownership | VALID | ID được chọn phải ánh xạ đúng owned order, có fixture kiểm soát | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-009 | Foreign A→B | IDOR | INCOMPLETE | Non-disclosure có nguồn nhưng rejection status/body chưa được khóa | INCOMPLETE | Thiếu oracle: Non-disclosure có nguồn nhưng rejection status/body chưa được khóa | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-010 | Foreign B→A | IDOR | INCOMPLETE | Hướng đối xứng; cần rejection oracle được phê duyệt | INCOMPLETE | Thiếu oracle: Hướng đối xứng; cần rejection oracle được phê duyệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-011 | Đổi token trên cùng ID | Ownership | VALID | So sánh owned và foreign trên cùng object, assert non-disclosure | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-012 | Hai owner đồng thời | Ownership | VALID | Mỗi response phải ràng buộc đồng thời token và ID | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-013 | Foreign ID liền kề | IDOR | INVALID | Trùng mục tiêu DET-009; tính liền kề không tạo requirement mới | INVALID | Trùng mục tiêu ownership/IDOR của `FR11-DET-009`; ID liền kề không tạo requirement mới. | Loại ca; giữ `FR11-DET-009`. |
| FR11-DET-014 | Foreign vs nonexistent | Bảo mật/schema lỗi | INCOMPLETE | Tài liệu không yêu cầu hai response không thể phân biệt | INCOMPLETE | Thiếu oracle: Tài liệu không yêu cầu hai response không thể phân biệt | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-015 | Nonexistent ID | Miền ID | INCOMPLETE | Chưa có status/body cho không tồn tại | INCOMPLETE | Thiếu oracle: Chưa có status/body cho không tồn tại | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-016 | ID `0` | Miền ID | INCOMPLETE | Chưa có ID grammar/range/validation oracle | INCOMPLETE | Thiếu oracle: Chưa có ID grammar/range/validation oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-017 | ID âm | Miền ID | INCOMPLETE | Chưa có ID grammar/range/validation oracle | INCOMPLETE | Thiếu oracle: Chưa có ID grammar/range/validation oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-018 | ID chữ | Miền ID | INCOMPLETE | Chưa có ID type/validation oracle | INCOMPLETE | Thiếu oracle: Chưa có ID type/validation oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-019 | ID thập phân | Miền ID | INCOMPLETE | Chưa có coercion/validation oracle | INCOMPLETE | Thiếu oracle: Chưa có coercion/validation oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-020 | ID có zero đầu | Miền ID | INCOMPLETE | Chưa có canonicalization/coercion rule | INCOMPLETE | Thiếu oracle: Chưa có canonicalization/coercion rule | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-021 | ID có dấu cộng | Miền ID | INCOMPLETE | Chưa có grammar/coercion rule | INCOMPLETE | Thiếu oracle: Chưa có grammar/coercion rule | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-022 | ID có khoảng trắng | Miền ID | INCOMPLETE | Chưa có trim/coercion rule | INCOMPLETE | Thiếu oracle: Chưa có trim/coercion rule | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-023 | ID rất lớn | Miền ID | INCOMPLETE | Chưa có range/overflow oracle | INCOMPLETE | Thiếu oracle: Chưa có range/overflow oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-024 | ID số khoa học | Miền ID | INCOMPLETE | Chưa có grammar/coercion oracle | INCOMPLETE | Thiếu oracle: Chưa có grammar/coercion oracle | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-025 | SQL injection trong ID | Bảo mật | VALID | SEC-05 và ownership cho phép assert không bypass/không lộ order | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-026 | Thiếu auth với owned ID | Xác thực | VALID | Valid JWT bắt buộc; assert không trả order data, không đặt status | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-027 | Thiếu auth với foreign ID | Xác thực/IDOR | VALID | Không auth không được làm lộ dữ liệu dù ID thuộc ai | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-028 | Authorization rỗng | Xác thực | VALID | Không có JWT hợp lệ; assert non-disclosure | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-029 | Bearer thiếu token | Xác thực | VALID | Không có JWT hợp lệ; không đặt exact error | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-030 | Token ngẫu nhiên | Xác thực | VALID | Invalid JWT không được trả order | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-031 | Token sửa identity | Xác thực/IDOR | VALID | Token bị sửa không được bypass signature/ownership | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-032 | JWT hết hạn | Xác thực | VALID | Không còn valid JWT; không đặt exact status/body | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-033 | Basic scheme | Xác thực | VALID | Không đáp ứng Bearer/JWT contract | VALID | Đầu vào, bước và semantic expected có căn cứ trực tiếp từ FR-11/SEC-02/API specification; ca thực thi được mà không cần tự đặt exact status, error body hoặc schema. | N/A |
| FR11-DET-034 | Admin token | Phân quyền/ownership | INCOMPLETE | Không có contract cho admin trên endpoint user-scoped | INCOMPLETE | Thiếu oracle: Không có contract cho admin trên endpoint user-scoped | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |
| FR11-DET-035 | Media type/exact schema | Lược đồ | INCOMPLETE | Không có source cho Content-Type/envelope/exact schema | INCOMPLETE | Thiếu oracle: Không có source cho Content-Type/envelope/exact schema | Bổ sung oracle được phê duyệt cho phần còn thiếu nêu trên trước khi tự động hóa. |

### Thống kê audit con người

- Tổng số đã đánh giá: 35/35.
- `VALID`: 12.
- `INVALID`: 1.
- `INCOMPLETE`: 22.

## C. Ca kiểm thử do con người bổ sung

Mười ca dưới đây do người dùng trực tiếp cung cấp ngày 2026-08-20 và được ghi nguồn gốc `CON-NGUOI-BO-SUNG`. Việc một ca được lưu không đồng nghĩa ca đó đã có oracle đầy đủ hoặc chắc chắn được tính là phần bao phủ AI bỏ sót; các điểm cần giải quyết được ghi ở mục C.3.

### `GET /api/orders/my-orders` — cần ít nhất 5 ca do con người tự bổ sung

| Slot | Mã do người review đặt | Mục tiêu / kết quả mong đợi | Nguồn yêu cầu | Lý do AI bỏ sót | Xác nhận do con người tạo |
|---|---|---|---|---|---|
| 1 | `FR11-MYO-H01` | Gửi `POST /api/orders/my-orders` với JWT hợp lệ; server phải reject và không trả order | API specification §4 chỉ công bố `GET` | AI không test method mismatch | YES — user cung cấp 2026-08-20 |
| 2 | `FR11-MYO-H02` | User A tạo order mới qua bước checkout rồi gọi ngay `GET /api/orders/my-orders`; order mới phải xuất hiện với trạng thái `pending` | FR-08, FR-10, FR-11 | AI dùng fixture tĩnh, không test flow checkout → lịch sử | YES — user cung cấp 2026-08-20 |
| 3 | `FR11-MYO-H03` | Gọi `GET /api/orders/my-orders` khi DB gặp sự cố; server trả lỗi 5xx, không crash và không lộ dữ liệu | Phase A spec gap về lỗi kho dữ liệu; `server.js:315` không handle `err` | AI không test error-handling path | YES — user cung cấp 2026-08-20 |
| 4 | `FR11-MYO-H04` | Gửi `HEAD /api/orders/my-orders` với JWT hợp lệ; không có message body chứa order data; các header nên tương đương GET, trừ payload header có thể bị lược bỏ | RFC 7231 §4.3.2 | AI không test HTTP `HEAD` | YES — user cung cấp 2026-08-20 |
| 5 | `FR11-MYO-H05` | Gọi `GET /api/orders/my-orders` với `Accept: text/xml` hoặc `Accept: application/xml`; server trả JSON hoặc `406 Not Acceptable`, không trả order data dưới format không mong đợi | API chỉ công bố JSON response | AI không test content negotiation | YES — user thay thế 2026-08-20 |

### `GET /api/orders/:id` — cần ít nhất 5 ca do con người tự bổ sung

| Slot | Mã do người review đặt | Mục tiêu / kết quả mong đợi | Nguồn yêu cầu | Lý do AI bỏ sót | Xác nhận do con người tạo |
|---|---|---|---|---|---|
| 1 | `FR11-DET-H01` | Gửi `DELETE /api/orders/:id` với JWT hợp lệ và owned ID; server phải reject và order không bị xóa | API specification chỉ công bố `GET` cho path detail | AI không test method mismatch | YES — user cung cấp 2026-08-20 |
| 2 | `FR11-DET-H02` | Gửi `PUT /api/orders/:id` với JWT hợp lệ, owned ID và body `{"status":"delivered"}`; server phải reject và order không bị thay đổi | FR-10 chỉ cho admin chuyển trạng thái; API specification chỉ công bố `GET` cho endpoint detail | AI không test method mismatch `PUT` trên endpoint detail | YES — user thay thế 2026-08-20 |
| 3 | `FR11-DET-H03` | Sau khi User A hủy A1, gọi `GET /api/orders/A1`; order vẫn xem được và trạng thái hiện tại là `canceled` | FR-10, FR-11 | AI không test dữ liệu lịch sử sau chuyển đổi trạng thái | YES — user cung cấp 2026-08-20 |
| 4 | `FR11-DET-H04` | Gửi `GET /api/orders/..%2Fadmin%2Forders` với JWT user hợp lệ; không được truy cập admin route hoặc trả toàn bộ orders | FR-11, FR-12, SEC-03 | AI có SQL injection nhưng bỏ qua path traversal | YES — user cung cấp 2026-08-20 |
| 5 | `FR11-DET-H05` | Gọi cùng owned order A1 hai lần liên tiếp bằng cùng token; tác động dự kiến trên server phải như một lần gọi và dữ liệu order có ý nghĩa tương đương, không yêu cầu response byte-for-byte giống nhau | RFC 7231 §4.2.2, FR-11 | AI không test idempotency cùng user | YES — user cung cấp 2026-08-20 |

### C.3. Kiểm tra khả năng được tính và oracle trước Phase D

| Mã | Kết quả tiếp nhận | Vấn đề cần con người giải quyết |
|---|---|---|
| `FR11-MYO-H01` | ACCEPTED — HUMAN ORIGIN | “Reject” có semantic hợp lý nhưng exact status/body chưa có nguồn; chỉ được tự động hóa sau khi khóa oracle hoặc chỉ assert không trả order data |
| `FR11-MYO-H02` | ACCEPTED — HUMAN ORIGIN | Là flow setup chéo FR; chỉ phân tích hai endpoint FR-11 làm subject under test. Exact field/schema để nhận biết order mới vẫn cần duyệt |
| `FR11-MYO-H03` | ACCEPTED — HUMAN ORIGIN / INCOMPLETE ORACLE | Phase A spec gap và source thiếu `err` handler không phải nguồn cho expected `5xx`; cần human-approved error contract hoặc giữ `INCOMPLETE` |
| `FR11-MYO-H04` | ACCEPTED — HUMAN ORIGIN / CORRECTED | RFC yêu cầu HEAD không có message body; header chỉ ở mức `SHOULD` giống GET và payload header `MAY` bị lược bỏ. Nội dung đã chỉnh theo RFC chính thức |
| `FR11-MYO-H05` | ACCEPTED — HUMAN ORIGIN | Content negotiation là coverage mới. `JSON hoặc 406` là oracle do con người cung cấp; API spec FR-11 không định nghĩa chi tiết media-type negotiation hoặc exact status |
| `FR11-DET-H01` | ACCEPTED — HUMAN ORIGIN | Không được xóa order là oracle semantic; exact rejection status/body chưa được API spec định nghĩa |
| `FR11-DET-H02` | ACCEPTED — HUMAN ORIGIN | Method mismatch `PUT` là coverage mới; chỉ assert reject và order không đổi, không tự đặt exact rejection status/body |
| `FR11-DET-H03` | ACCEPTED — HUMAN ORIGIN | Hợp lệ như dependency trực tiếp để kiểm tra current status; setup transition không biến endpoint ngoài FR-11 thành subject under test |
| `FR11-DET-H04` | ACCEPTED — HUMAN ORIGIN | Chỉ assert không route-escalate/không lộ toàn bộ orders; exact routing status/body chưa có nguồn |
| `FR11-DET-H05` | ACCEPTED — HUMAN ORIGIN / CORRECTED | RFC định nghĩa idempotency theo intended effect trên server, không yêu cầu hai response giống byte-for-byte. Nội dung đã chỉnh theo RFC chính thức |

Nguồn RFC chính thức: `https://www.rfc-editor.org/rfc/rfc7231.html#section-4.3.2` và `https://www.rfc-editor.org/rfc/rfc7231.html#section-4.2.2`.

## D. Gate Phase C

- [x] Con người đã gắn nhãn cho 35/35 ca `MYO`.
- [x] Con người đã gắn nhãn cho 35/35 ca `DET`.
- [x] Mọi ca `INVALID/INCOMPLETE` có lý do và chỉnh sửa cuối cùng.
- [x] Con người đã bổ sung 5 ca khác biệt cho mỗi endpoint.
- [x] Mỗi ca human-origin đã cung cấp nguồn và lý do AI bỏ sót.
- [x] Bản cuối đã được con người phê duyệt để chuyển sang executable tests (`approved, continue` — 2026-08-21).

## Trạng thái

PHASE C: COMPLETE
AI PRE-AUDIT: COMPLETE
HUMAN CASE-BY-CASE AUDIT: COMPLETE
HUMAN-ADDED CASES: 10 COMPLETE
HUMAN FINAL APPROVAL FOR PHASE D: APPROVED — 2026-08-21
EXECUTION: NOT EXECUTED

## Phụ lục Phase C2 — Hiệu chỉnh của con người

Các nhãn phía trên được giữ nguyên làm lịch sử audit. Toàn bộ 35 ca AI từng là `INCOMPLETE`, 2 ca AI từng là `INVALID` và `FR11-MYO-H03` đã được sửa thành các ca cuối cùng có thể thực thi. Collection cuối chứa đủ 80/80 ca duy nhất, không loại ca nào. Quyết định và evidence được trình bày tại `reports/api-testing/human-correction-rerun.md`.

SỐ CA CUỐI ĐÃ HIỆU CHỈNH: 80/80 CÓ THỂ THỰC THI
LẦN CHẠY LẠI CUỐI: 80 CA ĐÃ THỰC THI — 60 ĐẠT, 20 KHÔNG ĐẠT
