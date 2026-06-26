---
name: boundary-value-analysis
description: Phân tích requirement bằng Boundary Value Analysis, xác định ON, OFF-, OFF+, xây dựng ma trận giá trị biên và sinh test case có khả năng truy vết. Sử dụng khi requirement có giới hạn min, max, độ dài, số lượng, ngày giờ, kích thước hoặc ngưỡng.
---

# Boundary Value Analysis Skill

## 1. Mục đích

Áp dụng Boundary Value Analysis (BVA) một cách có hệ thống và thể hiện rõ cách từng giá trị biên được suy ra từ requirement.

Skill phải tạo cả analysis và test case, không chỉ sinh danh sách test case.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ nội dung đầu ra phải được viết bằng tiếng Việt.
2. Có thể giữ các thuật ngữ:
   - Boundary Value Analysis (BVA)
   - ON
   - OFF⁻
   - OFF⁺
   - Robust BVA
   - Normal BVA
   - Preconditions
   - Expected Result
3. Tiêu đề, giải thích, lý do chọn giá trị và kết luận phải bằng tiếng Việt.
4. Giữ nguyên ID, tên biến, URL, route, dữ liệu test và thông báo thực tế.
5. Không tự ý viết toàn bộ output bằng tiếng Anh.

## 3. Nguyên tắc bắt buộc

1. Xem hệ thống như một black-box.
2. Không dựa vào source code trừ khi người dùng yêu cầu.
3. Không tự bịa min, max, length, range hoặc validation rule.
4. Khi thiếu dữ liệu, ghi:
   - `Chưa được đặc tả`, hoặc
   - `Giả định cần xác nhận`.
5. Chỉ áp dụng BVA khi tồn tại miền có thứ tự hoặc ngưỡng có ý nghĩa.
6. Không áp dụng BVA máy móc cho dữ liệu categorical không có thứ tự.
7. Mỗi test case phải chỉ rõ boundary point được cover.
8. Input không phải mục tiêu phải dùng giá trị valid nominal.
9. File analysis và test case phải tách riêng.
10. Không tự tạo bug report khi chưa có actual result.

## 4. Các loại biên cần xem xét

- Giá trị nhỏ nhất
- Giá trị lớn nhất
- Độ dài tối thiểu
- Độ dài tối đa
- Độ dài chính xác
- Numeric range
- Date/time range
- Quantity limit
- File size limit
- Số lần thử
- Pagination limit
- Collection size
- Inclusive boundary
- Exclusive boundary
- Empty / non-empty
- State threshold
- Dependent boundary giữa nhiều input

## 5. Quy trình thực hiện

### Bước 1: Đọc và tóm tắt requirement

Trích xuất:

- Requirement ID
- Feature name
- Input
- Validation rules
- Business rules
- Preconditions
- Success condition
- Error condition

### Bước 2: Xác định biến có biên

Với mỗi biến:

- Tên biến
- Kiểu dữ liệu
- Lower boundary
- Upper boundary
- Inclusive hoặc Exclusive
- Đơn vị
- Nominal value
- Requirement source
- Thông tin còn thiếu

Không coi mọi field đều có biên.

### Bước 3: Chọn phương pháp BVA

Phải ghi rõ phương pháp được chọn.

#### Normal BVA

Với valid range `[min, max]`:

- `min`
- `min + 1`
- nominal
- `max - 1`
- `max`

#### Robust BVA

Với valid range `[min, max]`:

- `min - 1`
- `min`
- `min + 1`
- nominal
- `max - 1`
- `max`
- `max + 1`

#### ON / OFF convention

Với minimum boundary:

- `OFF⁻ = min - 1`
- `ON = min`
- `OFF⁺ = min + 1`

Với maximum boundary:

- `OFF⁻ = max - 1`
- `ON = max`
- `OFF⁺ = max + 1`

Phải mô tả rõ nghĩa của OFF tùy theo biên min hoặc max để tránh nhầm.

### Bước 4: Suy ra giá trị biên

Mỗi boundary value phải có:

- Boundary Value ID
- Input
- Constraint
- Boundary type
- Boundary point
- Công thức suy ra
- Giá trị cụ thể
- Valid hoặc Invalid
- Expected behavior
- Requirement reference

Dùng ID:

- `BV-<INPUT>-001`

Với string length, phải ghi:

- Độ dài số học
- Chuỗi test cụ thể có đúng độ dài đó

Với date/time, phải ghi ngày giờ cụ thể.

Với file size hoặc quantity, phải ghi đơn vị.

### Bước 5: Isolate biến kiểm thử

Khi kiểm thử một boundary:

