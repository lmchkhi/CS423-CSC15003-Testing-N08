# TC-HOME-GRID — Xem danh sách & Tìm kiếm sản phẩm

> **Dự án:** EShop  
> **Yêu cầu chính:** FR-05 — Xem danh sách & Tìm kiếm sản phẩm  
> **Người tạo:** QA Team  
> **Ngày tạo:** 2026-06-08  
> **Tổng số test case:** 10  

---

## TC-HOME-001: Hiển thị grid sản phẩm khi load trang

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05 |
| **Module / Technique** | Home / Functional |
| **Tiền điều kiện** | 1. Hệ thống đang hoạt động bình thường. <br> 2. Cơ sở dữ liệu có ít nhất 1 sản phẩm. <br> 3. Người dùng sử dụng trình duyệt hỗ trợ (Chrome, Firefox, Edge). |
| **Dữ liệu kiểm thử** | Danh sách sản phẩm có sẵn trong database (≥ 1 sản phẩm). |
| **Các bước thực hiện** | 1. Mở trình duyệt và truy cập trang chủ EShop. <br> 2. Chờ trang tải hoàn tất. <br> 3. Quan sát khu vực hiển thị danh sách sản phẩm. <br> 4. Thu nhỏ cửa sổ trình duyệt xuống kích thước mobile (≤ 640px) và quan sát bố cục. <br> 5. Mở rộng cửa sổ trình duyệt lên kích thước tablet (641px – 1024px) và quan sát bố cục. <br> 6. Mở rộng cửa sổ trình duyệt lên kích thước desktop (≥ 1025px) và quan sát bố cục. |
| **Kết quả mong đợi** | - Sản phẩm được hiển thị dưới dạng lưới (grid) responsive. <br> - Mobile: 1 cột. <br> - Tablet: 2 cột. <br> - Desktop: 3 cột. <br> - Mỗi sản phẩm hiển thị đầy đủ: ảnh, tên, giá. |
| **Trạng thái / Lỗi liên quan** | ✅ **Pass** |

---

## TC-HOME-002: Ảnh sản phẩm có alt text mô tả

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05, FR-24 |
| **Module / Technique** | Home / Accessibility |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Danh sách sản phẩm đang hiển thị trên grid. <br> 3. Công cụ DevTools (F12) sẵn sàng sử dụng. |
| **Dữ liệu kiểm thử** | Sản phẩm mẫu: "Laptop Dell XPS 15" với ảnh `dell-xps-15.jpg`. |
| **Các bước thực hiện** | 1. Mở trang chủ EShop, chờ danh sách sản phẩm hiển thị. <br> 2. Nhấn F12 để mở DevTools. <br> 3. Sử dụng tab Elements, tìm tất cả thẻ `<img>` trong khu vực grid sản phẩm. <br> 4. Kiểm tra thuộc tính `alt` của từng thẻ `<img>`. <br> 5. Xác nhận giá trị `alt` có chứa tên hoặc mô tả sản phẩm tương ứng. |
| **Kết quả mong đợi** | - Mỗi thẻ `<img>` sản phẩm **phải có** thuộc tính `alt` không rỗng. <br> - Giá trị `alt` chứa tên sản phẩm hoặc mô tả có ý nghĩa (ví dụ: `alt="Laptop Dell XPS 15"`). <br> - Không được để `alt=""` (rỗng) hoặc thiếu thuộc tính `alt`. |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-003** <br> 📝 *Ghi chú:* Code hiện tại đang để `alt=""` (rỗng), vi phạm tiêu chuẩn WCAG 2.1 về accessibility. |

---

