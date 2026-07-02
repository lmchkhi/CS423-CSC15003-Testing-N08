# Phân tích Decision Table và Pairwise: {{REQUIREMENT_ID}} — {{REQUIREMENT_TITLE}}

## 1. Phạm vi và nguồn

| Field | Value |
|---|---|
| Requirement | {{REQUIREMENT_ID}}: {{REQUIREMENT_TITLE}} |
| Nguồn chính | {{PRIMARY_SOURCE}} |
| Nguồn bổ sung | {{SUPPORTING_SOURCES_OR_NONE}} |
| Ngoài phạm vi | {{OUT_OF_SCOPE}} |

## 2. Requirement đã chuẩn hóa

**Tóm tắt hành vi:** {{NORMALIZED_REQUIREMENT_SUMMARY}}

| Thành phần | Nội dung trích xuất |
|---|---|
| Actor | {{ACTORS}} |
| Entry point / Trigger | {{ENTRY_POINTS_OR_TRIGGERS}} |
| Input | {{INPUTS}} |
| Trạng thái / Lịch sử | {{STATES_OR_HISTORY}} |
| Ngưỡng / Thời gian | {{THRESHOLDS_OR_TIMING}} |
| Output / Side effect | {{OUTPUTS_OR_SIDE_EFFECTS}} |
| Security / Privacy | {{SECURITY_OR_PRIVACY_RULES}} |
| UI / API observable behavior | {{OBSERVABLE_BEHAVIOR}} |

## 3. Atomic rules

| ID | Quy tắc nguyên tử | Loại | Nguồn |
|---|---|---|---|
| AR-01 | {{ATOMIC_RULE}} | {{VALIDATION_OR_STATE_OR_SECURITY_OR_UI_ETC}} | {{SOURCE}} |

## 4. Giả định, mơ hồ và xung đột

| ID | Nội dung | Phân loại | Cách xử lý / Ảnh hưởng |
|---|---|---|---|
| AQ-01 | {{ITEM}} | {{ASSUMPTION_OR_QUESTION_OR_CONFLICT}} | {{HANDLING}} |

## 5. Điều kiện và lớp tương đương

| ID | Điều kiện | Các mức / lớp giá trị | Cơ sở |
|---|---|---|---|
| C1 | {{CONDITION}} | {{LEVELS}} | {{RATIONALE}} |

## 6. Hành động và kết quả

| ID | Hành động / Kết quả quan sát được |
|---|---|
| A1 | {{ACTION}} |

## 7. Constraint và tổ hợp không khả thi

| ID | Constraint | Tổ hợp bị loại | Lý do |
|---|---|---|---|
| K1 | {{CONSTRAINT}} | {{EXCLUDED_COMBINATION}} | {{REASON}} |

## 8. Decision Table đầy đủ

| Conditions / Actions | R1 | R2 | R3 |
|---|---:|---:|---:|
| C1 — {{CONDITION}} | {{LEVEL}} | {{LEVEL}} | {{LEVEL}} |
| C2 — {{CONDITION}} | {{LEVEL}} | {{LEVEL}} | {{LEVEL}} |
| **A1 — {{ACTION}}** | X |  |  |
| **A2 — {{ACTION}}** |  | X | X |

## 9. Rút gọn Decision Table

### 9.1 Phép gộp

| Rule nguồn | Rule sau gộp | Don't care | Cơ sở an toàn |
|---|---|---|---|
| {{SOURCE_RULES_OR_NONE}} | {{MERGED_RULE_OR_NA}} | {{CONDITION_OR_NA}} | {{RATIONALE}} |

### 9.2 Bảng sau rút gọn

{{REDUCED_DECISION_TABLE}}

## 10. Phân tích Pairwise

### 10.1 Kết luận áp dụng

**Kết luận:** {{APPLIED_OR_NOT_APPLIED}}

{{PAIRWISE_DECISION_RATIONALE}}

### 10.2 Factor, level và constraint

| Factor | Levels | Constraint / Ghi chú |
|---|---|---|
| {{FACTOR_OR_NA}} | {{LEVELS_OR_NA}} | {{CONSTRAINT_OR_NA}} |

### 10.3 Test bắt buộc nằm ngoài phần rút gọn Pairwise

| Scenario / Rule | Lý do phải giữ |
|---|---|
| {{MANDATORY_SCENARIO}} | {{REASON}} |

### 10.4 Tập Pairwise và bằng chứng pair coverage

{{PAIRWISE_SUITE_OR_NOT_APPLICABLE}}

{{PAIR_COVERAGE_EVIDENCE_OR_NOT_APPLICABLE}}

### 10.5 Số liệu rút gọn

| Chỉ số | Số lượng |
|---|---:|
| Tổ hợp exhaustive khả thi | {{E_OR_NA}} |
| Rule sau rút gọn Decision Table | {{REDUCED_RULE_COUNT}} |
| Test bắt buộc | {{M}} |
| Test do Pairwise bổ sung | {{P}} |
| Test trùng được loại | {{D}} |
| Test cuối cùng | {{FINAL_COUNT}} |
| Tỷ lệ rút gọn | {{PERCENT_OR_NOT_MEANINGFUL}} |

## 11. Danh sách test case

| Test Case ID | Mô tả | Technique | Decision rule / Scenario nguồn |
|---|---|---|---|
| {{TEST_CASE_ID}} | {{DESCRIPTION}} | {{TECHNIQUE}} | {{SOURCE_RULES}} |

## 12. Ma trận truy vết

| Atomic Rule | Decision rule / Scenario | Test Case ID | Coverage |
|---|---|---|---|
| AR-01 | {{RULE_OR_SCENARIO}} | {{TEST_CASE_ID}} | Covered |

## 13. Câu hỏi còn mở và coverage gap

| ID | Nội dung | Ảnh hưởng | Trạng thái |
|---|---|---|---|
| {{ID_OR_NONE}} | {{QUESTION_OR_GAP}} | {{IMPACT}} | Open |
