# Mini Exercise — Thực hành API Testing

- **Sinh viên:** 23127300
- **API đã chọn:** #21 — `PUT /api/admin/orders/:id/status` (Admin cập nhật trạng thái đơn hàng)
- **Nhánh:** `feature/23127300`
- **Thư mục bài nộp:** `mini-api-testing/`

---

## 0. Mô tả API dưới kiểm thử

| Thuộc tính | Giá trị |
|---|---|
| Method + URL | `PUT {{baseUrl}}/api/admin/orders/:id/status` |
| Base URL | `http://localhost:3000` |
| Xác thực | `Authorization: Bearer <JWT>` (lấy từ `POST /api/login`) |
| Request header | `Content-Type: application/json`, `X-Student-Id: 23127300` |
| Request body | `{"status": "confirmed"}` — giá trị hợp lệ theo đặc tả: `pending`, `confirmed`, `shipping`, `delivered`, `canceled` |

Luồng trạng thái theo đặc tả:

```
pending → confirmed → shipping → delivered
    ↘ canceled   ↘ canceled
```

### 0.1 Request / response mẫu (thu thập bằng cURL trước khi viết test)

**Happy path — 200**

```
PUT /api/admin/orders/12/status      Authorization: Bearer <admin JWT>
{"status": "confirmed"}
→ HTTP 200 | Content-Type: application/json; charset=utf-8
{"message":"Order status updated"}
```

Response 200 **không** trả về bản ghi đơn hàng sau cập nhật — chỉ có duy nhất field `message`.

**Chuyển trạng thái không hợp lệ — 400**

```
{"status": "shipping"}  (đơn đang ở pending)
→ HTTP 400
{"error":"Invalid state transition from pending to shipping"}
```

**Không tìm thấy đơn — 404**

```
PUT /api/admin/orders/999999/status
→ HTTP 404
{"error":"Order not found"}
```

**Thiếu token — 401** · **Token sai định dạng/chữ ký — 403**

```
(không gửi Authorization)   → HTTP 401 {"error":"Unauthorized"}
Authorization: Bearer not.a.jwt → HTTP 403 {"error":"Forbidden"}
```

### 0.2 Ma trận chuyển trạng thái quan sát được

Mỗi ô là `HTTP code` / `trạng thái đơn sau khi gọi`. Mỗi phép đo dùng một đơn hàng mới tạo riêng.

| from \ to | pending | confirmed | shipping | delivered | canceled |
|---|---|---|---|---|---|
| **pending** | 400/pending | **200/confirmed** | 400/pending | 400/pending | **200/canceled** |
| **confirmed** | 400/confirmed | 400/confirmed | **200/shipping** | 400/confirmed | **200/canceled** |
| **shipping** | 400/shipping | 400/shipping | 400/shipping | **200/delivered** | 400/shipping |
| **delivered** | 400/delivered | 400/delivered | 400/delivered | 400/delivered | 400/delivered |
| **canceled** | 400/canceled | 400/canceled | 400/canceled | **200/delivered** ⚠️ | 400/canceled |

Ma trận trùng khớp hoàn toàn với sơ đồ đặc tả, **trừ một ô**: `canceled → delivered` được chấp nhận (xem §7, BUG-01).

---

## 1. Bước 1 — Generate with AI

### 1.1 Prompt đã dùng

Công cụ: Claude (Opus 5). Prompt viết theo `postman-contract-test-prompt-guide.md` — chỉ định rõ từng nhóm test cần sinh, kèm request/response thật, thay vì prompt chung chung "viết test cho API này".

