# Test Design – API `GET /api/products`

> **Sinh viên:** `2312464 - Trần Minh Quang`
> **API đã chọn:** #1 – `GET /api/products` (Lấy danh sách sản phẩm, hỗ trợ `?search=<keyword>`)

---

## Bước 1 – Generate with AI

### 1.1 Prompt gửi cho AI

```
Tôi đang kiểm thử API `GET /api/products` của hệ thống EShop. Đây là thông tin chi tiết về API:

**Endpoint:** GET /api/products
**Base URL:** http://localhost:3000
**Mô tả:** Lấy danh sách tất cả sản phẩm. Hỗ trợ tìm kiếm qua query string `?search=<keyword>`.
**Authentication:** Không yêu cầu (public API).

**Request:**
- Method: GET
- Query parameters (tùy chọn): `search` – từ khóa tìm kiếm sản phẩm theo tên

**Response thành công (200 OK):**
- Body: Mảng JSON chứa các object sản phẩm
- Mỗi sản phẩm có các fields: `id` (integer), `name` (string), `price` (integer), `description` (string), `imageUrl` (string), `category_id` (integer)

**Response mẫu:**
[
  {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "price": 30000000,
    "description": "Điện thoại cao cấp của Apple",
    "imageUrl": "https://placehold.co/300x300/png?text=iPhone+15",
    "category_id": 1
  }
]

**Dữ liệu seed có sẵn (5 sản phẩm):**
1. iPhone 15 Pro Max (price: 30,000,000, category_id: 1)
2. Samsung Galaxy S24 Ultra (price: 28,000,000, category_id: 1)
3. MacBook Pro M3 (price: 45,000,000, category_id: 2)
4. Tai nghe AirPods Pro 2 (price: 6,000,000, category_id: 3)
5. Bàn phím cơ Keychron Q1 (price: 4,000,000, category_id: 3)

**Đặc điểm kỹ thuật cần lưu ý:**
- Khi không có `search`, trả về toàn bộ sản phẩm
- Khi có `search`, tìm kiếm theo LIKE '%keyword%' trên trường name
- Khi search không khớp, trả về mảng rỗng []
- API không có pagination

Hãy đề xuất >= 12 test case bao phủ các hướng sau:
1. **Domain partitions:** Giá trị hợp lệ, không hợp lệ, biên của tham số `search`
2. **Security:** SQL injection, XSS qua tham số search
3. **Schema validation:** Response body chứa đúng các fields theo đặc tả

Mỗi test case trả về theo format bảng với các cột:
- `tc_id`: Mã test case (AI-01, AI-02, ...)
- `input`: Mô tả input (URL đầy đủ hoặc query string)
- `expected_status`: HTTP status code mong đợi
- `expected_fields`: Các fields/điều kiện cần kiểm tra trong response
- `rationale`: Lý do thiết kế test case này
```

### 1.2 AI Output – Danh sách Test Case (14 test case)

