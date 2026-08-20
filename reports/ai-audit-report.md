# AI Audit Report

Tài liệu này ghi lại đầy đủ prompt và AI output tương ứng từ ba cuộc hội thoại Codex được tham chiếu. Mỗi prompt của người dùng được ghi thành một entry riêng theo đúng thứ tự thời gian trong từng cuộc hội thoại.

## Entry #1

### AI Audit Entry

Tool: `Codex (GPT-5)`

Date: `20/08/2026 22:37 — Asia/Ho_Chi_Minh`

User Prompt:

    sử dụng ai-first-api-testing thực hiện:
    - Pool B
    - FR-11 — Order History View
    - Endpoint thuộc phạm vi FR-11:
      - GET /api/orders/my-orders
      - GET /api/orders/:id

    ## NGUYÊN TẮC PHẠM VI

    Chỉ tập trung vào FR-11.

    Không phân tích, mô tả, tạo test, hoặc mở rộng sang bất kỳ FR hay endpoint nào không thuộc FR-11.

    Chỉ được đọc các tài liệu khác để làm rõ contract, security rule, dependency hoặc spec gap trực tiếp liên quan đến FR-11.

    Không trình bày tổng quan các Pool khác hoặc các FR khác.

    ## TÀI LIỆU CẦN DÙNG

    Đọc và tuân thủ các tài liệu liên quan trực tiếp:

    - SKILL.md
    - references/phase-playbook.md
    - references/api-selection-contract.md
    - references/api-testing-runbook.md
    - references/assignment-requirements.md
    - src/eshop-sut/api_specification.md
    - src/eshop-sut/README.md

    Chỉ đọc source code nếu cần xác minh một khoảng trống hoặc mâu thuẫn trực tiếp của FR-11.

    ## PHẠM VI THỰC THI

    Chỉ thực hiện:

    PHASE A — CHỌN PHẠM VI / TRÍCH XUẤT CONTRACT CHO FR-11

    Không được:
    - sinh bộ test case;
    - audit test case;
    - thêm human-added cases;
    - tạo Postman executable tests;
    - chạy Newman;
    - phân tích bug;
    - làm CI/CD;
    - làm report tổng hợp;
    - chuyển sang phase tiếp theo.

    Sau khi hoàn tất Phase A phải DỪNG.

    ## NHIỆM VỤ

    1. Xác minh chính xác scope của FR-11:
       - GET /api/orders/my-orders
       - GET /api/orders/:id

    2. Trích xuất contract chỉ cho FR-11:
       - authentication requirement;
       - authorization requirement;
       - ownership rule;
       - path/header inputs;
       - preconditions;
       - data dependencies;
       - expected behavior có nguồn;
       - response/schema chỉ khi được tài liệu định nghĩa;
       - security requirements áp dụng trực tiếp;
       - spec gaps.

    3. Đặc biệt làm rõ ba tình huống:
       - user xem danh sách order của chính mình;
       - user xem chi tiết order của chính mình;
       - user thử xem order không thuộc về mình.

    4. Xác định các input/partition cần dùng cho Phase B sau này:
       - valid order id;
       - invalid/malformed id nếu phù hợp;
       - nonexistent id;
       - owned order;
       - foreign-owned order;
       - user có nhiều order;
       - user không có order.

    5. Xác định các security concern trực tiếp của FR-11:
       - missing/invalid authentication;
       - authorization;
       - ownership;
       - IDOR.

    Không ép các security category không liên quan.

    6. Không tự bịa:
       - status code;
       - error body;
       - exact response schema;
       - ownership behavior;
       - validation rule.

    Nếu thiếu oracle, ghi rõ:

    INCOMPLETE / SPEC GAP

    7. Xác định Student ID theo rule của skill/repository nhưng không gửi request.

    8. Chỉ tạo/cập nhật artifact phục vụ Phase A của FR-11.

    9. Ghi AI Audit cho interaction này theo skill.

    ## OUTPUT CUỐI

    Chỉ báo cáo các mục sau:

    ### FR-11 Scope

    ### Contract

    ### Authentication / Authorization / Ownership

    ### Inputs / Partitions

    ### Applicable Security

    ### Spec Gaps

    ### Data Dependencies

    ### Artifact Paths

    ### Status

    Dùng:

    PHASE A: COMPLETE
    HUMAN REVIEW: PENDING
    NEXT ALLOWED PHASE: B — AI GENERATION
    EXECUTION: NOT EXECUTED

    Sau đó DỪNG.

    Không được tự động thực hiện Phase B.

