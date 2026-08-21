---
title: "[BUG][FR-05] SQL injection qua query parameter search"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

FR05-SEC-001, FR05-SEC-002, FR05-SEC-004, FR05-H05

## Requirement liên quan

FR-05, SEC-05

## Severity / Priority

Critical / P0

## Environment

- OS: Windows 11
- Node.js: v22.18.0
- SUT: http://localhost:3000
- Newman: 6.2.2
- Student ID: 23127464

## Steps to reproduce

1. Tautology — FR05-SEC-001

Payload thô:

```text
' OR '1'='1' --
```

Giá trị URL-encoded:

```text
%27%20OR%20%271%27%3D%271%27%20--
```

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/products?search=%27%20OR%20%271%27%3D%271%27%20--"
```

Quan sát: response trả toàn bộ sản phẩm baseline, chứng minh tautology đã mở rộng kết quả tìm kiếm.

2. UNION injection — FR05-SEC-002

Payload thô:

```text
%' UNION SELECT 9999,'FR05-UNION-MARKER',1,'x','y',1 --
```

Giá trị URL-encoded:

```text
%25%27%20UNION%20SELECT%209999%2C%27FR05-UNION-MARKER%27%2C1%2C%27x%27%2C%27y%27%2C1%20--
```

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/products?search=%25%27%20UNION%20SELECT%209999%2C%27FR05-UNION-MARKER%27%2C1%2C%27x%27%2C%27y%27%2C1%20--"
```

Quan sát: response chứa hàng do payload chèn vào với `id: 9999` và tên `FR05-UNION-MARKER`.

3. Dấu nháy đơn làm lộ lỗi — FR05-SEC-004

Payload thô là một dấu nháy đơn (`'`); giá trị URL-encoded là `%27`.

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/products?search=%27"
```

Quan sát: server trả HTTP 500 với nội dung chứa `Database Error`, `SQLITE_ERROR` và chi tiết lỗi cú pháp SQLite.

4. Null byte — FR05-H05

Payload thô chứa byte null giữa `test` và `admin`; biểu diễn URL-encoded là `test%00admin`.

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/products?search=test%00admin"
```

Quan sát: server trả HTTP 500 và response làm lộ lỗi database liên quan đến null character. Request kiểm tra sau đó cho thấy server chưa crash, nhưng input vẫn gây lỗi nội bộ và information exposure.

## Expected result

- `search` phải được xử lý như dữ liệu, không được làm thay đổi cấu trúc câu SQL.
- Truy vấn cơ sở dữ liệu phải dùng parameterized query theo SEC-05.
- Input gây lỗi không được làm lộ thông tin database, câu SQL hoặc chi tiết lỗi nội bộ.
- Contract không định nghĩa exact rejection status code hoặc error schema, nên báo cáo không tự đặt oracle cho các chi tiết đó.

## Actual result

- Tautology làm truy vấn trả toàn bộ sản phẩm.
- UNION cho phép chèn dữ liệu tùy ý vào response.
- Dấu nháy đơn và null byte gây HTTP 500, làm lộ `SQLITE_ERROR`/database detail.
- SQL injection đã thành công và thông tin nội bộ của database bị lộ.

## Evidence

- Final run: `tests/api-testing/evidence/fr-05/20260821-223004/`
- Newman console: `tests/api-testing/evidence/fr-05/20260821-223004/newman-main-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-05/20260821-223004/newman-main-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-05/20260821-223004/newman-main-report.html`
- Execution metadata: `tests/api-testing/evidence/fr-05/20260821-223004/execution-metadata.json`
- Phase D analysis: `reports/api-testing/fr-05-phase-d-execution-analysis.md`
- Kết quả final: 45 test case, 119 assertion, 11 assertion thất bại trong 10 test case; các ca SQL injection vẫn tái hiện lỗi.

| Test case | Biểu hiện được xác nhận |
|---|---|
| `FR05-SEC-001` | Tautology trả toàn bộ sản phẩm baseline. |
| `FR05-SEC-002` | UNION chèn hàng tùy ý vào response. |
| `FR05-SEC-004` | Dấu nháy đơn gây HTTP 500 và lộ `SQLITE_ERROR`. |
| `FR05-H05` | Null byte gây HTTP 500 và lộ database detail. |

## Root cause

Tại `src/eshop-sut/backend/server.js:141-150`, endpoint lấy `req.query.search` rồi ghép trực tiếp giá trị này vào SQL:

```js
app.get("/api/products", (req, res) => {
  const searchQuery = req.query.search;
  if (searchQuery) {
    const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;
    db.all(query, [], (err, rows) => {
      if (err)
        return res
          .status(500)
          .send(`<h1>Database Error</h1><p>${err.message}</p>`);
      res.json(rows);
    });
```

Root cause là template literal tại `server.js:144`:

```js
LIKE '%${searchQuery}%'
```

Thay vào đó, truy vấn cần bind giá trị bằng prepared statement/placeholder, ví dụ:

```js
db.all(
  "SELECT * FROM products WHERE name LIKE '%' || ? || '%'",
  [searchQuery],
  callback
);
```

Ngoài ra, handler tại `server.js:146-149` phản hồi trực tiếp `err.message`, gây information exposure khi payload tạo lỗi database.

## Impact

Kẻ tấn công không cần xác thực có thể thay đổi logic truy vấn, đọc/chèn dữ liệu tùy ý vào tập kết quả tùy khả năng của database/driver, dò cấu trúc database qua lỗi và làm endpoint trả lỗi nội bộ. Với các payload UNION phức tạp hơn, rủi ro có thể mở rộng sang làm lộ dữ liệu ngoài danh sách sản phẩm.
