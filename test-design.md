## Prompt

```
Bạn là chuyên gia kiểm thử API. Hãy hỗ trợ tôi thiết kế test case cho API cập nhật sản phẩm của hệ thống EShop.

## 1. Thông tin API

- Method: PUT
- Endpoint: http://localhost:3000/api/products/:id
- Path parameter:
  - id: ID của sản phẩm cần cập nhật
- Request header:
  - Content-Type: application/json
  - X-Student-Id: <MSSV>
- Request body mẫu:

{
  "name": "iPhone 15 Pro Max Updated",
  "price": 31000000,
  "description": "Điện thoại cao cấp của Apple",
  "imageUrl": "https://example.com/iphone.png",
  "category_id": 1
}

- Response thành công hiện tại:
  - HTTP status: 200
  - Content-Type chứa application/json
  - Response body:

{
  "message": "Product updated"
}

- Các field của sản phẩm trong cơ sở dữ liệu:
  - id: INTEGER, khóa chính
  - name: TEXT
  - price: INTEGER
  - description: TEXT
  - imageUrl: TEXT
  - category_id: INTEGER

## 2. Bối cảnh cần lưu ý

Tài liệu đặc tả xếp PUT /api/products/:id vào nhóm API “Dành cho Admin”. Tuy nhiên, implementation hiện tại chưa áp dụng middleware xác thực và chưa kiểm tra role.

Implementation hiện tại cũng chưa có validation rõ ràng cho:

- ID không tồn tại.
- ID sai định dạng.
- Field bắt buộc bị thiếu.
- name rỗng hoặc quá dài.
- price bằng 0, số âm, số thập phân, chuỗi hoặc số rất lớn.
- imageUrl sai định dạng.
- category_id không tồn tại.
- Extra fields trong body.
- Quyền admin.
- Trường hợp UPDATE không thay đổi bản ghi nào.

Khi thiết kế expected result:

1. Hãy ưu tiên hành vi đúng theo REST API contract và yêu cầu “chỉ Admin”.
2. Không được tự khẳng định một quy tắc chưa có trong đặc tả.
3. Nếu expected status phụ thuộc vào giả định, phải ghi rõ giả định đó trong cột rationale.
4. Nếu hành vi mong đợi theo đặc tả có thể khác implementation hiện tại, hãy ghi rõ:
   - Expected theo contract.
   - Current behavior có khả năng quan sát được.
   - Đây có phải là defect candidate hay không.

## 3. Nhiệm vụ

Hãy đề xuất ít nhất 12 test case cho API trên. Các test case phải bao phủ:

### A. Domain partition và boundary

- ID hợp lệ và tồn tại.
- ID hợp lệ nhưng không tồn tại.
- ID bằng 0.
- ID âm.
- ID là chuỗi hoặc chứa ký tự đặc biệt.
- Request body đầy đủ và hợp lệ.
- Thiếu từng field quan trọng.
- name là chuỗi rỗng, chỉ chứa khoảng trắng, Unicode hoặc rất dài.
- price hợp lệ.
- price bằng 0, âm, số thập phân, chuỗi, null hoặc rất lớn.
- imageUrl hợp lệ và không hợp lệ.
- category_id hợp lệ và không tồn tại.
- Body rỗng, null hoặc JSON không hợp lệ.
- Body chứa field không được định nghĩa.

### B. Security

- Không gửi Authorization token.
- Token sai định dạng.
- Token hết hạn hoặc không hợp lệ.
- Token của user thường thay vì admin.
- Thử SQL injection hoặc chuỗi độc hại trong id/name.
- Thử cập nhật field nhạy cảm hoặc field ngoài schema.

Lưu ý: do implementation hiện tại chưa kiểm tra Authorization, các trường hợp truy cập không có quyền cần được đánh dấu là defect candidate nếu request vẫn thành công.

### C. Schema và response validation

Kiểm tra:

- HTTP status.
- Content-Type chứa application/json.
- Response thành công có field message.
- message có giá trị chính xác "Product updated".
- Response lỗi có cấu trúc JSON nhất quán.
- Không trả về stack trace hoặc thông tin database.
- Sau khi cập nhật thành công, gọi GET /api/products/:id để xác nhận dữ liệu thực sự đã thay đổi.
- Khi cập nhật thất bại, dữ liệu cũ không bị thay đổi.

### D. Non-functional

Đề xuất ít nhất một test kiểm tra response time dưới ngưỡng hợp lý, ví dụ 1000 ms.

## 4. Định dạng kết quả

Trả kết quả dưới dạng bảng Markdown với đúng các cột sau:

| tc_id | category | precondition | input | expected_status | expected_fields | rationale |

Trong đó:

- tc_id: đánh số AI-01, AI-02, ...
- category: POSITIVE, NEGATIVE, BOUNDARY, SECURITY, SCHEMA hoặc PERFORMANCE.
- precondition: trạng thái dữ liệu và quyền người dùng trước khi chạy.
- input: ghi rõ path parameter, header và JSON body.
- expected_status: status code cụ thể.
- expected_fields: các field hoặc giá trị cần assertion.
- rationale: giải thích mục tiêu test, giả định và chênh lệch có thể có giữa contract với implementation.

## 5. Yêu cầu chất lượng

- Tạo ít nhất 12 test case, ưu tiên khoảng 15-18 case để đủ độ bao phủ.
- Không tạo nhiều case trùng mục đích.
- Mỗi case chỉ nên có một nguyên nhân thất bại chính.
- Không dùng nội dung chung chung như “input invalid”.
- Phải ghi giá trị input cụ thể.
- Với mỗi status code chưa được đặc tả rõ, ghi rõ giả định.
- Chỉ ra những test case có khả năng phát hiện lỗi trong implementation hiện tại.
- Cuối bảng, liệt kê:
  1. Các giả định đã sử dụng.
  2. Các điểm chưa rõ cần xác nhận với giảng viên hoặc API owner.
  3. Năm test case phù hợp nhất để đưa vào Postman data-driven run, gồm cả positive và negative case.
  4. Cách khôi phục dữ liệu sản phẩm sau khi chạy test để các iteration không ảnh hưởng lẫn nhau.
```

