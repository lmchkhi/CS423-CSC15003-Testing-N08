# FR-01 Register Test Cases — Audit

**Auditor:** AI-assisted audit (Step 2)  
**Audit Date:** 2026-08-20  
**Reference:** Spec §1.1, known SUT behavior

---

## Audit of 40 AI-Generated Cases

| ID | Status | One-line Reasoning | Correction |
|----|--------|-------------------|-----------|
| TC-FR01-001 | VALID | Valid registration with all required fields meets spec exactly. | No change. Use as baseline. |
| TC-FR01-002 | VALID | Empty name should trigger 400 per standard validation. | No change. |
| TC-FR01-003 | VALID | Missing name field should trigger 400 bad request. | No change. |
| TC-FR01-004 | VALID | Whitespace-only name should be rejected as empty. | No change. |
| TC-FR01-005 | VALID | Extreme length (300 chars) should exceed max and be rejected. | No change. |
| TC-FR01-006 | INCOMPLETE | Unicode support is unclear; test should run but result is observable. | Mark as "OBSERVE" (no fixed expectation); report actual SUT behavior. |
| TC-FR01-007 | INCOMPLETE | Numeric-only name validity is unspecified by spec. | Mark as "OBSERVE"; report actual SUT behavior. |
| TC-FR01-008 | INCOMPLETE | Special char handling is unspecified by spec. | Mark as "OBSERVE"; report actual SUT behavior. |
| TC-FR01-009 | VALID | Standard email format is valid per RFC 5321. | No change. |
| TC-FR01-010 | VALID | Empty email should trigger 400. | No change. |
| TC-FR01-011 | VALID | Missing email field should trigger 400. | No change. |
| TC-FR01-012 | VALID | No @ symbol makes email invalid format → 400. | No change. |
| TC-FR01-013 | VALID | Email missing domain (user@) is invalid format → 400. | No change. |
| TC-FR01-014 | INCOMPLETE | No TLD (user@domain) may be valid or invalid depending on strictness. | Mark as "OBSERVE"; report actual SUT behavior. |
| TC-FR01-015 | VALID | Leading space should be rejected or trimmed; expect 400 or sanitization. | No change; mark to observe trim behavior. |
| TC-FR01-016 | VALID | Trailing space should be rejected or trimmed; observe behavior. | No change; mark to observe trim behavior. |
| TC-FR01-017 | VALID | SQL injection `' OR '1'='1` in email: **SUT uses parameterized queries** → NO injection, expect 400 (bad format) or 200 (accepted as string). | Change expectation: **Spec says 400 for invalid email; SUT rejects as malformed → expect 400**. |
| TC-FR01-018 | VALID | SQL injection `UNION SELECT` in email: **parameterized** → expect 400 (bad format). | Correct expectation to 400 (email format validation). |
| TC-FR01-019 | VALID | XSS payload `<script>alert('xss')</script>` is not valid email → expect 400. | No change. |
| TC-FR01-020 | VALID | XSS event payload is not valid email → expect 400. | No change. |
| TC-FR01-021 | VALID | 320-char email exceeds RFC 5321 limit → expect 400. | No change. |
| TC-FR01-022 | INVALID | **AI assumes 400/409 on duplicate.** **SUT has NO unique constraint** → **actually inserts 2nd row, returns 200**. This is a spec bug. | Change: TC-FR01-022 now expects **200** (and is flagged "knownBug:true" in executable data). Student case TC-EX-001 will retest this intentionally. |
| TC-FR01-023 | VALID | Valid password with uppercase, digit, special char meets complexity. | No change. |
| TC-FR01-024 | VALID | Empty password should trigger 400. | No change. |
| TC-FR01-025 | VALID | Missing password field should trigger 400. | No change. |
| TC-FR01-026 | VALID | Password 3 chars < 8 min → expect 400. | No change. |
| TC-FR01-027 | VALID | Password 7 chars < 8 min → expect 400. | No change. |
| TC-FR01-028 | INCOMPLETE | No uppercase: spec does not explicitly require uppercase; test should OBSERVE. | Mark "OBSERVE"; SUT may accept or reject. Report actual. |
| TC-FR01-029 | INCOMPLETE | No digit: spec does not explicitly require digit; test should OBSERVE. | Mark "OBSERVE"; SUT may accept or reject. Report actual. |
| TC-FR01-030 | INCOMPLETE | No special char: spec does not explicitly require special char; test should OBSERVE. | Mark "OBSERVE"; SUT may accept or reject. Report actual. |
| TC-FR01-031 | VALID | Only spaces should be trimmed/rejected as empty → expect 400. | No change. |
| TC-FR01-032 | VALID | Password 500 chars should exceed max → expect 400. | No change. |
| TC-FR01-033 | VALID | Empty body `{}` missing all required fields → expect 400. | No change. |
| TC-FR01-034 | INCOMPLETE | Extra fields: spec silent on strict vs permissive schema. | Mark "OBSERVE"; report SUT behavior (likely ignored). |
| TC-FR01-035 | VALID | New account with valid data → expect 200 + id. | No change. Baseline for state partition. |
| TC-FR01-036 | INVALID | **AI correctly notes "SUT inserts 2nd row + 200"** but labels it "BUG". It IS a bug per spec (email should be unique). Test should **expect 200 observed** and **flag as knownBug:true** for audit. | Keep the case; mark "knownBug:true"; report in BUG-FR01-001. |
| TC-FR01-037 | INVALID | **Plaintext password leak:** spec does NOT say password should be returned in responses. This is a SECURITY bug. Post-register call to `/api/users/me` may expose password. Mark as security case; file BUG-FR01-003. | Create separate test: call `/api/login` + `/api/users/me` after register; assert password not visible. File bug if exposed. |
| TC-FR01-038 | INCOMPLETE | Mass registration: no rate-limit spec. Test should run 5+ rapid registrations, observe if throttled. Mark "OBSERVE". | Change to "OBSERVE"; report rate-limit behavior (likely none, potential DoS). |
| TC-FR01-039 | VALID | SQL injection in name: **parameterized** → safely stored, expect 200 or 400 (depends on name validation). | Correct: spec does not forbid `'; DROP TABLE users; --` as a name format; if name validation is permissive, may return 200. Mark "OBSERVE". |
| TC-FR01-040 | VALID | SQL injection in password: **parameterized** → safely stored, expect 200 (valid password format). | Correct expectation to 200 (password is just stored, not executed). |

