# Main Report

---

## FR-05: Xem danh sách và Tìm kiếm sản phẩm

### 1. Tổng quan

FR-05 yêu cầu hệ thống EShop hiển thị danh sách sản phẩm dạng lưới (grid) trên trang chủ và cung cấp chức năng tìm kiếm sản phẩm theo tên. Các yêu cầu cụ thể bao gồm:

- Hiển thị danh sách sản phẩm dạng grid với: Ảnh (tỷ lệ chuẩn, có alt text), Tên sản phẩm, Giá (đơn vị ₫, định dạng phân cách hàng nghìn).
- Thanh tìm kiếm tìm theo tên sản phẩm, từ khóa tìm kiếm phải được hiển thị an toàn (không render HTML).
- Trạng thái loading khi đang tải dữ liệu.
- Thông báo empty state khi không có kết quả.
- Trang chủ chỉ có đúng một thẻ `<h1>`.

Các tài liệu đặc tả được sử dụng làm cơ sở thiết kế test case:

- [description_project.md](../description_project.md) -- Mục FR-05 (dòng 73-81)
- [api_specification.md](../api_specification.md) -- API 3.1: `GET /api/products?search=keyword`

---

### 2. Domain Testing

#### 2.1. Quy trình áp dụng kỹ thuật Domain Testing

Kỹ thuật Domain Testing được áp dụng theo quy trình 3 bước như sau:

**Bước 1 -- Xác định biến đầu vào (Input Variables)**

Từ phân tích đặc tả FR-05 trong `description_project.md` và `api_specification.md`, xác định được **1 biến đầu vào duy nhất** từ phía người dùng:

| #   | Biến             | Kiểu   | Nguồn                                                      | Mô tả                              |
| --- | ---------------- | ------ | ---------------------------------------------------------- | ---------------------------------- |
| V1  | `search_keyword` | String | Thanh tìm kiếm (UI) / Query string `?search=keyword` (API) | Từ khóa tìm kiếm sản phẩm theo tên |

Ngoài ra, xác định thêm **8 yêu cầu UI / Hành vi hệ thống** (implicit variables) mà hệ thống phải đáp ứng. Đây không phải biến đầu vào của người dùng, mà là các điều kiện hệ thống cần đảm bảo:

| #    | Yêu cầu                                                                                | Nguồn đặc tả  | Loại kiểm tra  |
| ---- | -------------------------------------------------------------------------------------- | ------------- | -------------- |
| UI-1 | Danh sách sản phẩm hiển thị dạng lưới (grid)                                           | FR-05         | UI Layout      |
| UI-2 | Mỗi SP hiển thị: Ảnh (tỷ lệ chuẩn, có alt text), Tên SP, Giá (₫, phân cách hàng nghìn) | FR-05         | UI Content     |
| UI-3 | Từ khóa tìm kiếm phải hiển thị an toàn (không render HTML)                             | FR-05, SEC-04 | Security / XSS |
| UI-4 | Khi đang tải dữ liệu phải hiển thị trạng thái loading                                  | FR-05         | UI State       |
| UI-5 | Không có kết quả tìm kiếm phải hiển thị empty state phù hợp                            | FR-05         | UI State       |
| UI-6 | Trang chủ có đúng một thẻ `<h1>`                                                       | FR-05         | DOM Structure  |
| UI-7 | Ảnh sản phẩm phải có thuộc tính alt mô tả nội dung (không rỗng)                        | FR-05         | Accessibility  |
| UI-8 | Đơn vị tiền: ký hiệu ₫, định dạng phân cách hàng nghìn                                 | FR-05         | Format         |

**Bước 2 -- Phân hoạch tương đương (Equivalence Partitioning)**

Áp dụng EP cho biến `search_keyword` (kiểu String). Chia miền dữ liệu thành 7 phân hoạch (Equivalence Classes), bao gồm cả phân hoạch Malicious Payload để kiểm tra bảo mật:

| Partition ID | Phân hoạch (Equivalence Class)     | Giá trị đại diện                 | Kết quả mong đợi                                                          |
| :----------: | ---------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
|     EP1      | Rỗng (Empty/Blank)                 | `""` (chuỗi rỗng)                | Hiển thị toàn bộ danh sách sản phẩm                                       |
|     EP2      | Từ khóa hợp lệ -- có kết quả       | `"Iphone"` (từ khóa khớp tên SP) | Hiển thị danh sách sản phẩm có tên chứa từ khóa                           |
|     EP3      | Từ khóa hợp lệ -- không có kết quả | `"xyznoexist123"` (không khớp)   | Hiển thị thông báo empty state phù hợp                                    |
|     EP4      | Từ khóa có ký tự đặc biệt          | `"Áo @#$%"`                      | Hệ thống xử lý an toàn, hiển thị kết quả hoặc empty state mà không bị lỗi |
|     EP5      | Chỉ khoảng trắng (Whitespace-only) | `"   "` (3 dấu cách)             | Hệ thống xử lý như chuỗi rỗng hoặc trả kết quả phù hợp, không bị lỗi      |
|     EP6      | Malicious Payload -- XSS           | `<script>alert('XSS')</script>`  | Hệ thống hiển thị an toàn chuỗi dạng plain text, KHONG render HTML/JS     |
|     EP7      | Malicious Payload -- SQL Injection | `' OR '1'='1' --`                | Hệ thống xử lý an toàn, KHONG trả về toàn bộ sản phẩm bất thường          |

**Bước 3 -- Tổng hợp Domain Matrix và tạo Test Case**

Từ 7 phân hoạch EP và 7 yêu cầu UI (trong đó 2 yêu cầu UI-3 và UI-7 đã được bao phủ bởi EP6 và được gộp/loại sau human review), tổng hợp thành **14 test case ban đầu** (7 EP + 7 UI). Sau khi human review, giảm còn **12 test case** do loại bỏ 2 test case trùng lặp/ngoài phạm vi (DT-013: alt text -- nguồn gốc từ FR-24, DT-014: format giá -- trùng với DT-012).

Ma trận tổng hợp cuối cùng:

| TC ID  | Loại | Phân hoạch / Yêu cầu            | Giá trị `search_keyword`        | Kết quả mong đợi                                              |
| ------ | ---- | ------------------------------- | ------------------------------- | ------------------------------------------------------------- |
| DT-001 | EP   | EP1 -- Rỗng                     | `""` (rỗng)                     | Hiển thị toàn bộ danh sách sản phẩm                           |
| DT-002 | EP   | EP2 -- Hợp lệ, có kết quả       | `"Iphone"`                      | Hiển thị danh sách SP có tên chứa "Iphone"                    |
| DT-003 | EP   | EP3 -- Hợp lệ, không có kết quả | `"xyznoexist123"`               | Hiển thị empty state phù hợp                                  |
| DT-004 | EP   | EP4 -- Ký tự đặc biệt           | `"Áo @#$%"`                     | Xử lý an toàn, không lỗi hệ thống                             |
| DT-005 | EP   | EP5 -- Chỉ whitespace           | `"   "`                         | Xử lý phù hợp (như rỗng hoặc trả kết quả), không lỗi          |
| DT-006 | EP   | EP6 -- XSS Payload              | `<script>alert('XSS')</script>` | Hiển thị an toàn dạng plain text, KHONG render HTML/JS        |
| DT-007 | EP   | EP7 -- SQL Injection            | `' OR '1'='1' --`               | Xử lý an toàn, KHONG trả về toàn bộ SP bất thường             |
| DT-008 | UI   | UI-1: Grid layout               | N/A                             | Layout dạng lưới (grid/flex-wrap)                             |
| DT-009 | UI   | UI-2: Card SP (Ảnh + Tên + Giá) | N/A                             | Đủ 3 thành phần trên mỗi product card, giá hiển thị ký hiệu ₫ |
| DT-010 | UI   | UI-4: Loading state             | N/A                             | Có loading indicator khi đang fetch dữ liệu                   |
| DT-011 | UI   | UI-6: Đúng 1 thẻ `<h1>`         | N/A                             | DOM chỉ chứa đúng 1 element `<h1>`                            |
| DT-012 | UI   | UI-8: Format giá ₫              | N/A                             | Giá hiển thị đúng định dạng: ký hiệu ₫ + phân cách hàng nghìn |