## Output

```
Quy ước dữ liệu test:

- `id=1`: sản phẩm tồn tại; dữ liệu ban đầu được lưu thành snapshot `P1`.
- `id=999999`: không tồn tại.
- `category_id=1`: danh mục tồn tại; `category_id=999999`: không tồn tại.
- Thay `22123456` bằng MSSV thực tế.
- `H_admin`: `Content-Type: application/json`, `X-Student-Id: 22123456`, `Authorization: Bearer admin-valid-token`.
- `B_valid`: `{"name":"iPhone 15 Pro Max Updated","price":31000000,"description":"Điện thoại cao cấp của Apple","imageUrl":"https://example.com/iphone.png","category_id":1}`.
- Với mọi response lỗi, assertion chung là: `Content-Type` chứa `application/json`; body có cấu trúc lỗi JSON nhất quán; không chứa `stack`, câu SQL, tên bảng hoặc chi tiết database.

| tc_id | category | precondition | input | expected_status | expected_fields | rationale |
|---|---|---|---|---|---|---|
| AI-01 | POSITIVE | `id=1` và `category_id=1` tồn tại; dùng admin token; đã lưu snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `B_valid`. | 200 | `Content-Type` chứa `application/json`; body đúng `{"message":"Product updated"}`. Sau đó `GET /api/products/1` trả đúng cả 5 giá trị mới. | Luồng cập nhật chuẩn và kiểm tra persistence. Expected theo contract trùng response thành công đã mô tả. Current implementation dự kiến trả 200. Defect candidate: **Có** nếu chỉ trả thành công nhưng DB không đổi hoặc đổi thiếu field. |
| AI-02 | POSITIVE | Như AI-01; DB hỗ trợ Unicode. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `{"name":"Điện thoại 日本語 📱","price":31000000,"description":"Sản phẩm Unicode","imageUrl":"https://example.com/unicode.png","category_id":1}`. | 200 | `message="Product updated"`; GET trả nguyên vẹn Unicode, không lỗi encoding hoặc mất ký tự. | `TEXT` không đặc tả chỉ cho phép ASCII, vì vậy Unicode hợp lệ. Current implementation có khả năng chấp nhận. Defect candidate: **Có** nếu dữ liệu bị biến đổi/truncated. |
| AI-03 | NEGATIVE | `id=999999` chắc chắn không tồn tại; admin token hợp lệ. | Path: `/api/products/999999`.<br>Headers: `H_admin`.<br>Body: `B_valid`. | 404 | JSON error có mã/thông báo kiểu `PRODUCT_NOT_FOUND`; không stack/DB detail; không sản phẩm nào bị đổi. | Giả định contract dùng 404 khi resource không tồn tại. Implementation hiện tại không kiểm tra số dòng UPDATE nên có khả năng trả `200 {"message":"Product updated"}`. Defect candidate: **Có** nếu trả 200. |
| AI-04 | BOUNDARY | Admin token hợp lệ. | Path: `/api/products/0`.<br>Headers: `H_admin`.<br>Body: `B_valid`. | 400 | JSON error xác định `id` phải là số nguyên dương; DB không đổi. | Giả định ID hợp lệ phải `>0`, dù đặc tả chỉ nói `INTEGER`. Implementation có thể thực hiện UPDATE 0 dòng rồi trả 200. Defect candidate: **Có** nếu không từ chối ID không hợp lệ. |
| AI-05 | BOUNDARY | Admin token hợp lệ. | Path: `/api/products/-1`.<br>Headers: `H_admin`.<br>Body: `B_valid`. | 400 | JSON error cho path parameter `id`; không thay đổi DB. | Cùng giả định ID là số nguyên dương. Current behavior có thể là 200 dù không dòng nào được cập nhật. Defect candidate: **Có** nếu trả 200. |
| AI-06 | NEGATIVE | Admin token hợp lệ. Chạy ba iteration độc lập. | Headers: `H_admin`; body: `B_valid`.<br>(a) `/api/products/abc`<br>(b) `/api/products/1%40%23` (`1@#`)<br>(c) `/api/products/1%20OR%201%3D1`. | 400 cho từng iteration | JSON error chỉ ra `id` sai định dạng; không stack/SQL detail; mọi sản phẩm giữ nguyên. | Mỗi iteration kiểm tra một lớp chuỗi ID không hợp lệ. Truy vấn phải parameterized. Implementation có thể update 0 dòng và trả 200; nếu nhiều bản ghi bị đổi là lỗi bảo mật nghiêm trọng. Defect candidate: **Có**. |
| AI-07 | NEGATIVE | `id=1`, category 1 tồn tại; admin token; khôi phục `P1` trước mỗi iteration. | Path: `/api/products/1`; headers: `H_admin`.<br>Năm iteration lần lượt bỏ đúng một field khỏi `B_valid`: `name`; `price`; `description`; `imageUrl`; `category_id`. | 422 cho từng iteration | JSON error xác định đúng field bị thiếu; GET xác nhận `P1` không đổi. | Giả định PUT là cập nhật đầy đủ và cả 5 field đều bắt buộc. Đặc tả chưa xác nhận required fields; cần API owner xác nhận. Implementation có thể ghi `NULL`/`undefined`, phát sinh 500 hoặc vẫn trả 200. Defect candidate: **Có** nếu giả định required được xác nhận. |
| AI-08 | BOUNDARY | Như AI-07. Chạy ba iteration độc lập. | Path: `/api/products/1`; headers: `H_admin`.<br>Body dựa trên `B_valid`, thay `name` bằng:<br>(a) `""`<br>(b) `"   "`<br>(c) chuỗi gồm 256 ký tự `A`. | 422 cho từng iteration | Error gắn với `name`; không stack; GET vẫn bằng `P1`. | Giả định name không được rỗng sau trim và độ dài tối đa là 255. Giới hạn 255 **chưa có trong đặc tả**. Current implementation có khả năng chấp nhận cả ba. Defect candidate: **Có** cho (a)/(b); với (c) chỉ khi owner xác nhận giới hạn. |
| AI-09 | BOUNDARY | Như AI-07. Chạy sáu iteration độc lập. | Path: `/api/products/1`; headers: `H_admin`.<br>Body dựa trên `B_valid`, thay `price` bằng:<br>(a) `0`<br>(b) `-1`<br>(c) `31000000.5`<br>(d) `"31000000"`<br>(e) `null`<br>(f) `9007199254740992`. | 422 cho từng iteration | Error gắn với `price`; GET vẫn bằng `P1`; không lộ DB detail. | Giả định giá phải là integer dương, đúng JSON number, không null và nằm trong miền số nguyên xử lý an toàn. Đặc tả DB chỉ ghi `INTEGER`, chưa quy định min/max hay coercion. Current implementation có thể lưu một số giá trị hoặc trả 500. Defect candidate: **Có** nếu validation rule tương ứng được xác nhận. |
| AI-10 | NEGATIVE | `id=1`, category 1 tồn tại; admin token. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `{"name":"Invalid URL","price":31000000,"description":"URL test","imageUrl":"not-a-url","category_id":1}`. | 422 | Error gắn với `imageUrl`; GET xác nhận dữ liệu cũ không đổi. | Giả định `imageUrl` phải là URL HTTP/HTTPS hợp lệ; đặc tả chưa định nghĩa chuẩn URL. Current implementation có khả năng chấp nhận TEXT bất kỳ. Defect candidate: **Có** nếu URL validation là yêu cầu được xác nhận. |
| AI-11 | NEGATIVE | `id=1` tồn tại; `category_id=999999` không tồn tại; admin token. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `{"name":"Invalid Category","price":31000000,"description":"Category test","imageUrl":"https://example.com/a.png","category_id":999999}`. | 422 | JSON error kiểu `CATEGORY_NOT_FOUND` gắn với `category_id`; GET vẫn bằng `P1`. | Giả định category phải tham chiếu danh mục tồn tại; dùng 422 vì product đích vẫn tồn tại nhưng body không hợp lệ. Có thể dùng 404/409 nếu contract chọn quy ước khác. Implementation có thể trả 200 nếu không kiểm tra FK. Defect candidate: **Có**. |
| AI-12 | NEGATIVE | `id=1` tồn tại; admin token; chạy ba iteration độc lập. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>(a) payload rỗng, không có byte body;<br>(b) body `null`;<br>(c) body `{"name":"Broken",}`. | (a) 400<br>(b) 422<br>(c) 400 | JSON error nhất quán; không stack/parser trace; GET vẫn bằng `P1`. | Payload rỗng và JSON hỏng là lỗi cú pháp 400; JSON `null` hợp lệ về cú pháp nhưng sai schema nên giả định 422. Express parser hiện tại có thể trả HTML cho JSON hỏng hoặc handler phát sinh 500. Defect candidate: **Có** nếu lỗi không phải JSON nhất quán hoặc làm đổi DB. |
| AI-13 | NEGATIVE | `id=1` tồn tại; admin token. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `B_valid` cộng thêm `"color":"titanium"`. | 400 | JSON error kiểu `UNKNOWN_FIELD`, chỉ ra `color`; GET vẫn bằng `P1`. | Giả định schema áp dụng chế độ strict và từ chối field không định nghĩa. Đặc tả chưa nói nên cũng có thể chọn bỏ qua field. Current implementation có khả năng bỏ qua và trả 200. Defect candidate: **Chỉ khi** strict schema được xác nhận. |
| AI-14 | SECURITY | `id=1` tồn tại; endpoint chỉ dành cho Admin; không có phiên đăng nhập ngầm. | Path: `/api/products/1`.<br>Headers: `Content-Type: application/json`, `X-Student-Id: 22123456`; **không có Authorization**.<br>Body: `B_valid`. | 401 | JSON error kiểu `UNAUTHORIZED`; không có `message="Product updated"`; GET vẫn bằng `P1`; có thể có `WWW-Authenticate: Bearer`. | Contract “chỉ Admin” yêu cầu xác thực. Implementation hiện tại không có auth middleware nên có khả năng trả 200 và cập nhật DB. Defect candidate: **Có, mức nghiêm trọng cao**. |
| AI-15 | SECURITY | Như AI-14; chạy ba iteration độc lập. | Path: `/api/products/1`; body: `B_valid`; headers chung có Content-Type và Student ID.<br>(a) `Authorization: admin-valid-token`<br>(b) `Authorization: Bearer expired-token`<br>(c) `Authorization: Bearer invalid-signature-token`. | 401 cho từng iteration | JSON error `UNAUTHORIZED` hoặc `INVALID_TOKEN`; không lộ lý do mật mã nhạy cảm; GET vẫn bằng `P1`. | Giả định scheme là Bearer. Token thiếu scheme, hết hạn hoặc sai chữ ký đều không được xác thực. Current implementation có khả năng bỏ qua header và trả 200. Defect candidate: **Có, mức nghiêm trọng cao**. |
| AI-16 | SECURITY | Token hợp lệ của user thường, không có role Admin; `id=1` tồn tại. | Path: `/api/products/1`.<br>Headers: `Content-Type: application/json`, `X-Student-Id: 22123456`, `Authorization: Bearer user-valid-token`.<br>Body: `B_valid`. | 403 | JSON error kiểu `FORBIDDEN`; GET vẫn bằng `P1`. | User đã xác thực nhưng không đủ quyền nên 403, không phải 401. Implementation hiện tại chưa kiểm tra role và có khả năng trả 200. Defect candidate: **Có, mức nghiêm trọng cao**. |
| AI-17 | SECURITY | Admin token hợp lệ; snapshot toàn bộ bảng sản phẩm hoặc ít nhất số lượng và các bản ghi liên quan. | Path: `/api/products/1%20OR%201%3D1--`.<br>Headers: `H_admin`.<br>Body: `B_valid`. | 400 | JSON error cho `id`; không stack/SQL detail; số lượng và mọi sản phẩm không đổi. | Kiểm tra SQL injection qua path. Current implementation an toàn nếu dùng parameterized query, nhưng vẫn có thể trả 200 do không validate ID. Defect candidate: **Có** nếu trả 200 sai ngữ nghĩa; **nghiêm trọng/critical** nếu nhiều bản ghi thay đổi hoặc lộ SQL. |
| AI-18 | SECURITY | Admin token; `id=1` tồn tại; snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `{"name":"x'); DROP TABLE products; --","price":31000000,"description":"<script>alert('xss')</script>","imageUrl":"https://example.com/a.png","category_id":1}`. | 200 | `message="Product updated"`; GET trả chuỗi đúng như dữ liệu text, bảng vẫn tồn tại, chỉ `id=1` thay đổi; response không thực thi/phản chiếu HTML ngoài JSON escaping. | Không tự giả định mọi chuỗi “độc hại” phải bị cấm: name/description là TEXT. Mục tiêu là chứng minh parameterized SQL và lưu dữ liệu như text. XSS đầu ra phải được kiểm soát ở nơi render. Defect candidate: **Có** nếu SQL được thực thi, nhiều dòng bị đổi, hoặc server lỗi/lộ stack. |
| AI-19 | SECURITY | Admin token; `id=1` tồn tại; snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `B_valid` cộng `"id":2,"isAdmin":true,"createdBy":"attacker"`. | 400 | JSON error liệt kê field ngoài schema; `id` vẫn là 1; không có field nhạy cảm được tạo/cập nhật; GET xác nhận `P1` không đổi. | Kiểm tra mass assignment và cố sửa khóa chính/field nhạy cảm. Giả định strict schema. Dù API chọn bỏ qua unknown fields thay vì 400, tuyệt đối không được cập nhật chúng. Current implementation có thể bỏ qua hoặc vô tình spread toàn body. Defect candidate: **Có** nếu field ngoài allowlist tác động DB. |
| AI-20 | SCHEMA | `id=1` tồn tại; admin token; snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `{"name":"Schema Check","price":32000000,"description":"Kiểm tra schema","imageUrl":"https://example.com/schema.png","category_id":1}`. | 200 | Status đúng 200; `Content-Type` chứa `application/json`; body là JSON object; có đúng `message` kiểu string và giá trị chính xác `"Product updated"`; không có stack/SQL detail; GET xác nhận dữ liệu mới. | Tách riêng kiểm tra response contract, kể cả exact casing của message. Current response được mô tả là phù hợp. Defect candidate: **Có** nếu status/content type/schema/message sai hoặc cập nhật không thực sự xảy ra. |
| AI-21 | PERFORMANCE | Server chạy ổn định; DB local đã warm-up; `id=1` và category 1 tồn tại; admin token; không chạy song song với tải khác. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `B_valid`.<br>Đo từ lúc gửi request đến khi nhận đủ response. | 200 | Các assertion của AI-01 và `responseTime < 1000 ms`; GET xác nhận update; ghi lại p50/p95 nếu chạy nhiều lần. | Ngưỡng 1000 ms là giả định phi chức năng do đề bài gợi ý, chưa phải SLA chính thức. Nên chạy ít nhất 10 lần sau một lượt warm-up. Defect candidate: **Có** nếu vượt SLA đã thống nhất; một lần vượt ngưỡng chưa đủ kết luận nếu môi trường không kiểm soát. |

