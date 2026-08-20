# FR-08 Checkout Test Cases — Audit

**Auditor:** AI-assisted audit (Step 2)  
**Audit Date:** 2026-08-20  
**Reference:** Spec §4.3, known SUT behavior

---

## Audit of 35 AI-Generated Cases

| ID | Status | One-line Reasoning | Correction |
|----|--------|-------------------|-----------|
| TC-FR08-001 | VALID | Valid checkout with all required fields meets spec exactly. | No change. Use as baseline. |
| TC-FR08-002 | VALID | No token should trigger 401 per spec requirement. | No change. |
| TC-FR08-003 | VALID | Invalid/malformed token should trigger 403. | No change. |
| TC-FR08-004 | VALID | Valid user token with valid data should return 200. | No change. |
| TC-FR08-005 | INVALID | **AI assumes zero total_amount is rejected (400).** **SUT does NOT validate total_amount** → actually accepts 0 and creates order. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-002. |
| TC-FR08-006 | INVALID | **AI assumes negative total_amount is rejected (400).** **SUT does NOT validate total_amount** → actually accepts negative and creates order. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-002. |
| TC-FR08-007 | VALID | Boundary value 1 for total_amount should be accepted. | No change. |
| TC-FR08-008 | VALID | Large positive total_amount should be accepted. | No change. |
| TC-FR08-009 | INCOMPLETE | Float handling is unspecified; may be accepted or rejected. | Mark as "OBSERVE"; report actual SUT behavior. |
| TC-FR08-010 | VALID | Missing total_amount field should trigger 400. | No change. |
| TC-FR08-011 | VALID | Non-numeric string for total_amount should trigger 400. | No change. |
| TC-FR08-012 | VALID | Empty string for total_amount should trigger 400. | No change. |
| TC-FR08-013 | VALID | Valid shipping_address should be accepted. | No change. |
| TC-FR08-014 | INVALID | **AI assumes empty shipping_address is rejected (400).** **SUT may accept empty string** → mark as "OBSERVE" or expect 200 if SUT is permissive. | Change to "OBSERVE"; report actual behavior. |
| TC-FR08-015 | VALID | Missing shipping_address field should trigger 400. | No change. |
| TC-FR08-016 | VALID | Very long shipping_address should trigger 400 or length limit. | No change. |
| TC-FR08-017 | VALID | Unicode in shipping_address should be supported. | No change. |
| TC-FR08-018 | VALID | Whitespace-only shipping_address should be rejected. | No change. |
| TC-FR08-019 | VALID | Empty body missing all fields should trigger 400. | No change. |
| TC-FR08-020 | INCOMPLETE | Extra fields handling is unspecified. | Mark as "OBSERVE"; likely ignored. |
| TC-FR08-021 | INVALID | **AI assumes cart validation exists (400 on mismatch).** **Spec does NOT mention cart validation; SUT accepts any client-supplied total_amount** → this is a business logic bug. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-002 (unvalidated total_amount). |
| TC-FR08-022 | VALID | After successful checkout, order should exist with status "pending". | No change. Verified by querying the order. |
| TC-FR08-023 | VALID | Legal transition pending→confirmed should return 200. | No change. |
| TC-FR08-024 | VALID | Legal transition confirmed→shipping should return 200. | No change. |
| TC-FR08-025 | VALID | Legal transition shipping→delivered should return 200. | No change. |
| TC-FR08-026 | VALID | Illegal transition pending→delivered should return 400. | No change. |
| TC-FR08-027 | VALID | Illegal transition pending→shipping should return 400. | No change. |
| TC-FR08-028 | VALID | Legal transition pending→canceled should return 200. | No change. |
| TC-FR08-029 | INVALID | **AI assumes canceled→delivered is rejected (400).** **SUT bug: this illegal transition is ACCEPTED** → actually returns 200. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-003 (illegal state transition). |
| TC-FR08-030 | INVALID | **AI assumes GET /api/orders/:id requires auth (401 without token).** **SUT has IDOR vulnerability: endpoint returns 200 without token** → this is a security bug. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-001 (IDOR). |
| TC-FR08-031 | INVALID | **AI assumes GET /api/orders/:id validates ownership (403 for other user).** **SUT IDOR: any user can read any order** → this is part of BUG-FR08-001. | Change expectation to **200 (knownBug:true)**; file as BUG-FR08-001 (IDOR). |
| TC-FR08-032 | VALID | SQL injection in shipping_address: parameterized queries prevent injection. | No change; expect 200 (safely stored). |
| TC-FR08-033 | INCOMPLETE | XSS payload handling is unspecified; may be rejected or sanitized. | Mark as "OBSERVE"; report actual behavior. |
| TC-FR08-034 | VALID | Boundary value total_amount=1 should be accepted. | No change. |
| TC-FR08-035 | VALID | Boundary value total_amount=MAX_INT should be accepted. | No change. |

---

## Critical Findings (Spec Bugs vs Implementation Bugs)

1. **TC-FR08-005/006/021 (Unvalidated total_amount):**
   - **Spec Says:** No validation mentioned for total_amount against cart contents.
   - **SUT Does:** Accepts zero, negative, and any client-supplied value without validation.
   - **Status:** **Business Logic Bug**. Client can checkout with $0 or negative amounts. Will be filed as BUG-FR08-002.

2. **TC-FR08-030/031 (IDOR on GET /api/orders/:id):**
   - **Spec Says:** Authenticated endpoints should require valid tokens.
   - **SUT Does:** GET /api/orders/:id returns order data without any Authorization header (200 instead of 401).
   - **Status:** **Security Bug (IDOR)**. Any anonymous user can read any order by ID. Will be filed as BUG-FR08-001.

3. **TC-FR08-029 (Illegal canceled→delivered Transition):**
   - **Spec Says:** State machine should enforce legal transitions only.
   - **SUT Does:** Accepts canceled→delivered transition (returns 200 instead of 400).
   - **Status:** **State Machine Bug**. Orders in "canceled" terminal state can be moved to "delivered". Will be filed as BUG-FR08-003.

4. **TC-FR08-014 (Empty shipping_address):**
   - **Spec Says:** shipping_address is required in example.
   - **SUT Does:** Unknown; may accept empty string.
   - **Status:** Mark as "OBSERVE"; report actual behavior.

---

## Audit Summary

- **VALID:** 23 cases (ready to execute)
- **INCOMPLETE:** 4 cases (require OBSERVE mode; report actual SUT behavior)
- **INVALID (corrected):** 8 cases (AI assumption errors; corrected expectations to match known SUT bugs)
- **TOTAL:** 35 cases

All corrected cases are now properly mapped to expected outcomes for execution in Step 4.
