# Main Report

## FR-01: Đăng ký tài khoản

### Mô tả yêu cầu

- Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
- Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
- Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
- Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường            | Kiểu dữ liệu | Ràng buộc                                                                                       |
|--------|-----------------------|---------------|--------------------------------------------------------------------------------------------------|
| Input  | Họ Tên                | String        | Bắt buộc nhập, không được để trống                                                               |
| Input  | Email                 | String        | Bắt buộc nhập, định dạng hợp lệ (user@domain.com), duy nhất trong hệ thống                      |
| Input  | Mật khẩu              | String        | Bắt buộc nhập, tối thiểu 8 ký tự, ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt     |
| Input  | Xác nhận mật khẩu     | String        | Bắt buộc nhập, phải khớp với trường Mật khẩu                                                     |
| Output | Đăng ký thành công     | Hành vi       | Chuyển hướng tới trang Đăng nhập                                                                 |
| Output | Đăng ký thất bại       | Hành vi       | Hiển thị thông báo lỗi tương ứng, giữ nguyên trang Đăng ký                                       |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường nhập liệu      | Mã phân vùng | Loại    | Mô tả                                                    | Giá trị đại diện         |
|------------------------|-------------|---------|-----------------------------------------------------------|--------------------------|
| Họ Tên                 | EP-01-01    | Valid   | Chuỗi ký tự hợp lệ (có nội dung)                          | `Nguyễn Văn A`            |
| Họ Tên                 | EP-01-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-01    | Valid   | Định dạng email hợp lệ, chưa tồn tại trong hệ thống       | `user01@gmail.com`        |
| Email                  | EP-02-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-03    | Invalid | Định dạng email không hợp lệ (thiếu @)                    | `user01gmail.com`         |
| Email                  | EP-02-04    | Invalid | Định dạng email không hợp lệ (thiếu domain)               | `user01@`                 |
| Email                  | EP-02-05    | Invalid | Email đã tồn tại trong hệ thống                           | `existing@gmail.com`      |
| Mật khẩu               | EP-03-01    | Valid   | Đáp ứng tất cả ràng buộc (≥8 ký tự, có hoa, thường, số, đặc biệt) | `Abcd@1234`        |
| Mật khẩu               | EP-03-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Mật khẩu               | EP-03-03    | Invalid | Độ dài < 8 ký tự                                          | `Ab@12`                   |
| Mật khẩu               | EP-03-04    | Invalid | Thiếu chữ hoa                                             | `abcd@1234`               |
| Mật khẩu               | EP-03-05    | Invalid | Thiếu chữ thường                                          | `ABCD@1234`               |
| Mật khẩu               | EP-03-06    | Invalid | Thiếu chữ số                                              | `Abcd@efgh`               |
| Mật khẩu               | EP-03-07    | Invalid | Thiếu ký tự đặc biệt                                      | `Abcd12345`               |
| Xác nhận mật khẩu      | EP-04-01    | Valid   | Khớp với trường Mật khẩu                                   | `Abcd@1234`               |
| Xác nhận mật khẩu      | EP-04-02    | Invalid | Không khớp với trường Mật khẩu                             | `Abcd@5678`               |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên               | Giá trị biên | Loại |
|-------------------|-------------------|--------------|------|
| Mật khẩu          | Độ dài tối thiểu   | 8            | Min  |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên               | Điểm           | Giá trị                | Số ký tự | Kết quả mong đợi |
|--------------------|--------------  |------------------------|----------|-------------------|
| Min = 8            | ON (8)         | `Abcd@123`             | 8        | Valid — Đăng ký thành công |
| Min = 8            | OFF⁻ (7)       | `Abc@123`              | 7        | Invalid — Báo lỗi mật khẩu quá ngắn |
| Min = 8            | OFF⁺ (9)       | `Abcd@1234`            | 9        | Valid — Đăng ký thành công |

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật        | Mô tả ngắn                                              |
|-----------------|----------------|----------------------------------------------------------|
| TC-FR-01-001    | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ            |
| TC-FR-01-002    | Domain Testing | Đăng ký với Họ Tên rỗng                                  |
| TC-FR-01-003    | Domain Testing | Đăng ký với Email rỗng                                   |
| TC-FR-01-004    | Domain Testing | Đăng ký với Email sai định dạng (thiếu @)                |
| TC-FR-01-005    | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain)           |
| TC-FR-01-006    | Domain Testing | Đăng ký với Email đã tồn tại                             |
| TC-FR-01-007    | Domain Testing | Đăng ký với Mật khẩu rỗng                                |
| TC-FR-01-008    | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự)               |
| TC-FR-01-009    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa                       |
| TC-FR-01-010    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường                    |
| TC-FR-01-011    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số                        |
| TC-FR-01-012    | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt               |
| TC-FR-01-013    | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp                 |
| TC-FR-01-014    | BVA            | Mật khẩu đúng 8 ký tự (ON — min)                         |
| TC-FR-01-015    | BVA            | Mật khẩu 7 ký tự (OFF⁻ — min-1)                         |
| TC-FR-01-016    | BVA            | Mật khẩu 9 ký tự (OFF⁺ — min+1)                         |