### 1. Các giả định đã sử dụng

- API dùng `Authorization: Bearer <token>`.
- Thiếu/sai token trả 401; token hợp lệ nhưng không có role Admin trả 403.
- `id` phải là số nguyên dương; resource không tồn tại trả 404.
- Lỗi cú pháp request trả 400; lỗi validation của JSON hợp lệ trả 422.
- PUT yêu cầu đủ cả năm field sản phẩm.
- `name` sau trim phải khác rỗng; giới hạn 255 ký tự chỉ là giả định test.
- `price` là JSON integer dương và phải nằm trong miền số nguyên xử lý an toàn.
- `imageUrl` chỉ chấp nhận URL HTTP/HTTPS.
- `category_id` phải tham chiếu danh mục tồn tại.
- Schema strict từ chối field dư; nếu API chọn bỏ qua thì cần ghi rõ trong contract.
- Response lỗi có một JSON schema thống nhất, ví dụ `{"error":{"code":"...","message":"...","field":"..."}}`.
- Ngưỡng performance là 1000 ms trong môi trường local ổn định.

### 2. Điểm cần xác nhận với giảng viên/API owner

- Năm field có thật sự đều bắt buộc với PUT không; `description` và `imageUrl` có được null/rỗng không?
- Quy tắc min/max của `name`, `price`, `description`, `imageUrl`.
- Status chuẩn mong muốn là 400 hay 422 cho validation; 404, 409 hay 422 cho category không tồn tại.
- Field ngoài schema phải bị từ chối hay được bỏ qua.
- Cơ chế authentication thực tế, định dạng token và tên role Admin.
- JSON schema chuẩn cho response lỗi.
- Có cần chuẩn hóa/trim `name` hay phải giữ nguyên input?
- SLA response time và cách đo warm/cold request.
- PUT là full replacement hay thực tế được dùng như partial update.

