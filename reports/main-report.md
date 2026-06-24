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