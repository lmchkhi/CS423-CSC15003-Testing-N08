---
name: design-usability-flow-evaluation
description: Design a Vietnamese moderated usability-evaluation plan for a user-provided end-to-end product flow. Use for HW03 Task 2 or similar requests that require specific test objectives, one realistic goal-oriented task scenario without step-by-step instructions, a justified choice between SUS and UEQ-S, and open-ended probe questions covering clarity, error recovery, speed, and trust.
---

# Design Usability Flow Evaluation

Produce a focused, ready-to-review usability-evaluation design for one end-to-end flow. Write all user-facing deliverables in Vietnamese, even though these instructions are in English.

## Required reference

Read [references/hw03-usability-design-guide.md](references/hw03-usability-design-guide.md) completely before producing the evaluation. Treat it as the requirements and quality-gate reference.

## Inputs

Extract or infer:

- the product or system under test;
- the exact start and end of the flow;
- the target user and their relevant experience;
- the realistic context, constraints, and test data;
- any known requirements, screens, roles, or business rules.

Ask only for the flow when no end-to-end flow can be identified. Do not block on optional details. State reasonable assumptions in Vietnamese and avoid inventing product behavior.

When source code, requirements, screenshots, or routes are clearly available, inspect only the material relevant to the chosen flow. Ground the design in that evidence and identify applicable requirement IDs when useful.

## Workflow

1. Normalize the flow.
   - Express it internally as: starting state, user goal, meaningful intermediate outcomes, and observable end state.
   - Confirm that it crosses enough interactions to qualify as end-to-end.
   - Preserve the user's scope; do not silently add unrelated features.
2. Define three to five test objectives.
   - Make each objective specific to the flow and phrase it as what the study must learn.
   - Pair each objective with observable evidence or a measure, such as unassisted completion, hesitation, wrong turns, errors, recovery behavior, perceived effort, elapsed time, or confidence.
   - Cover task effectiveness and user perception. Include recovery and trust when they are relevant to the flow.
   - Do not invent success thresholds unless the user or specification provides them.
3. Write one participant-facing task scenario.
   - Use a credible identity, motivation, and constraint.
   - Give the participant a goal and any data they legitimately need.
   - Do not name controls, prescribe navigation, or reveal the intended sequence.
   - Avoid evaluation language such as “test the checkout page.”
   - Define completion and stop conditions separately for the researcher; do not expose them as step-by-step participant instructions.
4. Select exactly one standardized scale using the decision rules in the reference.
   - Prefer SUS for a task-focused transactional flow when the main question is whether the system is usable and learnable.
   - Prefer UEQ-S when both pragmatic quality and hedonic experience are central and a very short semantic-differential instrument is useful.
   - Explain the choice in relation to this flow, not with generic advantages.
   - State administration timing, response format, and scoring interpretation.
   - Provide the complete selected instrument when the user asks for a ready-to-run questionnaire. Preserve the standard item count and polarity. Use an official Vietnamese version supplied by the course or user when available; otherwise label any Vietnamese wording as a draft translation that must be checked before data collection.
   - Never combine, shorten, or rewrite standard items while still calling the result SUS or UEQ-S.
5. Write six to eight open-ended probe questions by default.
   - Include at least one neutral, non-leading question for every mandatory criterion: clarity, error recovery, speed, and trust.
   - Tag every question with one or more criteria.
   - Adapt the wording to the flow and the participant's experience.
   - Include neutral conditional wording when a participant may not have encountered an error.
   - Add at most two observation-triggered follow-ups using placeholders such as `[điểm do dự đã quan sát]`.
   - Do not duplicate standardized scale items as open questions.
6. Run the quality gate from the required reference and revise any failed section.

## Output contract

Return a concise Markdown deliverable in Vietnamese with this structure:

### 1. Phạm vi và giả định

- Name the flow, start state, end state, target user, and evidence inspected.
- List only assumptions that materially affect the design.

### 2. Mục tiêu kiểm thử khả dụng

Use a table:

| ID | Mục tiêu cần tìm hiểu | Bằng chứng/chỉ số quan sát |
| --- | --- | --- |

Use stable IDs `OBJ-01`, `OBJ-02`, and so on.

### 3. Kịch bản nhiệm vụ

Include:

- **Bối cảnh:** a brief participant context;
- **Nhiệm vụ giao cho người tham gia:** one natural, goal-oriented paragraph;
- **Điều kiện hoàn thành:** an observable outcome for the researcher;
- **Điều kiện dừng/can thiệp:** when the moderator may end or intervene.

Keep moderator-only details visibly separate from the participant-facing scenario.

### 4. Thang đo sau nhiệm vụ

Include:

- **Lựa chọn:** `SUS` or `UEQ-S`;
- **Lý do phù hợp với flow:** two to four flow-specific sentences;
- **Cách thực hiện:** timing and response format;
- **Cách chấm/diễn giải:** a correct concise scoring note;
- **Bộ câu hỏi chuẩn:** include it when a ready-to-run questionnaire is requested, with translation status disclosed.

Do not describe a SUS score as a percentage. Do not interpret UEQ-S without separating pragmatic and hedonic quality.

### 5. Câu hỏi mở sau nhiệm vụ

Use a table:

| ID | Tiêu chí | Câu hỏi |
| --- | --- | --- |

Use stable IDs `PROBE-01`, `PROBE-02`, and so on. Use the Vietnamese criterion labels `Rõ ràng`, `Khôi phục lỗi`, `Tốc độ`, and `Tin cậy`. Add other useful criteria only after all four mandatory criteria are covered.

### 6. Kiểm tra độ bao phủ

Use a compact checklist confirming:

- the scenario is goal-oriented and not step-by-step;
- exactly one scale is selected and justified;
- all four mandatory criteria have at least one open question;
- the design does not claim invented participant data, observations, or results.

## Boundaries

- Design the evaluation; do not claim to have run sessions unless genuine evidence is supplied.
- Do not fabricate seven participants, contact details, recordings, timings, scores, quotes, or findings.
- Keep pilot-session refinements separate from the original design when the user later supplies pilot evidence.
- Treat the standardized scale as complementary to, not a replacement for, behavioral observations and open probes.