### 3. Năm test phù hợp nhất cho Postman data-driven run

1. `AI-01`: request hợp lệ, cập nhật và GET xác nhận.
2. `AI-03`: ID hợp lệ nhưng không tồn tại.
3. `AI-07`: năm iteration thiếu từng field.
4. `AI-09`: sáu partition/boundary của `price`.
5. Nhóm authorization từ `AI-14`–`AI-16`: chạy bằng dataset gồm `no_token`, `malformed`, `expired`, `invalid_signature`, `regular_user`; expected lần lượt 401 hoặc 403.

Dataset nên chứa các cột như `id`, `token`, `omitField`, `priceValue`, `expectedStatus`, `expectedErrorCode`.

### 4. Khôi phục dữ liệu giữa các iteration

- Trước suite, gọi GET hoặc truy vấn fixture để lưu toàn bộ dữ liệu gốc của `id=1` thành `P1`.
- Trước **mỗi** iteration có thể ghi DB, dùng admin token gọi PUT với chính `P1` để reset.
- Sau mỗi negative test, gọi GET và so sánh với `P1`; nếu request ngoài dự kiến đã thành công, lập tức restore `P1`.
- Sau toàn bộ collection, chạy cleanup/finalizer để PUT lại `P1`, kể cả khi assertion trước đó thất bại.
- Tốt nhất dùng một sản phẩm fixture riêng cho automation và tạo lại database từ seed/transaction rollback trước mỗi collection run; không dùng dữ liệu dùng chung của người khác.
```

## Bảng audit

Phạm vi kiểm duyệt: đối chiếu 21 test case AI với đặc tả trong `api_specification.md`, yêu cầu bài tập trong `Mini_Exercise.pdf` và implementation tại `backend/server.js`. Nhãn đánh giá chất lượng thiết kế theo contract; phần “current behavior” chỉ dùng để nhận diện defect candidate, không thay thế expected result theo contract.

| TC | Nhãn | Nhận xét hoặc chỉnh sửa |
|---|---|---|
| AI-01 | VALID | Case có precondition, request hợp lệ, status/message chính xác và bước GET xác nhận dữ liệu thật sự thay đổi; cần restore snapshot `P1` sau khi chạy để không ảnh hưởng case sau. |
| AI-02 | VALID | Unicode là partition hợp lệ của cột `TEXT` và không có quy tắc nào trong đặc tả cấm Unicode; assertion GET kiểm tra được cả lưu trữ lẫn encoding. |
| AI-03 | VALID | Expected 404 cho product không tồn tại là giả định REST hợp lý và đã được nêu rõ; implementation hiện tại không kiểm tra `this.changes` nên khả năng trả 200 là defect candidate đúng. |
| AI-04 | VALID | Boundary `id=0` cụ thể, chỉ có một nguyên nhân thất bại và giả định “ID phải là số nguyên dương” đã được công khai; cần giữ 400 là expected theo contract, không đổi thành 200 theo implementation lỗi. |
| AI-05 | VALID | Boundary ID âm độc lập với ID bằng 0 và có assertion không làm đổi dữ liệu; expected 400 dựa trên cùng giả định ID dương đã nêu rõ. |
| AI-06 | INCOMPLETE | Một tc_id đang gộp ba input (`abc`, `1@#`, SQL-like ID), trái yêu cầu mỗi case chỉ có một nguyên nhân thất bại và còn trùng mục tiêu injection với AI-17. **Chỉnh sửa:** tách `abc` thành AI-06a, `1@#` thành AI-06b; bỏ iteration SQL khỏi AI-06 và giữ SQL injection ở AI-17. |
| AI-07 | INCOMPLETE | Case gộp năm field bị thiếu và tự giả định cả năm đều bắt buộc dù đặc tả chưa xác nhận. **Chỉnh sửa:** tách thành AI-07a…AI-07e, mỗi case bỏ đúng một field; ghi expected 422 là “pending confirmation” cho `description` và `imageUrl` cho tới khi owner xác nhận required fields. |
| AI-08 | INCOMPLETE | Ba partition của `name` nên tách riêng; đặc biệt giới hạn 255 ký tự chưa có nguồn contract nên không thể coi 256 ký tự chắc chắn phải trả 422. **Chỉnh sửa:** tách empty/whitespace/long; giữ case long ở trạng thái chờ xác nhận max length hoặc chuyển thành robustness test không khẳng định defect. |
| AI-09 | INCOMPLETE | Sáu giá trị price trong một tc_id làm mờ nguyên nhân thất bại và các luật `price > 0`, integer-only, không coercion, giới hạn lớn đều chưa được đặc tả. **Chỉnh sửa:** tách sáu iteration thành các dòng data-driven riêng và lưu rule/expected status tương ứng trong từng dòng. |
| AI-10 | INCOMPLETE | Input cụ thể và mục tiêu rõ, nhưng `imageUrl` chỉ được mô tả là `TEXT`; quy tắc bắt buộc HTTP/HTTPS và status 422 chưa được xác nhận. Chỉ kết luận defect nếu API owner xác nhận URL validation. |
| AI-11 | INCOMPLETE | Case hữu ích để kiểm tra referential integrity, nhưng schema hiện tại không khai báo foreign key và đặc tả chưa quy định status cho category không tồn tại; cần owner chọn 404/409/422 trước khi tự động hóa expected status. |
| AI-12 | INCOMPLETE | Payload rỗng, JSON `null` và malformed JSON là ba nguyên nhân khác nhau nhưng đang nằm chung một tc_id. **Chỉnh sửa:** tách thành AI-12a (empty, 400), AI-12b (`null`, 422 theo giả định schema) và AI-12c (malformed JSON, 400); mỗi case kiểm tra response lỗi không lộ stack. |
| AI-13 | INCOMPLETE | Expected 400 phụ thuộc chính sách strict schema chưa có trong đặc tả; implementation destructure allowlist nên có khả năng bỏ qua `color` và trả 200. Cần xác nhận policy “reject” hay “ignore”, nhưng trong cả hai trường hợp field dư không được ghi vào DB. |
| AI-14 | VALID | Contract ghi API sản phẩm dành cho Admin nên thiếu token phải bị từ chối; implementation không gắn middleware auth nên nếu trả 200 và cập nhật sản phẩm thì đây là defect authorization nghiêm trọng. |
| AI-15 | INCOMPLETE | Case bao gồm ba tình huống token và mặc định tất cả trả 401; trong middleware hiện có, token sai/hết hạn được ánh xạ thành 403, còn endpoint PUT hiện bỏ qua token hoàn toàn. **Chỉnh sửa:** tách malformed token khỏi expired/invalid token và xác nhận contract chọn 401 hay 403 trước khi chốt assertion. |
| AI-16 | VALID | Phân biệt đúng authentication với authorization: user token hợp lệ nhưng thiếu role Admin phải trả 403; request vẫn thành công trên implementation hiện tại là defect role-check rõ ràng. |
| AI-17 | VALID | Payload injection qua `id` cụ thể, expected 400 theo contract validation và kiểm tra toàn bộ dữ liệu không đổi; truy vấn parameterized trong implementation giảm nguy cơ SQL injection nhưng không loại bỏ defect trả 200 sai ngữ nghĩa. |
| AI-18 | VALID | Không mặc định chuỗi SQL/XSS trong field `TEXT` là invalid; expected 200 cùng assertion “lưu như dữ liệu, không thực thi SQL” phù hợp để kiểm tra parameterization. Phần XSS chỉ được đánh giá hoàn chỉnh khi kiểm tra tầng render frontend. |
| AI-19 | INVALID | Expected 400 mâu thuẫn với chính rationale thừa nhận API có thể hợp lệ khi bỏ qua unknown fields, đồng thời gộp sửa `id` và hai field ngoài schema. **Bản sửa được duyệt:** dùng body có duy nhất `"id":2` ngoài `B_valid`; với implementation hiện tại expected 200, assert path `id=1` vẫn là bản ghi được cập nhật và `id=2` không đổi; policy reject-400 được ghi riêng là contract cần xác nhận. |
| AI-20 | INVALID | Case gần như lặp lại AI-01 về cùng happy path, response schema và GET verification, trái yêu cầu hạn chế case trùng mục đích. **Chỉnh sửa:** gộp toàn bộ assertion Content-Type, exact message và không có field thừa vào AI-01, sau đó bỏ AI-20 khỏi bộ chạy. |
| AI-21 | VALID | Điều kiện đo, ngưỡng `<1000 ms`, warm-up và hạn chế tải nền đều được nêu rõ; đây là performance assumption do đề bài gợi ý chứ chưa phải SLA chính thức. |

