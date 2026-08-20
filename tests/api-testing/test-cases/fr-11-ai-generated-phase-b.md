# FR-11 — Ca kiểm thử do AI sinh ở Phase B

## Kiểm soát phạm vi

- Pool: **B**.
- Tính năng duy nhất: **FR-11 — Xem lịch sử đơn hàng**.
- Endpoint duy nhất:
  - `GET /api/orders/my-orders`
  - `GET /api/orders/:id`
- Nguồn gốc của toàn bộ ca: `AI-SINH`.
- Student ID: `23127464`.
- Khi được chuyển thành request ở phase sau, mọi ca phải có `X-Student-Id: 23127464`, kể cả ca âm về `Authorization`.
- Không có request body hoặc query parameter nào được tài liệu công bố cho hai endpoint. Query bất thường dưới đây chỉ dùng để kiểm tra liệu dữ liệu không được công bố có thể ghi đè identity scope hay không.
- Không có ca nào được thực thi hoặc chuyển thành Postman test.
- Cột **Oracle AI** chỉ đánh dấu mức độ có căn cứ của expected result, không phải kết luận audit. Cột **Đánh giá con người** phải được con người điền bằng `VALID`, `INVALID` hoặc `INCOMPLETE` ở Phase C.

## Quy ước nguồn

- `API-4`: `src/eshop-sut/api_specification.md` §4 — yêu cầu `Authorization: Bearer <token>` và công bố hai endpoint.
- `FR-11`: `src/eshop-sut/README.md` FR-11 — người dùng chỉ xem được đơn hàng của chính mình; giao diện hiển thị mã đơn, ngày đặt, tổng tiền và trạng thái hiện tại.
- `FR-02`: `src/eshop-sut/README.md` FR-02 — JWT được gửi cùng yêu cầu có xác thực.
- `SEC-02`: API được bảo vệ phải yêu cầu JWT hợp lệ.
- `SEC-05`: truy vấn cơ sở dữ liệu phải tham số hóa.
- `Assignment`: yêu cầu HW06 bắt buộc mọi HTTP request mang `X-Student-Id: <StudentID>`.
- `PA-GAP`: khoảng trống đặc tả đã ghi tại `reports/api-testing/fr-11-phase-a-contract.md`.

## A. `GET /api/orders/my-orders` — 35 ca

Điều kiện chung: dùng fixture có mapping chủ sở hữu ổn định. `User A` có ít nhất hai đơn, `User B` có ít nhất một đơn, `User C` không có đơn. Trừ khi ca nói khác, gửi JWT hợp lệ trong `Authorization: Bearer <token>`.