```
Tôi cần thiết kế test case cho một endpoint REST của hệ thống eshop-sut.

ENDPOINT DƯỚI KIỂM THỬ
- Method + URL: PUT http://localhost:3000/api/admin/orders/:id/status
- Mô tả: Admin cập nhật trạng thái một đơn hàng.
- Header: Authorization: Bearer <JWT>, Content-Type: application/json
- Request body: {"status": "<trạng thái mới>"}
- Tập trạng thái hợp lệ: pending, confirmed, shipping, delivered, canceled

LUỒNG TRẠNG THÁI THEO ĐẶC TẢ
pending → confirmed → shipping → delivered
      ↘ canceled  ↘ canceled
(delivered và canceled là trạng thái kết thúc)

RESPONSE THẬT (đã bắt bằng cURL, không phải giả định)
- 200: {"message":"Order status updated"} — Content-Type: application/json; charset=utf-8
- 400: {"error":"Invalid state transition from pending to shipping"}
- 404: {"error":"Order not found"}
- 401: {"error":"Unauthorized"}

ENDPOINT PHỤ TRỢ ĐỂ DỰNG DỮ LIỆU
- POST /api/login  {"email","password"} → {"token", "user"}
- POST /api/checkout (Bearer user token) → tạo đơn mới ở trạng thái pending, trả {"orderId"}
- GET  /api/orders/:id → trả nguyên bản ghi đơn hàng, có field "status"

TÀI KHOẢN SẴN CÓ
- admin@eshop.com / Admin123!  (role = admin)
- test@eshop.com  / Test1234!  (role = user)

YÊU CẦU
Đề xuất TỐI THIỂU 12 test case, phủ đủ 4 nhóm sau, mỗi nhóm ít nhất 2 case:
1. State transitions — từng cạnh hợp lệ trong sơ đồ, các cạnh không hợp lệ
   (nhảy cóc trạng thái, quay ngược, rời khỏi trạng thái kết thúc).
2. Domain partitions — giá trị status hợp lệ / không thuộc tập / sai kiểu / thiếu
   field; orderId tồn tại / không tồn tại / không phải số.
3. Security — thiếu token, token sai định dạng, role escalation (user thường gọi
   endpoint admin), SQL injection qua path param và qua body.
4. Schema validation — response body phải khớp đúng các field API thực sự trả về.

Trả kết quả dưới dạng bảng Markdown với ĐÚNG các cột:
tc_id | input (precondition + request) | expected status | expected fields | rationale

Ràng buộc:
- Tách riêng "thiếu token" và "sai role" thành 2 case khác nhau, không gộp 401/403.
- Với mỗi case ghi rõ trạng thái đơn hàng TRƯỚC khi gọi (precondition).
- Nếu thiếu thông tin, liệt kê giả định ra một mục riêng — KHÔNG tự bịa field.
```

### 1.2 AI output (rút gọn)

AI trả về 17 test case:

| tc_id | Input (precondition + request) | Expected status | Expected fields | Rationale |
|---|---|---|---|---|
| AI-01 | Đơn `pending`, admin token, `{"status":"confirmed"}` | 200 | `message` | Cạnh hợp lệ đầu tiên của luồng |
| AI-02 | Đơn `confirmed`, admin, `{"status":"shipping"}` | 200 | `message` | Cạnh hợp lệ thứ hai |
| AI-03 | Đơn `shipping`, admin, `{"status":"delivered"}` | 200 | `message` | Cạnh hợp lệ cuối |
| AI-04 | Đơn `pending`, admin, `{"status":"canceled"}` | 200 | `message` | Nhánh hủy từ `pending` |
| AI-05 | Đơn `confirmed`, admin, `{"status":"canceled"}` | 200 | `message` | Nhánh hủy từ `confirmed` |
| AI-06 | Đơn `pending`, admin, `{"status":"shipping"}` | 400 | `error` | Nhảy cóc trạng thái |
| AI-07 | Đơn `pending`, admin, `{"status":"delivered"}` | 400 | `error` | Nhảy cóc 2 bậc |
| AI-08 | Đơn `delivered`, admin, `{"status":"canceled"}` | 400 | `error` | Rời khỏi trạng thái kết thúc |
| AI-09 | Đơn `canceled`, admin, `{"status":"delivered"}` | 400 | `error` | Đơn đã hủy không được "sống lại" |
| AI-10 | Đơn `pending`, **không gửi** `Authorization` | 401 | `error` | Endpoint yêu cầu xác thực |
| AI-11 | Đơn `pending`, `Authorization: Bearer not.a.jwt` | 401 | `error` | Token sai định dạng |
| AI-12 | Đơn `pending`, token của `test@eshop.com` (role `user`) | 403 | `error` | Role escalation vào endpoint admin |
| AI-13 | `orderId = 999999`, admin, `{"status":"confirmed"}` | 404 | `error` = `Order not found` | Resource không tồn tại |
| AI-14 | Đơn `pending`, admin, body `{}` | 400 | `error` nêu rõ field `status` bị thiếu | Field bắt buộc |
| AI-15 | Đơn `pending`, admin, `{"status":"shipped"}` | 400 | `error` | Giá trị ngoài tập trạng thái |
| AI-16 | Đơn `pending`, admin, `{"status":"confirmed'; DROP TABLE orders; --"}` | 400, không 500 | `error` | Input sanitization |
| AI-17 | Đơn `pending`, admin, `{"status":"confirmed"}` | 200 | `id`, `status`, `updated_at` | Schema của resource sau khi cập nhật |