---

### AI Gap Analysis

- AI đưa dư biên độ dài tối đa cho password, trong khi đề bài chỉ có ràng buộc tối thiểu.

**Giải thích**: AI tự suy diễn ra ràng buộc max độ dài cho password hoặc AI cẩn thận thái quá muốn kiểm tra thêm các trường hợp hợp lệ.

---

## FR-07: Giỏ hàng (Shopping Cart)

### Mô tả yêu cầu

- Hiển thị danh sách sản phẩm với các cột: Sản phẩm, Đơn giá, Số lượng (có nút +/- để chỉnh), Thành tiền, Thao tác.
- Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới.
- Nút Xóa sản phẩm phải có dialog xác nhận trước khi thực hiện.
- Có nút Tiếp tục mua sắm để quay về trang chủ.
- Tổng tiền hiển thị nhãn chính xác: "Tổng cộng" (không phải "Tổng tạm tính").
- Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường / Hành vi         | Kiểu dữ liệu | Ràng buộc                                                                    |
|--------|-------------------------------|---------------|-------------------------------------------------------------------------------|
| Input  | Sản phẩm thêm vào giỏ        | Object        | Sản phẩm từ danh sách sản phẩm trên trang chủ                                |
| Input  | Số lượng                      | Integer       | ≥ 1, điều chỉnh bằng nút +/-                                                 |
| Input  | Nút Xóa                      | Action        | Phải có dialog xác nhận trước khi xóa                                         |
| Input  | Nút Tiếp tục mua sắm         | Action        | Chuyển hướng về trang chủ                                                     |
| Output | Bảng giỏ hàng                 | Hành vi       | Hiển thị 5 cột: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác           |
| Output | Cùng SP thêm lại              | Hành vi       | Tăng số lượng trên dòng hiện có, không tạo dòng mới                           |
| Output | Nhãn tổng tiền                | String        | Hiển thị "Tổng cộng" (không phải "Tổng tạm tính")                            |
| Output | Giỏ hàng trống                | Hành vi       | Hiển thị hình minh họa + thông báo rõ ràng                                    |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường / Hành vi              | Mã phân vùng | Loại    | Mô tả                                                         | Giá trị đại diện                   |
|-------------------------------|-------------|---------|----------------------------------------------------------------|------------------------------------|
| Hiển thị cột bảng             | EP-01-01    | Valid   | Đầy đủ 5 cột đúng tên: Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác | Thêm 1 SP, kiểm tra bảng |
| Hiển thị cột bảng             | EP-01-02    | Invalid | Tên cột sai (ví dụ: "Giá" thay vì "Đơn giá")                 | Kiểm tra tiêu đề cột              |
| Nút +/- số lượng              | EP-02-01    | Valid   | Có nút +/- bên cạnh ô số lượng                                | Kiểm tra giao diện cột SL         |
| Nút + (tăng SL)               | EP-02-02    | Valid   | Bấm + → tăng số lượng lên 1                                   | SL: 1 → 2                         |
| Nút - (giảm SL)               | EP-02-03    | Valid   | Bấm - → giảm số lượng xuống 1                                 | SL: 2 → 1                         |
| Thêm cùng SP                  | EP-03-01    | Valid   | SP đã có trong giỏ → tăng SL, không tạo dòng mới              | Thêm iPhone 2 lần, SL = 2         |
| Thêm cùng SP                  | EP-03-02    | Invalid | SP đã có nhưng tạo dòng mới (trùng lặp)                       | Thêm iPhone 2 lần, 2 dòng         |
| Xóa SP (dialog xác nhận)      | EP-04-01    | Valid   | Bấm Xóa → hiện dialog xác nhận → xác nhận → xóa SP           | Bấm Xóa → Đồng ý                 |
| Xóa SP (dialog hủy)           | EP-04-02    | Valid   | Bấm Xóa → hiện dialog xác nhận → hủy → SP vẫn còn            | Bấm Xóa → Hủy                    |
| Xóa SP (không dialog)         | EP-04-03    | Invalid | Bấm Xóa → xóa ngay không có dialog xác nhận                  | Bấm Xóa → SP biến mất ngay       |
| Nút Tiếp tục mua sắm         | EP-05-01    | Valid   | Nhãn "Tiếp tục mua sắm", bấm → về trang chủ                  | Bấm nút → trang chủ               |
| Nút Tiếp tục mua sắm         | EP-05-02    | Invalid | Nhãn sai (ví dụ: "Mua tiếp") hoặc không có nút               | Kiểm tra nhãn nút                 |
| Nhãn tổng tiền                | EP-06-01    | Valid   | Nhãn hiển thị "Tổng cộng"                                     | Kiểm tra nhãn tổng                |
| Nhãn tổng tiền                | EP-06-02    | Invalid | Nhãn hiển thị "Tổng tạm tính" hoặc nhãn khác                  | Kiểm tra nhãn tổng                |
| Giỏ hàng trống                | EP-07-01    | Valid   | Có hình minh họa + thông báo rõ ràng                           | Giỏ trống → kiểm tra UI           |
| Giỏ hàng trống                | EP-07-02    | Invalid | Chỉ có text, không có hình minh họa                            | Giỏ trống → chỉ thấy chữ          |
| Thành tiền                    | EP-08-01    | Valid   | Thành tiền = Đơn giá × Số lượng                               | 30M × 3 = 90M                     |
| Nhiều SP khác nhau            | EP-09-01    | Valid   | Thêm 2 SP khác → hiển thị 2 dòng riêng                        | iPhone + Samsung → 2 dòng         |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên                    | Giá trị biên | Loại |
|-------------------|------------------------|--------------|------|
| Số lượng          | Số lượng tối thiểu      | 1            | Min  |
| Số lượng          | Số lượng tối đa         | Không giới hạn | Max  |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên              | Điểm           | Giá trị | Kết quả mong đợi                                           |
|-------------------|---------------|---------|-------------------------------------------------------------|
| Min = 1           | ON (1)        | 1       | Valid — Số lượng hợp lệ, nút - bị vô hiệu hóa hoặc xóa SP |
| Min = 1           | OFF⁻ (0)      | 0       | Invalid — Không cho phép số lượng = 0                        |
| Min = 1           | OFF⁺ (2)      | 2       | Valid — Số lượng hợp lệ, hoạt động bình thường              |

