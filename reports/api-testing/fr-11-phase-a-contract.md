# FR-11 — Phạm vi và hợp đồng Phase A

## Phạm vi FR-11

- Pool: **B**.
- Tính năng: **FR-11 — Xem lịch sử đơn hàng**.
- Chỉ gồm các endpoint sau:
  - `GET /api/orders/my-orders`
  - `GET /api/orders/:id`
- Base URL được công bố trong đặc tả API: `http://localhost:3000`.
- Mã sinh viên được xác định theo skill của repository: `23127464`.
- Mọi HTTP request trong tương lai phải có `X-Student-Id: 23127464`; Phase A không gửi request nào.
- Việc chọn phạm vi Phase A có căn cứ từ `ai-first-api-testing/references/api-selection-contract.md`, `src/eshop-sut/api_specification.md` §4.4–4.5 và FR-11 trong `src/eshop-sut/README.md`.
- Repository không cung cấp danh sách lựa chọn của các thành viên, nên việc xác nhận lựa chọn Pool B này không trùng với thành viên khác vẫn cần con người kiểm tra.

## Hợp đồng

### Hợp đồng được tài liệu định nghĩa

| Endpoint | Đầu vào được định nghĩa | Điều kiện tiên quyết | Hành vi mong đợi có nguồn | Hợp đồng response được định nghĩa |
|---|---|---|---|---|
| `GET /api/orders/my-orders` | Header `Authorization: Bearer <token>`; tài liệu không định nghĩa đầu vào path, query hoặc body. Khi thực thi, đề bài còn yêu cầu `X-Student-Id: 23127464`. | Có danh tính người dùng với JWT hợp lệ. Lịch sử có thể chứa không có, một hoặc nhiều order thuộc danh tính đó. | Chỉ trả về order thuộc người dùng đã xác thực. FR-11 quy định người dùng chỉ xem được order của chính mình. Yêu cầu giao diện FR-11 nêu các thông tin hiển thị gồm mã đơn, ngày đặt, tổng tiền và trạng thái hiện tại. | **INCOMPLETE / SPEC GAP** — tài liệu không định nghĩa success status, JSON envelope chính xác, tên/kiểu trường, trường bắt buộc/tùy chọn, biểu diễn trạng thái rỗng, phân trang hoặc thứ tự. Các trường giao diện không thiết lập exact API schema. |
| `GET /api/orders/:id` | Header `Authorization: Bearer <token>` và path parameter `id`; tài liệu không định nghĩa query hoặc body. Khi thực thi, đề bài còn yêu cầu `X-Student-Id: 23127464`. | Có danh tính người dùng với JWT hợp lệ và một mã định danh order. Để được phép truy cập, order đó phải thuộc người dùng đã xác thực. | Người dùng đã xác thực chỉ được xem order được chọn khi đó là order của chính mình. Request tới foreign-owned order không được làm lộ order đó. | **INCOMPLETE / SPEC GAP** — tài liệu không định nghĩa success status, rejection status, error body, exact detail schema, định dạng/kiểu mã định danh hoặc cách phân biệt foreign order với nonexistent order. |

### Ba tình huống bắt buộc

1. **Người dùng xem danh sách order của chính mình:** chỉ được phép dưới danh tính người dùng đã xác thực; kết quả phải được giới hạn theo quyền sở hữu của người dùng đó. Cách biểu diễn danh sách rỗng hoặc có nhiều order chưa được định nghĩa.
2. **Người dùng xem chi tiết order của chính mình:** được phép với order được chọn bằng `:id` khi order đó thuộc người dùng đã xác thực. Success status và schema chính xác chưa được định nghĩa.
3. **Người dùng yêu cầu foreign-owned order:** quy tắc ownership của FR-11 yêu cầu không làm lộ dữ liệu. Tài liệu không định nghĩa response phải là “không tìm thấy”, “bị cấm” hay dạng khác, nên oracle chính xác là **INCOMPLETE / SPEC GAP**.

### Quan sát trực tiếp từ implementation chỉ để đối chiếu khoảng trống

Các quan sát này mô tả source code hiện tại; chúng không thay thế hành vi mong đợi đã được tài liệu định nghĩa.

- `src/eshop-sut/backend/server.js:311-319`: `GET /api/orders/my-orders` sử dụng `authenticateToken` và truy vấn tham số hóa có điều kiện `user_id = req.user.id`; các dòng được trả theo `id` giảm dần.
- `src/eshop-sut/backend/server.js:344-349`: `GET /api/orders/:id` hiện không có middleware `authenticateToken` và chỉ truy vấn theo `id`, không có điều kiện ownership.
- Vì vậy, implementation tĩnh hiện tại của route chi tiết mâu thuẫn với hợp đồng JWT/ownership trong tài liệu và tạo ra concern IDOR trực tiếp. Đây chỉ là quan sát source; không tuyên bố kết quả defect runtime.
- `src/eshop-sut/backend/database.js:74-81` định nghĩa các cột implementation hiện tại gồm `id`, `user_id`, `total_amount`, `status`, `shipping_address` và `created_at`. Định nghĩa bảng này không được coi là external response schema đã phê duyệt.