**Giả định AI tự liệt kê:** (a) endpoint là admin-only nên user thường phải nhận 403; (b) `GET /api/orders/:id` dùng được để xác minh trạng thái sau khi cập nhật.

---

## 2. Bước 2 — Audit (human review)

Mỗi test case được chạy thật bằng cURL trước khi gắn nhãn. Nhãn đánh giá **chất lượng test case**, không phải kết quả pass/fail của SUT — một test case đúng vẫn được gắn `VALID` khi nó làm lộ lỗi của hệ thống.

| TC | Nhãn | Nhận xét hoặc chỉnh sửa |
|---|---|---|
| AI-01 | `VALID` | Khớp hành vi thật: 200 + `{"message":"Order status updated"}`. |
| AI-02 | `VALID` | Khớp hành vi thật. Cần một request dựng precondition đưa đơn về `confirmed`. |
| AI-03 | `VALID` | Khớp hành vi thật. Precondition cần 2 bước chuyển. |
| AI-04 | `VALID` | Khớp hành vi thật. |
| AI-05 | `VALID` | Khớp hành vi thật. |
| AI-06 | `VALID` | Khớp: 400 + `Invalid state transition from pending to shipping`. |
| AI-07 | `VALID` | Khớp hành vi thật. |
| AI-08 | `VALID` | Khớp: `delivered` là trạng thái kết thúc, mọi lối ra đều 400. |
| AI-09 | `VALID` | Test case đúng theo đặc tả, nhưng **SUT trả 200** thay vì 400 → xem BUG-01 (§7). Giữ nguyên kỳ vọng 400. |
| AI-10 | `VALID` | Khớp: 401 + `{"error":"Unauthorized"}`. |
| AI-11 | `INVALID` | **Kỳ vọng sai.** Token sai chữ ký trả **403 `{"error":"Forbidden"}`**, không phải 401. AI gộp "chưa xác thực" và "token không verify được" vào cùng một mã. **Đã sửa:** tách AI-10 (thiếu header → 401) và AI-11 (token không verify được → 403), đây là hai nhánh xử lý khác nhau. |
| AI-12 | `VALID` | Test case đúng theo đặc tả admin-only, nhưng **SUT trả 200** và ghi trạng thái thành công → xem BUG-02 (§7). Giữ nguyên kỳ vọng 403. |
| AI-13 | `VALID` | Khớp: 404 + `Order not found`. |
| AI-14 | `INCOMPLETE` | Status code 400 là đúng, nhưng kỳ vọng "error nêu rõ field `status` bị thiếu" không kiểm chứng được: thông báo thật là `Invalid state transition from pending to undefined`. **Đã sửa:** assertion chỉ ràng buộc `status = 400` và body có field `error` kiểu string; chất lượng thông báo lỗi được ghi lại riêng thành BUG-03 thay vì làm test đỏ. |
| AI-15 | `VALID` | Khớp: 400 + `Invalid state transition from pending to shipped`. |
| AI-16 | `VALID` | Khớp: 400, không có 5xx, bảng `orders` còn nguyên (đọc lại `GET /api/orders/:id` sau khi gọi vẫn thành công). Payload chỉ bị lặp lại trong thông báo lỗi, không được thực thi. |
| AI-17 | `INVALID` | **AI bịa field.** Response 200 chỉ có `{"message":"Order status updated"}` — không có `id`, `status`, `updated_at`. **Đã sửa:** JSON Schema cho case thành công là `{required: ["message"], properties: {message: {type: "string"}}}`; việc kiểm tra trạng thái mới được chuyển sang một request `GET /api/orders/:id` riêng (xem EXT-03). |