### Kết luận audit

- `VALID`: 10 case (`AI-01`, `AI-02`, `AI-03`, `AI-04`, `AI-05`, `AI-14`, `AI-16`, `AI-17`, `AI-18`, `AI-21`); AI-01 được bổ sung thêm assertion từ AI-20.
- `INCOMPLETE`: 9 case (`AI-06`, `AI-07`, `AI-08`, `AI-09`, `AI-10`, `AI-11`, `AI-12`, `AI-13`, `AI-15`); cần tách iteration hoặc xác nhận contract trước khi chuyển sang dữ liệu Postman.
- `INVALID`: 2 case (`AI-19`, `AI-20`) ở phiên bản AI ban đầu; cả hai đã có hướng sửa cụ thể trong bảng.
- Bộ test sau audit không dùng AI-20 như một case độc lập; AI-19 chỉ được dùng theo bản sửa kiểm tra path ID không bị body override.

## Test case tự bổ sung

Các case dưới đây do người kiểm thử tự bổ sung sau audit, chưa nằm trong output ban đầu của AI.

| tc_id | category | precondition | input | expected_status | expected_fields | rationale |
|---|---|---|---|---|---|---|
| EXT-01 | NEGATIVE | `id=1` tồn tại; body hợp lệ; admin token hợp lệ. | Path: `/api/products/1`.<br>Headers: `Content-Type: application/json`, `Authorization: Bearer admin-valid-token`; **không gửi `X-Student-Id`**.<br>Body: `B_valid`. | 400 | JSON error chỉ ra thiếu `X-Student-Id`; GET xác nhận sản phẩm không đổi; response không lộ stack/DB detail. | Giả định `X-Student-Id` là header bắt buộc của bài thực hành. AI tập trung vào Authorization và bỏ sót validation của header theo dõi sinh viên; implementation hiện tại bỏ qua header nên có khả năng trả 200, là defect candidate nếu owner xác nhận header bắt buộc. |
| EXT-02 | NEGATIVE | `id=1` tồn tại; admin token hợp lệ; đã lưu snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `Content-Type: text/plain`, `X-Student-Id: 23127062`, `Authorization: Bearer admin-valid-token`.<br>Raw body: `B_valid`. | 415 | JSON error kiểu `UNSUPPORTED_MEDIA_TYPE`; GET vẫn bằng `P1`; không trả HTML/stack trace. | AI chỉ kiểm tra Content-Type của response mà bỏ sót Content-Type của request. Theo HTTP contract, endpoint nhận JSON nên media type không được hỗ trợ phải bị từ chối; Express hiện tại có thể để `req.body` undefined và trả 500, là defect candidate. |
| EXT-03 | NEGATIVE | `id=1` tồn tại; admin token hợp lệ; đã lưu snapshot `P1`. | Path: `/api/products/1`.<br>Headers: `H_admin`.<br>Body: `[{"name":"Array payload"}]`. | 422 | JSON error xác định top-level body phải là object; GET vẫn bằng `P1`; không lộ chi tiết DB. | AI đã xét empty/null/malformed JSON nhưng bỏ sót JSON hợp lệ có sai top-level type. Model thường tập trung vào field-level validation hơn structural type; implementation hiện tại có thể destructure ra `undefined`, ghi NULL và trả 200. |

