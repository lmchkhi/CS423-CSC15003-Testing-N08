# FR-09: Mã Giảm Giá (Coupon) — Black-Box Testing Analysis (Mobile App)

> **Nền tảng:** Mobile App (React Native + Expo)
> **Phương pháp:** Domain Testing (EP) + Boundary Value Analysis (BVA)
> **Cấu hình:** `[FR-DIR]` = `FR-09-coupon-mobile` | `[FR-ID]` = `FR09`

---

## STEP 1: Xác định Biến đầu vào (Input Variables)

Dựa trên [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L110-L136) và [api_specification.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/api_specification.md#L151-L163), FR-09 có **5 biến đầu vào**:

| #  | Variable             | Type                 | Domain / Constraints                                                                                       |
|----|----------------------|----------------------|------------------------------------------------------------------------------------------------------------|
| V1 | `code`               | String (Input field) | Mã coupon phải tồn tại trong CSDL và đang hoạt động (`is_active = 1`) — Điều kiện C1                      |
| V2 | `total_amount`       | Numeric (Implicit)   | Tổng đơn hàng >= `min_order_amount` của coupon — Điều kiện C3. Giá trị tính tự động từ giỏ hàng.           |
| V3 | `Authorization`      | String (Header)      | JWT Token hợp lệ từ người dùng đã đăng nhập — Điều kiện C4                                                |
| V4 | `expired_at`         | Date (Server-side)   | Ngày hiện tại phải trước `expired_at` — Điều kiện C2                                                      |
| V5 | `usage_count`        | Numeric (Server-side)| Số lần user đã dùng mã < `max_uses_per_user` — Điều kiện C5                                               |

> **Lưu ý:** Trên Mobile App, `total_amount` được tính tự động từ giỏ hàng (không nhập tay). Người dùng chỉ tương tác trực tiếp với biến `code` (nhập mã coupon vào ô input).

---

## STEP 2: Equivalence Partitioning (EP)

### V1: `code` (Mã giảm giá) — String

| Partition ID | Partition                          | Giá trị đại diện | Hợp lệ? |
|--------------|------------------------------------|-------------------|----------|
| EP-V1-01     | Mã tồn tại, active, còn hạn       | `SAVE10`          | ✅ Valid  |
| EP-V1-02     | Mã tồn tại, active, hết hạn       | `EXPIRED`         | ❌ Invalid|
| EP-V1-03     | Mã không tồn tại trong CSDL       | `FAKECODE`        | ❌ Invalid|
| EP-V1-04     | Chuỗi rỗng (không nhập)           | `""`              | ❌ Invalid|
| EP-V1-05     | Mã đúng nhưng sai case (lowercase)| `save10`          | ❌ Invalid|

### V2: `total_amount` (Tổng đơn hàng) — Numeric ⚡ BVA Applicable

| Partition ID | Partition                                  | Giá trị đại diện            | Hợp lệ? |
|--------------|--------------------------------------------|-----------------------------|----------|
| EP-V2-01     | Tổng đơn >= `min_order_amount`             | 500,000₫ (với SAVE10: min 300K) | ✅ Valid  |
| EP-V2-02     | Tổng đơn < `min_order_amount`              | 200,000₫ (với SAVE10: min 300K) | ❌ Invalid|

### V3: `Authorization` (Trạng thái đăng nhập) — Categorical

| Partition ID | Partition                            | Giá trị đại diện          | Hợp lệ? |
|--------------|--------------------------------------|---------------------------|----------|
| EP-V3-01     | Đã đăng nhập, JWT Token hợp lệ      | `Bearer <valid_token>`    | ✅ Valid  |
| EP-V3-02     | Chưa đăng nhập, không có Token       | (Không gửi header)        | ❌ Invalid|

### V4: `expired_at` (Hạn sử dụng mã) — Categorical (server-side)

| Partition ID | Partition                                | Giá trị đại diện                | Hợp lệ? |
|--------------|------------------------------------------|---------------------------------|----------|
| EP-V4-01     | Mã còn hạn (`expired_at` trong tương lai)| `SAVE10` (hạn 2099-12-31)      | ✅ Valid  |
| EP-V4-02     | Mã hết hạn (`expired_at` đã qua)        | `EXPIRED` (hạn 2020-01-01)     | ❌ Invalid|

### V5: `usage_count` (Số lần đã sử dụng) — Numeric ⚡ BVA Applicable

| Partition ID | Partition                                    | Giá trị đại diện                            | Hợp lệ? |
|--------------|----------------------------------------------|---------------------------------------------|----------|
| EP-V5-01     | Chưa dùng lần nào (`usage < max_uses`)       | User chưa dùng SAVE10 (0 < 1)              | ✅ Valid  |
| EP-V5-02     | Đã dùng hết lượt (`usage >= max_uses`)       | User đã dùng SAVE10 1 lần (1 >= 1)         | ❌ Invalid|

---

## STEP 3: Boundary Value Analysis (BVA)

> **STRICT BVA RULE:** Chỉ áp dụng BVA cho biến số (numerical). Trong FR-09, có **2 biến numerical** phù hợp: `total_amount` (Điều kiện C3) và `usage_count` (Điều kiện C5).

### BVA-1: `total_amount` vs. `min_order_amount` (Điều kiện C3: `total >= min_order_amount`)

Phân tích biên cho mã **SAVE10** (`min_order_amount = 300,000₫`, type = `percent`, value = 10%):

| BVA Point  | Giá trị total_amount | So với biên 300,000₫ | Expected                                                                                                    |
|------------|----------------------|----------------------|-------------------------------------------------------------------------------------------------------------|
| OFF⁻ (BVA-001) | 299,999₫         | < 300,000₫           | ❌ Từ chối — Đơn hàng chưa đạt ngưỡng tối thiểu                                                             |
| **ON (BVA-002)**| **300,000₫**     | **= 300,000₫**       | ✅ Chấp nhận — `discount = 300,000 × 10/100 = 30,000₫` → `final = 300,000 - 30,000 = 270,000₫`            |
| OFF⁺ (BVA-003) | 300,001₫         | > 300,000₫           | ✅ Chấp nhận — `discount = 300,001 × 10/100 = 30,000.1₫` → `final = 300,001 - 30,000.1 = 270,000.9₫`      |

Phân tích biên cho mã **BIGBUY** (`min_order_amount = 500,000₫`, type = `fixed`, value = 50,000₫):

| BVA Point  | Giá trị total_amount | So với biên 500,000₫ | Expected                                                                                            |
|------------|----------------------|----------------------|-----------------------------------------------------------------------------------------------------|
| OFF⁻ (BVA-004) | 499,999₫         | < 500,000₫           | ❌ Từ chối — Đơn hàng chưa đạt ngưỡng tối thiểu                                                     |
| **ON (BVA-005)**| **500,000₫**     | **= 500,000₫**       | ✅ Chấp nhận — `discount = 50,000₫` → `final = 500,000 - 50,000 = 450,000₫`                        |
| OFF⁺ (BVA-006) | 500,001₫         | > 500,000₫           | ✅ Chấp nhận — `discount = 50,000₫` → `final = 500,001 - 50,000 = 450,001₫`                        |

### BVA-2: `usage_count` vs. `max_uses_per_user` (Điều kiện C5: `usage < max_uses_per_user`)

Phân tích biên cho mã **VIP100** (`max_uses_per_user = 2`, type = `fixed`, value = 100,000₫, min = 300,000₫):

| BVA Point  | Lần sử dụng thứ | `usage_count` hiện tại | So với biên `max=2`  | Expected                                                                                       |
|------------|------------------|------------------------|----------------------|-------------------------------------------------------------------------------------------------|
| OFF⁻ (BVA-007) | Lần thứ 1    | 0 (trước khi dùng)    | 0 < 2 → Hợp lệ       | ✅ Chấp nhận — `discount = 100,000₫` → `final = total - 100,000₫`                              |
| **ON (BVA-008)**| **Lần thứ 2**| **1 (đã dùng 1 lần)** | **1 < 2 → Hợp lệ**   | ✅ Chấp nhận — `discount = 100,000₫` → `final = total - 100,000₫` (lần cuối cùng được phép)    |
| OFF⁺ (BVA-009) | Lần thứ 3    | 2 (đã dùng 2 lần)     | 2 < 2 → Sai → Từ chối | ❌ Từ chối — Đã sử dụng hết lượt cho phép                                                       |

Phân tích biên cho mã **SAVE10** (`max_uses_per_user = 1`):

| BVA Point  | Lần sử dụng thứ | `usage_count` hiện tại | So với biên `max=1`  | Expected                                                                                       |
|------------|------------------|------------------------|----------------------|-------------------------------------------------------------------------------------------------|
| **ON (BVA-010)**| **Lần thứ 1**| **0 (chưa dùng)**     | **0 < 1 → Hợp lệ**   | ✅ Chấp nhận — `discount = total × 10/100`                                                     |
| OFF⁺ (BVA-011) | Lần thứ 2    | 1 (đã dùng 1 lần)     | 1 < 1 → Sai → Từ chối | ❌ Từ chối — Đã sử dụng hết lượt cho phép                                                       |

---

## Tổng hợp: Domain Test Cases (EP) dự kiến

| TC ID   | Mô tả                                                                      | Kết hợp EP                                         | Coupon  | Expected |
|---------|-----------------------------------------------------------------------------|-----------------------------------------------------|---------|----------|
| DT-001  | Áp dụng SAVE10 thành công — tất cả điều kiện hợp lệ (percent)              | V1-01, V2-01, V3-01, V4-01, V5-01                  | SAVE10  | ✅ `discount = total × 10%` |
| DT-002  | Áp dụng BIGBUY thành công — tất cả điều kiện hợp lệ (fixed)                | V1-01, V2-01, V3-01, V4-01, V5-01                  | BIGBUY  | ✅ `discount = 50,000₫` |
| DT-003  | Áp dụng VIP100 thành công — tất cả điều kiện hợp lệ (fixed, max_uses=2)    | V1-01, V2-01, V3-01, V4-01, V5-01                  | VIP100  | ✅ `discount = 100,000₫` |
| DT-004  | Mã không tồn tại trong CSDL                                                 | **V1-03**, V2-01, V3-01, V4-01, V5-01              | FAKECODE| ❌ Lỗi C1 |
| DT-005  | Chuỗi mã rỗng (không nhập)                                                  | **V1-04**, V2-01, V3-01, V4-01, V5-01              | `""`    | ❌ Lỗi C1 |
| DT-006  | Mã hết hạn sử dụng                                                          | V1-02, V2-01, V3-01, **V4-02**, V5-01              | EXPIRED | ❌ Lỗi C2 |
| DT-007  | Tổng đơn hàng dưới ngưỡng tối thiểu                                         | V1-01, **V2-02**, V3-01, V4-01, V5-01              | SAVE10  | ❌ Lỗi C3 |
| DT-008  | Người dùng chưa đăng nhập (không có JWT)                                     | V1-01, V2-01, **V3-02**, V4-01, V5-01              | SAVE10  | ❌ Lỗi C4 |
| DT-009  | Đã dùng hết lượt cho phép                                                    | V1-01, V2-01, V3-01, V4-01, **V5-02**              | SAVE10  | ❌ Lỗi C5 |
| DT-010  | Mã đúng nhưng sai case (lowercase)                                           | **V1-05**, V2-01, V3-01, V4-01, V5-01              | `save10`| ❌ Lỗi C1 |

## Tổng hợp: BVA Test Cases dự kiến

| TC ID    | Mô tả                                                      | Biến test     | Biên       | BVA Point | Expected |
|----------|-------------------------------------------------------------|---------------|------------|-----------|----------|
| BVA-001  | SAVE10: total = 299,999₫ (dưới ngưỡng 300K)                | total_amount  | 300,000₫   | OFF⁻      | ❌ Từ chối |
| BVA-002  | SAVE10: total = 300,000₫ (đúng ngưỡng)                     | total_amount  | 300,000₫   | ON        | ✅ `discount = 30,000₫`, `final = 270,000₫` |
| BVA-003  | SAVE10: total = 300,001₫ (trên ngưỡng 1₫)                  | total_amount  | 300,000₫   | OFF⁺      | ✅ `discount = 30,000.1₫`, `final = 270,000.9₫` |
| BVA-004  | BIGBUY: total = 499,999₫ (dưới ngưỡng 500K)                | total_amount  | 500,000₫   | OFF⁻      | ❌ Từ chối |
| BVA-005  | BIGBUY: total = 500,000₫ (đúng ngưỡng)                     | total_amount  | 500,000₫   | ON        | ✅ `discount = 50,000₫`, `final = 450,000₫` |
| BVA-006  | BIGBUY: total = 500,001₫ (trên ngưỡng 1₫)                  | total_amount  | 500,000₫   | OFF⁺      | ✅ `discount = 50,000₫`, `final = 450,001₫` |
| BVA-007  | VIP100: Sử dụng lần thứ 1 (usage=0, max=2)                 | usage_count   | 2          | OFF⁻      | ✅ Chấp nhận |
| BVA-008  | VIP100: Sử dụng lần thứ 2 (usage=1, max=2) — lần cuối      | usage_count   | 2          | ON        | ✅ Chấp nhận |
| BVA-009  | VIP100: Sử dụng lần thứ 3 (usage=2, max=2)                 | usage_count   | 2          | OFF⁺      | ❌ Từ chối |
| BVA-010  | SAVE10: Sử dụng lần thứ 1 (usage=0, max=1)                 | usage_count   | 1          | ON        | ✅ Chấp nhận |
| BVA-011  | SAVE10: Sử dụng lần thứ 2 (usage=1, max=1)                 | usage_count   | 1          | OFF⁺      | ❌ Từ chối |

---

> [!IMPORTANT]
> **Câu hỏi xác nhận:** Các bảng phân tích EP và BVA ở trên đã chính xác chưa? Tôi có nên tiến hành sinh các file Test Case Markdown riêng lẻ (Step 4) không?