## TC-HOME-003: Giá hiển thị đơn vị ₫ và phân cách hàng nghìn

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05, FR-21 |
| **Module / Technique** | Home / UI |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Có ít nhất 1 sản phẩm với giá ≥ 1.000 VND trong database. |
| **Dữ liệu kiểm thử** | - Sản phẩm A: `price = 1500000` → kỳ vọng hiển thị: **"1.500.000 ₫"** hoặc **"1,500,000 ₫"** <br> - Sản phẩm B: `price = 500` → kỳ vọng hiển thị: **"500 ₫"** <br> - Sản phẩm C: `price = 25999000` → kỳ vọng hiển thị: **"25.999.000 ₫"** |
| **Các bước thực hiện** | 1. Mở trang chủ EShop. <br> 2. Quan sát giá hiển thị của từng sản phẩm trên grid. <br> 3. Kiểm tra ký hiệu tiền tệ được sử dụng (₫ hay VND). <br> 4. Kiểm tra dấu phân cách hàng nghìn (dấu chấm hoặc dấu phẩy). <br> 5. So sánh giá hiển thị với dữ liệu kiểm thử ở trên. |
| **Kết quả mong đợi** | - Giá sử dụng ký hiệu **₫** (đồng), không hiển thị chữ "VND". <br> - Giá có dấu phân cách hàng nghìn (dấu chấm `.` hoặc dấu phẩy `,`). <br> - Ví dụ đúng: `1.500.000 ₫` hoặc `1,500,000 ₫`. <br> - Ví dụ sai: `1500000 VND`, `1500000VND`. |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-004** <br> 📝 *Ghi chú:* Code hiện tại hiển thị "VND" thay vì ký hiệu "₫", không đúng với quy chuẩn hiển thị tiền Việt Nam. |

---

## TC-HOME-004: Tìm kiếm theo tên sản phẩm (Happy path)

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05 |
| **Module / Technique** | Home / Functional |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Database có sản phẩm chứa từ "iPhone" trong tên (ví dụ: "iPhone 15 Pro Max"). <br> 3. Ô tìm kiếm hiển thị trên giao diện. |
| **Dữ liệu kiểm thử** | - Từ khóa tìm kiếm: `iPhone` <br> - Sản phẩm tồn tại trong DB: "iPhone 15 Pro Max", "iPhone 14", "iPhone SE". <br> - Sản phẩm không liên quan: "Samsung Galaxy S24", "Laptop Dell". |
| **Các bước thực hiện** | 1. Mở trang chủ EShop. <br> 2. Click vào ô tìm kiếm (search input). <br> 3. Nhập từ khóa: `iPhone`. <br> 4. Nhấn Enter hoặc click nút Tìm kiếm. <br> 5. Quan sát danh sách sản phẩm trả về trên grid. |
| **Kết quả mong đợi** | - Chỉ hiển thị các sản phẩm có tên chứa từ "iPhone". <br> - Các sản phẩm không liên quan (Samsung, Dell, ...) **không** xuất hiện. <br> - Số lượng kết quả khớp với số sản phẩm chứa "iPhone" trong database. |
| **Trạng thái / Lỗi liên quan** | ✅ **Pass** |

---

## TC-HOME-005: Từ khóa tìm kiếm hiển thị an toàn (XSS test)

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05, SEC-04 |
| **Module / Technique** | Home / Security |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Chức năng tìm kiếm hoạt động bình thường. <br> 3. Trình duyệt không cài extension chặn script (để kiểm tra chính xác). |
| **Dữ liệu kiểm thử** | - Payload XSS: `<script>alert('XSS')</script>` <br> - Payload bổ sung: `<img src=x onerror=alert('XSS')>` <br> - Payload event handler: `" onmouseover="alert('XSS')` |
| **Các bước thực hiện** | 1. Mở trang chủ EShop. <br> 2. Click vào ô tìm kiếm. <br> 3. Nhập payload: `<script>alert('XSS')</script>`. <br> 4. Nhấn Enter hoặc click nút Tìm kiếm. <br> 5. Quan sát xem có hộp thoại alert xuất hiện không. <br> 6. Kiểm tra source code (DevTools) xem từ khóa được render dưới dạng text thuần hay HTML. <br> 7. Lặp lại bước 3–6 với các payload bổ sung. |
| **Kết quả mong đợi** | - **Không** có hộp thoại `alert()` xuất hiện. <br> - Script **không** được thực thi. <br> - Từ khóa tìm kiếm hiển thị dưới dạng **văn bản thuần** (plain text). <br> - Trong DOM, nội dung được escape đúng cách (ví dụ: `&lt;script&gt;` thay vì `<script>`). |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-001** <br> 📝 *Ghi chú:* Code sử dụng `dangerouslySetInnerHTML` tại dòng 64 của `Home.jsx`, cho phép thực thi mã JavaScript độc hại. Đây là lỗ hổng bảo mật nghiêm trọng (Critical). |