| tc_id | input | expected_status | expected_fields | rationale |
|:---|:---|:---|:---|:---|
| AI-01 | `GET /api/products` (không có search) | 200 | Response là mảng, length = 5, mỗi phần tử có `id`, `name`, `price`, `description`, `imageUrl`, `category_id` | **Domain – Valid (no filter):** Kiểm tra trường hợp cơ bản nhất – lấy toàn bộ danh sách sản phẩm khi không truyền tham số |
| AI-02 | `GET /api/products?search=iPhone` | 200 | Response là mảng, length >= 1, mỗi phần tử chứa "iPhone" trong `name` | **Domain – Valid (keyword match):** Kiểm tra tìm kiếm với keyword hợp lệ, khớp 1 sản phẩm |
| AI-03 | `GET /api/products?search=Pro` | 200 | Response là mảng, length >= 2 (iPhone 15 Pro Max, MacBook Pro M3, AirPods Pro 2) | **Domain – Valid (partial match):** Kiểm tra tìm kiếm trả về nhiều kết quả khi keyword xuất hiện trong nhiều tên sản phẩm |
| AI-04 | `GET /api/products?search=NonExistentProduct12345` | 200 | Response là mảng rỗng `[]`, length = 0 | **Domain – Valid (no match):** Kiểm tra khi keyword không khớp bất kỳ sản phẩm nào, trả về mảng rỗng |
| AI-05 | `GET /api/products?search=` (chuỗi rỗng) | 200 | Response là mảng, length = 5 (giống khi không có search, vì LIKE '%%' match all) | **Boundary – Empty string:** Kiểm tra hành vi khi search là chuỗi rỗng – SQL LIKE '%%' sẽ match tất cả |
| AI-06 | `GET /api/products?search=i` | 200 | Response là mảng, length >= 1, tên sản phẩm chứa ký tự "i" | **Boundary – Single character:** Kiểm tra tìm kiếm với keyword chỉ 1 ký tự |
| AI-07 | `GET /api/products?search=iPhone 15 Pro Max` | 200 | Response là mảng, length >= 1, chứa sản phẩm có tên chính xác | **Boundary – Full name match:** Kiểm tra tìm kiếm với tên đầy đủ của sản phẩm |
| AI-08 | `GET /api/products?search=iphone` | 200 | Response là mảng (kiểm tra case-insensitive – SQLite LIKE mặc định case-insensitive cho ASCII) | **Domain – Case sensitivity:** Kiểm tra tìm kiếm không phân biệt hoa/thường |
| AI-09 | `GET /api/products?search=' OR '1'='1` | 200 hoặc 500 | Kiểm tra server không trả về tất cả sản phẩm một cách bất thường hoặc trả lỗi | **Security – SQL Injection (basic):** Kiểm tra API có lỗ hổng SQL injection qua tham số search |
| AI-10 | `GET /api/products?search='; DROP TABLE products; --` | 200 hoặc 500 | Server không bị crash, bảng products không bị xóa | **Security – SQL Injection (destructive):** Kiểm tra payload injection phá hoại |
| AI-11 | `GET /api/products?search=<script>alert('XSS')</script>` | 200 | Response là mảng (có thể rỗng), response body không chứa script tag chưa escape | **Security – XSS:** Kiểm tra API không phản hồi lại nội dung script chưa được mã hóa |
| AI-12 | `GET /api/products?search=aaaa...` (chuỗi 1000 ký tự) | 200 | Response là mảng rỗng `[]`, server không timeout hoặc crash | **Boundary – Very long string:** Kiểm tra server xử lý ổn định với input cực dài |
| AI-13 | `GET /api/products` – Schema validation | 200 | Mỗi phần tử trong mảng phải có đúng 6 fields: `id` (number), `name` (string), `price` (number), `description` (string), `imageUrl` (string), `category_id` (number) | **Schema validation:** Kiểm tra cấu trúc dữ liệu trả về đúng theo đặc tả API |
| AI-14 | `GET /api/products?search=%` | 200 | Response là mảng, kiểm tra hành vi khi dùng ký tự SQL wildcard `%` | **Boundary – SQL wildcard:** Kiểm tra hành vi khi truyền ký tự wildcard trong SQL LIKE |

---

## Bước 2 – Audit (Human Review)

Đánh giá toàn bộ 14 test case AI đề xuất:

| TC | Nhãn | Nhận xét hoặc chỉnh sửa |
|:---|:---|:---|
| AI-01 | **VALID** | Test case cơ bản và cần thiết. Kiểm tra đúng trường hợp lấy toàn bộ danh sách, expected đúng (200, 5 sản phẩm). |
| AI-02 | **VALID** | Keyword "iPhone" chỉ khớp 1 sản phẩm, expected hợp lý. Assertion kiểm tra tên chứa keyword là đúng cách. |
| AI-03 | **INCOMPLETE** | Expected nói length >= 2 nhưng thực tế "Pro" xuất hiện trong 3 sản phẩm (iPhone 15 **Pro** Max, MacBook **Pro** M3, AirPods **Pro** 2) → nên sửa thành length = 3. **Đã sửa:** expected_fields = "Response là mảng, length = 3". |
| AI-04 | **VALID** | Trường hợp không tìm thấy kết quả, expected đúng (200, mảng rỗng). Keyword đủ dài để chắc chắn không khớp. |
| AI-05 | **VALID** | Phân tích đúng: `LIKE '%%'` match tất cả nên trả về 5 sản phẩm. Giả định hợp lý dựa trên source code. |
| AI-06 | **VALID** | Kiểm tra boundary 1 ký tự hữu ích. SQLite LIKE case-insensitive nên "i" sẽ match nhiều sản phẩm. |
| AI-07 | **VALID** | Kiểm tra tìm kiếm với tên đầy đủ, bao gồm dấu cách trong URL (URL encoding). |
| AI-08 | **VALID** | Kiểm tra case-sensitivity quan trọng. SQLite LIKE mặc định case-insensitive cho ASCII nên "iphone" sẽ match "iPhone". |
| AI-09 | **INCOMPLETE** | Expected nói "200 hoặc 500" quá mơ hồ. Từ source code, API dùng string interpolation → **có lỗ hổng SQL injection thật**. Payload `' OR '1'='1` sẽ khiến query thành `LIKE '%' OR '1'='1%'` → trả về tất cả sản phẩm với status 200. **Đã sửa:** expected_status = 200, expected_fields = "Response là mảng, length = 5 (tất cả sản phẩm bị lộ do SQL injection)". |
| AI-10 | **VALID** | Quan trọng để kiểm tra SQL injection phá hoại. Tuy nhiên trong thực tế SQLite không hỗ trợ multi-statement qua `db.all()` nên DROP TABLE sẽ không thực thi, nhưng vẫn cần test để xác nhận. |
| AI-11 | **VALID** | Test XSS qua search parameter. API trả JSON nên XSS risk thấp hơn, nhưng kiểm tra là cần thiết. |
| AI-12 | **VALID** | Boundary test quan trọng. Server không nên crash với input cực dài. |
| AI-13 | **VALID** | Schema validation cần thiết. Kiểm tra đúng 6 fields và đúng kiểu dữ liệu. |
| AI-14 | **VALID** | Kiểm tra SQL wildcard `%` là edge case hay. Vì source code dùng `'%${searchQuery}%'`, search=% sẽ thành `'%%%'` → match tất cả. |