## Xác thực / Phân quyền / Quyền sở hữu

- **Authentication:** đặc tả API đặt cả hai endpoint FR-11 trong phần Giỏ hàng & Đơn hàng có yêu cầu `Authorization: Bearer <token>`. README FR-02 quy định JWT được gửi cùng mọi request cần xác thực; SEC-02 yêu cầu JWT hợp lệ đối với API được bảo vệ.
- **Authentication bị thiếu, không hợp lệ hoặc hết hạn:** hợp đồng có nguồn chỉ xác định rằng JWT hợp lệ là bắt buộc. Status code và body chính xác cho các partition này không được tài liệu định nghĩa và vẫn là **INCOMPLETE / SPEC GAP**.
- **Authorization:** FR-11 là truy cập người dùng giới hạn theo danh tính, không phải thao tác dành cho role admin. Không tài liệu FR-11 nào yêu cầu `role = admin`, và không có role matrix bổ sung được định nghĩa.
- **Ownership:** danh tính trong token đã xác thực phải được ràng buộc với chủ sở hữu order. Danh sách chỉ được chứa order của danh tính đó, và truy cập chi tiết không được làm lộ order của người dùng khác.
- **Đối chiếu implementation:** ownership của danh sách được thực thi trong source; authentication và ownership của chi tiết không có trong source. Sai lệch này phải được giữ lại để con người review và thiết kế Phase B, không được biến thành hợp đồng mong đợi.

## Đầu vào / Phân vùng

Đây là các partition hợp đồng dành cho Phase B; chúng không phải test case.

| Đầu vào/chiều dữ liệu | Partition cho Phase B | Mức độ sẵn có của oracle |
|---|---|---|
| Header `Authorization` | JWT hợp lệ của owner; thiếu header; token sai định dạng/không hợp lệ; token hết hạn nếu có token hết hạn được kiểm soát | Yêu cầu JWT hợp lệ có nguồn. Negative status/body chính xác là **INCOMPLETE / SPEC GAP**. |
| Header `X-Student-Id` | Giá trị chính xác của repository là `23127464` trên mọi request trong tương lai | Bắt buộc theo skill/đề bài, không phải quy tắc response FR-11 của SUT được tài liệu định nghĩa. |
| Order `:id` | ID hợp lệ của owned order đang tồn tại; ID hợp lệ của foreign-owned order đang tồn tại; ID đúng định dạng nhưng không tồn tại; ID sai định dạng/không hợp lệ nếu có ý nghĩa đối với path parser của server | Ownership/không làm lộ dữ liệu có nguồn. Kiểu/grammar ID, validation và negative response chính xác là **INCOMPLETE / SPEC GAP**. |
| Ownership | Owned order; foreign-owned order | Quyền truy cập owned order và yêu cầu không làm lộ foreign order có nguồn từ FR-11. Cách biểu diễn rejection chính xác chưa được định nghĩa. |
| Số lượng phần tử danh sách | Người dùng đã xác thực có nhiều order; người dùng đã xác thực không có order | Cả hai là trạng thái dữ liệu cần thiết. Empty response cùng thứ tự/schema danh sách chính xác chưa được định nghĩa. |
| Tách biệt danh tính | Token User A với order User A; token User A với ID order User B | Cần thiết để đánh giá ownership và direct-object authorization mà không giả định hành vi dựa trên role. |

Ghi chú:

- “Valid order ID” là mã định danh được biết chắc tồn tại trong fixture có kiểm soát; tài liệu không định nghĩa kiểu nguyên thủy hoặc cú pháp của nó.
- “Nonexistent ID” phải đúng định dạng theo ID grammar cuối cùng được phê duyệt nhưng không tồn tại trong fixture.
- Partition “malformed ID” chỉ được giữ nếu Phase B có thể thiết lập ID grammar được chấp nhận. Cho đến lúc đó, validation oracle của partition này là **INCOMPLETE / SPEC GAP**.
- Theo đặc tả API đã công bố, cả hai endpoint trong phạm vi đều không có query parameter hoặc request body.

## Yêu cầu bảo mật áp dụng