#### 2.2. Kết quả thực thi

| TC ID          | Tên Test Case                      | Kết quả | Ghi chú                                     |
| -------------- | ---------------------------------- | ------- | ------------------------------------------- |
| TC-FR05-DT-001 | Tìm kiếm với từ khóa rỗng          | Passed  |                                             |
| TC-FR05-DT-002 | Tìm kiếm từ khóa hợp lệ có kết quả | Passed  |                                             |
| TC-FR05-DT-003 | Tìm kiếm từ khóa không có kết quả  | Failed  | Không hiển thị empty state message          |
| TC-FR05-DT-004 | Tìm kiếm từ khóa có ký tự đặc biệt | Failed  | Không trả về kết quả hoặc empty state       |
| TC-FR05-DT-005 | Tìm kiếm chỉ khoảng trắng          | Passed  |                                             |
| TC-FR05-DT-006 | Tìm kiếm với XSS Payload           | Failed  | Server trả 500, lộ raw DB error             |
| TC-FR05-DT-007 | Tìm kiếm với SQL Injection         | Failed  | SQL Injection thành công, trả về toàn bộ SP |
| TC-FR05-DT-008 | Danh sách SP hiển thị dạng grid    | Passed  |                                             |
| TC-FR05-DT-009 | Card SP hiển thị Ảnh + Tên + Giá   | Failed  | Giá hiển thị 'VND' thay vì ký hiệu ₫        |
| TC-FR05-DT-010 | Trạng thái loading khi đang tải    | Failed  | Không có loading indicator                  |
| TC-FR05-DT-011 | Trang chủ có đúng 1 thẻ h1         | Failed  | Có 2 thẻ h1 thay vì 1                       |
| TC-FR05-DT-012 | Giá hiển thị đúng format ₫         | Failed  | Hiển thị 'VND' thay vì ký hiệu ₫            |

**Thống kê:** 4 Passed (33.3%) / 8 Failed (66.7%) trên tổng số 12 test case.

#### 2.3. Các lỗi phát hiện từ Domain Testing

| Bug ID       | TC liên quan   | Mô tả ngắn                                            | Mức độ   |
| ------------ | -------------- | ----------------------------------------------------- | -------- |
| BUG-FR05-001 | DT-003         | Thiếu empty state khi không có kết quả tìm kiếm       | Minor    |
| BUG-FR05-002 | DT-004         | Tìm kiếm ký tự đặc biệt không trả kết quả/empty state | Minor    |
| BUG-FR05-003 | DT-006         | XSS payload gây lỗi 500, lộ raw DB error              | Critical |
| BUG-FR05-004 | DT-007         | SQL Injection thành công, trả về toàn bộ sản phẩm     | Critical |
| BUG-FR05-005 | DT-009, DT-012 | Ký hiệu tiền tệ hiển thị 'VND' thay vì ₫              | Minor    |
| BUG-FR05-006 | DT-010         | Thiếu loading indicator khi đang tải dữ liệu          | Minor    |
| BUG-FR05-007 | DT-011         | Trang chủ có 2 thẻ h1 thay vì 1                       | Trivial  |

