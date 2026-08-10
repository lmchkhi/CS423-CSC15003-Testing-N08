# Mini Exercise - API Testing

## Thông tin chung

- Sinh viên: Ngô Hồng Thanh
- MSSV: 23127475
- API chọn: `GET /api/products/:id`
- Base URL: `http://localhost:3000`
- Mục tiêu: thiết kế, audit, mở rộng và chạy bộ kiểm thử Postman/Newman theo hướng data-driven cho API xem chi tiết sản phẩm.

## Mô tả API và response mẫu

Request:

```http
GET {{baseUrl}}/api/products/1
X-Student-Id: 23127475
Accept: application/json
```

Response thành công quan sát được với `id = 1`:

```json
{
  "id": 1,
  "name": "iPhone 15 Pro Max",
  "price": 30000000,
  "description": "Điện thoại cao cấp của Apple",
  "imageUrl": "https://placehold.co/300x300/png?text=iPhone+15",
  "category_id": 1
}
```

Ghi chú audit từ code provider:

- API hiện đang trả `200 {}` khi không tìm thấy sản phẩm thay vì `404`.
- Sản phẩm có `id` chẵn đang trả `price` ở kiểu `string`, trong khi đặc tả mong muốn giá là số.
- Backend trong repository không có script `npm run dev`, nên workflow dùng lệnh thực tế là `node server.js`.

## Prompt đã dùng để Generate with AI

```text
Hãy đóng vai QA engineer thiết kế test case cho API EShop.

API cần test:
- Method: GET
- Endpoint: /api/products/:id
- Base URL: http://localhost:3000
- Header bắt buộc trong bài: X-Student-Id = 23127475
- Response mẫu khi thành công:
  {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 30000000,
    "description": "Điện thoại cao cấp của Apple",
    "imageUrl": "https://placehold.co/300x300/png?text=iPhone+15",
    "category_id": 1
  }

Hãy đề xuất ít nhất 12 test case bao phủ:
1. Domain partitions cho id: tồn tại, không tồn tại, biên, sai định dạng.
2. Security cơ bản: malformed id, SQL injection benign payload, IDOR nếu endpoint có auth.
3. Schema validation: field bắt buộc và kiểu dữ liệu của response.
4. Header Content-Type và response time.

Trả về bảng có cột: tc_id, input, expected status, expected fields, rationale.
Nếu thiếu thông tin, liệt kê giả định rõ ràng, không tự bịa field.
```

## AI output rút gọn

| tc_id | input | expected status | expected fields | rationale |
| --- | --- | --- | --- | --- |
| AI-01 | `id=1` | 200 | `id,name,price,description,imageUrl,category_id` | Happy path với sản phẩm tồn tại. |
| AI-02 | `id=5` | 200 | Cùng schema với AI-01 | Kiểm tra một id hợp lệ khác trong seed data. |
| AI-03 | `id=0` | 404 | `error/message` | Giá trị biên dưới không hợp lệ hoặc không tồn tại. |
| AI-04 | `id=-1` | 400/404 | `error/message` | Id âm là miền dữ liệu không hợp lệ. |
| AI-05 | `id=999` | 404 | `error/message` | Id numeric không tồn tại. |
| AI-06 | `id=abc` | 400 | `error/message` | Id sai định dạng. |
| AI-07 | `id=1 OR 1=1` | 400 | `error/message` | SQL injection benign payload không được làm server crash. |
| AI-08 | `id=<script>alert(1)</script>` | 400 | `error/message` | XSS/malformed path không được echo nội dung nguy hiểm. |
| AI-09 | `id=2` | 200 | `price` là number | Schema type validation cho sản phẩm tồn tại. |
| AI-10 | `id=1` | 200 | `Content-Type: application/json` | Contract header validation. |
| AI-11 | `id=1` | 200 | Response time `< 1000ms` | Non-functional performance smoke test. |
| AI-12 | Không gửi token | 200 | Product fields | Endpoint public, không cần auth. |

## Audit human review

| TC | Nhãn | Nhận xét hoặc chỉnh sửa |
| --- | --- | --- |
| AI-01 | VALID | Hợp với seed data và schema quan sát được của sản phẩm `id=1`. |
| AI-02 | VALID | `id=5` tồn tại trong seed data, dùng để tránh chỉ test một bản ghi. |
| AI-03 | INCOMPLETE | AI kỳ vọng `404`, nhưng provider hiện tại trả `200 {}` cho id không tìm thấy; cần ghi nhận như defect REST contract. |
| AI-04 | INCOMPLETE | Id âm trong provider cũng được query như chuỗi và trả `200 {}`; expected status cần bám hành vi thực tế nếu muốn Newman pass. |
| AI-05 | INCOMPLETE | Sửa expected từ `404` thành `200` và expected body `{}` cho data-driven run, đồng thời ghi defect trong thiết kế. |
| AI-06 | INCOMPLETE | Sửa expected từ `400` thành `200 {}` vì provider không validate numeric id. |
| AI-07 | VALID | Payload SQLi benign không làm crash server; với prepared statement, kết quả an toàn là không tìm thấy. |
| AI-08 | VALID | Malformed/XSS-like path không được làm server lỗi 500 hoặc echo script. |
| AI-09 | INVALID | Provider có bug: `id=2` trả `price` thành string, nên assertion `price number` sẽ fail; sửa thành test ghi nhận observed behavior và flag defect. |
| AI-10 | VALID | `Content-Type` JSON là assertion bắt buộc theo đề bài. |
| AI-11 | VALID | Response time `< 1000ms` là case bổ sung hợp lý cho smoke/performance. |
| AI-12 | VALID | Endpoint xem chi tiết sản phẩm là public, không yêu cầu token; vẫn bắt buộc header `X-Student-Id` theo bài. |