**Tổng kết:** 14 `VALID`, 2 `INVALID`, 1 `INCOMPLETE`. Cả 3 case `INVALID`/`INCOMPLETE` đều đã được sửa.

---

## 3. Bước 3 — Extend (test case tự bổ sung)

| tc_id | Test case | Kỳ vọng | Vì sao AI bỏ sót |
|---|---|---|---|
| EXT-01 | Response header `Content-Type` của **mọi** response, kể cả 4xx | chứa `application/json` | Prompt chỉ đưa response *body* mẫu nên AI chỉ suy luận trên body. Đây là ràng buộc contract cấp header, thuộc nhóm mà guide xếp vào "Schema & Type Validation" nhưng dễ bị bỏ khi prompt không nêu header rõ ràng. |
| EXT-02 | Response time của request cập nhật trạng thái | < 1000 ms | Đặc điểm của prompt-based generation: AI sinh test theo *đặc tả chức năng*, không có khái niệm về ngưỡng phi chức năng nếu không được cung cấp SLA. |
| EXT-03 | Sau mỗi lần gọi, đọc lại `GET /api/orders/:id` và so trạng thái với `expected_final_status` — kể cả với case bị từ chối (401/404/400), trạng thái phải **không đổi** | trạng thái đúng như bảng dữ liệu | AI suy luận theo từng request độc lập nên dừng ở "status code + body". Nếu chỉ assert response, một API trả 200 mà không ghi xuống DB vẫn pass — false positive. Đây cũng là cách bắt side-effect ngoài ý muốn của các case âm tính. |
| EXT-04 | `{"status":"CONFIRMED"}` (viết hoa) trên đơn `pending` | 400 | AI liệt kê "giá trị ngoài tập" bằng một từ khác hẳn (`shipped`); nó không nghĩ tới biến thể hoa/thường của **đúng** giá trị hợp lệ — một lớp tương đương riêng về case sensitivity. |
| EXT-05 | Security headers của response | thiếu `X-Content-Type-Options: nosniff`; có `X-Powered-By: Express` (lộ stack); `Access-Control-Allow-Origin: *` trên endpoint admin | Guide xếp Security Headers vào nhóm "(mở rộng)", và prompt không yêu cầu → AI bỏ qua. Ghi nhận thành BUG-04. |

`EXT-01`, `EXT-02`, `EXT-03` đã được cài thành assertion chạy trong mọi iteration của Newman. `EXT-04`, `EXT-05` được kiểm chứng thủ công (bằng cURL) và ghi lại ở §7.

---

## 4. Bước 4 — Execute (Postman + Newman)

### 4.1 Khởi động provider

```bash
cd backend
npm install
node server.js        # server chạy tại http://localhost:3000
```

> `backend/package.json` không có script `dev`, nên dùng trực tiếp `node server.js`. Không sửa mã nguồn SUT trong bài này.

Kiểm tra:

```bash
curl http://localhost:3000/api/products/1
# → 200, sản phẩm iPhone 15 Pro Max
```

### 4.2 Cấu trúc collection

Collection `mini-order-status.postman_collection.json` gồm 6 request chạy tuần tự trong mỗi iteration:

| # | Request | Vai trò |
|---|---|---|
| 00 | `POST /api/login` (admin) | Lưu `adminToken` vào collection variable |
| 01 | `POST /api/login` (customer) | Lưu `customerToken` — phục vụ case phân quyền |
| 02 | `POST /api/checkout` | Tạo **đơn hàng mới** ở trạng thái `pending` → mỗi iteration độc lập, chạy lại bao nhiêu lần cũng cho kết quả như nhau |
| 03 | `PUT /api/admin/orders/{{orderId}}/status` | Dựng precondition. Bị `pm.execution.skipRequest()` khi cột `precondition_status` để trống |
| 04 | **`PUT /api/admin/orders/{{targetOrderId}}/status`** | **Request dưới kiểm thử.** Order id, token và body đều lấy từ iteration data |
| 05 | `GET /api/orders/{{orderId}}` | Xác minh trạng thái đã persist (EXT-03) |