---

## TC-HOME-006: Hiển thị loading khi đang tải dữ liệu

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05 |
| **Module / Technique** | Home / UX |
| **Tiền điều kiện** | 1. Công cụ DevTools (F12) đã mở. <br> 2. Tab Network trong DevTools sẵn sàng. <br> 3. Có khả năng giả lập mạng chậm (Slow 3G). |
| **Dữ liệu kiểm thử** | - Thiết lập Network throttling: Slow 3G (DevTools → Network → Throttling). <br> - Hoặc sử dụng mock API với delay 3 giây. |
| **Các bước thực hiện** | 1. Mở DevTools (F12) → tab Network. <br> 2. Chọn Network throttling: **Slow 3G**. <br> 3. Truy cập trang chủ EShop (hoặc reload trang). <br> 4. Quan sát khu vực grid sản phẩm **trong khi** dữ liệu đang tải. <br> 5. Ghi nhận trạng thái hiển thị trước khi sản phẩm xuất hiện. |
| **Kết quả mong đợi** | - Trong thời gian tải dữ liệu, hiển thị chỉ báo loading (spinner xoay, skeleton placeholder, hoặc thanh progress). <br> - Người dùng biết rằng hệ thống đang xử lý, không bị nhầm lẫn với trang trống. <br> - Sau khi tải xong, loading indicator biến mất và sản phẩm hiển thị bình thường. |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-005** <br> 📝 *Ghi chú:* Hiện tại không có trạng thái loading nào được triển khai. Khi mạng chậm, khu vực sản phẩm hiển thị trống hoàn toàn khiến người dùng bối rối. |

---

## TC-HOME-007: Hiển thị empty state khi không có kết quả tìm kiếm

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05, FR-24 |
| **Module / Technique** | Home / UX |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Chức năng tìm kiếm hoạt động bình thường. |
| **Dữ liệu kiểm thử** | - Từ khóa tìm kiếm không tồn tại: `xyz-nonexistent-product-12345` <br> - Từ khóa đặc biệt: `!@#$%^&*()` <br> - Từ khóa dài: chuỗi 200 ký tự ngẫu nhiên. |
| **Các bước thực hiện** | 1. Mở trang chủ EShop. <br> 2. Click vào ô tìm kiếm. <br> 3. Nhập từ khóa: `xyz-nonexistent-product-12345`. <br> 4. Nhấn Enter hoặc click nút Tìm kiếm. <br> 5. Quan sát khu vực hiển thị kết quả. <br> 6. Kiểm tra xem có thông báo "Không tìm thấy sản phẩm" hay không. <br> 7. Kiểm tra xem có icon/hình ảnh minh họa trạng thái trống hay không. |
| **Kết quả mong đợi** | - Hiển thị trạng thái trống (empty state) thân thiện với người dùng. <br> - Có icon hoặc hình ảnh minh họa (ví dụ: icon tìm kiếm, hình hộp trống). <br> - Có thông báo rõ ràng, ví dụ: *"Không tìm thấy sản phẩm phù hợp với từ khóa của bạn."* <br> - Có gợi ý hành động tiếp theo (ví dụ: "Thử tìm kiếm với từ khóa khác"). |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-006** <br> 📝 *Ghi chú:* Khi không có kết quả, trang hiển thị vùng trống hoàn toàn (blank area) mà không có bất kỳ thông báo hay gợi ý nào cho người dùng. |