- **SEC-02 — JWT hợp lệ cho API được bảo vệ:** áp dụng trực tiếp cho cả hai endpoint theo hợp đồng FR-11 trong tài liệu.
- **Authorization/ownership:** áp dụng trực tiếp vì FR-11 giới hạn người dùng vào order của chính mình.
- **IDOR:** áp dụng trực tiếp cho `GET /api/orders/:id`; mã định danh do caller kiểm soát không được phép vượt qua ownership check. Kiểm tra source tĩnh cho thấy concern cụ thể trên route chi tiết hiện tại, nhưng chưa thực hiện xác minh runtime.
- **SEC-05 — truy vấn cơ sở dữ liệu tham số hóa:** áp dụng trực tiếp cho path identifier và ownership lookup. Các truy vấn FR-11 đã kiểm tra hiện được tham số hóa; không tuyên bố kết luận security runtime.
- Không ánh xạ các SEC khác vì hợp đồng FR-11 hiện có không cho thấy chúng áp dụng trực tiếp.

## Khoảng trống đặc tả

Mọi mục dưới đây đều là **INCOMPLETE / SPEC GAP** trừ khi sau này có nguồn hợp đồng được con người phê duyệt:

- Success status code cho cả hai endpoint.
- Failure status code và error body khi JWT bị thiếu, sai định dạng, không hợp lệ hoặc hết hạn.
- Envelope, trường, kiểu, nullability, trường bắt buộc và chính sách trường bổ sung chính xác cho response danh sách và chi tiết.
- Order detail có chứa line item hoặc trường nào ngoài thông tin hiển thị cấp cao của FR-11 hay không.
- Cách biểu diễn lịch sử rỗng đối với người dùng không có order.
- Thứ tự, phân trang, lọc và quy tắc phá hòa xác định đối với người dùng có nhiều order. `id` giảm dần chỉ là quan sát implementation hiện tại.
- Grammar/kiểu path `id`, miền giá trị cho phép, quy tắc ép kiểu và hành vi validation malformed ID.
- Response chính xác cho order ID đúng định dạng nhưng không tồn tại.
- Response chính xác cho foreign-owned order, bao gồm việc nó có bắt buộc không thể phân biệt với nonexistent order hay không.
- Danh tính admin có được sử dụng các endpoint giới hạn theo user này hay không và sử dụng như thế nào; FR-11 không định nghĩa hành vi admin đặc biệt.
- Xử lý lỗi khi kho dữ liệu gặp sự cố.
- Mâu thuẫn implementation trên `GET /api/orders/:id`: thiếu enforcement authentication và ownership so với hợp đồng trong tài liệu.
- Xác nhận ở cấp nhóm rằng tính năng Pool B được chọn không trùng với lựa chọn của thành viên khác.

## Phụ thuộc dữ liệu

- User A có JWT hợp lệ và ít nhất hai owned order để biểu diễn lịch sử có nhiều order.
- User B có JWT hợp lệ và ít nhất một order có mã định danh là foreign order đối với User A.
- User C có JWT hợp lệ và không có order.
- Mapping ổn định giữa từng order ID trong fixture và user ID sở hữu nó.
- Một mã định danh đúng định dạng nhưng được đảm bảo không tồn tại, sau khi ID grammar được phê duyệt.
- Một mã định danh sai định dạng chỉ sau khi định dạng ID mong đợi và hành vi validation được làm rõ.
- Giá trị JWT bị thiếu/không hợp lệ có kiểm soát; JWT hết hạn có kiểm soát nếu hành vi hết hạn được đưa vào sau này.
- Bản ghi fixture chứa các giá trị nghiệp vụ có nguồn cần để quan sát mã đơn/ngày đặt/tổng tiền/trạng thái hiện tại, nhưng không khẳng định tên hoặc kiểu trường JSON chưa được tài liệu định nghĩa.
- Cô lập/reset giữa các trường hợp sau này để ownership và số lượng phần tử danh sách có tính xác định.
- Khởi tạo cơ sở dữ liệu hiện tại định nghĩa bảng `orders` nhưng source đã kiểm tra không seed order; do đó Phase B sẽ cần cơ chế fixture/setup được phê duyệt. Cơ chế setup đó chỉ là dependency và không được phân tích như endpoint khác tại đây.
- Giá trị student header `23127464` cho lần thực thi trong tương lai. **Không gửi HTTP request nào.**

## Nguồn đã đọc

- `ai-first-api-testing/SKILL.md`
- `ai-first-api-testing/references/phase-playbook.md`
- `ai-first-api-testing/references/api-selection-contract.md`
- `ai-first-api-testing/references/api-testing-runbook.md`
- `ai-first-api-testing/references/assignment-requirements.md`
- `src/eshop-sut/api_specification.md`
- `src/eshop-sut/README.md`
- Chỉ đối chiếu trực tiếp FR-11: `src/eshop-sut/backend/server.js:100-110`, `:311-319`, `:344-349`; `src/eshop-sut/backend/database.js:74-81`.

## Trạng thái

PHASE A: COMPLETE  
HUMAN REVIEW: APPROVED — 2026-08-20  
NEXT ALLOWED PHASE: B — AI GENERATION  
EXECUTION: NOT EXECUTED