> Không giới hạn tối đa: Không sinh test case BVA cho biên max.

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật        | Mô tả ngắn                                                     |
|-----------------|----------------|-----------------------------------------------------------------|
| TC-FR-07-001    | Domain Testing | Hiển thị giỏ hàng với 1 SP — kiểm tra đầy đủ các cột           |
| TC-FR-07-002    | Domain Testing | Kiểm tra tên cột "Đơn giá" hiển thị đúng                       |
| TC-FR-07-003    | Domain Testing | Kiểm tra cột Số lượng có nút +/- để chỉnh                      |
| TC-FR-07-004    | Domain Testing | Bấm nút + để tăng số lượng sản phẩm                            |
| TC-FR-07-005    | Domain Testing | Bấm nút - để giảm số lượng sản phẩm                            |
| TC-FR-07-006    | Domain Testing | Thêm cùng SP vào giỏ — tăng SL, không tạo dòng mới             |
| TC-FR-07-007    | Domain Testing | Nút Xóa SP hiển thị dialog xác nhận trước khi xóa              |
| TC-FR-07-008    | Domain Testing | Xác nhận xóa SP — SP bị xóa khỏi giỏ                          |
| TC-FR-07-009    | Domain Testing | Hủy xóa SP — SP vẫn còn trong giỏ                              |
| TC-FR-07-010    | Domain Testing | Nút "Tiếp tục mua sắm" quay về trang chủ                       |
| TC-FR-07-011    | Domain Testing | Nhãn tổng tiền hiển thị "Tổng cộng"                             |
| TC-FR-07-012    | Domain Testing | Giỏ hàng trống — hình minh họa + thông báo                     |
| TC-FR-07-013    | Domain Testing | Kiểm tra cột Thành tiền = Đơn giá × Số lượng                   |
| TC-FR-07-014    | Domain Testing | Thêm nhiều SP khác nhau — hiển thị nhiều dòng                   |
| TC-FR-07-015    | BVA            | Số lượng = 1 (ON — min), bấm nút -                             |
| TC-FR-07-016    | BVA            | Số lượng = 0 (OFF⁻ — min-1), không hợp lệ                     |
| TC-FR-07-017    | BVA            | Số lượng = 2 (OFF⁺ — min+1), hợp lệ                           |

