# 🐛 Bug Reports — FR-05: Homepage (Module Home)

> **Tổng số bug**: 8  
> **Phân bổ Severity**: Critical (3) · Major (3) · Minor (2)  
> **Sprint**: 1  
> **Ngày phát hiện**: 2026-06-08  
> **Tester**: AI QA Agent  

---

## [BUG-HOME-001] XSS qua thanh tìm kiếm (dangerouslySetInnerHTML)

**Severity**: Critical  
**Priority**: High  
**Module**: Home  
**Found by Test Case**: TC-HOME-005  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Nhập chuỗi `<img src=x onerror=alert('XSS')>` vào thanh tìm kiếm sản phẩm
3. Nhấn Enter hoặc click nút Tìm kiếm
4. Quan sát kết quả hiển thị trên trang

### Kết quả mong đợi
- Chuỗi `<img src=x onerror=alert('XSS')>` được hiển thị dưới dạng **văn bản thuần** (plain text), không bị trình duyệt thông dịch thành HTML/JavaScript.

### Kết quả thực tế
- Trình duyệt thực thi mã JavaScript trong chuỗi, hiển thị hộp thoại `alert('XSS')`. Đây là lỗ hổng **Cross-Site Scripting (XSS)** nghiêm trọng, cho phép kẻ tấn công chèn mã độc vào trang.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 64
- Dòng code vi phạm: `dangerouslySetInnerHTML={{ __html: search }}` — render trực tiếp input người dùng dưới dạng HTML.
- Screenshot: Hộp thoại alert() xuất hiện khi nhập payload XSS vào thanh tìm kiếm.

### Phân tích nguyên nhân gốc (Root Cause)
Sử dụng `dangerouslySetInnerHTML` để hiển thị từ khóa tìm kiếm (`search`) do người dùng nhập. React mặc định escape HTML khi dùng `{search}` trong JSX, nhưng `dangerouslySetInnerHTML` bỏ qua cơ chế bảo vệ này, cho phép chèn HTML/JS tùy ý. Cần thay thế bằng text content: `{search}`.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-002] XSS qua error HTML rendering

**Severity**: Critical  
**Priority**: High  
**Module**: Home  
**Found by Test Case**: TC-HOME-005  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Kích hoạt một lỗi từ backend trả về response chứa HTML (ví dụ: gây lỗi SQL trả về thông báo lỗi có chứa thẻ HTML)
3. Quan sát phần hiển thị thông báo lỗi trên trang

### Kết quả mong đợi
- Thông báo lỗi được hiển thị dưới dạng **văn bản thuần** (plain text), không render HTML.

### Kết quả thực tế
- Nội dung HTML trong thông báo lỗi từ backend được render trực tiếp lên trang dưới dạng HTML thực thi, tạo lỗ hổng XSS thông qua error message injection.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 71
- Dòng code vi phạm: `dangerouslySetInnerHTML` được dùng để hiển thị error message từ backend.
- Screenshot: HTML từ backend error response được render thành DOM thực tế trên trang.

### Phân tích nguyên nhân gốc (Root Cause)
Error message trả về từ backend được render bằng `dangerouslySetInnerHTML` thay vì text content. Nếu backend trả về lỗi có chứa HTML (ví dụ: SQL error message, hoặc attacker kiểm soát được nội dung error), HTML đó sẽ được thực thi trên trình duyệt. Cần thay bằng `{errorMessage}` trong JSX.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-003] Ảnh sản phẩm thiếu alt text mô tả

**Severity**: Minor  
**Priority**: Medium  
**Module**: Home  
**Found by Test Case**: TC-HOME-002  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Chờ danh sách sản phẩm hiển thị
3. Click chuột phải vào bất kỳ ảnh sản phẩm nào → chọn "Inspect" (hoặc nhấn F12)
4. Kiểm tra thuộc tính `alt` của thẻ `<img>` trong DOM

### Kết quả mong đợi
- Thuộc tính `alt` chứa **tên sản phẩm** tương ứng (ví dụ: `alt="iPhone 15 Pro Max"`), phục vụ accessibility (trình đọc màn hình) và SEO.

### Kết quả thực tế
- Thuộc tính `alt` là chuỗi rỗng: `alt=""`. Trình đọc màn hình (screen reader) sẽ bỏ qua ảnh, người dùng khuyết tật không biết ảnh hiển thị gì.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 82
- Dòng code vi phạm: `alt=""` — hardcoded chuỗi rỗng thay vì sử dụng `alt={product.name}`.
- Screenshot: DOM Inspector cho thấy `<img src="..." alt="">` trên tất cả ảnh sản phẩm.