### Năm iteration được chọn để chạy Postman/Newman

Bộ data-driven chọn `AI-01`, `AI-02`, `AI-03`, `AI-04` và `AI-14`. Cột `expected_status` dùng **hành vi quan sát được của implementation hiện tại** để Newman có thể chạy pass; cột `contract_status` giữ oracle đúng theo contract để ghi nhận defect thay vì xem hành vi lỗi là yêu cầu đúng.

- `AI-01`, `AI-02`: `expected_status=200`, `contract_status=200`.
- `AI-03`: implementation trả 200 dù ID không tồn tại; `contract_status=404`.
- `AI-04`: implementation trả 200 với ID bằng 0; `contract_status=400`.
- `AI-14`: implementation trả 200 khi không có Authorization; `contract_status=401`.

### Kết quả thực thi Newman

Lệnh thực thi:

```bash
newman run mini-update-product.postman_collection.json \
  --environment mini-local.postman_environment.json \
  --iteration-data mini-update-product.data.json \
  --reporters cli,json \
  --reporter-json-export mini-newman-report.json
```

Kết quả ngày 10/08/2026:

- Iterations: 5 executed, 0 failed.
- Requests: 15 executed, 0 failed.
- Assertions: 40 executed, 0 failed.
- Response time trung bình 3 ms; lớn nhất 17 ms, dưới ngưỡng 1000 ms.
- Console xác nhận mọi request có `X-Student-Id=23127062`; iteration AI-14 không có Authorization đúng mục đích test.
- AI-03, AI-04 và AI-14 được log là `DEFECT CANDIDATE` vì current status lần lượt là 200 trong khi contract status là 404, 400 và 401.
- Request cleanup cuối mỗi iteration đã khôi phục product 1 về dữ liệu seed `iPhone 15 Pro Max`, giá `30000000`.
- Báo cáo chi tiết được lưu tại `mini-newman-report.json`.