---

### AI Gap Analysis

- AI đưa dư biên số lượng sản phẩm tối đa, trong khi đề bài và website không nhắc tới
- Test case TC-FR-07-010 hơi khắc khe trong khi đề không để "Tiếp tục mua sắm" trong ngoặc kép nên có thể chỉ là yêu cầu về chức năng, không phải yêu cầu bắt buộc

**Giải thích**: 
- AI cẩn thận thái quá muốn kiểm tra thêm các trường hợp hợp lệ.
- AI đôi khi không phân biệt được yêu cầu bắt buộc và không bắt buộc.

---

## FR-16: Import Sản phẩm từ CSV

### Mô tả yêu cầu

- Admin có thể tải lên file CSV để import nhiều sản phẩm cùng lúc.
- Yêu cầu file CSV:
  - Đuôi file phải là `.csv`.
  - Dòng đầu tiên là header: `name,price,description,imageUrl,category_id`.
  - Hỗ trợ các trường có chứa dấu phẩy nếu được bọc trong dấu nháy kép (RFC 4180).
- Validation trước khi import:
  - `name` không được rỗng.
  - `price` phải là số dương.
- Nếu có lỗi ở bất kỳ dòng nào, toàn bộ import phải được rollback (giao dịch nguyên tử — all-or-nothing).
- Hệ thống hiển thị báo cáo rõ ràng: bao nhiêu dòng thành công, bao nhiêu dòng lỗi và lý do.

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường / Hành vi              | Kiểu dữ liệu | Ràng buộc                                                                                          |
|--------|-----------------------------------|---------------|------------------------------------------------------------------------------------------------------|
| Input  | File tải lên                      | File          | Bắt buộc chọn file, đuôi file phải là `.csv`                                                        |
| Input  | Header CSV                        | String        | Dòng đầu tiên phải là: `name,price,description,imageUrl,category_id`                                |
| Input  | Trường `name` (mỗi dòng)         | String        | Không được rỗng                                                                                      |
| Input  | Trường `price` (mỗi dòng)        | Number        | Phải là số dương (> 0)                                                                               |
| Input  | Trường `description` (mỗi dòng)  | String        | Tùy chọn, hỗ trợ dấu phẩy nếu bọc trong dấu nháy kép (RFC 4180)                                   |
| Input  | Trường `imageUrl` (mỗi dòng)     | String        | Tùy chọn                                                                                            |
| Input  | Trường `category_id` (mỗi dòng)  | String/Number | Tùy chọn                                                                                            |
| Output | Import thành công                 | Hành vi       | Tất cả sản phẩm được lưu vào hệ thống, hiển thị báo cáo số dòng thành công                          |
| Output | Import thất bại (rollback)        | Hành vi       | Không có sản phẩm nào được lưu, toàn bộ giao dịch bị rollback, hiển thị báo cáo dòng lỗi và lý do  |
| Output | Báo cáo kết quả                   | Hành vi       | Hiển thị rõ ràng: số dòng thành công, số dòng lỗi, lý do lỗi                                        |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường / Hành vi                 | Mã phân vùng | Loại    | Mô tả                                                                    | Giá trị đại diện                                      |
|----------------------------------|-------------|---------|---------------------------------------------------------------------------|--------------------------------------------------------|
| File tải lên (đuôi file)        | EP-01-01    | Valid   | File có đuôi `.csv`                                                       | `products.csv`                                         |
| File tải lên (đuôi file)        | EP-01-02    | Invalid | File có đuôi khác `.csv` (ví dụ: `.txt`, `.xlsx`)                        | `products.txt`                                         |
| File tải lên (không chọn file)  | EP-01-03    | Invalid | Không chọn file nào                                                       | _(không chọn file)_                                    |
| Header CSV                       | EP-02-01    | Valid   | Header đúng: `name,price,description,imageUrl,category_id`               | Dòng 1: `name,price,description,imageUrl,category_id` |
| Header CSV                       | EP-02-02    | Invalid | Header sai (thiếu cột hoặc thứ tự sai)                                   | Dòng 1: `name,price,description`                       |
| Trường `name`                    | EP-03-01    | Valid   | Chuỗi ký tự có nội dung                                                  | `Laptop Dell`                                          |
| Trường `name`                    | EP-03-02    | Invalid | Chuỗi rỗng (không có nội dung)                                           | _(để trống)_                                           |
| Trường `price`                   | EP-04-01    | Valid   | Số dương                                                                  | `15000000`                                             |
| Trường `price`                   | EP-04-02    | Invalid | Số bằng 0                                                                 | `0`                                                    |
| Trường `price`                   | EP-04-03    | Invalid | Số âm                                                                     | `-50000`                                               |
| Trường `price`                   | EP-04-04    | Invalid | Không phải số (chuỗi ký tự)                                              | `abc`                                                  |
| Trường `price`                   | EP-04-05    | Invalid | Rỗng (không có giá trị)                                                  | _(để trống)_                                           |
| Dấu phẩy trong trường (RFC 4180)| EP-05-01    | Valid   | Trường `description` chứa dấu phẩy, được bọc trong dấu nháy kép         | `"Màn hình 15.6 inch, Full HD"`                       |
| Rollback (all-or-nothing)        | EP-06-01    | Valid   | Tất cả dòng hợp lệ → import thành công toàn bộ                          | File 3 dòng, tất cả hợp lệ                            |
| Rollback (all-or-nothing)        | EP-06-02    | Valid   | Có ít nhất 1 dòng lỗi → rollback toàn bộ, không dòng nào được import    | File 3 dòng, dòng 2 lỗi name rỗng                     |
| Báo cáo kết quả                  | EP-07-01    | Valid   | Hiển thị số dòng thành công, số dòng lỗi, lý do lỗi cho từng dòng       | "3 dòng thành công, 0 lỗi" hoặc "0 thành công, 1 lỗi: dòng 2 — name rỗng" |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên                          | Giá trị biên | Loại |
|-------------------|-------------------------------|--------------|------|
| Trường `price`    | Giá trị dương tối thiểu       | 0 (biên)     | Min  |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên                     | Điểm           | Giá trị | Kết quả mong đợi                      |
|--------------------------|---------------|---------|----------------------------------------|
| Min = 0 (số dương > 0)  | ON (1)        | `1`     | Valid — Import thành công               |
| Min = 0 (số dương > 0)  | OFF⁻ (0)     | `0`     | Invalid — Báo lỗi price không hợp lệ   |
| Min = 0 (số dương > 0)  | OFF⁺ (2)     | `2`     | Valid — Import thành công               |