### Phân tích nguyên nhân gốc (Root Cause)
Thuộc tính `alt` của thẻ `<img>` được hardcode là chuỗi rỗng (`alt=""`). Developer không bind giá trị `product.name` vào thuộc tính `alt`. Vi phạm WCAG 2.1 Level A — Guideline 1.1.1 (Non-text Content). Cần sửa thành `alt={product.name}`.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-004] Hiển thị đơn vị tiền sai (VND thay vì ₫)

**Severity**: Major  
**Priority**: High  
**Module**: Home  
**Found by Test Case**: TC-HOME-003  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Chờ danh sách sản phẩm hiển thị
3. Quan sát giá tiền hiển thị bên dưới mỗi sản phẩm

### Kết quả mong đợi
- Giá hiển thị theo chuẩn Việt Nam: `1.500.000 ₫` (dấu chấm ngăn hàng nghìn, ký hiệu ₫ ở cuối).

### Kết quả thực tế
- Giá hiển thị sai định dạng: `1,500,000 VND` (dấu phẩy ngăn hàng nghìn, text "VND" thay vì ký hiệu ₫). Không đúng chuẩn hiển thị tiền tệ Việt Nam.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 87
- Dòng code vi phạm: Hardcoded chuỗi `"VND"` thay vì sử dụng ký hiệu `"₫"` hoặc `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
- Screenshot: Giá sản phẩm hiển thị "1,500,000 VND" trên card sản phẩm.

### Phân tích nguyên nhân gốc (Root Cause)
Đơn vị tiền tệ được hardcode là chuỗi `"VND"` thay vì sử dụng ký hiệu tiền tệ chuẩn `"₫"`. Ngoài ra, định dạng số không sử dụng `Intl.NumberFormat` với locale `vi-VN`, dẫn đến dấu phân cách hàng nghìn sai (dấu phẩy thay vì dấu chấm). Cần sử dụng `new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)` hoặc tối thiểu thay `"VND"` thành `"₫"`.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-005] Không có trạng thái loading khi tải dữ liệu

**Severity**: Major  
**Priority**: Medium  
**Module**: Home  
**Found by Test Case**: TC-HOME-006  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Mở Chrome DevTools (F12) → tab **Network**
2. Chọn **Throttling** → "Slow 3G" để giả lập mạng chậm
3. Truy cập trang chủ tại `http://localhost:5173`
4. Quan sát giao diện trong khoảng thời gian chờ dữ liệu tải về

### Kết quả mong đợi
- Hiển thị **loading indicator** (spinner, skeleton screen, hoặc progress bar) trong khi dữ liệu đang được tải từ API.