| ID | Phân vùng / mục tiêu | Dữ liệu và bước chính | Kết quả mong đợi có nguồn | Nguồn | Oracle AI | Đánh giá con người | Tự động hóa |
|---|---|---|---|---|---|---|---|
| FR11-MYO-001 | Người dùng không có đơn | Gọi bằng token User C khi User A/B có đơn | Không làm lộ đơn của User A/B; cách biểu diễn danh sách rỗng chưa được định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: empty response | PENDING | NOT CREATED |
| FR11-MYO-002 | Người dùng có đúng một đơn | Chuẩn bị User B có một đơn rồi gọi bằng token User B | Chỉ dữ liệu đơn thuộc User B được trả; status/schema chính xác chưa xác định | FR-11, PA-GAP | PARTIAL — ownership có nguồn | PENDING | NOT CREATED |
| FR11-MYO-003 | Người dùng có nhiều đơn | Gọi bằng token User A có ít nhất hai đơn | Chỉ các đơn thuộc User A được trả; ordering/pagination chưa xác định | FR-11, PA-GAP | PARTIAL — ownership có nguồn | PENDING | NOT CREATED |
| FR11-MYO-004 | CSDL có đơn của nhiều owner | Đồng thời tồn tại đơn A1, A2, B1; gọi bằng token User A | Không có B1 trong dữ liệu được trả | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-005 | Đổi identity tuần tự A → B | Gọi token A, sau đó token B mà không đổi fixture | Mỗi kết quả chỉ thuộc identity tương ứng; kết quả B không chứa dữ liệu A | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-006 | Đổi identity tuần tự B → A | Gọi token B, sau đó token A mà không đổi fixture | Mỗi kết quả chỉ thuộc identity tương ứng; kết quả A không bị scope/cache của B | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-007 | Hai identity gọi đồng thời | Gửi đồng thời request bằng token A và B | Mỗi response chỉ chứa đơn của owner tương ứng | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-008 | Đối chiếu tập ID sở hữu | So sánh mọi order ID trả về cho User A với mapping fixture A | Không ID nào nằm ngoài tập owned-order của User A | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-009 | Không bỏ sót owned order | Fixture A có tập ID xác định; gọi bằng token A | Dữ liệu hỗ trợ xem lịch sử owned orders; exact completeness/list schema chưa được tài liệu khóa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: list contract | PENDING | NOT CREATED |
| FR11-MYO-010 | Mã đơn trong lịch sử | Gọi bằng token A với fixture có mã đơn biết trước | Response phải hỗ trợ hiển thị mã đơn; tên/kiểu trường API chưa được định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: field mapping | PENDING | NOT CREATED |
| FR11-MYO-011 | Ngày đặt trong lịch sử | Gọi bằng token A với ngày đặt biết trước | Response phải hỗ trợ hiển thị ngày đặt; tên trường, kiểu và format chưa xác định | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: field/format | PENDING | NOT CREATED |
| FR11-MYO-012 | Tổng tiền trong lịch sử | Gọi bằng token A với tổng tiền biết trước | Response phải hỗ trợ hiển thị tổng tiền đúng của owned order; tên/kiểu trường chưa xác định | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: field/type | PENDING | NOT CREATED |
| FR11-MYO-013 | Trạng thái hiện tại trong lịch sử | Gọi bằng token A với trạng thái fixture biết trước | Response phải hỗ trợ hiển thị trạng thái hiện tại; tên/kiểu trường chưa xác định | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: field/type | PENDING | NOT CREATED |
| FR11-MYO-014 | Query `user_id` cố ghi đè scope | Token A, thêm `?user_id=<UserB>` | Không được làm lộ đơn User B; xử lý query không công bố chưa xác định | FR-11, PA-GAP | PARTIAL — non-disclosure có nguồn | PENDING | NOT CREATED |
| FR11-MYO-015 | Query `user_id` lặp | Token A, thêm hai giá trị `user_id` trỏ A và B | Không được làm lộ đơn User B; exact handling chưa xác định | FR-11, PA-GAP | PARTIAL — non-disclosure có nguồn | PENDING | NOT CREATED |
| FR11-MYO-016 | Query `id` của foreign order | Token A, thêm `?id=<B1>` | Không được dùng query không công bố để trả B1 | FR-11 | CÓ NGUỒN về ownership | PENDING | NOT CREATED |
| FR11-MYO-017 | Injection qua query không công bố | Token A, `?user_id=<SQL-injection-payload>` | Không làm lộ đơn ngoài scope; status/body chưa xác định | FR-11, SEC-05, PA-GAP | PARTIAL — security/ownership có nguồn | PENDING | NOT CREATED |
| FR11-MYO-018 | Thiếu `Authorization` | Không gửi header `Authorization` | Không trả dữ liệu lịch sử; exact status/error body chưa xác định | API-4, FR-02, SEC-02, PA-GAP | INCOMPLETE / SPEC GAP: status/body | PENDING | NOT CREATED |
| FR11-MYO-019 | `Authorization` rỗng | Gửi header với giá trị rỗng | Không trả dữ liệu lịch sử; exact status/error body chưa xác định | API-4, SEC-02, PA-GAP | INCOMPLETE / SPEC GAP: status/body | PENDING | NOT CREATED |
| FR11-MYO-020 | `Bearer` không có token | Gửi `Authorization: Bearer` | Không trả dữ liệu lịch sử; exact parsing/status/body chưa xác định | API-4, SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-021 | Token chuỗi ngẫu nhiên | Gửi `Authorization: Bearer not-a-jwt` | JWT không hợp lệ không được truy cập dữ liệu; exact status/body chưa xác định | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP: status/body | PENDING | NOT CREATED |
| FR11-MYO-022 | JWT thiếu hai segment | Gửi token chỉ có một segment | Không trả dữ liệu lịch sử; exact status/body chưa xác định | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-023 | JWT thiếu một segment | Gửi token có hai segment | Không trả dữ liệu lịch sử; exact status/body chưa xác định | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-024 | JWT có Base64URL sai | Gửi token ba segment nhưng payload mã hóa sai | Không trả dữ liệu lịch sử; exact status/body chưa xác định | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-025 | Sửa claim identity không ký lại | Sửa `id` trong payload của token A thành User B | Token không hợp lệ không được truy cập hoặc làm lộ dữ liệu B | SEC-02, FR-11 | CÓ NGUỒN về valid-JWT/ownership; status chưa có | PENDING | NOT CREATED |
| FR11-MYO-026 | Chữ ký JWT bị sửa | Thay đổi signature của token hợp lệ | Token không hợp lệ không được truy cập dữ liệu | SEC-02 | CÓ NGUỒN; status/body chưa có | PENDING | NOT CREATED |
| FR11-MYO-027 | JWT hết hạn | Dùng token hết hạn có kiểm soát | Token không còn hợp lệ không được truy cập dữ liệu; exact status/body chưa xác định | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP: expiry response | PENDING | NOT CREATED |
| FR11-MYO-028 | Sai authentication scheme | Gửi `Authorization: Basic <value>` | Không đáp ứng contract Bearer/JWT và không được trả lịch sử | API-4, SEC-02 | CÓ NGUỒN; status/body chưa có | PENDING | NOT CREATED |
| FR11-MYO-029 | JWT được ký hợp lệ nhưng thiếu claim identity | Dùng token kiểm soát có chữ ký hợp lệ nhưng không có claim định danh user | Không được làm lộ lịch sử của bất kỳ user nào; required-claim behavior chưa được đặc tả | SEC-02, FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-030 | Token hợp lệ của owner khác | Gửi token User B dù client vừa giữ dữ liệu User A | Server phải scope theo identity trong token B, không theo state phía client | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-MYO-031 | Token admin trên endpoint user-scoped | Gọi bằng JWT admin hợp lệ | Hành vi admin trên endpoint này không được FR-11 định nghĩa | PA-GAP | INCOMPLETE / SPEC GAP: role behavior | PENDING | NOT CREATED |
| FR11-MYO-032 | JWT hợp lệ về chữ ký nhưng user không còn tồn tại | Dùng token kiểm soát có `id` không tồn tại trong users | Hành vi identity mồ côi chưa được đặc tả; tuyệt đối không làm lộ đơn user khác | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-033 | Hai header `Authorization` | Gửi hai giá trị Authorization khác identity | Cách parse/reject chưa được đặc tả; không được làm lộ dữ liệu chéo owner | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-MYO-034 | Header mã sinh viên đúng | Gửi request hợp lệ với `X-Student-Id: 23127464` | Request tuân thủ yêu cầu bài; SUT behavior riêng cho header này không được định nghĩa | Assignment, PA-GAP | INCOMPLETE / SPEC GAP: SUT oracle | PENDING | NOT CREATED |
| FR11-MYO-035 | Hợp đồng media type/schema | Gọi hợp lệ rồi đánh giá Content-Type, envelope và schema | Không được khẳng định status/header/exact schema vì tài liệu không định nghĩa; chỉ kiểm tra semantic FR-11 sau khi human review bổ sung oracle | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |

## B. `GET /api/orders/:id` — 35 ca

Điều kiện chung: `A1`, `A2` thuộc User A; `B1` thuộc User B; có một ID đúng định dạng nhưng không tồn tại. Trừ khi ca nói khác, dùng JWT hợp lệ và ID fixture ổn định.

| ID | Phân vùng / mục tiêu | Dữ liệu và bước chính | Kết quả mong đợi có nguồn | Nguồn | Oracle AI | Đánh giá con người | Tự động hóa |
|---|---|---|---|---|---|---|---|
| FR11-DET-001 | ID hợp lệ, owned order | Token A, gọi `/:id` với A1 | Được phép xem A1; success status và exact schema chưa xác định | FR-11, PA-GAP | PARTIAL — quyền xem có nguồn | PENDING | NOT CREATED |
| FR11-DET-002 | Owned order thứ hai | Token A, gọi với A2 | Được phép xem A2 và không trả nhầm A1; status/schema chưa xác định | FR-11, PA-GAP | PARTIAL | PENDING | NOT CREATED |
| FR11-DET-003 | Identity B xem owned order | Token B, gọi với B1 | Được phép xem B1; không trả dữ liệu A | FR-11, PA-GAP | PARTIAL | PENDING | NOT CREATED |
| FR11-DET-004 | Mã đơn trong detail | Token A, gọi A1 có mã đơn biết trước | Response phải hỗ trợ xem đúng mã đơn; tên/kiểu trường chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: field mapping | PENDING | NOT CREATED |
| FR11-DET-005 | Ngày đặt trong detail | Token A, gọi A1 có ngày đặt biết trước | Response phải hỗ trợ xem đúng ngày đặt; format/field chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-006 | Tổng tiền trong detail | Token A, gọi A1 có tổng tiền biết trước | Response phải hỗ trợ xem đúng tổng tiền; field/type chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-007 | Trạng thái hiện tại trong detail | Token A, gọi A1 có trạng thái biết trước | Response phải hỗ trợ xem đúng trạng thái hiện tại; field/type chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-008 | Hai owned ID phải phân biệt | Token A, lần lượt gọi A1 và A2 | Mỗi request chỉ trả dữ liệu của ID được chọn, không tráo đơn | FR-11 | CÓ NGUỒN về đối tượng/ownership | PENDING | NOT CREATED |
| FR11-DET-009 | Foreign-owned order A→B | Token A, gọi B1 | Không được làm lộ dữ liệu B1; exact rejection status/body chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: rejection oracle | PENDING | NOT CREATED |
| FR11-DET-010 | Foreign-owned order B→A | Token B, gọi A1 | Không được làm lộ dữ liệu A1; exact rejection status/body chưa định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: rejection oracle | PENDING | NOT CREATED |
| FR11-DET-011 | Đổi token trên cùng ID | Gọi A1 bằng token A rồi token B | Token A được phép theo ownership; token B không được thấy A1 | FR-11 | CÓ NGUỒN về ownership; status chưa có | PENDING | NOT CREATED |
| FR11-DET-012 | Hai owner gọi đồng thời | Token A gọi A1 và token B gọi B1 đồng thời | Mỗi response chỉ chứa đơn tương ứng với token và ID | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-DET-013 | Foreign ID gần owned ID | Chọn A1 và B1 có ID số liền kề; token A gọi B1 | Khả năng đoán ID không được vượt ownership; không lộ B1 | FR-11 | CÓ NGUỒN | PENDING | NOT CREATED |
| FR11-DET-014 | Khả năng phân biệt foreign và nonexistent ID | Token A gọi B1 rồi gọi nonexistent ID, chỉ trong fixture kiểm soát | Foreign order không được lộ; tài liệu chưa quy định hai phản hồi có phải không thể phân biệt hay không | FR-11, PA-GAP | INCOMPLETE / SPEC GAP: anti-enumeration oracle | PENDING | NOT CREATED |
| FR11-DET-015 | ID đúng định dạng nhưng không tồn tại | Token A, gọi nonexistent ID | Không có order để trả; exact status/body và phân biệt với foreign order chưa định nghĩa | PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-016 | ID bằng `0` | Token A, gọi `/0` | Grammar/range và validation chưa định nghĩa; không được trả nhầm/lộ order | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-017 | ID số âm | Token A, gọi `/-1` | Grammar/range và validation chưa định nghĩa; không được trả nhầm/lộ order | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-018 | ID chữ cái | Token A, gọi `/abc` | Kiểu/validation chưa định nghĩa; không được trả nhầm/lộ order | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-019 | ID số thập phân | Token A, gọi `/1.5` | Kiểu/coercion chưa định nghĩa; không được trả nhầm order khác | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-020 | ID có số 0 ở đầu | Token A, gọi ID owned ở dạng `000<id>` | Quy tắc canonical/coercion chưa định nghĩa; exact behavior cần human review | PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-021 | ID có dấu cộng | Token A, gọi `/%2B1` | Grammar/coercion chưa định nghĩa; không được trả nhầm/lộ order | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-022 | ID có khoảng trắng mã hóa | Token A, gọi `/%20<id>%20` | Quy tắc trim/coercion chưa định nghĩa; không được trả nhầm/lộ order | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-023 | ID số nguyên rất lớn | Token A, gọi giá trị vượt xa ID fixture | Range/overflow handling chưa định nghĩa; không được trả dữ liệu không liên quan | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-024 | ID dạng số khoa học | Token A, gọi `/1e3` | Grammar/coercion chưa định nghĩa; không được trả nhầm order `1000` | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-025 | SQL injection trong `:id` | Token A, gọi path với payload SQL được URL-encode | Không được bypass lookup/ownership hoặc làm lộ order; exact status/body chưa định nghĩa | FR-11, SEC-05, PA-GAP | PARTIAL — security có nguồn | PENDING | NOT CREATED |
| FR11-DET-026 | Thiếu authentication với owned ID | Không gửi Authorization, gọi A1 | Không được trả dữ liệu A1; exact status/body chưa định nghĩa | API-4, SEC-02, FR-11, PA-GAP | INCOMPLETE / SPEC GAP: status/body | PENDING | NOT CREATED |
| FR11-DET-027 | Thiếu authentication với foreign ID | Không gửi Authorization, gọi B1 | Không được trả dữ liệu B1; exact status/body chưa định nghĩa | API-4, SEC-02, FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-028 | Authorization rỗng | Header Authorization rỗng, gọi A1 | Không được trả dữ liệu order; exact status/body chưa định nghĩa | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-029 | Bearer không có token | `Authorization: Bearer`, gọi A1 | Không được trả dữ liệu order; parsing/status/body chưa định nghĩa | API-4, SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-030 | Token ngẫu nhiên không hợp lệ | `Bearer not-a-jwt`, gọi A1 | Không được trả dữ liệu order; exact status/body chưa định nghĩa | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-031 | Token sửa identity không ký lại | Sửa claim token A thành User B rồi gọi B1 | JWT không hợp lệ không được bypass xác thực/ownership | SEC-02, FR-11 | CÓ NGUỒN; status/body chưa có | PENDING | NOT CREATED |
| FR11-DET-032 | JWT hết hạn | Token hết hạn có kiểm soát, gọi A1 | Token không còn hợp lệ không được truy cập A1; exact status/body chưa có | SEC-02, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |
| FR11-DET-033 | Sai authentication scheme | `Authorization: Basic <value>`, gọi A1 | Không đáp ứng Bearer/JWT contract và không được trả order | API-4, SEC-02 | CÓ NGUỒN; status/body chưa có | PENDING | NOT CREATED |
| FR11-DET-034 | Admin token trên user-scoped detail | JWT admin hợp lệ, gọi order của User A | FR-11 không định nghĩa quyền admin trên endpoint user-scoped này | PA-GAP | INCOMPLETE / SPEC GAP: role/ownership | PENDING | NOT CREATED |
| FR11-DET-035 | Hợp đồng media type/schema detail | Gọi A1 hợp lệ rồi đánh giá Content-Type, envelope, trường và kiểu | Không khẳng định status/header/exact schema trước human review vì tài liệu không định nghĩa | FR-11, PA-GAP | INCOMPLETE / SPEC GAP | PENDING | NOT CREATED |