## Bảng Postman features

| Feature | Đã dùng? | Ghi chú |
|---|---|---|
| Collections | Có | Collection `mini-update-product` chứa request PUT, GET verification và cleanup. |
| Environment variables | Có | Environment lưu `baseUrl` và `studentId=23127062`. |
| Collection variables | Có | Collection lưu tên API và payload khôi phục sản phẩm gốc để dùng lại giữa các request. |
| Pre-request scripts | Có | Script tự động upsert `X-Student-Id` và thêm hoặc loại bỏ Authorization theo iteration data. |
| Test scripts (assertions) | Có | Assertions kiểm tra status, JSON Content-Type, exact message, response time và dữ liệu sau update. |
| Data-driven runs (Collection Runner + data file) | Có | `mini-update-product.data.json` cung cấp đúng 5 iteration positive và negative. |
| Newman CLI | Có | Collection được chạy bằng Newman với CLI và JSON reporter. |
| Monitors | Không | Không sử dụng vì provider chỉ chạy local/CI và không có endpoint public ổn định. |
| Mock servers | Không | Không sử dụng vì kiểm thử trực tiếp implementation thật của EShop. |
| Workspaces | Không | Chưa sử dụng Postman Workspace; các artifact hiện được quản lý trực tiếp trong repository. |

Tổng cộng đã sử dụng 7/10 feature, đáp ứng yêu cầu tối thiểu 6 feature.
