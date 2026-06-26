---
name: domain-testing
description: Phân tích yêu cầu chức năng bằng Domain Testing, xây dựng phân vùng tương đương, ma trận miền dữ liệu và sinh test case có khả năng truy vết. Sử dụng khi người dùng yêu cầu áp dụng Domain Testing, Equivalence Partitioning, phân tích miền đầu vào hoặc tạo test case từ requirement.
---

# Domain Testing Skill

## 1. Mục đích

Áp dụng Domain Testing một cách có hệ thống cho một functional requirement.

Skill phải thể hiện đầy đủ quá trình từ requirement đến test case, không chỉ sinh danh sách test case cuối cùng.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ nội dung đầu ra phải được viết bằng tiếng Việt.
2. Có thể giữ nguyên các thuật ngữ kiểm thử phổ biến bằng tiếng Anh khi cần, ví dụ:
   - Domain Testing
   - Equivalence Class
   - Valid / Invalid
   - Preconditions
   - Expected Result
   - Status
3. Tiêu đề, mô tả, giải thích, lý do chọn test data và kết luận phải viết bằng tiếng Việt.
4. ID, tên biến, URL, route, dữ liệu test và thông báo thực tế của hệ thống phải được giữ nguyên.
5. Không tự ý chuyển tài liệu sang tiếng Anh.

## 3. Nguyên tắc bắt buộc

1. Xem hệ thống như một black-box.
2. Không dựa vào source code của hệ thống trừ khi người dùng yêu cầu rõ ràng.
3. Không tự bịa requirement, validation rule hoặc business rule.
4. Khi thiếu thông tin, phải ghi rõ:
   - `Chưa được đặc tả`, hoặc
   - `Giả định cần xác nhận`.
5. Phân biệt rõ:
   - Thông tin có trong requirement
   - Giả định
   - Điều kiện kiểm thử suy ra
6. Mỗi test case phải truy vết được đến ít nhất một equivalence class hoặc dependent condition.
7. Phải xem xét cả valid domain và invalid domain.
8. Hạn chế test case trùng lặp; nếu giữ lại phải giải thích lý do.
9. Với test case invalid, mặc định chỉ làm sai một điều kiện chính; các input còn lại dùng giá trị hợp lệ danh nghĩa.
10. File analysis và file test case phải tách riêng.

## 4. Đầu vào mong đợi

Có thể nhận một hoặc nhiều đầu vào sau:

- Functional requirement
- User story
- Acceptance criteria
- Validation rules
- Mô tả giao diện
- Test case template
- Cấu trúc thư mục project
- Đường dẫn output mong muốn

Nếu không có đủ dữ liệu để kết luận, vẫn tiếp tục phân tích phần có thể xác định và ghi phần còn thiếu vào mục `Giả định và thông tin chưa được đặc tả`.

## 5. Quy trình thực hiện

### Bước 1: Đọc và tóm tắt requirement

Trích xuất:

- Requirement ID
- Tên chức năng
- Actor
- Preconditions
- Input
- Output
- Business rules
- Validation rules
- Dependency
- Error conditions
- Success conditions

Tạo bảng tóm tắt requirement.

### Bước 2: Xác định biến đầu vào và điều kiện hệ thống

Không chỉ phân tích field trên giao diện.

Cần xem xét:

- Giá trị người dùng nhập
- Trạng thái đăng nhập
- User role
- Dữ liệu đã tồn tại hoặc chưa tồn tại
- Quan hệ giữa nhiều input
- Trạng thái hệ thống hoặc external service nếu requirement có đề cập

Với mỗi biến hoặc điều kiện, xác định:

- Tên biến
- Kiểu dữ liệu
- Bắt buộc hay không
- Format
- Range
- Valid conditions
- Invalid conditions
- Dependency
- Nguồn requirement

### Bước 3: Phân vùng tương đương

Chia mỗi input condition thành các equivalence class.

Mỗi class phải có:

- Class ID
- Input hoặc điều kiện
- Mô tả class
- Valid hoặc Invalid
- Giá trị đại diện
- Requirement reference
- Ghi chú hoặc giả định

Quy tắc ID:

- `EC-<INPUT>-V01` cho valid class
- `EC-<INPUT>-I01` cho invalid class

Ví dụ:

- `EC-EMAIL-V01`
- `EC-EMAIL-I01`
- `EC-PASSWORD-I02`