---

## TC-HOME-008: Trang chủ chỉ có đúng 1 thẻ `<h1>`

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05, FR-21 |
| **Module / Technique** | Home / HTML Semantics |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Công cụ DevTools (F12) sẵn sàng. |
| **Dữ liệu kiểm thử** | - Lệnh kiểm tra trong Console: `document.querySelectorAll('h1').length` <br> - Kỳ vọng kết quả trả về: `1`. |
| **Các bước thực hiện** | 1. Mở trang chủ EShop, chờ tải hoàn tất. <br> 2. Nhấn F12 để mở DevTools. <br> 3. Chuyển sang tab **Console**. <br> 4. Nhập lệnh: `document.querySelectorAll('h1').length` và nhấn Enter. <br> 5. Ghi nhận số lượng thẻ `<h1>` trả về. <br> 6. Nếu > 1, chuyển sang tab Elements và tìm tất cả thẻ `<h1>` để xác định vị trí. |
| **Kết quả mong đợi** | - Trang chủ chỉ có **đúng 1** thẻ `<h1>`. <br> - Thẻ `<h1>` duy nhất chứa tiêu đề chính của trang (ví dụ: "Danh sách sản phẩm" hoặc tên website). <br> - Tuân thủ chuẩn HTML Semantics và SEO best practices. |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-007** <br> 📝 *Ghi chú:* Tìm thấy **2 thẻ `<h1>`** trong DOM — tại dòng 43 và dòng 110 của `Home.jsx`. Vi phạm chuẩn HTML Semantics, ảnh hưởng đến SEO và khả năng tiếp cận (accessibility). |

---

## TC-HOME-009: Tìm kiếm với từ khóa rỗng

| Trường | Nội dung |
|---|---|
| **Requirement ID** | FR-05 |
| **Module / Technique** | Home / Boundary |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Danh sách sản phẩm đang hiển thị đầy đủ (trạng thái mặc định). <br> 3. Chức năng tìm kiếm hoạt động bình thường. |
| **Dữ liệu kiểm thử** | - Từ khóa: ` ` (chuỗi rỗng / chỉ có khoảng trắng). <br> - Trường hợp 1: Không nhập gì, nhấn Enter. <br> - Trường hợp 2: Nhập khoảng trắng `"   "`, nhấn Enter. |
| **Các bước thực hiện** | 1. Mở trang chủ EShop, ghi nhận tổng số sản phẩm hiển thị mặc định. <br> 2. Click vào ô tìm kiếm. <br> 3. Không nhập gì, nhấn Enter. <br> 4. Quan sát danh sách sản phẩm hiển thị. <br> 5. Click lại ô tìm kiếm, nhập 3 khoảng trắng `"   "`. <br> 6. Nhấn Enter. <br> 7. Quan sát danh sách sản phẩm hiển thị. |
| **Kết quả mong đợi** | - Với cả hai trường hợp (rỗng và khoảng trắng): hiển thị **tất cả sản phẩm** (quay về danh sách mặc định). <br> - Số lượng sản phẩm hiển thị bằng với số lượng ban đầu. <br> - Không có lỗi JavaScript trong Console. <br> - Không gửi request API không cần thiết (hoặc API trả về toàn bộ sản phẩm). |
| **Trạng thái / Lỗi liên quan** | ✅ **Pass** |

---

## TC-HOME-010: Backend tìm kiếm sử dụng Parameterized Query

