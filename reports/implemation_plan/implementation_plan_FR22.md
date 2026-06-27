# FR-22: Form Requirements — Black-Box Test Analysis (Mobile App)

## 🎯 Phạm vi kiểm thử

**FR-22** thuộc mục **8. Yêu cầu Giao diện (GUI Requirements)** trong [description_project.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/description_project.md#L250-L256).

> **⚠️ CẢNH BÁO NỀN TẢNG:** Kiểm thử trên **Mobile App (React Native + Expo)**. Tất cả thuộc tính Web HTML đã được quy đổi sang thuộc tính Mobile tương ứng.

### Spec gốc (FR-22):

| # | Yêu cầu | Web Spec | Mobile (React Native) Equivalent |
|---|---------|----------|----------------------------------|
| R1 | Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn | `<label>Email *</label>` | `<Text>Email *</Text>` hoặc visual indicator `*` bên cạnh label |
| R2 | Trường Email phải dùng `type="email"` | `<input type="email">` | `<TextInput keyboardType="email-address" autoCapitalize="none" autoComplete="email">` |
| R3 | Trường Mật khẩu phải dùng `type="password"` (không hiển thị rõ) | `<input type="password">` | `<TextInput secureTextEntry={true}>` |
| R4 | Thông báo lỗi phải xuất hiện **trên** nút submit, không phải bên dưới | Error above `<button>` | Error `<Text>` rendered above submit `<TouchableOpacity>` / `<Pressable>` |
| R5 | Các form có từ 2 bước trở lên phải có **Step Indicator** rõ ràng | Step indicator UI | Step indicator component (e.g., progress dots, step bar) |

### Các form cần kiểm tra trên Mobile (theo FR-20):

Dựa vào FR-20 (Tính năng Mobile), các form trên mobile bao gồm:
- **Form Đăng nhập** (FR-02)
- **Form Đăng ký** (FR-01)
- **Form Quên mật khẩu / Đặt lại mật khẩu** (FR-03 — form 2 bước)
- **Form Hồ sơ cá nhân** (FR-04)
- **Form Thanh toán / Checkout** (FR-08)

---

## STEP 1: Xác định biến đầu vào (Input Variables)

> **Lưu ý quan trọng:** FR-22 là yêu cầu **giao diện** (GUI Requirement), không phải yêu cầu nghiệp vụ dữ liệu. Các "biến" ở đây là **thuộc tính UI / hành vi giao diện** của các form trên Mobile App, không phải dữ liệu nhập liệu.

| Biến (Variable) | Loại (Type) | Mô tả / Ràng buộc (Domain / Constraints) |
|---|---|---|
| `V1`: Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc (required field) phải có ký hiệu `*` hiển thị bên cạnh nhãn (label). Giá trị: {Có `*`, Không có `*`} |
| `V2`: Kiểu bàn phím Email (`keyboardType`) | Categorical / Prop | Trường Email phải kích hoạt bàn phím email (có phím `@` và `.`). Mobile equivalent: `keyboardType="email-address"`. Giá trị: {`email-address`, khác} |
| `V3`: Che ký tự mật khẩu (`secureTextEntry`) | Boolean / Prop | Trường Mật khẩu phải ẩn ký tự nhập vào (hiển thị dạng `•••`). Mobile equivalent: `secureTextEntry={true}`. Giá trị: {Ẩn (masked), Hiện rõ (visible)} |
| `V4`: Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi validation phải xuất hiện **phía trên** nút Submit, không phải phía dưới. Giá trị: {Trên nút Submit, Dưới nút Submit, Không hiển thị} |
| `V5`: Step Indicator (form ≥ 2 bước) | Boolean / Visual | Form có ≥ 2 bước phải hiển thị chỉ báo bước rõ ràng. Giá trị: {Có Step Indicator, Không có Step Indicator} |
| `V6`: Form mục tiêu | Categorical | Form nào đang được kiểm tra. Giá trị: {Đăng nhập, Đăng ký, Quên MK Bước 1, Đặt lại MK Bước 2, Hồ sơ cá nhân, Checkout} |

---

## STEP 2: Equivalence Partitioning (EP)

### EP cho V1: Ký hiệu bắt buộc `*`

| Partition | Mô tả | Đại diện | Expected |
|---|---|---|---|
| EP-V1.1 | Trường bắt buộc CÓ ký hiệu `*` | Trường "Email" trên form Đăng nhập | ✅ Hiển thị `*` bên cạnh label |
| EP-V1.2 | Trường bắt buộc KHÔNG có ký hiệu `*` | Trường bắt buộc mà thiếu `*` | ❌ Vi phạm FR-22 |
| EP-V1.3 | Trường không bắt buộc (nếu có) KHÔNG nên có `*` | Trường tùy chọn (e.g., mô tả) | ✅ Không hiển thị `*` |

### EP cho V2: Kiểu bàn phím Email

| Partition | Mô tả | Đại diện | Expected |
|---|---|---|---|
| EP-V2.1 | Trường Email sử dụng `keyboardType="email-address"` | Trường Email trên form Đăng nhập | ✅ Bàn phím hiện phím `@` và `.` |
| EP-V2.2 | Trường Email KHÔNG sử dụng bàn phím email | Trường Email dùng bàn phím mặc định | ❌ Vi phạm FR-22 (tương đương `type="email"`) |

### EP cho V3: Che ký tự mật khẩu

| Partition | Mô tả | Đại diện | Expected |
|---|---|---|---|
| EP-V3.1 | Trường mật khẩu CÓ `secureTextEntry={true}` — ký tự bị ẩn | Trường "Mật khẩu" trên form Đăng nhập | ✅ Ký tự hiển thị dạng `•••` |
| EP-V3.2 | Trường mật khẩu KHÔNG ẩn ký tự | Trường mật khẩu hiện rõ text | ❌ Vi phạm FR-22 (tương đương `type="password"`) |

### EP cho V4: Vị trí thông báo lỗi

| Partition | Mô tả | Đại diện | Expected |
|---|---|---|---|
| EP-V4.1 | Thông báo lỗi hiển thị **TRÊN** nút Submit | Error message rendered trước (above) nút "Đăng nhập" | ✅ Đúng FR-22 |
| EP-V4.2 | Thông báo lỗi hiển thị **DƯỚI** nút Submit | Error message rendered sau (below) nút "Đăng nhập" | ❌ Vi phạm FR-22 |
| EP-V4.3 | Thông báo lỗi KHÔNG hiển thị khi có lỗi | Submit form sai nhưng không hiện lỗi | ❌ Vi phạm UX (liên quan FR-22) |

### EP cho V5: Step Indicator

| Partition | Mô tả | Đại diện | Expected |
|---|---|---|---|
| EP-V5.1 | Form ≥ 2 bước CÓ Step Indicator | Form Quên MK (2 bước) hiển thị "Bước 1/2" | ✅ Đúng FR-22 |
| EP-V5.2 | Form ≥ 2 bước KHÔNG CÓ Step Indicator | Form Quên MK không hiện chỉ báo bước | ❌ Vi phạm FR-22 |
| EP-V5.3 | Form 1 bước (không cần Step Indicator) | Form Đăng nhập (1 bước) | ✅ Không cần Step Indicator |

### EP cho V6: Form mục tiêu (Cross-form Verification)

| Partition | Form | Trường bắt buộc cần `*` | Trường Email? | Trường Mật khẩu? | Số bước | Step Indicator? |
|---|---|---|---|---|---|---|
| EP-V6.1 | Đăng nhập | Email, Mật khẩu | ✅ Có | ✅ Có | 1 | Không cần |
| EP-V6.2 | Đăng ký | Họ Tên, Email, Mật khẩu, Xác nhận MK | ✅ Có | ✅ Có (2 trường) | 1 | Không cần |
| EP-V6.3 | Quên MK — Bước 1 | Email | ✅ Có | ❌ Không | 2 | ✅ Cần |
| EP-V6.4 | Đặt lại MK — Bước 2 | OTP, MK mới, Xác nhận MK mới | ❌ Không | ✅ Có (2 trường) | 2 | ✅ Cần |
| EP-V6.5 | Hồ sơ cá nhân | Họ Tên | ❌ Không | ❌ Không | 1 | Không cần |
| EP-V6.6 | Checkout | Địa chỉ giao hàng | ❌ Không | ❌ Không | 1 | Không cần |

---

## STEP 3: Boundary Value Analysis (BVA)

### Áp dụng STRICT BVA RULE

Theo nguyên tắc **STRICT BVA RULE** trong [CLAUDE.md](file:///e:/Testing/CS423-CSC15003-Testing-N08/CLAUDE.md#L11-L13):

> *"BVA must ONLY be applied to strictly numerical variables (e.g., price, quantity, total_amount). DO NOT force or hallucinate BVA on non-numerical variables such as Strings, Categorical data, or UI/DOM properties."*

**Phân tích các biến của FR-22:**

| Biến | Loại | Có phải số (numerical)? | Áp dụng BVA? |
|---|---|---|---|
| V1: Ký hiệu `*` | Boolean / Visual | ❌ Không | ❌ Không |
| V2: Kiểu bàn phím Email | Categorical / Prop | ❌ Không | ❌ Không |
| V3: Che ký tự mật khẩu | Boolean / Prop | ❌ Không | ❌ Không |
| V4: Vị trí thông báo lỗi | Positional / Visual | ❌ Không | ❌ Không |
| V5: Step Indicator | Boolean / Visual | ❌ Không | ❌ Không |
| V6: Form mục tiêu | Categorical | ❌ Không | ❌ Không |

> [!IMPORTANT]
> ### Kết luận BVA
> **Không có biến số (numerical variable) nào được tìm thấy trong FR-22. BVA được bỏ qua (skipped).**
> 
> FR-22 hoàn toàn là yêu cầu về thuộc tính giao diện (UI properties) — tất cả các biến đều thuộc dạng Boolean, Categorical, hoặc Visual/Positional. Theo **STRICT BVA RULE**, chỉ sử dụng **Equivalence Partitioning (EP)** cho feature này.

---

## Domain Test Matrix — Tổng hợp Test Case dự kiến

Dựa trên EP analysis ở trên, các test case Domain Testing (DT) sẽ được tạo như sau:

| TC-ID | Tên Test Case | Form kiểm tra | Biến chính | EP | Expected |
|---|---|---|---|---|---|
| TC-FR22-DT-001 | Ký hiệu `*` trên trường bắt buộc — Form Đăng nhập | Đăng nhập | V1, V6.1 | EP-V1.1 | ✅ Tất cả trường bắt buộc có `*` |
| TC-FR22-DT-002 | Ký hiệu `*` trên trường bắt buộc — Form Đăng ký | Đăng ký | V1, V6.2 | EP-V1.1 | ✅ Tất cả trường bắt buộc có `*` |
| TC-FR22-DT-003 | Ký hiệu `*` trên trường bắt buộc — Form Quên MK | Quên MK B1 | V1, V6.3 | EP-V1.1 | ✅ Trường Email có `*` |
| TC-FR22-DT-004 | Ký hiệu `*` trên trường bắt buộc — Form Đặt lại MK | Đặt lại MK B2 | V1, V6.4 | EP-V1.1 | ✅ Các trường bắt buộc có `*` |
| TC-FR22-DT-005 | Ký hiệu `*` trên trường bắt buộc — Form Hồ sơ | Hồ sơ cá nhân | V1, V6.5 | EP-V1.1 | ✅ Trường Họ Tên có `*` |
| TC-FR22-DT-006 | Ký hiệu `*` trên trường bắt buộc — Form Checkout | Checkout | V1, V6.6 | EP-V1.1 | ✅ Trường bắt buộc có `*` |
| TC-FR22-DT-007 | Bàn phím Email — Form Đăng nhập | Đăng nhập | V2, V6.1 | EP-V2.1 | ✅ Bàn phím email xuất hiện |
| TC-FR22-DT-008 | Bàn phím Email — Form Đăng ký | Đăng ký | V2, V6.2 | EP-V2.1 | ✅ Bàn phím email xuất hiện |
| TC-FR22-DT-009 | Bàn phím Email — Form Quên MK Bước 1 | Quên MK B1 | V2, V6.3 | EP-V2.1 | ✅ Bàn phím email xuất hiện |
| TC-FR22-DT-010 | Ẩn ký tự mật khẩu — Form Đăng nhập | Đăng nhập | V3, V6.1 | EP-V3.1 | ✅ Ký tự bị ẩn (•••) |
| TC-FR22-DT-011 | Ẩn ký tự mật khẩu — Form Đăng ký (MK + Xác nhận MK) | Đăng ký | V3, V6.2 | EP-V3.1 | ✅ Cả 2 trường MK ẩn ký tự |
| TC-FR22-DT-012 | Ẩn ký tự mật khẩu — Form Đặt lại MK Bước 2 | Đặt lại MK B2 | V3, V6.4 | EP-V3.1 | ✅ Cả 2 trường MK ẩn ký tự |
| TC-FR22-DT-013 | Vị trí lỗi trên nút Submit — Form Đăng nhập | Đăng nhập | V4, V6.1 | EP-V4.1 | ✅ Lỗi hiển thị TRÊN nút Submit |
| TC-FR22-DT-014 | Vị trí lỗi trên nút Submit — Form Đăng ký | Đăng ký | V4, V6.2 | EP-V4.1 | ✅ Lỗi hiển thị TRÊN nút Submit |
| TC-FR22-DT-015 | Vị trí lỗi trên nút Submit — Form Quên MK Bước 1 | Quên MK B1 | V4, V6.3 | EP-V4.1 | ✅ Lỗi hiển thị TRÊN nút Submit |
| TC-FR22-DT-016 | Vị trí lỗi trên nút Submit — Form Đặt lại MK Bước 2 | Đặt lại MK B2 | V4, V6.4 | EP-V4.1 | ✅ Lỗi hiển thị TRÊN nút Submit |
| TC-FR22-DT-017 | Vị trí lỗi trên nút Submit — Form Hồ sơ cá nhân | Hồ sơ cá nhân | V4, V6.5 | EP-V4.1 | ✅ Lỗi hiển thị TRÊN nút Submit |
| TC-FR22-DT-018 | Step Indicator — Form Quên MK (2 bước) | Quên MK (cả 2 bước) | V5, V6.3/V6.4 | EP-V5.1 | ✅ Hiển thị Step Indicator rõ ràng |
| TC-FR22-DT-019 | Không có Step Indicator — Form 1 bước (Đăng nhập) | Đăng nhập | V5, V6.1 | EP-V5.3 | ✅ Không hiển thị Step Indicator (đúng) |

> **Tổng số test case dự kiến: 19 Domain Testing test cases.**
> 
> **Không có BVA test case** (theo STRICT BVA RULE — không có biến numerical).

---

## Quy đổi Web → Mobile (Tham chiếu nhanh)

| Web HTML | React Native Equivalent | Lý do quy đổi |
|---|---|---|
| `<input type="email">` | `<TextInput keyboardType="email-address" autoCapitalize="none">` | Mobile không có `type` attribute, dùng `keyboardType` để hiển thị bàn phím phù hợp |
| `<input type="password">` | `<TextInput secureTextEntry={true}>` | Mobile dùng `secureTextEntry` prop để ẩn ký tự |
| `<label>` với `*` | `<Text>` component với ký tự `*` visible | Mobile dùng `Text` component thay `label` |
| CSS position (error above button) | Thứ tự render trong JSX (error `<Text>` trước submit `<Pressable>`) | Mobile layout dựa vào thứ tự component trong tree |
| Step indicator HTML/CSS | Custom component (dots, progress bar, stepper) | Mobile thường dùng component tùy chỉnh hoặc thư viện |

---

```text
=== AI AUDIT LOG ENTRY ===
* Tool: Claude Opus 4 (Thinking)
* Date: 2026-06-27
* User Prompt: FR-22 Black-Box Testing on Mobile App - Steps 1, 2, 3
* AI Action: Analyzed FR-22 specs, identified 6 UI/visual variables, created EP tables for all variables across 6 mobile forms, applied STRICT BVA RULE (skipped - no numerical variables), produced 19 DT test case matrix with Web-to-Mobile property mapping
==========================
```
