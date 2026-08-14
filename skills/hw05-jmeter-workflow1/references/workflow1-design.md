# Workflow 1 Design Reference

## Nguồn bài

- SUT: EShop backend API, base URL mặc định `http://localhost:3000`.
- Account seed: `test@eshop.com` / `Test1234!`; chỉ dùng cho smoke hoặc tải thấp.
- `POST /api/register` đã được smoke test trực tiếp và hoạt động qua backend API. Dùng register để tạo account/CSV trước khi chạy, nhưng không đưa register vào measured workflow chính vì workflow 1 là người dùng có sẵn mua hàng lần đầu.

## Endpoint và payload

### 1. Login

`POST /api/login`

```json
{
  "email": "${email}",
  "password": "${password}"
}
```

Extract `token` từ JSON response bằng JSONPath `$.token`.

### 2. Categories

`GET /api/categories`

Không cần auth.

### 3. Search products

`GET /api/products?search=${keyword}`

Không cần auth. Encode keyword nếu có dấu/khoảng trắng.

### 4. Product detail

`GET /api/products/${productId}`

Không cần auth.

### 5. Add cart

`POST /api/cart`

Header:

```text
Authorization: Bearer ${token}
Content-Type: application/json
```

Body:

```json
{
  "id": ${productId},
  "name": "${productName}",
  "price": ${productPrice},
  "quantity": ${quantity}
}
```

Nếu SUT bắt buộc `name`/`price` khớp sản phẩm thật, smoke test trước và thay bằng dữ liệu seed thực tế trong CSV hoặc JMX.

### 6. Checkout

`POST /api/checkout`

Header:

```text
Authorization: Bearer ${token}
Content-Type: application/json
```

Body:

```json
{
  "total_amount": ${totalAmount},
  "shipping_address": "${shippingAddress}"
}
```

Theo đặc tả, backend phải tự tính lại tổng tiền; trong report ghi rõ đây là điểm cần chú ý khi đọc kết quả.

## Listener phân biệt theo đề

Ba test plan bắt buộc không lặp listener/report type:

- Load: Summary Report.
- Stress: Aggregate Report.
- Spike: View Results Tree, chỉ dùng để debug hoặc tải thấp vì listener này tốn tài nguyên.

HTML dashboard vẫn xuất cho mọi scenario từ raw `.jtl`.

## Kết quả smoke test API đã biết

Với account tạo bằng `POST /api/register` và sản phẩm seed `id=1`:

- `POST /api/register`: `200 OK`, tạo user.
- `POST /api/login`: `200 OK`, trả `token`.
- `GET /api/categories`: `200 OK`.
- `GET /api/products?search=phone`: `200 OK`.
- `GET /api/products/1`: `200 OK`, `name=iPhone 15 Pro Max`, `price=30000000`.
- `POST /api/cart`: `200 OK` với body dùng `productName` và `productPrice` thật.
- `GET /api/cart`: `200 OK`.
- `POST /api/checkout`: `200 OK`, trả `orderId`.

## Human review checklist

- Đúng tên file.
- Đúng workflow và mapping ba nhóm endpoint.
- Có CSV Data Set Config, không hard-code toàn bộ dữ liệu.
- Có HTTP Header Manager cho JSON và Authorization.
- Có JSON Extractor lấy token.
- Có assertion hợp lý cho status/token.
- Có timer phù hợp từng scenario.
- Có ghi chú account lockout 3 lần fail/30 giây.
- Có kế hoạch giảm VU nếu máy local yếu.