AI Output:

    ### FR-11 Scope

    Đã xác minh Pool B / FR-11 chỉ gồm `GET /api/orders/my-orders` và `GET /api/orders/:id`. Student ID là `23127464`; chưa gửi request. Việc xác nhận không trùng lựa chọn với thành viên khác còn chờ con người vì repository không có danh sách phân công nhóm.

    ### Contract

    `GET /api/orders/my-orders` nhận JWT qua `Authorization: Bearer <token>`, không có path/query/body được công bố, và phải chỉ trả dữ liệu order của chính user. `GET /api/orders/:id` nhận JWT cùng path `id`; user chỉ được xem detail của order mình sở hữu. Với foreign-owned order, contract yêu cầu không tiết lộ dữ liệu, nhưng cách từ chối chính xác là `INCOMPLETE / SPEC GAP`. Tài liệu không định nghĩa status code hay exact response schema.

    ### Authentication / Authorization / Ownership

    Cả hai endpoint theo tài liệu đều yêu cầu JWT hợp lệ. Đây là quyền truy cập theo identity/ownership, không có yêu cầu role admin. Source cho thấy route danh sách có middleware JWT và lọc `user_id = req.user.id`; route detail hiện không có middleware và chỉ lọc theo `id`, là mâu thuẫn contract/candidate IDOR từ kiểm tra tĩnh, chưa phải kết luận bug runtime.

    ### Inputs / Partitions

    Đã ghi các partition dành cho Phase B: valid owned ID, valid foreign-owned ID, well-formed nonexistent ID, malformed ID chỉ khi grammar được làm rõ, user có nhiều order, user không có order, cùng valid/missing/invalid/expired JWT. `X-Student-Id: 23127464` phải có khi thực thi sau này.

    ### Applicable Security

    Áp dụng trực tiếp: SEC-02 (JWT hợp lệ), authorization/ownership, IDOR trên `:id`, và SEC-05 cho truy vấn tham số hóa. Không ép các SEC không liên quan.

    ### Spec Gaps

    `INCOMPLETE / SPEC GAP`: status/error body; exact list/detail schema; empty-history representation; ordering/pagination; ID grammar/validation; nonexistent-ID behavior; foreign-order rejection; admin behavior trên user-scoped endpoints; data-store error behavior. Source detail route còn mâu thuẫn yêu cầu authentication/ownership.

    ### Data Dependencies

    Cần User A có JWT và nhiều owned orders, User B có JWT và foreign order, User C có JWT nhưng không có order, mapping ID-owner ổn định, một nonexistent ID, dữ liệu JWT âm tính có kiểm soát và cơ chế fixture/reset được phê duyệt. Source hiện không seed order.

    ### Artifact Paths

    - `reports/api-testing/fr-11-phase-a-contract.md`
    - `reports/ai-audit-report.md` — Entry #27

    ### Status

    PHASE A: COMPLETE
    HUMAN REVIEW: PENDING
    NEXT ALLOWED PHASE: B — AI GENERATION
    EXECUTION: NOT EXECUTED

**Đánh giá/chỉnh sửa của con người:**

    PENDING

## Entry #28

### AI Audit Entry

Tool: `Codex (GPT-5)`

Date: `20/08/2026 22:55 — Asia/Ho_Chi_Minh`

User Prompt:

    approved, continue phase B

AI Output:

    ### Phase A Approval

    Đã ghi nhận Phase A được phê duyệt ngày 2026-08-20 và mở gate Phase B cho FR-11. Việc không trùng lựa chọn với thành viên khác vẫn cần xác nhận riêng vì repository không có danh sách phân công nhóm.

    ### Phase B Result

    Đã sinh 70 ca `AI-SINH`: 35 ca cho `GET /api/orders/my-orders` và 35 ca cho `GET /api/orders/:id`. Có 70 ID duy nhất, không trùng; toàn bộ giữ `Đánh giá con người: PENDING` và `Tự động hóa: NOT CREATED`.

    ### Coverage

    Bao phủ JWT hợp lệ/thiếu/rỗng/sai định dạng/bị sửa/hết hạn; user có 0/1/nhiều order; owned, foreign-owned, nonexistent và malformed ID; identity isolation; authorization, ownership, IDOR, SEC-02 và SEC-05; cùng các semantic field có nguồn của FR-11.

    ### Preserved Spec Gaps

    Không tự đặt status code, error body, exact schema, ID grammar, empty-list representation hoặc foreign-order rejection. Các oracle chưa đủ nguồn đều ghi `INCOMPLETE / SPEC GAP`; source implementation không được dùng thay expected contract.

    ### Artifact Paths

    - `tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md`
    - `reports/api-testing/fr-11-phase-b-generation.md`
    - `reports/api-testing/fr-11-phase-a-contract.md`
    - `reports/ai-audit-report.md` — Entry #28

    Kết quả AI đầy đủ nằm tại file test case, SHA-256 `ABB5FE9F7D6148C1F1743AC8500001B7FF7401CBA454695383120414895E4667`, và được truy vết bằng chuỗi prompt trong báo cáo Phase B.

    ### Status

    PHASE B: COMPLETE
    HUMAN REVIEW: PENDING
    NEXT ALLOWED PHASE: C — HUMAN AUDIT AND EXTENSION
    EXECUTION: NOT EXECUTED

**Đánh giá/chỉnh sửa của con người:**

    PENDING
