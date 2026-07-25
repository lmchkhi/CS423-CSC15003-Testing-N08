# HW03 Usability Design Guide

## Requirements baseline

HW03 Task 2 requires one small-sample, moderated usability evaluation of a single end-to-end flow:

- seven real participants and seven separate sessions;
- clear objectives describing what the evaluator wants to learn;
- one realistic, goal-oriented task scenario rather than detailed instructions;
- one post-session standard scale: SUS, UEQ-S, or a justified custom scale;
- open-ended probes covering at least clarity, error recovery, speed, and trust;
- one pilot session before the seven real sessions;
- neutral moderation, think-aloud behavior, and intervention only when the participant is completely stuck;
- genuine evidence, including structured notes and recordings with consent;
- scoring across participants, synthesis of recurring pain points, separation of bugs from systemic design issues, and severity prioritization.

This skill prepares the objectives, scenario, and instruments. It must not fabricate execution evidence or participant information.

## Objective design

A strong objective names both the learning question and the evidence that can answer it.

Prefer objectives such as:

- determine whether target users can reach the defined end state without moderator help, measured through completion and intervention;
- identify navigation bottlenecks, evidenced by wrong turns, backtracking, hesitation, and think-aloud comments;
- understand whether users recognize and recover from errors, evidenced by recovery attempts and outcomes;
- assess perceived pace and effort, using elapsed time as descriptive context rather than an unsupported pass threshold;
- understand whether information, feedback, and outcomes create sufficient confidence to continue.

Avoid objectives that merely say “test usability,” predict the result, or invent a numerical benchmark.

## Scenario rules

A valid participant-facing scenario:

- establishes a plausible situation and motivation;
- supplies constraints or test data only when the participant would naturally know them;
- describes a desired outcome;
- allows the participant to choose the path;
- avoids UI labels, control names, screen names, and ordered actions unless they are unavoidable domain terms.

Bad pattern:

> Open Products, click Add to cart, go to Cart, enter SAVE10, and click Checkout.

Good pattern:

> Bạn cần mua một món quà trong ngân sách 500.000 đồng và muốn tận dụng mã ưu đãi SAVE10. Hãy hoàn tất việc đặt món phù hợp để đơn hàng sẵn sàng được xử lý.

Keep the completion condition separate so it does not leak the intended navigation path.

## SUS versus UEQ-S

Choose only one scale.

### Choose SUS when

- the evaluation is centered on completing a concrete transactional flow;
- perceived usability, complexity, consistency, confidence, and learnability are the main concerns;
- the evaluator needs a widely recognized single usability score;
- participants can judge the system after one sufficiently representative session.

SUS uses 10 alternating positive and negative statements rated on a five-point agreement scale. For odd-numbered items subtract 1 from the response; for even-numbered items subtract the response from 5; sum the contributions and multiply by 2.5. The result ranges from 0 to 100 but is not a percentage. Interpret it with an appropriate SUS benchmark rather than inventing pass/fail meaning.

### Choose UEQ-S when

- the study explicitly needs both pragmatic and hedonic experience;
- qualities such as excitement, originality, or stimulation are material to the flow;
- an eight-pair, seven-position semantic differential is appropriate;
- separate pragmatic and hedonic summaries will answer the research questions.

UEQ-S contains eight bipolar item pairs: four pragmatic and four hedonic. Follow the official item order, endpoint orientation, transformation, and scoring guidance for the version used. Report pragmatic quality and hedonic quality separately; the overall value is secondary and not a substitute for the two dimensions.

### Translation integrity

Use an official Vietnamese version from course material or an identified validated source when available. If no official version is available, label the Vietnamese wording as a draft translation for review. Do not silently change item polarity, response anchors, count, or order. A translated or customized subset must not be presented as the original standardized instrument.

## Open-ended probe design

Cover these four criteria explicitly:

| Criterion | What to explore | Neutral question pattern |
| --- | --- | --- |
| Clarity | labels, information, next action, outcome feedback | “Ở thời điểm nào bạn thấy rõ hoặc chưa rõ mình cần làm gì tiếp theo? Vì sao?” |
| Error recovery | noticing, understanding, and recovering from errors or dead ends | “Nếu có lúc thao tác không cho kết quả mong đợi, bạn đã nhận ra và thử khắc phục như thế nào?” |
| Speed | perceived pace, waiting, unnecessary effort | “Phần nào của nhiệm vụ khiến bạn cảm thấy nhanh hoặc chậm hơn mong đợi?” |
| Trust | confidence in information, actions, privacy, payment, or final state | “Thông tin hoặc phản hồi nào làm bạn tin tưởng hoặc do dự khi tiếp tục?” |

Ask about concrete moments and reasons. Avoid yes/no questions, praise-seeking wording, or assumptions that an error definitely occurred. Questions about general satisfaction do not automatically cover these four criteria.

## Quality gate

Before returning the design, verify:

1. The flow has an observable start and end.
2. There are three to five specific learning objectives with evidence or measures.
3. The participant-facing scenario contains a goal but no prescribed navigation sequence.
4. The completion condition is observable and separated from the scenario.
5. Exactly one of SUS or UEQ-S is selected with a flow-specific rationale.
6. Administration and scoring notes match the selected scale.
7. There are six to eight open probes by default.
8. Clarity, error recovery, speed, and trust each appear at least once.
9. Probe wording is neutral, open-ended, and relevant to the flow.
10. The complete user-facing deliverable is in Vietnamese.
11. No participant, observation, score, or result is fabricated.