- Chỉ thay đổi biến mục tiêu.
- Các điều kiện khác phải hợp lệ.
- Phải giải thích nominal values đang dùng.
- Nếu không isolate được, ghi rõ dependency.

### Bước 6: Phân tích dependent boundary

Ví dụ:

- End date bằng start date
- End date sớm hơn start date một ngày
- Quantity bằng available stock
- Tổng file size bằng đúng giới hạn

Dùng ID:

- `DB-01`
- `DB-02`

### Bước 7: Xây dựng BVA Test Matrix

Mỗi dòng gồm:

- Test condition ID
- Target variable
- Boundary Value ID
- Boundary point
- Test value
- Các ràng buộc khác
- Expected validity
- Expected behavior
- Lý do lựa chọn

Dùng ID:

- `COND-FRXX-BVA-001`

Không tạo Cartesian product cho mọi biến trừ khi có lý do rõ ràng.

### Bước 8: Sinh test case

Mỗi boundary condition được chọn tạo thành một test case riêng.

Dùng ID:

- `TC-FRXX-BVA-001`

Mỗi file chỉ chứa một test case.

Không chèn toàn bộ BVA Test Matrix vào từng test case.

### Bước 9: Tổng kết coverage

Báo cáo:

- Tổng biến có biên
- Tổng lower boundaries
- Tổng upper boundaries
- Tổng dependent boundaries
- Phương pháp BVA
- Tổng boundary values
- Tổng test cases
- Boundary đã cover
- Boundary chưa cover
- Lý do loại trừ
- Requirement gap

Mỗi boundary phải có trạng thái:

- `Đã cover`
- `Chủ động loại trừ`
- `Bị chặn do thiếu requirement`

## 6. Cấu trúc output

### Analysis file

Tạo tại:

`analysis/<FEATURE-ID>-<feature-name>/bva-analysis.md`

Nội dung bắt buộc:

```md
# Phân tích Boundary Value Analysis — <Feature ID>: <Feature Name>

## 1. Tóm tắt requirement

## 2. Các biến có biên

## 3. Phương pháp BVA được sử dụng

## 4. Xác định ON, OFF⁻ và OFF⁺

## 5. Boundary Value Derivation

## 6. Dependent Boundaries

## 7. BVA Test Matrix

## 8. Quá trình lựa chọn test case

## 9. Ma trận truy vết

## 10. Tổng kết độ bao phủ

## 11. Giả định và thông tin chưa được đặc tả
```

### Test case files

Tạo tại:

`tests/test-cases/<FEATURE-ID>-<feature-name>/bva/`

Tên file:

`TC-<FEATURE-ID>-BVA-<NNN>.md`

Cấu trúc bắt buộc:

```md
# <TEST-CASE-ID>: <Tên test case bằng tiếng Việt>

## Requirement ID
<Requirement ID>

## Module / Test type / Technique
<Module> / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
<Mục tiêu cụ thể>

## Boundary Point
- Variable:
- Constraint:
- Boundary type:
- Boundary point:
- Test value:

## Preconditions
- <Điều kiện tiên quyết>

## Test data

| Field | Value |
|---|---|
| <Tên field> | <Giá trị cụ thể> |

## Test steps
1. <Bước cụ thể>
2. <Bước cụ thể>

## Expected result
<Kết quả quan sát được>

## Traceability
- Requirement:
- Test condition:
- Boundary Value ID:
- Boundary point:
- Analysis file:

## Status / Related bugs
Not Run / None
```

## 7. Quy tắc chất lượng

1. Test value phải cụ thể.
2. Với length boundary, dữ liệu phải đúng số ký tự đã ghi.
3. Phải kiểm tra lại bằng cách đếm ký tự trước khi xuất.
4. Expected result phải nêu rõ accepted/rejected behavior.
5. Không dùng `hoạt động đúng` hoặc `hiển thị lỗi` một cách chung chung.
6. Mỗi test case chỉ cover một boundary point chính.
7. Các biến khác sử dụng valid nominal value.
8. Không ghi actual result khi chưa chạy test.

## 8. Traceability bắt buộc

Analysis phải có bảng:

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference |
|---|---|---|---|---|---|

Mỗi test case phải có mục `Traceability`.

## 9. Kiểm tra trước khi hoàn tất

- Không bịa constraint.
- Output bằng tiếng Việt.
- Phân biệt inclusive/exclusive boundary.
- ON, OFF⁻, OFF⁺ được giải thích đúng.
- Test string có đúng length.
- BVA Test Matrix chỉ nằm trong analysis.
- Mỗi test case nằm trong file riêng.
- Mỗi test case map được về boundary value.
- Missing requirement được ghi rõ.