| Trường | Nội dung |
|---|---|
| **Requirement ID** | SEC-05 |
| **Module / Technique** | Home / Security |
| **Tiền điều kiện** | 1. Trang chủ đã tải hoàn tất. <br> 2. Chức năng tìm kiếm hoạt động bình thường. <br> 3. Có quyền truy cập hoặc review mã nguồn backend. <br> 4. Công cụ kiểm tra API (Postman, DevTools Network) sẵn sàng. |
| **Dữ liệu kiểm thử** | - Payload SQL Injection: `' OR '1'='1` <br> - Payload bổ sung 1: `'; DROP TABLE products; --` <br> - Payload bổ sung 2: `" UNION SELECT * FROM users --` <br> - Payload kết hợp: `%27%20OR%20%271%27%3D%271` (URL-encoded). |
| **Các bước thực hiện** | 1. Mở trang chủ EShop. <br> 2. Click vào ô tìm kiếm. <br> 3. Nhập payload: `' OR '1'='1`. <br> 4. Nhấn Enter hoặc click nút Tìm kiếm. <br> 5. Quan sát kết quả trả về — kiểm tra xem có hiển thị **tất cả sản phẩm** (dấu hiệu SQL Injection thành công) hay không. <br> 6. Mở DevTools → tab Network, kiểm tra request API và response. <br> 7. Review mã nguồn backend: kiểm tra cách xây dựng câu truy vấn SQL. <br> 8. Lặp lại bước 3–6 với các payload bổ sung. |
| **Kết quả mong đợi** | - Payload SQL Injection **không** trả về toàn bộ sản phẩm. <br> - Kết quả trả về rỗng hoặc chỉ chứa sản phẩm khớp chính xác với từ khóa. <br> - Backend sử dụng **Parameterized Query** (ví dụ: `WHERE name LIKE ?` với tham số `%searchQuery%`). <br> - Không sử dụng nối chuỗi trực tiếp (string concatenation) trong câu SQL. <br> - Không có lỗi 500 hoặc thông báo lỗi SQL lộ ra phía client. |
| **Trạng thái / Lỗi liên quan** | ❌ **Fail** — Lỗi liên quan: **BUG-HOME-008** <br> 📝 *Ghi chú:* Backend đang sử dụng nối chuỗi trực tiếp: `` WHERE name LIKE '%${searchQuery}%' `` thay vì Parameterized Query. Đây là lỗ hổng **SQL Injection** nghiêm trọng (Critical), cho phép kẻ tấn công đọc, sửa, hoặc xóa dữ liệu trong database. |

---

## Tổng kết kết quả

| # | Test Case ID | Tiêu đề | Trạng thái | Lỗi liên quan |
|---|---|---|---|---|
| 1 | TC-HOME-001 | Hiển thị grid sản phẩm khi load trang | ✅ Pass | — |
| 2 | TC-HOME-002 | Ảnh sản phẩm có alt text mô tả | ❌ Fail | BUG-HOME-003 |
| 3 | TC-HOME-003 | Giá hiển thị đơn vị ₫ và phân cách hàng nghìn | ❌ Fail | BUG-HOME-004 |
| 4 | TC-HOME-004 | Tìm kiếm theo tên sản phẩm (Happy path) | ✅ Pass | — |
| 5 | TC-HOME-005 | Từ khóa tìm kiếm hiển thị an toàn (XSS test) | ❌ Fail | BUG-HOME-001 |
| 6 | TC-HOME-006 | Hiển thị loading khi đang tải dữ liệu | ❌ Fail | BUG-HOME-005 |
| 7 | TC-HOME-007 | Hiển thị empty state khi không có kết quả tìm kiếm | ❌ Fail | BUG-HOME-006 |
| 8 | TC-HOME-008 | Trang chủ chỉ có đúng 1 thẻ `<h1>` | ❌ Fail | BUG-HOME-007 |
| 9 | TC-HOME-009 | Tìm kiếm với từ khóa rỗng | ✅ Pass | — |
| 10 | TC-HOME-010 | Backend tìm kiếm sử dụng Parameterized Query | ❌ Fail | BUG-HOME-008 |

> **Tỷ lệ Pass/Fail:** 3/10 Pass (30%) — 7/10 Fail (70%)  
> **Lỗi nghiêm trọng (Critical):** BUG-HOME-001 (XSS), BUG-HOME-008 (SQL Injection)  
> **Ưu tiên sửa:** Security bugs trước (BUG-HOME-001, BUG-HOME-008), sau đó UX và Accessibility.
