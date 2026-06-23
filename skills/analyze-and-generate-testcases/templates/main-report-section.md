## {FR_ID}: {FR_NAME}

### Mô tả yêu cầu

{Copy the original requirement description here}

---

### Phân tích Domain Testing

#### 1. Xác định Input / Output

| Loại   | Tên trường       | Kiểu dữ liệu | Ràng buộc                      |
|--------|------------------|---------------|--------------------------------|
| Input  | {field_name}     | {type}        | {constraints}                  |
| Output | {expected_behavior} | —          | {description}                  |

#### 2. Phân vùng tương đương (Equivalence Partitioning)

| Trường nhập liệu | Mã phân vùng | Loại    | Mô tả                         | Giá trị đại diện      |
|-------------------|-------------|---------|--------------------------------|----------------------|
| {field_name}      | EP-XX-01    | Valid   | {description}                  | {representative_value} |
| {field_name}      | EP-XX-02    | Invalid | {description}                  | {representative_value} |

#### 3. Giá trị đại diện cho từng phân vùng

> Đã được tổng hợp trong bảng Phân vùng tương đương ở trên (cột "Giá trị đại diện").

---

### Phân tích Boundary Value Analysis (BVA)

#### 1. Xác định các giá trị biên

| Trường nhập liệu | Biên         | Giá trị biên | Loại |
|-------------------|-------------|--------------|------|
| {field_name}      | {boundary}  | {value}      | Min/Max |

#### 2. Giá trị 3 điểm biên (3-Point Boundary)

| Biên              | Điểm          | Giá trị | Kết quả mong đợi |
|-------------------|--------------|---------|-------------------|
| Min = {N}         | ON ({N})     | {value} | Valid / Invalid    |
| Min = {N}         | OFF⁻ ({N-1})| {value} | Invalid            |
| Min = {N}         | OFF⁺ ({N+1})| {value} | Valid              |

---

### Tổng hợp Test Cases

| Test Case ID    | Kỹ thuật       | Mô tả ngắn                    |
|-----------------|---------------|--------------------------------|
| TC-{FR_ID}-001  | Domain Testing | {short_description}            |
| TC-{FR_ID}-002  | Domain Testing | {short_description}            |
| ...             | ...           | ...                            |
| TC-{FR_ID}-0NN  | BVA           | {short_description}            |

---

### AI Gap Analysis

<!-- Phần này được để trống để người dùng tự điền sau khi review -->

> _Chưa có nội dung. Hãy điền nhận xét của bạn về những thiếu sót hoặc bổ sung cần thiết cho phân tích trên._

---