## Truy vết và kiểm soát Phase B

| Endpoint | Số ca AI sinh | Nhóm phủ chính |
|---|---:|---|
| `GET /api/orders/my-orders` | 35 | JWT, ownership isolation, user có 0/1/nhiều order, query cố ghi đè scope, các trường semantic FR-11, spec gap schema |
| `GET /api/orders/:id` | 35 | owned/foreign/nonexistent ID, malformed ID, JWT, IDOR, SEC-05, các trường semantic FR-11, spec gap schema |
| **Tổng** | **70** | Chỉ FR-11 |

- Không áp dụng state-transition testing: hai endpoint FR-11 chỉ đọc và FR-11 không định nghĩa chuyển trạng thái.
- Không ép SEC-01, SEC-03, SEC-04, SEC-06 hoặc SEC-07 vì không có quan hệ trực tiếp đủ căn cứ trong hợp đồng API FR-11.
- Không gán success/failure status code, error body hoặc exact schema chưa có nguồn.
- Không có test case do con người bổ sung trong Phase B.
- Không có nhãn audit `VALID/INVALID/INCOMPLETE` do con người cấp; toàn bộ đang chờ Phase C.

## Trạng thái

PHASE B: COMPLETE  
HUMAN REVIEW: PENDING  
NEXT ALLOWED PHASE: C — HUMAN AUDIT AND EXTENSION  
EXECUTION: NOT EXECUTED
