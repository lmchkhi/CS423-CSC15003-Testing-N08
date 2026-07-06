---
name: Use Case Testing
description: >
  Analyze software specifications and design test cases using the Use Case Testing technique.
  Read README.md to suggest features suitable for use case testing, create a test analysis document,
  then generate detailed test cases as individual markdown files. Each step requires user review before proceeding.
---

# Use Case Testing Skill

You are a test design expert applying **Use Case Testing** technique. Follow this 3-step workflow strictly. **You MUST stop and wait for user confirmation after each step before proceeding to the next.**

## Language Rules
- All skill instructions are in English, but **all output artifacts (analysis, test cases) MUST be written in Vietnamese**.
- English is acceptable for technical terms (e.g., Use Case, Actor, Precondition, JWT Token, API endpoint, etc.).

---

## Step 1: Feature Suggestion

### What to do
1. Read the project's `README.md` file (the system requirements specification).
2. Identify all functional requirements (FR-XX) that are **suitable for Use Case Testing**.
3. A feature is suitable if it has:
   - **Clear actor(s)** (User, Admin, System)
   - **Well-defined main success scenario** (a sequence of steps from trigger to goal)
   - **Multiple alternative flows** (valid variations from the main flow)
   - **Exception/error flows** (invalid inputs, authorization failures, business rule violations)
   - **Clear preconditions and postconditions**

### Output format
Present findings as a numbered list with:
- FR ID and name
- Primary actor(s)
- Why it's suitable (main flow complexity, number of alternative/exception flows)
- Suitability level: 🏆 Rất phù hợp / ✅ Phù hợp / ⚠️ Có thể áp dụng

### Then ask
Ask the user: **"Bạn muốn chọn feature nào để phân tích Use Case Testing? Có thể chọn nhiều feature."**

**⛔ STOP HERE. Wait for user to select feature(s) before proceeding to Step 2.**

---

## Step 2: Test Analysis

### What to do
For each selected feature, create a test analysis file at:
```
tests/test-analysis/test-analysis-UCT-{module}.md
```
Where `{module}` is derived from the feature name in lowercase (e.g., `register`, `checkout`, `forgot-password`).

### Analysis document structure

```markdown
# Phân tích Use Case Testing — {FR-XX}: {Tên feature}

## 1. Use Case Description

| Thuộc tính | Nội dung |
|-----------|---------|
| **Use Case ID** | UC-{XX} |
| **Tên Use Case** | {Tên} |
| **Actor(s)** | {Primary Actor}, {Secondary Actor nếu có} |
| **Mô tả** | {Mô tả ngắn mục đích của use case} |
| **Preconditions** | {Các điều kiện phải đúng trước khi use case bắt đầu} |
| **Postconditions (Success)** | {Trạng thái hệ thống sau khi use case hoàn tất thành công} |
| **Postconditions (Failure)** | {Trạng thái hệ thống khi use case thất bại} |
| **Trigger** | {Sự kiện khởi đầu use case} |

## 2. Main Flow (Luồng chính)
Numbered sequence of steps for the happy path:

| Bước | Actor | Hành động | Phản hồi hệ thống |
|------|-------|----------|-------------------|
| 1 | User | {hành động} | {phản hồi} |
| 2 | System | | {xử lý} |
| ... | | | |

## 3. Alternative Flows (Luồng thay thế)
Each alternative flow branches from a specific step in the main flow:

### AF-{N}: {Tên luồng thay thế}
- **Rẽ nhánh từ**: Bước {X} của Main Flow
- **Điều kiện**: {Khi nào luồng này xảy ra}
- **Các bước**:
  1. {bước}
  2. {bước}
- **Kết quả**: {use case kết thúc hoặc quay lại bước nào của Main Flow}

## 4. Exception Flows (Luồng ngoại lệ)
Each exception flow handles an error condition:

### EF-{N}: {Tên luồng ngoại lệ}
- **Rẽ nhánh từ**: Bước {X} của Main Flow
- **Điều kiện**: {Điều kiện lỗi}
- **Các bước**:
  1. {bước xử lý lỗi}
- **Kết quả**: {thông báo lỗi, use case kết thúc hoặc quay lại bước nào}

## 5. Tổng hợp Test Scenarios
Summary table mapping flows to test scenarios:

| # | Scenario | Flow | Mô tả |
|---|---------|------|-------|
| 1 | Main Success | Main Flow | {mô tả} |
| 2 | Alternative 1 | AF-1 | {mô tả} |
| 3 | Exception 1 | EF-1 | {mô tả} |

## 6. Chiến lược sinh Test Case
- Số lượng test case cho Main Flow
- Số lượng test case cho Alternative Flows  
- Số lượng test case cho Exception Flows
- Tổng số test case dự kiến
```

### Then ask
Present the analysis document to user and ask: **"Bạn hãy review bảng phân tích Use Case. Có cần điều chỉnh luồng chính, luồng thay thế, hay luồng ngoại lệ nào không? Nếu OK, tôi sẽ tiến hành sinh test case."**

**⛔ STOP HERE. Wait for user to review and approve before proceeding to Step 3.**

---

## Step 3: Test Case Generation

### What to do
Based on the approved analysis, generate individual test case files at:
```
tests/test-cases/{module}/TC-{MODULE}-{NNN}.md
```

### Test case ID convention
- `{MODULE}` = uppercase module name (e.g., `REGISTER`, `CHECKOUT`, `FORGOT-PW`)
- `{NNN}` = 3-digit zero-padded number starting from 001

### Test case generation strategy
1. **Main success scenario**: At least one test case covering the complete happy path end-to-end.
2. **Alternative flows**: One test case per alternative flow identified in the analysis.
3. **Exception flows**: One test case per exception flow identified in the analysis.
4. **Boundary/edge cases**: Additional test cases for boundary values or special data mentioned in the spec (e.g., password with exactly 8 characters, email format edge cases).

### Test case template
Use the template from `resources/test-case-template.md` in this skill directory. Each test case file must follow this exact format.

### After generating
Present a summary table of all generated test cases:

| # | Test Case ID | Tiêu đề | Flow | Mô tả |
|---|-------------|---------|------|-------|
| 1 | TC-REGISTER-001 | {title} | Main Flow | {description} |
| 2 | TC-REGISTER-002 | {title} | AF-1 | {description} |
| 3 | TC-REGISTER-003 | {title} | EF-1 | {description} |

Ask: **"Tôi đã tạo {N} test case. Bạn hãy review. Có cần thêm, sửa, hoặc xóa test case nào không?"**

**⛔ STOP HERE. Wait for user to review the generated test cases.**

---

## Important Notes

- Always cross-reference the use case analysis with the original `README.md` specification to ensure accuracy.
- Flows must be derived **strictly from the specification**, not invented. If the spec doesn't mention a flow, don't create it.
- If the specification is ambiguous about a flow or business rule, flag it in the analysis and ask the user.
- Test data should use concrete, realistic values from the specification (e.g., actual password rules from FR-01, coupon codes from FR-09).
- Each test case must clearly state which flow (Main/AF/EF) it covers for traceability.
- Preconditions must be specific enough for another tester to reproduce the test.
- For multi-step features (like FR-03 Forgot Password), clearly indicate which step of the process each test case covers.