Pre-request script cấp collection gắn header định danh cho mọi request:

```js
pm.request.headers.upsert({
  key: "X-Student-Id",
  value: pm.environment.get("studentId"),
});
```

> Toàn bộ script được bọc trong IIFE `(function () { ... })();`. Postman/Newman dùng chung một scope cho tất cả iteration, nên khai báo `const` ở top-level sẽ ném `SyntaxError: Identifier has already been declared` ngay từ iteration thứ 2.

### 4.3 Iteration data — 5 test case

`mini-order-status.data.json` chọn 5 case từ danh sách đã audit + tự bổ sung, phủ cả positive lẫn negative:

| Iteration | tc_id | Nguồn | Nội dung | `expected_status` |
|---|---|---|---|---|
| 1 | RUN-01 | AI-01 | `pending → confirmed` (happy path) | 200 |
| 2 | RUN-02 | AI-02 | `confirmed → shipping` (dùng precondition) | 200 |
| 3 | RUN-03 | AI-06 | `pending → shipping` (nhảy cóc trạng thái) | 400 |
| 4 | RUN-04 | AI-13 | `orderId = 999999` | 404 |
| 5 | RUN-05 | AI-10 | Không gửi `Authorization` | 401 |

Mỗi iteration chạy 5 assertion trên request dưới kiểm thử (status code, `Content-Type`, response time, JSON Schema, nội dung `message`/`error`) + 2 assertion xác minh persist.

Assertion đều đọc kỳ vọng từ data file, không hard-code:

```js
pm.test(`[MINI][${tc}] Functional: status code is ${expectedStatus}`, function () {
  pm.response.to.have.status(expectedStatus);
});
```

### 4.4 Chạy Newman

```bash
newman run mini-api-testing/mini-order-status.postman_collection.json \
  --environment mini-api-testing/mini-local.postman_environment.json \
  --iteration-data mini-api-testing/mini-order-status.data.json \
  --reporters cli,json \
  --reporter-json-export mini-api-testing/mini-newman-report.json
```

Kết quả (chạy local, Newman 6.2.2 / Node 20.19.4):

| | executed | failed |
|---|---|---|
| iterations | 5 | 0 |
| requests | 26 | 0 |
| test-scripts | 26 | 0 |
| prerequest-scripts | 45 | 0 |
| **assertions** | **66** | **0** |

> 26 request thay vì 30 vì request `03 Setup` bị skip ở 4/5 iteration (chỉ RUN-02 cần precondition).

**Checkpoint:**

- [x] Đúng 5 iteration.
- [x] Không có assertion fail (66/66 pass).
- [x] `mini-newman-report.json` tồn tại.
- [x] Mọi request trong report đều mang header `X-Student-Id: 23127300` (kiểm tra bằng cách đọc `run.executions[*].request.header` trong file report).

---

## 5. Bước 5 — CI/CD

Workflow: `.github/workflows/newman-api-test.yml`, chạy trên `push` vào `feature/**`.

Các bước: checkout → `setup-node@v4` (Node 20) → `npm install` cho backend → cài Newman → khởi động provider nền → poll `GET /api/products/1` tối đa 30s → chạy Newman với data file → upload `mini-newman-report.json` làm artifact (`if: always()`) → dừng provider.

| Commit | Mục đích | Ảnh |
|---|---|---|
| C1 | Pipeline pass — toàn bộ assertion xanh | `ci-pass.png` |
| C2 | Fail có chủ đích — sửa `expected_status` của RUN-01 từ `200` thành `999` | `ci-fail.png` |
| C3 | Khôi phục `expected_status` về `200`, pipeline trở lại pass | — |

---

## 6. Bước 6 — Postman features