### Kết quả thực tế
- Trang hiển thị **hoàn toàn trống** (blank page) cho đến khi dữ liệu tải xong. Người dùng không biết trang đang tải hay bị lỗi, gây trải nghiệm xấu (UX degradation).

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx`
- Không tồn tại biến state `loading` (ví dụ: `const [loading, setLoading] = useState(true)`) trong component.
- Hàm `fetchProducts` không có cơ chế set/unset trạng thái loading.
- Screenshot: Trang trống hoàn toàn trong 3-5 giây khi throttle mạng chậm.

### Phân tích nguyên nhân gốc (Root Cause)
Component `Home` không implement loading state management. Không có biến state `loading`, không có logic `setLoading(true)` trước khi gọi API và `setLoading(false)` sau khi nhận response. Do đó không có conditional rendering cho trạng thái loading (spinner/skeleton). Cần thêm `useState` cho loading và hiển thị loading indicator khi `loading === true`.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-006] Không hiển thị empty state khi không có kết quả

**Severity**: Major  
**Priority**: Medium  
**Module**: Home  
**Found by Test Case**: TC-HOME-007  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Nhập từ khóa không tồn tại vào thanh tìm kiếm, ví dụ: `xyznonexistent`
3. Nhấn Enter hoặc click nút Tìm kiếm
4. Quan sát khu vực hiển thị kết quả

### Kết quả mong đợi
- Hiển thị **empty state** thân thiện với người dùng: icon minh họa (ví dụ: 🔍 hoặc illustration), kèm thông báo như "Không tìm thấy sản phẩm nào phù hợp với từ khóa 'xyznonexistent'" và gợi ý thử lại với từ khóa khác.

### Kết quả thực tế
- Khu vực hiển thị sản phẩm **hoàn toàn trống** (blank area), không có bất kỳ thông báo hay hướng dẫn nào. Người dùng không biết là không có kết quả hay trang đang lỗi.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 73–107
- Không có conditional rendering kiểm tra `products.length === 0` để hiển thị empty state.
- Code chỉ có `.map()` để render danh sách, khi mảng rỗng thì không render gì cả.
- Screenshot: Khu vực sản phẩm trống hoàn toàn khi tìm kiếm không có kết quả.

### Phân tích nguyên nhân gốc (Root Cause)
Không có conditional rendering cho trường hợp mảng `products` rỗng (`products.length === 0`). Code hiện tại chỉ sử dụng `products.map(...)` để render danh sách — khi mảng rỗng, `.map()` trả về mảng rỗng và không render gì. Cần thêm điều kiện kiểm tra trước khi render: nếu `products.length === 0 && !loading`, hiển thị empty state component.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-007] Trang có 2 thẻ \<h1\> (vi phạm chuẩn SEO)

**Severity**: Minor  
**Priority**: Low  
**Module**: Home  
**Found by Test Case**: TC-HOME-008  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Mở Chrome DevTools (F12) → tab **Console**
3. Chạy lệnh: `document.querySelectorAll('h1').length`
4. Hoặc mở tab **Elements** và tìm kiếm `<h1`

### Kết quả mong đợi
- Trang chỉ có **đúng 1 thẻ `<h1>`** theo chuẩn SEO và HTML semantics (mỗi trang chỉ nên có 1 heading cấp 1).

### Kết quả thực tế
- Trang có **2 thẻ `<h1>`**:
  1. `<h1>Danh sách sản phẩm</h1>` (dòng 43)
  2. `<h1>Hiển thị X sản phẩm</h1>` (dòng 110)
- Vi phạm HTML semantics và ảnh hưởng tiêu cực đến SEO ranking.

### Bằng chứng
- File lỗi: `frontend-web/src/pages/Home.jsx` dòng 43 và dòng 110
- Dòng 43: `<h1>Danh sách sản phẩm</h1>` — heading chính của trang (hợp lệ).
- Dòng 110: `<h1>Hiển thị {products.length} sản phẩm</h1>` — thông tin phụ dùng sai thẻ h1.
- Screenshot: DOM Inspector cho thấy 2 node `<h1>` trên cùng một trang.

### Phân tích nguyên nhân gốc (Root Cause)
Dòng text "Hiển thị X sản phẩm" ở dòng 110 sử dụng thẻ `<h1>` trong khi nội dung này chỉ là thông tin phụ (product count). Thẻ `<h1>` chỉ nên dùng cho heading chính duy nhất của trang. Cần đổi thẻ ở dòng 110 thành `<p>` hoặc `<span>` để giữ đúng chuẩn HTML semantics và SEO.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)

---

## [BUG-HOME-008] SQL Injection trong API tìm kiếm sản phẩm

**Severity**: Critical  
**Priority**: High  
**Module**: Home  
**Found by Test Case**: TC-HOME-010  

### Môi trường kiểm thử
- OS: Windows 10/11
- Browser: Chrome (latest)
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

### Các bước tái hiện
1. Truy cập trang chủ tại `http://localhost:5173`
2. Nhập vào thanh tìm kiếm: `' OR '1'='1`
3. Nhấn Enter — quan sát kết quả (tất cả sản phẩm hiển thị dù từ khóa không khớp)
4. Thử payload nghiêm trọng hơn: `'; DROP TABLE products; --`
5. Kiểm tra log server hoặc database để xác nhận câu SQL đã bị inject

### Kết quả mong đợi
- Ứng dụng sử dụng **parameterized query** (prepared statement) với placeholder `?`. Input người dùng được escape tự động, không ảnh hưởng đến cấu trúc câu SQL. Kết quả tìm kiếm trả về rỗng cho payload injection.

### Kết quả thực tế
- Câu SQL bị inject thành công. Payload `' OR '1'='1` khiến điều kiện WHERE luôn đúng, trả về **toàn bộ sản phẩm**. Payload `'; DROP TABLE products; --` có thể **xóa toàn bộ bảng products**, gây mất dữ liệu nghiêm trọng.

### Bằng chứng
- File lỗi: `backend/server.js` dòng 144
- Dòng code vi phạm: `WHERE name LIKE '%${searchQuery}%'` — string concatenation trực tiếp với input người dùng.
- Câu SQL sau khi bị inject với payload `' OR '1'='1`:
  ```sql
  SELECT * FROM products WHERE name LIKE '%' OR '1'='1%'
  ```
- Screenshot: Tất cả sản phẩm hiển thị khi nhập payload `' OR '1'='1`.

### Phân tích nguyên nhân gốc (Root Cause)
Biến `searchQuery` từ input người dùng được **nối chuỗi trực tiếp** (string concatenation) vào câu SQL thay vì sử dụng parameterized query. Đây là lỗ hổng **SQL Injection** cấp nghiêm trọng nhất (CWE-89), cho phép kẻ tấn công đọc, sửa, xóa dữ liệu, hoặc thực thi lệnh hệ thống. Cần sửa thành parameterized query: `WHERE name LIKE ?` với parameter `['%' + searchQuery + '%']`.

### ✅ Checklist đóng bug
- [ ] PR chứa code sửa lỗi đã được Merge
- [ ] Kết quả Retest: Pass
- [ ] Comment xác nhận retest trên Issue
- [ ] Không phát sinh lỗi hồi quy (regression)