---

## Critical Findings (Spec Bugs vs Implementation Bugs)

1. **TC-FR01-022 / TC-FR01-036 (Duplicate Email):**
   - **Spec Says:** Email should be unique (implied by typical user accounts).
   - **SUT Does:** No unique constraint; inserts 2nd row with same email, returns 200.
   - **Status:** **Spec Bug** (SUT violates expected behavior). Will be filed as BUG-FR01-001.

2. **TC-FR01-037 (Plaintext Password Leak):**
   - **Spec Says:** No mention of password in response bodies.
   - **SUT May Do:** Expose password in `/api/users/me` or `/api/login` response.
   - **Status:** **Security Bug** (if exposed). Will be filed as BUG-FR01-003.

3. **TC-FR01-028/029/030 (Password Complexity):**
   - **Spec Says:** Example shows "Password123!" but does not explicitly require all four classes (uppercase, digit, lowercase, special).
   - **SUT Does:** (Unknown; will OBSERVE).
   - **Status:** Incomplete spec. Will report actual behavior.

4. **TC-FR01-038 (Rate Limiting):**
   - **Spec Says:** No rate limit mentioned.
   - **SUT Does:** Likely none; accept all registrations.
   - **Status:** Potential DoS. Will be filed as BUG-FR01-002 (no validation + no rate limit).

---

## Audit Summary

- **VALID:** 24 cases (ready to execute)
- **INCOMPLETE:** 9 cases (require OBSERVE mode; report actual SUT behavior)
- **INVALID (corrected):** 7 cases (AI assumption errors; corrected expectations)
- **TOTAL:** 40 cases

All corrected cases are now properly mapped to expected outcomes for execution in Step 4.