> Không giới hạn tối đa: Không sinh test case BVA cho biên max.

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật        | Mô tả ngắn                                                               |
|-----------------|----------------|---------------------------------------------------------------------------|
| TC-FR-16-001    | Domain Testing | Import thành công với file CSV hợp lệ (nhiều dòng, tất cả hợp lệ)       |
| TC-FR-16-002    | Domain Testing | Upload file không phải `.csv` (ví dụ: `.txt`)                             |
| TC-FR-16-003    | Domain Testing | Không chọn file nào để upload                                             |
| TC-FR-16-004    | Domain Testing | File CSV có header sai (thiếu cột)                                        |
| TC-FR-16-005    | Domain Testing | File CSV có dòng dữ liệu với `name` rỗng                                 |
| TC-FR-16-006    | Domain Testing | File CSV có dòng dữ liệu với `price` bằng 0                              |
| TC-FR-16-007    | Domain Testing | File CSV có dòng dữ liệu với `price` là số âm                            |
| TC-FR-16-008    | Domain Testing | File CSV có dòng dữ liệu với `price` không phải số                       |
| TC-FR-16-009    | Domain Testing | File CSV có dòng dữ liệu với `price` rỗng                                |
| TC-FR-16-010    | Domain Testing | File CSV có trường chứa dấu phẩy bọc trong nháy kép (RFC 4180)           |
| TC-FR-16-011    | Domain Testing | File CSV có 1 dòng lỗi — kiểm tra rollback toàn bộ                       |
| TC-FR-16-012    | Domain Testing | Kiểm tra báo cáo kết quả hiển thị số dòng thành công/lỗi và lý do       |
| TC-FR-16-013    | BVA            | Price = 1 (ON — min, số dương nhỏ nhất hợp lệ)                           |
| TC-FR-16-014    | BVA            | Price = 0 (OFF⁻ — min-1, không hợp lệ)                                  |
| TC-FR-16-015    | BVA            | Price = 2 (OFF⁺ — min+1, hợp lệ)                                        |