### Bước 4: Phân tích quan hệ phụ thuộc

Xác định các điều kiện phụ thuộc giữa input hoặc giữa input và system state.

Ví dụ:

- `confirmPassword` phải khớp `password`
- Email đúng format nhưng đã tồn tại
- End date phải sau start date
- Một field chỉ bắt buộc khi chọn một option khác

Dùng ID:

- `DC-01`
- `DC-02`

### Bước 5: Xây dựng Domain Matrix

Tạo Domain Matrix thể hiện các tổ hợp điều kiện dự kiến kiểm thử.

Mỗi dòng phải có:

- Test condition ID
- Các class được bao phủ
- Giá trị hoặc trạng thái đại diện
- Expected validity
- Expected behavior
- Lý do chọn

Quy tắc:

- Giữ input không phải mục tiêu ở trạng thái valid nominal.
- Ưu tiên một invalid class cho mỗi test case.
- Chỉ kết hợp nhiều invalid class khi có mục đích rõ ràng.
- Không tạo Cartesian product một cách máy móc.

Dùng ID:

- `COND-FRXX-DT-001`

### Bước 6: Sinh test case

Mỗi test condition được chọn phải tạo thành một test case riêng.

Dùng ID:

- `TC-FRXX-DT-001`

Mỗi file chỉ chứa một test case.

Không chèn toàn bộ Domain Matrix vào từng test case.

### Bước 7: Tổng kết coverage

Báo cáo:

- Tổng số input/condition đã phân tích
- Tổng valid equivalence class
- Tổng invalid equivalence class
- Tổng dependent condition
- Tổng test condition
- Tổng test case
- Class đã cover
- Class chưa cover
- Lý do loại trừ
- Requirement gap

Mỗi class phải có một trạng thái:

- `Đã cover`
- `Chủ động loại trừ`
- `Bị chặn do thiếu requirement`

## 6. Cấu trúc output

### Analysis file

Tạo tại:

`analysis/<FEATURE-ID>-<feature-name>/domain-testing-analysis.md`

Nội dung bắt buộc:

```md
# Phân tích Domain Testing — <Feature ID>: <Feature Name>

## 1. Tóm tắt requirement

## 2. Biến đầu vào và ràng buộc

## 3. Phân vùng tương đương

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

## 5. Domain Matrix

## 6. Quá trình lựa chọn test case

## 7. Ma trận truy vết

## 8. Tổng kết độ bao phủ

## 9. Giả định và thông tin chưa được đặc tả
```

### Test case files

Tạo tại:

`tests/test-cases/<FEATURE-ID>-<feature-name>/domain-testing/`

Mỗi test case là một file:

`TC-<FEATURE-ID>-DT-<NNN>.md`

Cấu trúc bắt buộc:

```md
# <TEST-CASE-ID>: <Tên test case bằng tiếng Việt>

## Requirement ID
<Requirement ID>

## Module / Test type / Technique
<Module> / Functional / Domain Testing

## Mục tiêu kiểm thử
<Mục tiêu cụ thể>

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
- Equivalence class:
- Analysis file:

## Status / Related bugs
Not Run / None
```

## 7. Quy tắc chất lượng test case

1. Test data phải là dữ liệu cụ thể, không chỉ ghi `Valid` hoặc `Invalid`.
2. Test steps phải có thể thực thi.
3. Expected result phải quan sát được.
4. Không dùng mô tả mơ hồ như:
   - `Hoạt động đúng`
   - `Validation thành công`
   - `Hiển thị lỗi`
5. Phải nêu rõ:
   - Hành động được chấp nhận hay bị từ chối
   - Thông báo hoặc validation behavior mong đợi
   - Có tạo hoặc thay đổi dữ liệu hay không
   - Có redirect hay không
6. Không ghi actual result hoặc tạo bug report khi test chưa được chạy.

## 8. Traceability bắt buộc

Analysis phải có bảng:

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|

Mỗi test case phải có mục `Traceability`.

## 9. Kiểm tra trước khi hoàn tất

- Không bịa constraint.
- Tất cả output bằng tiếng Việt.
- Mỗi test case chỉ nằm trong một file riêng.
- Domain Matrix chỉ nằm trong analysis.
- Có cả valid và invalid classes.
- Có phân tích dependent conditions.
- Mỗi test case map được về analysis.
- Test data cụ thể.
- Expected result có thể quan sát.
- Missing requirement được ghi rõ.