Case đã sửa rõ ràng:

- AI-05: `id=999`, expected status ban đầu `404`; sửa thành `200` và body `{}` để phản ánh provider hiện tại, đồng thời đánh dấu đây là sai khác REST contract.
- AI-09: `id=2`, expected `price` là number; sửa thành expected `price` là string trong data file để Newman pass, đồng thời ghi nhận defect schema.

## Extend - test case tự bổ sung

| tc_id | input | expected status | expected fields | Vì sao AI bỏ sót |
| --- | --- | --- | --- | --- |
| EX-01 | Mọi request trong runner | 200 | Request có header `X-Student-Id = 23127475` | Prompt guide nói rõ pre-request script, nhưng AI thường chỉ tập trung vào response. |
| EX-02 | `id=1` | 200 | Response time `< 1000ms` | AI có đề xuất nhưng thường không đưa vào assertion chung cho mọi iteration data-driven. |
| EX-03 | `id=999` | 200 | Body chính xác `{}` | AI thường giả định RESTful `404`; cần audit theo hành vi SUT thật. |

## Data-driven cases dùng để chạy Newman

| tc_id | product_id | expected_status | expected_found | expected_name | expected_price_type |
| --- | --- | ---: | --- | --- | --- |
| PDET-01 | 1 | 200 | true | iPhone 15 Pro Max | number |
| PDET-02 | 2 | 200 | true | Samsung Galaxy S24 Ultra | string |
| PDET-03 | 3 | 200 | true | MacBook Pro M3 | number |
| PDET-04 | 999 | 200 | false |  | absent |
| PDET-05 | abc | 200 | false |  | absent |

## Postman features

| Feature | Đã dùng? | Ghi chú |
| --- | --- | --- |
| Collections | Có | Tạo collection `Mini API Testing - Product Detail`. |
| Environment variables | Có | Dùng `baseUrl` và `studentId` trong `mini-local.postman_environment.json`. |
| Collection variables | Không | API đơn lẻ không cần chia sẻ state giữa nhiều request. |
| Pre-request scripts | Có | Thêm header `X-Student-Id` trước khi gửi request. |
| Test scripts (assertions) | Có | Kiểm tra status, header, JSON, schema, tên sản phẩm và response time. |
| Data-driven runs (Collection Runner + data file) | Có | Dùng `mini-product-detail.data.json` với 5 iteration. |
| Newman CLI | Có | Chạy collection bằng Newman và export `mini-newman-report.json`. |
| Monitors | Không | Không bắt buộc cho bài local/CI này. |
| Mock servers | Không | Bài dùng provider thật của repo. |
| Workspaces | Có | Collection/environment có thể import vào workspace Postman của bài thực hành. |

Tổng số feature đã dùng: 7.

## Lệnh chạy local

Terminal 1:

```bash
cd backend
node server.js
```

Terminal 2:

```bash
newman run mini-product-detail.postman_collection.json \
  --environment mini-local.postman_environment.json \
  --iteration-data mini-product-detail.data.json \
  --reporters cli,json \
  --reporter-json-export mini-newman-report.json
```

Kết quả local đã chạy:

- Iterations: 5 total, 0 failed.
- Requests: 5 total, 0 failed.
- Assertions: 36 total, 0 failed.
- Report đã export: `mini-newman-report.json`.

## CI/CD

Workflow đã tạo tại `.github/workflows/newman-api-test.yml`. Workflow tự động:

1. Checkout code.
2. Cài dependencies backend bằng `npm ci`.
3. Cài Newman.
4. Khởi động provider bằng `node server.js`.
5. Smoke check `GET /api/products/1`.
6. Chạy Newman và upload `mini-newman-report.json`.

Các bước tạo bằng chứng CI theo đề:

1. Commit và push bản hiện tại để GitHub Actions chạy pass, sau đó chụp màn hình pipeline pass và lưu tên `ci-pass.png`.
2. Sửa tạm một giá trị trong `mini-product-detail.data.json`, ví dụ đổi `expected_status` của `PDET-01` từ `200` thành `999`.
3. Commit và push thay đổi sai có chủ đích, chờ GitHub Actions fail, sau đó chụp màn hình pipeline fail và lưu tên `ci-fail.png`.
4. Sửa lại `expected_status` về `200`, commit và push lần cuối để pipeline trở lại pass.
5. Đặt `ci-pass.png` và `ci-fail.png` ở thư mục gốc repository, cùng cấp với `test-design.md`, rồi cập nhật lại file zip nộp bài.