Chi tiết bug reports: [bug-reports/](file:///e:/Testing/CS423-CSC15003-Testing-N08/bug-reports)

---

### 3. Boundary Value Analysis (BVA)

#### 3.1. Quy trình áp dụng kỹ thuật BVA

Kỹ thuật Boundary Value Analysis (BVA) được áp dụng theo quy tắc nghiêm ngặt (STRICT BVA RULE) được định nghĩa trong file [CLAUDE.md](../CLAUDE.md):

> BVA chỉ được áp dụng cho các biến số (numerical variables) như price, quantity, total_amount. KHONG được ép hoặc suy diễn BVA trên các biến phi số như String (search queries, emails), Categorical data (roles, statuses), hoặc UI/DOM properties.

**Bước 1 -- Đánh giá khả năng áp dụng BVA**

Xét tất cả biến đầu vào của FR-05:

| Biến             | Kiểu   | Có phải biến số (numerical) không? | Áp dụng BVA? |
| ---------------- | ------ | ---------------------------------- | ------------ |
| `search_keyword` | String | Không                              | Không        |

**Bước 2 -- Kết luận**

FR-05 chỉ có 1 biến đầu vào là `search_keyword` thuộc kiểu String. Theo STRICT BVA RULE, BVA chỉ áp dụng cho biến số (numerical). Do đó:

> **"No numerical variables found. BVA is skipped."**

Biến `search_keyword` đã được bao phủ đầy đủ bởi kỹ thuật Equivalence Partitioning (EP) với 7 phân hoạch ở phần Domain Testing phía trên.

#### 3.2. Giải thích lý do không áp dụng BVA cho FR-05

Trong bối cảnh FR-05, chức năng tìm kiếm sản phẩm nhận duy nhất một biến đầu vào là chuỗi ký tự (String). Các ranh giới của biến chuỗi (ví dụ: độ dài tối thiểu, độ dài tối đa) không được đặc tả ràng buộc cụ thể trong tài liệu `description_project.md` hoặc `api_specification.md`. Vì vậy:

- Không tồn tại điểm ranh giới số học rõ ràng để áp dụng BVA (ví dụ: không có ràng buộc "từ khóa phải từ 1 đến 255 ký tự").
- Các trường hợp biên của chuỗi rỗng (`""`), chỉ khoảng trắng (`"   "`), chuỗi có ký tự đặc biệt đã được xử lý qua các phân hoạch EP tương ứng (EP1, EP5, EP4).
- Các trường hợp bảo mật (XSS, SQL Injection) cũng đã được bao phủ qua phân hoạch EP6 và EP7.

Do đó, việc áp dụng BVA cho FR-05 là không phù hợp và không tạo thêm giá trị kiểm tra bổ sung.

---

### 4. Quy trình áp dụng CLAUDE.md cho AI Agent để tạo test case

#### 4.1. Giới thiệu về CLAUDE.md

File [CLAUDE.md](../CLAUDE.md) là file cấu hình hướng dẫn cho AI Agent (Antigravity - Claude Opus 4.6 Thinking) hoạt động như một ISTQB-Certified QA Test Designer. File này định nghĩa:

- **Vai trò**: QA Test Designer chuyên về Black-Box Testing
- **Ràng buộc**: Hành động từng bước, dừng lại và chờ phê duyệt sau mỗi bước
- **Nguồn dữ liệu**: Chỉ dựa trên `description_project.md` và `api_specification.md`
- **Quy tắc BVA**: STRICT BVA RULE -- chỉ áp dụng cho biến số (numerical)
- **Cấu trúc file**: Định dạng và đường dẫn chuẩn cho test cases, bug reports, test runs, gap analysis
- **Templates**: 2 template chuẩn cho Domain Testing (EP) và BVA
- **Workflow**: 5 bước từ phân tích đến báo cáo lỗi

#### 4.2. Quy trình thực hiện chi tiết

Quy trình áp dụng CLAUDE.md được thực hiện qua **3 giai đoạn chính** với sự tương tác giữa người dùng và AI Agent:

**Giai đoạn 1: Phân tích và Thiết kế (Steps 1-2-3 trong CLAUDE.md)**

1. Người dùng cung cấp prompt khởi động quá trình QA với cấu hình cụ thể:
   - `[FR-DIR]` = `FR-05-search`
   - `[FR-ID]` = `FR05`
   - Yêu cầu bắt buộc có Malicious Payload (XSS, SQL Injection)

2. AI Agent đọc và phân tích 2 file đặc tả (`description_project.md` tại mục FR-05, `api_specification.md` tại API 3.1), xác định:
   - 1 biến đầu vào: `search_keyword` (String)
   - 8 yêu cầu UI/hành vi hệ thống (UI-1 đến UI-8)

3. AI Agent áp dụng Equivalence Partitioning, chia miền dữ liệu của `search_keyword` thành 7 phân hoạch (EP1-EP7), bao gồm 2 phân hoạch Malicious Payload theo yêu cầu.

4. AI Agent đánh giá khả năng áp dụng BVA theo STRICT BVA RULE. Kết luận: `search_keyword` là String, không phải numerical -- BVA bị bỏ qua.

5. AI Agent trình bày bảng phân tích logic (bảng biến, EP, BVA) và dừng lại chờ người dùng phê duyệt trước khi tạo test case.

   Kết quả giai đoạn này được lưu tại: [implementation_plan_FR05.md](../implementation_plan/implementation_plan_FR05.md)

**Giai đoạn 2: Tạo Test Case (Step 4 trong CLAUDE.md)**

1. Sau khi người dùng phê duyệt bảng phân tích, AI Agent tạo 14 file test case (7 EP + 7 UI) theo **Template 1 (Domain Testing)** được định nghĩa trong CLAUDE.md.

2. AI Agent sử dụng 2 subagent song song để tăng tốc:
   - EP Test Case Writer: tạo DT-001 đến DT-007 (Equivalence Partitioning)
   - UI Test Case Writer: tạo DT-008 đến DT-014 (UI Requirements)

3. AI Agent kiểm tra và dọn dẹp: phát hiện 5 file thừa (DT-015 đến DT-019) do subagent tạo thêm và xóa chúng, giữ lại đúng 14 file.

4. AI Agent dừng lại và yêu cầu người dùng thực thi test case trên hệ thống thực (manual testing).

**Giai đoạn 3: Thực thi, Human Review, và Báo cáo (Step 5 trong CLAUDE.md)**

1. Người dùng thực thi 14 test case trên hệ thống EShop thực tế và cập nhật actual result + status cho từng file.

2. Trong quá trình manual testing, người dùng nhận ra và thực hiện các điều chỉnh:
   - **Loại bỏ 2 test case** (DT-013 về alt text, DT-014 về format giá) vì ngoài phạm vi FR-05 hoặc trùng lặp.
   - **Điều chỉnh test data**: đổi từ khóa `"Áo"` (AI đoán) thành `"Iphone"` (sản phẩm thực tế trong DB).

3. Người dùng báo cáo kết quả: 4 Passed (DT-001, DT-002, DT-005, DT-008) và 8 Failed.

4. AI Agent nhận kết quả và triển khai Step 5:
   - Tạo [FR-05-search-run.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/tests/test-runs/FR-05-search-run.md): tổng hợp kết quả test run
   - Tạo 7 bug reports ([BUG-FR05-001](file:///e:/Testing/CS423-CSC15003-Testing-N08/bug-reports/BUG-FR05-001.md) đến [BUG-FR05-007](file:///e:/Testing/CS423-CSC15003-Testing-N08/bug-reports/BUG-FR05-007.md)): theo template GitHub Issue
   - Tạo [FR-05-search-gap-analysis.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/ai-gap-analysis/FR-05-search-gap-analysis.md): phân tích hạn chế của AI

#### 4.3. Sơ đồ quy trình tổng quát

```
Người dùng                         AI Agent (CLAUDE.md)
    |                                    |
    |--- Prompt khởi động QA FR-05 ----->|
    |    (cung cấp [FR-DIR], [FR-ID],    |
    |     yêu cầu XSS/SQLi)              |
    |                                    |
    |                                    |--- Đọc description_project.md
    |                                    |--- Đọc api_specification.md
    |                                    |--- Xác định biến đầu vào (Step 1)
    |                                    |--- Phân hoạch EP (Step 2)
    |                                    |--- Đánh giá BVA (Step 3)
    |                                    |
    |<-- Trình bày bảng phân tích -------|
    |    (Chờ phê duyệt)                 |
    |                                    |
    |--- Phê duyệt --------------------->|
    |                                    |
    |                                    |--- Tạo 14 test case files (Step 4)
    |                                    |--- Kiểm tra và dọn dẹp files thừa
    |                                    |
    |<-- Yêu cầu manual testing ---------|
    |                                    |
    |--- Thực thi test trên SUT -------->|
    |    (Manual testing)                |
    |                                    |
    |--- Báo cáo kết quả:                |
    |    4 Passed / 8 Failed             |
    |    + Loại bỏ 2 TC ngoài phạm vi    |
    |    + Điều chỉnh test data          |
    |    + Nhận xét gap analysis ------->|
    |                                    |
    |                                    |--- Tạo Test Run summary (Step 5)
    |                                    |--- Tạo 7 Bug Reports
    |                                    |--- Tạo AI Gap Analysis
    |                                    |
    |<-- Hoàn thành, yêu cầu commit ---- |
    |                                    |
    |--- git add + git commit ---------->|
         (Commit: 2a04a5c)
```

#### 4.5. Phân tích AI Gap Analysis

Trong quá trình sử dụng AI Agent theo CLAUDE.md, 3 hạn chế chính được xác định:

**Hạn chế 1: Scope Creep (Mở rộng phạm vi)**

- AI tự động đọc thêm các requirement khác (FR-21, FR-24) dù người dùng chỉ yêu cầu tập trung vào FR-05.
- Kết quả: Tạo ra test case DT-013 (alt text -- nguồn từ FR-24) và DT-014 (format giá -- trùng với DT-012 từ FR-21) -- cả hai bị người dùng loại bỏ.

**Hạn chế 2: Test data lệch với thực tế**

- AI chỉ được đọc đặc tả (Black-box) nên không biết dữ liệu thực tế trong CSDL.
- Kết quả: AI dùng từ khóa "Áo" làm test data cho EP2, nhưng trong CSDL thực tế không có sản phẩm tên "Áo". Người dùng phải điều chỉnh thành "Iphone".

**Hạn chế 3: Test case trùng lặp**

- AI truy vết (traceability) giữa các requirement liên quan, dẫn đến test case bị phân tán và trùng lặp.
- Kết quả: Cả DT-009 (UI-2: Card SP) và DT-012 (UI-8: Format giá) đều phát hiện cùng một lỗi (VND thay vì ₫).

Chi tiết: [FR-05-search-gap-analysis.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/ai-gap-analysis/FR-05-search-gap-analysis.md)

#### 4.6. Đánh giá tổng thể

| Tiêu chí                            | Đánh giá                                            |
| ----------------------------------- | --------------------------------------------------- |
| Số lượng test case AI tạo ban đầu   | 14                                                  |
| Số lượng test case sau human review | 12 (loại 2)                                         |
| Số lượng test case phát hiện lỗi    | 8/12 (66.7%)                                        |
| Số lượng bug phát hiện              | 7 (2 Critical, 4 Minor, 1 Trivial)                  |
| Độ chính xác của test design        | Cao -- phủ được các vùng quan trọng (XSS, SQLi, UI) |
| Cần chỉnh sửa bởi người dùng        | Test data, phạm vi test case, loại bỏ trùng lặp     |

AI Agent là công cụ hữu ích cho việc thiết kế test case ban đầu, nhưng **human review là bắt buộc** để:

- Điều chỉnh phạm vi test case cho đúng requirement được yêu cầu
- Thay thế test data giả định bằng dữ liệu thực tế của hệ thống
- Loại bỏ test case trùng lặp hoặc ngoài phạm vi
- Xác nhận kết quả test trên hệ thống thực

---
