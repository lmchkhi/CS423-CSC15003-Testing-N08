<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-009.md -->

# TC-FR05-DT-009: UI-2: Card sản phẩm hiển thị đầy đủ Ảnh + Tên + Giá (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type       | Domain / Constraints          |
| -------------------- | ---------- | ----------------------------- |
| product_card_content | UI Content | Ảnh + Tên + Giá trên mỗi card |

### Domain Matrix

| TC     | Yêu cầu kiểm tra                                                                                           | Expected                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| DT-009 | FR-05 - Mỗi sản phẩm hiển thị: Ảnh (tỷ lệ chuẩn, có alt text), Tên sản phẩm, Giá (₫, phân cách hàng nghìn) | ✅ Mỗi product card có đầy đủ 3 thành phần: ảnh sản phẩm, tên sản phẩm, giá sản phẩm |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất 1 sản phẩm trong hệ thống với đầy đủ thông tin (ảnh, tên, giá)

## Test data

| Field | Value                 |
| ----- | --------------------- |
| URL   | http://localhost:5173 |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`
2. Chờ trang tải hoàn tất và danh sách sản phẩm hiển thị đầy đủ
3. Chọn bất kỳ một product card trên trang chủ để kiểm tra
4. Kiểm tra product card có chứa thẻ `<img>` với thuộc tính `src` hợp lệ (URL ảnh không bị lỗi 404)
5. Kiểm tra ảnh sản phẩm hiển thị đúng tỷ lệ, không bị méo hoặc vỡ
6. Kiểm tra product card có hiển thị tên sản phẩm (text không rỗng)
7. Kiểm tra product card có hiển thị giá sản phẩm (có ký hiệu ₫ và/hoặc số tiền)
8. Lặp lại bước 3–7 cho ít nhất 3 product card khác nhau để đảm bảo tính nhất quán
9. Nhấn F12 mở DevTools → tab Elements → Inspect cấu trúc HTML của product card để xác nhận có đủ 3 thành phần

## Expected result

- Mỗi product card hiển thị đầy đủ 3 thành phần: ảnh sản phẩm, tên sản phẩm, giá sản phẩm
- Thẻ `<img>` có thuộc tính `src` hợp lệ, ảnh hiển thị đúng tỷ lệ không bị méo
- Tên sản phẩm hiển thị rõ ràng, không bị rỗng
- Giá sản phẩm hiển thị với ký hiệu tiền tệ ₫
- Tất cả các product card trên trang có cấu trúc nhất quán

## Actual result

- Mỗi product card hiển thị đầy đủ 3 thành phần: ảnh sản phẩm, tên sản phẩm, giá sản phẩm
- Thẻ `<img>` có thuộc tính `src` hợp lệ, ảnh hiển thị đúng tỷ lệ không bị méo
- Tên sản phẩm hiển thị rõ ràng, không bị rỗng
- Giá sản phẩm hiển thị với ký hiệu tiền tệ 'VND'
- Tất cả các product card trên trang có cấu trúc nhất quán

## Status

FAILED