**Tổng kết audit:**
- **VALID:** 12/14 test case
- **INCOMPLETE:** 2/14 (AI-03 và AI-09 đã sửa)
- **INVALID:** 0/14

---

## Bước 3 – Extend (Bổ sung test case)

Bổ sung 2 test case mà AI đã bỏ sót:

### EXT-01: Response Header Content-Type validation

| Thuộc tính | Giá trị |
|:---|:---|
| **tc_id** | EXT-01 |
| **input** | `GET /api/products` |
| **expected_status** | 200 |
| **expected_fields** | Response header `Content-Type` phải chứa `application/json` |
| **rationale** | Kiểm tra response header đúng chuẩn REST API. Đặc biệt quan trọng vì source code có bug: khi search gây lỗi SQL, server trả HTML (`<h1>Database Error</h1>`) thay vì JSON → Content-Type sẽ không phải `application/json`. |

**Lý do AI bỏ sót:** AI thường tập trung vào response body và status code, ít chú ý đến response headers. Đây là hạn chế phổ biến khi AI sinh test case – nó bỏ qua các khía cạnh non-functional của API.

### EXT-02: Response Time validation

| Thuộc tính | Giá trị |
|:---|:---|
| **tc_id** | EXT-02 |
| **input** | `GET /api/products` |
| **expected_status** | 200 |
| **expected_fields** | Response time < 2000ms |
| **rationale** | Kiểm tra hiệu năng cơ bản – API lấy danh sách sản phẩm phải phản hồi trong thời gian chấp nhận được (dưới 2 giây). |

**Lý do AI bỏ sót:** AI chỉ tập trung vào tính đúng đắn (correctness) của response mà bỏ qua yếu tố hiệu năng (performance). Kiểm tra response time là yêu cầu non-functional quan trọng trong API testing thực tế.

---

## Bước 6 – Postman Features

Bảng liệt kê các Postman features đã sử dụng trong bài:

| Feature | Đã dùng? | Ghi chú |
|:---|:---|:---|
| Collections | Có | Tạo collection `Mini Products API Test` chứa request GET /api/products với pre-request script và test assertions. |
| Environment variables | Có | Sử dụng biến `baseUrl` (http://localhost:3000) và `studentId` (2312464) trong environment `Local Environment`. |
| Collection variables | Không | Không cần dùng vì đã dùng environment variables và iteration data. |
| Pre-request scripts | Có | Sử dụng để tự động thêm header `X-Student-Id` và xây dựng URL động dựa trên dữ liệu từ data file (có/không có search query). |
| Test scripts (assertions) | Có | Viết 7 assertions cho mỗi iteration: status code, Content-Type, response time, array check, length, name filter, schema validation. |
| Data-driven runs (Collection Runner + data file) | Có | Sử dụng file `mini-products.data.json` chứa 5 test case, chạy 5 iterations tự động với các input khác nhau. |
| Newman CLI | Có | Chạy collection từ command line với Newman, export report JSON để tích hợp CI/CD. |
| Monitors | Không | Không cần thiết cho bài thực hành này vì chỉ chạy test một lần, không cần lên lịch giám sát định kỳ. |
| Mock servers | Không | Không cần vì đã có backend server thật (eshop-sut) để test. |
| Workspaces | Có | Sử dụng workspace cá nhân trong Postman Desktop để tổ chức collection và environment. |

**Tổng: 7/10 features đã sử dụng** (đạt yêu cầu tối thiểu 6 features).
