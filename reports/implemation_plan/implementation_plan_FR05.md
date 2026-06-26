# FR-05: Xem danh sách & Tìm kiếm sản phẩm — Black-Box Test Design (Steps 1, 2, 3)

> **Cấu hình:** `[FR-DIR]` = `FR-05-search` | `[FR-ID]` = `FR05`
> **Nguồn đặc tả:** [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L73-L81) (FR-05) + [api_specification.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/api_specification.md#L80-L82) (API 3.1) + FR-21, FR-24 (GUI Requirements)

---

## STEP 1: Xác định Biến Đầu vào & Yêu cầu UI

### 1.1. Biến đầu vào (Input Variables)

Từ phân tích đặc tả FR-05, xác định được **1 biến đầu vào duy nhất** từ phía người dùng:

| #  | Biến             | Kiểu   | Nguồn                    | Mô tả                                                             |
|----|------------------|--------|--------------------------|---------------------------------------------------------------------|
| V1 | `search_keyword` | String | Thanh tìm kiếm (UI) / Query string `?search=keyword` (API) | Từ khóa tìm kiếm sản phẩm theo tên |

### 1.2. Yêu cầu UI / Hành vi hệ thống (Implicit Variables / UI Requirements)

Đây **không phải biến đầu vào** của người dùng, mà là các **yêu cầu hiển thị / hành vi** mà hệ thống phải đáp ứng. Chúng sẽ được kiểm tra qua các test case riêng.

| #   | Yêu cầu                                      | Nguồn đặc tả     | Loại kiểm tra          |
|-----|-----------------------------------------------|-------------------|------------------------|
| UI-1 | Danh sách sản phẩm hiển thị dạng lưới (grid) | FR-05             | UI Layout              |
| UI-2 | Mỗi SP hiển thị: **Ảnh** (tỷ lệ chuẩn, có `alt` text mô tả), **Tên SP**, **Giá** (₫, phân cách hàng nghìn) | FR-05 | UI Content |
| UI-3 | Từ khóa tìm kiếm phải **hiển thị an toàn** (không render HTML) | FR-05, SEC-04 | Security / XSS |
| UI-4 | Khi đang tải dữ liệu → hiển thị trạng thái **loading** | FR-05 | UI State |
| UI-5 | Không có kết quả → hiển thị **empty state** phù hợp | FR-05, FR-24 | UI State |
| UI-6 | Trang chủ có **đúng một thẻ `<h1>`** | FR-05, FR-21 | DOM Structure / SEO |
| UI-7 | Ảnh sản phẩm phải có thuộc tính `alt` mô tả nội dung (không rỗng) | FR-24 | Accessibility |
| UI-8 | Đơn vị tiền: ký hiệu `₫`, định dạng phân cách hàng nghìn | FR-21 | Format |

---

## STEP 2: Equivalence Partitioning (EP)

### 2.1. Biến `search_keyword` (String)

Áp dụng EP cho biến chuỗi. Phân hoạch như sau:

| Partition ID | Phân hoạch (Equivalence Class)         | Giá trị đại diện              | Kết quả mong đợi                                                                                                              |
|:------------:|----------------------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **EP1**      | **Rỗng (Empty/Blank)**                | `""` (chuỗi rỗng)             | ✅ Hiển thị toàn bộ danh sách sản phẩm                                                                                        |
| **EP2**      | **Từ khóa hợp lệ — có kết quả**       | `"Áo"` (từ khóa khớp tên SP)  | ✅ Hiển thị danh sách sản phẩm có tên chứa từ khóa                                                                            |
| **EP3**      | **Từ khóa hợp lệ — không có kết quả** | `"xyznoexist123"` (không khớp) | ✅ Hiển thị thông báo **empty state** phù hợp                                                                                  |
| **EP4**      | **Từ khóa có ký tự đặc biệt**         | `"Áo @#$%"`                   | ✅ Hệ thống xử lý an toàn, hiển thị kết quả (hoặc empty state) mà không bị lỗi                                                |
| **EP5**      | **Chỉ khoảng trắng (Whitespace-only)**| `"   "` (3 dấu cách)          | ✅ Hệ thống xử lý như chuỗi rỗng hoặc trả về kết quả phù hợp, không bị lỗi                                                   |
| **EP6**      | **Malicious Payload — XSS**           | `<script>alert('XSS')</script>` | ✅ Hệ thống **hiển thị an toàn** chuỗi dạng plain text, **KHÔNG render HTML/JS**. Không có alert popup. Từ khóa hiển thị nguyên dạng escaped |
| **EP7**      | **Malicious Payload — SQL Injection** | `' OR '1'='1' --`              | ✅ Hệ thống xử lý an toàn, **KHÔNG trả về toàn bộ sản phẩm** một cách bất thường. Trả về empty state hoặc kết quả hợp lệ      |

---

## STEP 3: Boundary Value Analysis (BVA)

### Đánh giá khả năng áp dụng BVA

Xét tất cả biến đầu vào của FR-05:

| Biến             | Kiểu   | Có phải biến số (numerical) không? | Áp dụng BVA? |
|------------------|--------|------------------------------------|---------------|
| `search_keyword` | String | ❌ Không                            | ❌ Không       |

> **_"No numerical variables found. BVA is skipped."_**
>
> Theo **STRICT BVA RULE**: BVA chỉ áp dụng cho biến số (numerical). Biến `search_keyword` là kiểu String → **BVA không được áp dụng**.

---

## Tổng hợp Ma trận Domain Testing

### Ma trận EP — Biến `search_keyword`

| TC ID          | Partition | `search_keyword`                      | Expected Result                                                                                          |
|----------------|-----------|---------------------------------------|----------------------------------------------------------------------------------------------------------|
| DT-001         | EP1       | `""` (rỗng)                           | ✅ Hiển thị toàn bộ danh sách sản phẩm                                                                   |
| DT-002         | EP2       | `"Áo"` (khớp tên SP)                  | ✅ Hiển thị danh sách SP có tên chứa "Áo"                                                                 |
| DT-003         | EP3       | `"xyznoexist123"` (không khớp)        | ✅ Hiển thị empty state phù hợp                                                                           |
| DT-004         | EP4       | `"Áo @#$%"` (ký tự đặc biệt)         | ✅ Xử lý an toàn, không lỗi hệ thống                                                                     |
| DT-005         | EP5       | `"   "` (chỉ whitespace)              | ✅ Xử lý phù hợp (như rỗng hoặc trả kết quả), không lỗi                                                  |
| DT-006         | EP6       | `<script>alert('XSS')</script>`       | ✅ Hiển thị an toàn dạng plain text, KHÔNG render HTML/JS                                                 |
| DT-007         | EP7       | `' OR '1'='1' --`                     | ✅ Xử lý an toàn, KHÔNG trả về toàn bộ SP bất thường                                                     |

### Ma trận UI Requirements

| TC ID          | Yêu cầu kiểm tra                                              | Expected Result                                                        |
|----------------|----------------------------------------------------------------|------------------------------------------------------------------------|
| DT-008         | UI-1: Danh sách SP hiển thị dạng grid                         | ✅ Layout dạng lưới (grid/flex-wrap)                                    |
| DT-009         | UI-2: Mỗi card SP hiển thị Ảnh + Tên + Giá                   | ✅ Đầy đủ 3 thành phần trên mỗi product card                           |
| DT-010         | UI-4: Trạng thái loading khi đang tải                         | ✅ Có loading indicator (spinner/skeleton) khi đang fetch dữ liệu       |
| DT-011         | UI-5: Empty state khi không có kết quả                        | ✅ Có icon/hình minh họa + thông báo thân thiện (FR-24)                 |
| DT-012         | UI-6: Trang chủ có đúng 1 thẻ `<h1>`                         | ✅ DOM chỉ chứa đúng 1 element `<h1>`                                  |
| DT-013         | UI-7: Ảnh SP có thuộc tính `alt` không rỗng                   | ✅ Tất cả `<img>` có `alt` mô tả nội dung                              |
| DT-014         | UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn       | ✅ Ví dụ: `100.000 ₫` hoặc `100,000₫`                                  |

---

## Tổng kết

| Hạng mục                        | Số lượng |
|----------------------------------|----------|
| Biến đầu vào                    | 1 (`search_keyword`)  |
| Phân hoạch EP                   | 7 (gồm 2 Malicious Payload)  |
| Test case từ EP (Domain Testing) | 7  |
| Test case từ UI Requirements     | 7  |
| **Tổng test case dự kiến**      | **14**  |
| Test case BVA                   | 0 _(No numerical variables — BVA skipped)_  |

---

```text
=== AI AUDIT LOG ENTRY ===
* Tool: Claude Opus 4.6 (Thinking)
* Date: 2026-06-27
* User Prompt: Khởi động QA, thực hiện Black-box test cho FR-05 (Xem danh sách & Tìm kiếm sản phẩm). Phân tích description_project.md, xác định biến đầu vào, EP (bắt buộc Malicious Payload XSS/SQLi), BVA theo STRICT BVA RULE. Steps 1, 2, 3.
* AI Action: Phân tích FR-05 từ description_project.md và api_specification.md. Xác định 1 biến đầu vào (search_keyword - String). Tạo 7 phân hoạch EP (gồm EP6-XSS, EP7-SQLi). Áp dụng STRICT BVA RULE → skip BVA (no numerical variables). Tổng hợp 14 test case dự kiến (7 EP + 7 UI).
==========================
```
