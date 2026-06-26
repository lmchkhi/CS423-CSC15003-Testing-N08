<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-012.md -->

# TC-FR05-DT-012: UI-6: Trang chủ có đúng 1 thẻ h1 (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable     | Type          | Domain / Constraints       |
| ------------ | ------------- | -------------------------- |
| h1_tag_count | DOM Structure | Số lượng thẻ h1 trên trang |

### Domain Matrix

| TC     | Yêu cầu kiểm tra                                                    | Expected                      |
| ------ | ------------------------------------------------------------------- | ----------------------------- |
| DT-012 | FR-05 + FR-21 - Mỗi trang có đúng 1 thẻ `<h1>` mô tả nội dung trang | ✅ DOM chứa đúng 1 element h1 |

## Preconditions

- Hệ thống EShop đang hoạt động
- Trình duyệt hỗ trợ DevTools Console (Chrome, Firefox, Edge)

## Test data

| Field | Value                 |
| ----- | --------------------- |
| URL   | http://localhost:5173 |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`
2. Chờ trang tải hoàn tất và danh sách sản phẩm hiển thị đầy đủ
3. Nhấn F12 để mở DevTools
4. Chuyển sang tab **Console**
5. Nhập lệnh sau vào Console và nhấn Enter:
   ```javascript
   document.querySelectorAll("h1").length;
   ```
6. Kiểm tra kết quả trả về có bằng `1`
7. Nhập lệnh sau để kiểm tra nội dung thẻ h1:
   ```javascript
   document.querySelector("h1").textContent;
   ```
8. Kiểm tra nội dung thẻ `<h1>` có mô tả đúng nội dung trang (ví dụ: "Danh sách sản phẩm", "Trang chủ", hoặc tương tự)
9. Xác nhận nội dung h1 không rỗng và có ý nghĩa mô tả nội dung trang

## Expected result

- Lệnh `document.querySelectorAll('h1').length` trả về kết quả bằng `1`
- Trang chủ chỉ chứa đúng 1 thẻ `<h1>` duy nhất
- Nội dung thẻ `<h1>` mô tả đúng nội dung trang, không rỗng
- Tuân thủ tiêu chuẩn SEO và accessibility: mỗi trang chỉ có 1 heading cấp cao nhất

## Actual result

- Lệnh `document.querySelectorAll('h1').length` trả về kết quả bằng `2`
- Trang chủ chứa 2 thẻ `<h1>` thay vì chỉ 1
- Nội dung thẻ `<h1>` không mô tả đúng nội dung trang, có thể gây nhầm lẫn cho người dùng và công cụ tìm kiếm

## Status / Related bugs

FAILED