---

### AI Gap Analysis

- Sinh dư upper bound cho trường price khi yêu cầu không nhắc tới.

**Giải thích**: Vẫn như những lần trước, AI có lẽ đã cẩn thận cân nhắc thêm upperbound để đảm bảo số không có giới hạn trên.

---

## FR-24: Đăng ký tài khoản

### Mô tả yêu cầu

- Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
- Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
- Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
- Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

> **Ghi chú**: Yêu cầu này được test trên app mobile (Expo) thay vì trên web, do đó các thuật ngữ "trang" được thay bằng "màn hình" và môi trường test là Expo Go trên thiết bị di động.

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường            | Kiểu dữ liệu | Ràng buộc                                                                                       |
|--------|-----------------------|---------------|--------------------------------------------------------------------------------------------------|
| Input  | Họ Tên                | String        | Bắt buộc nhập, không được để trống                                                               |
| Input  | Email                 | String        | Bắt buộc nhập, định dạng hợp lệ (user@domain.com), duy nhất trong hệ thống                      |
| Input  | Mật khẩu              | String        | Bắt buộc nhập, tối thiểu 8 ký tự, ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt     |
| Input  | Xác nhận mật khẩu     | String        | Bắt buộc nhập, phải khớp với trường Mật khẩu                                                     |
| Output | Đăng ký thành công     | Hành vi       | Chuyển hướng tới màn hình Đăng nhập                                                              |
| Output | Đăng ký thất bại       | Hành vi       | Hiển thị thông báo lỗi tương ứng, giữ nguyên màn hình Đăng ký                                    |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường nhập liệu      | Mã phân vùng | Loại    | Mô tả                                                    | Giá trị đại diện         |
|------------------------|-------------|---------|-----------------------------------------------------------|--------------------------| 
| Họ Tên                 | EP-01-01    | Valid   | Chuỗi ký tự hợp lệ (có nội dung)                          | `Nguyễn Văn A`            |
| Họ Tên                 | EP-01-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-01    | Valid   | Định dạng email hợp lệ, chưa tồn tại trong hệ thống       | `user01@gmail.com`        |
| Email                  | EP-02-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Email                  | EP-02-03    | Invalid | Định dạng email không hợp lệ (thiếu @)                    | `user01gmail.com`         |
| Email                  | EP-02-04    | Invalid | Định dạng email không hợp lệ (thiếu domain)               | `user01@`                 |
| Email                  | EP-02-05    | Invalid | Email đã tồn tại trong hệ thống                           | `existing@gmail.com`      |
| Mật khẩu               | EP-03-01    | Valid   | Đáp ứng tất cả ràng buộc (≥8 ký tự, có hoa, thường, số, đặc biệt) | `Abcd@1234`        |
| Mật khẩu               | EP-03-02    | Invalid | Chuỗi rỗng (không nhập gì)                                | _(để trống)_              |
| Mật khẩu               | EP-03-03    | Invalid | Độ dài < 8 ký tự                                          | `Ab@12`                   |
| Mật khẩu               | EP-03-04    | Invalid | Thiếu chữ hoa                                             | `abcd@1234`               |
| Mật khẩu               | EP-03-05    | Invalid | Thiếu chữ thường                                          | `ABCD@1234`               |
| Mật khẩu               | EP-03-06    | Invalid | Thiếu chữ số                                              | `Abcd@efgh`               |
| Mật khẩu               | EP-03-07    | Invalid | Thiếu ký tự đặc biệt                                      | `Abcd12345`               |
| Xác nhận mật khẩu      | EP-04-01    | Valid   | Khớp với trường Mật khẩu                                   | `Abcd@1234`               |
| Xác nhận mật khẩu      | EP-04-02    | Invalid | Không khớp với trường Mật khẩu                             | `Abcd@5678`               |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên               | Giá trị biên | Loại |
|-------------------|-------------------|--------------|------|
| Mật khẩu          | Độ dài tối thiểu   | 8            | Min  |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên               | Điểm           | Giá trị                | Số ký tự | Kết quả mong đợi |
|--------------------|--------------- |------------------------|----------|-------------------|
| Min = 8            | ON (8)         | `Abcd@123`             | 8        | Valid — Đăng ký thành công |
| Min = 8            | OFF⁻ (7)       | `Abc@123`              | 7        | Invalid — Báo lỗi mật khẩu quá ngắn |
| Min = 8            | OFF⁺ (9)       | `Abcd@1234`            | 9        | Valid — Đăng ký thành công |

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật        | Mô tả ngắn                                              |
|-----------------|----------------|----------------------------------------------------------|
| TC-FR-24-001    | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ            |
| TC-FR-24-002    | Domain Testing | Đăng ký với Họ Tên rỗng                                  |
| TC-FR-24-003    | Domain Testing | Đăng ký với Email rỗng                                   |
| TC-FR-24-004    | Domain Testing | Đăng ký với Email sai định dạng (thiếu @)                |
| TC-FR-24-005    | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain)           |
| TC-FR-24-006    | Domain Testing | Đăng ký với Email đã tồn tại                             |
| TC-FR-24-007    | Domain Testing | Đăng ký với Mật khẩu rỗng                                |
| TC-FR-24-008    | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự)               |
| TC-FR-24-009    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa                       |
| TC-FR-24-010    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường                    |
| TC-FR-24-011    | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số                        |
| TC-FR-24-012    | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt               |
| TC-FR-24-013    | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp                 |
| TC-FR-24-014    | BVA            | Mật khẩu đúng 8 ký tự (ON — min)                         |
| TC-FR-24-015    | BVA            | Mật khẩu 7 ký tự (OFF⁻ — min-1)                         |
| TC-FR-24-016    | BVA            | Mật khẩu 9 ký tự (OFF⁺ — min+1)                         |

---

### AI Gap Analysis

Phần này AI phân tích và tạo test case tốt, đúng yêu cầu.