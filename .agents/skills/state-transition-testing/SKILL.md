---
name: State Transition Testing
description: >
  Analyze software specifications and design test cases using the State Transition Testing technique.
  Read README.md to suggest features suitable for state transition testing, create a test analysis document,
  then generate detailed test cases as individual markdown files. Each step requires user review before proceeding.
---

# State Transition Testing Skill

You are a test design expert applying **State Transition Testing** technique. Follow this 3-step workflow strictly. **You MUST stop and wait for user confirmation after each step before proceeding to the next.**

## Language Rules
- All skill instructions are in English, but **all output artifacts (analysis, test cases) MUST be written in Vietnamese**.
- English is acceptable for technical terms (e.g., State Transition Table, JWT Token, API endpoint, etc.).

---

## Step 1: Feature Suggestion

### What to do
1. Read the project's `README.md` file (the system requirements specification).
2. Identify all functional requirements (FR-XX) that are **suitable for State Transition Testing**.
3. A feature is suitable if it has:
   - **Clearly defined states** (e.g., pending, confirmed, shipping, delivered, canceled)
   - **Events/triggers** that cause transitions between states
   - **Transition rules/constraints** (valid and invalid transitions)
   - **Guard conditions** (conditions that must be true for a transition to occur)
   - **Final/terminal states** (states from which no further transitions are allowed)

### Output format
Present findings as a numbered list with:
- FR ID and name
- Why it's suitable (which states, events, constraints exist)
- Suitability level: 🏆 Rất phù hợp / ✅ Phù hợp / ⚠️ Có thể áp dụng

### Then ask
Ask the user: **"Bạn muốn chọn feature nào để phân tích State Transition Testing? Có thể chọn nhiều feature."**

**⛔ STOP HERE. Wait for user to select feature(s) before proceeding to Step 2.**

---

## Step 2: Test Analysis

### What to do
For each selected feature, create a test analysis file at:
```
tests/test-analysis/test-analysis-STT-{module}.md
```
Where `{module}` is derived from the feature name in lowercase (e.g., `order`, `checkout`, `login`).

### Analysis document structure

```markdown
# Phân tích State Transition Testing — {FR-XX}: {Tên feature}

## 1. Tổng quan
Mô tả ngắn về feature và lý do áp dụng State Transition Testing.

## 2. Các trạng thái (States)
Bảng liệt kê tất cả trạng thái:

| ID | Trạng thái | Mô tả | Loại |
|----|-----------|-------|------|
| S0 | {tên} | {mô tả} | Initial / Intermediate / Final |

## 3. Các sự kiện (Events)
Bảng liệt kê tất cả sự kiện gây chuyển đổi:

| ID | Sự kiện | Mô tả | Actor |
|----|---------|-------|-------|
| E1 | {tên} | {mô tả} | User / Admin / System |

## 4. Bảng chuyển đổi trạng thái (State Transition Table)
Bảng ma trận State × Event → Next State:

| Trạng thái hiện tại | Sự kiện | Điều kiện (Guard) | Trạng thái kế tiếp | Hành động |
|---------------------|---------|-------------------|--------------------|-----------| 
| S0 | E1 | {điều kiện} | S1 | {hành động} |

Include both **valid transitions** and **invalid transitions** (marked with ❌).

## 5. Sơ đồ chuyển đổi trạng thái (State Transition Diagram)
Use a Mermaid stateDiagram-v2 to visualize:

```mermaid
stateDiagram-v2
    [*] --> S0
    S0 --> S1 : E1
    ...
```

## 6. Chiến lược sinh Test Case
- Số lượng valid transitions cần cover
- Số lượng invalid transitions cần verify
- Bao nhiêu test case dự kiến
- Coverage level: 0-switch (mỗi transition riêng lẻ) hoặc 1-switch (chuỗi 2 transitions)
```

### Then ask
Present the analysis document to user and ask: **"Bạn hãy review bảng phân tích. Có cần điều chỉnh states, events, hay transitions nào không? Nếu OK, tôi sẽ tiến hành sinh test case."**

**⛔ STOP HERE. Wait for user to review and approve before proceeding to Step 3.**

---

## Step 3: Test Case Generation

### What to do
Based on the approved analysis, generate individual test case files at:
```
tests/test-cases/{module}/TC-{MODULE}-{NNN}.md
```

### Test case ID convention
- `{MODULE}` = uppercase module name (e.g., `ORDER`, `CHECKOUT`, `LOGIN`)
- `{NNN}` = 3-digit zero-padded number starting from 001

### Test case generation strategy
1. **Valid transitions (positive tests)**: One test case per valid transition in the State Transition Table.
2. **Invalid transitions (negative tests)**: One test case per important invalid transition (especially transitions from final states, unauthorized transitions).
3. **Sequence tests (if applicable)**: Test complete paths through the state machine (e.g., happy path from initial to final state).

### Test case template
Use the template from `resources/test-case-template.md` in this skill directory. Each test case file must follow this exact format.

### After generating
Present a summary table of all generated test cases:

| # | Test Case ID | Tiêu đề | Loại (Positive/Negative) | Transition |
|---|-------------|---------|--------------------------|------------|
| 1 | TC-ORDER-001 | {title} | Positive | S0 → S1 (E1) |

Ask: **"Tôi đã tạo {N} test case. Bạn hãy review. Có cần thêm, sửa, hoặc xóa test case nào không?"**

**⛔ STOP HERE. Wait for user to review the generated test cases.**

---

## Important Notes

- Always cross-reference the test analysis with the original `README.md` specification to ensure accuracy.
- States, events, and transitions must be derived **strictly from the specification**, not invented.
- If the specification is ambiguous about a transition, flag it in the analysis and ask the user.
- Test data should use concrete, realistic values from the specification (e.g., actual coupon codes, sample emails).
- Preconditions must be specific enough for another tester to reproduce the test.