| Feature | Đã dùng? | Ghi chú |
|---|---|---|
| Collections | Có | `mini-order-status.postman_collection.json`, 6 request chạy tuần tự trong 1 collection. |
| Environment variables | Có | `baseUrl`, `studentId`, thông tin đăng nhập của 2 tài khoản — tách khỏi collection để đổi môi trường không phải sửa collection. |
| Collection variables | Có | `adminToken`, `customerToken`, `orderId`, `targetOrderId` — biến động, sinh ra trong lúc chạy. |
| Pre-request scripts | Có | Cấp collection: gắn `X-Student-Id`. Cấp request: chọn order id và gắn `Authorization` theo cột `auth`; `skipRequest()` cho bước dựng precondition. |
| Test scripts (assertions) | Có | 66 assertion: status code, `Content-Type`, response time, `pm.response.to.have.jsonSchema()`, nội dung lỗi, và trạng thái đã persist. |
| Data-driven runs (Collection Runner + data file) | Có | 5 iteration đọc từ `mini-order-status.data.json` qua `pm.iterationData.get()`. |
| Newman CLI | Có | Chạy local và trong GitHub Actions, xuất `mini-newman-report.json`. |
| Monitors | Không | Monitor chạy trên Postman Cloud, cần endpoint public; SUT chỉ chạy ở `localhost:3000`. Vai trò chạy định kỳ đã do GitHub Actions đảm nhiệm. |
| Mock servers | Không | Provider thật đã chạy được local nên không cần mock; bài này kiểm thử hành vi thật của provider, không phải contract giữa 2 service. |
| Workspaces | Không | Bài làm cá nhân, artifact chia sẻ qua Git repository thay vì Postman workspace. |

Đã dùng 7/10 feature (yêu cầu tối thiểu 6).

---

## 7. Lỗi phát hiện được

| ID | Mức độ | Mô tả | Bằng chứng |
|---|---|---|---|
| BUG-01 | Cao | **Đơn đã hủy có thể chuyển thành `delivered`.** Đặc tả coi `canceled` là trạng thái kết thúc, nhưng API chấp nhận `canceled → delivered`. | Tạo đơn → `{"status":"canceled"}` → 200. Gọi tiếp `{"status":"delivered"}` → `HTTP 200 {"message":"Order status updated"}`. `GET /api/orders/:id` xác nhận `"status":"delivered"`. Mọi cạnh khác rời `canceled` đều trả 400. |
| BUG-02 | Cao | **Endpoint admin không kiểm tra role.** Bất kỳ tài khoản đã đăng nhập nào cũng cập nhật được trạng thái của đơn hàng bất kỳ, kể cả đơn không thuộc về mình. | Đăng nhập `test@eshop.com` (role `user`), gọi `PUT /api/admin/orders/3/status` với `{"status":"confirmed"}` → `HTTP 200`. `GET /api/orders/3` xác nhận trạng thái đã đổi. Kỳ vọng: `403`. |
| BUG-03 | Thấp | **Thông báo lỗi không phân biệt "thiếu field" với "chuyển trạng thái sai", và lặp lại nguyên văn input.** | Body `{}` → `400 {"error":"Invalid state transition from pending to undefined"}`. Body `{"status":"confirmed'; DROP TABLE orders; --"}` → `400` với payload nằm nguyên trong `error`. Không có 5xx và dữ liệu không bị ảnh hưởng, nhưng phản chiếu input thô là thói quen rủi ro. |
| BUG-04 | Thấp | **Thiếu security header.** Response không có `X-Content-Type-Options: nosniff`, để lộ `X-Powered-By: Express`, và trả `Access-Control-Allow-Origin: *` trên endpoint quản trị. | `curl -D -` trên response 200 của endpoint. |

BUG-01 và BUG-02 **không** được đưa vào 5 iteration của Newman, vì checkpoint Bước 4 yêu cầu pipeline xanh. Chúng được ghi nhận ở đây kèm bằng chứng tái hiện; nếu đưa vào collection, hai case này sẽ đỏ cho tới khi SUT được sửa.

---

## 8. Khai báo sử dụng AI

| Bước | Vai trò của AI | Vai trò của sinh viên |
|---|---|---|
| Bước 1 | Sinh 17 test case từ prompt có cấu trúc | Viết prompt, thu thập request/response thật bằng cURL để đưa vào prompt |
| Bước 2 | — | Chạy thật từng case, gắn nhãn, phát hiện 2 `INVALID` + 1 `INCOMPLETE` và sửa |
| Bước 3 | — | Bổ sung 5 test case AI bỏ sót |
| Bước 4–6 | Hỗ trợ viết script | Thiết kế cấu trúc collection, dữ liệu iteration, workflow CI, và xác minh kết quả chạy |
